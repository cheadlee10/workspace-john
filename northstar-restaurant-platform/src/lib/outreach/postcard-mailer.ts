/**
 * Physical Postcard Mailer via Lob.com API
 *
 * Sends a premium physical postcard to restaurants:
 * - Front: Full-bleed website screenshot with refined typographic overlay
 * - Back: Warm, personal pitch + scannable QR code
 *
 * Upgraded to 6x9" for more visual impact and a professional feel.
 * Costs: ~$0.85-$1.20 per postcard (6x9")
 * Delivery: 3-5 business days
 *
 * Why postcards? Restaurant owners are BOMBARDED with digital outreach.
 * A physical piece of mail with their restaurant's name stands out.
 * Research shows direct mail has 5-9x response rate vs email alone.
 */

export interface PostcardConfig {
  lobApiKey: string;
  restaurantName: string;
  restaurantAddress: string;
  restaurantCity: string;
  restaurantState: string;
  restaurantZip: string;
  previewUrl: string;
  websiteScreenshotUrl: string; // Pre-captured screenshot of their site
  fromName: string;
  fromAddress: string;
  fromCity: string;
  fromState: string;
  fromZip: string;
  cuisineType?: string; // e.g., "Greek", "Bakery", "Coffee"
  googleRating?: number; // e.g., 4.7
  reviewCount?: number; // e.g., 470
}

/**
 * Send a postcard via Lob.com API
 */
export async function sendPostcard(config: PostcardConfig): Promise<{
  id: string;
  expectedDelivery: string;
  trackingUrl?: string;
}> {
  const frontHtml = generatePostcardFront(config);
  const backHtml = generatePostcardBack(config);

  const response = await fetch("https://api.lob.com/v1/postcards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${config.lobApiKey}:`).toString("base64")}`,
    },
    body: JSON.stringify({
      description: `Outreach postcard to ${config.restaurantName}`,
      to: {
        name: config.restaurantName,
        address_line1: config.restaurantAddress,
        address_city: config.restaurantCity,
        address_state: config.restaurantState,
        address_zip: config.restaurantZip,
      },
      from: {
        name: config.fromName,
        address_line1: config.fromAddress,
        address_city: config.fromCity,
        address_state: config.fromState,
        address_zip: config.fromZip,
      },
      front: frontHtml,
      back: backHtml,
      size: "6x9",
      mail_type: "usps_first_class",
      use_type: "marketing",
    }),
  });

  const data = await response.json();

  return {
    id: data.id,
    expectedDelivery: data.expected_delivery_date,
    trackingUrl: data.tracking_events?.[0]?.tracking_url,
  };
}

/**
 * Front of postcard: Full-bleed website screenshot with premium overlay.
 * 6x9" format — generous canvas for visual impact.
 */
function generatePostcardFront(config: PostcardConfig): string {
  const ratingStars =
    config.googleRating && config.reviewCount
      ? `<div class="rating">${config.googleRating} &#9733; &middot; ${config.reviewCount} reviews on Google</div>`
      : "";

  return `
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap');
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          background: #0c0c14;
          width: 9.25in;
          height: 6.25in;
          position: relative;
          overflow: hidden;
        }
        .screenshot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.92) contrast(1.04);
        }
        .vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.72) 100%),
            linear-gradient(135deg, rgba(15,118,110,0.18) 0%, transparent 60%);
        }
        .content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 32px 40px;
          color: white;
        }
        .name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 36px;
          font-weight: 400;
          line-height: 1.15;
          margin-bottom: 6px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }
        .tagline {
          font-size: 14px;
          font-weight: 500;
          opacity: 0.92;
          letter-spacing: 0.3px;
          margin-bottom: 4px;
        }
        .rating {
          font-size: 12px;
          font-weight: 400;
          opacity: 0.78;
          margin-top: 6px;
          letter-spacing: 0.2px;
        }
        .badge {
          position: absolute;
          top: 24px;
          right: 28px;
          background: rgba(255,255,255,0.96);
          color: #0f766e;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.2);
        }
        .teal-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0f766e 0%, #14b8a6 50%, #0f766e 100%);
        }
      </style>
    </head>
    <body>
      <img src="${config.websiteScreenshotUrl}" class="screenshot" alt="${config.restaurantName}" />
      <div class="vignette"></div>
      <div class="badge">Website Preview</div>
      <div class="content">
        <div class="name">${config.restaurantName}</div>
        <div class="tagline">Your new website is ready to view</div>
        ${ratingStars}
      </div>
      <div class="teal-bar"></div>
    </body>
    </html>
  `.trim();
}

/**
 * Back of postcard: Warm, personal pitch + QR code.
 * 6x9" format — room for genuine message without feeling cramped.
 */
