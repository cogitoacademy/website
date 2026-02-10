import { BooksIcon } from "@phosphor-icons/react/dist/ssr";
import { ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { getFeaturedTutors } from "@/lib/tutors";
import TutorCard from "../tutor-card";
import { Badge } from "../ui/badge";

export async function TutorsSection() {
  const locale = await getLocale();
  const isId = locale === "id";
  const tutors = await getFeaturedTutors();

  return (
    <section className="bg-background-primary py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          <div className="space-y-2 text-center *:text-pretty">
            <Badge variant={"headline-cream"}>
              <BooksIcon className="size-5" />{" "}
              <span>{isId ? "Tutor Cogito" : "Cogito Tutors"}</span>
            </Badge>
            <h2 className="font-bold text-3xl text-neutral-1000">
              {isId ? (
                <>
                  Dapatkan Strategi Langsung dari{" "}
                  <span className="text-primary-500">Tangan Pertama</span>
                </>
              ) : (
                <>
                  Get Direct Strategies from <span className="text-primary-500">First Hand</span>
                </>
              )}
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
              {isId
                ? "Para tutor siap mendampingimu untuk meraih juara di setiap kompetisi."
                : "Tutors are ready to accompany you to achieve champion status in every competition."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>

          <Link href="/tutors">
            <Button size="lg">
              <span className="text-sm">
                {isId ? "Lihat Semua Tutor Unggul Kami" : "View All Our Excellent Tutors"}
              </span>
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
