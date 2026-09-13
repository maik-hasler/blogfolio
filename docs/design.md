# Gestaltung: Der Steckbrief als Webseite

Die Seite baut den einseitigen Steckbrief nach, mit dem sich Maik einem
Auszubildenden als Minecraft-Block vorgestellt hat. Sie ist eine Pinnwand:
dunkles Kopfband, angepinnte Notizkarten, handgezeichnete Pfeile, ein
Polaroid. Minecraft liefert Wörter und Ordnung, keine Spiel-Oberfläche.
Alle Pixel-Grafiken sind selbst gezeichnet. Mojang-Material kommt nicht vor.

## Metaphern-Landkarte

Jedes Element hat genau eine Entsprechung. Das größte Wort auf jeder Seite
ist immer das gewöhnliche ("Blog", "404"); das Minecraft-Wort steht im kleinen
Mono-Label darüber.

| Seitenelement        | Entsprechung                     | Label im UI                         |
| -------------------- | -------------------------------- | ----------------------------------- |
| Hero der Startseite  | Kopf des Steckbriefs             | `STECKBRIEF`, Block `PISTON ~ Maik` |
| Werdegang            | Rezept auf der Werkbank          | `CRAFTING RECIPE` + 3×3-Grid        |
| Hobbys               | Außerhalb des geladenen Chunks   | `AUSSERHALB DES CHUNKS MACHE ICH …` |
| Persönlichkeit       | Warum dieser Block               | `WARUM AUSGERECHNET PISTON?`        |
| Foto                 | Ressourcenpaket                  | `TEXTURE PACK`                      |
| Skills               | Inventar-Slots                   | `INVENTAR`                          |
| Blog                 | Buch und Feder                   | `BUCH & FEDER`                      |
| Kontakt              | Multiplayer-Serverliste          | `MULTIPLAYER`                       |
| Suche                | Chat-Befehl                      | `/suche`                            |
| Footer               | Bedrock, Y = −64                 | `ENDE DES CHUNKS`                   |
| 404                  | Nicht generierter Chunk          | `CHUNK NICHT GELADEN`               |

## Tokens

Alle Farben stammen aus dem Steckbrief-PDF und liegen als Tailwind-4-`@theme`
in `src/styles/global.css`.

| Token                    | Wert      | Verwendung                                  |
| ------------------------ | --------- | ------------------------------------------- |
| `paper`, `paper-light`   | `#eee9da`, `#faf8ee` | Seitenhintergrund, helle Karten  |
| `paper-dark`, `paper-deep`, `paper-tan` | `#e3ddc6`, `#d7d2c2`, `#b8b094` | Slots, Chips, Rahmen |
| `stone`, `stone-light`   | `#3a3a34`, `#8a8a7e` | Kopfband, Schrauben, Raster      |
| `ink`, `ink-soft`        | `#1f1e1a`, `#55503f` | Dunkle Karte, Text auf Papier    |
| `redstone`, `redstone-bright` | `#9f2217`, `#ff7d60` | Banner und Pfeile; helles Rot nur als Text auf Dunkel |
| `cream`, `cream-muted`, `cream-dim` | `#f2efe4`, `#d9d4c4`, `#b5b09a` | Text auf Dunkel |
| `oak`, `grass`           | `#a98149`, `#5d8c3a` | Polaroid-Rahmen, Online-Balken   |

Die Textgrautöne des PDFs (`#8a8370`) verfehlen den Kontrast für Fließtext.
`ink-soft` ist deshalb dunkler als das Original, `redstone-bright` eine Stufe
heller als das Signalrot des PDFs (`#ff5a3c`), damit beide WCAG AA (4,5:1)
erreichen. `redstone-bright` bleibt Text auf dunklem Grund; auf Papier trägt
`redstone`.

Radien gibt es nicht. Tiefe entsteht durch harte Pixel-Schatten
(`shadow-pixel`, `shadow-pixel-sm`) und einen weichen Kartenschatten
(`shadow-card`).

## Schriften

Self-hosted unter `public/fonts/` (OFL, nur Latin-Subset, siehe `OFL.txt`).

| Rolle    | Schrift          | Regeln                                                     |
| -------- | ---------------- | ---------------------------------------------------------- |
| Display  | Pixelify Sans    | Nur Headlines und Wortmarke, mit hartem Pixel-Schatten     |
| Label    | IBM Plex Mono    | Versalien, 0,14 em Tracking; kursiv für Randnotizen (`~ Maik`) |
| Text     | Inter            | Fließtext; kursiv nur auf den drei Notizkarten, sonst aufrecht |
| Code     | IBM Plex Mono    | Codeblöcke im Shiki-Thema `gruvbox-dark-medium`, Sprach-Banner in der Ecke |

