# Blog navbar language switch verification

This folder holds the local verification for the article- and category-aware
navbar language toggle.

## Fixture

A throwaway Bun server on port 4400 served paired ID/EN blog responses:

- ID article: `/id/blog/artikel-indonesia` → EN alternate `/en/blog/english-article`
- EN article: `/en/blog/english-article` → ID alternate `/id/blog/artikel-indonesia`
- Single-language article: `/id/blog/artikel-tanpa-pasangan` → no alternate, toggle hidden
- ID category: `/id/blog/kategori/panduan-lomba` → EN `/en/blog/category/competition-guides`
- EN category: `/en/blog/category/competition-guides` → ID `/id/blog/kategori/panduan-lomba`

The web app ran on `http://localhost:2001` with `COGITO_APP_API_URL=http://localhost:4400`
and `NEXT_PUBLIC_SITE_URL=https://cogitoacademy.id`.

## Artifacts

| File                                 | What it shows                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------- |
| `08-blog-navbar-language-switch.png` | ID article page; the navbar `EN` link resolved to `/en/blog/english-article`. |
| `09-blog-single-language-no-toggle.png` | Single-language article; the navbar language toggle is hidden.             |
| `nav-switch-audit.txt`               | Rendered toggle hrefs for article and category pages in both directions.      |

The audit confirms the toggle uses the sibling slug from `alternate` instead of
keeping the current slug, that category hubs use the correct locale segment
(`kategori` vs `category`), and that a single-language article hides the toggle.

Temporary fixture code and `.env` files were not committed.
