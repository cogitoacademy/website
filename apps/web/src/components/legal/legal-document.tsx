import type { ReactNode } from 'react';

import platformTerms from './platform-terms.json';

import NavbarResolver from '@/components/navbar-resolver';
import { Link } from '@/i18n/routing';
import { APP_URL } from '@/lib/constants';

type Locale = 'id' | 'en';
type LegalDocumentType = 'privacy' | 'terms';

type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type LegalContent = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  contactTitle: string;
  contactBody: ReactNode;
};

const LEGAL_CONTENT: Record<Locale, Record<LegalDocumentType, LegalContent>> = {
  id: {
    privacy: {
      eyebrow: 'Cogito Digital oleh Cogito Academy',
      title: 'Kebijakan Privasi',
      intro:
        'Kebijakan Privasi ini menjelaskan bagaimana Cogito Academy mengumpulkan, menggunakan, menyimpan, dan membagikan informasi ketika Anda menggunakan Cogito Digital, situs Cogito Academy, dan layanan pembelajaran terkait.',
      updated: 'Terakhir diperbarui: 11 November 2026',
      sections: [
        {
          title: '1. Siapa kami',
          paragraphs: [
            'Cogito Digital adalah platform pembelajaran dan pengelolaan sesi yang dioperasikan oleh PT Cogito Academy Indonesia (Cogito Academy). Dalam Kebijakan Privasi ini, “Cogito Academy”, “Cogito Digital”, “kami”, atau “kita” merujuk pada pengelola layanan tersebut.',
          ],
        },
        {
          title: '2. Informasi yang kami kumpulkan',
          paragraphs: [
            'Kami mengumpulkan informasi yang diperlukan untuk menyediakan dan mengamankan layanan, termasuk:',
          ],
          bullets: [
            'Informasi akun: nama, alamat email, foto profil bila tersedia, ID akun dari penyedia login, peran akun, serta status verifikasi email.',
            'Informasi pembelajaran dan profil: sekolah, tingkat kelas, mata pelajaran, minat, informasi profil tutor, ketersediaan, kredensial, dan informasi wali/orang tua yang Anda masukkan.',
            'Informasi penggunaan layanan: pemesanan sesi, jadwal, peserta, notifikasi, tiket dukungan, prestasi, dan berkas yang Anda pilih untuk unggah.',
            'Informasi transaksi: riwayat pembelian, saldo atau ledger Marks, status pembayaran, dan referensi transaksi. Detail pembayaran diproses oleh penyedia pembayaran terkait sesuai kebijakan mereka.',
            'Catatan persetujuan: kelompok usia (18 tahun ke atas atau di bawah 18 tahun), versi ketentuan dan waktu persetujuan, serta nama lengkap, hubungan, dan pernyataan persetujuan orang tua/wali untuk siswa di bawah 18 tahun.',
            'Informasi teknis: cookie sesi, alamat IP, informasi perangkat/peramban, log keamanan, dan data diagnostik yang diperlukan untuk menjaga layanan tetap aman dan berjalan.',
          ],
        },
        {
          title: '3. Google Sign-In dan data Google',
          paragraphs: [
            'Jika Anda memilih “Sign in with Google” atau “Sign up with Google”, Google membagikan kepada kami data identitas dasar yang diperlukan untuk membuat atau menghubungkan akun Cogito Digital: nama, alamat email, foto profil bila tersedia, dan pengenal akun Google.',
            'Kami menggunakan data tersebut untuk autentikasi, menampilkan identitas akun, mencegah penyalahgunaan, menjaga keamanan sesi, dan mengirim komunikasi layanan yang relevan. Kami tidak menjual data Google, tidak menggunakannya untuk iklan yang dipersonalisasi, dan tidak meminta akses ke Gmail, Google Drive, Google Contacts, atau Google Calendar dalam alur login dasar ini.',
            'Untuk kebutuhan operasional pembuatan jadwal sesi, Cogito Academy dapat menghubungkan akun Google Calendar milik operator melalui otorisasi terpisah. Otorisasi tersebut digunakan untuk membuat atau memperbarui acara sesi dan tautan Google Meet; bukan untuk membaca kalender pribadi siswa atau tutor sebagai bagian dari login Google.',
            'Penggunaan data yang diperoleh dari Google API dibatasi pada penyediaan dan pengoperasian fitur yang dijelaskan di sini, sesuai dengan Google API Services User Data Policy dan persyaratan Limited Use yang berlaku.',
          ],
        },
        {
          title: '4. Cara kami menggunakan informasi',
          paragraphs: ['Kami menggunakan informasi untuk:'],
          bullets: [
            'membuat akun, memproses login, memverifikasi email, dan menjaga keamanan layanan;',
            'menyediakan pencarian tutor, pemesanan, penjadwalan, sesi online/offline, dan komunikasi terkait layanan;',
            'mengelola Marks, pembayaran, pengembalian atau penyesuaian yang relevan, serta catatan transaksi;',
            'memberikan dukungan pelanggan, menangani laporan, mencegah penipuan, dan menegakkan ketentuan layanan;',
            'mengirim notifikasi layanan, email verifikasi, email akun, dan pembaruan penting; dan',
            'memenuhi kewajiban hukum serta melindungi hak, keamanan, dan integritas pengguna maupun Cogito Academy.',
          ],
        },
        {
          title: '5. Pembagian informasi',
          paragraphs: [
            'Kami tidak menjual informasi pribadi. Kami dapat membagikan informasi secara terbatas kepada penyedia layanan yang membantu hosting, basis data, email, penyimpanan berkas, analitik, atau pembayaran, hanya sejauh diperlukan untuk menjalankan layanan dan sesuai kewajiban kerahasiaan mereka.',
            'Dalam alur pembelajaran, peserta sesi dapat melihat informasi minimum yang diperlukan untuk mengikuti sesi. Alamat email atau detail kontak pribadi tidak dibagikan kepada peserta lain tanpa izin atau tindakan persetujuan yang sesuai di dalam layanan.',
            'Kami juga dapat membagikan informasi jika diwajibkan oleh hukum, proses hukum yang sah, atau untuk melindungi pengguna, publik, dan sistem kami dari penipuan, penyalahgunaan, atau ancaman keamanan.',
          ],
        },
        {
          title: '6. Penyimpanan, retensi, dan penghapusan',
          paragraphs: [
            'Kami menyimpan informasi selama akun dan layanan Anda diperlukan untuk beroperasi. Setelah akun ditutup, sebagian informasi dapat dipertahankan selama diperlukan untuk menyelesaikan transaksi, memenuhi kewajiban hukum, menyelesaikan sengketa, mencegah penyalahgunaan, atau menjaga catatan keamanan.',
            'Anda dapat meminta akses, koreksi, atau penghapusan informasi dengan menghubungi kami melalui alamat email di bagian “Hubungi kami”. Kami akan memverifikasi permintaan dan menjelaskan jika sebagian informasi harus tetap disimpan berdasarkan hukum atau kebutuhan operasional yang sah.',
          ],
        },
        {
          title: '7. Keamanan',
          paragraphs: [
            'Kami menerapkan pengamanan teknis dan organisatoris yang wajar, termasuk sesi yang terlindungi, pembatasan akses, validasi input, pencatatan keamanan, dan perlindungan terhadap penyalahgunaan. Tidak ada metode penyimpanan atau transmisi yang sepenuhnya aman, sehingga kami tidak dapat menjamin keamanan absolut.',
          ],
        },
        {
          title: '8. Anak dan wali',
          paragraphs: [
            'Sebagian program Cogito Academy ditujukan untuk pelajar. Untuk siswa di bawah 18 tahun, orang tua atau wali harus meninjau penggunaan layanan dan memberikan persetujuan yang diperlukan. Kami berupaya mengumpulkan hanya informasi yang relevan dengan layanan pembelajaran dan menyediakan kanal kontak untuk pertanyaan atau permintaan dari orang tua/wali.',
          ],
        },
        {
          title: '8a. Persetujuan, karya, pencapaian, dan rekaman',
          paragraphs: [
            'Persetujuan orang tua/wali pada pendaftaran merupakan pernyataan yang diberikan melalui Platform, bukan verifikasi identitas independen. Kami menggunakan catatan ini untuk mengelola akun dan mendokumentasikan persetujuan.',
            'Karya siswa digunakan untuk bimbingan dan umpan balik. Penggunaan untuk Bank Pengetahuan atau tujuan lain memerlukan persetujuan tertulis tersendiri dari siswa dan orang tua/wali apabila siswa di bawah 18 tahun.',
            'Pengiriman pada bagian Pencapaian menyertakan persetujuan publikasi nama, foto, dan hasil kompetisi yang disetujui. Anda dapat menarik persetujuan melalui email; kami akan menghentikan publikasi baru dan menurunkan publikasi pada kanal resmi sepanjang dapat dilakukan secara wajar.',
            'Kami tidak merekam sesi secara rutin. Jika sesi direkam oleh Perusahaan untuk evaluasi internal, peserta diberi tahu dan rekaman dihapus paling lambat 30 hari kalender. Anda dapat meminta akses, koreksi, penghapusan data, atau menarik persetujuan melalui email kontak kami.',
          ],
        },
        {
          title: '9. Perubahan kebijakan',
          paragraphs: [
            'Kami dapat memperbarui Kebijakan Privasi ini ketika layanan, hukum, atau praktik pengelolaan data berubah. Versi terbaru akan dipublikasikan di halaman ini dengan tanggal pembaruan yang baru. Jika perubahan berdampak material, kami akan memberikan pemberitahuan yang sesuai melalui layanan atau email.',
          ],
        },
      ],
      contactTitle: '10. Hubungi kami',
      contactBody: (
        <>
          Untuk pertanyaan tentang privasi, permintaan data, atau penggunaan Google user data,
          hubungi{' '}
          <a
            className="font-semibold text-primary-600 underline underline-offset-4"
            href="mailto:cogitoacademy.id@gmail.com"
          >
            cogitoacademy.id@gmail.com
          </a>
          . Anda juga dapat mengunjungi{' '}
          <Link
            className="font-semibold text-primary-600 underline underline-offset-4"
            href="/contact"
          >
            halaman kontak
          </Link>{' '}
          kami.
        </>
      ),
    },
    terms: {
      eyebrow: 'Cogito Digital oleh Cogito Academy',
      title: 'Ketentuan Layanan',
      intro:
        'Ketentuan Layanan ini mengatur penggunaan Cogito Digital, situs Cogito Academy, dan fitur pembelajaran, tutor, pemesanan, pembayaran, serta dukungan yang tersedia melalui layanan kami.',
      updated: 'Terakhir diperbarui: 11 November 2026',
      sections: platformTerms.id,
      contactTitle: 'Hubungi kami',
      contactBody: (
        <>
          Untuk pertanyaan tentang Ketentuan Layanan, hubungi{' '}
          <a
            className="font-semibold text-primary-600 underline underline-offset-4"
            href="mailto:cogitoacademy.id@gmail.com"
          >
            cogitoacademy.id@gmail.com
          </a>
          . Anda juga dapat mengakses aplikasi melalui{' '}
          <a className="font-semibold text-primary-600 underline underline-offset-4" href={APP_URL}>
            {APP_URL}
          </a>
          .
        </>
      ),
    },
  },
  en: {
    privacy: {
      eyebrow: 'Cogito Digital by Cogito Academy',
      title: 'Privacy Policy',
      intro:
        'This Privacy Policy explains how Cogito Academy collects, uses, stores, and shares information when you use Cogito Digital, the Cogito Academy website, and related learning services.',
      updated: 'Last updated: November 11, 2026',
      sections: [
        {
          title: '1. Who we are',
          paragraphs: [
            'Cogito Digital is a learning and session-management platform operated by PT Cogito Academy Indonesia (Cogito Academy). In this Privacy Policy, “Cogito Academy”, “Cogito Digital”, “we”, or “us” refers to the operator of those services.',
          ],
        },
        {
          title: '2. Information we collect',
          paragraphs: [
            'We collect information needed to provide and secure the services, including:',
          ],
          bullets: [
            'Account information: name, email address, profile photo when available, provider account ID, account role, and email-verification status.',
            'Learning and profile information: school, grade level, subjects, interests, tutor profile information, availability, credentials, and parent or guardian information that you provide.',
            'Service activity: bookings, schedules, participants, notifications, support tickets, achievements, and files that you choose to upload.',
            'Transaction information: purchase history, Marks balance or ledger, payment status, and transaction references. Payment details are processed by the relevant payment provider under its own policy.',
            'Consent records: age group (18 or older, or under 18), terms version and acceptance time, and the full name, relationship, and declared consent of a parent or guardian for students under 18.',
            'Technical information: session cookies, IP address, device and browser details, security logs, and diagnostics needed to keep the services secure and operational.',
          ],
        },
        {
          title: '3. Google Sign-In and Google data',
          paragraphs: [
            'When you choose “Sign in with Google” or “Sign up with Google”, Google shares the basic identity data needed to create or link your Cogito Digital account: your name, email address, profile photo when available, and Google account identifier.',
            'We use that data for authentication, account identity, abuse prevention, session security, and relevant service communications. We do not sell Google data, use it for personalized advertising, or request access to Gmail, Google Drive, Google Contacts, or Google Calendar in the basic sign-in flow.',
            'For operational session scheduling, Cogito Academy may connect a designated operator Google Calendar account through a separate authorization. That authorization is used to create or update session events and Google Meet links; it is not used to read students’ or tutors’ personal calendars as part of Google Sign-In.',
            'Use of data obtained from Google APIs is limited to providing and operating the user-facing features described here, consistent with the Google API Services User Data Policy and applicable Limited Use requirements.',
          ],
        },
        {
          title: '4. How we use information',
          paragraphs: ['We use information to:'],
          bullets: [
            'create accounts, process sign-in, verify email addresses, and secure the services;',
            'provide tutor discovery, booking, scheduling, online or offline sessions, and service communications;',
            'manage Marks, payments, relevant refunds or adjustments, and transaction records;',
            'provide support, handle reports, prevent fraud, and enforce the terms of service;',
            'send service notifications, verification emails, account emails, and important updates; and',
            'comply with law and protect the rights, safety, and integrity of users and Cogito Academy.',
          ],
        },
        {
          title: '5. Sharing information',
          paragraphs: [
            'We do not sell personal information. We may share information in a limited way with service providers that help with hosting, databases, email, file storage, analytics, or payments, only as needed to operate the services and subject to appropriate confidentiality obligations.',
            'In the learning workflow, session participants may see the minimum information needed to take part. Email addresses and private contact details are not shared with other participants without appropriate permission or an in-product consent action.',
            'We may also disclose information when required by law or lawful process, or when necessary to protect users, the public, or our systems from fraud, abuse, or security threats.',
          ],
        },
        {
          title: '6. Storage, retention, and deletion',
          paragraphs: [
            'We retain information for as long as needed to operate your account and the services. After an account is closed, some information may be retained as needed to complete transactions, meet legal obligations, resolve disputes, prevent abuse, or maintain security records.',
            'You may request access to, correction of, or deletion of your information by contacting us through the email address in the “Contact us” section. We will verify requests and explain if some information must be retained for legal or legitimate operational reasons.',
          ],
        },
        {
          title: '7. Security',
          paragraphs: [
            'We use reasonable technical and organizational safeguards, including protected sessions, access controls, input validation, security logging, and abuse prevention. No storage or transmission method is completely secure, so we cannot guarantee absolute security.',
          ],
        },
        {
          title: '8. Children and guardians',
          paragraphs: [
            'Some Cogito Academy programs are intended for learners. For students under 18, a parent or guardian should review your use of the services and provide any required consent. We aim to collect only information relevant to the learning services and provide a contact channel for parent or guardian questions and requests.',
          ],
        },
        {
          title: '8a. Consent, works, achievements and recordings',
          paragraphs: [
            'Parent or guardian consent at registration is a declaration submitted through the Platform, rather than independent identity verification. We use these records to manage accounts and document consent.',
            'Student works are used for coaching and feedback. Use in the Knowledge Bank or for other purposes requires separate written consent from the student and, for students under 18, their parent or guardian.',
            'Achievement submissions include consent to publish approved names, photos and competition results. You may withdraw this consent by email; we will stop new publication and remove existing publications from official channels where reasonably possible.',
            'We do not routinely record sessions. If the Company records a session for internal evaluation, participants are notified and the recording is deleted within 30 calendar days. You may request access, correction, deletion, or withdraw consent through our contact email.',
          ],
        },
        {
          title: '9. Changes to this policy',
          paragraphs: [
            'We may update this Privacy Policy when our services, legal obligations, or data practices change. The latest version will be published on this page with a new update date. If a change is material, we will provide an appropriate notice through the services or by email.',
          ],
        },
      ],
      contactTitle: '10. Contact us',
      contactBody: (
        <>
          For privacy questions, data requests, or questions about Google user data, contact{' '}
          <a
            className="font-semibold text-primary-600 underline underline-offset-4"
            href="mailto:cogitoacademy.id@gmail.com"
          >
            cogitoacademy.id@gmail.com
          </a>
          . You can also visit our{' '}
          <Link
            className="font-semibold text-primary-600 underline underline-offset-4"
            href="/contact"
          >
            contact page
          </Link>
          .
        </>
      ),
    },
    terms: {
      eyebrow: 'Cogito Digital by Cogito Academy',
      title: 'Terms of Service',
      intro:
        'These Terms of Service govern your use of Cogito Digital, the Cogito Academy website, and the learning, tutor, booking, payment, and support features made available through our services.',
      updated: 'Last updated: November 11, 2026',
      sections: platformTerms.en,
      contactTitle: 'Contact us',
      contactBody: (
        <>
          For questions about these Terms of Service, contact{' '}
          <a
            className="font-semibold text-primary-600 underline underline-offset-4"
            href="mailto:cogitoacademy.id@gmail.com"
          >
            cogitoacademy.id@gmail.com
          </a>
          . You can also access the app at{' '}
          <a className="font-semibold text-primary-600 underline underline-offset-4" href={APP_URL}>
            {APP_URL}
          </a>
          .
        </>
      ),
    },
  },
};

export function LegalDocument({ locale, type }: { locale: Locale; type: LegalDocumentType }) {
  const content = LEGAL_CONTENT[locale][type];

  return (
    <div className="bg-background">
      <NavbarResolver />
      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-72">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 font-semibold text-primary-600 text-sm">{content.eyebrow}</p>
          <h1 className="font-semibold text-4xl text-neutral-1000 sm:text-5xl">{content.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-700 leading-7">{content.intro}</p>
          <p className="mt-3 text-neutral-600 text-xs">{content.updated}</p>
        </header>

        <div className="rounded-3xl bg-white/85 p-6 shadow-sm sm:p-10">
          <div className="space-y-9 text-neutral-800 text-sm leading-7 sm:text-base">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-semibold text-neutral-1000 text-xl sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="list-disc space-y-2 pl-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}

            <section>
              <h2 className="font-semibold text-neutral-1000 text-xl sm:text-2xl">
                {content.contactTitle}
              </h2>
              <p className="mt-3">{content.contactBody}</p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
