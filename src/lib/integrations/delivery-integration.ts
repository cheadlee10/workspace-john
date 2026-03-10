/**
 * White-Label Delivery Integration
 *
 * The anti-DoorDash play. Instead of restaurants paying 25-30% commission
 * to DoorDash/UberEats, they can offer delivery through their own website
 * using DoorDash Drive or Uber Direct as the fulfillment layer.
 *
 * Customer orders on restaurant's website → We dispatch a driver → Restaurant pays only the delivery fee (~$5-8)
 *
 * DoorDash Drive: https://developer.doordash.com/
 * - $6-8 per delivery (flat fee, no commission)
 * - API for creating deliveries
 * - Real-time driver tracking
 * - No DoorDash branding
 *
 * Uber Direct: https://developer.uber.com/
 * - Similar pricing model
 * - API for deliveries
 * - Driver tracking
 *
 * Order with Google:
 * - Zero commission
 * - Orders placed directly from Google Search/Maps
 * - Requires integration partner status
 */

export interface DeliveryConfig {
  provider: "doordash_drive" | "uber_direct";
  apiKey: string;
  developerId?: string;
  signingSecret?: string;
}

export interface DeliveryRequest {
  pickupAddress: string;
  pickupPhoneNumber: string;
  pickupInstructions?: string;
  pickupBusinessName: string;
  dropoffAddress: string;
  dropoffPhoneNumber: string;
  dropoffContactName: string;
  dropoffInstructions?: string;
  orderValue: number; // In cents
  itemDescriptions?: string[];
  tip?: number; // Driver tip in cents
  deliveryTime?: string; // ISO 8601, or ASAP if not provided
}

export interface DeliveryStatus {
  id: string;
  status: "created" | "confirmed" | "enroute_to_pickup" | "arrived_at_pickup" |
    "picked_up" | "enroute_to_dropoff" | "arrived_at_dropoff" | "delivered" |
    "cancelled" | "failed";
  estimatedPickupTime?: string;
  estimatedDeliveryTime?: string;
  driverName?: string;
  driverPhone?: string;
  trackingUrl?: string;
  fee: number; // In cents
}

/**
 * Create a delivery via DoorDash Drive
 */
export async function createDoorDashDelivery(
  config: DeliveryConfig,
  request: DeliveryRequest
): Promise<DeliveryStatus> {
  // DoorDash Drive API uses JWT authentication
  const jwt = await generateDoorDashJWT(config);

  const response = await fetch("https://openapi.doordash.com/drive/v2/deliveries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      external_delivery_id: `delivery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      pickup_address: request.pickupAddress,
      pickup_phone_number: request.pickupPhoneNumber,
      pickup_instructions: request.pickupInstructions || "",
      pickup_business_name: request.pickupBusinessName,
      dropoff_address: request.dropoffAddress,
      dropoff_phone_number: request.dropoffPhoneNumber,
      dropoff_contact_given_name: request.dropoffContactName,
      dropoff_instructions: request.dropoffInstructions || "",
      order_value: request.orderValue,
      items: request.itemDescriptions?.map((desc) => ({
        name: desc,
        quantity: 1,
      })),
      tip: request.tip || 0,
      ...(request.deliveryTime
        ? { dropoff_time: request.deliveryTime }
        : {}),
    }),
  });

  const data = await response.json();

  return {
    id: data.external_delivery_id,
    status: mapDoorDashStatus(data.delivery_status),
    estimatedPickupTime: data.pickup_time_estimated,
    estimatedDeliveryTime: data.dropoff_time_estimated,
    trackingUrl: data.tracking_url,
    fee: data.fee || 0,
  };
}

/**
 * Get delivery status from DoorDash Drive
 */
export async function getDoorDashDeliveryStatus(
  config: DeliveryConfig,
  deliveryId: string
): Promise<DeliveryStatus> {
  const jwt = await generateDoorDashJWT(config);

  const response = await fetch(
    `https://openapi.doordash.com/drive/v2/deliveries/${deliveryId}`,
    {
      headers: { Authorization: `Bearer ${jwt}` },
    }
  );

  const data = await response.json();

  return {
    id: data.external_delivery_id,
    status: mapDoorDashStatus(data.delivery_status),
    estimatedPickupTime: data.pickup_time_estimated,
    estimatedDeliveryTime: data.dropoff_time_estimated,
    driverName: data.dasher_name,
    driverPhone: data.dasher_phone_number,
    trackingUrl: data.tracking_url,
    fee: data.fee || 0,
  };
}

