# Brand guide

The single source of truth for who the store is. Every skill reads this before writing copy, choosing keywords or designing. Replace each `TBD` as the owner decides. Don't guess entries; ask.

## Business

- **What we sell:** gift boxes and hampers: curated boxes of items, bought as gifts for birthdays and other occasions.
- **Roadmap:** themed and seasonal ranges to follow (Christmas, Valentine's Day, and others to be decided).
- **Store name:** Bow and Bloom (Shopify store settings, checked 9 Oct 2026)
- **Market and country we ship to:** United Kingdom. Checkout ships to GB only (store settings, checked 9 Oct 2026). So: "hamper", "basket", UK spelling ("personalised"), prices shown including VAT, and the UK seasonal calendar.
- **Currency:** GBP (£)
- **Price range per box:** £39. One box at launch: Birthday Pamper Hamper for Her, with an Occasion option (Birthday or Other celebration) at the same price.
- **Delivery:** Evri, UK only. Free tracked delivery (2–5 working days) on every order. Next day £2.99, worded "usually next working day" because Evri doesn't guarantee it. Order by 12pm Mon–Sat for same-day dispatch; Sunday orders go out Monday.
- **What goes in the boxes:** pamper and beauty (skincare, soaps), accessories (socks, hair accessories, sleep mask, keyring, mirror, phone grip) and sweets. No alcohol.
- **Dietary range:** the launch box isn't gluten-free, vegetarian or vegan: two of the jar sweets contain wheat, the chew bar contains soya, and most gummies contain beef gelatine. No alcohol. Full record in `docs/allergens.md`.
- **Made by us or sourced:** all items are bought in, unbranded. Skincare, soaps and accessories come from overseas sites; sweets come from UK wholesalers, and the gummies are repacked into jars by us.
- **Business set-up:** sole trader, run by Janna Serry, not yet registered with HMRC or for VAT. Policies show her name, the email and the mobile number.
- **Address:** the owner agreed on 9 Oct 2026 to show the Bradford home address (17 Lady Royd Close, BD8 0FD) on the policies. No separate legal notice: the terms and contact information carry the name and address the UK rules ask for.
- **Policies:** the owner chose on 9 Oct 2026 to run with no store policies, privacy included, and add them back later if needed. Short legal-minimum versions are ready in `docs/policies/` (paste page: `paste-into-shopify.html`; privacy is Shopify's own generator). Footer policy links and the FAQ's refund-policy link were removed; the theme's "Terms and Policies" footer link hides itself when no policies exist. Google Shopping needs a returns policy and contact details, so add those back before setting it up.
- **Food business registration:** registered with Bradford Council on 9 Oct 2026 (owner confirmed).
- **Compliance (flags, not legal advice):** sweets' ingredients and allergens are on the product page and the FAQ answers allergens (10 Oct 2026). Distance-sold food is outside the PPDS (Natasha's Law) label rules, so the jar needs no sticker; FSA guidance says allergen information must still be given before purchase and again at delivery, in writing or orally, so for a posted box it goes in the box in writing. The chew bar and lollipop wrappers carry their own ingredients (owner, 10 Oct 2026). Still to do: check every skincare item and the soaps for an English ingredients list and a UK Responsible Person address, and swap any that fail for UK-wholesale versions.
- **Corporate gifting:** yes or no, and minimum order: TBD
- **Social accounts:** TikTok [@bowandbloomgiftboxes](https://www.tiktok.com/@bowandbloomgiftboxes); the store link is in its bio. No other accounts yet. The TikTok icon is in the "Bow and Bloom launch" theme footer.
- **Domain:** none yet; the store runs on t4qigc-9u.myshopify.com.

## Audience

- **Primary buyers:** friends buying for friends, partners, family (daughters, sisters, mums), and people treating themselves.
- **Top occasions, in order:** TBD
- **What they worry about when buying a gift online:** TBD (arriving on time, looking good on opening, the recipient's dietary needs, ...)

## Positioning

- **One-sentence promise:** Gifts for every moment (tagline in the logo). Card line: "Small gifts for big moments".
- **Why us over the alternatives:** a personal, warm voice where competitors are generic; a beautifully presented pink box with 17 items; free tracked delivery at £39.
- **Competitors and references** (stores the owner admires or competes with): marketplace pamper boxes at £14–£33 with keyword-stuffed titles (Amazon and YPC-style listings), charity-shop letterbox hampers, and Hampers.com. Most charge delivery under £50.

## Voice

- **Three words for how we sound:** warm, playful, personal. Chosen 9 Oct 2026 after keyword research ("pamper hamper" and "birthday hamper for her" lead UK searches).
- **We say / we never say:** TBD
- **Sample copy the owner is happy with:** "Seventeen little treats, wrapped in pink tissue and tied with a satin bow. A pamper night, something sweet and a few cute extras, all in one box she'll want to unbox on camera."
- **Words:** "hamper", "pamper", "treats", "for her"; UK spelling.

This is where the owner's writing voice is stored. Skills that mention `.claude/shared/voice-profile.md` should use this section instead.

## Visual system

Filled in by the `storefront-design` process. Record the decision and the reason.

- **Palette** (named hex values and their roles), matched to the logo and banner on 9 Oct 2026: Cream #FBF4EF (page background), Petal #F3E3DC (alternate sections), Rosewood #9C5B5F (primary buttons, white text 5.1:1; links on cream 4.7:1), Deep rosewood #7E4549 (links on petal), Dusty rose #D7A9A6 (delivery band, borders), Cocoa #4A2C2A (text, footer, announcement bar; from the logo ink), Sage #8C9A80 (eucalyptus; tiny accents only). Replaces the earlier brighter blush and rose.
- **Typefaces and type scale:** Playfair Display for headings (close to the logo's high-contrast serif) with Assistant for body, menus and buttons. Two families only. Scale is the theme's presets.
- **Photography style and product image ratio:** real photos of the actual box only (the launch image is AI-enhanced and must be replaced). Warm daylight, pink tissue and ribbon, open-lid hero shot plus close-ups. Product cards crop square.
- **Spacing, radius and shadow tokens:** theme defaults for now: pill buttons (radius 37), 8px inputs, no card shadows.
- **Seasonal colour schemes:** none yet. Theme colour schemes: scheme-1 cream base, scheme-2 cocoa overlay, scheme-3 cocoa (footer, announcement), scheme-4 petal (hamper feature), scheme-5 dusty rose (delivery band), scheme-6 rosewood (marquee, sale badge). Add Christmas or Valentine's as new schemes rather than editing these.
- **Logo files:** `docs/brand/` holds the banner, the wordmark (header logo, transparent PNG cut from the banner), the BB monogram and the favicon. The same files are in Shopify Files as bow-and-bloom-*. The banner shows flowers, which the store doesn't sell, so the homepage headline directly under it names the product.
- **Theme:** "Bow and Bloom launch" (copy of the Horizon-family Balance theme, created 9 Oct 2026) holds the new homepage, colours, fonts, announcement bar, footer and the free gift message field. It is the live theme. "Bow and Bloom v2 (ribbon)" (theme 197109285197, created 10 Oct 2026, unpublished) adds the ribbon layer below; the owner previews and publishes it. Its files are copied in `theme/`.
- **Bow motif** (10 Oct 2026): one satin bow vector, two loops, a knot and two tails, in `theme/snippets/bow.liquid` (filled, or `style: 'line'` to draw itself) and as CSS masks (`--bb-bow`, `--bb-pattern`) in `theme/assets/bow-and-bloom.css`. It is the brand mark everywhere small: list bullets, FAQ group headings, the gift message heading, the chosen occasion, the add-to-basket icon. Reason: the box ships tied with a satin bow, so the bow is the thing customers actually see on opening.
- **Ribbon divider:** a "Ribbon divider" section (`theme/sections/ribbon-divider.liquid`) with ribbons that unroll and a bow that draws itself on scroll. Use it between major sections, not between every one.
- **Pattern:** a faint tiled bow pattern (6–7.5% of the text colour) on dusty rose (scheme-5) sections, the password page and anything with the `bb-pattern` class. Only in empty space, never behind body text on cream.
- **Motion budget:** no page intro. The owner chose "never, or small": each page title gets a small bow that ties itself above it once (0.9s). Everything else is a micro-interaction: satin sheen and lift on buttons, the bow wiggle on add to basket, one shimmer on the add-to-basket button after load, and scroll reveals only for content that starts below the fold. All of it uses transform and opacity, and all of it switches off for `prefers-reduced-motion`.
- **Questions:** FAQ answers open on tap or click (`<details class="bb-faq">`), not hover, because most visitors come from TikTok on phones, which have no hover. The plus turns into a cross. Source copy in `docs/content/`.
- **Product page emphasis:** the title is balanced and larger, the price uses the heading font in rosewood, and the add-to-basket button is a deeper rosewood (white text, above 5:1) so it is the strongest thing on the page. The sticky add-to-basket bar keeps the basket icon so its purpose is unambiguous.
- **Hero placement:** a split hero on desktop (promise, button and trust points beside the banner), so the hamper photo starts on the first screen. On mobile the button is on the first screen and the hamper directly follows. Reason: the banner shows flowers, which the store doesn't sell, so the product has to arrive fast.

## Seasonal learnings

Notes after each season on what to repeat and what to change.
