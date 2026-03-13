const fs = require('fs');
require('dotenv').config({ path: '.env.local' });

const GOOGLE_API_KEY = process.env.GOOGLE_PLACES_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!GOOGLE_API_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Missing GOOGLE_PLACES_API_KEY / NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
}

const targets = [
  {
    slug: 'kirkland-bakery',
    placeId: 'ChIJVQAcb90SkFQRScpTvUgII6k',
    type: 'cafe-bakery',
    cuisine: ['french', 'american'],
    palette: { primaryColor: '#6b4f35', secondaryColor: '#8c6a47', accentColor: '#d4a574' },
    menu: {
      sections: [
        { name: 'Breakfast Pastries', items: [['Butter Croissant',5.25],['Chocolate Croissant',5.75],['Almond Croissant',6.25],['Morning Bun',5.5],['Pain au Chocolat',5.95]] },
        { name: 'Artisan Breads', items: [['Sourdough Loaf',8.5],['Country Levain',9],['Baguette',4.25],['Seeded Multigrain',9.5]] },
        { name: 'Cakes & Sweets', items: [['Tiramisu Slice',8.5],['Chocolate Tart',8.25],['Fruit Danish',5.95],['Lemon Bar',4.95]] },
        { name: 'Coffee & Tea', items: [['Cappuccino',5.25],['Latte',5.75],['Mocha',6.25],['Matcha Latte',6.5]] }
      ]
    }
  },
  {
    slug: 'super-gyros',
    placeId: 'ChIJwboFB4cNkFQRv0NVutISLik',
    type: 'fast-casual',
    cuisine: ['mediterranean'],
    palette: { primaryColor: '#5f3b1f', secondaryColor: '#8a5a2b', accentColor: '#e3a008' },
    menu: {
      sections: [
        { name: 'Gyros', items: [['Lamb & Beef Gyro',13.95],['Chicken Gyro',13.5],['Falafel Gyro',12.95],['Spicy Gyro',14.5]] },
        { name: 'Plates', items: [['Gyro Plate',17.95],['Chicken Souvlaki Plate',18.5],['Falafel Plate',16.95],['Mixed Grill Plate',22.5]] },
        { name: 'Sides', items: [['Greek Fries',6.95],['Hummus & Pita',7.5],['Dolmas',7.25],['Greek Salad',8.95]] },
        { name: 'Beverages', items: [['Fountain Drink',2.95],['Bottled Water',2.5],['Baklava',4.95],['Iced Tea',3.25]] }
      ]
    }
  },
  {
    slug: 'seattle-cinnamon-roll-co',
    placeId: 'ChIJ1547AyoMkFQRGRPXK6QOAEA',
    type: 'cafe-bakery',
    cuisine: ['american'],
    palette: { primaryColor: '#6b3f22', secondaryColor: '#8b5a2b', accentColor: '#f59e0b' },
    menu: {
      sections: [
        { name: 'Signature Rolls', items: [['Classic Cinnamon Roll',6.75],['Cream Cheese Cinnamon Roll',7.5],['Maple Pecan Roll',7.95],['Caramel Apple Roll',8.25]] },
        { name: 'Mini Packs', items: [['Half Dozen Minis',18],['Dozen Minis',34],['Party Pack (24)',62]] },
        { name: 'Savory & Breakfast', items: [['Breakfast Sandwich',8.95],['Bagel & Schmear',5.95],['Breakfast Burrito',9.95]] },
        { name: 'Drinks', items: [['Drip Coffee',3.5],['Cold Brew',4.75],['Chai Latte',5.75],['Hot Chocolate',4.95]] }
      ]
    }
  },
  {
    slug: 'mio-streetfood',
    placeId: 'ChIJPWolSg0PkFQRbL-GdmAT88s',
    type: 'food-truck',
    cuisine: ['fusion', 'mexican'],
    palette: { primaryColor: '#111827', secondaryColor: '#1f2937', accentColor: '#f97316' },
    menu: {
      sections: [
        { name: 'Tacos', items: [['Carne Asada Taco',4.25],['Chicken Adobo Taco',4],['Pork Belly Taco',4.75],['Mushroom Taco',3.95]] },
        { name: 'Street Bowls', items: [['Asada Rice Bowl',13.95],['Chicken Bowl',13.5],['Veggie Bowl',12.5],['Mio Signature Bowl',14.5]] },
        { name: 'Quesadillas & Burritos', items: [['Cheese Quesadilla',10.95],['Asada Quesadilla',12.95],['Chicken Burrito',12.95],['Loaded Burrito',14.95]] },
        { name: 'Sides & Drinks', items: [['Chips & Salsa',4.95],['Street Corn Cup',5.95],['Mexican Coke',3.95],['Horchata',4.5]] }
      ]
    }
  },
  {
    slug: 'grounds-coffee-co',
    placeId: 'ChIJsaFwqrQNkFQR44AJ56Fr3Jw',
    type: 'cafe-bakery',
    cuisine: ['american'],
    palette: { primaryColor: '#3f2a1d', secondaryColor: '#5a3d2b', accentColor: '#0ea5e9' },
    menu: {
      sections: [
        { name: 'Espresso Bar', items: [['Espresso',3.25],['Americano',4.25],['Latte',5.5],['Vanilla Latte',6],['Mocha',6.25]] },
        { name: 'Breakfast', items: [['Avocado Toast',9.95],['Breakfast Sandwich',8.95],['Yogurt Parfait',7.5],['Steel Cut Oats',6.95]] },
        { name: 'Lunch', items: [['Turkey Pesto Panini',11.95],['Caprese Sandwich',10.95],['Chicken Salad Croissant',10.5],['Soup of the Day',6.95]] },
        { name: 'Pastries', items: [['Blueberry Muffin',4.25],['Scone',4.5],['Cookie',3.5],['Banana Bread',4.75]] }
      ]
    }
  }
];

