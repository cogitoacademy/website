import { ArrowRightIcon, ListMagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Container } from "../ui/container";

export function SkillsSection() {
  const skills = [
    {
      title: "Model United Nations",
      description: "Ahli negosiasi dan diplomasi global.",
      color: "tertiary-blue-500",
    },
    {
      title: "Pidato",
      description: "Bicara publik di berbagai tingkat.",
      color: "tertiary-pink-300",
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
  ];

  return (
    <section className="bg-primary-100 px-4 py-20">
      <Container className="relative max-w-7xl overflow-hidden rounded-2xl border bg-tertiary-pink-500 pt-9 pb-20">
        <Image
          src="/images/landing/fields-background.webp"
          alt="Skills Section Image"
          width={1400}
          height={422}
          className="absolute inset-0 bottom-0 z-3 mt-auto w-full"
        />

        <div className="absolute inset-0 bottom-30 z-0 w-full bg-tertiary-pink-300 [clip-path:polygon(0_0,100%_0,100%_65%,50%_100%,0%_65%)]" />

        <div className="absolute inset-0 bottom-50 z-0 w-full bg-background-cream [clip-path:polygon(0_0,100%_0,100%_60%,50%_100%,0%_60%)]" />

        <div className="relative z-3 flex flex-col items-center justify-center">
          <Badge variant={"headline-cream"}>
            <ListMagnifyingGlassIcon className="size-5" /> <span>Jenis Perlombaan</span>
          </Badge>
          <h2 className="relative z-1 text-center font-bold text-3xl">
            Fokus <span className="text-primary-500">Pembelajaran</span>
          </h2>
        </div>
        <div className="relative z-3 flex w-full flex-wrap items-center justify-center gap-6">
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
      className={cn("h-fit max-h-25 w-88 rounded-xl pt-4", {
        "bg-tertiary-blue-500": color === "tertiary-blue-500",
        "bg-tertiary-red-600": color === "tertiary-red-600",

        "bg-tertiary-yellow-600": color === "tertiary-yellow-600",
        "bg-primary-500": color === "primary-500",
        "bg-secondary-500": color === "secondary-500",
        "bg-tertiary-green-600": color === "tertiary-green-600",
        "bg-tertiary-pink-300": color === "tertiary-pink-300",
      })}
    >
      <div className="flex items-center justify-between rounded-xl bg-neutral-100 p-5 shadow-inset-top">
        <div>
          <h4 className="font-semibold text-lg leading-none">{title}</h4>
          <p className="text-sm">{description}</p>
        </div>
        <Link href={"#"}>
          <Button variant="gray" size="icon-lg">
            <ArrowRightIcon weight="bold" className="text-neutral-1000" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
