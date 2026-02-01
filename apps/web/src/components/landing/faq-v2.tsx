"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const faqData = [
  {
    id: 1,
    question: "Apa saja keunggulan Cogito Academy?",
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

  return (
    <section className="w-full max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 h-[300px]">
      {faqData.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={item.id}
            // UPDATE 1: Hapus prop 'layout'
            // UPDATE 2: Animate flex value-nya langsung
            animate={{
              flex: isActive ? 3 : 1,
              backgroundColor: isActive ? "#E89AB8" : "#FFFBF7",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut", // Pakai easeInOut biar lebih natural daripada spring utk width
            }}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative rounded-3xl cursor-pointer overflow-hidden border border-gray-100 shadow-sm",
              // Hapus transition-colors manual CSS, biarkan Motion yg handle via animate prop di atas
              !isActive && "hover:bg-white",
            )}
          >
            {/* Content Wrapper */}
            <div className="h-full w-full relative">
              {/* ACTIVE STATE CONTENT */}
              {/* Gunakan absolute positioning agar transisinya cross-fade, bukan shifting */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 10 : 0,
                }}
                transition={{ duration: 0.3, delay: isActive ? 0.2 : 0 }} // Delay dikit biar smooth pas kebuka
                className="absolute inset-0 flex flex-col"
                style={{ pointerEvents: isActive ? "auto" : "none" }}
              >
                {/* UPDATE 3: THE ANTI-SQUASH TRICK
                   Wrapper ini punya lebar FIX (min-w).
                   Jadi saat card menyusut, isinya TIDAK ikut menyusut/gepeng.
                   Isinya cuma 'terpotong' oleh overflow parent.
                */}
                <div className="w-full flex-shrink-0 flex flex-col h-full">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 p-4 pb-0">
                    {item.question}
                  </h3>

                  <div className="flex-1 bg-white rounded-2xl p-6 overflow-hidden shadow-sm">
                    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
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
                  zIndex: isActive ? 0 : 10,
                }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 p-6 flex flex-col justify-between bg-white"
              >
                <div className="self-end">
                  {/* Icon diputar dikit biar interaktif */}
                  <ArrowUpRight className="w-6 h-6 text-gray-800" />
                </div>
                <div>
                  {/* Line clamp biar teks ga overflow pas sempit banget */}
                  <p className="text-gray-600 font-medium leading-snug line-clamp-3">
                    {item.question}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
