import { Award, BookOpen, Briefcase, Check, Globe } from "lucide-react";
import { landingAssets } from "./assets";

export function MethodsSection() {
  return (
    <section className="outline outline-red-500 max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Di Balik Setiap Medali,
          <br />
          <span>Inilah Metode Kami</span>
        </h2>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <MethodCard
            icon={<Award className="w-16 h-16" />}
            title="Award"
            description="Our award-winning approach ensures excellence in every project."
          />
          <MethodCard
            icon={<BookOpen className="w-16 h-16" />}
            title="Book Open"
            description="Our book open approach ensures excellence in every project."
          />
          <MethodCard
            icon={<Briefcase className="w-16 h-16" />}
            title="Briefcase"
            description="Our briefcase approach ensures excellence in every project."
          />
          <MethodCard
            icon={<Check className="w-16 h-16" />}
            title="Check"
            description="Our check approach ensures excellence in every project."
          />
        </div>
      </div>
    </section>
  );
}

function MethodCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center aspect-312/251 outline">
      {icon}
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}
