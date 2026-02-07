import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "../ui/badge";

export function MethodsSection() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Badge variant={"headline-primary"}>
          <MagnifyingGlassIcon /> <span>Jenis Perlombaan</span>
        </Badge>
        <h2 className="font-bold mb-4 text-center text-xl leading-tight">
          Di Balik Setiap Medali,
          <br />
          <span className="text-3xl">
            Inilah{" "}
            <span className="font-bold text-primary-500">Metode Kami</span>
          </span>
        </h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
          <TutorJuaraDuniaCard />
          <TutorJuaraDuniaCard />
          <TutorJuaraDuniaCard />
          <TutorJuaraDuniaCard />
        </div>
      </div>
    </section>
  );
}

function TutorJuaraDuniaCard() {
  return (
    <div className="bg-tertiary-red-200 aspect-312/251 rounded-2xl py-6 px-4 text-center">
      <p className="font-semibold">Tutor Juara Dunia</p>
      <p className="text-sm">
        Strategi rahasia dari mereka yang sudah berdiri di podium dunia.
      </p>
    </div>
  );
}
