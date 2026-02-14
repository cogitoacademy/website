import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { setRequestLocale } from "next-intl/server";
import NavbarResolver from "@/components/navbar-resolver";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getCoreCategoryBadgeColor } from "@/lib/colors/brandColors";
import { cn } from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Container className="relative z-1 min-h-screen">
      <NavbarResolver />
      <h1>Playground</h1>
      <div>
        <h2>Badge</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Badge</Badge>
          <Badge variant="secondary">Badge</Badge>
          <Badge variant="destructive">Badge</Badge>
          <Badge variant="outline">Badge</Badge>
          <Badge variant="ghost">Badge</Badge>
          <Badge variant="link">Badge</Badge>
          {/*<Badge variant="mun">Badge</Badge>*/}
          <Badge
            className={cn(badgeVariants({ variant: "tutor" }), getCoreCategoryBadgeColor("wsc"))}
          >
            WSC
          </Badge>
          <Badge
            className={cn(badgeVariants({ variant: "tutor" }), getCoreCategoryBadgeColor("kti"))}
          >
            KTI/Esai
          </Badge>
          <Badge
            className={cn(badgeVariants({ variant: "tutor" }), getCoreCategoryBadgeColor("debat"))}
          >
            Debat
          </Badge>
          <Badge
            className={cn(
              badgeVariants({ variant: "tutor" }),
              getCoreCategoryBadgeColor("business"),
            )}
          >
            Bisnis
          </Badge>
          <Badge
            className={cn(badgeVariants({ variant: "tutor" }), getCoreCategoryBadgeColor("pidato"))}
          >
            Pidato
          </Badge>
        </div>
      </div>

      <div>
        <h2>Button Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="default">Default</Button>
          <Button variant="subtle">Subtle</Button>
          <Button variant="gray">Gray</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h2>Button Sizes</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="xs">XS</Button>
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div>
        <h2>Icon Button Sizes</h2>
        <div className="flex flex-wrap gap-2">
          <Button size="icon-xs" variant="default">
            <ArrowRightIcon />
          </Button>
          <Button size="icon-sm" variant="default">
            <ArrowRightIcon />
          </Button>
          <Button size="icon" variant="default">
            <ArrowRightIcon />
          </Button>
          <Button size="icon-lg" variant="default">
            <ArrowRightIcon />
          </Button>
        </div>
      </div>

      {/*<div>
				<h2>All Variant & Size Combinations</h2>
				<div className="space-y-4">
					{[
						"default",
						"subtle",
						"gray",
						"outline",
						"secondary",
						"ghost",
						"destructive",
						"link",
						"cream",
					].map((variant) => (
						<div key={variant} className="flex flex-wrap gap-2">
							<span className="w-20 font-medium text-sm capitalize">
								{variant}:
							</span>
							<Button size="xs" variant={variant as any}>
								XS
							</Button>
							<Button size="sm" variant={variant as any}>
								SM
							</Button>
							<Button size="default" variant={variant as any}>
								Default
							</Button>
							<Button size="lg" variant={variant as any}>
								LG
							</Button>
						</div>
					))}
				</div>
			</div>*/}
    </Container>
  );
}
