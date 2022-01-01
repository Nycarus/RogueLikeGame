// Our custom tile mapping with:
// - Single index for putTileAt
// - Array of weights for weightedRandomize
// - Array or 2D array for putTilesAt
const TILES = {
  BLANK: 0,
  WALL: {
    TOP_LEFT: 36,
    TOP_RIGHT: 36,
    BOTTOM_RIGHT: 36,
    BOTTOM_LEFT: 36,
    TOP: [{ index: 16, weight: 4 }, { index: [36, 36, 36], weight: 1 }],
    LEFT: [{ index: 16, weight: 4 }, { index: [36, 36, 36], weight: 1 }],
    RIGHT: [{ index: 16, weight: 4 }, { index: [36, 36, 36], weight: 1 }],
    BOTTOM: [{ index: 16, weight: 4 }, { index: [36, 36, 36], weight: 1 }]
  },
  FLOOR: [{ index: 1, weight: 9 }, { index: [32, 33, 34], weight: 1 }],
  POT: [{ index: 13, weight: 1 }, { index: 32, weight: 1 }, { index: 51, weight: 1 }],
  DOOR: {
    TOP: [6, 6, 6],
    // prettier-ignore
    LEFT: [
      [6],
      [6],
      [6]
    ],
    BOTTOM: [6, 6, 6],
    // prettier-ignore
    RIGHT: [
      [6],
      [6],
      [6]
    ]
  },
  CHEST: 166,
  STAIRS: 50,
  // prettier-ignore
  TOWER: [
    [186],
    [205]
  ]
};
