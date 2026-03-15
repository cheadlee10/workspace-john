/**
 * Geographic Expansion Engine
 *
 * Manages autonomous geographic expansion across the entire United States.
 * Starts from the Pacific Northwest (WA) and expands outward in concentric
 * rings until every state is covered.
 *
 * Dual-mode: uses Supabase `geo_progress` table when available, otherwise
 * falls back to an in-memory Map (matching the codebase pattern).
 *
 * SQL to create the table:
 *
 *   CREATE TABLE IF NOT EXISTS geo_progress (
 *     id TEXT PRIMARY KEY,           -- "WA:Seattle" format
 *     state TEXT NOT NULL,
 *     city TEXT NOT NULL,
 *     status TEXT DEFAULT 'pending', -- pending, active, exhausted, skipped
 *     prospects_found INTEGER DEFAULT 0,
 *     sites_built INTEGER DEFAULT 0,
 *     last_prospected_at TIMESTAMPTZ,
 *     created_at TIMESTAMPTZ DEFAULT now()
 *   );
 *
 * Expansion rings (concentric from Pacific Northwest outward):
 *
 *   Ring 1: WA, OR, ID
 *   Ring 2: CA, NV, MT, WY
 *   Ring 3: AZ, UT, CO, NM
 *   Ring 4: TX, OK, KS, NE, SD, ND
 *   Ring 5: MN, IA, MO, AR, LA, WI, IL, MI, IN, OH
 *   Ring 6: MS, AL, GA, FL, SC, NC, TN, KY, WV, VA
 *   Ring 7: PA, NY, NJ, CT, RI, MA, VT, NH, ME, MD, DE, DC
 *   Ring 8: HI, AK
 */

import {
  getSupabase,
  isDbEnabled,
  isTableNotFoundError,
  markSchemaUnavailable,
} from "@/lib/db/supabase";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface GeoTarget {
  city: string;
  state: string;
  stateCode: string;
  searchQuery: string; // e.g., "Seattle WA"
}

export interface GeoProgress {
  id: string;
  state: string;
  city: string;
  status: "pending" | "active" | "exhausted" | "skipped";
  prospectsFound: number;
  sitesBuilt: number;
  lastProspectedAt?: string;
}

// ---------------------------------------------------------------------------
// Internal state metadata
// ---------------------------------------------------------------------------

interface StateInfo {
  code: string;
  name: string;
  cities: string[];
}

// ---------------------------------------------------------------------------
// Expansion rings — concentric from Pacific Northwest outward
// ---------------------------------------------------------------------------

const EXPANSION_RINGS: string[][] = [
  // Ring 1: Pacific Northwest
  ["WA", "OR", "ID"],
  // Ring 2: West Coast + Northern Rockies
  ["CA", "NV", "MT", "WY"],
  // Ring 3: Southwest + Central Rockies
  ["AZ", "UT", "CO", "NM"],
  // Ring 4: Great Plains
  ["TX", "OK", "KS", "NE", "SD", "ND"],
  // Ring 5: Midwest
  ["MN", "IA", "MO", "AR", "LA", "WI", "IL", "MI", "IN", "OH"],
  // Ring 6: South
  ["MS", "AL", "GA", "FL", "SC", "NC", "TN", "KY", "WV", "VA"],
  // Ring 7: Northeast
  ["PA", "NY", "NJ", "CT", "RI", "MA", "VT", "NH", "ME", "MD", "DE", "DC"],
  // Ring 8: Non-contiguous
  ["HI", "AK"],
];

// ---------------------------------------------------------------------------
// Complete US state + city data
// Real cities ordered by population / restaurant density within each state.
// All 50 states + DC. 15-30 cities per state.
// ---------------------------------------------------------------------------