function generatePostcardBack(config: PostcardConfig): string {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(config.previewUrl)}&color=0f766e&bgcolor=ffffff&format=png`;

  // Build a personalized opener that feels human
  const cuisineNote = config.cuisineType
    ? ` specializing in ${config.cuisineType.toLowerCase()}`
    : "";
  const ratingNote =
    config.googleRating && config.reviewCount
      ? ` Your ${config.googleRating}-star rating across ${config.reviewCount} reviews says a lot about the quality you deliver.`
      : "";

  return `
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600&display=swap');
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
          width: 9.25in;
          height: 6.25in;
          box-sizing: border-box;
          display: flex;
          color: #1f2937;
          background: #ffffff;
        }
        .left {
          flex: 1;
          padding: 36px 32px 36px 40px;
          display: flex;
          flex-direction: column;
        }
        .right {
          width: 3in;
          background: #f8fafb;
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 28px;
        }
        .logo-mark {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 13px;
          color: #0f766e;
          letter-spacing: 0.5px;
          margin-bottom: 20px;
        }
        .greeting {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: 20px;
          color: #111827;
          margin-bottom: 14px;
          line-height: 1.3;
        }
        .message {
          font-size: 12px;
          line-height: 1.7;
          color: #374151;
          margin-bottom: 16px;
        }
        .message strong {
          color: #111827;
          font-weight: 600;
        }
        .bullets {
          font-size: 11px;
          line-height: 1.8;
          color: #4b5563;
          margin-bottom: 16px;
          padding-left: 0;
          list-style: none;
        }
        .bullets li::before {
          content: "\\2713\\0020";
          color: #0f766e;
          font-weight: 700;
        }
        .cta {
          font-size: 11px;
          font-weight: 600;
          color: #0f766e;
          margin-bottom: auto;
        }
        .footer {
          font-size: 10px;
          color: #9ca3af;
          line-height: 1.5;
          border-top: 1px solid #e5e7eb;
          padding-top: 12px;
          margin-top: 12px;
        }
        .qr-wrap {
          background: white;
          padding: 12px;
          border-radius: 10px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.08);
          margin-bottom: 14px;
        }
        .qr-label {
          font-size: 11px;
          font-weight: 600;
          color: #0f766e;
          text-align: center;
          margin-bottom: 4px;
        }
        .qr-sublabel {
          font-size: 9px;
          color: #6b7280;
          text-align: center;
          max-width: 160px;
          line-height: 1.4;
          margin-bottom: 12px;
        }
        .phone-line {
          font-size: 11px;
          color: #374151;
          font-weight: 500;
          margin-top: 8px;
        }
        .phone-sub {
          font-size: 9px;
          color: #9ca3af;
          margin-top: 2px;
        }
      </style>
    </head>
    <body>
      <div class="left">
        <div class="logo-mark">NorthStar Synergy</div>
        <div class="greeting">Hi ${config.restaurantName},</div>
        <div class="message">
          I came across your restaurant${cuisineNote} in ${config.restaurantCity} and thought you deserved
          a website that matches the experience you give your customers.${ratingNote}
          <br /><br />
          So I went ahead and <strong>built one for you</strong> — with your real menu,
          your Google reviews, and everything a customer needs to find you and order.
        </div>
        <ul class="bullets">
          <li>Your full menu, beautifully organized</li>
          <li>Google reviews front and center</li>
          <li>Online ordering ready to turn on</li>
          <li>Shows up on Google search</li>
        </ul>
        <div class="cta">
          Scan the QR code to see it. It takes 10 seconds. No strings attached.
        </div>
        <div class="footer">
          ${config.fromName} &middot; NorthStar Synergy<br />
          john@northstarsynergy.com &middot; (425) 555-0142
        </div>
      </div>
      <div class="right">
        <div class="qr-label">See Your Website</div>
        <div class="qr-sublabel">Point your phone camera here</div>
        <div class="qr-wrap">
          <img src="${qrUrl}" width="160" height="160" alt="QR Code" />
        </div>
        <div class="phone-line">Questions? Call or text</div>
        <div class="phone-sub">(425) 555-0142</div>
      </div>
    </body>
    </html>
  `.trim();
}

/**
 * Capture a screenshot of the restaurant's preview website
 * for use on the postcard front
 *
 * Requires puppeteer to be installed: npm install puppeteer
 * This function runs server-side only (Node.js)
 */
export async function captureScreenshot(
  url: string,
  outputPath: string
): Promise<string> {
  // Dynamic import - puppeteer is an optional server-side dependency
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
  const puppeteer = eval('require')("puppeteer");

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

  // Wait for animations to settle
  await new Promise((r) => setTimeout(r, 2000));

  await page.screenshot({
    path: outputPath,
    type: "jpeg",
    quality: 90,
  });

  await browser.close();
  return outputPath;
}
