#!/usr/bin/env bash
# Vendors third-party Claude skills into .claude/skills at pinned commits.
#
# Usage: scripts/vendor-skills.sh
#
# Each SOURCES entry is: <owner/repo> <commit> <license file or -> <path>...
# A path ending in /skills/<name> lands in .claude/skills/<name>.
# A path under small-business/shared lands in .claude/shared (those skills
# reference ../../shared/ from their SKILL.md).
#
# To update a source: change its commit, re-run, review `git diff`, commit.
# Custom skills (storefront-design, giftbox-commerce) are never touched.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="$ROOT/.claude/skills"
SHARED_DIR="$ROOT/.claude/shared"

SOURCES=(
  "Shopify/liquid-skills ae3e4cc3f454923e388bbd841fd931f0c7bf5be4 -
    plugins/liquid-skills/skills/shopify-liquid-themes
    plugins/liquid-skills/skills/liquid-theme-standards
    plugins/liquid-skills/skills/liquid-theme-a11y"
  "anthropics/claude-plugins-official ac996c0dde7fb2a9f805cd5277ffc95ecd44a321 -
    plugins/frontend-design/skills/frontend-design"
  "anthropics/knowledge-work-plugins ae1513ea94dcb74a7f1505ddcf3b0ec3fab327f1 LICENSE
    design/skills/design-critique
    marketing/skills/seo-audit
    marketing/skills/brand-review
    marketing/skills/draft-content
    marketing/skills/campaign-plan
    marketing/skills/competitive-brief
    marketing/skills/email-sequence
    marketing/skills/performance-report
    small-business/skills/seo-ai-visibility
    small-business/skills/review-reputation
    small-business/skills/inventory-planner
    small-business/shared/artifact-style.md
    small-business/shared/connector-call-shapes.md
    small-business/shared/currency-and-locale.md
    small-business/shared/untrusted-content.md
    small-business/shared/voice-profile.md"
  "kgelster/awesome-ecom-skills 0b6f9e51b4a14b030ab52a2f1ff8a320bdc50070 LICENSE
    skills/shopify-seo-metadata
    skills/shopify-alt-text
    skills/shopify-json-ld
    skills/shopify-category-taxonomy
    skills/ecom-landing-pages
    skills/shopify-catalog-audit
    skills/shopify-catalog-cleanup
    skills/shopify-redirect-mapping"
)

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

fetch() { # <owner/repo> <commit> -> prints checkout dir
  local repo="$1" sha="$2" dir="$WORK/${1//\//_}"
  git init -q "$dir"
  git -C "$dir" fetch -q --depth 1 "https://github.com/$repo.git" "$sha"
  git -C "$dir" checkout -q FETCH_HEAD
  echo "$dir"
}

mkdir -p "$SKILLS_DIR" "$SHARED_DIR"
for entry in "${SOURCES[@]}"; do
  read -r repo sha license paths <<<"$(echo $entry)"
  echo "==> $repo @ ${sha:0:12}"
  src="$(fetch "$repo" "$sha")"
  for path in $paths; do
    if [[ "$path" == */shared/* ]]; then
      cp "$src/$path" "$SHARED_DIR/"
      [[ "$license" != - ]] && cp "$src/$license" "$SHARED_DIR/LICENSE"
      echo "    shared/$(basename "$path")"
    else
      name="$(basename "$path")"
      rm -rf "${SKILLS_DIR:?}/$name"
      cp -R "$src/$path" "$SKILLS_DIR/$name"
      # Keep upstream license text next to each skill. frontend-design ships
      # its own LICENSE.txt; Shopify/liquid-skills declares MIT in plugin.json
      # and ships no license file.
      [[ "$license" != - ]] && cp "$src/$license" "$SKILLS_DIR/$name/LICENSE"
      echo "    skills/$name"
    fi
  done
done
echo "Done. Review with: git status && git diff --stat"