const US_STATES: StateInfo[] = [
  // ── Ring 1: Pacific Northwest ──────────────────────────────────────────

  {
    code: "WA",
    name: "Washington",
    cities: [
      "Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent",
      "Everett", "Renton", "Federal Way", "Yakima", "Kirkland", "Bellingham",
      "Redmond", "Auburn", "Olympia", "Lakewood", "Kennewick", "Burien",
      "Sammamish", "Bothell", "Puyallup", "Lynnwood", "Edmonds", "Issaquah",
      "Richland",
    ],
  },
  {
    code: "OR",
    name: "Oregon",
    cities: [
      "Portland", "Salem", "Eugene", "Gresham", "Hillsboro", "Bend",
      "Beaverton", "Medford", "Springfield", "Corvallis", "Albany", "Tigard",
      "Lake Oswego", "Keizer", "Grants Pass", "Oregon City", "McMinnville",
      "Redmond", "Tualatin", "Ashland", "West Linn", "Woodburn", "Newberg",
      "Wilsonville", "Roseburg",
    ],
  },
  {
    code: "ID",
    name: "Idaho",
    cities: [
      "Boise", "Meridian", "Nampa", "Idaho Falls", "Caldwell", "Pocatello",
      "Coeur d'Alene", "Twin Falls", "Post Falls", "Lewiston", "Eagle",
      "Moscow", "Kuna", "Rexburg", "Mountain Home", "Sandpoint", "Hayden",
      "Star", "Ammon", "Chubbuck",
    ],
  },

  // ── Ring 2: West Coast + Northern Rockies ──────────────────────────────

  {
    code: "CA",
    name: "California",
    cities: [
      "Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno",
      "Sacramento", "Long Beach", "Oakland", "Bakersfield", "Anaheim",
      "Santa Ana", "Riverside", "Stockton", "Irvine", "Chula Vista",
      "Fremont", "San Bernardino", "Modesto", "Moreno Valley", "Fontana",
      "Glendale", "Huntington Beach", "Santa Clarita", "Garden Grove",
      "Oceanside", "Rancho Cucamonga", "Santa Rosa", "Ontario", "Elk Grove",
      "Pasadena",
    ],
  },
  {
    code: "NV",
    name: "Nevada",
    cities: [
      "Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks",
      "Carson City", "Elko", "Mesquite", "Boulder City", "Fernley",
      "Fallon", "Winnemucca", "West Wendover", "Pahrump", "Spring Creek",
      "Sun Valley", "Dayton", "Incline Village", "Gardnerville",
      "Summerlin South",
    ],
  },
  {
    code: "MT",
    name: "Montana",
    cities: [
      "Billings", "Missoula", "Great Falls", "Bozeman", "Butte",
      "Helena", "Kalispell", "Havre", "Anaconda", "Miles City",
      "Belgrade", "Livingston", "Laurel", "Whitefish", "Sidney",
      "Lewistown", "Columbia Falls", "Polson", "Hamilton", "Dillon",
    ],
  },
  {
    code: "WY",
    name: "Wyoming",
    cities: [
      "Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs",
      "Sheridan", "Green River", "Evanston", "Riverton", "Jackson",
      "Cody", "Rawlins", "Lander", "Torrington", "Powell", "Douglas",
    ],
  },

  // ── Ring 3: Southwest + Central Rockies ────────────────────────────────

  {
    code: "AZ",
    name: "Arizona",
    cities: [
      "Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale",
      "Gilbert", "Tempe", "Peoria", "Surprise", "Yuma", "Avondale",
      "Goodyear", "Flagstaff", "Buckeye", "Lake Havasu City", "Casa Grande",
      "Maricopa", "Sierra Vista", "Prescott", "Bullhead City",
      "Apache Junction", "Prescott Valley", "Oro Valley", "San Tan Valley",
    ],
  },
  {
    code: "UT",
    name: "Utah",
    cities: [
      "Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem",
      "Sandy", "Ogden", "St. George", "Layton", "South Jordan", "Lehi",
      "Millcreek", "Taylorsville", "Logan", "Murray", "Draper", "Bountiful",
      "Riverton", "Roy", "Spanish Fork", "Pleasant Grove", "Tooele",
      "Springville", "Cedar City", "American Fork",
    ],
  },
  {
    code: "CO",
    name: "Colorado",
    cities: [
      "Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood",
      "Thornton", "Arvada", "Westminster", "Pueblo", "Centennial",
      "Boulder", "Greeley", "Longmont", "Loveland", "Broomfield",
      "Castle Rock", "Commerce City", "Parker", "Littleton", "Northglenn",
      "Brighton", "Durango", "Grand Junction", "Erie", "Steamboat Springs",
    ],
  },
  {
    code: "NM",
    name: "New Mexico",
    cities: [
      "Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell",
      "Farmington", "Hobbs", "Clovis", "Alamogordo", "Carlsbad",
      "Las Vegas", "Deming", "Gallup", "Los Lunas", "Artesia", "Lovington",
      "Silver City", "Espanola", "Bernalillo", "Sunland Park",
    ],
  },

  // ── Ring 4: Great Plains ───────────────────────────────────────────────

  {
    code: "TX",
    name: "Texas",
    cities: [
      "Houston", "San Antonio", "Dallas", "Austin", "Fort Worth",
      "El Paso", "Arlington", "Corpus Christi", "Plano", "Lubbock",
      "Laredo", "Irving", "Garland", "Frisco", "McKinney", "Amarillo",
      "Grand Prairie", "Brownsville", "Killeen", "Pasadena", "Mesquite",
      "McAllen", "Midland", "Beaumont", "Round Rock", "Denton", "Waco",
      "Odessa", "Richardson", "College Station",
    ],
  },
  {
    code: "OK",
    name: "Oklahoma",
    cities: [
      "Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond",
      "Lawton", "Moore", "Midwest City", "Enid", "Stillwater",
      "Muskogee", "Bartlesville", "Owasso", "Shawnee", "Yukon",
      "Ardmore", "Ponca City", "Bixby", "Duncan", "Jenks",
    ],
  },
  {
    code: "KS",
    name: "Kansas",
    cities: [
      "Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka",
      "Lawrence", "Shawnee", "Manhattan", "Lenexa", "Salina",
      "Hutchinson", "Leavenworth", "Leawood", "Dodge City", "Garden City",
      "Emporia", "Derby", "Junction City", "Prairie Village", "Liberal",
    ],
  },
  {
    code: "NE",
    name: "Nebraska",
    cities: [
      "Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney",
      "Fremont", "Hastings", "Norfolk", "North Platte", "Columbus",
      "Papillion", "La Vista", "Scottsbluff", "South Sioux City",
      "Beatrice", "Lexington", "Gering", "Alliance", "Blair", "York",
    ],
  },
  {
    code: "SD",
    name: "South Dakota",
    cities: [
      "Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown",
      "Mitchell", "Yankton", "Huron", "Pierre", "Spearfish",
      "Vermillion", "Brandon", "Sturgis", "Madison", "Box Elder",
      "Harrisburg",
    ],
  },
  {
    code: "ND",
    name: "North Dakota",
    cities: [
      "Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo",
      "Williston", "Dickinson", "Mandan", "Jamestown", "Wahpeton",
      "Devils Lake", "Valley City", "Grafton", "Beulah", "Rugby",
      "Watford City",
    ],
  },

  // ── Ring 5: Midwest ────────────────────────────────────────────────────

  {
    code: "MN",
    name: "Minnesota",
    cities: [
      "Minneapolis", "Saint Paul", "Rochester", "Bloomington", "Duluth",
      "Brooklyn Park", "Plymouth", "Maple Grove", "Woodbury", "St. Cloud",
      "Eagan", "Eden Prairie", "Burnsville", "Blaine", "Lakeville",
      "Minnetonka", "Apple Valley", "Edina", "Mankato", "Moorhead",
      "Shakopee", "Maplewood", "Richfield", "Cottage Grove", "Roseville",
    ],
  },
  {
    code: "IA",
    name: "Iowa",
    cities: [
      "Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City",
      "Waterloo", "Ames", "West Des Moines", "Council Bluffs", "Ankeny",
      "Dubuque", "Urbandale", "Cedar Falls", "Marion", "Bettendorf",
      "Mason City", "Marshalltown", "Clinton", "Burlington", "Waukee",
    ],
  },
  {
    code: "MO",
    name: "Missouri",
    cities: [
      "Kansas City", "St. Louis", "Springfield", "Columbia", "Independence",
      "Lee's Summit", "O'Fallon", "St. Joseph", "St. Charles",
      "Blue Springs", "Joplin", "Florissant", "Chesterfield",
      "Jefferson City", "Cape Girardeau", "Ballwin", "Wildwood",
      "University City", "Kirkwood", "Branson", "Wentzville", "Sedalia",
      "Nixa", "Liberty", "Raymore",
    ],
  },
  {
    code: "AR",
    name: "Arkansas",
    cities: [
      "Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro",
      "Rogers", "Conway", "North Little Rock", "Bentonville", "Pine Bluff",
      "Hot Springs", "Benton", "Texarkana", "Sherwood", "Jacksonville",
      "Russellville", "Cabot", "Paragould", "Searcy", "Van Buren",
    ],
  },
  {
    code: "LA",
    name: "Louisiana",
    cities: [
      "New Orleans", "Baton Rouge", "Shreveport", "Metairie", "Lafayette",
      "Lake Charles", "Kenner", "Bossier City", "Monroe", "Alexandria",
      "Houma", "New Iberia", "Slidell", "Central", "Ruston",
      "Sulphur", "Natchitoches", "Hammond", "Zachary", "Thibodaux",
    ],
  },
  {
    code: "WI",
    name: "Wisconsin",
    cities: [
      "Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine",
      "Appleton", "Waukesha", "Eau Claire", "Oshkosh", "Janesville",
      "West Allis", "La Crosse", "Sheboygan", "Wauwatosa", "Fond du Lac",
      "Brookfield", "New Berlin", "Beloit", "Greenfield", "Manitowoc",
      "Franklin", "Sun Prairie", "Fitchburg", "Oak Creek",
      "Menomonee Falls",
    ],
  },
  {
    code: "IL",
    name: "Illinois",
    cities: [
      "Chicago", "Aurora", "Naperville", "Joliet", "Rockford",
      "Springfield", "Elgin", "Peoria", "Champaign", "Waukegan",
      "Cicero", "Bloomington", "Arlington Heights", "Evanston",
      "Schaumburg", "Decatur", "Bolingbrook", "Palatine", "Skokie",
      "Des Plaines", "Orland Park", "Tinley Park", "Oak Lawn", "Berwyn",
      "Normal", "Wheaton", "Downers Grove", "Hoffman Estates", "Oak Park",
      "Mount Prospect",
    ],
  },
  {
    code: "MI",
    name: "Michigan",
    cities: [
      "Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor",
      "Lansing", "Flint", "Dearborn", "Livonia", "Troy", "Westland",
      "Farmington Hills", "Kalamazoo", "Wyoming", "Southfield",
      "Rochester Hills", "Taylor", "Royal Oak", "Pontiac",
      "St. Clair Shores", "Novi", "Dearborn Heights", "Battle Creek",
      "Saginaw", "Muskegon",
    ],
  },
  {
    code: "IN",
    name: "Indiana",
    cities: [
      "Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel",
      "Fishers", "Bloomington", "Hammond", "Gary", "Lafayette",
      "Muncie", "Terre Haute", "Noblesville", "Greenwood", "Kokomo",
      "Anderson", "Elkhart", "Mishawaka", "Lawrence", "Jeffersonville",
      "Columbus", "Westfield", "New Albany", "Richmond", "Valparaiso",
    ],
  },
  {
    code: "OH",
    name: "Ohio",
    cities: [
      "Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton",
      "Parma", "Canton", "Youngstown", "Lorain", "Hamilton", "Springfield",
      "Kettering", "Elyria", "Lakewood", "Dublin", "Cuyahoga Falls",
      "Middletown", "Newark", "Mansfield", "Mentor", "Beavercreek",
      "Strongsville", "Westerville", "Huber Heights",
    ],
  },

  // ── Ring 6: South ──────────────────────────────────────────────────────

  {
    code: "MS",
    name: "Mississippi",
    cities: [
      "Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi",
      "Meridian", "Tupelo", "Olive Branch", "Greenville", "Horn Lake",
      "Clinton", "Pearl", "Madison", "Starkville", "Ridgeland",
      "Columbus", "Vicksburg", "Pascagoula", "Ocean Springs", "Brandon",
    ],
  },
  {
    code: "AL",
    name: "Alabama",
    cities: [
      "Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa",
      "Hoover", "Dothan", "Auburn", "Decatur", "Madison", "Florence",
      "Vestavia Hills", "Prattville", "Phenix City", "Gadsden",
      "Opelika", "Alabaster", "Daphne", "Pelham", "Enterprise",
    ],
  },
  {
    code: "GA",
    name: "Georgia",
    cities: [
      "Atlanta", "Augusta", "Columbus", "Savannah", "Athens",
      "Sandy Springs", "South Fulton", "Roswell", "Macon", "Johns Creek",
      "Albany", "Warner Robins", "Alpharetta", "Marietta", "Valdosta",
      "Smyrna", "Brookhaven", "Dunwoody", "Peachtree City", "Newnan",
      "Dalton", "Gainesville", "Kennesaw", "Stonecrest", "Milton",
    ],
  },
  {
    code: "FL",
    name: "Florida",
    cities: [
      "Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg",
      "Hialeah", "Port St. Lucie", "Cape Coral", "Tallahassee",
      "Fort Lauderdale", "Pembroke Pines", "Hollywood", "Gainesville",
      "Miramar", "Coral Springs", "Palm Bay", "Clearwater", "Lakeland",
      "West Palm Beach", "Pompano Beach", "Davie", "Boca Raton",
      "Sunrise", "Deltona", "Plantation", "Fort Myers",
      "Deerfield Beach", "Kissimmee", "Sarasota", "Naples",
    ],
  },
  {
    code: "SC",
    name: "South Carolina",
    cities: [
      "Charleston", "Columbia", "North Charleston", "Mount Pleasant",
      "Rock Hill", "Greenville", "Summerville", "Goose Creek",
      "Hilton Head Island", "Sumter", "Florence", "Spartanburg",
      "Myrtle Beach", "Greer", "Anderson", "Aiken", "Mauldin",
      "Bluffton", "Easley", "Simpsonville",
    ],
  },
  {
    code: "NC",
    name: "North Carolina",
    cities: [
      "Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem",
      "Fayetteville", "Cary", "Wilmington", "High Point", "Concord",
      "Asheville", "Greenville", "Gastonia", "Jacksonville",
      "Chapel Hill", "Huntersville", "Apex", "Mooresville", "Wake Forest",
      "Holly Springs", "Burlington", "Kannapolis", "Monroe",
      "Rocky Mount", "Hickory",
    ],
  },
  {
    code: "TN",
    name: "Tennessee",
    cities: [
      "Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville",
      "Murfreesboro", "Franklin", "Jackson", "Johnson City", "Bartlett",
      "Hendersonville", "Kingsport", "Collierville", "Smyrna",
      "Cleveland", "Brentwood", "Spring Hill", "Germantown", "Gallatin",
      "Cookeville", "Mount Juliet", "Lebanon", "Columbia", "La Vergne",
      "Maryville",
    ],
  },
  {
    code: "KY",
    name: "Kentucky",
    cities: [
      "Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington",
      "Richmond", "Georgetown", "Florence", "Hopkinsville",
      "Nicholasville", "Elizabethtown", "Henderson", "Frankfort",
      "Paducah", "Radcliff", "Ashland", "Madisonville", "Murray",
      "Danville", "Erlanger",
    ],
  },
  {
    code: "WV",
    name: "West Virginia",
    cities: [
      "Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling",
      "Weirton", "Fairmont", "Martinsburg", "Beckley", "Clarksburg",
      "South Charleston", "St. Albans", "Vienna", "Bluefield",
      "Bridgeport", "Elkins",
    ],
  },
  {
    code: "VA",
    name: "Virginia",
    cities: [
      "Virginia Beach", "Norfolk", "Chesapeake", "Richmond",
      "Newport News", "Alexandria", "Hampton", "Roanoke", "Portsmouth",
      "Suffolk", "Lynchburg", "Harrisonburg", "Leesburg",
      "Charlottesville", "Manassas", "Danville", "Fredericksburg",
      "Winchester", "Salem", "Staunton", "Blacksburg", "Herndon",
      "Ashburn", "Sterling", "Centreville",
    ],
  },

  // ── Ring 7: Northeast ──────────────────────────────────────────────────

  {
    code: "PA",
    name: "Pennsylvania",
    cities: [
      "Philadelphia", "Pittsburgh", "Allentown", "Reading", "Erie",
      "Bethlehem", "Scranton", "Lancaster", "Harrisburg", "York",
      "Wilkes-Barre", "State College", "Chester", "Easton",
      "Williamsport", "Norristown", "King of Prussia", "Levittown",
      "Abington", "West Chester", "Pottstown", "Doylestown",
      "Mechanicsburg", "Chambersburg", "Carlisle",
    ],
  },
  {
    code: "NY",
    name: "New York",
    cities: [
      "New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse",
      "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica",
      "White Plains", "Hempstead", "Troy", "Binghamton", "Ithaca",
      "Long Beach", "Saratoga Springs", "Poughkeepsie", "Niagara Falls",
      "Jamestown", "Newburgh", "Middletown", "Elmira", "Freeport",
      "Valley Stream", "Kingston", "Ossining", "Mamaroneck", "Peekskill",
      "Glen Cove",
    ],
  },
  {
    code: "NJ",
    name: "New Jersey",
    cities: [
      "Newark", "Jersey City", "Paterson", "Elizabeth", "Lakewood",
      "Edison", "Woodbridge", "Toms River", "Hamilton", "Trenton",
      "Clifton", "Camden", "Brick", "Cherry Hill", "Passaic",
      "Middletown", "Union City", "Old Bridge", "Gloucester Township",
      "North Bergen", "Vineland", "Bayonne", "East Orange", "Franklin",
      "Piscataway",
    ],
  },
  {
    code: "CT",
    name: "Connecticut",
    cities: [
      "Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury",
      "Norwalk", "Danbury", "New Britain", "West Hartford", "Greenwich",
      "Fairfield", "Hamden", "Meriden", "Bristol", "Manchester",
      "West Haven", "Milford", "Middletown", "Shelton", "Norwich",
    ],
  },
  {
    code: "RI",
    name: "Rhode Island",
    cities: [
      "Providence", "Warwick", "Cranston", "Pawtucket", "East Providence",
      "Woonsocket", "Newport", "Central Falls", "Cumberland",
      "North Providence", "Coventry", "West Warwick", "Johnston",
      "South Kingstown", "North Kingstown", "Bristol",
    ],
  },
  {
    code: "MA",
    name: "Massachusetts",
    cities: [
      "Boston", "Worcester", "Springfield", "Cambridge", "Lowell",
      "Brockton", "New Bedford", "Quincy", "Lynn", "Fall River",
      "Newton", "Somerville", "Lawrence", "Framingham", "Haverhill",
      "Waltham", "Brookline", "Malden", "Medford", "Taunton",
      "Chicopee", "Weymouth", "Revere", "Peabody", "Plymouth",
    ],
  },
  {
    code: "VT",
    name: "Vermont",
    cities: [
      "Burlington", "South Burlington", "Rutland", "Barre", "Montpelier",
      "Winooski", "St. Albans", "Bennington", "Brattleboro",
      "Essex Junction", "Middlebury", "St. Johnsbury", "Williston",
      "Shelburne", "Stowe", "Vergennes",
    ],
  },
  {
    code: "NH",
    name: "New Hampshire",
    cities: [
      "Manchester", "Nashua", "Concord", "Derry", "Dover",
      "Rochester", "Salem", "Merrimack", "Keene", "Bedford",
      "Portsmouth", "Londonderry", "Laconia", "Lebanon", "Hampton",
      "Hanover",
    ],
  },
  {
    code: "ME",
    name: "Maine",
    cities: [
      "Portland", "Lewiston", "Bangor", "South Portland", "Auburn",
      "Biddeford", "Sanford", "Saco", "Westbrook", "Augusta",
      "Scarborough", "Brunswick", "Windham", "Gorham", "Waterville",
      "Kennebunk",
    ],
  },
  {
    code: "MD",
    name: "Maryland",
    cities: [
      "Baltimore", "Columbia", "Germantown", "Silver Spring", "Waldorf",
      "Frederick", "Ellicott City", "Glen Burnie", "Bethesda",
      "Rockville", "Gaithersburg", "Bowie", "Hagerstown", "Annapolis",
      "College Park", "Towson", "Severna Park", "Salisbury", "Laurel",
      "Owings Mills", "Dundalk", "Catonsville", "Odenton", "Severn",
      "Pikesville",
    ],
  },
  {
    code: "DE",
    name: "Delaware",
    cities: [
      "Wilmington", "Dover", "Newark", "Middletown", "Bear",
      "Glasgow", "Hockessin", "Brookside", "Smyrna", "Milford",
      "Seaford", "Georgetown", "Lewes", "Rehoboth Beach", "New Castle",
      "Elsmere",
    ],
  },
  {
    code: "DC",
    name: "District of Columbia",
    cities: [
      "Washington", "Georgetown", "Dupont Circle", "Capitol Hill",
      "Adams Morgan", "Columbia Heights", "U Street", "Shaw",
      "Navy Yard", "Penn Quarter", "Foggy Bottom", "Cleveland Park",
      "Tenleytown", "Brookland", "Petworth", "H Street",
    ],
  },

  // ── Ring 8: Non-contiguous ─────────────────────────────────────────────

  {
    code: "HI",
    name: "Hawaii",
    cities: [
      "Honolulu", "Pearl City", "Hilo", "Kailua", "Waipahu",
      "Kaneohe", "Mililani Town", "Kahului", "Ewa Beach", "Kapolei",
      "Kihei", "Lahaina", "Aiea", "Wailuku", "Haleiwa",
      "Kailua-Kona",
    ],
  },
  {
    code: "AK",
    name: "Alaska",
    cities: [
      "Anchorage", "Fairbanks", "Juneau", "Wasilla", "Sitka",
      "Ketchikan", "Kenai", "Kodiak", "Palmer", "Bethel",
      "Homer", "Soldotna", "Valdez", "Nome", "Seward",
      "North Pole",
    ],
  },
];

