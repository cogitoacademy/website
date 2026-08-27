import type { ReactNode } from 'react';

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
      updated: 'Terakhir diperbarui: 27 Agustus 2026',
      sections: [
        {
          title: '1. Siapa kami',
          paragraphs: [
            'Cogito Digital adalah platform pembelajaran dan pengelolaan sesi yang dioperasikan oleh Cogito Academy. Dalam Kebijakan Privasi ini, “Cogito Academy”, “Cogito Digital”, “kami”, atau “kita” merujuk pada pengelola layanan tersebut.',
          ],
        },
        {
          title: '2. Informasi yang kami kumpulkan',
          paragraphs: ['Kami mengumpulkan informasi yang diperlukan untuk menyediakan dan mengamankan layanan, termasuk:'],
          bullets: [
            'Informasi akun: nama, alamat email, foto profil bila tersedia, ID akun dari penyedia login, peran akun, serta status verifikasi email.',
            'Informasi pembelajaran dan profil: sekolah, tingkat kelas, mata pelajaran, minat, informasi profil tutor, ketersediaan, kredensial, dan informasi wali/orang tua yang Anda masukkan.',
            'Informasi penggunaan layanan: pemesanan sesi, jadwal, peserta, notifikasi, tiket dukungan, prestasi, dan berkas yang Anda pilih untuk unggah.',
            'Informasi transaksi: riwayat pembelian, saldo atau ledger Marks, status pembayaran, dan referensi transaksi. Detail pembayaran diproses oleh penyedia pembayaran terkait sesuai kebijakan mereka.',
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
            'Sebagian program Cogito Academy ditujukan untuk pelajar. Jika pengguna masih di bawah umur menurut hukum yang berlaku, orang tua atau wali harus meninjau penggunaan layanan dan memberikan persetujuan yang diperlukan. Kami berupaya mengumpulkan hanya informasi yang relevan dengan layanan pembelajaran dan menyediakan kanal kontak untuk pertanyaan atau permintaan dari orang tua/wali.',
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
          Untuk pertanyaan tentang privasi, permintaan data, atau penggunaan Google user data, hubungi{' '}
          <a className="font-semibold text-primary-600 underline underline-offset-4" href="mailto:cogitoacademy.id@gmail.com">
            cogitoacademy.id@gmail.com
          </a>
          . Anda juga dapat mengunjungi <Link className="font-semibold text-primary-600 underline underline-offset-4" href="/contact">halaman kontak</Link> kami.
        </>
      ),
    },
    terms: {
      eyebrow: 'Cogito Digital oleh Cogito Academy',
      title: 'Ketentuan Layanan',
      intro:
        'Ketentuan Layanan ini mengatur penggunaan Cogito Digital, situs Cogito Academy, dan fitur pembelajaran, tutor, pemesanan, pembayaran, serta dukungan yang tersedia melalui layanan kami.',
      updated: 'Terakhir diperbarui: 27 Agustus 2026',
      sections: [
        {
          title: '1. Tentang layanan',
          paragraphs: [
            'Cogito Digital membantu pelajar dan tutor menemukan, menjadwalkan, dan mengelola sesi pembelajaran. Fitur yang tersedia dapat berubah dari waktu ke waktu, dan sebagian fitur hanya tersedia untuk peran, lokasi, atau program tertentu.',
          ],
        },
        {
          title: '2. Akun dan akses Google',
          paragraphs: [
            'Anda harus memberikan informasi yang benar dan menjaga kerahasiaan kredensial akun. Anda bertanggung jawab atas aktivitas yang terjadi melalui akun Anda dan harus segera menghubungi kami jika mengetahui adanya akses yang tidak sah.',
            'Jika Anda menggunakan Google Sign-In, Anda memberi wewenang kepada kami untuk menggunakan data identitas dasar yang dibagikan Google sebagaimana dijelaskan dalam Kebijakan Privasi. Login Google tidak memberi kami akses ke layanan Google lain di luar izin yang ditampilkan dan Anda setujui.',
          ],
        },
        {
          title: '3. Pelajar di bawah umur',
          paragraphs: [
            'Jika Anda belum cukup umur untuk menyetujui ketentuan ini menurut hukum yang berlaku, Anda hanya boleh menggunakan layanan dengan keterlibatan dan persetujuan orang tua atau wali. Orang tua atau wali bertanggung jawab membantu memastikan penggunaan layanan yang aman dan sesuai.',
          ],
        },
        {
          title: '4. Pemesanan dan sesi',
          paragraphs: [
            'Pemesanan menjadi mengikat setelah status dan pembayaran yang diperlukan dikonfirmasi di dalam layanan. Jadwal, batas waktu respons, pembatalan, penjadwalan ulang, kehadiran, dan penyelesaian sesi mengikuti aturan yang ditampilkan pada saat pemesanan dan dapat berbeda menurut jenis sesi.',
            'Tutor dan pelajar harus memberikan informasi yang akurat, hadir tepat waktu, menghormati peserta lain, dan menggunakan tautan atau lokasi sesi hanya untuk keperluan pemesanan terkait.',
          ],
        },
        {
          title: '5. Marks, pembayaran, dan refund',
          paragraphs: [
            'Jika layanan menggunakan Marks atau saldo internal, Marks hanya dapat digunakan sesuai fitur dan aturan yang ditampilkan Cogito Digital. Harga, paket, biaya, kredit, penahanan saldo, potongan, dan penyesuaian akan ditampilkan sebelum tindakan dikonfirmasi.',
            'Pembayaran dapat diproses oleh penyedia pembayaran pihak ketiga. Aturan refund, pembatalan, dan penyelesaian pembayaran mengikuti informasi yang ditampilkan pada transaksi serta hukum yang berlaku. Jangan membagikan data kartu atau kredensial pembayaran melalui chat atau tiket dukungan.',
          ],
        },
        {
          title: '6. Konten pengguna',
          paragraphs: [
            'Anda tetap memiliki hak atas konten yang Anda unggah, tetapi memberi Cogito Academy izin terbatas untuk menyimpan, memproses, menampilkan, dan menggunakan konten tersebut sejauh diperlukan untuk menyediakan, mengamankan, dan meningkatkan layanan yang Anda minta.',
            'Anda tidak boleh mengunggah konten yang melanggar hukum, menipu, mengandung malware, melanggar hak pihak lain, atau mengekspos data pribadi orang lain tanpa izin yang sesuai.',
          ],
        },
        {
          title: '7. Penggunaan yang dilarang',
          paragraphs: ['Anda tidak boleh:'],
          bullets: [
            'mengakses atau mencoba mengakses akun, data, atau sistem pengguna lain tanpa izin;',
            'mengganggu keamanan, ketersediaan, atau kinerja layanan;',
            'menggunakan layanan untuk spam, penipuan, pelecehan, diskriminasi, atau aktivitas yang membahayakan orang lain;',
            'menyalin, menjual kembali, melakukan reverse engineering, atau mengeksploitasi bagian layanan tanpa izin tertulis; atau',
            'menggunakan tautan Google Meet, informasi peserta, atau data pemesanan di luar tujuan sesi yang sah.',
          ],
        },
        {
          title: '8. Layanan pihak ketiga',
          paragraphs: [
            'Layanan dapat terhubung dengan Google, penyedia pembayaran, hosting, email, atau layanan pihak ketiga lainnya. Penggunaan layanan pihak ketiga tunduk pada ketentuan dan kebijakan mereka. Kami tidak mengendalikan dan tidak bertanggung jawab atas perubahan atau gangguan pada layanan pihak ketiga tersebut.',
          ],
        },
        {
          title: '9. Ketersediaan dan batas tanggung jawab',
          paragraphs: [
            'Kami berusaha menjaga Cogito Digital tetap tersedia dan akurat, tetapi layanan diberikan sesuai ketersediaan. Kami dapat melakukan pemeliharaan, mengubah fitur, atau menghentikan bagian layanan dengan pemberitahuan yang wajar bila memungkinkan. Cogito Academy tidak menjamin bahwa setiap sesi, tutor, hasil belajar, koneksi internet, atau layanan pihak ketiga akan selalu tersedia atau memenuhi harapan tertentu.',
          ],
        },
        {
          title: '10. Penangguhan dan penghentian',
          paragraphs: [
            'Kami dapat membatasi, menangguhkan, atau menghentikan akses jika terdapat pelanggaran ketentuan, risiko keamanan, kewajiban hukum, atau aktivitas yang merugikan pengguna maupun layanan. Jika memungkinkan, kami akan memberikan penjelasan dan kesempatan untuk menyelesaikan masalah. Ketentuan yang menurut sifatnya tetap berlaku akan tetap berlaku setelah akun dihentikan.',
          ],
        },
        {
          title: '11. Perubahan ketentuan',
          paragraphs: [
            'Kami dapat memperbarui Ketentuan Layanan ini untuk mencerminkan perubahan layanan, keamanan, atau hukum. Versi terbaru akan dipublikasikan di halaman ini dengan tanggal pembaruan. Penggunaan berkelanjutan setelah perubahan berlaku berarti Anda menerima ketentuan yang diperbarui, sejauh diperbolehkan hukum.',
          ],
        },
      ],
      contactTitle: '12. Hubungi kami',
      contactBody: (
        <>
          Untuk pertanyaan tentang Ketentuan Layanan, hubungi{' '}
          <a className="font-semibold text-primary-600 underline underline-offset-4" href="mailto:cogitoacademy.id@gmail.com">
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
      updated: 'Last updated: August 27, 2026',
      sections: [
        {
          title: '1. Who we are',
          paragraphs: [
            'Cogito Digital is a learning and session-management platform operated by Cogito Academy. In this Privacy Policy, “Cogito Academy”, “Cogito Digital”, “we”, or “us” refers to the operator of those services.',
          ],
        },
        {
          title: '2. Information we collect',
          paragraphs: ['We collect information needed to provide and secure the services, including:'],
          bullets: [
            'Account information: name, email address, profile photo when available, provider account ID, account role, and email-verification status.',
            'Learning and profile information: school, grade level, subjects, interests, tutor profile information, availability, credentials, and parent or guardian information that you provide.',
            'Service activity: bookings, schedules, participants, notifications, support tickets, achievements, and files that you choose to upload.',
            'Transaction information: purchase history, Marks balance or ledger, payment status, and transaction references. Payment details are processed by the relevant payment provider under its own policy.',
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
            'Some Cogito Academy programs are intended for learners. If you are under the age required to agree to this policy under applicable law, a parent or guardian should review your use of the services and provide any required consent. We aim to collect only information relevant to the learning services and provide a contact channel for parent or guardian questions and requests.',
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
          <a className="font-semibold text-primary-600 underline underline-offset-4" href="mailto:cogitoacademy.id@gmail.com">
            cogitoacademy.id@gmail.com
          </a>
          . You can also visit our <Link className="font-semibold text-primary-600 underline underline-offset-4" href="/contact">contact page</Link>.
        </>
      ),
    },
    terms: {
      eyebrow: 'Cogito Digital by Cogito Academy',
      title: 'Terms of Service',
      intro:
        'These Terms of Service govern your use of Cogito Digital, the Cogito Academy website, and the learning, tutor, booking, payment, and support features made available through our services.',
      updated: 'Last updated: August 27, 2026',
      sections: [
        {
          title: '1. About the services',
          paragraphs: [
            'Cogito Digital helps learners and tutors discover, schedule, and manage learning sessions. Available features may change over time, and some features may be limited by role, location, or program.',
          ],
        },
        {
          title: '2. Accounts and Google access',
          paragraphs: [
            'You must provide accurate information and keep your account credentials secure. You are responsible for activity through your account and must contact us promptly if you discover unauthorized access.',
            'If you use Google Sign-In, you authorize us to use the basic identity data shared by Google as described in the Privacy Policy. Google Sign-In does not give us access to other Google services beyond the permissions shown to and approved by you.',
          ],
        },
        {
          title: '3. Learners under the age of majority',
          paragraphs: [
            'If you are not old enough to agree to these terms under applicable law, you may use the services only with the involvement and consent of a parent or guardian. Parents and guardians are responsible for helping ensure safe and appropriate use.',
          ],
        },
        {
          title: '4. Bookings and sessions',
          paragraphs: [
            'A booking becomes binding when its status and required payment are confirmed in the services. Scheduling, response deadlines, cancellation, rescheduling, attendance, and completion follow the rules shown at booking and may differ by session type.',
            'Tutors and learners must provide accurate information, attend on time, respect other participants, and use session links or locations only for the related booking.',
          ],
        },
        {
          title: '5. Marks, payments, and refunds',
          paragraphs: [
            'If the services use Marks or an internal balance, Marks may be used only through the features and rules shown by Cogito Digital. Prices, packages, fees, credits, balance holds, deductions, and adjustments will be shown before confirmation.',
            'Payments may be processed by a third-party payment provider. Refund, cancellation, and payment-settlement rules follow the information shown with the transaction and applicable law. Do not share card data or payment credentials through chat or support tickets.',
          ],
        },
        {
          title: '6. User content',
          paragraphs: [
            'You retain rights in content you upload, but grant Cogito Academy a limited permission to store, process, display, and use that content as needed to provide, secure, and improve the services you request.',
            'You must not upload content that is unlawful, deceptive, contains malware, infringes another person’s rights, or exposes someone else’s personal information without appropriate permission.',
          ],
        },
        {
          title: '7. Prohibited use',
          paragraphs: ['You must not:'],
          bullets: [
            'access or attempt to access another user’s account, data, or systems without permission;',
            'interfere with the security, availability, or performance of the services;',
            'use the services for spam, fraud, harassment, discrimination, or activity that harms others;',
            'copy, resell, reverse engineer, or exploit any part of the services without written permission; or',
            'use Google Meet links, participant information, or booking data outside the legitimate purpose of the related session.',
          ],
        },
        {
          title: '8. Third-party services',
          paragraphs: [
            'The services may connect to Google, payment, hosting, email, or other third-party services. Your use of those services is governed by their terms and policies. We do not control and are not responsible for changes to or outages of third-party services.',
          ],
        },
        {
          title: '9. Availability and disclaimers',
          paragraphs: [
            'We work to keep Cogito Digital available and accurate, but the services are provided as available. We may perform maintenance, change features, or discontinue part of the services with reasonable notice where possible. Cogito Academy does not guarantee that every session, tutor, learning outcome, internet connection, or third-party service will always be available or meet a particular expectation.',
          ],
        },
        {
          title: '10. Suspension and termination',
          paragraphs: [
            'We may limit, suspend, or terminate access for violations of these terms, security risks, legal obligations, or activity that harms users or the services. Where possible, we will provide an explanation and an opportunity to resolve the issue. Provisions that by their nature should continue will survive account termination.',
          ],
        },
        {
          title: '11. Changes to these terms',
          paragraphs: [
            'We may update these Terms of Service to reflect changes to the services, security, or law. The latest version will be published on this page with an update date. Continued use after an effective change means you accept the updated terms to the extent permitted by law.',
          ],
        },
      ],
      contactTitle: '12. Contact us',
      contactBody: (
        <>
          For questions about these Terms of Service, contact{' '}
          <a className="font-semibold text-primary-600 underline underline-offset-4" href="mailto:cogitoacademy.id@gmail.com">
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
    <div className="bg-background-cream">
      <NavbarResolver />
      <article className="mx-auto max-w-4xl px-4 pt-32 pb-32 sm:px-6 lg:px-8">
        <header className="mb-10 max-w-3xl">
          <p className="mb-3 font-semibold text-primary-600 text-sm uppercase tracking-[0.18em]">
            {content.eyebrow}
          </p>
          <h1 className="font-semibold text-4xl text-neutral-1000 sm:text-5xl">{content.title}</h1>
          <p className="mt-5 max-w-2xl text-base text-neutral-700 leading-7">{content.intro}</p>
          <p className="mt-4 text-neutral-600 text-sm">{content.updated}</p>
        </header>

        <div className="rounded-3xl bg-white/85 p-6 shadow-sm sm:p-10">
          <div className="space-y-9 text-neutral-800 text-sm leading-7 sm:text-base">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-semibold text-neutral-1000 text-xl sm:text-2xl">{section.title}</h2>
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
              <h2 className="font-semibold text-neutral-1000 text-xl sm:text-2xl">{content.contactTitle}</h2>
              <p className="mt-3">{content.contactBody}</p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
