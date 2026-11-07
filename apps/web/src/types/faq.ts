export type FaqAnswerBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; style: 'ordered' | 'unordered'; items: string[] };

export type FaqRichTextRun = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
};

export type FaqRichTextBlock =
  | { type: 'paragraph'; content: FaqRichTextRun[] }
  | { type: 'list'; style: 'ordered' | 'unordered'; items: FaqRichTextRun[][] };

export type FaqRichTextDocument = { type: 'doc'; blocks: FaqRichTextBlock[] };

export type FaqCategory = string;

export type PublicFaq = {
  id: string;
  question: string;
  answer: FaqAnswerBlock[];
  questionRich?: FaqRichTextDocument;
  answerRich?: FaqRichTextDocument;
  sortOrder: number;
  category?: FaqCategory;
  categoryLabel?: string;
};

export type FaqLocale = 'en' | 'id';
export type FaqSurface = 'full' | 'landing';
