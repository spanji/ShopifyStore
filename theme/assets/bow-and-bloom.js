/**
 * Bow and Bloom interactions, loaded on every page from snippets/scripts.liquid.
 *
 * - Homepage hero (sections/bb-hero.liquid): the changing headline word, the pause
 *   button for every looping animation, the skip and tidy-up of the first-visit
 *   intro, and the floating buy button on phones.
 * - Reveals content as it scrolls into view: ribbon dividers draw themselves, gift
 *   tags drop in, FAQ questions settle, and on the homepage headings rise word by
 *   word, text comes into focus and photos unwrap. Only content that starts below
 *   the fold is touched, so nothing on screen ever blinks out.
 * - Opens and closes questions (<details class="bb-faq">) smoothly.
 * - Occasion choice on the product page (blocks/bb-occasion.liquid).
 *
 * Everything stays readable and usable without this script, and nothing moves
 * when the visitor prefers reduced motion.
 */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const root = document.documentElement;

/* ---------- Pausing the loops ---------- */

const PAUSE_KEY = 'bb-motion';

try {
  if (localStorage.getItem(PAUSE_KEY) === 'paused') root.classList.add('bb-motion-paused');
} catch {
  // Storage can be blocked; motion then simply starts playing.
}

function motionPaused() {
  return root.classList.contains('bb-motion-paused');
}

/**
 * Keeps every pause button's state and label in step with the page.
 */
function syncPauseButtons() {
  const paused = motionPaused();
  for (const button of document.querySelectorAll('.bb-motion-toggle')) {
    const hero = /** @type {HTMLElement | null} */ (button.closest('.bb-hero'));
    const label = paused ? hero?.dataset.playLabel : hero?.dataset.pauseLabel;
    button.setAttribute('aria-pressed', String(paused));
    if (label) {
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    }
  }
}

/**
 * @param {boolean} paused
 */
function setPaused(paused) {
  root.classList.toggle('bb-motion-paused', paused);
  try {
    if (paused) localStorage.setItem(PAUSE_KEY, 'paused');
    else localStorage.removeItem(PAUSE_KEY);
  } catch {
    // Not remembered across pages; the choice still holds for this page.
  }
  syncPauseButtons();
  document.dispatchEvent(new CustomEvent('bb:motion'));
}

document.addEventListener('click', (event) => {
  const target = /** @type {Element | null} */ (event.target instanceof Element ? event.target : null);
  if (target?.closest('.bb-motion-toggle')) setPaused(!motionPaused());
});

/* ---------- First-visit intro ---------- */

/**
 * The intro runs on CSS alone and ends itself; this lets any tap, key or scroll
 * skip it, and tidies up afterwards.
 */
function initIntro() {
  root.classList.remove('bb-intro-pending');
  if (!root.classList.contains('bb-intro')) return;

  const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    root.classList.remove('bb-intro', 'bb-intro-skip');
    for (const type of events) window.removeEventListener(type, skip);
  };

  const skip = () => {
    if (done) return;
    root.classList.add('bb-intro-skip');
    for (const hero of document.querySelectorAll('.bb-hero[data-intro="on"]')) {
      /** @type {HTMLElement} */ (hero).dataset.intro = 'skipped';
    }
    window.setTimeout(finish, 320);
  };

  for (const type of events) window.addEventListener(type, skip, { passive: true });
  document.querySelector('.bb-intro')?.addEventListener('animationend', (event) => {
    if (event.target === event.currentTarget) finish();
  });
  window.setTimeout(finish, 2600);
}

/* ---------- The changing headline word ---------- */

const RIBBON =
  '<svg class="bb-rotator__ribbon" viewBox="0 0 200 12" preserveAspectRatio="none" focusable="false" xmlns="http://www.w3.org/2000/svg"><path pathLength="1" d="M2 8.2C34 3.4 62 10.6 101 6.6S168 3.2 198 7.4"/></svg>';

/**
 * Builds a word the way the section renders the first one: one span per letter,
 * the letter drawn by CSS from data-c, then the ribbon underline.
 * @param {string} text
 */
