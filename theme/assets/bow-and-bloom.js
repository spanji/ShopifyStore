/**
 * Bow and Bloom interactions, loaded on every page from snippets/scripts.liquid.
 *
 * - Reveals content as it scrolls into view: ribbon dividers draw themselves,
 *   gift-tag groups and FAQ questions settle into place. Only content that
 *   starts below the fold is touched, so nothing on screen ever blinks out.
 * - Opens and closes questions (<details class="bb-faq">) smoothly.
 *
 * Everything stays readable and usable without this script, and it does nothing
 * when the visitor prefers reduced motion.
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const REVEAL_SELECTOR = [
  '.ribbon-divider',
  '.media-with-content .text-block:has(> h3 + ul) > *',
  '.bb-inside > *',
  '.rte details.bb-faq',
].join(',');

/** @type {IntersectionObserver | null} */
const revealObserver =
  'IntersectionObserver' in window
    ? new IntersectionObserver(
        (entries) => {
          let order = 0;
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const element = /** @type {HTMLElement} */ (entry.target);
            // Stagger items that arrive together, however far down the list they are.
            element.style.setProperty('--bb-i', String(Math.min(order++, 6)));
            element.classList.add('is-revealed');
            revealObserver?.unobserve(element);
          }
        },
        { rootMargin: '0px 0px -8% 0px' }
      )
    : null;

/**
 * Marks below-the-fold content for a reveal.
 * @param {ParentNode} root
 */
function armReveals(root) {
  if (!revealObserver || reducedMotion.matches) return;

  /** @type {NodeListOf<HTMLElement>} */
  let elements;
  try {
    elements = root.querySelectorAll(REVEAL_SELECTOR);
  } catch {
    return; // Browsers without :has() keep everything static.
  }

  const fold = window.innerHeight * 0.92;
  for (const element of elements) {
    if (element.classList.contains('bb-reveal')) continue;
    if (element.getBoundingClientRect().top < fold) continue;
    element.classList.add('bb-reveal');
    revealObserver.observe(element);
  }
}

/** @type {WeakSet<HTMLDetailsElement>} */
const enhancedQuestions = new WeakSet();

/**
 * Animates a question's answer open and closed. Native <details> behaviour
 * (keyboard, find-in-page, no-JS) is kept; only the height change is animated.
 * @param {HTMLDetailsElement} details
 */
function enhanceQuestion(details) {
  if (enhancedQuestions.has(details)) return;
  const summary = details.querySelector(':scope > summary');
  const answer = /** @type {HTMLElement | null} */ (details.querySelector(':scope > .bb-faq__answer'));
  if (!summary || !answer) return;
  enhancedQuestions.add(details);

  /** @type {Animation | null} */
  let animation = null;
  let isOpen = details.open;

  summary.addEventListener('click', (event) => {
    if (reducedMotion.matches || typeof answer.animate !== 'function') return;
    event.preventDefault();

    const startHeight = answer.getBoundingClientRect().height;
    animation?.cancel();
    isOpen = !isOpen;
    if (isOpen) details.open = true;

    const endHeight = isOpen ? answer.scrollHeight : 0;
    answer.style.overflow = 'hidden';
    animation = answer.animate(
      [
        { height: `${isOpen ? 0 : startHeight}px`, opacity: isOpen ? 0 : 1 },
        { height: `${endHeight}px`, opacity: isOpen ? 1 : 0 },
      ],
      { duration: isOpen ? 360 : 240, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );

    const finished = animation;
    finished.onfinish = () => {
      if (animation !== finished) return;
      animation = null;
      answer.style.overflow = '';
      if (!isOpen) details.open = false;
    };
  });
}

/**
 * Occasion choice (blocks/bb-occasion.liquid): keeps the same previous/current
 * markers the variant picker uses, so the selected pill slides between buttons.
 * @param {ParentNode} root
 */
function enhanceOccasions(root) {
  for (const fieldset of root.querySelectorAll('.bb-occasion fieldset')) {
    const element = /** @type {HTMLFieldSetElement} */ (fieldset);
    if (element.dataset.bbReady) continue;
    element.dataset.bbReady = 'true';

    element.addEventListener('change', (event) => {
      const chosen = event.target;
      if (!(chosen instanceof HTMLInputElement) || chosen.type !== 'radio') return;
      for (const input of element.querySelectorAll('input[type="radio"]')) {
        const radio = /** @type {HTMLInputElement} */ (input);
        radio.dataset.previousChecked = String(radio.dataset.currentChecked === 'true');
        radio.dataset.currentChecked = String(radio === chosen);
      }
    });
  }
}

/**
 * @param {ParentNode} root
 */
function init(root) {
  for (const details of root.querySelectorAll('details.bb-faq')) {
    enhanceQuestion(/** @type {HTMLDetailsElement} */ (details));
  }
  enhanceOccasions(root);
  armReveals(root);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init(document), { once: true });
} else {
  init(document);
}

// Theme editor: sections are re-rendered in place.
document.addEventListener('shopify:section:load', (event) => {
  if (event.target instanceof Element) init(event.target);
});
