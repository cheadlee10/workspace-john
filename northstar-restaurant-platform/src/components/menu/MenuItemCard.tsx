"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { MenuItem } from "@/types/restaurant";
import { formatPrice } from "@/lib/utils";
import { useDesign } from "@/components/design/DesignProvider";

interface MenuItemCardProps {
  item: MenuItem;
  accentColor?: string;
  showImage?: boolean;
  enableOrdering?: boolean;
  onAddToCart?: (itemId: string, quantity: number) => void;
}

const dietaryLabels: Record<string, { label: string; emoji: string }> = {
  vegetarian: { label: "Vegetarian", emoji: "V" },
  vegan: { label: "Vegan", emoji: "VG" },
  "gluten-free": { label: "GF", emoji: "GF" },
  "dairy-free": { label: "DF", emoji: "DF" },
  "nut-free": { label: "NF", emoji: "NF" },
  halal: { label: "Halal", emoji: "H" },
  kosher: { label: "Kosher", emoji: "K" },
  spicy: { label: "Spicy", emoji: "S" },
  keto: { label: "Keto", emoji: "KT" },
  organic: { label: "Organic", emoji: "O" },
};

function MenuItemCardInner({
  item,
  accentColor,
  showImage = true,
  enableOrdering = false,
  onAddToCart,
}: MenuItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const design = useDesign();
  const { palette } = design;
  const accent = accentColor || palette.accent;

  const handleAddToCart = () => {
    onAddToCart?.(item.id, quantity);
    setQuantity(1);
    setIsExpanded(false);
  };

  return (
    <motion.article
      className={`group relative flex w-full flex-col overflow-hidden border shadow-sm transition-shadow hover:shadow-lg ${
        item.isSoldOut ? "opacity-60" : ""
      }`}
      style={{
        backgroundColor: palette.menuCardBg,
        borderColor: palette.menuCardBorder,
        borderRadius: design.layout.cornerRadius,
      }}
      whileHover={{ scale: design.effects.menuItemHoverScale, transition: { duration: 0.2 } }}
      role="article"
      aria-label={`${item.name} - ${formatPrice(item.price)}`}
    >
      {/* Image */}
      {showImage && item.image && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            style={{ filter: design.effects.imageFilter !== "none" ? design.effects.imageFilter : undefined }}
            loading="lazy"
          />
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {item.isPopular && (
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm"
                style={{ backgroundColor: accent }}
              >
                Popular
              </span>
            )}
            {item.isChefPick && (
              <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                Chef&apos;s Pick
              </span>
            )}
            {item.isNew && (
              <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                New
              </span>
            )}
          </div>
          {item.isSoldOut && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-4 py-1.5 text-sm font-bold text-gray-900">
                Sold Out
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold leading-tight" style={{ color: palette.text }}>
              {item.name}
            </h3>
          </div>
          <span className="shrink-0 text-lg font-bold" style={{ color: accent }}>
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="mb-3 line-clamp-2 text-sm leading-relaxed" style={{ color: palette.textMuted }}>
          {item.description}
        </p>

        {/* Dietary Tags */}
        {item.dietary.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5" aria-label="Dietary information">
            {item.dietary.map((tag) => {
              const info = dietaryLabels[tag];
              return (
                <span
                  key={tag}
                  className="inline-flex items-center border px-2 py-0.5 text-xs font-medium"
                  style={{
                    borderColor: palette.menuCardBorder,
                    backgroundColor: palette.surfaceAlt,
                    color: palette.textMuted,
                    borderRadius: "6px",
                  }}
                  title={info?.label || tag}
                >
                  {info?.emoji || tag}
                </span>
              );
            })}
            {item.spiceLevel && item.spiceLevel > 0 && (
              <span
                className="inline-flex items-center rounded-md border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600"
                title={`Spice level: ${item.spiceLevel}/5`}
                aria-label={`Spice level ${item.spiceLevel} out of 5`}
              >
                {"🌶".repeat(item.spiceLevel)}
              </span>
            )}
          </div>
        )}

        {/* Allergen Info */}
        {item.allergens.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mb-2 text-xs underline decoration-dotted underline-offset-2 transition-colors hover:opacity-80"
            style={{ color: palette.textMuted }}
            aria-expanded={isExpanded}
          >
            Contains: {item.allergens.join(", ")}
          </button>
        )}

        {/* Order Button */}
        {enableOrdering && !item.isSoldOut && (
          <div className="mt-auto pt-2">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.button
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsExpanded(true)}
                  className="w-full py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md active:scale-[0.98]"
                  style={{
                    backgroundColor: accent,
                    borderRadius: design.layout.cornerRadius,
                  }}
                >
                  Add to Order
                </motion.button>
              ) : (
                <motion.div key="qty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center border"
                      style={{
                        borderColor: palette.menuCardBorder,
                        borderRadius: design.layout.cornerRadius,
                      }}
                    >
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 transition-colors hover:opacity-80"
                        style={{ color: palette.textMuted }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-medium" style={{ color: palette.text }}>
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-2 transition-colors hover:opacity-80"
                        style={{ color: palette.textMuted }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-md active:scale-[0.98]"
                      style={{
                        backgroundColor: accent,
                        borderRadius: design.layout.cornerRadius,
                      }}
                    >
                      Add {formatPrice(item.price * quantity)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.article>
  );
}

export const MenuItemCard = memo(MenuItemCardInner);