// ---------------------------------------------------------------------------
// Fast lookup: stateCode -> StateInfo
// ---------------------------------------------------------------------------

const STATE_MAP = new Map<string, StateInfo>();
for (const state of US_STATES) {
  STATE_MAP.set(state.code, state);
}

// ---------------------------------------------------------------------------
// In-memory fallback store
// ---------------------------------------------------------------------------

const memoryStore = new Map<string, GeoProgress>();

function makeId(city: string, stateCode: string): string {
  return `${stateCode}:${city}`;
}

// ---------------------------------------------------------------------------
// DB row <-> GeoProgress mapping helpers
// ---------------------------------------------------------------------------

interface DbGeoProgress {
  id: string;
  state: string;
  city: string;
  status: string;
  prospects_found: number;
  sites_built: number;
  last_prospected_at: string | null;
  created_at: string;
}

function fromDbRow(row: DbGeoProgress): GeoProgress {
  return {
    id: row.id,
    state: row.state,
    city: row.city,
    status: row.status as GeoProgress["status"],
    prospectsFound: row.prospects_found,
    sitesBuilt: row.sites_built,
    lastProspectedAt: row.last_prospected_at ?? undefined,
  };
}

function toDbRow(gp: GeoProgress): DbGeoProgress {
  return {
    id: gp.id,
    state: gp.state,
    city: gp.city,
    status: gp.status,
    prospects_found: gp.prospectsFound,
    sites_built: gp.sitesBuilt,
    last_prospected_at: gp.lastProspectedAt ?? null,
    created_at: new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Internal data-access helpers (Supabase with in-memory fallback)
// ---------------------------------------------------------------------------

/**
 * Get the progress record for a specific city.
 */
async function getProgressRecord(
  city: string,
  stateCode: string
): Promise<GeoProgress | null> {
  const id = makeId(city, stateCode);

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("geo_progress")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to memory
      } else if (error.code === "PGRST116") {
        // No rows — city not tracked yet
        return null;
      } else {
        console.warn(
          `[GeoExpansion] Error fetching progress for ${id}: ${error.message}`
        );
        return null;
      }
    } else if (data) {
      return fromDbRow(data as DbGeoProgress);
    }
  }

  return memoryStore.get(id) ?? null;
}

