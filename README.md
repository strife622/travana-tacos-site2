# Travana Tacos website

Static website (Cloudflare Pages friendly): plain HTML + CSS + a small vanilla JS enhancement layer.

## Tech stack

- Plain HTML pages: `index.html`, `menu.html`, `find-us.html`, `faq.html`, `about.html`, `contact.html`
- Shared styling: `styles.css`
- Shared behavior + config hydration: `app.js`
- Shared editable business/content config: `site-config.js`
- Static assets: `/images`

## Editing live service info

When Travana is actively serving:

1. Open `site-config.js`
2. Set:

```js
operations: { inOperation: true }
```

3. Update:

```js
today: {
  status: "…",
  hours: "…",
  maps: "https://www.google.com/maps/search/?api=1&query=…"
}
```

That automatically updates the Home and Find Us pages.

## Redesign notes

The current design direction is “molten obsidian taqueria”: simple structure, dark glass surfaces, warm birria/mango highlights, neon cilantro/lime accents, scroll reveals, hover glows, shimmer CTAs, and optimized WebP food imagery.

The site respects `prefers-reduced-motion`, keeps animations CSS/vanilla-JS only, and includes SEO basics, Open Graph tags, sitemap coverage, and restaurant structured data.
