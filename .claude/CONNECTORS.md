# Connectors

The vendored marketing and design skills link here as `../../CONNECTORS.md`. They use `~~category` placeholders for "whatever tool the owner connected in this category". This file maps each placeholder to this store's tools. The placeholder convention and category list come from anthropics/knowledge-work-plugins (Apache-2.0); the mapping is this project's own.

Connectors are added at the claude.ai account level (Settings, then Connectors), not in this repo. Check what's live with the session's tool list. If a category isn't connected, the skill's manual path (web search, a CSV or export the owner provides) is the fallback. Never invent data to fill the gap.

| Placeholder | This store | Status |
|---|---|---|
| store / e-commerce | Shopify connector: products, collections, orders, customers, inventory, discounts, ShopifyQL analytics, Admin GraphQL | Connected (re-authorise in claude.ai connector settings if a call says to sign in again) |
| `~~product analytics` | Shopify analytics through the Shopify connector (`run-analytics-query`, ShopifyQL); GA4 via Windsor.ai later | Shopify: connected. GA4: not yet |
| `~~marketing analytics` | Windsor.ai (Google Ads, Meta, TikTok, GA4, Search Console, Merchant Center in one) | Not yet; add when ads start |
| `~~SEO` | Ahrefs or Semrush (pick one; both are paid) | Not yet. Until then, use web search plus Google Search Console exports |
| `~~email marketing` | Klaviyo | Not yet; add when email flows start |
| `~~design tool` / `~~design` | Canva (social graphics); Figma only if a designer joins | Not yet |
| `~~knowledge base` | This repo: `docs/brand-guide.md` and `docs/` | Available |
| `~~marketing automation` / `~~CRM` | Klaviyo covers this for a store this size | Not yet |
| `~~user feedback` | Product reviews app and customer emails, when they exist | Not yet |
| `~~chat`, `~~project tracker` | Not used | — |
