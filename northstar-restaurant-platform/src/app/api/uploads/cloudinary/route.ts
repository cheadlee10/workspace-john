import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

function sign(params: Record<string, string>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ error: "Cloudinary not configured" }, { status: 500 });
    }

    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${file.type || "image/png"};base64,${bytes.toString("base64")}`;

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const params = {
      folder: "northstar/onboarding",
      public_id: `upload-${Date.now()}`,
      timestamp,
      overwrite: "true",
    };
    const signature = sign(params, apiSecret);

    const out = new FormData();
    out.append("file", dataUrl);
    out.append("api_key", apiKey);
    out.append("timestamp", timestamp);
    out.append("folder", params.folder);
    out.append("public_id", params.public_id);
    out.append("overwrite", "true");
    out.append("signature", signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: out });
    const json = await res.json();
    if (!res.ok) return NextResponse.json({ error: json?.error?.message || "Upload failed" }, { status: 500 });

    return NextResponse.json({ url: json.secure_url });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload error" }, { status: 500 });
  }
}
