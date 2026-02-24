# Analog Clock

A pure CSS-animated analog clock with time-based theming, built with React, TypeScript, and SCSS Modules.

The clock automatically adapts its color scheme based on the time of day — morning, day, evening, and night — using a hybrid SCSS Maps + CSS Custom Properties approach described in [this article](https://dev.to/ouvarov/scss-maps-css-custom-properties-scalable-runtime-theming-without-duplication-1lfk).

## Features

- **Pure CSS animation** — JavaScript only calculates the starting position via `animation-delay`; all hand movement is driven by CSS `@keyframes`
- **Time-based theming** — 4 color modes that switch automatically:
  - `morning` (06:00 – 12:00) — warm golden tones
  - `day` (12:00 – 18:00) — clean neutral palette
  - `evening` (18:00 – 22:00) — deep purple hues
  - `night` (22:00 – 06:00) — dark blue scheme
- **SCSS Maps as single source of truth** — all theme tokens defined in one `$modes` map, auto-generated into CSS custom properties at build time
- **Build-time validation** — missing theme keys trigger a Sass `@error` during compilation, not at runtime
- **CSS Modules** — scoped styles with `composes` for class composition
- **SCSS `@for` loops** — tick marks (30 divs x `::before`/`::after` = 60 marks) and number positions generated with loops, not manual duplication

## Tech Stack

- [React 19](https://react.dev/) + TypeScript
- [Vite 7](https://vite.dev/)
- [Sass](https://sass-lang.com/) (Dart Sass, modern module system)
- CSS Modules (`.module.scss`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

The `dist/` folder is ready for static hosting (GitHub Pages, Netlify, etc.).

## Project Structure

```
src/
  hooks/
    useClockTime.ts        # animation-delay calculations + time mode detection
  components/
    Clock/                 # frame + clock face, passes CSS custom properties to children
    Hands/                 # second, minute, hour hands + center cap
    Numbers/               # 6 pairs of numbers (12 digits total)
    Ticks/                 # 30 divs with ::before/::after = 60 tick marks
  styles/
    modes.scss             # $modes SCSS map -> CSS custom properties
    _shared.scss           # shared mixins (size, helvetica)
    global.scss            # reset + modes import
  App.tsx                  # applies mode-* class + scene wrapper
  main.tsx                 # entry point
```

## How Theming Works

All theme tokens live in a single SCSS map in `modes.scss`:

```scss
$modes: (
  morning: (
    scene: (background: #fceabb),
    hand:  (color: #3d2e0a),
    // ...
  ),
  night: (
    scene: (background: #0a0e1a),
    hand:  (color: #c0c4d8),
    // ...
  ),
);
```

A nested `@each` loop generates `.mode-morning`, `.mode-day`, `.mode-evening`, `.mode-night` classes, each containing CSS custom properties like `--scene-background`, `--hand-color`, etc.

At runtime, React detects the current hour and applies the matching class to the root element. Components reference the custom properties — no prop drilling, no JS style calculations.

## How the Clock Hands Work

Instead of moving hands with JavaScript on every tick, the clock uses a CSS `@keyframes` animation that rotates each hand 360 degrees over its full cycle:

| Hand   | Full cycle | CSS duration |
|--------|-----------|--------------|
| Second | 60s       | `60s`        |
| Minute | 60min     | `3600s`      |
| Hour   | 12h       | `43200s`     |

JavaScript calculates a negative `animation-delay` once on mount to offset the animation to the current time. After that, CSS handles all movement with zero JS overhead.

## License

MIT