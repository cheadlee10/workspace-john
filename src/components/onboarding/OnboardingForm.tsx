"use client";

import { useState } from "react";
import type { Restaurant } from "@/types/restaurant";

type MenuItemInput = { name: string; description: string; price: string };
type MenuCategoryInput = { name: string; items: MenuItemInput[] };

export function OnboardingForm({ restaurant }: { restaurant: Restaurant }) {

  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [about, setAbout] = useState(restaurant.description || "");
  const [vibe, setVibe] = useState("Keep current");
  const [onlineOrdering, setOnlineOrdering] = useState("Yes");
  const [squarePos, setSquarePos] = useState("Don't know");
  const [instagram, setInstagram] = useState(restaurant.socialMedia?.instagram || "");
  const [facebook, setFacebook] = useState(restaurant.socialMedia?.facebook || "");
  const [anythingElse, setAnythingElse] = useState("");
  const [hours, setHours] = useState(restaurant.hours || []);
  const [menu, setMenu] = useState<MenuCategoryInput[]>(
    (restaurant.menu?.sections || []).map((s) => ({
      name: s.name,
      items: (s.items || []).map((i) => ({ name: i.name, description: i.description || "", price: String(i.price ?? "") })),
    }))
  );
  const [uploads, setUploads] = useState<{ logo?: string; photos: string[]; interior: string[] }>({ photos: [], interior: [] });
  const [status, setStatus] = useState<string>("");

  async function uploadFiles(files: FileList | null, bucket: "logo" | "photos" | "interior") {
    if (!files || files.length === 0) return;
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/uploads/cloudinary", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed");

      setUploads((prev) => {
        if (bucket === "logo") return { ...prev, logo: json.url };
        if (bucket === "photos") return { ...prev, photos: [...prev.photos, json.url] };
        return { ...prev, interior: [...prev.interior, json.url] };
      });
    }
  }

  async function submit() {
    setStatus("Submitting...");
    const payload = {
      restaurantSlug: restaurant.slug,
      restaurantName: restaurant.name,
      ownerName,
      ownerEmail,
      ownerPhone,
      menu,
      uploads,
      hours,
      about,
      vibe,
      onlineOrdering,
      squarePos: onlineOrdering === "Yes" ? squarePos : null,
      social: { instagram, facebook },
      anythingElse,
    };

    const res = await fetch("/api/onboarding", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      setStatus(`Error: ${json.error || "submit failed"}`);
      return;
    }
    setStatus("Submitted successfully. We’ll be in touch shortly.");
  }

  return (
    <div className="onb-white mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 text-gray-900 shadow-xl">
      <h1 className="text-3xl font-bold text-gray-900">{restaurant.name} Onboarding</h1>
      <p className="mt-2 text-sm text-gray-500">Complete this form so we can launch your site in 48 hours.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm">Restaurant name
          <input className="mt-1 w-full rounded border p-2" value={restaurant.name} readOnly />
        </label>
        <label className="text-sm">Cuisine
          <input className="mt-1 w-full rounded border p-2" value={restaurant.cuisine.join(", ")} readOnly />
        </label>
        <label className="text-sm">Address
          <input className="mt-1 w-full rounded border p-2" value={`${restaurant.location.address}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip}`} readOnly />
        </label>
        <label className="text-sm">Restaurant phone
          <input className="mt-1 w-full rounded border p-2" value={restaurant.contact.phone || ""} readOnly />
        </label>
        <label className="text-sm">Owner name
          <input className="mt-1 w-full rounded border p-2" value={ownerName} onChange={(e)=>setOwnerName(e.target.value)} />
        </label>
        <label className="text-sm">Owner email
          <input className="mt-1 w-full rounded border p-2" value={ownerEmail} onChange={(e)=>setOwnerEmail(e.target.value)} />
        </label>
        <label className="text-sm">Owner phone
          <input className="mt-1 w-full rounded border p-2" value={ownerPhone} onChange={(e)=>setOwnerPhone(e.target.value)} />
        </label>
      </div>

      <h2 className="mt-8 text-xl font-semibold">Menu</h2>
      <div className="space-y-4">
        {menu.map((cat, ci) => (
          <div key={ci} className="rounded border p-3">
            <input className="w-full rounded border p-2 font-medium" value={cat.name} onChange={(e)=>setMenu(m=>m.map((c,i)=>i===ci?{...c,name:e.target.value}:c))} />
            <div className="mt-2 space-y-2">
              {cat.items.map((item, ii) => (
                <div key={ii} className="grid gap-2 md:grid-cols-3">
                  <input className="rounded border p-2" placeholder="Item" value={item.name} onChange={(e)=>setMenu(m=>m.map((c,i)=>i===ci?{...c,items:c.items.map((it,j)=>j===ii?{...it,name:e.target.value}:it)}:c))} />
                  <input className="rounded border p-2" placeholder="Description" value={item.description} onChange={(e)=>setMenu(m=>m.map((c,i)=>i===ci?{...c,items:c.items.map((it,j)=>j===ii?{...it,description:e.target.value}:it)}:c))} />
                  <input className="rounded border p-2" placeholder="Price" value={item.price} onChange={(e)=>setMenu(m=>m.map((c,i)=>i===ci?{...c,items:c.items.map((it,j)=>j===ii?{...it,price:e.target.value}:it)}:c))} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-semibold">Photos</h2>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="text-sm">Logo
          <input type="file" accept="image/png,image/jpeg,image/webp" className="mt-1 w-full" onChange={(e)=>uploadFiles(e.target.files, "logo")} />
        </label>
        <label className="text-sm">Food photos
          <input type="file" multiple accept="image/png,image/jpeg,image/webp" className="mt-1 w-full" onChange={(e)=>uploadFiles(e.target.files, "photos")} />
        </label>
        <label className="text-sm">Interior photos
          <input type="file" multiple accept="image/png,image/jpeg,image/webp" className="mt-1 w-full" onChange={(e)=>uploadFiles(e.target.files, "interior")} />
        </label>
      </div>

      <h2 className="mt-8 text-xl font-semibold">Hours</h2>
      <div className="space-y-2">
        {hours.map((h, i) => (
          <div key={i} className="grid grid-cols-4 gap-2">
            <input className="rounded border p-2" value={h.day} readOnly />
            <input className="rounded border p-2" value={h.open} onChange={(e)=>setHours(arr=>arr.map((x,idx)=>idx===i?{...x,open:e.target.value}:x))} />
            <input className="rounded border p-2" value={h.close} onChange={(e)=>setHours(arr=>arr.map((x,idx)=>idx===i?{...x,close:e.target.value}:x))} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={h.closed} onChange={(e)=>setHours(arr=>arr.map((x,idx)=>idx===i?{...x,closed:e.target.checked}:x))} />Closed</label>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-semibold">Brand + Preferences</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">About/Story
          <textarea className="mt-1 min-h-24 w-full rounded border p-2" value={about} onChange={(e)=>setAbout(e.target.value)} />
        </label>
        <label className="text-sm">Color/Vibe
          <select className="mt-1 w-full rounded border p-2" value={vibe} onChange={(e)=>setVibe(e.target.value)}>
            <option>Keep current</option><option>Warmer</option><option>Darker</option><option>Brighter</option>
          </select>
        </label>
        <label className="text-sm">Want online ordering?
          <select className="mt-1 w-full rounded border p-2" value={onlineOrdering} onChange={(e)=>setOnlineOrdering(e.target.value)}>
            <option>Yes</option><option>Not yet</option>
          </select>
        </label>
        <label className="text-sm">Use Square POS?
          <select className="mt-1 w-full rounded border p-2" value={squarePos} onChange={(e)=>setSquarePos(e.target.value)} disabled={onlineOrdering !== "Yes"}>
            <option>Yes</option><option>No</option><option>Don't know</option>
          </select>
        </label>
        <label className="text-sm">Instagram
          <input className="mt-1 w-full rounded border p-2" value={instagram} onChange={(e)=>setInstagram(e.target.value)} />
        </label>
        <label className="text-sm">Facebook
          <input className="mt-1 w-full rounded border p-2" value={facebook} onChange={(e)=>setFacebook(e.target.value)} />
        </label>
      </div>

      <label className="mt-4 block text-sm">Anything else to change?
        <textarea className="mt-1 min-h-24 w-full rounded border p-2" value={anythingElse} onChange={(e)=>setAnythingElse(e.target.value)} />
      </label>

      <button onClick={submit} className="mt-6 rounded bg-gray-900 px-5 py-3 font-semibold text-white hover:bg-gray-800">Submit onboarding</button>
      {status && <p className="mt-3 text-sm text-gray-600">{status}</p>}

      {/* Force white inputs regardless of design theme */}
      <style dangerouslySetInnerHTML={{ __html: `
        .onb-white input, .onb-white select, .onb-white textarea {
          background-color: #ffffff !important;
          color: #1a1a1a !important;
          border-color: #d1d5db !important;
        }
        .onb-white label { color: #6b7280; }
        .onb-white h2 { color: #111827; }
      `}} />
    </div>
  );
}
