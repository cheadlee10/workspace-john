"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import type { ReviewSummary } from "@/types/restaurant";
import { useDesign } from "@/components/design/DesignProvider";

interface ReviewsSectionProps {
  reviews: ReviewSummary;
  restaurantName: string;
  accentColor?: string;
  googlePlaceId?: string;
}

// #2 Animated number counter hook
function useAnimatedNumber(target: number, decimals: number, inView: boolean) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const duration = 1500;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((target * eased).toFixed(decimals)));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, decimals]);

  useEffect(() => {
    if (!inView) return;
    const cleanup = animate();
    return cleanup;
  }, [inView, animate]);

  return display;
}

function StarRating({ rating, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-3.5 w-3.5", md: "h-5 w-5", lg: "h-6 w-6" };
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const starPath = "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z";
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= fullStars) {
          return (
            <svg key={star} className={`${sizes[size]} text-amber-400`} fill="currentColor" viewBox="0 0 20 20">
              <path d={starPath} />
            </svg>
          );
        }
        if (star === fullStars + 1 && hasHalf) {
          return (
            <svg key={star} className={sizes[size]} viewBox="0 0 20 20">
              <defs>
                <clipPath id={`half-${size}-${star}`}>
                  <rect x="0" y="0" width="10" height="20" />
                </clipPath>
              </defs>
              <path d={starPath} className="text-gray-200" fill="currentColor" />
              <path d={starPath} className="text-amber-400" fill="currentColor" clipPath={`url(#half-${size}-${star})`} />
            </svg>
          );
        }
        return (
          <svg key={star} className={`${sizes[size]} text-gray-200`} fill="currentColor" viewBox="0 0 20 20">
            <path d={starPath} />
          </svg>
        );
      })}
    </div>
  );
}

export function ReviewsSection({
  reviews,
  restaurantName,
  accentColor,
  googlePlaceId,
}: ReviewsSectionProps) {
  const design = useDesign();
  const { palette } = design;
  const accent = accentColor || palette.accent;
  const animDelay = design.effects.animationSpeed === "energetic" ? 0.1 : design.effects.animationSpeed === "subtle" ? 0.2 : 0.15;

  // #2 Counter animation
  const counterRef = useRef<HTMLDivElement>(null);
  const inView = useInView(counterRef, { once: true, margin: "-100px" });
  const animatedRating = useAnimatedNumber(reviews.averageRating, 1, inView);
  const animatedCount = useAnimatedNumber(reviews.totalReviews, 0, inView);

  return (
    <section
      id="reviews"
      className="py-16 md:py-24"
      style={{ backgroundColor: palette.reviewSectionBg }}
      aria-label="Customer Reviews"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: palette.text }}>
            What People Say
          </h2>
          <div
            className="mx-auto mb-6 h-1 w-16 rounded-full"
            style={{ backgroundColor: accent }}
          />
        </motion.div>

        {/* Aggregate Rating — #2 animated counters */}
        <motion.div
          ref={counterRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12"
        >
          <div className="text-center">
            <div className="mb-1 text-5xl font-bold tabular-nums" style={{ color: palette.text }}>
              {animatedRating.toFixed(1)}
            </div>
            <StarRating rating={reviews.averageRating} size="lg" />
            <p className="mt-1 text-sm" style={{ color: palette.textMuted }}>
              {animatedCount.toLocaleString()} reviews
            </p>
          </div>

          <div className="flex gap-6">
            {reviews.googleRating && (
              <div className="text-center">
                <div className="mb-1 text-sm font-medium" style={{ color: palette.textMuted }}>Google</div>
                <div className="text-2xl font-bold" style={{ color: palette.text }}>
                  {reviews.googleRating.toFixed(1)}
                </div>
                <StarRating rating={reviews.googleRating} size="sm" />
                <p className="mt-0.5 text-xs" style={{ color: palette.textMuted }}>
                  {reviews.googleReviewCount} reviews
                </p>
              </div>
            )}
            {reviews.yelpRating && (
              <div className="text-center">
                <div className="mb-1 text-sm font-medium" style={{ color: palette.textMuted }}>Yelp</div>
                <div className="text-2xl font-bold" style={{ color: palette.text }}>
                  {reviews.yelpRating.toFixed(1)}
                </div>
                <StarRating rating={reviews.yelpRating} size="sm" />
                <p className="mt-0.5 text-xs" style={{ color: palette.textMuted }}>
                  {reviews.yelpReviewCount} reviews
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Featured Reviews (demo-safe: 4+ stars only) */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.featuredReviews
            .filter((review) => review.rating >= 4)
            .map((review, index) => (
            <motion.div
              key={`${review.source}-${review.author}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * animDelay }}
              className="border p-6 shadow-sm"
              style={{
                backgroundColor: palette.surface,
                borderColor: palette.menuCardBorder,
                borderRadius: design.layout.cornerRadius,
              }}
            >
              <div className="mb-3 flex items-center justify-between">
                <StarRating rating={review.rating} size="sm" />
                <span
                  className="px-2.5 py-0.5 text-xs font-medium capitalize"
                  style={{
                    backgroundColor: palette.surfaceAlt,
                    color: palette.textMuted,
                    borderRadius: design.layout.cornerRadius,
                  }}
                >
                  {review.source}
                </span>
              </div>
              <p className="mb-4 text-sm leading-relaxed" style={{ color: palette.textMuted }}>
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {review.photoUrl ? (
                  <div className="relative h-8 w-8 overflow-hidden rounded-full" style={{ backgroundColor: palette.surfaceAlt }}>
                    <Image src={review.photoUrl} alt={review.author} fill sizes="32px" className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium" style={{ color: palette.text }}>{review.author}</p>
                  <p className="text-xs" style={{ color: palette.textMuted }}>{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="text-sm" style={{ color: palette.textMuted }}>
            Love {restaurantName}?{" "}
            <a
              href={reviews.googleRating && googlePlaceId
                ? `https://search.google.com/local/writereview?placeid=${googlePlaceId}`
                : `https://www.yelp.com/biz/${restaurantName.toLowerCase().replace(/\s+/g, "-")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2 transition-colors hover:opacity-80"
              style={{ color: accent }}
            >
              Leave us a review
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
