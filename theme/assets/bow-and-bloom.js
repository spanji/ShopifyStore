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
 * - Personalised note on the product page (blocks/bb-gift-note.liquid): adds the
 *   note product, with its message, to the basket along with the product.
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
  if (!root.classList.contains('bb-intro-playing')) return;

  const events = ['pointerdown', 'keydown', 'wheel', 'touchstart'];
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    root.classList.remove('bb-intro-playing', 'bb-intro-skipping');
    for (const type of events) window.removeEventListener(type, skip);
    document.dispatchEvent(new CustomEvent('bb:intro-end'));
  };

  const skip = () => {
    if (done) return;
    root.classList.add('bb-intro-skipping');
    for (const hero of document.querySelectorAll('.bb-hero[data-intro="on"]')) {
      /** @type {HTMLElement} */ (hero).dataset.intro = 'skipped';
    }
    window.setTimeout(finish, 320);
  };

  for (const type of events) window.addEventListener(type, skip, { passive: true });

  // The CSS hides the overlay 2.1s after it first draws, however late that is (a slow
  // connection, or a tab opened in the background); tidy up when it does.
  document.querySelector('.bb-intro')?.addEventListener('animationend', (event) => {
    if (event.target === event.currentTarget) finish();
  });
}

/* ---------- Changing words (snippets/bb-rotator.liquid) ---------- */

const RIBBON =
  '<svg class="bb-rotator__ribbon" viewBox="0 0 200 12" preserveAspectRatio="none" focusable="false" xmlns="http://www.w3.org/2000/svg"><path pathLength="1" d="M2 8.2C34 3.4 62 10.6 101 6.6S168 3.2 198 7.4"/></svg>';

// Keep in step with the .bb-rotator rules in bow-and-bloom.css.
const LETTER_IN_STAGGER = 32; // ms between letters arriving
const LETTER_OUT = 300; // ms for one letter to leave
const LETTER_OUT_STAGGER = 14; // ms between letters leaving
const READ_TIME = 1400; // ms a word rests, fully drawn, before it leaves

/**
 * Builds a word the way the snippet renders the first one: one span per letter,
 * the letter drawn by CSS from data-c, then the ribbon underline.
 * @param {string} text
 */
function buildWord(text) {
  const word = document.createElement('span');
  word.className = 'bb-rotator__word';
  const letters = Array.from(text);
  word.style.setProperty('--n', String(letters.length));
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
 * Swaps the last words of a headline in turn. The current word leaves letter by
 * letter and the next starts arriving once the old one has gone, so the two never
 * sit on top of each other. Each word stays long enough to
 * arrive, draw its ribbon and be read; longer words stay a little longer.
 * It waits while the words are off screen, the tab is hidden, motion is paused
 * or the intro is playing, and starts the first time the words are seen.
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

  const minimum = Math.max(2, Number(element.dataset.seconds) || 2.5) * 1000;
  /** @param {string} text */
  const arrival = (text) => 300 + Array.from(text).length * LETTER_IN_STAGGER + 800;
  /** @param {string} text */
  const holdFor = (text) => Math.max(minimum, arrival(text) + READ_TIME);
  /** @param {number} letters */
  const exitFor = (letters) => LETTER_OUT + Math.max(0, letters - 1) * LETTER_OUT_STAGGER;

  let index = 0;
  let timer = 0;
  let onScreen = false;
  let seen = false;
  let waitingForIntro = root.classList.contains('bb-intro-playing');

  const canRun = () => onScreen && !waitingForIntro && !document.hidden && !motionPaused();

  /** @param {number} delay */
  const schedule = (delay) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(step, delay);
  };

  const stop = () => {
    window.clearTimeout(timer);
    timer = 0;
  };

  function step() {
    timer = 0;
    if (!canRun()) return;

    // Anything still leaving from an earlier turn goes now.
    for (const leaving of element.querySelectorAll('.bb-rotator__word.is-out')) leaving.remove();

    const current = element.querySelector('.bb-rotator__word');
    index = (index + 1) % words.length;
    const text = words[index] ?? '';

    let exit = 0;
    if (current) {
      exit = exitFor(current.querySelectorAll('.bb-rotator__char').length);
      current.classList.add('is-out');
      window.setTimeout(() => current.remove(), exit + 40);
    }

    // The new word starts only once every letter of the old one has gone, so short
    // words (where any letter can sit where the old word was) never overlap either.
    window.setTimeout(() => element.append(buildWord(text)), exit);
    schedule(exit + holdFor(text));
  }

  // Coming back to the words (scrolled back, tab shown, motion resumed): a short pause first.
  const resume = () => {
    if (!timer && canRun()) schedule(1200);
  };

  const firstTurn = () => schedule(holdFor(words[0] ?? '') + 500);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      if (!onScreen) {
        stop();
      } else if (!seen) {
        seen = true;
        if (!waitingForIntro) firstTurn();
      } else {
        resume();
      }
    }).observe(element);
  } else {
    onScreen = true;
    seen = true;
    firstTurn();
  }

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : resume()));
  document.addEventListener('bb:motion', () => (motionPaused() ? stop() : resume()));

  if (waitingForIntro) {
    document.addEventListener(
      'bb:intro-end',
      () => {
        waitingForIntro = false;
        if (onScreen) firstTurn();
      },
      { once: true }
    );
  }
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
 * kind: how it arrives. 'settle' uses the .bb-reveal transition; 'group' marks a
 * section whose own stylesheet plays its parts (sections/bb-statement.liquid); the
 * others play a one-off animation from bow-and-bloom.css.
 * @type {{ selector: string, kind: 'settle' | 'group' | 'soft' | 'tag' | 'slide' | 'words' | 'unwrap' }[]}
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
  { selector: '.bb-statement', kind: 'group' },
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
      // The scrolling strip copies its text to loop, and copies are never revealed.
      if (element.closest('marquee-component')) continue;
      if (element.getBoundingClientRect().top < fold) continue;
      element.dataset.bbArmed = 'true';

      if (kind === 'settle') {
        element.classList.add('bb-reveal');
      } else if (kind === 'group') {
        element.classList.add('bb-armed');
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

/* ---------- Personalised note (blocks/bb-gift-note.liquid) ---------- */

/**
 * The tick box opens the message box (and makes it required) and hides express
 * checkout, which would skip the basket and leave the note behind.
 * @param {ParentNode} scope
 */
function enhanceNotes(scope) {
  for (const note of scope.querySelectorAll('[data-bb-note]')) {
    if (!(note instanceof HTMLElement) || note.dataset.bbReady) continue;
    const check = note.querySelector('.bb-note__check');
    const message = note.querySelector('.bb-note__message');
    const count = note.querySelector('.bb-note__count');
    if (!(check instanceof HTMLInputElement) || !(message instanceof HTMLTextAreaElement)) continue;
    note.dataset.bbReady = 'true';

    const sync = () => {
      message.disabled = !check.checked;
      const form = document.getElementById(note.dataset.formId || '');
      form?.closest('product-form-component')?.toggleAttribute('data-bb-note-on', check.checked);
      if (!check.checked) note.querySelector('.bb-note__error')?.setAttribute('hidden', '');
    };
    check.addEventListener('change', () => {
      sync();
      if (check.checked) message.focus({ preventScroll: true });
    });
    message.addEventListener('input', () => {
      if (count) count.textContent = `${message.value.length}/${count.dataset.max}`;
    });
    sync();
  }
}

/**
 * Puts the note in the basket, with its message, just before the product form
 * sends the product, so the basket opens showing both. Listens on window, ahead of
 * the theme's own submit handling on document, then lets the form carry on.
 */
window.addEventListener(
  'submit',
  (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.id || form.dataset.bbNotePassing) return;
    const note = document.querySelector(`[data-bb-note][data-form-id="${CSS.escape(form.id)}"]`);
    const check = note?.querySelector('.bb-note__check');
    if (!(note instanceof HTMLElement) || !(check instanceof HTMLInputElement) || !check.checked) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    addNoteThenSubmit(note, form, event.submitter);
  },
  true
);

