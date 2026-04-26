import { NegocisSection } from "@/components/sections/negocis";
import { getNegocis } from "@/lib/content";

export default async function NegocisPage() {
  const negocis = await getNegocis();

  return (
    <div className="pt-32">
      <NegocisSection negocis={negocis} />
    </div>
  );
}
