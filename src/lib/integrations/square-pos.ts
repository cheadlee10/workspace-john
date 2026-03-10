/**
 * Square POS Integration
 *
 * Square is our primary POS integration:
 * - Free to integrate (no monthly API fees)
 * - Full REST API (Catalog, Orders, Payments, Customers)
 * - Supports online ordering end-to-end
 * - Webhook support for real-time order updates
 * - Processing: 2.6% + $0.10 per transaction
 *
 * Flow:
 * 1. Restaurant connects their Square account (OAuth)
 * 2. We sync their Catalog (menu items) → our MenuSection/MenuItem types
 * 3. Customer places order on our website
 * 4. We create a Square Order via Orders API
 * 5. We process payment via Payments API (or Web Payments SDK)
 * 6. Order appears in restaurant's Square Dashboard/POS
 * 7. Restaurant updates order status → we show customer updates
 */

export interface SquareConfig {
  accessToken: string;
  locationId: string;
  environment: "sandbox" | "production";
  applicationId: string;
}

const SQUARE_URLS = {
  sandbox: "https://connect.squareupsandbox.com/v2",
  production: "https://connect.squareup.com/v2",
};

/**
 * OAuth: Generate authorization URL for restaurant to connect their Square account
 */
export function getSquareOAuthUrl(
  applicationId: string,
  redirectUri: string,
  state: string
): string {
  const scopes = [
    "ITEMS_READ",
    "ITEMS_WRITE",
    "ORDERS_READ",
    "ORDERS_WRITE",
    "PAYMENTS_READ",
    "PAYMENTS_WRITE",
    "CUSTOMERS_READ",
    "CUSTOMERS_WRITE",
    "MERCHANT_PROFILE_READ",
    "INVENTORY_READ",
  ].join("+");

  return `https://connect.squareup.com/oauth2/authorize?client_id=${applicationId}&scope=${scopes}&session=false&state=${state}&redirect_uri=${encodeURIComponent(redirectUri)}`;
}

/**
 * Exchange OAuth code for access token
 */
export async function exchangeOAuthCode(
  applicationId: string,
  applicationSecret: string,
  code: string,
  redirectUri: string
): Promise<{
  accessToken: string;
  refreshToken: string;
  merchantId: string;
  expiresAt: string;
}> {
  const response = await fetch("https://connect.squareup.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: applicationId,
      client_secret: applicationSecret,
      code,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    merchantId: data.merchant_id,
    expiresAt: data.expires_at,
  };
}

/**
 * Sync Square Catalog → our MenuItem format
 */
