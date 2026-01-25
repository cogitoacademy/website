"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "../ui/container";

export function FaqSection() {
  const faq = [
    {
      id: "faq-1",
      question: "Apa itu Cogito Academy? 🤔",
      answer: (
        <div className="space-y-3">
          <p>
            Lebih dari lembaga bimbingan belajar, Cogito Academy adalah sebuah{" "}
            <strong>talent incubator</strong> yang memiliki misi untuk membentuk
            cendekiawan-juara kelas dunia. Didirikan berdasarkan prinsip sederhana
            bahwa untuk menjadi yang terbaik, seseorang harus belajar langsung dari
            yang terbaik. Cogito Academy bertujuan untuk secara sistematis mengubah
            potensi siswa menjadi prestasi yang terukur melalui metode pelatihan
            yang telah teruji di panggung global.
          </p>
        </div>
      ),
    },
    {
      id: "faq-2",
      question: "Apa yang membedakan Cogito Academy dari bimbingan belajar lainnya? 🧑‍🏫",
      answer: (
        <div className="space-y-3">
          <p>
            Keunggulan Cogito Academy dibangun di atas tiga pilar utama:
          </p>
          <ul className="list-disc list-outside space-y-2 ml-4">
            <li>
              <strong>Tutor Praktisi dan Juara</strong>
              <br />
              Tutor kami bukan sekadar pengajar, melainkan para juara kompetisi dan
              praktisi dengan pengalaman nyata yang beragam, mulai dari juara olimpiade
              tingkat nasional hingga praktisi hukum yang pernah bekerja di Perserikatan
              Bangsa-Bangsa. Mereka melatih siswa dengan pemahaman lapangan yang mendalam,
              lebih dari sekadar teori.
            </li>
            <li>
              <strong>Kurikulum Holistik dan Battle-Tested</strong>
              <br />
              Kurikulum kami dirancang secara khusus oleh para tutor juara dan spesialis
              kurikulum untuk membentuk kemampuan serta mentalitas pemenang pada siswa.
              Metodologi kami mencakup persiapan sebelum, saat, dan sesudah sesi pembelajaran
              untuk memastikan penguasaan materi yang maksimal.
            </li>
            <li>
              <strong>Pendekatan Personal dan Progres Terukur</strong>
              <br />
              Jumlah siswa per kelas dibatasi untuk memastikan setiap individu mendapatkan
              perhatian yang cukup dari tutor. Siswa secara rutin akan mendapat feedback
              mendetail, dan orang tua akan menerima laporan progres dari Cogito Academy
              untuk memantau perkembangan anak.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "faq-3",
      question: "Program kelas apa saja yang ditawarkan? 📔",
      answer: (
        <div className="space-y-3">
          <p>
            Cogito Academy menawarkan tiga jenis program kelas yang dapat disesuaikan
            dengan kebutuhan:
          </p>
          <ul className="list-disc list-outside space-y-2 ml-4">
            <li>
              <strong>Kelas Reguler</strong>
              <br />
              Kursus terstruktur dengan kurikulum holistik dari tahap pengenalan hingga
              penajaman kemampuan. Program yang ditawarkan antara lain World Scholar&apos;s
              Cup (36 pertemuan), Model United Nations (24 pertemuan), dan Debat (18 pertemuan).
            </li>
            <li>
              <strong>Kelas Intensif</strong>
              <br />
              Program persiapan on-demand yang dirancang khusus untuk satu ajang perlombaan
              tertentu. Topik yang tersedia mencakup Pidato, Karya Tulis Ilmiah & Esai,
              Business Plan, Olimpiade, dan masih banyak lagi.
            </li>
            <li>
              <strong>Kelas Ekstrakurikuler</strong>
              <br />
              Program pelatihan rutin yang dirancang khusus berdasarkan kebutuhan di sebuah
              sekolah.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "faq-4",
      question: "Bagaimana siklus pembelajaran di Cogito Academy? 🔄",
      answer: (
        <div className="space-y-3">
          <p>
            Siklus pembelajaran kami dirancang untuk penguasaan materi secara maksimal
            dan dibagi ke dalam beberapa tahap:
          </p>
          <ul className="list-disc list-outside space-y-2 ml-4">
            <li>
              <strong>Tahap Fondasi (Pra-Sesi)</strong>
              <br />
              Siswa menerima materi seperti studi kasus atau artikel jurnal untuk dianalisis
              terlebih dahulu. Hal ini memastikan sesi tatap muka dapat berfokus pada diskusi
              strategis, bukan hanya teori dasar.
            </li>
            <li>
              <strong>Tahap Akselerasi (Sesi Interaktif)</strong>
              <br />
              Sesi di kelas berfokus pada aplikasi praktis melalui simulasi, role-playing,
              dan pressure-testing. Dalam tahap ini, tutor berperan sebagai sparring partner
              bagi siswa.
            </li>
            <li>
              <strong>Tahap Penguatan (Pasca-Sesi)</strong>
              <br />
              Setelah sesi selesai, siswa mengerjakan tugas penerapan seperti menulis position
              paper atau draf resolusi. Latihan ini bertujuan untuk menginternalisasi kemampuan
              secara kontekstual.
            </li>
            <li>
              <strong>Tahap Evaluasi (Umpan Balik)</strong>
              <br />
              <em>Feedback</em> yang mendetail diberikan untuk setiap tugas yang dikerjakan
              siswa. Selain itu, sesi konsultasi rutin dengan orang tua juga dilaksanakan
              untuk memantau progres siswa.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "faq-5",
      question: "Berapa harga dan bagaimana skema biaya kursus? 💵",
      answer: (
        <div className="space-y-3">
          <p>
            Dikarenakan skema kelas Cogito Academy yang dipersonalisasi berdasarkan kebutuhan
            setiap siswa atau kelompok, harga paket kelas bervariasi dengan mempertimbangkan
            jenis perlombaan, jumlah kelas yang tercakup pada paket, dan jumlah murid yang
            ikut serta dalam satu kelas.
          </p>
          <p>
            Kami menerapkan sistem pembayaran yang cukup fleksibel di mana orang tua dan/atau
            sekolah dapat memilih untuk melakukan pembayaran secara lunas di depan atau berkala
            sebanyak maksimal tiga kali tanpa tambahan pungutan biaya.
          </p>
        </div>
      ),
    },
  ];

  const midPoint = Math.ceil(faq.length / 2);

  return (
    <Container className="bg-background-cream max-w-7xl py-15">
      {/* Header */}
      <div className="space-y-2 text-center">
        <h2 className="font-extrabold text-[32px] text-neutral-1000">
          Pertanyaan yang <span className="text-primary-500">Sering Ditanyakan</span>
        </h2>
        <p className="mx-auto max-w-3xl font-medium text-lg text-neutral-1000">
          Temukan jawaban atas pertanyaan umum tentang program dan layanan kami.
        </p>
      </div>

      <Accordion>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
          <div className="space-y-4 xl:space-y-6">
            {faq.slice(0, midPoint).map((item) => (
              <AccordionItem key={item.id} value={item.id.toString()}>
                <AccordionTrigger className="group">
                  <span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </div>
          <div className="space-y-4 xl:space-y-6">
            {faq.slice(midPoint).map((item) => (
              <AccordionItem key={item.id} value={item.id.toString()}>
                <AccordionTrigger className="group">
                  <span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </div>
        </div>
      </Accordion>
    </Container>
  );
}