function buildWord(text) {
  const word = document.createElement('span');
  word.className = 'bb-rotator__word';
  const letters = Array.from(text);
  word.style.setProperty('--n', String(letters.length));
  word.style.setProperty('--bb-word-delay', '0.16s');
  letters.forEach((letter, index) => {
    const span = document.createElement('span');
    span.className = 'bb-rotator__char';
    span.dataset.c = letter;
    span.style.setProperty('--i', String(index));
    word.append(span);
  });
  word.insertAdjacentHTML('beforeend', RIBBON);
  return word;
}

/** @type {WeakSet<HTMLElement>} */
const rotators = new WeakSet();

/**
 * Swaps the last words of the headline in turn. It waits while the headline is
 * off screen, the tab is hidden or motion is paused.
 * @param {HTMLElement} element
 */
function initRotator(element) {
  if (rotators.has(element)) return;
  rotators.add(element);

  /** @type {string[]} */
  let words = [];
  try {
    words = JSON.parse(element.dataset.words || '[]');
  } catch {
    return;
  }
  if (words.length < 2 || reducedMotion.matches) return;

  const interval = Math.max(2, Number(element.dataset.seconds) || 2.5) * 1000;
  const hero = /** @type {HTMLElement | null} */ (element.closest('.bb-hero'));
  const firstHold = interval + (hero?.dataset.intro === 'on' ? 1700 : 700);
  let index = 0;
  let timer = 0;
  let onScreen = true;

  const canRun = () => onScreen && !document.hidden && !motionPaused();

  const step = () => {
    timer = 0;
    if (!canRun()) return;

    const current = element.querySelector('.bb-rotator__word:not(.is-out)');
    index = (index + 1) % words.length;
    const next = buildWord(words[index] ?? '');
    if (current) {
      current.classList.add('is-out');
      window.setTimeout(() => current.remove(), 700);
    }
    element.append(next);
    timer = window.setTimeout(step, interval);
  };

  const resume = () => {
    if (!timer && canRun()) timer = window.setTimeout(step, interval * 0.6);
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      resume();
    }).observe(element);
  }
  document.addEventListener('visibilitychange', resume);
  document.addEventListener('bb:motion', resume);
  timer = window.setTimeout(step, firstHold);
}

/* ---------- Floating buy button on phones ---------- */

/**
 * Shows the floating button only while no other buy button (and not the footer)
 * is on screen, so it never sits on top of one.
 */
function initFloatingButton() {
  const pill = /** @type {HTMLElement | null} */ (document.querySelector('a.bb-float-cta'));
  if (!pill || pill.dataset.bbReady || !('IntersectionObserver' in window)) return;
  pill.dataset.bbReady = 'true';

  /** @type {Element[]} */
  const watched = Array.from(document.querySelectorAll('a.bb-cta:not(.bb-float-cta)')).filter(
    (button) => !button.closest('.menu-drawer')
  );
  const footer = document.querySelector('footer');
  if (footer) watched.push(footer);

  /** @type {Set<Element>} */
  const visible = new Set();
  let ready = false;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    }
    ready = true;
    pill.toggleAttribute('data-show', ready && visible.size === 0);
  });
  for (const element of watched) observer.observe(element);
}

/* ---------- Scroll reveals ---------- */

/**
 * kind: how it arrives. 'settle' uses the .bb-reveal transition; the others play
 * a one-off animation from bow-and-bloom.css.
 * @type {{ selector: string, kind: 'settle' | 'soft' | 'tag' | 'slide' | 'words' | 'unwrap' }[]}
 */