/**
 * Get all progress records.
 */
async function getAllProgressRecords(): Promise<GeoProgress[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("geo_progress")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to memory
      } else {
        console.warn(
          `[GeoExpansion] Error fetching all progress: ${error.message}`
        );
        return [];
      }
    } else if (data) {
      return (data as DbGeoProgress[]).map(fromDbRow);
    }
  }

  return Array.from(memoryStore.values());
}

/**
 * Upsert a progress record (insert or update).
 */
async function upsertProgress(gp: GeoProgress): Promise<void> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const dbRow = toDbRow(gp);
    const { error } = await sb
      .from("geo_progress")
      .upsert(dbRow, { onConflict: "id" });

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to memory
      } else {
        console.warn(
          `[GeoExpansion] Error upserting progress for ${gp.id}: ${error.message}`
        );
        // Still store in memory as fallback
      }
    } else {
      return; // Supabase write succeeded
    }
  }

  memoryStore.set(gp.id, gp);
}

// ---------------------------------------------------------------------------
// Internal ring/city helpers
// ---------------------------------------------------------------------------

/**
 * Get all cities in a given ring (0-indexed), preserving state order within
 * the ring and population order within each state.
 */
function getCitiesInRing(
  ringIndex: number
): Array<{ city: string; stateCode: string; stateName: string }> {
  if (ringIndex < 0 || ringIndex >= EXPANSION_RINGS.length) return [];

  const stateCodes = EXPANSION_RINGS[ringIndex];
  const cities: Array<{
    city: string;
    stateCode: string;
    stateName: string;
  }> = [];

  for (const code of stateCodes) {
    const state = STATE_MAP.get(code);
    if (!state) continue;
    for (const city of state.cities) {
      cities.push({ city, stateCode: code, stateName: state.name });
    }
  }

  return cities;
}

