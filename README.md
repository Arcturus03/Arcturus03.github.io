# Arcturus03.github.io — Hrithik Chandra portfolio

A single-page, animated portfolio site built as a static GitHub Pages user-site.
No build step, no framework, no dependencies — just `index.html`, `styles.css`, and `script.js`.

## What's in here

| File | Purpose |
| --- | --- |
| `index.html` | All content + section structure (hero, about, FYP feature, timeline, projects, skills, contact). |
| `styles.css` | Cosmic / Arcturus theme — deep navy + amber, starfield, responsive. |
| `script.js` | Starfield canvas, hero terminal typing, GRN force-directed graph, scroll-reveal, project filtering, skills constellation. |
| `CV_HrithikChandra.pdf` | The CV the page links to as "Download CV". |
| `CV_HrithikChandra.docx` | Source. Not linked from the site, but kept in the repo for convenience. |
| `.nojekyll` | Tells GitHub Pages **not** to run Jekyll, so files starting with `_` are served as-is. |

## Local preview

Any static server works. From this folder:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then open <http://localhost:8000>.

## Deploy as a GitHub Pages user-site (recommended)

This is set up for the URL **`https://Arcturus03.github.io`** — the repo just needs to
be named exactly `Arcturus03.github.io`.

```bash
cd <this folder>
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main

# Create the repo first on github.com (named Arcturus03.github.io, public),
# then connect and push:
git remote add origin https://github.com/Arcturus03/Arcturus03.github.io.git
git push -u origin main
```

Then on GitHub:

1. **Settings → Pages**
2. *Source:* `Deploy from a branch`
3. *Branch:* `main` / `/ (root)`
4. Save. The site is live at `https://Arcturus03.github.io` within ~1 minute.

## Deploy as a project page instead

If you'd rather host this at `https://Arcturus03.github.io/portfolio/`, name the repo `portfolio`,
push, and turn Pages on the same way. Nothing in the code uses absolute paths, so it just works.

## Updating the content

* **Projects grid** — edit the `PROJECTS` array near the top of `script.js`. Each entry has
  `title`, `date`, `blurb`, `tags` (used by the filter chips), `tagLabels` (the small chips on the card),
  `url` (or `null` if the repo is private), and `pin` (the small label in the corner).
* **Timeline** — edit the `<ol class="tl">` block in `index.html`.
* **Hero terminal lines** — edit the `lines` array near the top of `script.js`.
* **Skills constellation** — edit the `clusters` array further down in `script.js`.
* **Colors** — change the CSS custom properties at the top of `styles.css` (`--accent`, `--accent-2`, etc.).

## Accessibility notes

* Honors `prefers-reduced-motion`: starfield, terminal animation, and GRN graph stop / fall back to static for users who request reduced motion.
* All decorative canvases are `aria-hidden`.
* Skills constellation uses `<title>` elements per node so screen readers can announce skill names; cluster titles are in the SVG text.
* Keyboard focus is preserved (no custom focus suppression).
* Color palette is tuned for AA contrast on body text against the deep-navy background.

## License

All rights reserved by Hrithik Chandra. Code provided as-is for personal portfolio use.
