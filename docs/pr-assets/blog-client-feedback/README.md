# Blog client-feedback verification assets

This folder holds the local verification artifacts for the blog SEO, image
quality, and table-block changes.

## Fixture

A throwaway Bun server (not committed) served the public blog RPC endpoints from
`/tmp/opencode`:

- `POST /rpc/publicContent/blog/get`
- `POST /rpc/publicContent/blog/list`
- `POST /rpc/publicContent/blog/categories`
- `POST /rpc/publicContent/blog/sitemap`

All responses used the oRPC `{ json: ... }` envelope. The fixture article was a
paired ID/EN article (`alternate` non-null) with a heading, a paragraph, a
3-column table with a header row, key facts, and a public hero image. Table cells
are arrays of runs (`BlogRun[][]` header, `BlogRun[][][]` rows), matching the app
contract. The web app ran on `http://localhost:2001` with:

```env
COGITO_APP_API_URL=http://localhost:4400
NEXT_PUBLIC_SITE_URL=https://cogitoacademy.id
```

The apex site URL intentionally exercises the www-normalization path.

## Artifacts

| File                                        | What it shows                                                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `01-blog-article-table-desktop.png`         | 1440px-wide article with the table block rendered as a bordered, scrollable semantic table.                    |
| `02-blog-article-table-mobile.png`          | 390px-wide article; the 3-column table overflows horizontally instead of squashing its columns.                |
| `07-blog-list-fixed-thumbnails-desktop.png` | 1440px-wide blog list with four cards of different title lengths; every desktop thumbnail is the same 5:4 box. |
| `head-audit.txt`                            | Rendered `<title>`, canonical, hreflang, `og:url`, and sitemap alternate tags for the fixture.                 |

The blog-list screenshot used a second throwaway list fixture with four cards and
one- and two-line titles. The measured image boxes were all 218 x 175 CSS pixels,
so the 5:4 desktop ratio is fixed instead of following the card height.

## Verified in the audit

- Article title is `Math Olympiad Guide | Cogito Academy` (no long site suffix).
- Canonical, `og:url`, hreflang, RSS and sitemap URLs use
  `https://www.cogitoacademy.id` even though the configured URL was the apex.
- `x-default` points at the English article for both the ID and EN pages.
- Sitemap paired entries list both locales plus an English `x-default`.

Temporary fixture code, `.env` files, and downloaded browser libraries were not
committed.
