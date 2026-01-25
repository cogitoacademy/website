import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "../ui/container";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { Button } from "../ui/button";

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
    <Container className="max-w-7xl border p-20">
      <h2 className="text-3xl font-bold text-center">
        Fokus <span className="text-primary-500">Pembelajaran</span>
      </h2>
      <div className="flex w-full flex-wrap items-center justify-center gap-6">
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
