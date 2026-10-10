# Gift box store: Shopify theme and store operations

Shopify store selling gift boxes and hampers for birthdays and other occasions, with seasonal and themed ranges (Christmas, Valentine's) to come. Design and SEO are the priorities. Status: pre-launch. The theme hasn't been added to this repo yet.

Read `docs/brand-guide.md` before writing copy, choosing keywords or designing anything. When a fact you need is `TBD` there, ask the owner, then record the answer in the guide.

## Two ways Claude works on the store

- **Store data, through the Shopify connector** (claude.ai account connector): products, collections, discounts, inventory, orders, customers, analytics (`run-analytics-query`, ShopifyQL) and Admin GraphQL (`graphql_query`, `graphql_mutation`). If a call says to sign in again, tell the owner to re-authorise Shopify in claude.ai connector settings.
- **Theme code, in this repo.** Liquid theme files live here, and pushes reach Shopify through the GitHub-connected theme. Nothing reaches the live store until the owner publishes.

## Rules

- Never edit or publish the live theme. Work on this branch or an unpublished theme; the owner publishes.
- Before any write to the store (create, update or delete of products, collections, discounts or metafields), show the owner what will change and get a yes. Bulk changes go in batches of about 20, with a sample shown and a yes for each batch.
- Never invent facts: box contents, allergens, sourcing claims, reviews, ratings, prices, delivery promises or credentials. Ask.
- Store credentials (Theme Access password, API tokens) go in environment secrets, never in the repo.
- Use the market's language and spelling from the brand guide ("hamper" vs "gift basket", "basket" vs "cart").

## Which skill for which job

| Job | Skills |
|---|---|
| Catalog structure, collections, tags, metafields, product page content, seasonal planning | `giftbox-commerce` (read first) |
| Visual design, theme sections, redesigns, seasonal restyles | `storefront-design`, then `frontend-design`; code: `shopify-liquid-themes`, `liquid-theme-standards`, `liquid-theme-a11y` |
| Reviewing a design or screenshot | `design-critique` |
| SEO strategy, keyword research, competitor gaps | `seo-audit` |
| Technical SEO and AI-search visibility audit and fixes (robots.txt, llms.txt, schema, catalog refresh) | `seo-ai-visibility` |
| Missing SEO titles and meta descriptions | `shopify-seo-metadata` |
| Missing image alt text | `shopify-alt-text` |
| Structured data (FAQ, Organization, Article, CollectionPage) | `shopify-json-ld` |
| Product categories and Google Shopping attributes | `shopify-category-taxonomy` |
| Seasonal, occasion and campaign landing pages | `ecom-landing-pages` |
| Catalog health: find problems, then fix them | `shopify-catalog-audit`, then `shopify-catalog-cleanup` |
| 301 redirects (retired pages, 404s, changed handles) | `shopify-redirect-mapping` |
| Copy for blogs, social, newsletters, pages | `draft-content`, then `brand-review` |
| Competitors | `competitive-brief` |
| Seasonal and launch campaigns | `campaign-plan` |
| Email flows (welcome, abandoned cart, occasion reminders) | `email-sequence` |
| Results after launch | `performance-report`, with Shopify analytics via the connector |
| Reviews and reputation | `review-reputation` |
| Stock and reorders for box components | `inventory-planner` |

Some skills are listed by name only (`.claude/settings.json` → `skillOverrides`) to save context. They work normally when invoked from this table.

## Notes on the vendored skills

Sources, pinned commits and licences are in `docs/third-party-skills.md`. Update them with `scripts/vendor-skills.sh`; never hand-edit vendored files.

- **Store access.** The kgelster `shopify-*` skills describe store access through a custom-app token or the Shopify CLI ("Lane A/B"). Here, prefer the Shopify connector's `graphql_query` and `graphql_mutation`; they need no token. Their "LLM API key" step doesn't apply: generate the text in-session.
- **Shared files.** The small-business skills (`seo-ai-visibility`, `review-reputation`, `inventory-planner`) read `.claude/shared/`. Their voice profile is the brand guide's Voice section. They sometimes offer sibling skills that aren't installed (social-content-engine, growth-pulse, ad-manager, build-connector); skip those offers.
- **Connectors.** Marketing and design skills use `~~category` placeholders. `.claude/CONNECTORS.md` maps them to this store's tools and shows what is connected.

## Commands

- Screenshot a page at mobile and desktop widths: `NODE_PATH="$(npm root -g)" node scripts/screenshot.cjs <url> .screenshots [storefront-password]`
- Re-vendor third-party skills: `scripts/vendor-skills.sh`
- Theme lint (once the theme is in the repo and Shopify CLI is installed): `shopify theme check`

The cloud environment must allow `*.myshopify.com` and `*.shopify.com` before previews, screenshots of the store or Shopify CLI can work.

The store is bowandbloomgifts.myshopify.com (t4qigc-9u.myshopify.com redirects there). Shopify's bot protection rate-limits automated browsers: after a burst of page loads it answers "Just a moment…" or 429 for a few minutes, and this environment can't load the challenge, so space out screenshot and test runs and retry later. A Web Bot Auth signature (Online Store → Preferences → Crawler access), stored as an environment secret, would lift the limit.