const REVEALS = [
  { selector: '.ribbon-divider', kind: 'settle' },
  { selector: '.media-with-content .text-block:has(> h3 + ul) > :not(ul), .bb-inside > :not(ul)', kind: 'settle' },
  { selector: '.media-with-content .text-block:has(> h3 + ul) > ul > li, .bb-inside > ul > li', kind: 'tag' },
  { selector: '.rte details.bb-faq', kind: 'settle' },
  { selector: 'main[data-template="index"] .text-block > h2', kind: 'words' },
  { selector: 'main[data-template="index"] .text-block:not(:has(> h3 + ul)) > :is(p, ul)', kind: 'soft' },
  { selector: 'main[data-template="index"] :is(a.bb-cta, a.link)', kind: 'soft' },
  { selector: 'main[data-template="index"] .media-with-content .media-block', kind: 'unwrap' },
  { selector: 'main[data-template="index"] .accordion details', kind: 'slide' },
];

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
            element.style.setProperty('--bb-i', String(Math.min(order++, 16)));
            element.classList.add('is-revealed');
            revealObserver?.unobserve(element);
          }
        },
        { rootMargin: '0px 0px -8% 0px' }
      )
    : null;

/**
 * Splits a plain-text heading into words that each rise from behind their own
 * line. Screen readers get the heading once from a hidden copy.
 * @param {HTMLElement} heading
 * @returns {boolean} false when the heading has markup or a flex layout, so it is left alone.
 */
function splitWords(heading) {
  if (Array.from(heading.childNodes).some((node) => node.nodeType !== Node.TEXT_NODE)) return false;
  if (getComputedStyle(heading).display.includes('flex')) return false;
  const text = (heading.textContent || '').trim().replace(/\s+/g, ' ');
  if (!text) return false;

  heading.textContent = '';
  const spoken = document.createElement('span');
  spoken.className = 'visually-hidden';
  spoken.textContent = text;
  heading.append(spoken);

  text.split(' ').forEach((part, index, parts) => {
    const word = document.createElement('span');
    word.className = 'bb-word';
    word.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = part;
    inner.style.setProperty('--w', String(index));
    word.append(inner);
    heading.append(word);
    if (index < parts.length - 1) heading.append(' ');
  });
  return true;
}

/**
 * Marks below-the-fold content for a reveal.
 * @param {ParentNode} scope
 */
function armReveals(scope) {
  if (!revealObserver || reducedMotion.matches) return;

  const fold = window.innerHeight * 0.92;
  for (const { selector, kind } of REVEALS) {
    /** @type {NodeListOf<HTMLElement>} */
    let elements;
    try {
      elements = scope.querySelectorAll(selector);
    } catch {
      continue; // Browsers without :has() keep these static.
    }

    for (const element of elements) {
      if (element.dataset.bbArmed) continue;
      if (element.getBoundingClientRect().top < fold) continue;
      element.dataset.bbArmed = 'true';

      if (kind === 'settle') {
        element.classList.add('bb-reveal');
      } else if (kind === 'words') {
        element.classList.add(splitWords(element) ? 'bb-reveal--words' : 'bb-reveal--soft');
      } else {
        element.classList.add(`bb-reveal--${kind}`);
      }
      revealObserver.observe(element);
    }
  }
}

/* ---------- Questions ---------- */

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
 * markers the variant picker uses, so the selected pill slides between buttons,
 * and switches the optional details box on only for its choice.
 * @param {ParentNode} scope
 */
function enhanceOccasions(scope) {
  for (const fieldset of scope.querySelectorAll('.bb-occasion fieldset')) {
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

      // The optional details box is only sent with the choice that shows it.
      const details = element.parentElement?.querySelector('.bb-occasion__details input');
      if (details instanceof HTMLInputElement) details.disabled = !chosen.hasAttribute('data-bb-details');
    });
  }
}

/**
 * @param {ParentNode} scope
 */
function init(scope) {
  for (const details of scope.querySelectorAll('details.bb-faq')) {
    enhanceQuestion(/** @type {HTMLDetailsElement} */ (details));
  }
  for (const rotator of scope.querySelectorAll('.bb-rotator')) {
    initRotator(/** @type {HTMLElement} */ (rotator));
  }
  enhanceOccasions(scope);
  syncPauseButtons();
  initFloatingButton();
  armReveals(scope);
}

initIntro();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => init(document), { once: true });
} else {
  init(document);
}

// Theme editor: sections are re-rendered in place.
document.addEventListener('shopify:section:load', (event) => {
  if (event.target instanceof Element) init(event.target);
});
