import NavbarResolver from "@/components/navbar-resolver";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";

export default function Page() {
  return (
    <Container>
      <NavbarResolver />
      <h1>Playground</h1>
      <Badge variant="default">Badge</Badge>
      <Badge variant="secondary">Badge</Badge>
      <Badge variant="destructive">Badge</Badge>
      <Badge variant="outline">Badge</Badge>
      <Badge variant="ghost">Badge</Badge>
      <Badge variant="link">Badge</Badge>
      <Badge variant="mun">Badge</Badge>


    </Container>
  );
}