/**
 * @param {HTMLElement} note
 * @param {HTMLFormElement} form
 * @param {HTMLElement | null} submitter
 */
async function addNoteThenSubmit(note, form, submitter) {
  if (note.dataset.bbBusy) return;
  note.dataset.bbBusy = 'true';
  const message = /** @type {HTMLTextAreaElement | null} */ (note.querySelector('.bb-note__message'));
  const error = note.querySelector('.bb-note__error');
  error?.setAttribute('hidden', '');

  try {
    const response = await fetch(`${window.Shopify?.routes?.root || '/'}cart/add.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        items: [
          {
            id: Number(note.dataset.variantId),
            quantity: 1,
            properties: { [note.dataset.property || 'Message']: (message?.value || '').trim() },
          },
        ],
      }),
    });
    const result = await response.json();
    if (!response.ok || result.status) throw new Error(result.description || result.message);
    takeBackIfProductFails(form, result.items?.[0]?.key);

    form.dataset.bbNotePassing = 'true';
    try {
      form.requestSubmit(submitter instanceof HTMLButtonElement && submitter.form === form ? submitter : undefined);
    } finally {
      delete form.dataset.bbNotePassing;
    }
  } catch {
    if (error) {
      error.textContent = note.dataset.error || '';
      error.removeAttribute('hidden');
    }
  } finally {
    delete note.dataset.bbBusy;
  }
}

/**
 * If the product itself then can't be added (sold out, say), the note comes back
 * out of the basket, so nobody pays for a note with nothing to go with it.
 * @param {HTMLFormElement} form
 * @param {string | undefined} key
 */
function takeBackIfProductFails(form, key) {
  const component = form.closest('product-form-component');
  if (!key || !component) return;

  /** @param {Event} event */
  const onResult = (event) => {
    if (!(event.target instanceof Node) || !component.contains(event.target)) return;
    stop();
    const detail = /** @type {CustomEvent} */ (event).detail;
    if (event.type === 'cart:error' || detail?.data?.didError) {
      fetch(`${window.Shopify?.routes?.root || '/'}cart/change.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: key, quantity: 0 }),
      }).catch(() => {});
    }
  };
  const stop = () => {
    document.removeEventListener('cart:update', onResult);
    document.removeEventListener('cart:error', onResult);
    clearTimeout(timer);
  };
  const timer = setTimeout(stop, 20000);
  document.addEventListener('cart:update', onResult);
  document.addEventListener('cart:error', onResult);
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
  enhanceNotes(scope);
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
