import { Container } from "@/components/ui/container";
import Component from "./calendar";

export default function CompetitionCalendarPage() {
  return (
    <Container className="py-20">
      <h1>Competition Calendar</h1>
      <Component />
    </Container>
  );
}
