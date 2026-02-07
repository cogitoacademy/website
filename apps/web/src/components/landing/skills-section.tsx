import { cn } from "@/lib/utils";
import { Container } from "../ui/container";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

export function SkillsSection() {
  const skills = [
    {
      title: "Model United Nations",
      description: "Ahli negosiasi dan diplomasi global.",
      color: "tertiary-blue-400",
    },
    {
      title: "Olimpiade",
      description: "Juara sains dan matematika dunia.",
      color: "tertiary-red-600",
    },
    {
      title: "World Scholar's Cup",
      description: "Eksplorasi ilmu di panggung dunia.",
      color: "tertiary-yellow-600",
    },
    {
      title: "KTI dan Esai",
      description: "Susun riset ilmiah standar dunia.",
      color: "primary-500",
    },
    {
      title: "Debat",
      description: "Latih logika dan argumen kritis.",
      color: "secondary-500",
    },
    {
      title: "Business Plan",
      description: "Rancang inovasi bisnis masa depan.",
      color: "tertiary-green-600",
    },
    {
      title: "Pidato",
      description: "Bicara publik di berbagai tingkat.",
      color: "tertiary-pink-300",
    },
  ];

  return (
    <section className="bg-primary-100 py-20">
      <Container className="rounded-2xl max-w-7xl border pt-9 pb-20 bg-tertiary-pink-500 relative overflow-hidden">
        <Image
          src="/images/landing/fields-background.webp"
          alt="Skills Section Image"
          width={1400}
          height={422}
          className="absolute inset-0 z-3 w-full bottom-0"
        />

        <div className="absolute inset-0 z-0 w-full bottom-30 bg-tertiary-pink-300 [clip-path:polygon(0_0,100%_0,100%_65%,50%_100%,0%_65%)]" />

        <div className="absolute inset-0 z-0 w-full bottom-50 bg-background-cream [clip-path:polygon(0_0,100%_0,100%_60%,50%_100%,0%_60%)]" />

        <div className="flex items-center justify-center flex-col">
          <p>Jenis Perlombaan</p>
          <h2 className="text-3xl font-bold text-center z-1 relative">
            Fokus <span className="text-primary-500">Pembelajaran</span>
          </h2>
        </div>
        <div className="flex w-full flex-wrap items-center justify-center gap-6 z-3 relative">
          {skills.map((skill, index) => (
            <FieldCard
              key={index}
              title={skill.title}
              description={skill.description}
              color={skill.color}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function FieldCard({
  title,
  description,
  color,
}: {
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div
      className={cn("h-fit max-h-25 w-88 rounded-xl pt-5", {
        "bg-tertiary-blue-400": color === "tertiary-blue-400",
        "bg-tertiary-red-600": color === "tertiary-red-600",
        "bg-tertiary-yellow-600": color === "tertiary-yellow-600",
        "bg-primary-500": color === "primary-500",
        "bg-secondary-500": color === "secondary-500",
        "bg-tertiary-green-600": color === "tertiary-green-600",
        "bg-tertiary-pink-300": color === "tertiary-pink-300",
      })}
    >
      <div className="rounded-xl bg-neutral-100 p-5 shadow-inset-top flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm">{description}</p>
        </div>
        <Link href={`#`}>
          <Button variant="gray" size="icon-lg">
            <ArrowRightIcon weight="bold" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
