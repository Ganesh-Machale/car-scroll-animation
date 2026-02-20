# 🚗 ITZFIZZ — Scroll-Driven Car Animation

> A premium scroll-driven hero section animation inspired by [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

---

## 🌐 Live Demo
[**View Live →**](https://YOUR_USERNAME.github.io/car-scroll-animation)

## 📁 Repository
[**GitHub Repo →**](https://github.com/YOUR_USERNAME/car-scroll-animation)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Loader** | Progress bar that animates on initial load |
| **Intro Animation** | Car drives in from the left on page load |
| **Scroll-Driven Car** | Car moves left-to-right tied precisely to scroll position |
| **Letter Reveal** | `WELCOME ITZFIZZ` letters reveal as the car's nose passes each one |
| **Green Trail** | A glowing trail follows behind the car |
| **Stat Cards** | 4 coloured impact metric cards fade in staggered as you scroll |
| **After Section** | Premium gradient section with entrance animation |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, transforms, responsive design
- **JavaScript (ES6+)** — Scroll logic, RAF, resize handling
- **GSAP 3 + ScrollTrigger** — Smooth scroll-tied animations with scrubbing
- **SVG** — Self-contained car graphic (no external images needed)

---

## 📂 File Structure

```
car-scroll-animation/
├── index.html      → Main HTML structure
├── style.css       → All styles (dark mode, cards, road, etc.)
├── main.js         → GSAP animations (loader, intro, scroll-driven)
├── car.svg         → Top-view sports car SVG
└── README.md       → This file
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it: `car-scroll-animation`
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Push your code
Open a terminal in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Scroll-driven car hero animation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/car-scroll-animation.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages**
3. Under **Branch**, select `main` and folder `/root`
4. Click **Save**
5. Your site will be live at: `https://YOUR_USERNAME.github.io/car-scroll-animation`

> ⏱️ GitHub Pages may take 1–2 minutes to go live after enabling.

---

## 🎨 Animation Architecture

```
Page Load
  └─► Loader bar fills (fake progress, ~1.2s)
      └─► Loader fades out
          └─► Car slides in from left (intro tween)
              └─► ScrollTrigger attaches to .section

On Scroll (scrub: 1.2)
  └─► car.x  →  0 to (window.innerWidth - 300)
      └─► trail.width updates to car center X
      └─► Each letter checks: carCenter >= letterOffset → opacity 1
      └─► Stat cards fade in at 30%, 45%, 60%, 75% of section scroll
```

---

## 📝 Assignment Notes

- All animations use `transform` (`translateX`) — no `left/top` mutations = **zero layout reflow**
- `scrub: 1.2` adds a natural lag to the car, making it feel fluid and not robotic
- Letter offsets are pre-calculated once (`cacheLetterOffsets`) and reused per-scroll — performant
- SVG car is fully self-contained — works offline, no CORS issues on GitHub Pages

---

*Built for: Frontend Animation Assignment | ITZFIZZ Scroll Hero*

