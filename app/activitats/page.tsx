import { Container } from "@/components/ui/container";
import { ActivitatsSection } from "@/components/sections/activitats";
import { getActivitats } from "@/lib/content";

export default async function ActivitatsPage() {
  const activitats = await getActivitats();

  return (
    <div className="pt-32">
      <Container size="xl" className="pt-8" />
      <ActivitatsSection activitats={activitats} />
    </div>
  );
}
