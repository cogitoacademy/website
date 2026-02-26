import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { checkAccess } from "@/actions/auth";
import NavbarResolver from "@/components/navbar-resolver";
import { PasswordGate } from "@/components/student-resources/password-gate";
import { ResourceList } from "@/components/student-resources/resource-list";
import { STUDENT_RESOURCES_QUERY } from "@/queries/studentResources";
import { client } from "@/sanity/client";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isId = locale === "id";

  const title = isId ? "Sumber Belajar" : "Student Resources";
  const description = isId
    ? "Akses materi eksklusif termasuk Position Paper, Bank Resolusi, dan Panduan Belajar untuk persiapan kompetisi Anda."
    : "Access exclusive materials including Position Papers, Resolution Banks, and Study Guides for your competition preparation.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function StudentResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("studentResources");
  const hasAccess = await checkAccess();

  if (!hasAccess) {
    return (
      <main className="bg-background-cream">
        <PasswordGate />
      </main>
    );
  }

  let resources;
  try {
    resources = await client.fetch(STUDENT_RESOURCES_QUERY);
  } catch {
    resources = [];
  }

  return (
    <main className="bg-background-cream">
      <NavbarResolver />
      <div className="relative z-3 mx-auto min-h-screen max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-neutral-1000 sm:max-w-[500px] sm:text-3xl md:max-w-2xl md:text-4xl lg:max-w-3xl lg:text-5xl min-[450px]:max-w-[420px]">
            {t("title")}
          </h1>
          <p className="mt-2">{t("subtitle")}</p>
        </div>

        <ResourceList resources={resources} />
      </div>
    </main>
  );
}
