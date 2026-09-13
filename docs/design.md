# Design: the player card as a website

The site is built around a one-page "player card" Maik once wrote for a new
apprentice, describing himself as a Minecraft piston block. It's a field
notebook: a dark blueprint band, one fused sheet of notes, hand-drawn
arrows, a photo. Minecraft supplies words and structure, not a game UI.
All pixel art is original. No Mojang material appears anywhere.

## Metaphor map

Every element has exactly one counterpart. The biggest word on any page is
always the plain one ("Blog", "404"); the Minecraft word sits in the small
mono label above it.

| Site element      | Counterpart                      | UI label                         |
| ------------------ | --------------------------------- | --------------------------------- |
| Homepage hero      | The player card's header          | `PLAYER CARD`, block `PISTON ~ Maik` |
| Background/CV      | Recipe on the crafting table       | `CRAFTING RECIPE` + 3×3 grid      |
| Hobbies            | Outside the loaded chunk           | `OUTSIDE THE CHUNK`               |
| Personality        | Why this block                     | `WHY A PISTON?`                   |
| Photo              | Resource pack                      | `TEXTURE PACK`                    |
| Skills             | Inventory slots                    | `INVENTORY`                       |
| Blog               | Book and Quill                     | `BOOK AND QUILL`                  |
| Contact            | Multiplayer server list            | `MULTIPLAYER`                     |
| Search             | Chat command                       | `/search`                         |
| Footer             | Bedrock, Y = −64                   | `END OF THE CHUNK`                |
| 404                | A chunk that never generated       | `CHUNK NOT LOADED`                |

## Tokens

All colors come from the original Steckbrief PDF and live as a Tailwind 4
`@theme` in `src/styles/global.css`.

| Token                    | Value      | Use                                  |
| ------------------------ | --------- | ------------------------------------------- |
| `paper`, `paper-light`   | `#eee9da`, `#faf8ee` | Page background, light zones/cards |
| `paper-dark`, `paper-deep`, `paper-tan` | `#e3ddc6`, `#d7d2c2`, `#b8b094` | Slots, chips, borders |
| `stone`, `stone-light`   | `#3a3a34`, `#8a8a7e` | Header band, screws, grid         |
| `ink`, `ink-soft`        | `#1f1e1a`, `#55503f` | Dark zone, text on paper           |
| `redstone`, `redstone-bright` | `#9f2217`, `#ff7d60` | Labels and links; bright red only as text on dark |
| `cream`, `cream-muted`, `cream-dim` | `#f2efe4`, `#d9d4c4`, `#b5b09a` | Text on dark |
| `oak`, `grass`           | `#a98149`, `#5d8c3a` | Polaroid frame, online bar         |

The PDF's text gray (`#8a8370`) falls short of body-text contrast.
`ink-soft` is darkened for that reason, and `redstone-bright` is one step
brighter than the PDF's signal red (`#ff5a3c`) so both reach WCAG AA
(4.5:1). `redstone-bright` stays text-on-dark; on paper, `redstone` carries
the same role.

There are no border radii. Depth comes from hard pixel shadows
(`shadow-pixel`, `shadow-pixel-sm`) and one soft card shadow (`shadow-card`).

## Fonts

Self-hosted under `public/fonts/` (OFL, Latin subset only, see `OFL.txt`).

| Role     | Font              | Rules                                                      |
| -------- | ----------------- | ----------------------------------------------------------- |
| Display  | Pixelify Sans     | Headlines and the wordmark only, with a hard pixel shadow    |
| Label    | IBM Plex Mono     | Uppercase, 0.14em tracking; italic for asides (`~ Maik`)     |
| Text     | Inter             | Body copy; italic only inside the About sheet's zones        |
| Code     | IBM Plex Mono     | Code blocks in the Shiki theme `gruvbox-dark-medium`, with a language banner in the corner |

