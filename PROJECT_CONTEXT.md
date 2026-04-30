# Hrithik Chandra · Arcturus Portfolio — Project Context & Handoff

> Self-contained design + decision log for the static portfolio site at
> `https://Arcturus03.github.io`. If a chat hits its context limit, you can
> paste this file (along with `index.html`, `styles.css`, `script.js`,
> `CV_HrithikChandra.pdf`) into a new chat and pick up exactly where the
> previous one left off.

---

## 1 · Quick start

| File | Purpose |
| --- | --- |
| `index.html` | All content, structure, semantic markup. ~21 KB / 420 lines. |
| `styles.css` | Visual theme — Arcturus orange + deep navy. ~28 KB / 670 lines. |
| `script.js` | Vanilla-JS interactions: starfield, terminal typing, GRN graph, scroll reveals, project + cert filters, skills constellation. ~25 KB / 575 lines. |
| `.nojekyll` | Empty file telling GitHub Pages to skip Jekyll processing. |
| `README.md` | Lean operational doc (deploy + update). |
| `PROJECT_CONTEXT.md` | This file — full design rationale + handoff. |
| `CV_HrithikChandra.pdf` | The CV the site links to. |
| `CV_HrithikChandra.docx` | Source. Not linked from the site. |

### Local preview

```bash
cd <this folder>
python -m http.server 8000   # then open http://localhost:8000
```

### Deploy (one-time setup)

Repo MUST be named exactly `Arcturus03.github.io` for the user-site URL.

```bash
git init && git branch -M main
git add . && git commit -m "Initial portfolio site"
git remote add origin https://github.com/Arcturus03/Arcturus03.github.io.git
git push -u origin main
```

Then **Settings → Pages → Source: Deploy from branch → main / root**.
Live at `https://Arcturus03.github.io` within ~1 minute.

### Updates after first deploy

```bash
git add . && git commit -m "describe change" && git push
```

GitHub Pages re-builds automatically.

### Authentication note

If `git push` prompts for "Username for github.com":
- Username = `Arcturus03`
- Password = a **Personal Access Token** (not your GitHub login password). Generate at <https://github.com/settings/tokens>, scope `repo`.
- One-time fix: install GitHub CLI on WSL — `sudo apt install gh && gh auth login` — pushes silently after that.

---

## 2 · Profile read (the story we're telling)

Hrithik Chandra is a final-year BSc Computer Science (AI specialisation) student at the University of Hertfordshire, finishing September 2026. The site builds the narrative around three signals derived from his CV + GitHub:

1. **Research-leaning ML.** Strongest single piece of evidence: the Final-Year Project encoding gene-regulatory-network topology as a structural prior for ML, with a custom continuous-time ODE simulator producing synthetic transcriptomic data + ground-truth GRNs, then comparing tabular baselines (Ridge, RF, MLP) against PyTorch-Geometric GNNs.
2. **Shipping-minded engineer.** Ipsos work-experience reproducible eval pipeline; HackLondon 2026 RetrofitIQ (UK property retrofit-priority scorer integrating EPC, HM Land Registry, flood, planning data); UCL Holistic AI hack (Stereotype Stompers — bias detection in healthcare text via fine-tuned GPT-2).
3. **Community + leadership.** Three years of student-facing roles at UH: Student Representative (Bronze + Silver awards), HertSquad Activator, now Student Guide. BCS chapter member.

Self-positioning, in his own words: **"a generalist with depth where it counts."** Open to ML / data-science roles in tech, finance, market research, bioinformatics, automotive.

GitHub repos referenced from the site:
- `Arcturus03/gene-expression-project` — FYP, public.
- `Arcturus03/Hacklondon2026` — HackLondon backend, public.
- `Arcturus03/Hacklondon_FE` — HackLondon front-end, public.
- `Arcturus03/healthcare-management-system-nhs` — coursework, public.

---

## 3 · Design system

### Palette (cosmic / Arcturus)

