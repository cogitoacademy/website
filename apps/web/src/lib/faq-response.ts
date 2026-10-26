import type {
  FaqAnswerBlock,
  FaqRichTextBlock,
  FaqRichTextDocument,
  FaqRichTextRun,
  PublicFaq,
} from '@/types/faq';

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isSafeFaqHref(href: string) {
  if (/[\u0000-\u001f\u007f\\]/.test(href)) return false;
  if (href.startsWith('/') && !href.startsWith('//')) return true;
  if (href.startsWith('#') && href.length > 1) return true;

  try {
    return ['http:', 'https:', 'mailto:'].includes(new URL(href).protocol);
  } catch {
    return false;
  }
}

function parseRichTextRun(value: unknown, location: string): FaqRichTextRun {
  if (!isRecord(value) || typeof value.text !== 'string' || value.text.length > 5_000) {
    throw new Error(`${location} has an invalid text run`);
  }
  if ('bold' in value && typeof value.bold !== 'boolean') {
    throw new Error(`${location} has an invalid bold mark`);
  }
  if ('italic' in value && typeof value.italic !== 'boolean') {
    throw new Error(`${location} has an invalid italic mark`);
  }
  if (
    'href' in value &&
    (typeof value.href !== 'string' || value.href.length > 2_048 || !isSafeFaqHref(value.href))
  ) {
    throw new Error(`${location} has an unsafe link`);
  }

  return {
    text: value.text,
    ...(typeof value.bold === 'boolean' ? { bold: value.bold } : {}),
    ...(typeof value.italic === 'boolean' ? { italic: value.italic } : {}),
    ...(typeof value.href === 'string' ? { href: value.href } : {}),
  };
}

function parseRichTextBlock(value: unknown, location: string): FaqRichTextBlock {
  if (!isRecord(value)) throw new Error(`${location} must be an object`);

  if (value.type === 'paragraph' && Array.isArray(value.content) && value.content.length <= 500) {
    return {
      type: 'paragraph',
      content: value.content.map((run, index) =>
        parseRichTextRun(run, `${location}, text run ${index + 1}`),
      ),
    };
  }

  if (
    value.type === 'list' &&
    (value.style === 'ordered' || value.style === 'unordered') &&
    Array.isArray(value.items) &&
    value.items.length > 0 &&
    value.items.length <= 50 &&
    value.items.every((item) => Array.isArray(item) && item.length <= 100)
  ) {
    return {
      type: 'list',
      style: value.style,
      items: value.items.map((item: unknown, itemIndex: number) =>
        (item as unknown[]).map((run: unknown, runIndex: number) =>
          parseRichTextRun(run, `${location}, item ${itemIndex + 1}, text run ${runIndex + 1}`),
        ),
      ),
    };
  }

  throw new Error(`${location} has an invalid shape`);
}

function parseRichTextDocument(
  value: unknown,
  entryIndex: number,
  field: 'questionRich' | 'answerRich',
): FaqRichTextDocument {
  const location = `FAQ entry ${entryIndex + 1}, ${field}`;
  if (!isRecord(value) || value.type !== 'doc' || !Array.isArray(value.blocks)) {
    throw new Error(`${location} has an invalid document`);
  }
  if (value.blocks.length === 0 || value.blocks.length > 50) {
    throw new Error(`${location} has an invalid block count`);
  }

  const blocks = value.blocks.map((block, blockIndex) =>
    parseRichTextBlock(block, `${location}, block ${blockIndex + 1}`),
  );
  const text = blocks
    .flatMap((block) =>
      block.type === 'paragraph'
        ? [block.content.map((run) => run.text).join('')]
        : block.items.map((item) => item.map((run) => run.text).join('')),
    )
    .join('\n')
    .trim();
  const maxLength = field === 'questionRich' ? 500 : 20_000;
  if (!text || text.length > maxLength) {
    throw new Error(`${location} has an invalid text length`);
  }

  return { type: 'doc', blocks };
}

function parseAnswerBlock(value: unknown, entryIndex: number, blockIndex: number): FaqAnswerBlock {
  const location = `FAQ entry ${entryIndex + 1}, answer block ${blockIndex + 1}`;

  if (!isRecord(value)) throw new Error(`${location} must be an object`);

  if (value.type === 'paragraph' && typeof value.text === 'string' && value.text.trim()) {
    return { type: 'paragraph', text: value.text };
  }

  if (
    value.type === 'list' &&
    (value.style === 'ordered' || value.style === 'unordered') &&
    Array.isArray(value.items) &&
    value.items.length > 0 &&
    value.items.every((item) => typeof item === 'string' && item.trim())
  ) {
    return { type: 'list', style: value.style, items: value.items };
  }

  throw new Error(`${location} has an invalid shape`);
}

export function parseFaqResponse(payload: unknown): PublicFaq[] {
  if (
    !isRecord(payload) ||
    !Object.hasOwn(payload, 'json') ||
    (Object.hasOwn(payload, 'meta') && !Array.isArray(payload.meta))
  ) {
    throw new Error('FAQ API returned an invalid oRPC response envelope');
  }

  if (!Array.isArray(payload.json)) {
    throw new Error('FAQ API response json must be an array');
  }

  return payload.json.map((value, entryIndex) => {
    if (!isRecord(value)) throw new Error(`FAQ entry ${entryIndex + 1} must be an object`);
    if (typeof value.id !== 'string' || !value.id.trim()) {
      throw new Error(`FAQ entry ${entryIndex + 1} has an invalid id`);
    }
    if (typeof value.question !== 'string' || !value.question.trim()) {
      throw new Error(`FAQ entry ${entryIndex + 1} has an invalid question`);
    }
    if (!Number.isInteger(value.sortOrder) || (value.sortOrder as number) < 0) {
      throw new Error(`FAQ entry ${entryIndex + 1} has an invalid sort order`);
    }
    if (!Array.isArray(value.answer) || value.answer.length === 0) {
      throw new Error(`FAQ entry ${entryIndex + 1} has no answer blocks`);
    }

    return {
      id: value.id,
      question: value.question,
      answer: value.answer.map((block, blockIndex) =>
        parseAnswerBlock(block, entryIndex, blockIndex),
      ),
      ...(value.questionRich === undefined
        ? {}
        : { questionRich: parseRichTextDocument(value.questionRich, entryIndex, 'questionRich') }),
      ...(value.answerRich === undefined
        ? {}
        : { answerRich: parseRichTextDocument(value.answerRich, entryIndex, 'answerRich') }),
      sortOrder: value.sortOrder as number,
    };
  });
}