// ---------------------------------------------------------------------------
// Exported API
// ---------------------------------------------------------------------------

/**
 * Get the next N cities to prospect.
 *
 * Picks from the current (lowest non-exhausted) ring. Within a ring, selects
 * cities that are still "pending" (never prospected). When all cities in a
 * ring are exhausted or active, advances to the next ring.
 */
export async function getNextTargetAreas(
  limit: number = 5
): Promise<GeoTarget[]> {
  const allProgress = await getAllProgressRecords();
  const progressMap = new Map<string, GeoProgress>();
  for (const p of allProgress) {
    progressMap.set(p.id, p);
  }

  const targets: GeoTarget[] = [];

  for (
    let ringIdx = 0;
    ringIdx < EXPANSION_RINGS.length && targets.length < limit;
    ringIdx++
  ) {
    const cities = getCitiesInRing(ringIdx);

    for (const { city, stateCode, stateName } of cities) {
      if (targets.length >= limit) break;

      const id = makeId(city, stateCode);
      const existing = progressMap.get(id);

      // Skip cities that are already exhausted, active, or skipped
      if (existing && existing.status !== "pending") continue;

      targets.push({
        city,
        state: stateName,
        stateCode,
        searchQuery: `${city} ${stateCode}`,
      });
    }

    // If we found targets in this ring, stay focused here (don't jump ahead)
    if (targets.length > 0) break;
  }

  // Mark the selected targets as "active"
  for (const target of targets) {
    const id = makeId(target.city, target.stateCode);
    const existing = progressMap.get(id);

    if (!existing) {
      await upsertProgress({
        id,
        state: target.stateCode,
        city: target.city,
        status: "active",
        prospectsFound: 0,
        sitesBuilt: 0,
      });
    } else {
      await upsertProgress({ ...existing, status: "active" });
    }
  }

  if (targets.length > 0) {
    const states = Array.from(new Set(targets.map((t) => t.stateCode))).join(", ");
    console.warn(
      `[GeoExpansion] Returning ${targets.length} targets in ${states}`
    );
  } else {
    console.warn(
      "[GeoExpansion] No remaining target areas — all cities processed"
    );
  }

  return targets;
}

