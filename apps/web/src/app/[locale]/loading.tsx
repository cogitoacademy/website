import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
        <p className="text-neutral-600 text-sm">Memuat... / Loading...</p>
      </div>
    </Container>
  );
}
