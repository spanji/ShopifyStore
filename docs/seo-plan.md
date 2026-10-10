# SEO and shop settings plan

Written 10 Oct 2026, before launch (password on). Built from an audit of the store and the v2 theme preview, web research on UK gift searches and competitors, and the owner's answers on 10 Oct 2026. Recheck 30 days after launch, then monthly.

## The short version

- **TikTok brings the first sales; Google comes later.** A new shop takes months to earn Google rankings, and Hampers.com owns the big searches ("birthday hampers for her", "pamper hamper for her"). The realistic early Google wins are free Google Shopping listings (photo and price in search results) and long, specific gift searches ("birthday gift ideas for my best friend under £40").
- **The selling point to use everywhere: free tracked delivery at £39.** Most competitors charge for delivery under £50 or £60.
- **The five things that matter most, in order:**
  1. Real photos and a short video of the actual box (Google Shopping, trust, every channel).
  2. Shop settings: name, homepage title and description, share image, brand, policies (section 1.1).
  3. A web address of your own, before launch (decision tomorrow).
  4. At launch: Google Search Console, Google & YouTube app (free listings), TikTok app (tracking).
  5. One gift guide a month aimed at a real search, plus TikTok videos that say the words people search.

Nobody can promise a ranking or a date. Nothing below will show results within the first 30 days, so we judge it after a month, not a week.

## Progress

- **10 Oct 2026, done:**
  - Batch 1 (1.2): search titles and descriptions for FAQ, About, Contact and Corporate; blog renamed "Gift ideas" (/blogs/gift-ideas, with /blogs/news redirecting).
  - Theme fixes (1.3) on "Bow and Bloom v3 (SEO)":
    - one H1 on the homepage
    - width-based image sizes, with the hero loading first: main picture at about 2.6 s on the slow-4G phone test, down from 4.4 s
    - business details with email, phone, address and TikTok; returns appear once the refund policy exists, and the alternate name once the store name is "Bow & Bloom"
    - FAQ questions as structured data
    - copy and four questions below the birthday hampers grid, through a new `collection.birthday-hampers` template the collection now uses
  - The live v2 theme falls back to the normal collection layout until v3 is published.
- **10 Oct 2026, later:**
  - Product category set to Bath & Body Gift Sets, and its Google fields filled (Pink, Female, Adults, Gift box, Special occasion).
  - The two variants are merged into one shared stock count of 17. The Birthday or Other celebration choice is now an order note, built into v3.
  - Until v3 is published, the live v2 product page shows no occasion choice. The store is locked, so no buyer sees this.
- **Waiting on the owner:** shop settings (1.1), policies, photos (1.4), domain (1.5), publishing v3.

## Decisions (owner, 10 Oct 2026)

