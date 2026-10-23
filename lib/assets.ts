// ─── Asset manifest ──────────────────────────────────────────────────────────
// Swap real art by updating these paths. Components never hardcode asset URLs.

export interface SpriteSheet {
  src: string;
  frameWidth: number;
  frameHeight: number;
  frameCount: number;    // frames in the walk cycle
  scale?: number;
}

export interface SceneAsset {
  src: string;
  alt: string;
}

// ─── Sprites (one per outfit) ────────────────────────────────────────────────
// All paths relative to /public
export const sprites: Record<string, SpriteSheet> = {
  backpack: {
    src: "/sprites/placeholder.png",
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
  },
  hoodie: {
    src: "/sprites/placeholder.png",
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
  },
  scrubs: {
    src: "/sprites/placeholder.png",
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
  },
  office: {
    src: "/sprites/placeholder.png",
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
  },
  terminal: {
    src: "/sprites/placeholder.png",
    frameWidth: 32,
    frameHeight: 32,
    frameCount: 4,
  },
};

// ─── Scenes (one per level) ──────────────────────────────────────────────────
export const scenes: Record<string, SceneAsset> = {
  airport:      { src: "/scenes/placeholder-airport.png",      alt: "Pixel art airport gate" },
  campus:       { src: "/scenes/placeholder-campus.png",       alt: "Pixel art campus with a retro monitor" },
  "dental-chair": { src: "/scenes/placeholder-dental.png",     alt: "Pixel art dental operatory" },
  "clinic-desk":  { src: "/scenes/placeholder-clinic-desk.png", alt: "Pixel art clinic front desk" },
  terminal:     { src: "/scenes/placeholder-terminal.png",     alt: "Pixel art glowing terminal" },
};

// ─── Sound effects ───────────────────────────────────────────────────────────
export const sounds = {
  blip:   "/sounds/blip.wav",
  select: "/sounds/select.wav",
  // TODO: add real sound files to /public/sounds
};