| Variable | Hex | Role |
| --- | --- | --- |
| `--bg-deep` | `#07091a` | Page background (near-black with hint of blue) |
| `--bg-mid` | `#0c1030` | Card / surface background |
| `--bg-elev` | `#1a1f4d` | Hovered card / elevated surface |
| `--text` | `#e8ecf8` | Primary body text |
| `--text-mute` | `#8d93b8` | Secondary body text |
| `--text-dim` | `#5e6390` | Tertiary / hint text |
| `--accent` | `#ff8a3d` | **Arcturus orange** — primary CTAs, marks |
| `--accent-soft` | `#ffb070` | Lighter orange for highlights |
| `--accent-2` | `#f5b942` | Warm gold (ML & data category) |
| `--accent-cool` | `#6cb4ff` | Cool blue (tools category) |
| `--green` | `#9ee7c5` | Mint (concepts category, success) |

Concept hook: Arcturus is the brightest star in the northern hemisphere and historically a navigation star — fits "guidance through curiosity," which is how Hrithik describes his approach.

### Typography

- **Body**: Inter (300, 400, 500, 600, 700)
- **Display**: Space Grotesk (500, 600, 700)
- **Mono / terminal**: JetBrains Mono (400, 500)
- All loaded from Google Fonts via `<link rel="preconnect">` + stylesheet.

### Spacing

- `--maxw: 1180px` (container)
- `--pad: clamp(20px, 4vw, 40px)` (responsive horizontal padding)
- Section vertical padding: `clamp(80px, 10vw, 140px) 0`
- Border radii: `--radius: 14px` (cards), `--radius-sm: 10px`

---

## 4 · Site structure (single-page narrative scroll)

| # | Section | ID | Anchor | What it does |
| --- | --- | --- | --- | --- |
| — | Terminal stage | none (anchor: `#top`) | — | Full-viewport "ssh hrithik@arcturus.systems" terminal that types out a profile.json. |
| — | Intro | `#intro` | `#intro` | Named introduction: "HRITHIK CHANDRA / Building intelligent systems that endure, adapt and elevate performance." Sub-paragraph + CTAs (View FYP, Download CV, GitHub, LinkedIn). |
| 01 | About / Story | `#about` | `#about` | Personal narrative + 3 pillar cards (Curiosity / Craft / Community). |
| 02 | Final Year Project | `#feature` | `#feature` | Animated GRN force-directed graph behind the FYP write-up. |
| 03 | Journey | `#timeline` | `#timeline` | Vertical alternating-side timeline of education / work / hackathons. |
| 04 | Lab notebook | `#projects` | `#projects` | Filterable project grid. Tags: ML / NLP / Research / Web / Java / Hackathon / Industry. |
| 05 | Skills constellation | `#skills` | `#skills` | SVG constellation: 4 clusters (Languages / ML & Data / Tools / Concepts). |
| 06 | Certifications & awards | `#certifications` | `#certifications` | Filterable cert grid. Categories: Technical / Recognition / Leadership / Safety. Newest first. |
| 07 | Let's talk | `#contact` | `#contact` | Email / LinkedIn / GitHub / CV download cards. |
| — | Footer | — | `#top` | Year auto-updates via JS. Back-to-top link. |

The nav is sticky and frosted-glass on scroll. Mobile: hamburger toggles a full-screen menu.

---

## 5 · Interactive moments

