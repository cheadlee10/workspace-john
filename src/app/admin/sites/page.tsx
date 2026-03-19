"use client";

import { useState, useEffect } from "react";
import type { RestaurantType } from "@/types/restaurant";

interface SiteSummary {
  id: string;
  name: string;
  slug: string;
  type: string;
  domain?: string;
  cuisine: string[];
  city: string;
  state: string;
  tier: string;
  hasOrdering: boolean;
}

interface TemplateInfo {
  id: RestaurantType;
  name: string;
  description: string;
}

const TIER_CONFIG = {
  starter: { label: "Starter", color: "bg-gray-100 text-gray-600" },
  growth: { label: "Growth", color: "bg-blue-50 text-blue-700" },
  pro: { label: "Pro", color: "bg-purple-50 text-purple-700" },
};

const TYPE_LABELS: Record<string, string> = {
  "casual-dining": "Casual Dining",
  "fine-dining": "Fine Dining",
  "fast-casual": "Fast Casual",
  "food-truck": "Food Truck",
  "cafe-bakery": "Cafe & Bakery",
  "bar-brewery": "Bar & Brewery",
  "pizza-bbq": "Pizza & BBQ",
  "pop-up": "Pop-Up",
};

export default function SitesPage() {
  const [sites, setSites] = useState<SiteSummary[]>([]);
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/sites").then((r) => r.json()),
      fetch("/api/sites?view=templates").then((r) => r.json()),
    ]).then(([siteData, templateData]) => {
      setSites(siteData.sites || []);
      setTemplates(templateData.templates || []);
      setLoading(false);
    });
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);
    const form = new FormData(e.currentTarget);
    const name = form.get("name") as string;
    const res = await fetch("/api/sites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        type: form.get("type"),
        cuisine: [(form.get("cuisine") || "other") as string],
        contact: {
          phone: form.get("phone") || "",
          email: form.get("email") || "",
        },
        location: {
          address: form.get("address") || "",
          city: form.get("city") || "",
          state: form.get("state") || "",
          zip: form.get("zip") || "",
          lat: 0,
          lng: 0,
          isFixed: true,
        },
        domain: form.get("domain") || undefined,
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setSites((prev) => [...prev, {
        id: data.restaurant.id,
        name: data.restaurant.name,
        slug: data.restaurant.slug,
        type: data.restaurant.type,
        domain: form.get("domain") as string || undefined,
        cuisine: data.restaurant.cuisine,
        city: data.restaurant.location.city,
        state: data.restaurant.location.state,
        tier: data.restaurant.features.tier,
        hasOrdering: data.restaurant.features.onlineOrdering,
      }]);
      setShowCreate(false);
      (e.target as HTMLFormElement).reset();
    }
    setCreating(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Sites</h1>
          <p className="text-sm text-gray-500">{sites.length} restaurant site{sites.length !== 1 ? "s" : ""} managed</p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          {showCreate ? "Cancel" : "New Site"}
        </button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <form onSubmit={handleCreate} className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Create New Restaurant Site</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="site-name" className="mb-1 block text-xs font-medium text-gray-500">Restaurant Name</label>
              <input id="site-name" name="name" required placeholder="Restaurant Name" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="site-type" className="mb-1 block text-xs font-medium text-gray-500">Template</label>
              <select id="site-type" name="type" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm">
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="site-cuisine" className="mb-1 block text-xs font-medium text-gray-500">Cuisine</label>
              <select id="site-cuisine" name="cuisine" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm">
                <option value="american">American</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="thai">Thai</option>
                <option value="indian">Indian</option>
                <option value="mediterranean">Mediterranean</option>
                <option value="french">French</option>
                <option value="korean">Korean</option>
                <option value="vietnamese">Vietnamese</option>
                <option value="bbq">BBQ</option>
                <option value="seafood">Seafood</option>
                <option value="vegan">Vegan</option>
                <option value="fusion">Fusion</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="site-email" className="mb-1 block text-xs font-medium text-gray-500">Contact Email</label>
              <input id="site-email" name="email" type="email" placeholder="Contact Email" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="site-phone" className="mb-1 block text-xs font-medium text-gray-500">Phone</label>
              <input id="site-phone" name="phone" placeholder="Phone" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="site-domain" className="mb-1 block text-xs font-medium text-gray-500">Custom Domain</label>
              <input id="site-domain" name="domain" placeholder="Optional" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="site-address" className="mb-1 block text-xs font-medium text-gray-500">Address</label>
              <input id="site-address" name="address" placeholder="Address" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="site-city" className="mb-1 block text-xs font-medium text-gray-500">City</label>
              <input id="site-city" name="city" placeholder="City" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div className="flex items-end gap-2">
              <div>
                <label htmlFor="site-state" className="mb-1 block text-xs font-medium text-gray-500">State</label>
                <input id="site-state" name="state" placeholder="State" className="w-20 rounded-lg border border-gray-200 px-3 py-2 text-sm" />
              </div>
              <div>
                <label htmlFor="site-zip" className="mb-1 block text-xs font-medium text-gray-500">Zip</label>
                <input id="site-zip" name="zip" placeholder="Zip" className="w-24 rounded-lg border border-gray-200 px-3 py-2 text-sm" />
              </div>
              <button
                type="submit"
                disabled={creating}
                className="whitespace-nowrap rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Site"}
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Templates Overview */}
      <div className="mb-8">
        <h2 className="mb-3 text-sm font-semibold text-gray-900">Available Templates</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {templates.map((t) => (
            <div key={t.id} className="rounded-xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-gray-900">{t.name}</h3>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">{t.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sites Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Restaurant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Template</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Domain</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Location</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500">Ordering</th>
            </tr>
          </thead>
          <tbody>
            {sites.map((site) => {
              const tier = TIER_CONFIG[site.tier as keyof typeof TIER_CONFIG] || TIER_CONFIG.starter;
              return (
                <tr key={site.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{site.name}</p>
                      <p className="text-xs text-gray-400">{site.cuisine.join(", ")}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600">{TYPE_LABELS[site.type] || site.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tier.color}`}>
                      {tier.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {site.domain ? (
                      <span className="text-xs text-blue-600">{site.domain}</span>
                    ) : (
                      <span className="text-xs text-gray-400">{site.slug}.northstarsynergy.org</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-600">
                      {site.city}{site.state ? `, ${site.state}` : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {site.hasOrdering ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50">
                        <svg className="h-3 w-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
