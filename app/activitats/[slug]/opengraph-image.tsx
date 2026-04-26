import { ImageResponse } from "next/og";
import { getActivitat } from "@/lib/content";

export const runtime = "nodejs";
export const alt = "Activitat a Segura";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const activitat = await getActivitat(params.slug);

  const nom = activitat?.nom ?? "Activitat";
  const data = activitat?.data ?? "";
  const ubicacio = activitat?.ubicacio ?? "Segura";
  const hora = activitat?.hora ?? "";

  const colors = {
    bone: "#f4efe6",
    paper: "#ebe4d6",
    ink: "#1a1814",
    moss: "#3d4a2a",
    rust: "#a0522d",
    stone: "#6b6660",
  };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: colors.bone,
          padding: "80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 80% 20%, rgba(160,82,45,0.12), transparent 60%), radial-gradient(circle at 20% 90%, rgba(61,74,42,0.14), transparent 55%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "20px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: colors.stone,
              fontFamily: "monospace",
            }}
          >
            <span
              style={{
                display: "block",
                width: "48px",
                height: "1px",
                background: colors.stone,
              }}
            />
            Segura · Conca de Barberà
          </div>
          <div
            style={{
              fontSize: "20px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: colors.rust,
              fontFamily: "monospace",
            }}
          >
            Activitat
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "32px",
              color: colors.rust,
              fontFamily: "monospace",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            {data}
          </div>
          <div
            style={{
              fontSize: nom.length > 20 ? "96px" : "120px",
              color: colors.ink,
              lineHeight: 1,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              maxWidth: "90%",
              display: "flex",
            }}
          >
            {nom}
          </div>
          {(hora || ubicacio) && (
            <div
              style={{
                marginTop: "32px",
                fontSize: "28px",
                color: colors.moss,
                fontStyle: "italic",
                display: "flex",
                gap: "24px",
              }}
            >
              {hora && <span>· {hora}h</span>}
              {ubicacio && <span>· {ubicacio}</span>}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: colors.stone,
              fontFamily: "monospace",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            segura.cat
          </div>
          <div
            style={{
              fontSize: "20px",
              color: colors.stone,
              fontFamily: "monospace",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            41°32&apos;39&quot;N · 1°15&apos;54&quot;E
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