const dayMap = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];

function slugify(s){return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');}

function buildHours(periods){
  if (!periods || !periods.length) {
    return dayMap.slice(1).concat(dayMap[0]).map((d) => ({ day:d, open:'11:00', close:'21:00', closed:false }));
  }
  const out = [];
  for (let i=1;i<=7;i++) {
    const p = periods.find(x=>x.open && x.open.day=== (i%7));
    if (!p || !p.open || !p.close) {
      out.push({ day: dayMap[i%7], open:'11:00', close:'21:00', closed:true });
    } else {
      const oo = p.open.time || '1100';
      const cc = p.close.time || '2100';
      out.push({ day: dayMap[i%7], open:`${oo.slice(0,2)}:${oo.slice(2,4)}`, close:`${cc.slice(0,2)}:${cc.slice(2,4)}`, closed:false });
    }
  }
  return out;
}

function describeItem(name, section){
  const n = name.toLowerCase();
  const s = section.toLowerCase();
  if (n.includes('croissant')) return 'Buttery, flaky layers baked golden each morning.';
  if (n.includes('gyro')) return 'Warm pita packed with seasoned meat, crisp veggies, and house tzatziki.';
  if (n.includes('taco')) return 'Street-style taco finished with fresh salsa and citrus.';
  if (n.includes('latte')) return 'Smooth espresso and steamed milk with balanced sweetness.';
  if (n.includes('bowl')) return 'Hearty bowl built with fresh toppings and bold house flavors.';
  if (n.includes('salad')) return 'Crisp greens and bright toppings tossed to order.';
  if (n.includes('baklava')) return 'Honeyed pastry layers with crunchy nuts and warm spice notes.';
  if (n.includes('sandwich') || n.includes('panini')) return 'Toasted and melty with house-prepped fillings and fresh bread.';
  if (s.includes('coffee') || s.includes('drinks') || s.includes('espresso')) return 'Made to order with premium beans and careful extraction.';
  return `${name} made to order with fresh ingredients and house seasoning.`;
}

function makeMenu(menuSections){
  return {
    lastUpdated: new Date().toISOString().slice(0,10),
    sections: menuSections.sections.map((s,si)=>(
      {
        id: slugify(s.name),
        name: s.name,
        sortOrder: si+1,
        isActive: true,
        items: s.items.map(([name,price],ii)=>({
          id: `${slugify(name)}-${ii+1}`,
          name,
          slug: slugify(name),
          description: describeItem(name, s.name),
          price,
          image: undefined,
          dietary: [],
          allergens: [],
          isPopular: ii<2,
          isChefPick: ii===0,
          isNew: false,
          isSoldOut: false,
          sortOrder: ii+1,
        }))
      }
    ))
  }
}

async function placeDetails(placeId){
  const fields = 'place_id,name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,types,geometry,photos,reviews,editorial_summary,current_opening_hours,url';
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=${encodeURIComponent(fields)}&reviews_sort=newest&key=${GOOGLE_API_KEY}`;
  const r = await fetch(url); const j = await r.json();
  if (j.status !== 'OK') throw new Error(`Place details failed ${placeId}: ${j.status}`);
  return j.result;
}

function photoUrl(ref){
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1600&photo_reference=${encodeURIComponent(ref)}&key=${GOOGLE_API_KEY}`;
}

function parseAddress(formatted){
  const parts = (formatted||'').split(',').map(s=>s.trim());
  const street = parts[0] || '';
  const city = parts[1] || '';
  const stateZip = parts[2] || '';
  const m = stateZip.match(/([A-Z]{2})\s+(\d{5})/);
  return { street, city, state: m?.[1]||'WA', zip: m?.[2]||'98000' };
}

async function upsertRestaurant(config){
  const row = { id: config.id, slug: config.slug, domain: null, config };
  const res = await fetch(`${SUPABASE_URL}/rest/v1/restaurants`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=representation'
    },
    body: JSON.stringify([row])
  });
  const txt = await res.text();
  if (!res.ok) throw new Error(`restaurants upsert failed ${res.status}: ${txt}`);
}

