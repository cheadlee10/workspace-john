"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { PaymentForm } from "@/components/ordering/PaymentForm";
import { PickupTimeSelector } from "@/components/ordering/PickupTimeSelector";
import { useRestaurant } from "@/lib/restaurant-context";

type Step = "details" | "payment" | "confirmation";

const TIP_OPTIONS = [
  { label: "15%", multiplier: 0.15 },
  { label: "18%", multiplier: 0.18 },
  { label: "20%", multiplier: 0.2 },
  { label: "25%", multiplier: 0.25 },
  { label: "None", multiplier: 0 },
];

const DELIVERY_FEE = 5.99;

export default function CheckoutPage() {
  const {
    state,
    subtotal,
    tax,
    total,
    itemCount,
    clearCart,
    setOrderType,
    setScheduledTime,
  } = useCart();

  const [step, setStep] = useState<Step>("details");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState(2); // Default 20%
  const [customTip, setCustomTip] = useState("");
  // Preserve order details for confirmation screen (cart gets cleared after order)
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderType: string;
    scheduledTime?: string;
    total: number;
  } | null>(null);

  // Generate a unique key per checkout attempt to prevent duplicate orders
  const [idempotencyKey] = useState(() => crypto.randomUUID());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    apt: "",
    instructions: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const restaurant = useRestaurant();
  const accentColor = restaurant.branding.accentColor;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "email": {
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email address.";
        }
        return "";
      }
      case "phone": {
        const digits = value.replace(/\D/g, "");
        if (value && digits.length < 10) {
          return "Phone number must be at least 10 digits.";
        }
        return "";
      }
      case "address": {
        if (state.orderType === "delivery" && value && value.trim().length < 5) {
          return "Please enter a complete delivery address.";
        }
        return "";
      }
      case "customTip": {
        if (value !== "") {
          const num = parseFloat(value);
          if (isNaN(num) || num < 0) {
            return "Tip must be a valid positive number.";
          }
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleFieldBlur = (name: string, value: string) => {
    const error = validateField(name, value);
    setFieldErrors((prev) => {
      if (error) return { ...prev, [name]: error };
      const { [name]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearFieldError = (name: string) => {
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const { [name]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const tipAmount =
    selectedTip === TIP_OPTIONS.length
      ? Math.max(0, parseFloat(customTip) || 0)
      : selectedTip < TIP_OPTIONS.length
        ? subtotal * TIP_OPTIONS[selectedTip].multiplier
        : 0;

  const deliveryFee = state.orderType === "delivery" ? DELIVERY_FEE : 0;
  const orderTotal = total + tipAmount + deliveryFee;

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Run all field validations before proceeding
    const errors: Record<string, string> = {};
    const emailErr = validateField("email", formData.email);
    if (emailErr) errors.email = emailErr;
    const phoneErr = validateField("phone", formData.phone);
    if (phoneErr) errors.phone = phoneErr;
    if (state.orderType === "delivery") {
      const addrErr = validateField("address", formData.address);
      if (addrErr) errors.address = addrErr;
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors((prev) => ({ ...prev, ...errors }));
      return;
    }

    setStep("payment");
  };

  const handlePaymentToken = async (token: string, method: "square" | "stripe") => {
    setIsProcessing(true);
    setError(null);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey,
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          restaurantPhone: restaurant.contact.phone,
          items: state.items,
          subtotal,
          tax,
          tip: tipAmount,
          total: orderTotal,
          orderType: state.orderType,
          scheduledTime: state.scheduledTime,
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: state.orderType === "delivery" ? `${formData.address}${formData.apt ? `, ${formData.apt}` : ""}` : undefined,
          },
          paymentMethod: method,
          paymentToken: token,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to place order");
      }

      setOrderId(data.order.id);
      setConfirmedOrder({
        orderType: state.orderType,
        scheduledTime: state.scheduledTime,
        total: orderTotal,
      });
      setStep("confirmation");
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentError = (errorMsg: string) => {
    setError(errorMsg);
  };

  // Empty cart redirect
  if (itemCount === 0 && step !== "confirmation") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
        <svg className="mb-4 h-16 w-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        <h1 className="mb-2 text-xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="mb-6 text-gray-500">Add some items before checking out.</p>
        <a
          href="/#menu"
          className="rounded-full px-8 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg"
          style={{ backgroundColor: accentColor }}
        >
          Back to Menu
        </a>
      </div>
    );
  }

  // Confirmation step
  if (step === "confirmation" && orderId && confirmedOrder) {
    const estimatedTime =
      confirmedOrder.orderType === "delivery" ? "30-45 minutes" : "15-25 minutes";

    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md text-center"
        >
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accentColor}15` }}
          >
            <svg className="h-10 w-10" fill="none" stroke={accentColor} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="mb-6 text-gray-500">
            Thank you, {formData.name}! Your order from {restaurant.name} has been placed.
          </p>

          <div className="mb-6 rounded-xl bg-gray-50 p-5 text-left">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">Order Number</span>
              <span className="font-mono text-lg font-bold" style={{ color: accentColor }}>
                #{orderId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {confirmedOrder.scheduledTime ? "Scheduled" : "Estimated"}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {confirmedOrder.scheduledTime || estimatedTime}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-sm text-gray-500">Total</span>
              <span className="text-sm font-bold text-gray-900">{formatPrice(confirmedOrder.total)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={`/order/${orderId}`}
              className="rounded-xl py-3 text-center text-sm font-bold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              Track Your Order
            </a>
            <a
              href="/"
              className="rounded-xl border-2 py-3 text-center text-sm font-bold transition-colors hover:bg-gray-50"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              Back to Menu
            </a>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Confirmation sent to {formData.email}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Questions? Call{" "}
            <a href={`tel:${restaurant.contact.phone}`} className="underline" style={{ color: accentColor }}>
              {restaurant.contact.phone}
            </a>
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <a href="/#menu" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; Back
          </a>
          <h1 className="text-lg font-bold" style={{ color: restaurant.branding.primaryColor }}>
            Checkout
          </h1>
          <div className="w-12" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Progress */}
      <div className="mx-auto flex max-w-lg items-center justify-center gap-3 px-4 py-4" aria-label="Checkout progress">
        {(["Details", "Payment"] as const).map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                (i === 0 && step === "details") || (i === 1 && step === "payment")
                  ? "text-white"
                  : i === 0 && step === "payment"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-400"
              }`}
              style={
                (i === 0 && step === "details") || (i === 1 && step === "payment")
                  ? { backgroundColor: accentColor }
                  : undefined
              }
            >
              {i === 0 && step === "payment" ? "\u2713" : i + 1}
            </div>
            <span
              className={`text-sm font-medium ${
                (i === 0 && step === "details") || (i === 1 && step === "payment")
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {label}
            </span>
            {i === 0 && <div className="h-px w-8 bg-gray-200" />}
          </div>
        ))}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mx-auto max-w-lg px-4">
          <div role="alert" className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        </div>
      )}

      {/* Step 1: Details */}
      {step === "details" && (
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleDetailsSubmit}
          className="mx-auto max-w-lg px-4 pb-32"
        >
          {/* Order Type */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Order Type</h3>
            <div className="flex gap-2">
              {(["pickup", "delivery", "dine-in"] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setOrderType(type)}
                  className={`flex-1 rounded-lg px-3 py-3 text-sm font-medium transition-all ${
                    state.orderType === type
                      ? "text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={state.orderType === type ? { backgroundColor: accentColor } : undefined}
                >
                  {type === "pickup" ? "Pickup" : type === "delivery" ? "Delivery" : "Dine In"}
                </button>
              ))}
            </div>
          </div>

          {/* Pickup time */}
          <PickupTimeSelector
            accentColor={accentColor}
            orderType={state.orderType}
            onTimeSelected={(time) => setScheduledTime(time || "")}
          />

          {/* Customer info */}
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Your Info</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="checkout-name" className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="checkout-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="John Smith"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="checkout-email" className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onBlur={(e) => handleFieldBlur("email", e.target.value)}
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "checkout-email-error" : undefined}
                  className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-1 ${fieldErrors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"}`}
                  placeholder="you@email.com"
                />
                {fieldErrors.email && (
                  <p id="checkout-email-error" className="mt-1 text-xs text-red-500" role="alert">{fieldErrors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="checkout-phone" className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  onBlur={(e) => handleFieldBlur("phone", e.target.value)}
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? "checkout-phone-error" : undefined}
                  className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-1 ${fieldErrors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"}`}
                  placeholder="(206) 555-0142"
                />
                {fieldErrors.phone && (
                  <p id="checkout-phone-error" className="mt-1 text-xs text-red-500" role="alert">{fieldErrors.phone}</p>
                )}
              </div>
            </div>

            {state.orderType === "delivery" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="checkout-address" className="mb-1 block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    onBlur={(e) => handleFieldBlur("address", e.target.value)}
                    aria-invalid={!!fieldErrors.address}
                    aria-describedby={fieldErrors.address ? "checkout-address-error" : undefined}
                    className={`w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-1 ${fieldErrors.address ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"}`}
                    placeholder="123 Main St, Seattle WA"
                  />
                  {fieldErrors.address && (
                    <p id="checkout-address-error" className="mt-1 text-xs text-red-500" role="alert">{fieldErrors.address}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="checkout-apt" className="mb-1 block text-sm font-medium text-gray-700">
                    Apt / Suite (optional)
                  </label>
                  <input
                    id="checkout-apt"
                    type="text"
                    value={formData.apt}
                    onChange={(e) => updateField("apt", e.target.value)}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    placeholder="Apt 4B"
                  />
                </div>
              </motion.div>
            )}

            <div>
              <label htmlFor="checkout-instructions" className="mb-1 block text-sm font-medium text-gray-700">
                Special Instructions (optional)
              </label>
              <textarea
                id="checkout-instructions"
                rows={2}
                value={formData.instructions}
                onChange={(e) => updateField("instructions", e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="Any dietary needs or preferences..."
              />
            </div>
          </div>

          {/* Order summary (mini) */}
          <div className="mt-6 rounded-xl bg-gray-50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
              <span className="font-bold text-gray-900">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
            style={{ backgroundColor: accentColor }}
          >
            Continue to Payment
          </button>
        </motion.form>
      )}

      {/* Step 2: Payment */}
      {step === "payment" && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto max-w-lg px-4 pb-32"
        >
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setStep("details")}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              &larr; Back to details
            </button>
          </div>

          {/* Tip Selection */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Add a tip</h3>
            <div className="flex gap-2">
              {TIP_OPTIONS.map((option, i) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => { setSelectedTip(i); setCustomTip(""); clearFieldError("customTip"); }}
                  className={`flex-1 rounded-lg px-2 py-2.5 text-sm font-medium transition-all ${
                    selectedTip === i
                      ? "text-white shadow-sm"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  style={selectedTip === i ? { backgroundColor: accentColor } : undefined}
                >
                  {option.label}
                  {option.multiplier > 0 && (
                    <span className="block text-xs opacity-75">
                      {formatPrice(subtotal * option.multiplier)}
                    </span>
                  )}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setSelectedTip(TIP_OPTIONS.length)}
                className={`flex-1 rounded-lg px-2 py-2.5 text-sm font-medium transition-all ${
                  selectedTip === TIP_OPTIONS.length
                    ? "text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={selectedTip === TIP_OPTIONS.length ? { backgroundColor: accentColor } : undefined}
              >
                Custom
              </button>
            </div>
            {selectedTip === TIP_OPTIONS.length && (
              <div className="mt-3">
                <label htmlFor="checkout-custom-tip" className="sr-only">Custom tip amount</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                  <input
                    id="checkout-custom-tip"
                    type="text"
                    inputMode="decimal"
                    value={customTip}
                    onChange={(e) => { setCustomTip(e.target.value); clearFieldError("customTip"); }}
                    onBlur={(e) => handleFieldBlur("customTip", e.target.value)}
                    aria-invalid={!!fieldErrors.customTip}
                    aria-describedby={fieldErrors.customTip ? "checkout-custom-tip-error" : undefined}
                    className={`w-full rounded-lg border py-3 pl-7 pr-4 text-sm transition-colors focus:outline-none focus:ring-1 ${fieldErrors.customTip ? "border-red-400 focus:border-red-400 focus:ring-red-400" : "border-gray-200 focus:border-gray-400 focus:ring-gray-400"}`}
                    placeholder="0.00"
                  />
                </div>
                {fieldErrors.customTip && (
                  <p id="checkout-custom-tip-error" className="mt-1 text-xs text-red-500" role="alert">{fieldErrors.customTip}</p>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="mb-6 rounded-xl bg-gray-50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Order Summary</h3>
            {state.items.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between py-1 text-sm text-gray-600">
                <span>{item.quantity}x {item.menuItem.name}</span>
                <span>{formatPrice(item.subtotal)}</span>
              </div>
            ))}
            <div className="mt-3 space-y-1 border-t border-gray-200 pt-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span>{formatPrice(deliveryFee)}</span>
                </div>
              )}
              {tipAmount > 0 && (
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tip</span>
                  <span>{formatPrice(tipAmount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900">
                <span>Total</span>
                <span>{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <PaymentForm
            accentColor={accentColor}
            amount={orderTotal}
            onPaymentToken={handlePaymentToken}
            onError={handlePaymentError}
            isProcessing={isProcessing}
          />
        </motion.div>
      )}
    </div>
  );
}
