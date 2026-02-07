import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getFeaturedTutors } from "@/lib/tutors";
import TutorCard from "../tutor-card";
import { Link } from "@/i18n/routing";

export async function TutorsSection() {
  const tutors = await getFeaturedTutors();

  return (
    <section className="bg-background-primary py-16">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-extrabold text-[32px] text-neutral-1000">
              Dapatkan Strategi Langsung dari{" "}
              <span className="text-primary-500">Tangan Pertama</span>
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
              Para tutor siap mendampingimu untuk meraih juara di setiap kompetisi.
            </p>
          </div>

          {/* Featured Tutors Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>

          {/* CTA Button */}
          <Link href="/tutors">
            <Button size="lg">
              <span className="text-sm">Lihat Semua Tutor Unggul Kami</span>
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