1. **Starfield (background)** — `<canvas id="starfield">` fixed behind everything. ~180 stars, twinkling sine-waves, ~8% are warm-coloured for visual variety. Bypassed under `prefers-reduced-motion`.
2. **Terminal typing** — `#terminal` types out a 12-line ssh session (`auth: identity verified` → `cat profile.json` with name/role/location/focus/toolbelt/shipped/aim/status). Each line is a `<div class="line">` block; CSS `padding-left: 15ch; text-indent: -15ch` gives a hanging indent so wrapped values align after the colon. Per-char timing 22-56ms (slow, weighty); inter-line 150ms; long beats (540ms) after `auth` and before final `run`. Total ~12-15 seconds.
3. **Word reveal in intro** — "endure, / adapt and / elevate performance." Each word fades in sequentially (0.05/0.40/0.75s delays) when the intro section is ≥40% in view. Triggered once via IntersectionObserver. Replaced an earlier rotating-word animation that disappeared too quickly.
4. **GRN force-directed graph** — `#grnCanvas` runs a tiny custom physics sim (24 nodes, scale-free-ish edges, repulsion + spring + centring forces). Nodes "fire" on a per-node schedule and propagate pulses down outgoing edges. Pure vanilla JS, ~150 lines.
5. **Timeline scroll-reveal** — `IntersectionObserver` adds `.in-view` to each `.tl__item` as it enters viewport.
6. **Project filter** — chips with `data-filter`; clicking one toggles `.is-hidden` on cards whose `data-tags` don't include the filter.
7. **Cert filter** — analogous mechanism with `data-cert-filter` and `data-cat`.
8. **Skills constellation** — SVG built in JS: 4 cluster centres, each with N stars on a ring, edges from centre + random chords, glow filter via `<feGaussianBlur>`. Hover scales node and reveals name via `<title>`.
9. **Card cursor glow** — `mousemove` on `.card` updates `--mx` / `--my` CSS vars; a radial-gradient `::before` pseudo-element follows the cursor.

---

## 6 · Data sources (where to edit content)

| Want to change… | Edit |
| --- | --- |
| Terminal lines | `lines` array near top of `script.js` (around line 82) |
| Hero copy | `index.html` `.intro__lead` and `.intro__sub` |
| About copy + pillar cards | `index.html` `.about__copy` + `.pillars` |
| FYP description + bullets | `index.html` `.feature__copy` |
| Timeline entries | `index.html` `<ol class="tl">` |
| Project cards | `PROJECTS` array in `script.js` (around line 305) |
| Skills clusters | `clusters` array in `script.js` skills constellation section |
| Cert entries | `CERTS` array in `script.js` (around line 410) |
| Contact cards | `index.html` `.contact__grid` |
| Colour palette | CSS custom properties at top of `styles.css` (`:root { --bg-deep: ... }`) |

Each `PROJECTS` entry has: `title`, `date`, `blurb`, `tags` (filter keys), `tagLabels` (visible chips), `url` (or `null`), `pin` (corner badge).

Each `CERTS` entry has: `date`, `title`, `issuer`, `cat` (one of `technical | recognition | leadership | safety`), and optional `status` (renders an animated "in progress" pill).

---

## 7 · Decision log

| Decision | Rationale |
| --- | --- |
| Single-page narrative scroll vs multi-page | Recruiters skim CVs in ~30s; single-page lets us control that arc. Each "wow" moment owns its own section so they don't fight. |
| Cosmic / Arcturus theme | Hooks straight into his GitHub handle. Orange-on-navy is uncommon among student portfolios and signals confidence without screaming. |
| FYP gets its own section, not just a card | Strongest technical signal — encoding causal structure as model prior is non-trivial and recruiter-legible. Burying it in a grid would have wasted it. |
| Generalist-with-depth framing in intro | Hrithik specifically asked for this; CV professional summary backs it (mentions multiple industries: tech, finance, market research, bioinformatics, automotive). |
| Word-reveal redesigned to side-by-side reveal | Original rotating animation had a 3s gap before "adapt" and only stayed for <1s — left users staring at a blank space. New scroll-triggered sequential fade keeps all three words visible. |
| Terminal split into its own scroll-stop | User feedback. Made the terminal a full-viewport experience with a "scroll" indicator pill, so it's a deliberate moment, not a half-overlap with the intro. |
| Hanging indent in terminal | When `toolbelt: ...` wraps, the second line should align with the value column (col 15), not collapse to col 0. CSS hanging indent does this without per-element wrappers. |
| Certifications promoted to dedicated section | User feedback. Originally tucked at the bottom of the Skills section; felt diminished. Now a 7th section with its own filter, ordered most-recent-first. |
| Vanilla JS, no framework | GitHub Pages user-site = static. Zero build step. No npm install, no bundler, no React. Easier for the user to maintain by hand. |
| `.nojekyll` included | Forces GH Pages to serve files literally instead of running the default Jekyll preprocessor (which can hide files starting with `_` and process Markdown unexpectedly). |

