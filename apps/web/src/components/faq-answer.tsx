import { Fragment, type ReactNode } from 'react';
import type { FaqAnswerBlock, FaqRichTextDocument, FaqRichTextRun } from '@/types/faq';

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

function renderRuns(runs: FaqRichTextRun[], allowLinks = true): ReactNode[] {
  return runs.map((run, index) => {
    let content: ReactNode = run.text;
    if (run.bold) content = <strong>{content}</strong>;
    if (run.italic) content = <em>{content}</em>;
    if (allowLinks && run.href && isSafeFaqHref(run.href)) {
      content = (
        <a className="underline underline-offset-2" href={run.href}>
          {content}
        </a>
      );
    }
    return <Fragment key={index}>{content}</Fragment>;
  });
}

export function FaqQuestion({ question, rich }: { question: string; rich?: FaqRichTextDocument }) {
  if (!rich) return <>{question}</>;

  const runs = rich.blocks.flatMap((block, blockIndex) => {
    const blockRuns =
      block.type === 'paragraph'
        ? block.content
        : block.items.flatMap((item, itemIndex) =>
            itemIndex === 0 ? item : [{ text: ' ' }, ...item],
          );
    return blockIndex === 0 ? blockRuns : [{ text: ' ' }, ...blockRuns];
  });

  // Question content sits inside a button, so link marks stay non-interactive here.
  return <>{renderRuns(runs, false)}</>;
}

export function FaqAnswer({
  blocks,
  rich,
}: {
  blocks: FaqAnswerBlock[];
  rich?: FaqRichTextDocument;
}) {
  if (rich) {
    return (
      <div className="space-y-3">
        {rich.blocks.map((block, index) =>
          block.type === 'paragraph' ? (
            <p key={index}>{renderRuns(block.content)}</p>
          ) : block.style === 'ordered' ? (
            <ol key={index} className="ml-4 list-outside list-decimal space-y-2">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderRuns(item)}</li>
              ))}
            </ol>
          ) : (
            <ul key={index} className="ml-4 list-outside list-disc space-y-2">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>{renderRuns(item)}</li>
              ))}
            </ul>
          ),
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, index) =>
        block.type === 'paragraph' ? (
          <p key={index}>{block.text}</p>
        ) : block.style === 'ordered' ? (
          <ol key={index} className="ml-4 list-outside list-decimal space-y-2">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul key={index} className="ml-4 list-outside list-disc space-y-2">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        ),
      )}
    </div>
  );
}
