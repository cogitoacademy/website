import { setRequestLocale } from "next-intl/server";
import { checkAccess } from "@/actions/auth";
import NavbarResolver from "@/components/navbar-resolver";
import { PasswordGate } from "@/components/student-resources/password-gate";
import { ResourceList } from "@/components/student-resources/resource-list";
import { STUDENT_RESOURCES_QUERY } from "@/queries/studentResources";
import { client } from "@/sanity/client";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function StudentResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const hasAccess = await checkAccess();

  if (!hasAccess) {
    return <PasswordGate />;
  }

  const resources = await client.fetch(STUDENT_RESOURCES_QUERY);

  return (
    <main className="bg-background-cream">
      <NavbarResolver />
      <div className="relative z-3 mx-auto min-h-screen max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-neutral-1000 sm:text-3xl md:text-4xl lg:text-5xl min-[450px]:max-w-[420px] sm:max-w-[500px] md:max-w-2xl lg:max-w-3xl">
            Student Resources
          </h1>
          <p className="mt-2">
            Access exclusive materials including Position Papers and Resolution Banks.
          </p>
        </div>

        <ResourceList resources={resources} />
      </div>
    </main>
  );
}
