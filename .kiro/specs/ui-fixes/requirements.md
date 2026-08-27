# Requirements Document

## Introduction

This spec covers three targeted UI fixes for the AdofLabs Next.js website. Each fix addresses a distinct reliability, motion, or layout problem:

1. **Hamburger Menu** — Replace the unreliable `onClick` tap handler with a pointer-event–based approach that works correctly on iOS Safari, resolve the body-lock race condition, and unify the z-index stacking so the button is always above the overlay.
2. **Frontier Section Scroll Reveal** — Replace the single-block fade-in with a cinematic, scroll-driven word-by-word blur-reveal animation that matches the quality bar of high-end agency sites.
3. **Progress Page Image Sizing** — Fix the timeline images so they are fully responsive at every breakpoint, never overflow their containers, and preserve a stable aspect ratio to prevent layout shift.

---

## Glossary

- **SiteHeader**: The `<header>` component defined in `src/components/site-header.tsx` that renders the global navigation bar and hamburger menu for viewports narrower than 1280 px (`xl` breakpoint).
- **MobileNavMenu**: The full-screen overlay (`id="mobile-nav-menu"`) inside `SiteHeader` that slides in when the hamburger button is activated.
- **HamburgerButton**: The `<button>` element inside `SiteHeader` that toggles `MobileNavMenu`. Hidden on `xl:` and above.
- **PointerUp**: The `pointerup` DOM event, which fires reliably on both mouse and touch inputs and is not subject to iOS Safari's 300 ms click-delay or scroll-swallow behaviour.
- **BodyLock**: The technique of setting `document.body` CSS properties to freeze background scroll while `MobileNavMenu` is open.
- **ScrollReveal**: The `<ScrollReveal>` component defined in `src/components/ui/scroll-reveal.tsx`, currently responsible for the single-block reveal animation in `FrontierSection`.
- **FrontierSection**: The `<section id="frontier">` component in `src/components/sections/frontier-section.tsx`.
- **WordReveal**: The new animation primitive that replaces `ScrollReveal` inside `FrontierSection`, splitting text into individual `<span>` elements and animating each word from blurred/transparent to sharp/opaque as the user scrolls.
- **ProgressTimeline**: The component defined in `src/components/sections/progress-timeline.tsx` that renders the two timeline images (`voice_baseline_A1.webp` and `voice_applied_research_A2.webp`).
- **TimelineImage**: Either of the two `<Image>` elements inside `ProgressTimeline`.
- **ReducedMotion**: The `prefers-reduced-motion: reduce` CSS media query, used to honour a user's OS-level accessibility preference for less animation.
- **SafeAreaInset**: CSS environment variables (`env(safe-area-inset-*)`) that account for device notches and rounded corners on modern phones.
- **xl breakpoint**: Tailwind's `xl:` prefix, corresponding to a minimum viewport width of 1280 px.

---

## Requirements

---

### Requirement 1: Hamburger Button — Reliable Pointer Event Activation

**User Story:** As a visitor on a mobile or tablet device, I want the hamburger button to open and close the navigation menu on the first tap every time, so that I am never stranded on a page because the menu failed to respond.

#### Acceptance Criteria

1. WHEN a user taps the `HamburgerButton` on any touch-capable device, THE `SiteHeader` SHALL toggle `MobileNavMenu` open or closed on the first gesture, with no missed taps or double-fires.
2. THE `HamburgerButton` SHALL use `onPointerDown` or `onPointerUp` (with `event.preventDefault()` called to suppress the subsequent synthetic click) as its primary activation handler, replacing the sole reliance on `onClick`.
3. WHEN the `HamburgerButton` receives a pointer event, THE `SiteHeader` SHALL call `setPointerCapture` on the button element so that pointer events continue to be routed to the button if the finger moves slightly off-target before release.
4. WHILE `MobileNavMenu` is open, THE `SiteHeader` SHALL apply the `BodyLock` by setting `document.body` to `position: fixed`, `overflow: hidden`, `width: 100%`, and `top: -${scrollY}px` in a single synchronous operation before the next browser paint, preventing any race between the tap event and scroll restoration.
5. WHEN `MobileNavMenu` is closed (for any reason), THE `SiteHeader` SHALL restore all `BodyLock` styles and call `window.scrollTo(0, scrollY)` to return the user to their previous scroll position without visible jump.
6. THE `HamburgerButton` SHALL carry a `z-index` value strictly higher than the `z-[90]` applied to `MobileNavMenu`, so the button is always tappable whether the menu is open or closed.
7. WHEN the viewport width is below the `xl` breakpoint (< 1280 px), THE `SiteHeader` SHALL render the `HamburgerButton` as a visible, tappable target regardless of the specific breakpoint (320 px phone up to 1279 px tablet).
8. WHEN the viewport width is at or above the `xl` breakpoint (≥ 1280 px), THE `SiteHeader` SHALL hide the `HamburgerButton` and render the desktop navigation links and "Join the Mission" CTA button instead.
9. IF a keyboard user presses the `Escape` key while `MobileNavMenu` is open, THEN THE `SiteHeader` SHALL close the menu and return focus to the `HamburgerButton`.
10. WHEN `MobileNavMenu` opens, THE `SiteHeader` SHALL move focus to the first navigation link within the menu after a maximum delay of 80 ms.
11. THE `HamburgerButton` SHALL expose `aria-expanded` set to `"true"` when the menu is open and `"false"` when closed, and the `MobileNavMenu` SHALL carry `aria-hidden="true"` when closed and `aria-hidden="false"` when open.

