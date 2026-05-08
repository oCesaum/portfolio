import { ImageResponse } from "next/og";
import { getDictionary } from "@/lib/i18n";

export const alt = "César Augusto — Dev Full-stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImagePT() {
  const dict = getDictionary("pt");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 16,
            letterSpacing: "0.18em",
            color: "#d8bea3",
            textTransform: "uppercase",
            fontWeight: 500,
            fontFamily: "ui-monospace, monospace",
          }}
        >
          {dict.hero.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.022em",
              lineHeight: 0.95,
              color: "#fafafa",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>{dict.hero.title_line1}</span>
            <span>{dict.hero.title_line2}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
              fontSize: 22,
              color: "#a1a1a1",
            }}
          >
            <span style={{ color: "#fafafa", fontWeight: 600 }}>
              {dict.meta.brand}
            </span>
            <span style={{ color: "#525252" }}>·</span>
            <span>{dict.footer.role}</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
