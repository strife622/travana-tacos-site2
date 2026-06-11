# Travana Tacos — design audit and redesign direction

## 1. Codebase map

The repository is a static website built for simple hosting such as Cloudflare Pages. There is no framework, bundler, package manager, or server-side code.

- `index.html` — home page with cinematic hero, featured menu, launch/drop section, collections, trust, and testimonial placeholders.
- `menu.html` — menu page centered on the signature quesabirria box, add-ons, drinks, pricing note, and allergen note.
- `find-us.html` — current status, first event, event details, map embed, and festival notes.
- `about.html` — brand story, family/roots positioning, food philosophy, and imagery.
- `contact.html` — email/Instagram contact, inquiry template, and mailto form builder.
- `faq.html` — ordering and event questions.
- `site-config.js` — editable shared business content: brand, operation status, banner, first event, contact, today status, menu, and image paths.
- `app.js` — shared progressive enhancement: config hydration, mobile nav, active nav state, reveal animations, scroll progress, parallax, back-to-top, floating CTA, copy buttons, map embed, and mailto form.
- `styles.css` — complete shared visual system and responsive layout.
- `images/` — logo, taco photography, video, and newly generated WebP optimized copies.

## 2. Brutally honest audit of the previous design

The old site had good intent but looked like it had accumulated too many cleanup passes instead of one confident art direction. The biggest issue was not content; it was cohesion.

- **Overall feel:** It was already nicer than a barebones restaurant site, but it still felt like a premium template trying to be a storefront. The “Shop / Collections / Best Seller” language was interesting, but the system did not fully commit visually.
- **Typography:** Bebas Neue plus Manrope was serviceable, but it read familiar and slightly generic. Big headlines had impact, yet the pairing did not feel custom enough for the futuristic-premium taco vibe.
- **Color:** The warm dark palette fit birria, but the previous colors leaned more “rustic food site” than “whoa, premium modern taco drop.” It needed brighter accents, sharper contrast, and a more deliberate glow language.
- **Spacing:** Sections were mostly organized, but the rhythm was uneven. Some areas felt text-heavy; some cards competed for attention instead of guiding the eye.
- **Hierarchy:** The signature item was there, but the site did not always make it feel like the unmistakable star. Too many card sections had similar weight.
- **Imagery:** The photos were strong enough to carry the experience, but the old styling did not spotlight them hard enough. Image cards needed more depth, motion, edge glow, and premium framing.
- **Mobile:** The mobile structure worked, but the old visual density could feel stacked and busy. The redesign keeps the sections breathable and makes buttons/cards easier to scan.
- **CSS architecture:** `styles.css` had become layered with old cleanup blocks and overrides. That is a maintainability smell. The redesign replaces it with one cohesive system.

## 3. New design direction

**Direction name:** Molten Obsidian Taqueria.

**Palette**

- Obsidian base: `#080407`
- Deep birria black-red: `#10080d`, `#1a0d10`
- Tortilla cream: `#fff6e6`, `#ffeac4`
- Birria orange-red: `#ff5637`
- Mango glow: `#ffb000`
- Salsa magenta: `#ff2f73`
- Cilantro neon: `#35f2bb`
- Lime hit: `#b7ff61`
- Electric blue accent: `#00d5ff`

**Font pairing**

- Headings: `Bricolage Grotesque` — chunky, modern, expressive, less generic than the previous display choice.
- Body/UI: `Sora` — clean, futuristic, readable, and premium without feeling corporate.

**Effect language**

- Dark glass panels with soft borders and blur.
- Gradient glows that orbit the cursor/viewport through CSS variables.
- CSS shimmer on CTAs and key links.
- Scroll-triggered fade/slide/blur reveals through IntersectionObserver.
- Subtle hero parallax and food-photo lift/scale hover states.
- Animated scroll progress and floating menu CTA after the hero.
- Reduced-motion mode disables motion-heavy effects and hides the hero video.

## 4. Implementation summary

- Rebuilt all HTML pages into a tighter shared structure while preserving Travana name, contact info, launch event details, menu items, and key content.
- Replaced the old layered CSS with a single cohesive responsive design system.
- Rewrote the JS enhancement layer to be lighter, config-aware, accessible, and reduced-motion friendly.
- Added optimized WebP copies of the existing food assets and updated page image references to use them.
- Added/updated SEO basics: page descriptions, canonical URLs, Open Graph tags, Twitter card, sitemap including FAQ, manifest colors, and restaurant structured data.
- Preserved the static tech stack: no framework, no build step, no heavy animation library.

## 5. Notes

Exact public operating hours are not invented in structured data because the current config says hours are TBD / not currently operating. The structured data includes the first event/service schedule as an additional property and links the menu/location clearly.
