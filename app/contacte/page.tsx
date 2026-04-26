import { ContacteSection } from "@/components/sections/contacte";
import { getPoble } from "@/lib/content";

export default async function ContactePage() {
  const poble = await getPoble();

  return (
    <div className="pt-32">
      <ContacteSection poble={poble} />
    </div>
  );
}
