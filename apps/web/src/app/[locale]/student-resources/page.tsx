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
		<>
			<NavbarResolver />
			<div className="relative z-3 mx-auto min-h-screen max-w-7xl px-4 py-12">
				<div className="mb-8">
					<h1 className="font-bold text-3xl tracking-tight">
						Student Resources
					</h1>
					<p className="mt-2 text-muted-foreground">
						Access exclusive materials including Position Papers and Resolution
						Banks.
					</p>
				</div>

				<ResourceList resources={resources} />
			</div>
		</>
	);
}