Größen sind fluid (`text-display-xl/lg/md`, `text-display-article` für
gemischt geschriebene Artikeltitel, `text-label`). Blog-Artikel laufen in
`container-prose` mit maximal 40 rem Zeilenlänge (etwa 72 Zeichen). Kursiv
ist das Signal der Notizkarte und der Randnotiz (`~ Maik`), nicht das der
Einleitung.

## Bausteine

| Komponente (`src/components/ui`) | Aufgabe                                            |
| -------------------------------- | -------------------------------------------------- |
| `PixelLabel`                     | Rotes Banner (`banner`), Rot-Orange auf Dunkel (`bright`), Tinte (`ink`) |
| `NoteCard`                       | Angepinnte Karte, Töne `paper`, `dark`, `dashed`, Prop `rotate` |
| `Screw`                          | Schraube der Karten, rein dekorativ                |
| `Arrow`                          | Handgezeichnete Pfeile `swoosh`, `hook`, `loop`, `short` (`arrows.ts`) |
| `Polaroid`                       | Foto mit gestricheltem Rahmen und Bildunterschrift |
| `PixelButton`                    | Knopf, der sich beim Drücken in den Schatten schiebt |
| `PixelArrowIcon`                 | Kleiner Pixel-Pfeil als Icon (Unicode-Pfeile fehlen im Font-Subset) |
| `PistonBlock`                    | Der Block; `animated` fährt ihn beim Laden aus, `shadow="sm"` für Icons, `headless` für die 404 |

Dazu `TagList` und `PostMeta` (Tags und Randnotiz eines Beitrags, in Karte
und Artikelkopf), `PostCard`, `ScrollTable` (Markdown-Tabellen in einer
scrollbaren Region, per `components`-Mapping in `src/pages/blog/[slug].astro`)
und `PlantUML` (verlangt `alt`, optional `width`/`height`).

Beiträge kommen überall aus `src/lib/posts.ts` (`getPublishedPosts()`,
`postUrl()`): Teaser, Index, Suche, RSS und Artikel-Nachbarn teilen sich
Filter, Sortierung und URL-Schema.

Der Piston entsteht aus `scripts/piston.mjs` (`npm run piston`). Das Skript
schreibt `src/assets/piston.svg` mit drei Gruppen (`piston-base`,
`piston-arm`, `piston-head`), damit CSS den Kopf um 9,5 Einheiten heben kann.

## Barrierefreiheit

- Fokusring: `--focus-ring` ist Tiefrot auf Papier und helles Rot auf
  `.blueprint`, `.bg-ink` und allem mit `data-tone="dark"` (Header, dunkle
  Notizkarte). Alpha-Varianten wie `bg-stone/95` erreicht kein Klassen-Selektor,
  deshalb das Datenattribut.
- Alle Textpaare erreichen mindestens 4,5:1. Das helle Rot (`#ff7d60`) und
  `cream-dim` sind dafür gegenüber dem PDF angehoben.
- Dekorative Pistons (Header, Crafting-Ergebnis, Serverliste, 404) sind
  `aria-hidden`; der Hero-Piston trägt `role="img"` mit Beschriftung.
- Blog-Artikel bekommen ab drei Abschnitten eine Sprungliste „Inhalt".
- Tabellen behalten ihre Semantik und scrollen in einer fokussierbaren Region.

## Bewegung

Wenig, und immer stufig, damit es nach Pixeln aussieht:

- Der Piston fährt beim Laden der Startseite einmal aus und bei Hover erneut.
- Der Hero-Pfeil zeichnet sich einmal (Stroke-Dashoffset).
- Knöpfe schieben sich beim Drücken in den Schatten (`steps(2)`).

`prefers-reduced-motion` schaltet alles global ab (Reset in `global.css`);
Komponenten brauchen keine eigene Ausnahme.

Das Open-Graph-Bild (`public/og-default.png`) entsteht aus
`scripts/og-image.mjs` (`npm run og`, braucht Playwright).

## Sprache

UI und persönliche Texte sind Deutsch. Blog-Artikel bleiben Englisch und
tragen `lang="en"` auf Titel, Beschreibung und Inhalt. Ton wie der Steckbrief:
ehrlich, kurz, selbstironisch. Keine Ansprache eines einzelnen Azubis, kein
Arbeitgeber, kein Alter.

## Bewusst verworfen

- Hotbar als Navigation, Fortschritts-Toasts, Splash-Text: zu viel Spiel-GUI,
  die Wärme des Papiers ginge verloren.
- Skill-Level ("Enchantment III") und Stapelzahlen: wären erfundene Fakten.
- Typing-Animation und Logo-Laufband: die generischen Muster der alten Seite.
