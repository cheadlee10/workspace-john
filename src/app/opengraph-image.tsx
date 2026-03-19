import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NorthStar Synergy — Restaurant Websites That Drive Revenue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #111827 0%, #0f766e 100%)",
          padding: "60px",
        }}
      >
        {/* Star icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 80,
            height: 80,
            borderRadius: 20,
            backgroundColor: "#0f766e",
            border: "2px solid rgba(255,255,255,0.2)",
            marginBottom: 32,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="white"
            stroke="none"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          NorthStar Synergy
        </div>

        <div
          style={{
            fontSize: 28,
            color: "#5eead4",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          Restaurant Websites That Drive Revenue
        </div>

        <div
          style={{
            display: "flex",
            gap: 40,
          }}
        >
          {[
            { value: "0%", label: "Commission" },
            { value: "$0", label: "Setup Fee" },
            { value: "48hr", label: "Launch" },
            { value: "$49/mo", label: "Starting At" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px 24px",
                borderRadius: 12,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 800, color: "white" }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 30,
            fontSize: 16,
            color: "#6b7280",
          }}
        >
          northstarsynergy.org
        </div>
      </div>
    ),
    { ...size }
  );
}
