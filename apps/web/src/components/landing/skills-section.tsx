import { ArrowRightIcon, MedalIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Container } from "../ui/container";

type Skill = {
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
  color: string;
};

export async function SkillsSection() {
  const locale = await getLocale();
  const isId = locale === "id";

  const skills: Skill[] = [
    {
      titleId: "Model United Nations",
      titleEn: "Model United Nations",
      descriptionId: "Ahli negosiasi dan diplomasi global.",
      descriptionEn: "Expert in negotiation and global diplomacy.",
      color: "tertiary-blue-500",
    },
    {
      titleId: "Pidato",
      titleEn: "Public Speaking",
      descriptionId: "Bicara publik di berbagai tingkat.",
      descriptionEn: "Public speaking at various levels.",
      color: "tertiary-pink-300",
    },
    {
      titleId: "Olimpiade",
      titleEn: "Olympiad",
      descriptionId: "Juara sains dan matematika dunia.",
      descriptionEn: "World science and math champions.",
      color: "tertiary-red-600",
    },
    {
      titleId: "World Scholar's Cup",
      titleEn: "World Scholar's Cup",
      descriptionId: "Eksplorasi ilmu di panggung dunia.",
      descriptionEn: "Explore knowledge on the world stage.",
      color: "tertiary-yellow-600",
    },
    {
      titleId: "KTI dan Esai",
      titleEn: "Scientific Writing & Essays",
      descriptionId: "Susun riset ilmiah standar dunia.",
      descriptionEn: "Compose world-standard scientific research.",
      color: "primary-500",
    },
    {
      titleId: "Debat",
      titleEn: "Debate",
      descriptionId: "Latih logika dan argumen kritis.",
      descriptionEn: "Train logic and critical arguments.",
      color: "secondary-500",
    },
    {
      titleId: "Business Plan",
      titleEn: "Business Plan",
      descriptionId: "Rancang inovasi bisnis masa depan.",
      descriptionEn: "Design future business innovations.",
      color: "tertiary-green-600",
    },
  ];

  return (
    <section className="bg-primary-100 px-4 py-20">
      <Container className="relative max-w-[calc(80rem-2rem)] overflow-hidden rounded-2xl border bg-tertiary-pink-500 pt-9 pb-20">
        <Image
          src="/images/landing/fields-background.webp"
          alt="Skills Section Image"
          width={1400}
          height={422}
          className="absolute inset-0 bottom-0 z-3 mt-auto w-full"
        />

        <div className="absolute top-20 left-0 w-full aspect-[500/520] lg:aspect-16/5">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,0 1000,0 1000,80 500,120 0,80" className="fill-tertiary-pink-300" />
          </svg>
        </div>

        <div className="absolute top-0 left-0 w-full aspect-[500/520] lg:aspect-16/5">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="w-full h-full">
            <polygon points="0,0 1000,0 1000,80 500,120 0,80" className="fill-neutral-100" />
          </svg>
        </div>

        <div className="relative z-3 flex flex-col items-center justify-center">
          <Badge variant={"headline-cream"}>
            <MedalIcon className="size-5" />{" "}
            <span>{isId ? "Jenis Perlombaan" : "Types of Competitions"}</span>
          </Badge>
          <h2 className="relative z-1 text-center font-bold text-3xl">
            {isId ? (
              <>
                Fokus <span className="text-primary-500">Pembelajaran</span>
              </>
            ) : (
              <>
                Learning <span className="text-primary-500">Focus</span>
              </>
            )}
          </h2>
        </div>
        <div className="relative z-3 flex w-full flex-wrap items-center justify-center gap-6">
          {skills.map((skill, index) => (
            <FieldCard
              key={index}
              title={isId ? skill.titleId : skill.titleEn}
              description={isId ? skill.descriptionId : skill.descriptionEn}
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
