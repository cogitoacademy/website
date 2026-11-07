const highlights = [
  'I can do it',
  'skills and confidence',
  'technical clarity',
  'tons of medals',
];

export function TestimonialQuote({ text }: { text: string }) {
  const phrase = highlights.find((value) => text.includes(value));
  if (!phrase) return <>{text}</>;
  const index = text.indexOf(phrase);
  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded-sm bg-white/75 px-1 font-semibold text-inherit box-decoration-clone">
        {phrase}
      </mark>
      {text.slice(index + phrase.length)}
    </>
  );
}
