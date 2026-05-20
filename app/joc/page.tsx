import { GuineuRunner } from "./guineu-runner";

export const metadata = {
  title: "La Guineu de Segura · Joc",
  description: "Salta pedres, esquiva molins i recull truites per Segura.",
};

export default function JocPage() {
  return <GuineuRunner />;
}