---

## 8 · Accessibility

- 1 H1 (intro), 6 H2s (each section), proper H3/H4 hierarchy
- Every `target="_blank"` has `rel="noopener"`
- Decorative canvases (`#starfield`, `#grnCanvas`) have `aria-hidden="true"`
- SVG stars in skills constellation have `<title>` children for screen-reader skill names
- Cluster titles rendered as actual `<text>` elements
- `prefers-reduced-motion` honoured: starfield + GRN graph hidden, terminal renders instantly, transitions clamped to 0.001ms
- AA contrast on body text against the deep-navy background
- Keyboard focus states preserved (no custom suppression)

---

## 9 · Open recommendations (not yet implemented)

### Alternative palettes (cosmic / star-themed)

The user asked for these as options. Keep the structural pattern (deep dark BG + 1 primary warm/cool accent + 1-2 supporting hues + a "muted" neutral). All swap-in by editing the `:root` vars at the top of `styles.css`.

**A. Cassiopeia (regal pink-magenta + gold)**
- `--bg-deep: #0a0717`
- `--accent: #ff6e9c` (Cassiopeia A nebula glow)
- `--accent-2: #ffd166`
- `--accent-cool: #8a9bff`
- Vibe: jewel-tone, slightly more elegant. Cassiopeia is a queen constellation.

**B. Polaris (icy cyan + frost lavender)**
- `--bg-deep: #050a1a`
- `--accent: #5ee0ff`
- `--accent-2: #fff5d6` (starlight cream)
- `--accent-cool: #a8b8ff`
- Vibe: cooler, sharper, "tech researcher." Polaris = the constant guidance star.

**C. Vega (electric blue + violet)**
- `--bg-deep: #07091f`
- `--accent: #5b8eff` (Vega is blue-white)
- `--accent-2: #c98aff`
- `--accent-cool: #ffd693`
- Vibe: ambitious and electric. Vega = brightness in Lyra.

**D. Antares (red + amber + teal)**
- `--bg-deep: #1a0710`
- `--accent: #ff5b5b` (Antares red)
- `--accent-2: #ffa86b`
- `--accent-cool: #6abfd6`
- Vibe: bolder, more dramatic. Antares = "rival of Mars."

**E. Aurora (emerald + magenta + cyan, the playful one)**
- `--bg-deep: #051418`
- `--accent: #6effc4`
- `--accent-2: #b078ff`
- `--accent-cool: #5be0ff`
- Vibe: most playful. Aurora suggests wonder, not a single star.

**F. Andromeda (galactic gradient — keeps Arcturus warmth, adds purple)**
- `--bg-deep: #0a0820`
- `--accent: #ff8a3d` (keep current)
- `--accent-2: #b878ff`
- `--accent-cool: #6cb4ff` (keep)
- Vibe: middle ground. Same warmth, more cosmic depth. Smallest visual jump from current.

### Skills constellation upgrades

The current skills section is a 2×2 grid of static rings with lines and a hover-scale on stars. Possible upgrades:

1. **Live force-directed sim** (the strongest) — replace the static layout with a small physics simulation: each cluster is a "gravity well," nodes drift. Hover a category title and that cluster's stars pulse + opposing clusters dim. Click a star to brings up a small popover listing the projects/contexts where that skill was used. ~150 lines of vanilla JS.

2. **Animated stroke-on draw** — on scroll-into-view, edges animate drawing themselves (`stroke-dasharray` + `stroke-dashoffset` transition) like the constellation is being sketched. Cheap (~30 lines of CSS), high payoff visually.

3. **Time-aware constellation** — distance-from-centre encodes recency / depth. "Recently learned, used a lot" sits closer + brighter; "older but foundational" further out + dimmer. Adds a small year selector that filters which stars are visible. Tells a learning-trajectory story, not just a checklist.

