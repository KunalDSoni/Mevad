# Mewad Investor Pitch Deck

Standalone, self-contained HTML slide deck. Separate from the main marketing
site — real business figures, not placeholders.

## Run it

    cd pitch-deck && python3 -m http.server 8099

Open `http://localhost:8099/`.

- **Navigate:** arrow keys, spacebar, or the on-screen prev/next buttons.
- **Export to PDF:** open in Chrome, `Cmd/Ctrl+P`, destination "Save as PDF",
  background graphics on. The print stylesheet renders one slide per page.

## Changing the numbers

Every figure and every line of copy lives in `data/deck.js`. Nothing is
hardcoded in `index.html` or `js/*.js`.

## Financial figures

Slide 20's investment/profit/outstanding figures are **estimated at 100%**
from a director's reported 20%/30% ownership share of the real entities
(Mewad-2, Mewad-3) — not audited totals. The footnote on that slide states
this; do not remove it or present the figures as verified without an actual
audit backing them.