/**
 * Update a city's progress after a pipeline run completes.
 * Accumulates prospects_found and sites_built across multiple runs.
 */
export async function updateGeoProgress(
  city: string,
  stateCode: string,
  prospectsFound: number,
  sitesBuilt: number
): Promise<void> {
  const id = makeId(city, stateCode);
  const existing = await getProgressRecord(city, stateCode);
  const now = new Date().toISOString();

  if (existing) {
    await upsertProgress({
      ...existing,
      prospectsFound: existing.prospectsFound + prospectsFound,
      sitesBuilt: existing.sitesBuilt + sitesBuilt,
      lastProspectedAt: now,
      status: "active",
    });
  } else {
    await upsertProgress({
      id,
      state: stateCode,
      city,
      status: "active",
      prospectsFound,
      sitesBuilt,
      lastProspectedAt: now,
    });
  }

  console.warn(
    `[GeoExpansion] Updated ${id}: +${prospectsFound} prospects, +${sitesBuilt} sites`
  );
}

/**
 * Mark a city as exhausted.
 *
 * Called when Google Places returns fewer than 2 new prospects for a city,
 * indicating there are no more untapped restaurants to discover there.
 */
export async function markCityExhausted(
  city: string,
  stateCode: string
): Promise<void> {
  const id = makeId(city, stateCode);
  const existing = await getProgressRecord(city, stateCode);
  const now = new Date().toISOString();

  if (existing) {
    await upsertProgress({
      ...existing,
      status: "exhausted",
      lastProspectedAt: now,
    });
  } else {
    await upsertProgress({
      id,
      state: stateCode,
      city,
      status: "exhausted",
      prospectsFound: 0,
      sitesBuilt: 0,
      lastProspectedAt: now,
    });
  }

  console.warn(`[GeoExpansion] Marked ${id} as exhausted`);
}

