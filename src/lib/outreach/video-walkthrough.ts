/**
 * Automated Video Walkthrough Generator
 *
 * Uses Puppeteer to:
 * 1. Open the restaurant's preview website
 * 2. Auto-scroll through the page at a natural pace
 * 3. Pause on key sections (menu, reviews, location)
 * 4. Record the entire experience as video
 * 5. Generate a GIF thumbnail for email embedding
 * 6. Upload to Mux for streaming
 *
 * This runs server-side (Node.js only) - not in the browser.
 */

export interface WalkthroughConfig {
  url: string;
  outputPath: string;
  width?: number;
  height?: number;
  duration?: number; // seconds
  scrollSpeed?: number; // pixels per frame
  pauseSections?: string[]; // CSS selectors to pause on
  generateGif?: boolean;
  gifOutputPath?: string;
}

/**
 * Record a video walkthrough of a restaurant website
 *
 * Requires: puppeteer, puppeteer-screen-recorder
 * Install: npm install puppeteer puppeteer-screen-recorder
 */
export async function recordWalkthrough(config: WalkthroughConfig): Promise<{
  videoPath: string;
  gifPath?: string;
  duration: number;
}> {
  // Dynamic imports for server-side only dependencies
  // These are optional - only needed when running the walkthrough recorder
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const puppeteer = require("puppeteer");
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

  const {
    url,
    outputPath,
    width = 1280,
    height = 720,
    scrollSpeed = 3,
    pauseSections = ["#menu", "#reviews", "#location"],
  } = config;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width, height });

  // Start recording
  const recorder = new PuppeteerScreenRecorder(page, {
    fps: 30,
    ffmpeg_Path: undefined, // Use system ffmpeg
    videoFrame: { width, height },
    aspectRatio: "16:9",
  });

  await recorder.start(outputPath);

  // Navigate to the site
  await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });

  // Wait for initial load and hero animations
  await new Promise((r) => setTimeout(r, 2000));

  // Get total page height
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);

  // Smooth scroll through the entire page
  let currentPosition = 0;
  while (currentPosition < pageHeight) {
    // Check if we're near a pause section
    for (const selector of pauseSections) {
      const shouldPause = await page.evaluate(
        (sel: string, pos: number, vh: number) => {
          const el = document.querySelector(sel);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          const elTop = rect.top + pos;
          return Math.abs(pos - elTop) < vh / 2;
        },
        selector,
        currentPosition,
        height
      );

      if (shouldPause) {
        await new Promise((r) => setTimeout(r, 2000)); // Pause to showcase section
      }
    }

    // Scroll smoothly
    currentPosition += scrollSpeed;
    await page.evaluate((y: number) => window.scrollTo({ top: y, behavior: "instant" }), currentPosition);
    await new Promise((r) => setTimeout(r, 16)); // ~60fps timing
  }

  // Hold at the bottom briefly
  await new Promise((r) => setTimeout(r, 1500));

  // Scroll back to top smoothly
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  await new Promise((r) => setTimeout(r, 2000));

  // Stop recording
  await recorder.stop();
  await browser.close();

  // Generate GIF thumbnail if requested
  let gifPath: string | undefined;
  if (config.generateGif && config.gifOutputPath) {
    gifPath = await generateGifThumbnail(outputPath, config.gifOutputPath);
  }

  return {
    videoPath: outputPath,
    gifPath,
    duration: Math.ceil(pageHeight / scrollSpeed / 60 + 8), // Approximate seconds
  };
}

/**
 * Generate a short GIF from the walkthrough video
 * Used as email thumbnail (email clients can't embed video)
 */
async function generateGifThumbnail(
  videoPath: string,
  outputPath: string
): Promise<string> {
  // Use ffmpeg to extract a 3-second GIF from the middle of the video
  const { exec } = await import("child_process");
  const { promisify } = await import("util");
  const execAsync = promisify(exec);

  await execAsync(
    `ffmpeg -i "${videoPath}" -ss 5 -t 3 -vf "fps=10,scale=480:-1:flags=lanczos" -y "${outputPath}"`
  );

  return outputPath;
}

/**
 * Upload video to Mux for streaming
 */
export async function uploadToMux(
  videoPath: string,
  muxTokenId: string,
  muxTokenSecret: string
): Promise<{ playbackId: string; assetId: string; streamUrl: string }> {
  const fs = await import("fs");

  // Step 1: Create a direct upload URL
  const createResponse = await fetch("https://api.mux.com/video/v1/uploads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${Buffer.from(`${muxTokenId}:${muxTokenSecret}`).toString("base64")}`,
    },
    body: JSON.stringify({
      new_asset_settings: {
        playback_policy: ["public"],
        encoding_tier: "baseline",
      },
      cors_origin: "*",
    }),
  });

  const uploadData = await createResponse.json();
  const uploadUrl = uploadData.data.url;
  const assetId = uploadData.data.asset_id;

  // Step 2: Upload the video file
  const videoBuffer = fs.readFileSync(videoPath);
  await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": "video/mp4" },
    body: videoBuffer,
  });

  // Step 3: Get the playback ID (may need to poll for processing)
  const assetResponse = await fetch(`https://api.mux.com/video/v1/assets/${assetId}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${muxTokenId}:${muxTokenSecret}`).toString("base64")}`,
    },
  });

  const assetData = await assetResponse.json();
  const playbackId = assetData.data.playback_ids?.[0]?.id || "";

  return {
    playbackId,
    assetId,
    streamUrl: `https://stream.mux.com/${playbackId}.m3u8`,
  };
}