async function patchLead(slug){
  const url = `https://northstar-restaurant-platform.vercel.app/demo/${slug}`;
  await fetch(`${SUPABASE_URL}/rest/v1/leads?preview_url=like.*${encodeURIComponent(slug)}*`, {
    method: 'PATCH',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ preview_url: url, updated_at: new Date().toISOString() })
  });
}

(async()=>{
  const out = [];
  for (const t of targets) {
    const d = await placeDetails(t.placeId);
    const addr = parseAddress(d.formatted_address || '');
    const photos = (d.photos || []).slice(0,8).map(p=>photoUrl(p.photo_reference));
    const reviews = (d.reviews || [])
      .filter(r => r.text && r.text.trim().length > 20)
      .slice(0,6)
      .map(r => (
        { source:'google', author:r.author_name, rating:r.rating, text:r.text.trim(), date:new Date((r.time||0)*1000).toISOString().slice(0,10), photoUrl:r.profile_photo_url }
      ));

    const config = {
      id: t.slug,
      name: d.name,
      slug: t.slug,
      tagline: d.editorial_summary?.overview || `${d.name} in ${addr.city}`,
      description: d.editorial_summary?.overview || `${d.name} menu, reviews, and online ordering.`,
      cuisine: t.cuisine,
      type: t.type,
      contact: { phone: d.formatted_phone_number || '', website: d.website || '' },
      hours: buildHours(d.current_opening_hours?.periods),
      location: {
        address: addr.street,
        city: addr.city,
        state: addr.state,
        zip: addr.zip,
        lat: d.geometry?.location?.lat || 0,
        lng: d.geometry?.location?.lng || 0,
        isFixed: true,
      },
      branding: {
        ...t.palette,
        backgroundColor: '#ffffff',
        textColor: '#111827',
        fontHeading: 'system-ui, sans-serif',
        fontBody: 'system-ui, sans-serif',
        heroImage: photos[0],
        template: t.type,
      },
      menu: makeMenu(t.menu),
      socialMedia: {
        googleBusinessUrl: d.url || undefined,
        googlePlaceId: d.place_id || t.placeId,
      },
      features: {
        tier: 'growth', onlineOrdering: true, loyaltyProgram: false, reservations: t.type !== 'food-truck', giftCards: false,
        emailMarketing: false, smsMarketing: false, qrOrdering: false, cateringPortal: false, multiLanguage: false,
        posIntegration: false, deliveryIntegration: false, foodTruckFeatures: t.type === 'food-truck'
      },
      reviews: {
        averageRating: d.rating || 4.5,
        totalReviews: d.user_ratings_total || reviews.length,
        googleRating: d.rating || 4.5,
        googleReviewCount: d.user_ratings_total || reviews.length,
        featuredReviews: reviews,
      },
      createdAt: new Date().toISOString().slice(0,10),
      updatedAt: new Date().toISOString().slice(0,10),
    };

    await upsertRestaurant(config);
    out.push({ name: d.name, slug: t.slug, url: `https://northstar-restaurant-platform.vercel.app/demo/${t.slug}` });
  }

  fs.writeFileSync('demo_rebuild_results.json', JSON.stringify(out, null, 2));
  console.log(JSON.stringify(out, null, 2));

  // Auto-enrich with AI hero videos (runs after all demos are built)
  if (process.env.FAL_API_KEY) {
    console.log('\n--- Generating AI hero videos for new demos ---');
    const { execSync } = require('child_process');
    for (const t of targets) {
      try {
        console.log(`Generating video for ${t.slug}...`);
        execSync(`node scripts/enrich-demos-with-video.js --slug ${t.slug}`, { stdio: 'inherit' });
      } catch (e) {
        console.warn(`Video generation failed for ${t.slug} — demo still live without video`);
      }
    }
  }
})();