export async function syncCatalog(config: SquareConfig): Promise<{
  sections: Array<{
    name: string;
    items: Array<{
      squareId: string;
      name: string;
      description: string;
      price: number;
      imageUrl?: string;
      variationId: string;
    }>;
  }>;
}> {
  const baseUrl = SQUARE_URLS[config.environment];

  // List all catalog items
  const response = await fetch(`${baseUrl}/catalog/list?types=ITEM,CATEGORY,IMAGE`, {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const items = data.objects || [];

  // Build category map
  const categories = new Map<string, string>();
  const images = new Map<string, string>();

  for (const obj of items) {
    if (obj.type === "CATEGORY") {
      categories.set(obj.id, obj.category_data.name);
    }
    if (obj.type === "IMAGE") {
      images.set(obj.id, obj.image_data.url);
    }
  }

  // Group items by category
  const sectionMap = new Map<string, Array<{
    squareId: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    variationId: string;
  }>>();

  for (const obj of items) {
    if (obj.type !== "ITEM") continue;

    const itemData = obj.item_data;
    const categoryId = itemData.category_id;
    const categoryName = categoryId ? categories.get(categoryId) || "Menu" : "Menu";

    const variation = itemData.variations?.[0];
    const price = variation?.item_variation_data?.price_money?.amount || 0;
    const imageId = itemData.image_ids?.[0];

    if (!sectionMap.has(categoryName)) {
      sectionMap.set(categoryName, []);
    }

    sectionMap.get(categoryName)!.push({
      squareId: obj.id,
      name: itemData.name,
      description: itemData.description || "",
      price: price / 100, // Convert cents to dollars
      imageUrl: imageId ? images.get(imageId) : undefined,
      variationId: variation?.id || "",
    });
  }

  return {
    sections: Array.from(sectionMap.entries()).map(([name, sectionItems]) => ({
      name,
      items: sectionItems,
    })),
  };
}

/**
 * Create an order in Square from our cart
 */
export async function createOrder(
  config: SquareConfig,
  order: {
    items: Array<{
      catalogItemId: string;
      variationId: string;
      quantity: number;
      note?: string;
    }>;
    fulfillment: {
      type: "PICKUP" | "DELIVERY" | "DINE_IN";
      displayName: string;
      email: string;
      phone: string;
      pickupAt?: string;
      deliveryAddress?: string;
      tableNumber?: string;
    };
  }
): Promise<{
  orderId: string;
  totalMoney: number;
  status: string;
}> {
  const baseUrl = SQUARE_URLS[config.environment];

  const lineItems = order.items.map((item) => ({
    catalog_object_id: item.variationId,
    quantity: item.quantity.toString(),
    ...(item.note ? { note: item.note } : {}),
  }));

  const fulfillment: Record<string, unknown> = {
    type: order.fulfillment.type === "DINE_IN" ? "PICKUP" : order.fulfillment.type,
    state: "PROPOSED",
    pickup_details: {
      recipient: {
        display_name: order.fulfillment.displayName,
        email_address: order.fulfillment.email,
        phone_number: order.fulfillment.phone,
      },
      ...(order.fulfillment.pickupAt
        ? { pickup_at: order.fulfillment.pickupAt }
        : { prep_time_duration: "P0DT0H15M" }), // Default 15 min
    },
  };

  if (order.fulfillment.type === "DELIVERY" && order.fulfillment.deliveryAddress) {
    fulfillment.delivery_details = {
      recipient: {
        display_name: order.fulfillment.displayName,
        email_address: order.fulfillment.email,
        phone_number: order.fulfillment.phone,
        address: {
          address_line_1: order.fulfillment.deliveryAddress,
        },
      },
    };
  }

  const response = await fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order: {
        location_id: config.locationId,
        line_items: lineItems,
        fulfillments: [fulfillment],
      },
      idempotency_key: `order-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    }),
  });

  const data = await response.json();
  const createdOrder = data.order;

  return {
    orderId: createdOrder.id,
    totalMoney: (createdOrder.total_money?.amount || 0) / 100,
    status: createdOrder.state,
  };
}

/**
 * Process payment for an order
 */
export async function processPayment(
  config: SquareConfig,
  params: {
    orderId: string;
    sourceId: string; // Payment token from Web Payments SDK
    amount: number; // in dollars
    currency?: string;
    tipAmount?: number;
    customerEmail?: string;
  }
): Promise<{
  paymentId: string;
  status: string;
  receiptUrl?: string;
}> {
  const baseUrl = SQUARE_URLS[config.environment];

  const body: Record<string, unknown> = {
    source_id: params.sourceId,
    idempotency_key: `payment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    amount_money: {
      amount: Math.round(params.amount * 100), // Convert to cents
      currency: params.currency || "USD",
    },
    order_id: params.orderId,
    location_id: config.locationId,
    autocomplete: true,
  };

  if (params.tipAmount && params.tipAmount > 0) {
    body.tip_money = {
      amount: Math.round(params.tipAmount * 100),
      currency: params.currency || "USD",
    };
  }

  if (params.customerEmail) {
    body.buyer_email_address = params.customerEmail;
  }

  const response = await fetch(`${baseUrl}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  const payment = data.payment;

  return {
    paymentId: payment.id,
    status: payment.status,
    receiptUrl: payment.receipt_url,
  };
}

/**
 * Get order status (for real-time tracking)
 */
export async function getOrderStatus(
  config: SquareConfig,
  orderId: string
): Promise<{
  status: string;
  fulfillmentStatus?: string;
  updatedAt: string;
}> {
  const baseUrl = SQUARE_URLS[config.environment];

  const response = await fetch(`${baseUrl}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  const order = data.order;

  return {
    status: order.state,
    fulfillmentStatus: order.fulfillments?.[0]?.state,
    updatedAt: order.updated_at,
  };
}

/**
 * Register webhook for order status updates
 */
export async function registerWebhook(
  config: SquareConfig,
  webhookUrl: string
): Promise<string> {
  const baseUrl = SQUARE_URLS[config.environment];

  const response = await fetch(`${baseUrl}/webhooks/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idempotency_key: `webhook-${Date.now()}`,
      subscription: {
        name: "NorthStar Order Updates",
        enabled: true,
        event_types: [
          "order.updated",
          "order.fulfillment.updated",
          "payment.completed",
          "payment.updated",
        ],
        notification_url: webhookUrl,
        api_version: "2024-01-18",
      },
    }),
  });

  const data = await response.json();
  return data.subscription?.id || "";
}