/**
 * Create a delivery via Uber Direct
 */
export async function createUberDirectDelivery(
  config: DeliveryConfig,
  request: DeliveryRequest
): Promise<DeliveryStatus> {
  // Get OAuth token first
  const tokenResponse = await fetch("https://login.uber.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.apiKey,
      client_secret: config.signingSecret || "",
      grant_type: "client_credentials",
      scope: "eats.deliveries",
    }),
  });
  const tokenData = await tokenResponse.json();

  const response = await fetch("https://api.uber.com/v1/customers/deliveries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData.access_token}`,
    },
    body: JSON.stringify({
      pickup: {
        address: request.pickupAddress,
        phone_number: request.pickupPhoneNumber,
        instructions: request.pickupInstructions,
      },
      dropoff: {
        address: request.dropoffAddress,
        phone_number: request.dropoffPhoneNumber,
        contact: { first_name: request.dropoffContactName },
        instructions: request.dropoffInstructions,
      },
      manifest: {
        description: request.itemDescriptions?.join(", ") || "Food order",
      },
      ...(request.deliveryTime
        ? { dropoff_deadline: request.deliveryTime }
        : {}),
    }),
  });

  const data = await response.json();

  return {
    id: data.id,
    status: mapUberStatus(data.status),
    estimatedDeliveryTime: data.dropoff?.eta,
    trackingUrl: data.tracking_url,
    fee: data.fee?.total || 0,
  };
}

/**
 * Get a delivery quote (estimated fee) before creating the delivery
 */
export async function getDeliveryQuote(
  config: DeliveryConfig,
  pickupAddress: string,
  dropoffAddress: string,
  orderValue: number
): Promise<{
  estimatedFee: number;
  estimatedDuration: number; // minutes
  provider: string;
}> {
  if (config.provider === "doordash_drive") {
    const jwt = await generateDoorDashJWT(config);

    const response = await fetch("https://openapi.doordash.com/drive/v2/deliveries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        external_delivery_id: `quote-${Date.now()}`,
        pickup_address: pickupAddress,
        dropoff_address: dropoffAddress,
        order_value: orderValue,
        // Setting this flag gets a quote without creating a delivery
        simulation: true,
      }),
    });

    const data = await response.json();
    return {
      estimatedFee: (data.fee || 0) / 100,
      estimatedDuration: data.delivery_time_estimated || 30,
      provider: "DoorDash Drive",
    };
  }

  // Default estimate
  return {
    estimatedFee: 6.99,
    estimatedDuration: 30,
    provider: config.provider,
  };
}

// --- Helper functions ---

async function generateDoorDashJWT(config: DeliveryConfig): Promise<string> {
  // DoorDash uses JWT signed with your developer key
  // In production, use jose or jsonwebtoken library
  const header = { alg: "HS256", typ: "JWT", "dd-ver": "DD-JWT-V1" };
  const payload = {
    aud: "doordash",
    iss: config.developerId,
    kid: config.apiKey,
    exp: Math.floor(Date.now() / 1000) + 300, // 5 minutes
    iat: Math.floor(Date.now() / 1000),
  };

  const encode = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const headerEncoded = encode(header);
  const payloadEncoded = encode(payload);

  if (!config.signingSecret) {
    throw new Error("DoorDash signing secret is required for JWT generation");
  }

  const { createHmac } = await import("crypto");
  const hmac = createHmac("sha256", Buffer.from(config.signingSecret, "base64"));
  hmac.update(`${headerEncoded}.${payloadEncoded}`);
  const signature = hmac.digest("base64url");

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}

function mapDoorDashStatus(status: string): DeliveryStatus["status"] {
  const statusMap: Record<string, DeliveryStatus["status"]> = {
    created: "created",
    confirmed: "confirmed",
    enroute_to_pickup: "enroute_to_pickup",
    arrived_at_pickup: "arrived_at_pickup",
    picked_up: "picked_up",
    enroute_to_dropoff: "enroute_to_dropoff",
    arrived_at_dropoff: "arrived_at_dropoff",
    delivered: "delivered",
    cancelled: "cancelled",
  };
  return statusMap[status] || "created";
}

function mapUberStatus(status: string): DeliveryStatus["status"] {
  const statusMap: Record<string, DeliveryStatus["status"]> = {
    pending: "created",
    pickup: "enroute_to_pickup",
    pickup_complete: "picked_up",
    dropoff: "enroute_to_dropoff",
    delivered: "delivered",
    canceled: "cancelled",
    returned: "failed",
  };
  return statusMap[status] || "created";
}
