// import { ChevronLeft, ChevronRight } from "lucide-react";
import { UserSoundIcon } from '@phosphor-icons/react/dist/ssr';
import { getLocale } from 'next-intl/server';
import Carousel from '../carousel';
import { Badge } from '../ui/badge';

export async function TestimonialsSection() {
  const locale = await getLocale();
  const isId = locale === 'id';

  const testimonials = [
    {
      id: 1,
      name: 'Athalla Zhafran',
      initials: 'AZ',
      color: 'bg-blue-500',
      title: isId
        ? 'Best Delegate di Harvard National MUN 2024'
        : 'Best Delegate at Harvard National MUN 2024',
      desc: isId
        ? 'Cogito Academy mengubah cara saya memahami diplomasi dan negosiasi. Materi yang diberikan sangat komprehensif dan mentor yang berpengalaman membantu saya mengembangkan kemampuan public speaking secara signifikan. Sekarang saya percaya diri untuk mewakili Indonesia di forum internasional.'
        : 'Cogito Academy transformed the way I understand diplomacy and negotiation. The materials provided were comprehensive, and the experienced mentors helped me develop my public speaking skills significantly. Now I am confident to represent Indonesia at international forums.',
      avatar: '/placeholder.jpg',
      img: '/placeholder.jpg',
    },
    {
      id: 2,
      name: 'Sarah Putri',
      initials: 'SP',
      color: 'bg-pink-500',
      title: isId
        ? 'Juara 1 Debat Bahasa Inggris Nasional'
        : 'National English Debate Championship Winner',
      desc: isId
        ? 'Semula saya kesulitan mengekspresikan ide secara sistematis. Setelah mengikuti program di Cogito Academy, saya tidak hanya belajar teknik debat yang efektif, tetapi juga cara berpikir kritis yang sangat berguna dalam kehidupan sehari-hari. Saya sangat merekomendasikan academy ini!'
        : 'I used to struggle with expressing ideas systematically. After joining Cogito Academy, I not only learned effective debate techniques but also critical thinking skills that are incredibly useful in everyday life. I highly recommend this academy!',
      avatar: '/placeholder.jpg',
      img: '/placeholder.jpg',
    },
    {
      id: 3,
      name: 'Raffi Ahmad',
      initials: 'RA',
      color: 'bg-green-500',
      title: isId ? 'Delegasi RI di Geneva Model UN' : 'Indonesian Delegate at Geneva Model UN',
      desc: isId
        ? 'Pengalaman di Cogito Academy memberikan saya fondasi yang kuat untuk bersaing di level internasional. Tim mentor yang beranggotakan praktisi PBB nyata memberikan insight yang tidak bisa saya temukan di tempat lain. Ini adalah investasi terbaik untuk masa depan saya di dunia diplomat.'
        : "My experience at Cogito Academy gave me a strong foundation to compete at the international level. The mentoring team consisting of real UN practitioners provided insights I couldn't find elsewhere. This is the best investment for my future in the diplomatic world.",
      avatar: '/placeholder.jpg',
      img: '/placeholder.jpg',
    },
    {
      id: 4,
      name: 'Nadira Amira',
      initials: 'NA',
      color: 'bg-purple-500',
      title: isId ? 'Best Position Paper THIMUN 2024' : 'Best Position Paper at THIMUN 2024',
      desc: isId
        ? 'Cogito Academy bukan hanya tentang menang kompetisi, tetapi tentang membentuk karakter pemimpin masa depan. Saya belajar bagaimana mengartikulasikan posisi dengan argumen yang kuat sambil tetap menghormati pendapat berbeda. Proses pembelajaran yang personal membuat saya berkembang dengan cepat.'
        : 'Cogito Academy is not just about winning competitions, but about shaping future leaders. I learned how to articulate positions with strong arguments while respecting different opinions. The personalized learning process helped me grow quickly.',
      avatar: '/placeholder.jpg',
      img: '/placeholder.jpg',
    },
  ];

  return (
    <section className="overflow-hidden bg-background-cream py-16">
      <div
        id="testimonials"
        className="invisible h-0 scroll-mt-24 md:scroll-mt-[6.5rem]"
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12">
          <div className="space-y-2 text-center">
            <Badge variant={'headline-primary'}>
              <UserSoundIcon /> <span>{isId ? 'Testimoni' : 'Testimonials'}</span>
            </Badge>
            <h2 className="mx-auto text-pretty font-bold text-2xl text-neutral-1000 lg:max-w-none lg:text-3xl">
              {isId ? (
                <>
                  Lebih dari Sekadar <span className="text-primary-500">Medali</span>
                </>
              ) : (
                <>
                  Progress Beyond the <span className="text-primary-500">Podium</span>
                </>
              )}
            </h2>
            <p className="mx-auto max-w-3xl font-medium text-neutral-1000 text-xs md:max-w-none md:text-sm xl:text-base">
              {isId
                ? 'Simak cerita mereka yang berhasil menemukan kepercayaan diri dan menguasai keahlian baru.'
                : 'Hear from students who found their voice and mastered new skills with us.'}
            </p>
          </div>

          <Carousel
            items={testimonials}
            showNavigation={true}
            showDots={true}
            autoPlay={false}
            gap={36}
            responsiveGap={true}
            className=""
          />
        </div>
      </div>
    </section>
  );
}
