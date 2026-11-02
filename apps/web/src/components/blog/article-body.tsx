import Image from 'next/image';
import type { ReactNode } from 'react';

import type { BlogBlock, BlogRun } from '@/lib/blog-api';
import { SocialEmbed } from './social-embed';

type Media = Record<
  string,
  {
    id: string;
    url: string;
    filename: string;
    contentType: string;
    width: number | null;
    height: number | null;
    byteSize: number | null;
  }
>;

function Runs({ runs }: { runs: BlogRun[] }) {
  return runs.map((run, index) => {
    let node: ReactNode = run.text;
    if (run.italic) node = <em>{node}</em>;
    if (run.bold) node = <strong>{node}</strong>;
    if (run.href) {
      node = (
        <a
          href={run.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 underline underline-offset-4"
        >
          {node}
        </a>
      );
    }
    return <span key={index}>{node}</span>;
  });
}

export function ArticleBody({ body, media }: { body: BlogBlock[]; media: Media }) {
  return (
    <div className="flex flex-col gap-6">
      {body.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const id = `section-${index}`;
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={id}
                  className="scroll-mt-28 font-bold text-2xl text-neutral-1000"
                >
                  {block.text}
                </h2>
              );
            }
            return (
              <h3 key={index} id={id} className="scroll-mt-28 font-bold text-xl text-neutral-1000">
                {block.text}
              </h3>
            );
          }
          case 'paragraph':
            return (
              <p key={index} className="text-neutral-800 leading-relaxed">
                <Runs runs={block.runs} />
              </p>
            );
          case 'list': {
            const Tag = block.style === 'ordered' ? 'ol' : 'ul';
            return (
              <Tag
                key={index}
                className={`flex flex-col gap-2 pl-6 text-neutral-800 leading-relaxed ${
                  block.style === 'ordered' ? 'list-decimal' : 'list-disc'
                }`}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Runs runs={item} />
                  </li>
                ))}
              </Tag>
            );
          }
          case 'quote':
            return (
              <blockquote
                key={index}
                className="border-primary-400 border-l-4 bg-primary-100/40 py-3 pr-4 pl-5 text-neutral-800 italic leading-relaxed"
              >
                <Runs runs={block.runs} />
                {block.attribution ? (
                  <footer className="mt-2 font-medium text-neutral-600 text-sm not-italic">
                    — {block.attribution}
                  </footer>
                ) : null}
              </blockquote>
            );
          case 'callout':
            return (
              <aside
                key={index}
                className="rounded-2xl bg-secondary-100 p-5 ring-1 ring-secondary-200"
              >
                <p className="font-semibold text-neutral-1000">{block.title}</p>
                <p className="mt-2 text-neutral-700 leading-relaxed">
                  <Runs runs={block.runs} />
                </p>
              </aside>
            );
          case 'image': {
            const item = media[block.mediaId];
            if (!item) return null;
            return (
              <figure key={index} className="my-4 flex flex-col gap-2">
                <Image
                  src={item.url}
                  alt={block.alt}
                  width={item.width ?? 1200}
                  height={item.height ?? 800}
                  sizes="(min-width: 1024px) 720px, 92vw"
                  className="h-auto w-full rounded-2xl bg-neutral-200 object-cover"
                />
                {block.caption ? (
                  <figcaption className="text-center text-neutral-600 text-xs">
                    {block.caption}
                  </figcaption>
                ) : null}
              </figure>
            );
          }
          case 'embed': {
            const poster = block.posterMediaId ? media[block.posterMediaId] : undefined;
            return (
              <SocialEmbed
                key={index}
                provider={block.provider}
                url={block.url}
                posterUrl={poster?.url}
                posterAlt={poster?.filename}
              />
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