4. **3D rotating constellation** (Three.js) — biggest visual jump, biggest cost. Mouse drags rotate the scene. Worth doing only if the user is willing to add Three.js (a CDN script tag, no build step needed). About 200-300 lines.

5. **Project-linked highlight** — hover a project card up in the Lab Notebook section and the corresponding skill stars in the constellation pulse. Establishes a visual link between "what I built" and "what I used." Needs ~50 lines of cross-section JS.

6. **Glow-trail cursor** — small particle trail follows the cursor inside the constellation panel; particles snap toward stars near the cursor. Pure aesthetic, ~80 lines.

My recommendation for next iteration: combine #1 (force-directed) + #2 (stroke-on draw on first scroll-in). Keeps the section as the "feels alive" centrepiece without the Three.js cost.

### Other polish ideas

- **Dark-mode toggle (light theme)** — currently dark-only. A light theme would just remap `--bg-deep` / `--text` and keep accents.
- **OG image** — drop a `og-image.png` (1200×630) for nicer social-media preview cards, then add `<meta property="og:image" ...>`.
- **Contact form** — currently `mailto:` only. Could add a Netlify Forms / Formspree-backed form if you want to capture messages without exposing the inbox.
- **Analytics** — no tracking is currently embedded. Plausible / GoatCounter (privacy-friendly) takes ~5 lines.
- **Per-project case-study pages** — a few featured projects (FYP, RetrofitIQ) could grow into deep-dive pages with screenshots, design notes, results. Linked from the project cards.
- **Light "lab notebook" entries** — short technical posts (e.g. "Why I chose PyTorch Geometric over DGL"). Could live under `/notes/` as plain HTML or be migrated to a simple Markdown→HTML build later.

---

## 10 · How to resume in a new chat

If/when this conversation hits the context limit, open a new chat and paste:

> *"I'm continuing work on my GitHub Pages portfolio site. The full design log + decision history is in `PROJECT_CONTEXT.md` in my CV-website folder. Please read that file plus `index.html`, `styles.css`, `script.js`, and `CV_HrithikChandra.pdf` before doing anything. Then [your new task here]."*

Attach `PROJECT_CONTEXT.md` (this file), `index.html`, `styles.css`, `script.js`, and `CV_HrithikChandra.pdf`. The new chat now has every design choice with rationale, the file map, the decision log, and the open recommendations — enough to act like the previous chat without re-asking.

---

## 11 · Known quirks & how to fix them

| Symptom | Cause | Fix |
| --- | --- | --- |
| File edits look truncated; sizes don't grow | OneDrive briefly locks the file mid-write | Right-click `CV-website` folder → "Always keep on this device". Or close OneDrive's "Files On-Demand" temporarily while editing. |
| `git push` keeps prompting for password | No credential helper configured | `gh auth login` once (GitHub CLI), or `git config --global credential.helper "cache --timeout=86400"`. |
| Site loads but no styles | Filename case mismatch (Pages is case-sensitive) | Confirm `<link href="styles.css">` matches the actual filename byte-for-byte. |
| 404 on `arcturus03.github.io` | Repo not named exactly `Arcturus03.github.io` (or Pages not enabled yet) | Rename repo or wait ~2 min after enabling Pages and refresh. |
| Terminal types but skips characters | Browser tab in background throttles `setTimeout` | Expected — comes back to normal when tab is foregrounded. |

---

## 12 · Build / deploy timeline (for posterity)

- Initial site: `index.html` + `styles.css` + `script.js` + `README.md` + `.nojekyll` + CV files. Architecture decided after AskUserQuestion (single-page, cosmic, four interactive moments, GH Pages user-site).
- Iteration 1: split hero into terminal-stage + named intro; rewrote intro paragraph from CV summary; replaced rotating-word with side-by-side scroll-triggered reveal; bumped name + intro paragraph size and lightened.
- Iteration 2: slowed terminal typing (22-56ms per char vs 12-34); added hanging indent for value wrapping; promoted certifications from a sub-list of Skills to its own section #06 with category filter + most-recent-first ordering.

End of file.