/**
 * Skip a city (e.g., too small, regulatory issue, manual override).
 */
export async function skipCity(
  city: string,
  stateCode: string
): Promise<void> {
  const id = makeId(city, stateCode);
  const existing = await getProgressRecord(city, stateCode);

  if (existing) {
    await upsertProgress({ ...existing, status: "skipped" });
  } else {
    await upsertProgress({
      id,
      state: stateCode,
      city,
      status: "skipped",
      prospectsFound: 0,
      sitesBuilt: 0,
    });
  }

  console.warn(`[GeoExpansion] Skipped ${id}`);
}

/**
 * Get the current expansion status for the admin dashboard / reporting.
 */
export async function getExpansionStatus(): Promise<{
  currentRing: number;
  currentState: string;
  citiesProspected: number;
  citiesRemaining: number;
  totalProspects: number;
  totalSitesBuilt: number;
  stateBreakdown: Array<{
    state: string;
    cities: number;
    prospects: number;
    sites: number;
  }>;
}> {
  const allProgress = await getAllProgressRecords();
  const progressMap = new Map<string, GeoProgress>();
  for (const p of allProgress) {
    progressMap.set(p.id, p);
  }

  // Count total cities across all states
  let totalCities = 0;
  for (const state of US_STATES) {
    totalCities += state.cities.length;
  }

  // Aggregate stats
  let citiesProspected = 0;
  let totalProspects = 0;
  let totalSitesBuilt = 0;

  const stateStats = new Map<
    string,
    { cities: number; prospects: number; sites: number }
  >();

  for (const p of allProgress) {
    if (p.status === "active" || p.status === "exhausted") {
      citiesProspected++;
    }
    totalProspects += p.prospectsFound;
    totalSitesBuilt += p.sitesBuilt;

    const existing = stateStats.get(p.state) || {
      cities: 0,
      prospects: 0,
      sites: 0,
    };
    existing.cities++;
    existing.prospects += p.prospectsFound;
    existing.sites += p.sitesBuilt;
    stateStats.set(p.state, existing);
  }

  // Determine current ring: the lowest ring that still has pending cities
  let currentRing = EXPANSION_RINGS.length;
  let currentState = "Not started";

  for (let ringIdx = 0; ringIdx < EXPANSION_RINGS.length; ringIdx++) {
    const cities = getCitiesInRing(ringIdx);
    const hasPending = cities.some((c) => {
      const id = makeId(c.city, c.stateCode);
      const p = progressMap.get(id);
      return !p || p.status === "pending";
    });

    if (hasPending) {
      currentRing = ringIdx + 1; // 1-indexed for display
      // Find the first state in this ring with pending cities
      for (const code of EXPANSION_RINGS[ringIdx]) {
        const state = STATE_MAP.get(code);
        if (!state) continue;
        const statePending = state.cities.some((city) => {
          const id = makeId(city, code);
          const p = progressMap.get(id);
          return !p || p.status === "pending";
        });
        if (statePending) {
          currentState = state.name;
          break;
        }
      }
      break;
    }
  }

  // Build state breakdown, sorted in expansion ring order
  const stateBreakdown: Array<{
    state: string;
    cities: number;
    prospects: number;
    sites: number;
  }> = [];

  for (const state of US_STATES) {
    const stats = stateStats.get(state.code);
    if (stats && stats.cities > 0) {
      stateBreakdown.push({
        state: `${state.name} (${state.code})`,
        cities: stats.cities,
        prospects: stats.prospects,
        sites: stats.sites,
      });
    }
  }

  return {
    currentRing,
    currentState,
    citiesProspected,
    citiesRemaining: totalCities - citiesProspected,
    totalProspects,
    totalSitesBuilt,
    stateBreakdown,
  };
}