Sizes are fluid (`text-display-xl/lg/md`, `text-display-article` for
mixed-case article titles, `text-label`). Blog articles run in
`container-prose` at a maximum of 40rem (about 72 characters). Italic marks
a handwritten aside (the About sheet's "Outside the Chunk" and "Why a
Piston" zones, plus `~ Maik`), never body copy in general.

## Building blocks

| Component (`src/components/ui`) | Job                                            |
| -------------------------------- | -------------------------------------------------- |
| `PixelLabel`                     | Small red pill (`banner`), red-orange text on dark (`bright`), ink pill (`ink`) |
| `Screw`                          | The pin holding the sheet down, purely decorative  |
| `Arrow`                          | Hand-drawn arrow, currently just `swoosh` (`arrows.ts`) |
| `Polaroid`                       | Photo in a dashed-tape frame with a caption; `size="lg"` for a bleeding, overlapping photo |
| `PixelButton`                    | Button that slides into its own shadow on press    |
| `PixelArrowIcon`                 | Small pixel arrow icon (Unicode arrows are missing from the font subset) |
| `PistonBlock`                    | The block; `animated` extends it once on load, `shadow="sm"` for icon-sized instances, `headless` for the 404 |

Plus `TagList` and `PostMeta` (a post's tags and byline, on cards and in
the article header), `PostCard`, `ScrollTable` (markdown tables in a
scrollable region, via the `components` mapping in
`src/pages/blog/[slug].astro`), and `PlantUML` (requires `alt`, optional
`width`/`height`).

Posts always come from `src/lib/posts.ts` (`getPublishedPosts()`,
`postUrl()`): teasers, the index, search, RSS, and article neighbors all
share the same filter, sort, and URL scheme.

The piston comes from `scripts/piston.mjs` (`npm run piston`). It writes
`src/assets/piston.svg` with three groups (`piston-base`, `piston-arm`,
`piston-head`) so CSS can lift the head by 9.5 units, exposed on the SVG
itself as `--piston-lift`.

## The About sheet

`src/components/index/AboutSheet.astro` is one continuous, screwed-down
sheet (`.sheet`) with a single rotation and a single shadow, holding three
internal zones that differ only by background and top seam, never by their
own transform:

- `zone--recipe` (Crafting Recipe): plain paper, upright text, the
  `CraftingGrid` 3×3 recipe.
- `zone--chunk` (Outside the Chunk): ink background, italic, a solid seam.
- `zone--why` (Why a Piston?, `id="why"`): dashed paper, italic, a dashed
  seam - the hero links here directly.

A large `Polaroid` (`size="lg"`) overlaps the sheet's top-right corner on
desktop instead of sitting isolated in a bottom corner. The section itself
carries the `chunk-grid` utility, a very faint world-grid background that
echoes the hero's dark blueprint grid on paper - the reader is standing
inside the loaded chunk the whole page describes.

## Accessibility

- Focus ring: `--focus-ring` is dark red on paper and bright red on
  `.blueprint`, `.bg-ink`, and anything with `data-tone="dark"` (the
  header, the About sheet's dark zone). Alpha variants like `bg-stone/95`
  aren't matched by a class selector, hence the data attribute.
- Every text pair reaches at least 4.5:1. Bright red (`#ff7d60`) and
  `cream-dim` are raised above the PDF's values for that reason.
- Decorative pistons (header, crafting result, server list, 404) are
  `aria-hidden`; the hero piston carries `role="img"` with a label.
- Articles get a "Contents" jump list once they have three or more sections.
- Tables keep their semantics and scroll inside a focusable region.

## Motion

Little, and always stepped, so it reads as pixels:

- The piston extends once on homepage load, and again on hover.
- The hero arrow draws itself once (stroke-dashoffset).
- Buttons slide into their shadow on press (`steps(2)`).

`prefers-reduced-motion` turns all of it off globally (the reset lives in
`global.css`); components don't need their own exception.

The Open Graph image (`public/og-default.png`) comes from
`scripts/og-image.mjs` (`npm run og`, needs Playwright).

## Language

The whole site - UI, personal copy, and blog articles - is English. Tone
matches the original player card: honest, short, self-deprecating. No
address to a single apprentice, no employer name, no hard-coded age.

## Deliberately dropped

- A literal recreation of the PDF's three-card-plus-connecting-arrows
  layout for the About section: it read as traced rather than designed.
  Replaced with one fused sheet (see "The About sheet" above); the
  `hook`/`loop`/`short` arrow paths and `NoteCard` component were removed
  as a result, since nothing used them afterward.
- A hotbar as navigation, progress toasts, splash text: too much game UI,
  the paper's warmth would be lost.
- Skill levels ("Enchantment III") and stack counts: would be invented facts.
- A typing animation and a logo marquee: the generic patterns of the old site.
