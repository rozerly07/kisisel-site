# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML + CSS + vanilla JS, no build step, no framework (course requirement). Only local vendor libs: GSAP + ScrollTrigger in `assets/js/vendor/`. Must work opened via `file://` (no `fetch()` of HTML partials). Full technical rules live in CLAUDE.md.

## Users

Primary: real visitors to Rozerin Aktaş's ("Roze") personal site — people arriving from her Instagram or Letterboxd, peers, and anyone curious about her. They come to get a sense of who she is, what she makes, and what she's into, and possibly to contact her.

Secondary: the course instructor, who grades the site as a multipage, bilingual (TR/EN), responsive assignment and may open it from a zip without a server. The site is a lasting personal site first; the assignment is a side goal it must still fully satisfy.

## Product Purpose

A personal website that introduces Roze — an Akdeniz University Computer Programming student interested in cinema, fashion, art, and history — through about, projects, gallery, blog, and contact pages. Success: a visitor leaves with an equal sense of (1) her personality — chaotic, sarcastic, a film/anime/art lover who hates monotony — and (2) her technical skill as a developer, shown through the site's own build quality and interactions.

## Positioning

The site itself is the proof: a personal site built as a "digital circus" experience, where the craft of the interactions demonstrates the programming skill and the tone demonstrates the personality. A template portfolio could not copy it without losing either half.

## Operating Context

- Visitors browse casually on phone (360px), tablet (768px), and desktop (1280px+).
- Two languages with mirrored pages: `tr/` and `en/`, same filenames; language switch opens the same page in the other folder. Turkish is built first, English translated at the end.
- Entry page (`index.html`) is a language-choice gate.
- Delivered as a zip under 500MB; must run by double-clicking an HTML file.
- Contact may use Formspree (endpoint not yet provided) and an embedded Google Map.

## Capabilities and Constraints

- Pages: home, about, projects, gallery, blog index + 3 posts, contact — per language.
- All copy comes from `content/ICERIK.md`; no invented text.
- Images: WebP, lazy-loaded, explicit dimensions, meaningful alt.
- Motion limited to transform/opacity; reduced-motion respected.
- Open: Formspree endpoint, résumé, education, skills, projects (min. 3), gallery photos (6–12), blog posts (3), portrait photo.

## Brand Commitments

- Concept "Dijital Sirk" (digital circus inside a computer) and the original mascot "Bilet" are binding; no existing TV/cartoon characters, logos, or names. Details in CLAUDE.md.
- Voice: playful, ironic, a little chaotic — matching Roze's self-description. Welcome line: "İNANILMAZ DİJİTAL SİRKE HOŞGELDİNİZ".
- Social presence: Instagram and Letterboxd (links in `content/ICERIK.md`).

## Evidence on Hand

- `content/ICERIK.md`: name, one-line intro, contact details, map embed, social links, home welcome line and about summary (favorite anime/manga, favorite artists Van Gogh, Monet, Salvador Dalí; dislikes).
- Not yet provided: about-page résumé/education/skills/interests, projects, gallery images, blog posts, portrait photo. Roze will supply these herself. Until then, use clearly marked empty placeholders — never fabricate projects, posts, skills, or photos.

## Product Principles

1. Personality and skill carry equal weight; neither is decoration for the other.
2. The site is the portfolio piece — interaction quality is the evidence of skill.
3. Her words, not invented ones: content only from ICERIK.md, gaps stay visibly open.
4. Playful never blocks use: navigation, reading, and contact always work fast, offline, and by keyboard.
5. Both languages are first-class, mirrored page-for-page.

## Accessibility & Inclusion

Keyboard navigable with visible focus, semantic HTML, WCAG AA contrast, `prefers-reduced-motion` respected, full Turkish character support (ç ğ ı İ ö ş ü) in all fonts.
