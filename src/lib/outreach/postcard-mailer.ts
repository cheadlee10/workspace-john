/**
 * Physical Postcard Mailer via Lob.com API
 *
 * Sends a beautiful physical postcard to restaurants:
 * - Front: Screenshot of their custom website
 * - Back: Short pitch + QR code linking to their preview
 *
 * Costs: ~$0.70-$1.05 per postcard (4x6")
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
      size: "4x6",
      mail_type: "usps_first_class",
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
 * Front of postcard: Restaurant website screenshot
 */
function generatePostcardFront(config: PostcardConfig): string {
  return `
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          background: #1a1a2e;
          width: 6.25in;
          height: 4.25in;
          position: relative;
          overflow: hidden;
        }
        .screenshot {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.85;
        }
        .overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 24px;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
        }
        .name {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .tagline {
          font-size: 12px;
          opacity: 0.9;
          letter-spacing: 0.5px;
        }
        .badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: white;
          color: #1a1a2e;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      </style>
    </head>
    <body>
      <img src="${config.websiteScreenshotUrl}" class="screenshot" alt="${config.restaurantName}" />
      <div class="badge">Your New Website</div>
      <div class="overlay">
        <div class="name">${config.restaurantName}</div>
        <div class="tagline">We built you something special</div>
      </div>
    </body>
    </html>
  `.trim();
}

/**
 * Back of postcard: Short pitch + QR code
 */
function generatePostcardBack(config: PostcardConfig): string {
  // QR code generated via Google Charts API (free, no API key needed)
  const qrUrl = `https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${encodeURIComponent(config.previewUrl)}&choe=UTF-8`;

  return `
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 24px;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          width: 6.25in;
          height: 4.25in;
          box-sizing: border-box;
          display: flex;
          color: #1a1a2e;
        }
        .content {
          flex: 1;
          padding-right: 20px;
        }
        .greeting {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          color: #1a1a2e;
        }
        .message {
          font-size: 11px;
          line-height: 1.6;
          color: #444;
          margin-bottom: 12px;
        }
        .url {
          font-size: 10px;
          font-weight: 600;
          color: #c0392b;
          word-break: break-all;
        }
        .footer {
          font-size: 9px;
          color: #999;
          margin-top: auto;
        }
        .qr-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-left: 20px;
          border-left: 1px solid #eee;
        }
        .qr-label {
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
          margin-top: 8px;
        }
      </style>
    </head>
    <body>
      <div class="content">
        <div class="greeting">Hi ${config.restaurantName}!</div>
        <div class="message">
          We built you a beautiful website with your full menu, Google reviews,
          and online ordering - all ready to go.
          <br /><br />
          Scan the QR code or visit the link below to see your free preview.
          No strings attached.
        </div>
        <div class="url">${config.previewUrl}</div>
        <div class="footer">
          ${config.fromName}<br />
          NorthStar Synergy<br />
          Questions? hello@northstarsynergy.org
        </div>
      </div>
      <div class="qr-section">
        <img src="${qrUrl}" width="120" height="120" alt="QR Code" />
        <div class="qr-label">Scan to Preview</div>
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
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const puppeteer = require("puppeteer");

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
