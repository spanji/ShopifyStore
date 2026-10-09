# Third-party skills

The skills below are vendored unmodified into `.claude/skills/` (and `.claude/shared/`) by `scripts/vendor-skills.sh` at the pinned commits. Each keeps its upstream licence text next to it (`LICENSE` or `LICENSE.txt`). To update one, change its commit in the script, re-run it, and review the diff before committing.

| Skills | Source | Commit | Licence |
|---|---|---|---|
| `shopify-liquid-themes`, `liquid-theme-standards`, `liquid-theme-a11y` | [Shopify/liquid-skills](https://github.com/Shopify/liquid-skills) `plugins/liquid-skills/skills/` | `ae3e4cc3f454` | MIT, as declared in the upstream `plugin.json` (the repo ships no licence file) |
| `frontend-design` | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) `plugins/frontend-design/skills/` | `ac996c0dde7f` | Apache-2.0 (`LICENSE.txt` in the skill) |
| `design-critique` | [anthropics/knowledge-work-plugins](https://github.com/anthropics/knowledge-work-plugins) `design/skills/` | `ae1513ea94dc` | Apache-2.0 |
| `seo-audit`, `brand-review`, `draft-content`, `campaign-plan`, `competitive-brief`, `email-sequence`, `performance-report` | anthropics/knowledge-work-plugins `marketing/skills/` | `ae1513ea94dc` | Apache-2.0 |
| `seo-ai-visibility`, `review-reputation`, `inventory-planner`, plus `.claude/shared/*.md` | anthropics/knowledge-work-plugins `small-business/` | `ae1513ea94dc` | Apache-2.0 |
| `shopify-seo-metadata`, `shopify-alt-text`, `shopify-json-ld`, `shopify-category-taxonomy`, `ecom-landing-pages`, `shopify-catalog-audit`, `shopify-catalog-cleanup`, `shopify-redirect-mapping` | [kgelster/awesome-ecom-skills](https://github.com/kgelster/awesome-ecom-skills) `skills/` | `0b6f9e51b4a1` | MIT, © 2026 Kurt Elster |

Project-owned files:

- `.claude/skills/giftbox-commerce/` and `.claude/skills/storefront-design/` are this project's own skills. `storefront-design`'s anti-generic checklist is adapted from [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT, © 2026 Leonxlnx) and frontend-design.
- `.claude/CONNECTORS.md` follows the `~~category` placeholder convention from anthropics/knowledge-work-plugins (Apache-2.0); the store-specific mapping is this project's own.

Every vendored file was reviewed before it was committed: no executable scripts, no hidden or bidirectional Unicode, no instructions aimed at the model, and the only network calls go to the store's own domain.