---

### Requirement 2: Hamburger Menu — z-Index Stacking Consistency

**User Story:** As a developer maintaining the site, I want the z-index values of the header, hamburger button, and menu overlay to form a coherent stacking order, so that interactive elements are never obscured by layers meant to sit below them.

#### Acceptance Criteria

1. THE `SiteHeader` (`<header>` element) SHALL carry `z-[100]` as its stacking context.
2. THE `HamburgerButton` SHALL carry a z-index at least one unit higher than `MobileNavMenu` (e.g., `z-[95]` vs `z-[90]`), ensuring it is always the topmost tappable element on the page.
3. THE `MobileNavMenu` overlay SHALL carry `z-[90]`, sitting below the header and button but above all page content.
4. WHEN `MobileNavMenu` is open, THE `SiteHeader` SHALL ensure that the logo and `HamburgerButton` remain visible and interactive above the overlay.

---

### Requirement 3: Hamburger Menu — ReducedMotion and Accessibility

**User Story:** As a user who has enabled the "Reduce Motion" accessibility setting, I want the navigation menu to appear and become usable without any transitions or animations, so that the UI does not cause discomfort.

#### Acceptance Criteria

1. WHERE `ReducedMotion` is active, THE `MobileNavMenu` SHALL appear and disappear without opacity or transform transitions.
2. WHERE `ReducedMotion` is active, THE animated lines of the `HamburgerButton` icon SHALL change state (open ↔ closed) without CSS `transition` animations.
3. THE `HamburgerButton` SHALL be reachable and activatable via keyboard Tab navigation on all viewport widths below the `xl` breakpoint.
4. THE `MobileNavMenu` SHALL trap focus within its interactive elements while it is open, so that Tab and Shift+Tab cycle only through the menu links and the close action.

---

### Requirement 4: Frontier Section — Word-by-Word Cinematic Scroll Reveal

**User Story:** As a visitor scrolling the home page, I want the Frontier section paragraph to reveal its words progressively as I scroll, transitioning each word from blurred and invisible to sharp and fully opaque, so that the reading experience feels cinematic and intentional.

#### Acceptance Criteria

1. WHEN the `FrontierSection` first enters the viewport (before the user has scrolled to it), THE `WordReveal` SHALL render all words invisible (opacity 0) so that no text is visible on initial page load.
2. WHEN a user scrolls downward through the `FrontierSection`, THE `WordReveal` SHALL progressively reveal words in reading order (left-to-right, top-to-bottom), transitioning each word from `filter: blur(8px); opacity: 0` to `filter: blur(0px); opacity: 1`.
3. THE `WordReveal` SHALL split the paragraph text into individual word `<span>` elements so that each word can be animated independently.
4. WHEN transitioning a word to its revealed state, THE `WordReveal` SHALL apply a slight upward `translateY` movement (e.g., 8–12 px) to provide a sense of depth, combined with the blur and opacity transition.
5. THE `WordReveal` SHALL apply staggered delays between consecutive words so that the reveal sweeps across the text rather than all words appearing simultaneously.
6. THE `WordReveal` animation SHALL feel smooth and continuous — each individual word transition SHALL use an easing curve consistent with high-end motion (e.g., `cubic-bezier(0.16, 1, 0.3, 1)`) and a duration between 400 ms and 700 ms per word.
7. THE `WordReveal` SHALL be driven by the user's scroll position (not solely a viewport-entry trigger), so that the text reveals proportionally as the user scrolls deeper into the section.
8. WHEN the `FrontierSection` is fully in view and the user has scrolled past it, THE `WordReveal` SHALL ensure all words are in their fully revealed state (opacity 1, blur 0, no translateY).
9. THE `WordReveal` SHALL function correctly on mobile, tablet, and desktop breakpoints, including touch-scroll devices on iOS Safari and Android Chrome.
10. IF `ReducedMotion` is active, THEN THE `WordReveal` SHALL display all words at full opacity with no blur, translateY, or staggered delay — text SHALL be immediately readable without any animation.
11. IF the browser does not support `IntersectionObserver` or scroll-listener APIs required for the animation, THEN THE `WordReveal` SHALL fall back to displaying all words fully visible immediately.
12. WHEN the `FrontierSection` renders on a page, THE `ScrollReveal` component wrapper SHALL either be replaced by or delegate to the new `WordReveal` implementation, ensuring the existing `FrontierSection` markup requires minimal changes.

