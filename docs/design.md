# Design: Magic: The Gathering card

The homepage presents Maik as a Magic: The Gathering style trading card. All
artwork, card text and symbols are original; no Wizards of the Coast assets
or fonts are used. The footer carries the fan-tribute disclaimer.

## Metaphor map

| Site element | Card metaphor |
| --- | --- |
| Hero | The legendary creature card, interactive (`index/Hero.astro`) |
| About | Three spell cards: Origin Story, Side Quests, Binary Mind (`index/AboutCards.astro`) |
| Career | "The journey": one creature card per job, each stronger than the last, in a snapping horizontal track (`index/Journey.astro`) |
| Blog | The Grimoire |
| Contact | "Challenge me to a duel", with a coin flip (`index/Contact.astro`) |
| 404 | Counterspelled |

## Hero interactions

- Pointer tilt with a holographic glare (disabled for `prefers-reduced-motion`).
- `{T}` ability taps (rotates) the card; Hyperfocus adds a glow and +1 power.
- The power/toughness box toggles 0/1 and 1/0 (binary mind).
- Flip shows the card back; Reset restores everything.
- Every action writes a line to an `aria-live` "stack" log below the card.

## Tokens and fonts

Tokens live in `src/styles/global.css`. Some token names (`redstone`, `stone`,
`ink`, `paper`) predate the redesign and now hold the crimson, deep violet,
and parchment values; `redstone-bright` is the gold accent.

- Display: Cinzel; card text and flavor: EB Garamond; body: Inter; labels: IBM Plex Mono.
- Fonts are self-hosted OFL files in `public/fonts/` (see `OFL.txt`).
- Card frame colours (`data-frame`: gold, blue, green, red) and classes (`.mtg-card`, `.mtg-frame`, `.mtg-bar`, `.mtg-text`, ...)
  are in `global.css`. They size everything in `cqw`, which resolves against the
  nearest ancestor container, so `.mtg-card` is the container and `.mtg-frame`
  carries the border and radius.

## Open Graph image

`npm run og` regenerates `public/og-default.png` (needs Playwright).
