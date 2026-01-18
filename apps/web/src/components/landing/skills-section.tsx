import { ArrowRight } from "lucide-react";

export function SkillsSection() {
  const skills = [
    {
      title: "Model United Nations",
      description: "Ahli negosiasi dan diplomasi global.",
      color: "tertiary-blue-400",
    },
    {
      title: "Olimpiade",
      description: "Juara sains dan matematika dunia.",
      color: "red-200",
    },
    {
      title: "World Scholar's Cup",
      description: "Eksplorasi ilmu di panggung dunia.",
      color: "tertiary-yellow-400",
    },
    {
      title: "Pidato",
      description: "Bicara publik di berbagai tingkat.",
      color: "tertiary-pink-400",
    },
    {
      title: "KTI dan Esai",
      description: "Susun riset ilmiah standar dunia.",
      color: "primary-400",
    },
    {
      title: "Debat",
      description: "Latih logika dan argumen kritis.",
      color: "secondary-400",
    },
    {
      title: "Business Plan",
      description: "Rancang inovasi bisnis masa depan.",
      color: "tertiary-green-400",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-background-cream py-16">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 h-[400px] w-full rounded-b-[100px] bg-tertiary-pink-100 opacity-30" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-extrabold text-[32px] text-neutral-1000">
              Spektrum <span className="text-primary-500">Keahlian</span> Kami
            </h2>
          </div>

          {/* Skills Grid Container */}
          <div className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-background-cream p-8 shadow-lg lg:p-12">
            {/* Background Decorative Shape */}
            <div className="absolute right-0 bottom-0 left-0 h-[200px] rounded-t-[100px] bg-tertiary-pink-100 opacity-50" />

            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full bg-gradient-to-b from-transparent via-tertiary-blue-100 to-transparent" />
            </div>

            <div className="relative z-10">
              {/* Title */}
              <h3 className="mb-12 text-center font-extrabold text-[32px] text-neutral-1000">
                Spektrum <span className="text-primary-500">Keahlian</span> Kami
              </h3>

              {/* Skills Grid - 2 rows, 4 columns */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className={`relative flex h-[100px] flex-col justify-between overflow-hidden rounded-lg border-t-[13px] bg-white shadow-sm border-${skill.color}`}
                  >
                    {/* Top Border Color */}
                    <div
                      className="absolute top-0 right-0 left-0 h-[13px]"
                      style={{ backgroundColor: `var(--${skill.color})` }}
                    />

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between p-5 pt-6">
                      <div>
                        <h4 className="mb-1 font-bold text-[22px] text-neutral-1000 leading-tight">
                          {skill.title}
                        </h4>
                        <p className="text-neutral-1000 text-sm leading-tight">
                          {skill.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Button */}
                    <button
                      type="button"
                      className="absolute right-4 bottom-4 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-200 transition-colors hover:bg-neutral-300"
                    >
                      <ArrowRight className="size-5 text-white" />
                    </button>
                  </div>
                ))}

                {/* Last empty card placeholder if needed for layout */}
                <div className="hidden lg:block" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
