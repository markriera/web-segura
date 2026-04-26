import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/admin/auth";
import { saveUploadedImage } from "@/lib/admin/upload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") ?? "estacions");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "no-file" }, { status: 400 });
    }

    const url = await saveUploadedImage(file, folder);
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "upload-failed";
    console.error("[admin/upload] error:", error);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