// ---------------------------------------------------------------------------
// Utility exports for orchestrator, scripts, and dashboard
// ---------------------------------------------------------------------------

/**
 * Get total number of cities in the system across all 50 states + DC.
 */
export function getTotalCityCount(): number {
  let count = 0;
  for (const state of US_STATES) {
    count += state.cities.length;
  }
  return count;
}

/**
 * Get all states in expansion order with metadata.
 */
export function getStatesInExpansionOrder(): Array<{
  code: string;
  name: string;
  ring: number;
  cityCount: number;
}> {
  const result: Array<{
    code: string;
    name: string;
    ring: number;
    cityCount: number;
  }> = [];

  for (let ringIdx = 0; ringIdx < EXPANSION_RINGS.length; ringIdx++) {
    for (const code of EXPANSION_RINGS[ringIdx]) {
      const state = STATE_MAP.get(code);
      if (state) {
        result.push({
          code: state.code,
          name: state.name,
          ring: ringIdx + 1,
          cityCount: state.cities.length,
        });
      }
    }
  }

  return result;
}

/**
 * Get all cities for a specific state.
 */
export function getCitiesForState(stateCode: string): string[] {
  const state = STATE_MAP.get(stateCode.toUpperCase());
  return state ? [...state.cities] : [];
}

/**
 * Reset a city back to pending status (for re-prospecting).
 */
export async function resetCity(
  city: string,
  stateCode: string
): Promise<void> {
  const id = makeId(city, stateCode);
  const existing = await getProgressRecord(city, stateCode);

  if (existing) {
    await upsertProgress({
      ...existing,
      status: "pending",
      prospectsFound: 0,
      sitesBuilt: 0,
      lastProspectedAt: undefined,
    });
    console.warn(`[GeoExpansion] Reset ${id} to pending`);
  }
}

/**
 * Get a summary of a specific ring (1-indexed).
 */
export async function getRingSummary(ringNumber: number): Promise<{
  ring: number;
  states: string[];
  totalCities: number;
  prospected: number;
  exhausted: number;
  pending: number;
  totalProspects: number;
  totalSites: number;
}> {
  const ringIdx = ringNumber - 1;
  if (ringIdx < 0 || ringIdx >= EXPANSION_RINGS.length) {
    return {
      ring: ringNumber,
      states: [],
      totalCities: 0,
      prospected: 0,
      exhausted: 0,
      pending: 0,
      totalProspects: 0,
      totalSites: 0,
    };
  }

  const allProgress = await getAllProgressRecords();
  const progressMap = new Map<string, GeoProgress>();
  for (const p of allProgress) {
    progressMap.set(p.id, p);
  }

  const cities = getCitiesInRing(ringIdx);
  const stateNames = EXPANSION_RINGS[ringIdx].map(
    (code) => STATE_MAP.get(code)?.name ?? code
  );

  let prospected = 0;
  let exhausted = 0;
  let pending = 0;
  let totalProspects = 0;
  let totalSites = 0;

  for (const { city, stateCode } of cities) {
    const id = makeId(city, stateCode);
    const p = progressMap.get(id);

    if (!p || p.status === "pending") {
      pending++;
    } else if (p.status === "exhausted") {
      exhausted++;
      totalProspects += p.prospectsFound;
      totalSites += p.sitesBuilt;
    } else if (p.status === "active") {
      prospected++;
      totalProspects += p.prospectsFound;
      totalSites += p.sitesBuilt;
    }
    // Skipped cities don't count toward any progress bucket
  }

  return {
    ring: ringNumber,
    states: stateNames,
    totalCities: cities.length,
    prospected,
    exhausted,
    pending,
    totalProspects,
    totalSites,
  };
}

/**
 * Get all cities that were prospected since a given timestamp.
 * Useful for daily reporting.
 */
export async function getCitiesProspectedSince(
  since: string
): Promise<GeoProgress[]> {
  const sinceDate = new Date(since);
  const allProgress = await getAllProgressRecords();

  return allProgress.filter(
    (p) =>
      p.lastProspectedAt && new Date(p.lastProspectedAt) >= sinceDate
  );
}

/**
 * Get all cities currently marked as exhausted.
 */
export async function getExhaustedCities(): Promise<GeoProgress[]> {
  const allProgress = await getAllProgressRecords();
  return allProgress.filter((p) => p.status === "exhausted");
}
