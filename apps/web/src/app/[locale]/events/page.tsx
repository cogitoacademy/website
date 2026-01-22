import { Container } from "@/components/ui/container";
import Component from "./calendar";
import NavbarResolver from "@/components/navbar-resolver";

export default function CompetitionCalendarPage() {
  return (
    <>
      <NavbarResolver />
      <Container>
        <h1>Competition Calendar</h1>
        <Component />
      </Container>
    </>
  );
}
