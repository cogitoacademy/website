import { Award, BookOpen, Briefcase, Check, Globe } from "lucide-react";
import { landingAssets } from "./assets";

export function MethodsSection() {
  return (
    <section className="max-w-7xl mx-auto py-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-bold mb-4 text-center text-xl">
          Di Balik Setiap Medali,
          <br />
          <span className="text-3xl">Inilah Metode Kami</span>
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
