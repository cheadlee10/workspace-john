"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuSection as MenuSectionType, DietaryTag } from "@/types/restaurant";
import { MenuItemCard } from "./MenuItemCard";

interface MenuSectionProps {
  sections: MenuSectionType[];
  accentColor?: string;
  showImages?: boolean;
  enableOrdering?: boolean;
  onAddToCart?: (itemId: string, quantity: number) => void;
}

const DIETARY_FILTERS: { value: DietaryTag; label: string }[] = [
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "gluten-free", label: "Gluten-Free" },
  { value: "dairy-free", label: "Dairy-Free" },
  { value: "nut-free", label: "Nut-Free" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "spicy", label: "Spicy" },
  { value: "keto", label: "Keto" },
];

export function MenuDisplay({
  sections,
  accentColor = "#D4A574",
  showImages = true,
  enableOrdering = false,
  onAddToCart,
}: MenuSectionProps) {
  const activeSections = sections.filter((s) => s.isActive);
  const [activeSection, setActiveSection] = useState(activeSections[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDietaryFilters, setActiveDietaryFilters] = useState<DietaryTag[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleDietaryFilter = (tag: DietaryTag) => {
    setActiveDietaryFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const currentSection = activeSections.find((s) => s.id === activeSection);

  const filteredItems = (currentSection?.items || []).filter((item) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesDesc = item.description.toLowerCase().includes(query);
      if (!matchesName && !matchesDesc) return false;
    }
    if (activeDietaryFilters.length > 0) {
      const hasAllFilters = activeDietaryFilters.every((f) => item.dietary.includes(f));
      if (!hasAllFilters) return false;
    }
    return true;
  });

  // For search across all sections
  const allFilteredItems =
    searchQuery || activeDietaryFilters.length > 0
      ? activeSections.flatMap((section) =>
          section.items
            .filter((item) => {
              if (searchQuery) {
                const query = searchQuery.toLowerCase();
                if (
                  !item.name.toLowerCase().includes(query) &&
                  !item.description.toLowerCase().includes(query)
                )
                  return false;
              }
              if (activeDietaryFilters.length > 0) {
                if (!activeDietaryFilters.every((f) => item.dietary.includes(f))) return false;
              }
              return true;
            })
            .map((item) => ({ ...item, sectionName: section.name }))
        )
      : null;

  return (
    <section id="menu" className="py-16 md:py-24" aria-label="Restaurant Menu">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl">Our Menu</h2>
          <div
            className="mx-auto mb-6 h-1 w-16 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>

        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search our menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition-shadow focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-100"
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Dietary Filters */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            aria-expanded={showFilters}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Dietary Filters
            {activeDietaryFilters.length > 0 && (
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full text-xs text-white"
                style={{ backgroundColor: accentColor }}
              >
                {activeDietaryFilters.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {DIETARY_FILTERS.map((filter) => {
                    const isActive = activeDietaryFilters.includes(filter.value);
                    return (
                      <button
                        key={filter.value}
                        onClick={() => toggleDietaryFilter(filter.value)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                          isActive
                            ? "text-white shadow-md"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                        style={isActive ? { backgroundColor: accentColor } : {}}
                        aria-pressed={isActive}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                  {activeDietaryFilters.length > 0 && (
                    <button
                      onClick={() => setActiveDietaryFilters([])}
                      className="rounded-full px-4 py-1.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      Clear All
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Tabs (hidden when searching across all) */}
        {!allFilteredItems && (
          <div className="mb-10 overflow-x-auto" role="tablist" aria-label="Menu categories">
            <div className="flex justify-center gap-1 md:gap-2">
              {activeSections.map((section) => (
                <button
                  key={section.id}
                  role="tab"
                  aria-selected={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? "text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={activeSection === section.id ? { backgroundColor: accentColor } : {}}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Grid */}
        <div role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={allFilteredItems ? "search-results" : activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {(allFilteredItems || filteredItems).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex"
                >
                  <MenuItemCard
                    item={item}
                    accentColor={accentColor}
                    showImage={showImages}
                    enableOrdering={enableOrdering}
                    onAddToCart={onAddToCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {(allFilteredItems || filteredItems).length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center text-gray-500"
            >
              No items match your search
              {activeDietaryFilters.length > 0 ? " and filters" : ""}.
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
}
