import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "La Rosa Fleuriste — Tlemcen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Gold border frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid #c9a84c55",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "32px",
            border: "1px solid #c9a84c22",
            display: "flex",
          }}
        />

        {/* Corner decorations */}
        {[
          { top: 20, left: 20 },
          { top: 20, right: 20 },
          { bottom: 20, left: 20 },
          { bottom: 20, right: 20 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 30,
              height: 30,
              borderTop: i < 2 ? "2px solid #c9a84c" : undefined,
              borderBottom: i >= 2 ? "2px solid #c9a84c" : undefined,
              borderLeft: i % 2 === 0 ? "2px solid #c9a84c" : undefined,
              borderRight: i % 2 === 1 ? "2px solid #c9a84c" : undefined,
              ...pos,
              display: "flex",
            }}
          />
        ))}

        {/* Roses decoration */}
        <div style={{ fontSize: 48, marginBottom: 16, display: "flex" }}>🌹🌹🌹</div>

        {/* Title */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: 80,
            color: "#c9a84c",
            letterSpacing: "-2px",
            marginBottom: 8,
            display: "flex",
          }}
        >
          La Rosa
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: 28,
            color: "#f5f0e8",
            letterSpacing: "8px",
            textTransform: "uppercase",
            marginBottom: 16,
            display: "flex",
          }}
        >
          Fleuriste
        </div>

        {/* Divider */}
        <div
          style={{
            width: 200,
            height: 1,
            background: "linear-gradient(to right, transparent, #c9a84c, transparent)",
            marginBottom: 16,
            display: "flex",
          }}
        />

        {/* Slogan */}
        <div
          style={{
            fontFamily: "serif",
            fontStyle: "italic",
            fontSize: 22,
            color: "#f5f0e8aa",
            display: "flex",
          }}
        >
          Une passion de famille • Tlemcen, Algérie
        </div>
      </div>
    ),
    { ...size }
  );
}
