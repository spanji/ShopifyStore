---
name: storefront-design
description: How to design and build this store's Shopify theme so it looks distinctive and sells. Use for any visual design, layout, theme customisation, new section or block, redesign, or seasonal restyle of the storefront (home, collection, product, cart, landing pages). Applies frontend-design's aesthetic process inside an Online Store 2.0 theme (Horizon, sections, blocks, editor settings) and adds gift-store page checklists, the anti-generic checklist, performance budgets, and the preview, screenshot and critique loop.
---

# Storefront design

This skill connects the others:

- `frontend-design` decides how it should look. Run its plan pass first.
- `shopify-liquid-themes`, `liquid-theme-standards` and `liquid-theme-a11y` decide how the code is written.
- `giftbox-commerce` decides what each page must contain.
- `design-critique` reviews screenshots.

When any design guidance, including a taste-style skill a session may carry, assumes React, Next.js, Tailwind, GSAP, Motion, an icon package or a build step, this skill wins. A Shopify theme is Liquid, vanilla CSS and small Web Components.

## Stack rules for this repo

- **Base theme.** Online Store 2.0, based on Shopify's current free reference theme (the block-based Horizon family at the time of writing). Extend it with new sections, blocks, snippets and templates. Edit core files only when necessary, and note why in the commit, so upstream fixes stay mergeable.
- **No external tooling.** No frameworks, CSS utility libraries, bundlers, npm runtime packages or third-party CDNs. CSS goes in `{% stylesheet %}` or `assets/` and uses custom properties. JS is Web Components on native APIs.
- **Fonts.** Use `font_picker` settings with the `font_face` and `font_url` filters, or self-host in `assets/` with `font-display: swap`. Two families at most. No Google Fonts `<link>`.
- **Images.** Use `image_url` with `image_tag`, always with `widths` and `sizes`. The LCP image (first hero or product image) is not lazy-loaded and gets `fetchpriority: 'high'`; every other image gets `loading: 'lazy'`. Fixed aspect-ratio containers prevent layout shift.
- **Icons.** Inline SVG snippets from one consistent set, with one stroke weight.
- **Motion.** CSS transitions and keyframes on `transform` and `opacity` only. At most one orchestrated moment per page. Always honour `prefers-reduced-motion`.
- **Editable by the owner.** Every string goes through the `t` filter or a setting. Every image, colour, heading and CTA the owner might change is a section or block setting with a preset. The owner must be able to restyle a season in the theme editor without code.
- **Never touch the live theme.** Work on the repo branch or an unpublished theme. The owner previews and publishes. The Shopify connector blocks live-theme writes and theme publishing; don't look for a way around that.

## Process

