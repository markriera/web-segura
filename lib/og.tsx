import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://segura.cat";

export function absoluteImageUrl(src: string | undefined): string | null {
  if (!src) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("/")) return `${SITE_URL}${src}`;
  return `${SITE_URL}/${src}`;
}

const colors = {
  bone: "#f4efe6",
  ink: "#1a1814",
  accent: "#f0c89a",
  rust: "#a0522d",
};

export type OgCardInput = {
  kicker: string;
  meta?: string | null;
  title: string;
  subtitle?: string | null;
  imatge?: string | null;
};

export function renderOgCard({
  kicker,
  meta,
  title,
  subtitle,
  imatge,
}: OgCardInput) {
  const bg = absoluteImageUrl(imatge ?? undefined);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: colors.ink,
          color: colors.bone,
          fontFamily: "serif",
        }}
      >
        {/* LEFT: photo, contained, blurred fill */}
        <div
          style={{
            width: "560px",
            height: "100%",
            position: "relative",
            display: "flex",
            background: colors.ink,
          }}
        >
          {bg && (
            <>
              <img
                src={bg}
                alt=""
                width={560}
                height={630}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(40px) brightness(0.55) saturate(0.9)",
                  transform: "scale(1.15)",
                }}
              />
              <img
                src={bg}
                alt=""
                width={560}
                height={630}
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </>
          )}
        </div>

        {/* RIGHT: text panel */}
        <div
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            padding: "60px 60px 50px 60px",
            background: colors.ink,
            position: "relative",
          }}
        >
          {/* faint accent strip on the seam */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: "4px",
              background: colors.rust,
              opacity: 0.85,
              display: "flex",
            }}
          />

          {/* header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                fontSize: "16px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: colors.bone,
                opacity: 0.85,
                fontFamily: "monospace",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "32px",
                  height: "1px",
                  background: colors.bone,
                  opacity: 0.55,
                }}
              />
              Segura
            </div>
            <div
              style={{
                fontSize: "16px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: colors.accent,
                fontFamily: "monospace",
              }}
            >
              {kicker}
            </div>
          </div>

          {/* main */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {meta && (
              <div
                style={{
                  fontSize: "26px",
                  color: colors.accent,
                  fontFamily: "monospace",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: "18px",
                }}
              >
                {meta}
              </div>
            )}
            <div
              style={{
                fontSize:
                  title.length > 32
                    ? "60px"
                    : title.length > 20
                      ? "76px"
                      : "92px",
                color: colors.bone,
                lineHeight: 0.98,
                fontWeight: 600,
                letterSpacing: "-0.02em",
                display: "flex",
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div
                style={{
                  marginTop: "18px",
                  fontSize: "24px",
                  color: colors.bone,
                  opacity: 0.85,
                  fontStyle: "italic",
                  display: "flex",
                  lineHeight: 1.25,
                }}
              >
                {subtitle}
              </div>
            )}
          </div>

          {/* footer */}
          <div
            style={{
              marginTop: "28px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              color: colors.bone,
              opacity: 0.65,
              fontFamily: "monospace",
              fontSize: "14px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            <div>segura.cat</div>
            <div>Conca de Barberà</div>
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
