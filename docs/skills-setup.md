# Claude skills setup

## Why the skills live in this repo, not the claude.ai account

Skills load the same way wherever they're installed. Each session lists every skill's name and description up front. The full instructions load only when a skill is used, and then stay in context for the rest of the session. So the real differences are where they load and what comes bundled with them.

| | Repo (`.claude/skills/`) | claude.ai account (plugins and skills) |
|---|---|---|
| Where they load | Only in sessions on this repo | Every chat, Cowork and cloud session, on every project |
| Listing cost | Paid only when working on the store | Paid in every unrelated conversation |
| Bundled extras | Only the skill files we chose | Plugins can bring MCP servers, hooks and telemetry (the Marketing plugin alone declares 13 MCP servers; Shopify's AI toolkit hooks every prompt and sends usage data to Shopify by default) |
| Control | Pinned versions, reviewed, customisable, in git history | Updates arrive on their own |
| Cloud sessions | Load automatically (part of the clone) | Load automatically |

Plugins declared in a repo's `.claude/settings.json` (`enabledPlugins`) do not install in cloud sessions. Copying the skill files into the repo is the reliable way.

Performance matters too. The skill listing has a budget (about 1% of the context window). When too many skills compete, Claude Code drops the least-used descriptions and Claude can pick the wrong skill or miss one. So the set is deliberately small and non-overlapping. Later-stage skills are listed by name only (`skillOverrides` in `.claude/settings.json`), and `CLAUDE.md` routes jobs to them. The full listing costs about 2,000 tokens in this repo's sessions.

The account level is right for **connectors**: anything that logs in to an outside service (Shopify, Search Console, Klaviyo and so on). That auth lives on your claude.ai account, and the skills here use whatever is connected.

**Avoid duplicates.** Don't also enable the Marketing, Design, frontend-design or liquid-skills plugins on your account. They'd load twice in this repo's sessions under different names.

## What's installed

**Active now: design**
- `storefront-design` (ours): how every design decision becomes Shopify theme work. It includes the taste-skill checklist.
- `frontend-design` (Anthropic): aesthetic direction and anti-generic process.
- `shopify-liquid-themes`, `liquid-theme-standards`, `liquid-theme-a11y` (Shopify): correct Liquid, CSS/JS standards and accessibility.
- `design-critique` (Anthropic): structured critique of screenshots.

**Active now: SEO and content**
- `giftbox-commerce` (ours): occasion, recipient and price architecture, tags and metafields, hamper product pages, the seasonal calendar and launch timing, gift features, compliance flags.
- `seo-audit` (Anthropic): keyword research, content gaps, competitors.
- `seo-ai-visibility` (Anthropic): technical SEO and AI-search visibility (robots.txt, llms.txt, schema, catalog refresh).
- `shopify-seo-metadata`, `shopify-alt-text`, `shopify-json-ld` (Kurt Elster): safe-mode backfills straight into the store.
- `ecom-landing-pages` (Kurt Elster): occasion and seasonal landing pages.
- `draft-content`, `brand-review`, `competitive-brief`, `campaign-plan` (Anthropic).

**Installed, listed by name only until needed**
- `shopify-category-taxonomy`: Google Shopping attributes, at the first Merchant Center feed.
- `shopify-catalog-audit` and `shopify-catalog-cleanup`: once the catalog has grown.
- `shopify-redirect-mapping`: when pages are retired or handles change.
- `email-sequence`: email flows, at Klaviyo setup.
- `performance-report`: once there's traffic.
- `review-reputation`: once reviews come in.
- `inventory-planner`: for the seasonal stock of box components.

## Deliberately not installed

- **taste-skill v2 (`design-taste-frontend`).** It defaults to React, Next.js, Tailwind and Motion, which conflicts with Shopify theme rules. It is also about 22,000 tokens once loaded. Its framework-neutral checklist is folded into `storefront-design`. It's still a good choice for non-Shopify projects.
- **Shopify AI Toolkit.** Built for app developers. It hooks every prompt, sends prompts and code to Shopify by default, and adds a logging step each turn. The Shopify connector already provides docs search and GraphQL validation.
- **Shopify DevKit, storefront-theme-kit, Copywriting Editor Kit, Product Marketing.** I found no public source I could review before committing them. Their jobs are covered above.
- **The rest of the Anthropic small-business plugin.** Bookkeeping, payroll, CRM and the like are off-topic. `growth-pulse` and `content-strategy` depend on QuickBooks and PayPal.

## Connect at the account level later

| When | Connector | Why |
|---|---|---|
| Now | Shopify (re-authorise) | It currently asks to sign in again |
| At launch | Google Search Console and GA4: Windsor.ai covers both, plus ads and Merchant Center | Real search queries and traffic for SEO work |
| When doing keyword research seriously | Ahrefs or Semrush (one) | Keyword volumes, competitor rankings, AI-search mentions |
| When email starts | Klaviyo | Occasion reminders, abandoned cart, seasonal sends |
| When social starts | Canva | On-brand social graphics |

## Environment setup still needed

1. **Network access:** allow `*.myshopify.com` and `*.shopify.com` in this cloud environment's network settings. They're blocked today, so sessions can't load the storefront preview or run the Shopify CLI.
2. **Theme in the repo:** connect this repo to the store (Online Store, then Themes, then Add theme, then Connect from GitHub), starting from Horizon or the theme you choose.
3. **Optional, for previews from cloud sessions:** install Shopify's Theme Access app, create a password, and add it as the environment secret `SHOPIFY_CLI_THEME_TOKEN`.

## Maintenance

- `/context` and `/skill-doctor` in a session show what the skills cost and which go unused.
- Update third-party skills with `scripts/vendor-skills.sh` (pinned commits; review the diff).
- Turn a name-only skill back on by removing its line from `skillOverrides` once it's in regular use.