1. **Brief.** Read `docs/brand-guide.md`: audience, voice, visual direction, references, competitors. If a design decision isn't covered, propose one and ask. Don't assume.
2. **Plan.** Run `frontend-design`'s plan pass: 4 to 6 named colours, type roles and scale, a layout concept with ASCII wireframes for mobile first, and the principles. Check the plan against its list of generic defaults and against the checklist below before writing code.
3. **Map the plan to theme settings, not hardcoded CSS.**
   - Colours become colour schemes in `config/settings_schema.json`: a base scheme, an accent scheme and an inverse scheme. Seasonal schemes (Christmas, Valentine's) are added later, so changing season means swapping the scheme.
   - Type becomes `font_picker` settings plus a type scale as custom properties in the base CSS.
   - Spacing, radius and shadow become a small token set of custom properties, used everywhere.
4. **Build.** Adapt sections and blocks, with presets, plus alternate templates for seasonal pages (`collection.christmas.json`, `page.valentines.json`).
5. **Check.** Screenshot (below), critique with `design-critique`, fix and re-shoot, for at least two passes on any new page. Then run an accessibility pass with `liquid-theme-a11y` and `shopify theme check`.
6. **Record.** Write tokens and the reasons behind them into the brand guide's "Visual system" section so future sessions stay consistent.

## What a gift store's design has to do

The photography is the design. The look should come from the subject: unboxing, texture, the abundance of what's inside, paper, ribbon, handwritten cards. Generic "luxury" cues don't belong.

- Use one product image ratio and one lighting style across the catalog so grids look curated.
- Show what's inside early: open-box imagery, and an itemised contents list near the price.
- Write from the giver's side: who it's for, how it arrives, and what the recipient sees on opening it.
- Make deadlines visible in season (real cut-offs only). Gift buying is deadline buying.

### Page checklists

**Home**
- A hero with one promise and one primary route (usually shop by occasion). No carousel.
- Shop by occasion, recipient and price, all within the first two mobile screens.
- Bestsellers with price and a one-line contents summary.
- The delivery promise and today's cut-off, driven by settings.
- Real trust signals: reviews only if they exist, delivery and returns policy.
- One seasonal slot the owner swaps each season.

**Collection**
- A unique H1 and a short intro near the grid. Longer copy and FAQs go below the grid, for SEO.
- Filters for occasion, recipient, price, dietary and contents (Search & Discovery), plus sort.
- Product cards: image (a second image showing the open box is fine), name, price, a key contents line or true badges (Vegan, Contains alcohol, Next-day).

**Product**
- Gallery with open-box and detail shots.
- On mobile, price and add-to-cart in reach. A sticky bar is fine if it covers nothing.
- What's inside (metaobject list), gift message field, delivery estimate and cut-off, and add-ons (cards, upgrades).
- Accordions for allergens and dietary, delivery, and storage.
- Reviews, and "more for this occasion".

**Cart drawer**
- Gift message or note.
- Delivery estimate.
- A free-delivery progress bar, only if that threshold really exists.
- A card add-on.
- A clear total.

**Global**
- Search in the header.
- Navigation by occasion and recipient.
- An announcement bar for real deadlines and offers.
- Footer with delivery, returns, contact, legal and a reminders sign-up.

## Anti-generic checklist

Run this on every design before it ships. Adapted from frontend-design and taste-skill (Leonxlnx/taste-skill, MIT).

- **Type.** Fonts chosen for this brand, not the defaults. A deliberate scale. Line length under about 75 characters. Sentence case. No all-caps eyebrow over every heading. No single accented word in a headline. `text-wrap: balance` on headings.
- **Colour.** One accent, used sparingly. A single grey family tinted toward the palette. Shadows tinted to the surface rather than flat black. None of the clichés: purple-blue AI gradient, cream with terracotta, black with acid green.
- **Layout.** Not everything centred. No default three-equal-cards feature row. Varied section rhythm. A max-width container. Radius graded by hierarchy, not one radius on everything. CTAs aligned across card rows.
- **Components.** Cards only where elevation means something. No dot-carousel testimonials. No modal for simple actions. Every interactive element has a visible focus style.
- **Copy.** Plain, specific words. Never "elevate", "seamless", "unleash", "curated experience" or "in the world of". No exclamation marks in system messages. Buttons say exactly what happens ("Add to basket" or "Add to cart" per the market).
- **E-commerce honesty.** No fake countdown timers, "12 people are viewing this", invented reviews, star ratings, badges or scarcity. No "free delivery" unless it's true. No stock lifestyle photos unrelated to the product.

## Performance budget

- Core Web Vitals at the "good" thresholds on mobile (75th percentile): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1.
- The hero image is sized for mobile through `image_url` widths. No autoplaying hero video on mobile.
- Every app is a performance cost. Check an app's storefront scripts against this budget before installing it, and remove leftover code when an app is uninstalled.
- Measure with PageSpeed Insights on the preview or live URL. After launch, use the Web Performance report in Shopify admin.

## Preview, screenshot and critique loop

How to see the work:

1. **GitHub-connected theme (preferred).** The owner connects this repo's branch in admin: Online Store, then Themes, then Add theme, then Connect from GitHub. Pushes to the branch sync to that unpublished theme, which has its own preview link.
2. **Shopify CLI in a session.** `shopify theme dev --store <store>.myshopify.com --password "$SHOPIFY_CLI_THEME_TOKEN"` serves `http://127.0.0.1:9292`. The token is a Theme Access app password stored as an environment secret, never in the repo.

The cloud environment must allow `*.myshopify.com` and `*.shopify.com` for either route. If those hosts are blocked, say so, and don't fake a screenshot.

To screenshot at mobile (390px) and desktop (1440px):

```bash
NODE_PATH="$(npm root -g)" node scripts/screenshot.cjs "<preview-url>" .screenshots "<storefront password if the store is locked>"
```

Read the PNGs, critique them with `design-critique` against the plan and the checklists above, fix, and re-shoot. `.screenshots/` is git-ignored.
