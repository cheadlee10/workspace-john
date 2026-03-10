"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PaymentFormProps {
  accentColor?: string;
  amount: number;
  onPaymentToken: (token: string, method: "square" | "stripe") => void;
  onError: (error: string) => void;
  isProcessing: boolean;
}

// Square Web Payments SDK types (minimal)
interface SquarePayments {
  card: () => Promise<SquareCard>;
}

interface SquareCard {
  attach: (selector: string) => Promise<void>;
  tokenize: () => Promise<{ status: string; token?: string; errors?: Array<{ message: string }> }>;
  destroy: () => Promise<void>;
}

declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => Promise<SquarePayments>;
    };
  }
}

export function PaymentForm({
  accentColor = "#D4A574",
  amount,
  onPaymentToken,
  onError,
  isProcessing,
}: PaymentFormProps) {
  const [paymentMode, setPaymentMode] = useState<"square" | "stripe" | "demo">("demo");
  const [squareLoaded, setSquareLoaded] = useState(false);
  const [cardReady, setCardReady] = useState(false);
  const cardRef = useRef<SquareCard | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const squareAppId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID;
  const squareLocationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID;
  const hasSquare = Boolean(squareAppId && squareLocationId);

  // Load Square SDK
  useEffect(() => {
    if (!hasSquare || paymentMode !== "square") return;

    if (window.Square) {
      setSquareLoaded(true);
      return;
    }

    const script = document.createElement("script");
    const isProduction = process.env.NEXT_PUBLIC_SQUARE_ENVIRONMENT === "production";
    script.src = isProduction
      ? "https://web.squarecdn.com/v1/square.js"
      : "https://sandbox.web.squarecdn.com/v1/square.js";
    script.onload = () => setSquareLoaded(true);
    script.onerror = () => onError("Failed to load payment system");
    document.head.appendChild(script);
  }, [hasSquare, paymentMode, onError]);

  // Initialize Square card form
  const initializeCard = useCallback(async () => {
    if (!squareLoaded || !window.Square || !squareAppId || !squareLocationId) return;

    try {
      if (cardRef.current) {
        await cardRef.current.destroy();
        cardRef.current = null;
      }

      const payments = await window.Square.payments(squareAppId, squareLocationId);
      const card = await payments.card();
      await card.attach("#square-card-container");
      cardRef.current = card;
      setCardReady(true);
    } catch (err) {
      console.error("Square card init error:", err);
      onError("Failed to initialize payment form");
    }
  }, [squareLoaded, squareAppId, squareLocationId, onError]);

  useEffect(() => {
    if (paymentMode === "square" && squareLoaded) {
      initializeCard();
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.destroy().catch(() => {});
        cardRef.current = null;
        setCardReady(false);
      }
    };
  }, [paymentMode, squareLoaded, initializeCard]);

  const handleSquarePayment = async () => {
    if (!cardRef.current) {
      onError("Payment form not ready");
      return;
    }

    try {
      const result = await cardRef.current.tokenize();
      if (result.status === "OK" && result.token) {
        onPaymentToken(result.token, "square");
      } else {
        const errorMessage = result.errors?.[0]?.message || "Payment failed";
        onError(errorMessage);
      }
    } catch (err) {
      onError("Payment processing error");
      console.error("Square tokenize error:", err);
    }
  };

  const handleDemoPayment = () => {
    // Simulate a successful payment with a demo token
    onPaymentToken(`demo_tok_${Date.now()}`, "square");
  };

  return (
    <div ref={containerRef}>
      {/* Payment method selector (only if Square is configured) */}
      {hasSquare && (
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setPaymentMode("square")}
            className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              paymentMode === "square"
                ? "text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={paymentMode === "square" ? { backgroundColor: accentColor } : undefined}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Card (Square)
            </span>
          </button>
        </div>
      )}

      {/* Square Card Form */}
      {paymentMode === "square" && hasSquare && (
        <div className="mb-4">
          <div
            id="square-card-container"
            className="min-h-[60px] rounded-lg border border-gray-200 bg-white p-1"
          />
          {!cardReady && squareLoaded && (
            <p className="mt-2 text-center text-xs text-gray-400">Loading card form...</p>
          )}
          <button
            type="button"
            onClick={handleSquarePayment}
            disabled={!cardReady || isProcessing}
            className="mt-4 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-70"
            style={{ backgroundColor: accentColor }}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            Secure payment processed by Square
          </p>
        </div>
      )}

      {/* Demo mode (when Square is not configured) */}
      {(paymentMode === "demo" || !hasSquare) && (
        <div className="mb-4">
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
            <div className="mb-2 flex justify-center">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-700">Demo Mode</p>
            <p className="mt-1 text-xs text-gray-500">No real payment will be processed. Click below to simulate a successful order.</p>
          </div>

          <button
            type="button"
            onClick={handleDemoPayment}
            disabled={isProcessing}
            className="mt-4 w-full rounded-xl py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98] disabled:opacity-70"
            style={{ backgroundColor: accentColor }}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              `Pay $${amount.toFixed(2)}`
            )}
          </button>
          <p className="mt-3 text-center text-xs text-gray-400">
            {hasSquare ? "Secure payment processed by Square" : "Demo mode — no real charges"}
          </p>
        </div>
      )}
    </div>
  );
}
