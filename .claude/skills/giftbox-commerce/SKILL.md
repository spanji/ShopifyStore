---
name: giftbox-commerce
description: Playbook for this gift box and hamper store. Use before planning or changing what the store sells and how it is organised - collections and navigation (shop by occasion, recipient, contents, price, season), tags, metafields and metaobjects for boxes, hamper product titles and page content, seasonal and themed ranges (Christmas, Valentine's, Mother's Day) and when to launch them, keyword targeting for gift searches, gift features (gift messages, delivery cut-offs, add-ons, corporate orders), and food or alcohol compliance flags. Other SEO, catalog, design and campaign skills should fit the structure set here.
---

# Gift box commerce playbook

The business: gift boxes and hampers bought for birthdays and other occasions, with themed ranges (Christmas, Valentine's and so on) to follow. Read `docs/brand-guide.md` first. If a fact this playbook needs is missing (market and country, currency, price range, delivery area and speed, what goes in the boxes, dietary range, whether alcohol is sold), ask the owner and record the answer in the brand guide. Never fill a gap with an assumption.

## 1. How gift shoppers arrive

Every gift buyer starts from one of six intents. Each collection, menu item, landing page and target keyword serves exactly one primary intent, so pages don't compete with each other.

| Intent | Query shapes (illustrative, not researched volumes) | Store surface |
|---|---|---|
| Occasion | birthday hamper, thank you gift box, get well soon hamper, new baby gift | Evergreen occasion collections |
| Recipient | gifts for her, hamper for dad, teacher gifts, gifts for colleagues | Recipient collections |
| Contents or theme | chocolate hamper, prosecco gift box, vegan hamper, pamper box | Contents collections, dietary filters |
| Season or event | christmas hampers, valentines gift box, mothers day hamper | Seasonal collections on evergreen URLs, plus landing pages |
| Price or urgency | gifts under 30, next day delivery hampers | Price collections, delivery messaging |
| Corporate | corporate gift boxes, client gifts, employee hampers | Corporate page with a bulk enquiry form |

Use the market's own words. UK, Ireland, Australia and New Zealand shoppers say "hamper". US shoppers mostly say "gift basket" or "gift box". Spelling (personalised or personalized) follows the market too. Confirm the market in the brand guide before writing any copy or picking keywords. Validate demand with `seo-audit`, or with Ahrefs or Semrush once connected, before building a page for a query.

## 2. Catalog structure

### Tags drive smart collections

Use one concept per tag, lowercase, with a prefix so tags stay machine-readable:

```
occasion:birthday   occasion:thank-you   occasion:new-baby   occasion:sympathy
recipient:her       recipient:him        recipient:mum       recipient:teacher
contents:chocolate  contents:prosecco    contents:pamper     contents:savoury
diet:vegan          diet:gluten-free     diet:alcohol-free
season:christmas    season:valentines    season:mothers-day
range:<range-name>  feature:personalised delivery:next-day
```

Occasion, recipient, contents and season collections are smart collections built from `TAG EQUALS` rules. Price collections use `VARIANT_PRICE` rules. A box then appears in every collection it belongs to with no manual upkeep, and filters, landing pages and structured data all read the same facts.

### Structured box data: metaobjects and metafields

- Metaobject `box_item`: name, maker or brand, size or quantity, short description, image, allergens, diet flags, and contains-alcohol (true or false). Items are reused across boxes.
- Product metafield `custom.whats_inside`: a list of `box_item` references. It renders the "What's inside" block, keeps the description and photos honest, and feeds structured data.
- Product metafields: `custom.allergens`, `custom.dietary`, `custom.shelf_life`, `custom.packaging`, `custom.dispatch_lead_days` and `custom.gift_message` (true or false).
- Set the Shopify Standard Product Taxonomy category on every product (`shopify-category-taxonomy`). Google Shopping reads it.

Create definitions only after the owner agrees, either in admin (Settings, then Custom data) or through the Shopify connector's GraphQL mutation tools, which ask for confirmation. Use the `custom` namespace.

### Variants or separate products

- Size tiers of the same box (for example Classic, Large, Luxury) are variants only when the contents scale predictably and can share photos.
- Different contents get a separate product, with its own photos, contents list and target keyword.
- A seasonal edition of a box is a separate product, linked to its siblings by a `range:` tag.

## 3. URL and SEO architecture

1. **Evergreen handles.** Use `/collections/christmas-hampers`, never `christmas-hampers-2026`. The same URL every year keeps its links and rankings.
2. **Seasonal collections stay published all year.** Out of season, keep the intro copy and FAQs, show the range as "back on <month>" or as last year's boxes sold out, and add an email sign-up for first access. Unpublishing throws the rankings away. If a page must go, 301-redirect it (`shopify-redirect-mapping`).
3. **One primary keyword per page.** Two pages chasing the same intent (a "birthday gifts" collection and a "birthday hampers" page, say) split the ranking. Merge them, or give each a distinct intent.
4. **Collection pages are the money pages for gift search.** Each needs a unique H1, a short intro near the grid, longer copy and occasion-specific FAQs below it (delivery, personalising, dietary), and links to sibling occasions and recipients. Never reuse intro text across collections.
5. **Product handles are descriptive and permanent**, for example `birthday-brunch-hamper`. If a handle changes, create the 301 redirect in the same change.
6. **Use filters, not collections, for attributes without their own search demand.** Contents, dietary and price within a collection go in the Search & Discovery filters. Only create a collection for an attribute when it has real search demand.
7. **Blog posts and gift guides take informational queries**, such as "what to put in a birthday hamper" or "gift ideas for new mums", and link to the matching collections.
8. **Structured data:** the theme emits Product data. Add Organization, FAQPage (for real FAQs on the page) and BreadcrumbList where missing (`shopify-json-ld`). Never mark up reviews that don't exist.

## 4. Hamper product page content model

Use this order in the description and on the page:

1. **Title.** The words a buyer searches, plus the distinguishing detail: "Birthday Prosecco & Chocolate Hamper", not "The Celebration No. 3". Put brand names in titles only when the brand itself sells.
2. **One-line promise.** Who it's for and the moment it's for.
3. **What's inside.** Every item with its size, from `custom.whats_inside`. It must match the photos exactly.
4. **Presentation.** Box, wrapping, ribbon, card.
5. **Personalising.** Gift message (say whether it's free and the character limit) and card options.
6. **Delivery.** Dispatch days, the daily cut-off, delivery options, delivery to the recipient's address, and a packing slip with no prices.
7. **Dietary and allergens.** Plus age limits on alcohol.
8. **Storage and shelf life.**
9. **Reviews, FAQs, and more boxes for the same occasion or recipient.**

Photos for each box:

- Styled hero shot, box closed or lid off.
- Open flat-lay showing every listed item.
- Two or three detail shots.
- One scale or lifestyle shot.
- The gift card or message.

Use one aspect ratio across the catalog (decide once, for example 4:5) and consistent light and background, so grids look curated. Alt text describes the image, not the product title (`shopify-alt-text`).

Never invent contents, sizes, sourcing claims ("handmade", "local", "organic", "award-winning"), review counts, ratings or delivery promises. Ask the owner.

## 5. Gift features and how to deliver them on Shopify

| Feature | Approach |
|---|---|
| Gift message | Line-item property field on the product page or a cart attribute. Theme-level, no app needed. Show the character limit. |
| Delivery cut-off | Theme messaging driven by settings the owner controls ("Order by 2pm for same-day dispatch"). Use real cut-offs only, never fake countdown timers. A date picker needs an app. |
| Send to the recipient | Native at checkout. Reassure on the product page and in the cart ("Sending a gift? Add their address at checkout."). Remove prices from the packing slip template in shipping settings. |
| Add-ons (cards, balloons, upgrades) | Complementary products (Search & Discovery) shown on the product page and in the cart. |
| Fixed bundles | Shopify Bundles app. Leave build-your-own boxes until demand is proven; they need an app or a custom section. |
| Corporate orders | Page with bulk tiers, branding options and an enquiry form. Native B2B pricing depends on the plan, so check the plan before promising it. |
| Occasion reminders | "Remind me next year" sign-up, feeding email flows (`email-sequence`, with Klaviyo once connected). Birthdays repeat every year, so this is the store's retention engine. |
| Gift cards | Native Shopify gift cards. The fallback after the last delivery date for a season. |

## 6. Seasonal and themed ranges

Dates, demand windows and the next 12 months of key days are in [references/seasonal-calendar.md](references/seasonal-calendar.md). The launch rhythm, counting back from the day:

- **T−12 weeks:** range decided, products created as drafts, photography booked.
- **T−8 to 10 weeks:** seasonal collection live and refreshed on its evergreen URL: copy, FAQs, links from home and menu. Landing page concepts (`ecom-landing-pages`, gift and seasonal archetypes).
- **T−6 weeks:** products active, campaign planned (`campaign-plan`), email and social calendar set.
- **T−3 to 4 weeks:** email pushes. Last order dates published on the site.
- **Peak:** real cut-off banners. After the last delivery date, switch the promotion to gift cards.
- **After:** the page stays live in its "back next year" state. Review results (`performance-report`).

Seasonal looks are colour-scheme and template swaps, not code changes (`storefront-design`).

## 7. Compliance flags for the owner (flags, not legal advice)

- **Food:** in the UK and EU, the mandatory food information (including allergens) must be available to the buyer before a distance sale is concluded. For prepacked items, copy allergens and ingredients exactly from the item labels. Never infer them. Shelf life matters for hampers that sit in a warehouse.
- **Alcohol:** selling it needs the right licence, and delivery needs age verification. In the US, shipping alcohol is regulated state by state. Raise this before any alcohol box is listed.
- **Claims:** "vegan", "gluten-free", "organic", "handmade" and "local" must be true and supportable.
- **Prices:** show delivery costs early. UK and EU consumer prices include VAT.

Put each of these to the owner as a question, and point them to the relevant authority or adviser.
