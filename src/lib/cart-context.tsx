"use client";

import { createContext, useContext, useReducer, useCallback, useEffect, useRef, type ReactNode } from "react";
import type { MenuItem, CartItem } from "@/types/restaurant";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  orderType: "pickup" | "delivery" | "dine-in";
  scheduledTime?: string;
  specialInstructions?: string;
}

type CartAction =
  | { type: "ADD_ITEM"; menuItem: MenuItem; quantity: number }
  | { type: "REMOVE_ITEM"; itemId: string }
  | { type: "UPDATE_QUANTITY"; itemId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART"; isOpen?: boolean }
  | { type: "SET_ORDER_TYPE"; orderType: "pickup" | "delivery" | "dine-in" }
  | { type: "SET_SCHEDULED_TIME"; time: string }
  | { type: "SET_INSTRUCTIONS"; instructions: string }
  | { type: "HYDRATE"; state: Partial<CartState> };

interface CartContextType {
  state: CartState;
  addItem: (menuItem: MenuItem, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (isOpen?: boolean) => void;
  setOrderType: (type: "pickup" | "delivery" | "dine-in") => void;
  setScheduledTime: (time: string) => void;
  setInstructions: (instructions: string) => void;
  subtotal: number;
  itemCount: number;
  tax: number;
  total: number;
}

const TAX_RATE = 0.1025; // WA State + Seattle local sales tax
const STORAGE_KEY = "northstar-cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.menuItem.id === action.menuItem.id
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        const existing = updatedItems[existingIndex];
        const newQuantity = existing.quantity + action.quantity;
        updatedItems[existingIndex] = {
          ...existing,
          quantity: newQuantity,
          subtotal: action.menuItem.price * newQuantity,
        };
        return { ...state, items: updatedItems, isOpen: true };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            menuItem: action.menuItem,
            quantity: action.quantity,
            customizations: [],
            subtotal: action.menuItem.price * action.quantity,
          },
        ],
        isOpen: true,
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.menuItem.id !== action.itemId),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.menuItem.id !== action.itemId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.menuItem.id === action.itemId
            ? {
                ...item,
                quantity: action.quantity,
                subtotal: item.menuItem.price * action.quantity,
              }
            : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, items: [], isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: action.isOpen ?? !state.isOpen };
    case "SET_ORDER_TYPE":
      return { ...state, orderType: action.orderType };
    case "SET_SCHEDULED_TIME":
      return { ...state, scheduledTime: action.time };
    case "SET_INSTRUCTIONS":
      return { ...state, specialInstructions: action.instructions };
    case "HYDRATE":
      return { ...state, ...action.state };
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  isOpen: false,
  orderType: "pickup",
};

function loadCartFromStorage(): Partial<CartState> | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    // Only restore items, orderType, scheduledTime, instructions — not isOpen
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      orderType: parsed.orderType || "pickup",
      scheduledTime: parsed.scheduledTime,
      specialInstructions: parsed.specialInstructions,
    };
  } catch {
    return null;
  }
}

function saveCartToStorage(state: CartState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      items: state.items,
      orderType: state.orderType,
      scheduledTime: state.scheduledTime,
      specialInstructions: state.specialInstructions,
    }));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const hydrated = useRef(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    const saved = loadCartFromStorage();
    if (saved && saved.items && saved.items.length > 0) {
      dispatch({ type: "HYDRATE", state: saved });
    }
  }, []);

  // Persist to localStorage on state changes
  useEffect(() => {
    if (!hydrated.current) return;
    saveCartToStorage(state);
  }, [state]);

  const addItem = useCallback(
    (menuItem: MenuItem, quantity: number) =>
      dispatch({ type: "ADD_ITEM", menuItem, quantity }),
    []
  );
  const removeItem = useCallback(
    (itemId: string) => dispatch({ type: "REMOVE_ITEM", itemId }),
    []
  );
  const updateQuantity = useCallback(
    (itemId: string, quantity: number) =>
      dispatch({ type: "UPDATE_QUANTITY", itemId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleCart = useCallback(
    (isOpen?: boolean) => dispatch({ type: "TOGGLE_CART", isOpen }),
    []
  );
  const setOrderType = useCallback(
    (orderType: "pickup" | "delivery" | "dine-in") =>
      dispatch({ type: "SET_ORDER_TYPE", orderType }),
    []
  );
  const setScheduledTime = useCallback(
    (time: string) => dispatch({ type: "SET_SCHEDULED_TIME", time }),
    []
  );
  const setInstructions = useCallback(
    (instructions: string) => dispatch({ type: "SET_INSTRUCTIONS", instructions }),
    []
  );

  const subtotal = state.items.reduce((sum, item) => sum + item.subtotal, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        setOrderType,
        setScheduledTime,
        setInstructions,
        subtotal,
        itemCount,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