| Topic | Decision |
|---|---|
| Name | Written as **Bow & Bloom** everywhere people read it (matches the logo, box and videos). "bowandbloom" in web addresses and handles. Structured data lists "Bow and Bloom" as an alternate name, so both spellings point to one business. Owner asked for whichever performs best; search treats "&" and "and" the same, so consistency is what counts. |
| Domain | Owner decides tomorrow. Checked 10 Oct: bowbloom.com taken; bowbloomgifts.com and bowbloomgiftboxes.com available. .co.uk names not checked yet. |
| Christmas 2026 | Skipped. |
| Policies | Only the two Google Shopping needs go back: refund policy and contact information (owner changed this on 10 Oct 2026; the other three were inaccurate or too invasive). |
| Main buyers | Best friends, partners and girlfriends, family (mum, sister, daughter). |
| TikTok bio link | Straight to the product page, with tracking added. |
| TikTok Shop | Maybe later. Install the free TikTok app now for tracking only. |
| Time for content | Unsure. Plan for one gift guide a month; anything more is a bonus. |
| Photos | Real photos before launch. Shot list in 1.4. No paid greeting-card shot (the paid card add-on isn't the free message). |
| Local | Online only, so no Google Business Profile (Google doesn't list online-only shops on Maps). |
| Budget | Free tools only for now. |
| Packing videos | Yes, filmed sometimes; no tick box for buyers. |

## Keyword map: one page, one search

Demand is not measured yet: no keyword tool is connected. Validate with Google Keyword Planner (free with a Google Ads account, no spend needed) and with Search Console once the shop is live.

| Page | Main search it targets | Supporting phrases | State |
|---|---|---|---|
| Homepage | pamper hampers for her | gift boxes for her UK, Bow & Bloom | Title and description missing (1.1) |
| /collections/birthday-hampers | birthday hampers for her | birthday gift box for her, birthday hamper UK | SEO fields set; needs copy and questions below the box (1.3) |
| /products/birthday-pamper-hamper-for-her | birthday pamper hamper for her | pamper box for her, best friend birthday box | SEO fields set; needs real photos (1.4) |
| /pages/faq | delivery, gift message and allergen questions | | Description is messy text pulled from the page (1.2) |
| Gift guides (blog) | one long search each, see 3.1 | | Blog empty; rename it (1.2) |
| Later: /collections/mothers-day-hampers | mothers day pamper hamper | hampers for mum | Decide by early Dec; page live by about 10 Jan 2027 |

With one box, the homepage, collection and product overlap a little. That's normal. When a second box arrives, the homepage moves to the brand and broad "gift hampers for her", and each box gets its own search.

## 1. Before launch (while the password is on)

### 1.1 Shop settings you change in Shopify admin

Exact text to paste. About 20 minutes in total.

1. **Settings → Store details → Store name:** `Bow & Bloom`. Every page title ends with this.
2. **Online Store → Preferences:**
   - Homepage title: `Pamper Hampers & Birthday Gift Boxes for Her | Bow & Bloom` (58 characters). Still empty on 10 Oct 2026; given to the owner again.
   - Homepage meta description: `Pink pamper hampers for her, packed by hand in Yorkshire and tied with a satin bow. 17 treats for £39 with free tracked UK delivery.` (132)
   - Social sharing image: the hamper photo for now (not the banner, which shows flowers we don't sell). Swap in the new real hero photo when you have it. This is the picture WhatsApp, iMessage and Facebook show when someone shares the link.
   - Password page message (TikTok visitors see this until launch): `Our birthday pamper hampers are almost ready. Leave your email and we'll let you know as soon as we open.`
3. **Settings → Brand:** wordmark as logo, BB monogram as square logo, primary colour #9C5B5F, contrasting colour #FBF4EF, slogan `Gifts for every moment`, short description `Pamper hampers for her, packed by hand in Yorkshire. Free tracked UK delivery.`, social link to the TikTok profile. The Shop app and Shopify's product feeds to AI assistants read these.
4. **Settings → Policies:** paste the refund policy and contact information (copy kept in `docs/policies/policies.md`). The footer's "Terms and Policies" link comes back by itself once they exist.
5. **Settings → Checkout:** turn on "Show a sign-up option at checkout" for email marketing, and leave it unticked (UK rules don't allow pre-ticked boxes).
6. **Settings → Shipping and delivery → Packing slips:** print a test slip and check it shows no prices, because boxes often go straight to the recipient.
7. **Settings → Notifications → Customise email templates:** add the logo and the rosewood colour.
8. **Marketing → Automations:** turn on the abandoned checkout email (free, built in).
9. **Settings → Apps → Sales channels:** if your admin offers Shopify's AI shopping channel ("Agentic storefronts"), turn it on. It shares the product feed with assistants such as ChatGPT and Copilot. Treat it as a bonus, not a plan.

### 1.2 Store changes I make after your yes (batch 1)

| Page | Search title | Search description |
|---|---|---|
| FAQ | FAQs: Delivery, Gift Messages and Allergens | How delivery works, when your box is sent, personalised notes, allergens and returns: answers to common questions about our pamper hampers. |
| About us | About Us: Hampers Packed by Hand in Yorkshire | Bow & Bloom is a small gift shop in Yorkshire. Every pamper hamper is packed by hand, wrapped in pink tissue and tied with a satin bow. |
| Contact | Contact Us | Questions about an order or a gift? Email bowandbloomgifts@outlook.com or call 07597 600465. We're a small gift shop in Bradford. |
| Corporate & bulk orders | Corporate and Bulk Gift Hampers | Pamper hampers for teams, clients and events. Tell us how many boxes you need and when, and we'll come back to you with a quote. |
| Blog | Rename "News" to "Gift ideas", web address /blogs/gift-ideas (free to change now, before any posts) | Birthday gift ideas for best friends, partners, sisters and mums, with tips from the people who pack our pamper hampers. |

Shopify adds " – Bow & Bloom" to each title, which keeps them all under 60 characters. Once the policies are live, the FAQ's returns answer also gets a link to the refund policy.

### 1.3 Theme fixes, on "Bow and Bloom v3 (SEO)" (unpublished; you publish)

1. **One main heading on the homepage.** The logo and the hero headline are both marked as the page's main heading (H1). Keep the hero headline, "Birthday hampers she'll love". (v6, 10 Oct 2026: the banner stands alone and "Hampers for…" below it is the H1.)
2. **Faster first picture on the homepage.** The banner is the first thing that loads but isn't marked as a priority, and it's sized for 1x/2x/3x screens rather than the screen's real width. Rough phone test (slow 4G, mid-range phone): the main picture appeared after about 4.3 s, on the edge of Google's "poor" rating. The preview bar adds weight that customers won't get. Re-measure with PageSpeed Insights after launch.
3. **Business details for Google and AI assistants:**
   - Business: add the alternate name "Bow and Bloom", the TikTok profile, the email, phone and address.
   - Returns (14 days, by post, buyer pays postage), stated once for the whole shop and switched on automatically when the refund policy exists. Delivery details reach Google Shopping through Merchant Center's shipping settings.
   - FAQ page: questions-and-answers markup.
   - Never mark up ratings until real reviews exist.
4. **Collection page:** a short intro near the box, then longer copy and 4–5 questions below it (delivery, gift message, allergens, sending to her address). It's thin today at 96 words.

### 1.4 Photos and video (before launch)

Same spot by a window, daylight, no flash, plain cream or white background. Shoot upright in 4:5 at the phone's 1x lens, and send the originals at full size (WhatsApp shrinks them).

1. **Hero:** box with the lid off, slight angle, ribbon visible. This becomes the main photo.
2. **Flat-lay from above:** all 17 items laid out around the box. This proves "what's inside".
3. **Close-up:** the pamper set (roller and gua sha, mask, eye patches, lip balm, soaps).
4. **Close-up:** cosy and handbag treats (sleep mask, socks, scrunchie, clips, mirror, keyring, phone grip).
5. **Close-up:** the sweet jar, lollipop and chew bar.
6. **Closed box tied with the satin bow:** what actually arrives. Optionally, a handwritten free message card next to it.
7. **Video:** 15–30 s, upright, the lid lifting or the box being packed. It goes on the product page and on TikTok.

I write alt text for each photo once they're in. If there's a larger original of the banner, send it: the current file is 767 × 512 pixels and looks soft on big screens.

### 1.5 Domain (owner decides tomorrow)

Not required to sell, but best done before launch:
- It goes in the TikTok bio, on cards and packaging, and in every link people share.
- A shop on its own .co.uk or .com looks real, while a myshopify address looks like a test shop.
- Google builds its history on the domain from the first day. Shopify redirects the old address automatically, so a later switch isn't a disaster, but it's cleaner done once.

Buy it in Shopify (Settings → Domains), set it as the primary domain, and Shopify handles the redirects and security certificate.

## 2. Launch week (password off)

1. **Google Search Console:** verify the domain and submit `/sitemap.xml`. While the password is on, the sitemap returns "not found", which is normal. Ask Google to index the homepage, product and collection.
2. **Bing Webmaster Tools:** import from Search Console in one click. Bing also feeds Copilot and some ChatGPT search results.
3. **Google & YouTube app:** connect Merchant Center for free listings, and connect Google Analytics. Needs the policies, contact details and real photos.
4. **TikTok app:** connect the TikTok pixel so Shopify shows which videos lead to sales. Leave TikTok Shop off.
5. **TikTok bio link:** `https://<your domain>/products/birthday-pamper-hamper-for-her?utm_source=tiktok&utm_medium=social&utm_campaign=bio`. Until a custom domain exists, use bowandbloomgifts.myshopify.com (the old t4qigc-9u address redirects there, so an existing link still works).
6. **Checks:** Google's Rich Results Test on the product page, PageSpeed Insights on mobile, and a real order on a phone from inside the TikTok app's browser.
7. **Judge.me (free):** install, and set the review request email for about 10 days after dispatch.

## 3. First 90 days

### 3.1 Gift guides: one a month

I draft each one, about 800–1,200 words, with genuinely useful ideas rather than only "buy ours". You check it (about 15 minutes) and add one of your own photos. Each links to the hamper. Order, matched to your buyers:

1. Birthday gift ideas for your best friend (UK, under £40)
2. What to put in a pamper hamper: ideas for a proper self-care night
3. Birthday gifts for your girlfriend she'll actually use
4. Birthday gift ideas for your sister, or your mum
5. Last-minute birthday gifts with next-day delivery (honest wording: "usually next working day", because Evri doesn't guarantee it)
6. Mother's Day pamper hamper ideas, live by about 10 Jan 2027

Don't embed TikTok players in posts: they load heavy scripts. Link to the video instead, or upload the clip to Shopify.

### 3.2 TikTok search

TikTok reads captions, on-screen text, spoken words and hashtags.
- **Display name:** `Bow & Bloom | Gift Hampers` (26 characters; the name is searchable).
- **Bio:** `Birthday pamper hampers 🎀 Packed by hand in Yorkshire · Free UK delivery` (about 73 characters).
- **Every video:** type the phrase into TikTok's search bar first and use the exact suggestion it offers, for example "birthday gift for best friend" or "pamper hamper ideas". Then:
  - say it in the first 3 seconds
  - put it on screen as text
  - use it in the caption with 3–5 hashtags, for example #birthdaygiftideas #pamperhamper #giftsforher #packingorders #smallbusinessuk
- **Video ideas:**
  - packing orders, with no names, addresses or labels in shot
  - "what's inside" in 20 seconds
  - "what I'd get my best friend for her birthday"
  - recipient reactions, with their permission
  - video replies to comments
- Pin your 3 best videos and group the rest into playlists ("Packing orders", "What's inside").
- **If you have time:** post the same videos to YouTube Shorts (Google shows Shorts in search), then Pinterest, which works like a gift-idea search engine.

### 3.3 Reviews

Judge.me asks each buyer for a review about 10 days after dispatch, with a photo if they like. Stars appear in Google only once real reviews exist. Never write, buy or swap reviews, and say so if a review was given in return for something. UK law has banned fake and hidden-incentive reviews since April 2025.

### 3.4 Links and mentions

- **Local press:** a "new Bradford gift business" story in the Telegraph & Argus is a strong, honest link.
- **Gift guides by UK bloggers and small creators:** offer a box for an honest review, clearly marked #gifted or #ad.
- **Small Business Saturday UK, Sat 5 Dec 2026:** a TikTok post on the day.
- **No paid link packages, link swaps or directory spam.** They do harm.

### 3.5 Seasons (Christmas 2026 skipped)

| Day | Decide by | Page live by | Angle |
|---|---|---|---|
| Galentine's (13 Feb) and Valentine's (14 Feb 2027) | mid Nov | early Dec | Best friends and partners, your two biggest buyer groups. The same box, or a Valentine's edition. |
| Mother's Day (Sun 7 Mar 2027) | early Dec | about 10 Jan 2027 | Family buyers. Likely the biggest pamper-hamper day of the year. |
| Christmas 2027 | Jul 2027 | early Sep 2027 | Revisit next year. |

Seasonal pages keep the same web address every year and stay live out of season.

## 4. Apps

**Install (all free):**

| App | By | Why | When |
|---|---|---|---|
| Google & YouTube | Google | Free product listings on Google Search, Shopping, Images and YouTube; connects Google Analytics | Launch week, after policies and photos |
| TikTok | TikTok | The pixel shows which videos sell; TikTok Shop can be switched on later | Launch week |
| Judge.me Product Reviews | Judge.me | Review request emails, photo reviews, stars in Google once real reviews exist. The free plan covers what you need now; check the current plan page when you install. | Launch week |
| Shopify Email | Shopify | A welcome email for footer sign-ups and occasional news, within a free monthly allowance | First month |

**Later:** Search & Discovery (Shopify, free) once there are 3 or more products, for filters and "goes well with" suggestions. Pinterest (free) if you start a Pinterest account.

**Skip:**
- SEO "booster" apps: they add scripts and do what we're doing for free.
- Image compressors: Shopify already serves WebP and resizes images.
- Spin-to-win pop-ups, "someone in Leeds just bought" pop-ups and fake countdown timers.
- Page builders.

Every app adds weight to the shop, so check the speed again after each install.

## 5. Measuring it

- **Weekly, in Shopify Analytics:** sessions by referrer (TikTok, Google, direct), conversion rate, top landing page.
- **Monthly, in Search Console:** searches that showed the shop, clicks and pages indexed.
- **30 days after launch:** rerun the audit and compare.

## 6. What we won't do

- Hidden text, stuffed titles like the Amazon listings, or invented claims, awards and reviews.
- Many near-identical pages with one word swapped.
- Instructions aimed at AI assistants hidden in pages.
- Fake urgency or fake discounts.

## Appendix: audit findings, 10 Oct 2026

Checked on the v2 preview (theme 197109285197, live since the owner published it on 10 Oct 2026) and through the Shopify connector. Not checkable while the password is on: sitemap.xml, how Google sees the live shop, real-world speed.

| Finding | Status | Fix |
|---|---|---|
| robots.txt allows all search and AI crawlers | Good | none |
| Pages render without JavaScript; every image has alt text | Good | none |
| Product: search title and description set, tagged, categorised (Gift Giving), 301 redirect from the old address | Good | Checked with `shopify-category-taxonomy` on 10 Oct 2026: "Gift Giving" (ae-3-1) is a broad parent; "Health & Beauty > Personal Care > Cosmetics > Bath & Body Gift Sets" (hb-3-2-2) is the closest specific match for a pamper box. Switched on the owner's yes, 10 Oct 2026. |
| Product structured data (ProductGroup, two variants, price, stock) | Good, incomplete | Add delivery and returns (1.3) |
| Homepage title is just the shop name; no description; no share image | Needs work | 1.1 |
| Homepage has two main headings (H1) | Needs work | 1.3 |
| FAQ, About, Contact, Corporate: no search fields; Google would use messy page text | Needs work | 1.2 |
| Collection page thin (96 words) | Needs work | 1.3 |
| Blog empty, named "News" | Needs work | 1.2, 3.1 |
| One product photo, AI-enhanced | Needs work | 1.4 |
| Business structured data: name, logo and web address only | Needs work | 1.3 |
| No domain; no Google or TikTok channel | Not started | 1.5, 2 |
| Policies empty | In progress: refund and contact only | 1.1 |
| Homepage main picture about 4.3 s on a slow-4G phone test | Borderline | 1.3; re-measure after launch |
| llms.txt | Not possible | Shopify doesn't allow files at the site root. Shopify publishes its own agents.md and product feeds for AI assistants. |

## Sources

- Hampers.com, birthday hampers for her and pamper hamper for her listings (Google results, 10 Oct 2026): https://hampers.com/birthday-hampers/hampers-for-her, https://hampers.com/pamper-hamper-for-her
- TikTok search ranking signals (vendor guides, treat numbers as untested): https://www.socialpilot.co/blog/tiktok-seo, https://www.capcut.com/create/tiktok-caption-keywords-discoverability
- Gen Z search behaviour, US survey 2026: https://www.engageweb.co.uk/blog/number-of-gen-z-users-using-tiktok-over-google-falls
- Packing-order videos: https://www.seamanpaper.com/blog/packing-videos-the-new-unboxing
- Google free listings: https://support.google.com/merchants/answer/13889434
- Judge.me: https://apps.shopify.com/judgeme
- Shopify Agentic Storefronts (third-party summaries; check Shopify's own docs): https://www.ringly.io/blog/agentic-storefront-shopify
