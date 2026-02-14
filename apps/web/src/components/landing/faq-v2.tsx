"use client";

import { SealQuestionIcon } from "@phosphor-icons/react/dist/ssr";
import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Badge } from "../ui/badge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

const faqData = [
  {
    id: 1,
    question:
      "Apa saja keunggulan Cogito Academy? Apa saja keunggulan Cogito Academy? Apa saja keunggulan Cogito Academy? Apa saja keunggulan Cogito Academy? Apa saja keunggulan Cogito Academy? Apa saja keunggulan Cogito Academy?",
    answer:
      "Keunggulan Cogito Academy dibangun di atas tiga pilar utama: \n\n• Tutor Praktisi dan Juara: Tutor kami bukan sekadar pengajar, melainkan para juara kompetisi dan praktisi dengan pengalaman nyata yang beragam, mulai dari juara olimpiade tingkat nasional hingga praktisi hukum yang pernah bekerja di Perserikatan Bangsa-Bangsa. Keunggulan Cogito Academy dibangun di atas tiga pilar utama: \n\n• Tutor Praktisi dan Juara: Tutor kami bukan sekadar pengajar, melainkan para juara kompetisi dan praktisi dengan pengalaman nyata yang beragam, mulai dari juara olimpiade tingkat nasional hingga praktisi hukum yang pernah bekerja di Perserikatan Bangsa-Bangsa.",
  },
  {
    id: 2,
    question: "Bagaimana cara mendaftar kelas?",
    answer:
      "Pendaftaran bisa dilakukan melalui website kami dengan klik tombol daftar di pojok kanan atas, atau hubungi admin kami via WhatsApp untuk panduan lebih lanjut.",
  },
  {
    id: 3,
    question: "Apakah ada sesi mentoring 1-on-1?",
    answer:
      "Tentu saja! Kami menyediakan sesi privat intensif agar materi bisa disesuaikan dengan kebutuhan spesifik dan kecepatan belajar kamu.",
  },
  {
    id: 4,
    question: "Berapa biaya langganannya?",
    answer:
      "Biaya bervariasi tergantung paket yang diambil. Kami sering mengadakan promo early bird, jadi pastikan pantau sosial media kami ya!",
  },
];

export default function FaqSectionV2() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();

  return (
    <section className="bg-background-primary">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-y-7.5 px-4 py-20">
        <div className="flex flex-col items-center justify-center space-y-2 *:text-center">
          <Badge variant={"headline-cream"}>
            <SealQuestionIcon className="size-5" /> <span>FAQ</span>
          </Badge>
          <h3 className="font-bold text-3xl leading-none">
            Segala yang Perlu Kamu Tahu untuk{" "}
            <span className="text-primary-500">Memulai</span>
          </h3>
          <p>
            Kami juga siap membantu mendiskusikan rencana prestasimu secara
            mendalam.
          </p>
        </div>

        <div className="flex flex-col gap-4 *:select-none md:h-[300px] md:flex-row">
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={item.id}
                animate={
                  isMobile
                    ? {
                        height: isActive ? 300 : "auto",
                        minHeight: isActive ? 300 : 100,
                        backgroundColor: isActive ? "#E89AB8" : "#FFFBF7",
                      }
                    : {
                        flex: isActive ? 3 : 1,
                        backgroundColor: isActive ? "#E89AB8" : "#FFFBF7",
                      }
                }
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "relative cursor-pointer overflow-hidden rounded-3xl border border-gray-100 shadow-sm",
                  !isActive && "hover:bg-white",
                )}
              >
                {/* Content Wrapper */}
                <div className="relative h-full w-full">
                  {/* 
                    Invisible spacer — always relative & in-flow so it defines 
                    the card's intrinsic height for the inactive state.
                    Mirrors the same padding/layout as inactive content.
                  */}
                  <div
                    className="invisible flex flex-row items-center justify-between p-6 md:flex-col md:justify-between"
                    aria-hidden="true"
                  >
                    <div>
                      <p className="line-clamp-10 font-medium leading-snug">
                        {item.question}
                      </p>
                    </div>
                    <div className="ml-6 md:self-end">
                      <ArrowUpRight className="h-6 w-6" />
                    </div>
                  </div>

                  {/* ACTIVE STATE CONTENT */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }}
                    className="absolute inset-0 flex flex-col"
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <div className="flex h-full w-full flex-shrink-0 flex-col">
                      <h3 className="mb-3 p-4 pb-0 font-bold text-base text-gray-900">
                        {item.question}
                      </h3>

                      <div className="flex-1 overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
                        <div className="custom-scrollbar h-full overflow-y-auto pr-2">
                          <p className="whitespace-pre-line text-gray-600 text-sm leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* INACTIVE STATE CONTENT */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex flex-row items-center justify-between bg-white p-6 md:flex-col md:justify-between"
                    style={{ pointerEvents: isActive ? "none" : "auto" }}
                  >
                    <div>
                      <p className="line-clamp-10 font-medium text-gray-600 leading-snug">
                        {item.question}
                      </p>
                    </div>
                    <div className="ml-6 md:self-end">
                      <ArrowUpRight className="h-6 w-6 text-gray-800" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