---

### Requirement 5: Frontier Section — Animation Performance and Accessibility

**User Story:** As a visitor on a lower-powered mobile device, I want the scroll-reveal animation to run smoothly without dropping frames or causing layout reflow, so that the page remains fast and fluid.

#### Acceptance Criteria

1. THE `WordReveal` SHALL animate only CSS properties that the browser can composite on the GPU — specifically `opacity`, `filter`, and `transform` — and SHALL NOT animate any properties that trigger layout (e.g., `width`, `height`, `margin`, `padding`).
2. THE `WordReveal` SHALL apply `will-change: opacity, filter, transform` to each word `<span>` element that is actively transitioning, and SHALL remove it once the transition completes, to avoid unnecessary memory usage.
3. THE `WordReveal` SHALL not cause Cumulative Layout Shift (CLS): the text container SHALL reserve its full height from the moment the component mounts, so no surrounding layout shifts when words become visible.
4. THE word `<span>` elements generated by `WordReveal` SHALL be wrapped in a semantically meaningful element (`<p>` or equivalent) so that screen readers read the full paragraph text as a continuous string, not as isolated word fragments.
5. WHEN `WordReveal` splits text into word spans, THE `FrontierSection` SHALL maintain its existing font family (`var(--font-oliveira)`), size (`clamp(1.75rem, 4.25vw, 3.5rem)`), line-height, and `text-pretty` alignment.

---

### Requirement 6: Progress Timeline — Responsive Image Containment at All Breakpoints

**User Story:** As a visitor viewing the Progress page on a mobile phone, I want the timeline images to fit cleanly within their container and never overflow the screen, so that the layout looks polished and professional at every screen size.

#### Acceptance Criteria

1. THE `TimelineImage` containers SHALL use `w-full` without a hard maximum width on viewports narrower than the `md` breakpoint (< 768 px), so they fill the available column width rather than overflowing.
2. WHEN the viewport is at or above the `md` breakpoint (≥ 768 px), THE `TimelineImage` containers SHALL cap their width at `max-w-[600px]` to preserve the intended design at larger sizes.
3. THE `TimelineImage` containers SHALL account for the `pl-8` timeline indent applied on mobile by ensuring the image width is calculated from the indented column, not the full viewport width.
4. WHEN the `ProgressTimeline` renders on a viewport width below 768 px with the `pl-8 md:pl-12` left-padding applied, THE `TimelineImage` containers SHALL not overflow their parent or the viewport in the horizontal axis.
5. EACH `TimelineImage` SHALL have an explicit `aspect-ratio` applied to its container (e.g., `aspect-[800/500]` matching the intrinsic dimensions of the source images) so that the browser reserves the correct height before the image loads, preventing Cumulative Layout Shift.
6. THE `<Image>` elements inside each `TimelineImage` container SHALL use `w-full h-auto` and `object-cover` so they scale proportionally within the constrained container at every breakpoint.
7. WHEN a `TimelineImage` is hovered on a pointer device, THE image opacity SHALL transition from `opacity-80` to `opacity-100` over 500 ms, consistent with the existing hover behaviour already present in the component.
8. IF a `TimelineImage` source file is unavailable, THEN THE `<Image>` component SHALL render its `alt` text in a way that preserves the container's reserved height so the timeline layout does not collapse.

---

### Requirement 7: Progress Timeline — Cross-Breakpoint Visual Consistency

**User Story:** As a visitor switching between a phone and a tablet, I want the Progress timeline to maintain its visual hierarchy and proportions across all screen sizes, so that the content always looks intentional.

#### Acceptance Criteria

1. THE `ProgressTimeline` SHALL maintain the visual timeline line (`border-l border-white/10`) and the timeline dot markers at their correct horizontal positions for both mobile (`ml-4 pl-8`) and desktop (`md:ml-0 md:pl-12`) layouts after the image sizing fix is applied.
2. WHEN the viewport is at or below 375 px width (smallest supported phone), THE `TimelineImage` containers SHALL not cause any horizontal scrollbar to appear on the page.
3. THE two `TimelineImage` containers SHALL share identical sizing and layout rules so that A1 and A2 entries have consistent visual weight and proportions across all breakpoints.
4. WHEN the `ProgressTimeline` is rendered on a tablet viewport (768 px – 1279 px), THE `TimelineImage` containers SHALL fill the available `2/3` right column width up to the `max-w-[600px]` cap without leaving excessive white space.
