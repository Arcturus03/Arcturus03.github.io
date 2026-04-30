/* =========================================================
   Hrithik Chandra — portfolio interactions
   Vanilla JS, no build step. Plays nicely on GH Pages.
   ========================================================= */

(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------
     1. Sticky nav state
  ------------------------------------------------------- */
  const nav = document.getElementById("nav");
  const navMenu = document.getElementById("navMenu");
  const onScroll = () => nav.classList.toggle("is-stuck", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navMenu.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    navMenu.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.querySelectorAll(".nav__links a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navMenu.setAttribute("aria-expanded", "false");
    });
  });

  /* -------------------------------------------------------
     2. Starfield (background canvas)
  ------------------------------------------------------- */
  const starfield = document.getElementById("starfield");
  if (starfield && !reduceMotion) {
    const ctx = starfield.getContext("2d");
    let stars = [];
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = starfield.width = window.innerWidth * dpr;
      h = starfield.height = window.innerHeight * dpr;
      starfield.style.width = window.innerWidth + "px";
      starfield.style.height = window.innerHeight + "px";
      const count = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (Math.random() * 1.2 + 0.2) * dpr,
        a: Math.random() * 0.7 + 0.2,
        s: Math.random() * 0.4 + 0.05,
        p: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.08
      }));
    }
    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const tw = 0.5 + 0.5 * Math.sin(t * 0.001 * s.s + s.p);
        ctx.globalAlpha = s.a * tw;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.warm ? "#ffb070" : "#dde4ff";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", resize);
    requestAnimationFrame(frame);
  }

  /* -------------------------------------------------------
     3. Hero terminal typing intro
        Renders each line as a block-level <div class="line">
        so wrapped value text aligns after the colon (CSS handles
        the hanging indent via padding-left + negative text-indent).
  ------------------------------------------------------- */
  const termEl = document.getElementById("terminal");
  if (termEl) {
    const lines = [
      { text: "$ ssh hrithik@arcturus.systems",                                                                     cls: "" },
      { text: "auth: identity verified",                                                                             cls: "green",  indent: "  " },
      { text: "$ cat profile.json",                                                                                  cls: "" },
      { text: "name        : Hrithik Chandra",                                                                       cls: "mute",   indent: "  " },
      { text: "role        : generalist-leaning ML / Data Science, final-year BSc CS (AI)",                          cls: "mute",   indent: "  " },
      { text: "location    : Hatfield, UK -- open to UK / hybrid / remote",                                          cls: "mute",   indent: "  " },
      { text: "focus       : ML, Data Science, NLP, applied research",                                               cls: "mute",   indent: "  " },
      { text: "toolbelt    : Python, PyTorch, Pandas, Numpy, Scipy, Matplotlib, scikit-learn, NetworkX, Java, SQL",  cls: "mute",   indent: "  " },
      { text: "shipped     : gene-expression GNN, RetrofitIQ, Stereotype Stompers, Ipsos",                           cls: "mute",   indent: "  " },
      { text: "aim         : build systems that endure, adapt, elevate performance",                                 cls: "mute",   indent: "  " },
      { text: "status      : open to graduate roles & internships",                                                  cls: "accent", indent: "  " },
      { text: "$ run portfolio.show()",                                                                              cls: "" }
    ];

    if (reduceMotion) {
      termEl.innerHTML = lines.map(l =>
        `<div class="line ${l.cls}">${(l.indent || "")}${escapeHtml(l.text)}</div>`
      ).join("");
    } else {
      let li = 0, ci = 0, current = "";
      function tick() {
        if (li >= lines.length) return;
        const line = lines[li];
        const indent = line.indent || "";
        if (ci === 0) {
          termEl.insertAdjacentHTML("beforeend",
            `<div class="line ${line.cls}" data-active>${indent}</div>`);
        }
        const span = termEl.querySelector("[data-active]");
        if (ci < line.text.length) {
          current += line.text[ci];
          span.textContent = indent + current;
          ci++;
          // Slower per-char typing for a weightier feel.
          setTimeout(tick, 22 + Math.random() * 34);
        } else {
          span.removeAttribute("data-active");
          current = ""; ci = 0; li++;
          // Longer beats after `auth` and before final `run`.
          setTimeout(tick, (li === 2 || li === 11) ? 540 : 150);
        }
      }
      setTimeout(tick, 480);
    }

    function escapeHtml(s) {
      return s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
    }
  }

  /* -------------------------------------------------------
     4. Animated GRN graph (FYP feature)
  ------------------------------------------------------- */
  const grnCanvas = document.getElementById("grnCanvas");
  if (grnCanvas && !reduceMotion) {
    const ctx = grnCanvas.getContext("2d");
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    const N = 24;
    const nodes = [];
    const edges = [];
    for (let i = 0; i < N; i++) {
      nodes.push({
        x: 0, y: 0, vx: 0, vy: 0,
        r: 4 + Math.random() * 3,
        fire: 0,
        nextFire: Math.random() * 5
      });
    }
    for (let i = 1; i < N; i++) {
      const targets = new Set();
      const k = 1 + (Math.random() < 0.4 ? 1 : 0) + (Math.random() < 0.15 ? 1 : 0);
      while (targets.size < k) {
        const j = Math.floor(Math.pow(Math.random(), 1.6) * i);
        if (j !== i) targets.add(j);
      }
      for (const j of targets) edges.push({ a: i, b: j, w: 0.4 + Math.random() * 0.6, pulse: 0 });
    }

    function placeNodes() {
      for (let i = 0; i < N; i++) {
        nodes[i].x = (Math.random() * 0.7 + 0.15) * W;
        nodes[i].y = (Math.random() * 0.7 + 0.15) * H;
        nodes[i].vx = (Math.random() - 0.5) * 0.3;
        nodes[i].vy = (Math.random() - 0.5) * 0.3;
      }
    }
    function resize() {
      const rect = grnCanvas.parentElement.getBoundingClientRect();
      W = grnCanvas.width = rect.width * dpr;
      H = grnCanvas.height = rect.height * dpr;
      grnCanvas.style.width = rect.width + "px";
      grnCanvas.style.height = rect.height + "px";
      placeNodes();
    }

    const REPEL = 9000;
    const SPRING = 0.0015;
    const SPRING_LEN = 110;
    const DAMP = 0.86;

    function step(dt) {
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy + 0.01;
          const d = Math.sqrt(d2);
          const f = REPEL / d2;
          const fx = (dx / d) * f, fy = (dy / d) * f;
          a.vx += fx * dt; a.vy += fy * dt;
          b.vx -= fx * dt; b.vy -= fy * dt;
        }
      }
      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const f = (d - SPRING_LEN * dpr) * SPRING * e.w;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        a.vx += fx * dt; a.vy += fy * dt;
        b.vx -= fx * dt; b.vy -= fy * dt;
      }
      const cx = W / 2, cy = H / 2;
      for (const n of nodes) {
        n.vx += (cx - n.x) * 0.00006 * dt;
        n.vy += (cy - n.y) * 0.00006 * dt;
        n.vx *= DAMP; n.vy *= DAMP;
        n.x += n.vx; n.y += n.vy;
        const m = 30 * dpr;
        if (n.x < m) { n.x = m; n.vx *= -0.4; }
        if (n.y < m) { n.y = m; n.vy *= -0.4; }
        if (n.x > W - m) { n.x = W - m; n.vx *= -0.4; }
        if (n.y > H - m) { n.y = H - m; n.vy *= -0.4; }
      }
    }

    function fireAndPropagate() {
      for (let i = 0; i < N; i++) {
        const n = nodes[i];
        n.nextFire -= 0.016;
        if (n.nextFire <= 0) {
          n.fire = 1;
          n.nextFire = 2 + Math.random() * 5;
          for (const e of edges) if (e.a === i) e.pulse = 1;
        }
        n.fire *= 0.96;
      }
      for (const e of edges) e.pulse *= 0.94;
    }

    let last = performance.now();
    function frame(t) {
      const dt = Math.min(2, (t - last) / 16); last = t;
      step(dt);
      fireAndPropagate();
      ctx.clearRect(0, 0, W, H);

      for (const e of edges) {
        const a = nodes[e.a], b = nodes[e.b];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.lineWidth = (0.5 + e.pulse * 1.2) * dpr;
        const alpha = 0.10 + e.pulse * 0.45;
        ctx.strokeStyle = e.pulse > 0.1
          ? `rgba(255, 176, 112, ${alpha.toFixed(3)})`
          : `rgba(180, 195, 230, ${alpha.toFixed(3)})`;
        ctx.stroke();
      }

      for (const n of nodes) {
        const fire = n.fire;
        const r = n.r * dpr * (1 + fire * 0.6);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grad.addColorStop(0, fire > 0.2 ? `rgba(255, 138, 61, ${0.45 * fire + 0.05})` : "rgba(108,180,255,0.12)");
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2); ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = fire > 0.2 ? "rgba(255, 200, 140, 0.85)" : "rgba(180, 210, 255, 0.9)";
        ctx.fill();
      }

      requestAnimationFrame(frame);
    }
    resize();
    window.addEventListener("resize", () => { resize(); });
    requestAnimationFrame(frame);
  }

  /* -------------------------------------------------------
     5. Reveal on scroll (timeline + others)
  ------------------------------------------------------- */
  const observer = ("IntersectionObserver" in window)
    ? new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" })
    : null;
  document.querySelectorAll(".tl__item, .reveal").forEach(el => {
    if (observer) observer.observe(el);
    else el.classList.add("in-view");
  });

  /* Word reveal — sequential side-by-side fade-in once the intro
     scrolls into view. Plays exactly once. */
  const wr = document.querySelector(".word-reveal");
  if (wr) {
    if (reduceMotion) {
      wr.classList.add("is-revealed");
    } else if ("IntersectionObserver" in window) {
      const wo = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            wr.classList.add("is-revealed");
            wo.unobserve(wr);
          }
        });
      }, { threshold: 0.4 });
      wo.observe(wr);
    } else {
      wr.classList.add("is-revealed");
    }
  }

  /* -------------------------------------------------------
     6. Projects: data → cards, filterable
  ------------------------------------------------------- */
  const PROJECTS = [
    {
      title: "Predicting Gene Expression with GRN-aware GNNs",
      date: "2025 — Sept 2026",
      blurb: "Final-Year Project. Custom continuous-time GRN simulator (ODEs) generates synthetic transcriptomic data + ground-truth causal graphs. Compares Ridge / RF / MLP baselines against PyTorch-Geometric GNNs. Graph-aware models cut MSE/MAE and lift R².",
      tags: ["ml", "research"],
      tagLabels: ["Python", "PyTorch Geometric", "NetworkX", "ODEs", "Research"],
      url: "https://github.com/Arcturus03/gene-expression-project",
      pin: "FYP"
    },
    {
      title: "RetrofitIQ — UK property retrofit-priority scorer",
      date: "Feb 2026 · 22h",
      blurb: "HackLondon 2026 build. Composite priority scoring from MHCLG EPC, HM Land Registry price-paid, Environment Agency flood, and planning constraint datasets. Led backend, scoring logic, data integration. Stack: Python · Flask · MongoDB · React · Leaflet.",
      tags: ["web", "hackathon"],
      tagLabels: ["Flask", "MongoDB", "React", "Leaflet", "Tailwind"],
      url: "https://github.com/Arcturus03/Hacklondon2026",
      pin: "HackLondon"
    },
    {
      title: "Stereotype Stompers — bias detection in healthcare text",
      date: "Nov 2025",
      blurb: "Holistic AI × UCL Hackathon, Track 2 (Trustworthy Models). Multi-source corpus (real scrapes + GPT-2 / Gemini synthetic + EMGSD); fine-tuned GPT-2 to flag biased medical phrasings and propose fairer alternatives. Targets healthcare AI auditing & DEI compliance.",
      tags: ["nlp", "hackathon"],
      tagLabels: ["GPT-2", "PyTorch", "Trust & Safety"],
      url: null,
      pin: "UCL Hack"
    },
    {
      title: "TripAdvisor sentiment classifier",
      date: "Level 6",
      blurb: "Custom Naïve Bayes from scratch (with Laplace smoothing) over 4000 reviews — 93.3% F1. Tokenisation, stemming, stop-word removal pipeline. Compared head-to-head with library Logistic Regression, SVM, and Random Forest.",
      tags: ["nlp", "ml"],
      tagLabels: ["Python", "scikit-learn", "NLP"],
      url: null,
      pin: "Course"
    },
    {
      title: "Healthcare Management System",
      date: "Level 6 · Software Architecture",
      blurb: "3-tier MVC Java application: 14+ model classes, 4 controllers, Singleton-managed referral queue. Java Swing GUI with JTable + form dialogs across 5+ modules; CSV persistence; Git-based agile flow.",
      tags: ["java"],
      tagLabels: ["Java", "Swing", "MVC", "Design Patterns"],
      url: "https://github.com/Arcturus03/healthcare-management-system-nhs",
      pin: "Course"
    },
    {
      title: "Synthetic-data evaluation pipeline",
      date: "Aug — Sept 2025",
      blurb: "Work-experience build at Ipsos UK. Reproducible OOP-structured eval pipeline for synthetic tabular data — pandas / numpy / scikit-learn — producing auditable, comparable outputs across model and hyperparameter sweeps. Communicated findings to mixed audiences.",
      tags: ["ml", "industry"],
      tagLabels: ["Python", "OOP", "Reproducible ML"],
      url: null,
      pin: "Ipsos UK"
    },
    {
      title: "UniMarketplace",
      date: "Level 4 · Team Software Project",
      blurb: "Led a team building a responsive eCommerce web app end-to-end — requirements through deployment — using HTML / CSS / JavaScript and Agile methods. First proper experience owning the full delivery lifecycle.",
      tags: ["web"],
      tagLabels: ["HTML", "CSS", "JavaScript", "Agile"],
      url: null,
      pin: "Team Lead"
    }
  ];

  const cardsEl = document.getElementById("cards");
  if (cardsEl) {
    cardsEl.innerHTML = PROJECTS.map(p => `
      <li class="card" data-tags="${p.tags.join(" ")}">
        <div class="card__head">
          <span class="card__date">${p.date}</span>
          <span class="card__pin">${p.pin}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.blurb}</p>
        <div class="card__tags">${p.tagLabels.map(t => `<span>${t}</span>`).join("")}</div>
        ${p.url
          ? `<a class="card__link" href="${p.url}" target="_blank" rel="noopener">View on GitHub →</a>`
          : `<span class="card__link is-disabled">Code not public</span>`}
      </li>
    `).join("");

    cardsEl.querySelectorAll(".card").forEach(card => {
      card.addEventListener("mousemove", (ev) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${ev.clientX - r.left}px`);
        card.style.setProperty("--my", `${ev.clientY - r.top}px`);
      });
    });

    document.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const f = btn.dataset.filter;
        cardsEl.querySelectorAll(".card").forEach(c => {
          const tags = c.dataset.tags.split(" ");
          c.classList.toggle("is-hidden", f !== "all" && !tags.includes(f));
        });
      });
    });
  }

  /* -------------------------------------------------------
     6b. Certifications & awards: data → cards, filterable
         Ordered most-recent-first.
  ------------------------------------------------------- */
  const CERTS = [
    { date: "2025 — present", title: "IBM Data Science Professional Certificate",        issuer: "Coursera · IBM",                                              cat: "technical",   status: "in progress" },
    { date: "2023 — 24",      title: "BCS · UH Computer Science Chapter Member",          issuer: "BCS · University of Hertfordshire Students' Union",          cat: "recognition" },
    { date: "2024",           title: "Student Rep Award — Silver Level",                  issuer: "University of Hertfordshire Rep Excellence Programme",       cat: "recognition" },
    { date: "Sept 2024",      title: "CSLA Level 2 — Community & Sports Leadership Award", issuer: "UK Coaching",                                                cat: "leadership" },
    { date: "Sept 2024",      title: "FAA Level 3 — Emergency First Aid at Work (RQF)",   issuer: "Nuco Training",                                              cat: "safety" },
    { date: "Sept 2024",      title: "Adult Safeguarding in Physical Activity & Sport",   issuer: "UK Coaching",                                                cat: "safety" },
    { date: "Aug 2024",       title: "Go Herts Award — Bronze",                            issuer: "University of Hertfordshire",                                cat: "recognition" },
    { date: "2023 — 24",      title: "Student Rep Award — Bronze Level",                  issuer: "University of Hertfordshire Rep Excellence Programme",       cat: "recognition" },
    { date: "Jan 2023",       title: "Intro to CS & Programming Specialization",          issuer: "Goldsmiths, University of London (Coursera)",                cat: "technical" }
  ];

  const CERT_CAT_LABEL = {
    technical:   "Technical",
    recognition: "Recognition",
    leadership:  "Leadership",
    safety:      "Safety"
  };

  const certsGridEl = document.getElementById("certsGrid");
  if (certsGridEl) {
    certsGridEl.innerHTML = CERTS.map(c => `
      <li class="cert" data-cat="${c.cat}">
        <span class="cert__date">${c.date}</span>
        <h3 class="cert__title">${c.title}</h3>
        <p class="cert__issuer">${c.issuer}</p>
        ${c.status ? `<span class="cert__status">${c.status}</span>` : ""}
        <span class="cert__cat" data-cat="${c.cat}">${CERT_CAT_LABEL[c.cat]}</span>
      </li>
    `).join("");

    document.querySelectorAll('[data-cert-filter]').forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll('[data-cert-filter]').forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const f = btn.dataset.certFilter;
        certsGridEl.querySelectorAll(".cert").forEach(c => {
          c.classList.toggle("is-hidden", f !== "all" && c.dataset.cat !== f);
        });
      });
    });
  }

  /* -------------------------------------------------------
     7. Skills constellation (SVG)
  ------------------------------------------------------- */
  const constSvg = document.getElementById("constellation");
  if (constSvg) {
    const SVG_NS = "http://www.w3.org/2000/svg";

    const clusters = [
      { title: "LANGUAGES",          color: "#ff8a3d", cx: 180, cy: 130, skills: ["Python", "Java", "JavaScript", "SQL", "HTML / CSS"] },
      { title: "ML & DATA",          color: "#f5b942", cx: 510, cy: 130, skills: ["PyTorch", "PyTorch Geometric", "scikit-learn", "pandas", "numpy", "NetworkX", "matplotlib", "scipy"] },
      { title: "TOOLS & FRAMEWORKS", color: "#6cb4ff", cx: 180, cy: 380, skills: ["Git / GitHub", "Jupyter", "VS Code", "Flask", "MongoDB", "React", "Leaflet"] },
      { title: "CONCEPTS",           color: "#9ee7c5", cx: 510, cy: 380, skills: ["OOP", "MVC", "Design Patterns", "REST APIs", "Agile / Scrum", "ML / DL", "NLP", "CI/CD"] }
    ];

    clusters.forEach((cl, idx) => {
      const radius = 80;
      const positions = cl.skills.map((s, i) => {
        const angle = (i / cl.skills.length) * Math.PI * 2 - Math.PI / 2 + idx * 0.3;
        return { name: s, x: cl.cx + Math.cos(angle) * radius, y: cl.cy + Math.sin(angle) * radius };
      });

      positions.forEach(p => {
        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", cl.cx);
        line.setAttribute("y1", cl.cy);
        line.setAttribute("x2", p.x);
        line.setAttribute("y2", p.y);
        line.setAttribute("class", "skill-line");
        constSvg.appendChild(line);
      });
      for (let i = 0; i < positions.length; i++) {
        const j = (i + 1) % positions.length;
        if (Math.random() < 0.55) {
          const line = document.createElementNS(SVG_NS, "line");
          line.setAttribute("x1", positions[i].x);
          line.setAttribute("y1", positions[i].y);
          line.setAttribute("x2", positions[j].x);
          line.setAttribute("y2", positions[j].y);
          line.setAttribute("class", "skill-line");
          constSvg.appendChild(line);
        }
      }

      const anchor = document.createElementNS(SVG_NS, "circle");
      anchor.setAttribute("cx", cl.cx);
      anchor.setAttribute("cy", cl.cy);
      anchor.setAttribute("r", 5);
      anchor.setAttribute("fill", cl.color);
      anchor.setAttribute("opacity", "0.35");
      constSvg.appendChild(anchor);

      const title = document.createElementNS(SVG_NS, "text");
      title.setAttribute("x", cl.cx);
      title.setAttribute("y", cl.cy - 100);
      title.setAttribute("text-anchor", "middle");
      title.setAttribute("class", "cluster-title");
      title.textContent = cl.title;
      constSvg.appendChild(title);

      positions.forEach(p => {
        const node = document.createElementNS(SVG_NS, "circle");
        node.setAttribute("cx", p.x);
        node.setAttribute("cy", p.y);
        node.setAttribute("r", 5);
        node.setAttribute("fill", cl.color);
        node.setAttribute("class", "skill-node");
        node.setAttribute("filter", "url(#glow)");
        const ttl = document.createElementNS(SVG_NS, "title");
        ttl.textContent = p.name;
        node.appendChild(ttl);
        constSvg.appendChild(node);

        const dx = p.x - cl.cx, dy = p.y - cl.cy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const lx = p.x + (dx / len) * 14;
        const ly = p.y + (dy / len) * 14;
        const label = document.createElementNS(SVG_NS, "text");
        label.setAttribute("x", lx);
        label.setAttribute("y", ly + 4);
        label.setAttribute("text-anchor", dx >= 0 ? "start" : "end");
        label.setAttribute("class", "skill-label");
        label.textContent = p.name;
        constSvg.appendChild(label);
      });
    });

    const defs = document.createElementNS(SVG_NS, "defs");
    defs.innerHTML = `
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>`;
    constSvg.insertBefore(defs, constSvg.firstChild);
  }

  /* -------------------------------------------------------
     8. Year stamp in footer
  ------------------------------------------------------- */
  const yr = new Date().getFullYear();
  document.querySelectorAll(".footer span").forEach(s => {
    s.textContent = s.textContent.replace("2026", yr);
  });

})();
