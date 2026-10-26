"use client";
import { useState, useEffect } from "react";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// Sprite sheet layout from CSS export (spritesheet tool)
// Source: franz-level1.webp — displayed via backgroundSize scaling
// Frame grid: 4 cols × 5 rows, frame display size 106×176 at scale=1
// Content lives in cols 1 & 2 only (cols 0 and 3 are empty padding)
const SHEET = {
  src: "/sprites/franz-level1.webp",
  cols: 4,
  rows: 5,
  fw: 106,  // frame width at scale 1 (from CSS export)
  fh: 176,  // frame height at scale 1
  // Row → animation mapping
  idleRow: 0,
  walkRightRow: 1,
  walkLeftRow: 2,
  walkTowardRow: 3,
  jumpRow: 4,
  // Animated frame columns (cols 1 & 2 have character pixels)
  frameA: 1,
  frameB: 2,
};

function SheetSprite({
  walking,
  scale = 1,
  facing,
}: {
  walking: boolean;
  scale?: number;
  facing?: "right" | "left";
}) {
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState(SHEET.frameA);

  const row = walking
    ? facing === "left"
      ? SHEET.walkLeftRow
      : SHEET.walkRightRow
    : SHEET.idleRow;

  useEffect(() => {
    if (!walking || reduced) { setFrame(SHEET.frameA); return; }
    const id = setInterval(
      () => setFrame(f => (f === SHEET.frameA ? SHEET.frameB : SHEET.frameA)),
      160,
    );
    return () => clearInterval(id);
  }, [walking, reduced]);

  const fw = SHEET.fw * scale;
  const fh = SHEET.fh * scale;

  return (
    <div
      aria-hidden="true"
      style={{
        width: fw,
        height: fh,
        backgroundImage: `url('${SHEET.src}')`,
        backgroundSize: `${SHEET.cols * fw}px ${SHEET.rows * fh}px`,
        backgroundPosition: `-${frame * fw}px -${row * fh}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        flexShrink: 0,
      }}
    />
  );
}

// Palette shared across all placeholder outfits
const PALETTE = {
  skin:    "#f5c5a3",
  hair:    "#3d2314",
  cyan:    "#00e5ff",
  magenta: "#ff2d78",
  yellow:  "#ffe600",
  green:   "#39ff14",
  white:   "#e8e8f0",
  dark:    "#0a0a12",
  gray:    "#444466",
  scrubs:  "#5bc8c8",
  office:  "#6688cc",
};

// Each outfit is a pure SVG pixel portrait (32×48 logical pixels, rendered at 2×–4× via width/height)
const outfits: Record<string, React.ReactNode> = {
  backpack: (
    // Hoodie + backpack straps + excited expression
    <svg viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
      {/* Hair */}
      <rect x="10" y="4" width="12" height="5" fill={PALETTE.hair}/>
      {/* Face */}
      <rect x="10" y="9" width="12" height="10" fill={PALETTE.skin}/>
      {/* Eyes */}
      <rect x="12" y="11" width="3" height="3" fill={PALETTE.dark}/>
      <rect x="17" y="11" width="3" height="3" fill={PALETTE.dark}/>
      {/* Smile */}
      <rect x="12" y="16" width="8" height="2" fill={PALETTE.dark}/>
      {/* Body — jacket */}
      <rect x="9" y="19" width="14" height="13" fill={PALETTE.gray}/>
      {/* Backpack */}
      <rect x="5" y="20" width="5" height="10" fill={PALETTE.cyan}/>
      <rect x="6" y="21" width="3" height="3" fill={PALETTE.dark}/>
      {/* Arms */}
      <rect x="5" y="19" width="4" height="8" fill={PALETTE.gray}/>
      <rect x="23" y="19" width="4" height="8" fill={PALETTE.gray}/>
      {/* Hands */}
      <rect x="5" y="27" width="4" height="3" fill={PALETTE.skin}/>
      <rect x="23" y="27" width="4" height="3" fill={PALETTE.skin}/>
      {/* Legs */}
      <rect x="10" y="32" width="5" height="10" fill="#334"/>
      <rect x="17" y="32" width="5" height="10" fill="#334"/>
      {/* Shoes */}
      <rect x="9" y="42" width="7" height="3" fill={PALETTE.dark}/>
      <rect x="16" y="42" width="7" height="3" fill={PALETTE.dark}/>
    </svg>
  ),

  hoodie: (
    // Hoodie + laptop under arm
    <svg viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="12" height="5" fill={PALETTE.hair}/>
      <rect x="10" y="9" width="12" height="10" fill={PALETTE.skin}/>
      <rect x="12" y="11" width="3" height="3" fill={PALETTE.dark}/>
      <rect x="17" y="11" width="3" height="3" fill={PALETTE.dark}/>
      <rect x="13" y="16" width="6" height="2" fill={PALETTE.dark}/>
      {/* Hoodie body */}
      <rect x="9" y="19" width="14" height="13" fill="#335"/>
      {/* Hood strings */}
      <rect x="13" y="19" width="2" height="5" fill="#224"/>
      <rect x="17" y="19" width="2" height="5" fill="#224"/>
      {/* Laptop */}
      <rect x="23" y="22" width="6" height="5" fill={PALETTE.cyan}/>
      <rect x="24" y="23" width="4" height="3" fill={PALETTE.dark}/>
      {/* Arms */}
      <rect x="5" y="19" width="4" height="8" fill="#335"/>
      <rect x="23" y="19" width="4" height="8" fill="#335"/>
      <rect x="5" y="27" width="4" height="3" fill={PALETTE.skin}/>
      <rect x="23" y="27" width="4" height="3" fill={PALETTE.skin}/>
      <rect x="10" y="32" width="5" height="10" fill="#224"/>
      <rect x="17" y="32" width="5" height="10" fill="#224"/>
      <rect x="9" y="42" width="7" height="3" fill={PALETTE.dark}/>
      <rect x="16" y="42" width="7" height="3" fill={PALETTE.dark}/>
    </svg>
  ),

  scrubs: (
    // Teal scrubs + mask + gloves
    <svg viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="12" height="5" fill={PALETTE.hair}/>
      <rect x="10" y="9" width="12" height="10" fill={PALETTE.skin}/>
      <rect x="12" y="11" width="3" height="3" fill={PALETTE.dark}/>
      <rect x="17" y="11" width="3" height="3" fill={PALETTE.dark}/>
      {/* Mask */}
      <rect x="10" y="15" width="12" height="5" fill={PALETTE.white}/>
      <rect x="11" y="16" width="10" height="3" fill="#d0d8e8"/>
      {/* Scrubs body */}
      <rect x="9" y="20" width="14" height="13" fill={PALETTE.scrubs}/>
      {/* Pocket */}
      <rect x="10" y="21" width="4" height="4" fill="#4aacac"/>
      {/* Arms */}
      <rect x="5" y="20" width="4" height="9" fill={PALETTE.scrubs}/>
      <rect x="23" y="20" width="4" height="9" fill={PALETTE.scrubs}/>
      {/* Gloves */}
      <rect x="5" y="29" width="4" height="3" fill={PALETTE.yellow}/>
      <rect x="23" y="29" width="4" height="3" fill={PALETTE.yellow}/>
      <rect x="10" y="33" width="5" height="10" fill={PALETTE.scrubs}/>
      <rect x="17" y="33" width="5" height="10" fill={PALETTE.scrubs}/>
      <rect x="9" y="43" width="7" height="2" fill="#2a6666"/>
      <rect x="16" y="43" width="7" height="2" fill="#2a6666"/>
    </svg>
  ),

  office: (
    // Business casual — collared shirt, slacks
    <svg viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="12" height="5" fill={PALETTE.hair}/>
      <rect x="10" y="9" width="12" height="10" fill={PALETTE.skin}/>
      <rect x="12" y="11" width="3" height="3" fill={PALETTE.dark}/>
      <rect x="17" y="11" width="3" height="3" fill={PALETTE.dark}/>
      <rect x="13" y="16" width="6" height="2" fill={PALETTE.dark}/>
      {/* Collar shirt */}
      <rect x="9" y="19" width="14" height="13" fill={PALETTE.white}/>
      {/* Collar */}
      <rect x="13" y="19" width="3" height="4" fill="#c8d0e0"/>
      <rect x="16" y="19" width="3" height="4" fill="#c8d0e0"/>
      {/* Tie */}
      <rect x="15" y="23" width="2" height="8" fill={PALETTE.cyan}/>
      {/* Arms */}
      <rect x="5" y="19" width="4" height="9" fill={PALETTE.office}/>
      <rect x="23" y="19" width="4" height="9" fill={PALETTE.office}/>
      <rect x="5" y="28" width="4" height="3" fill={PALETTE.skin}/>
      <rect x="23" y="28" width="4" height="3" fill={PALETTE.skin}/>
      {/* Slacks */}
      <rect x="10" y="32" width="5" height="11" fill="#334466"/>
      <rect x="17" y="32" width="5" height="11" fill="#334466"/>
      <rect x="9" y="43" width="7" height="2" fill="#222233"/>
      <rect x="16" y="43" width="7" height="2" fill="#222233"/>
    </svg>
  ),

  terminal: (
    // Glowing hoodie + floating data streams
    <svg viewBox="0 0 32 48" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="4" width="12" height="5" fill={PALETTE.hair}/>
      <rect x="10" y="9" width="12" height="10" fill={PALETTE.skin}/>
      {/* Glowing eyes */}
      <rect x="12" y="11" width="3" height="3" fill={PALETTE.cyan}/>
      <rect x="17" y="11" width="3" height="3" fill={PALETTE.cyan}/>
      {/* Smirk */}
      <rect x="14" y="16" width="5" height="2" fill={PALETTE.dark}/>
      <rect x="19" y="15" width="2" height="2" fill={PALETTE.dark}/>
      {/* Hoodie — dark with glow */}
      <rect x="9" y="19" width="14" height="13" fill="#111128"/>
      {/* Code glow on chest */}
      <rect x="11" y="21" width="10" height="2" fill={PALETTE.cyan} opacity="0.7"/>
      <rect x="11" y="25" width="7" height="2" fill={PALETTE.cyan} opacity="0.5"/>
      <rect x="11" y="29" width="9" height="2" fill={PALETTE.magenta} opacity="0.5"/>
      {/* Arms */}
      <rect x="5" y="19" width="4" height="9" fill="#111128"/>
      <rect x="23" y="19" width="4" height="9" fill="#111128"/>
      {/* Hands with glow */}
      <rect x="5" y="28" width="4" height="3" fill={PALETTE.skin}/>
      <rect x="23" y="28" width="4" height="3" fill={PALETTE.skin}/>
      {/* Legs */}
      <rect x="10" y="32" width="5" height="11" fill="#1a1a2e"/>
      <rect x="17" y="32" width="5" height="11" fill="#1a1a2e"/>
      <rect x="9" y="43" width="7" height="2" fill={PALETTE.dark}/>
      <rect x="16" y="43" width="7" height="2" fill={PALETTE.dark}/>
      {/* Floating data particles */}
      <rect x="2" y="12" width="2" height="2" fill={PALETTE.cyan} opacity="0.6"/>
      <rect x="28" y="18" width="2" height="2" fill={PALETTE.magenta} opacity="0.6"/>
      <rect x="1" y="28" width="2" height="2" fill={PALETTE.yellow} opacity="0.5"/>
      <rect x="29" y="8" width="2" height="2" fill={PALETTE.cyan} opacity="0.4"/>
    </svg>
  ),
};

interface Props {
  outfit: string;
  walking?: boolean;
  scale?: number;
  facing?: "right" | "left";
}

export function Sprite({ outfit, walking = false, scale = 3, facing = "right" }: Props) {
  const reduced = useReducedMotion();

  // Levels with AI-generated GIF sprites
  const gifMap: Record<string, string> = {
    backpack: "/sprites/Level1Idle.gif",
    hoodie:   "/sprites/Level2Idle.gif",
    scrubs:   "/sprites/Level3Idle.gif",
    office:   "/sprites/Level4Idle.gif",
    suit:     "/sprites/Level5Idle.gif",
    terminal: "/sprites/Level5Idle.gif",
  };

  if (outfit in gifMap) {
    const src = gifMap[outfit];
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        style={{
          width: scale >= 3 ? 240 : 200,
          height: scale >= 3 ? 240 : 200,
          objectFit: "contain",
          objectPosition: "bottom",
          imageRendering: "pixelated",
          flexShrink: 0,
          transform: facing === "left" ? "scaleX(-1)" : undefined,
        }}
      />
    );
  }

  const art = outfits[outfit] ?? outfits.hoodie;
  const w = 32 * scale;
  const h = 48 * scale;

  return (
    <div
      aria-hidden="true"
      style={{
        width: w,
        height: h,
        display: "inline-block",
        imageRendering: "pixelated",
        transform: facing === "left" ? "scaleX(-1)" : undefined,
        animation: walking && !reduced ? "sprite-bob 0.4s steps(2) infinite" : "none",
        flexShrink: 0,
      }}
    >
      <div style={{ width: w, height: h }}>
        <div style={{ width: 32, height: 48, transform: `scale(${scale})`, transformOrigin: "top left" }}>
          {art}
        </div>
      </div>
    </div>
  );
}
