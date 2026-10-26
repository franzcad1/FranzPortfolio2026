"use client";

// Inline pixel art scenes — pure SVG, no external assets needed
// Each scene is designed on a 320×180 grid (16:9), scaled to fill viewport

const scenes: Record<string, React.ReactNode> = {
  // Level 1 — Airport (photo background)
  airport: (
    <img
      src="/backgrounds/level1.png"
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
    />
  ),

  // Level 2 — Campus (photo background)
  campus: (
    <img
      src="/backgrounds/level2.jpg"
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
    />
  ),

  // Level 2 — Campus SVG fallback (unused)
  campus_svg: (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="180" fill="#0a0a1a"/>
      {/* Sky */}
      <rect width="320" height="90" fill="#0d0d22"/>
      {/* Stars */}
      {[20,55,90,140,180,220,270,310,35,160,250].map((x,i) => (
        <rect key={i} x={x} y={5+(i*9)%60} width="2" height="2" fill="#e8e8f0" opacity={0.3+(i%3)*0.15}/>
      ))}
      {/* Campus building */}
      <rect x="40" y="60" width="240" height="120" fill="#14142a"/>
      {/* Roof detail */}
      <rect x="40" y="55" width="240" height="10" fill="#1e1e3a"/>
      {/* Columns */}
      {[60,110,160,210,240].map(x => (
        <rect key={x} x={x} y={60} width="6" height="120" fill="#1a1a32"/>
      ))}
      {/* Monitor on desk */}
      <rect x="120" y="80" width="80" height="55" fill="#0a0a12"/>
      <rect x="122" y="82" width="76" height="45" fill="#0d2d0d"/>
      {/* Pixel game on screen */}
      <rect x="128" y="86" width="8" height="8" fill="#39ff14"/>
      <rect x="140" y="90" width="6" height="6" fill="#ff2d78"/>
      <rect x="152" y="84" width="10" height="4" fill="#ffe600"/>
      <rect x="166" y="88" width="6" height="10" fill="#00e5ff"/>
      <rect x="128" y="100" width="50" height="2" fill="#39ff14" opacity="0.4"/>
      <rect x="128" y="104" width="35" height="2" fill="#39ff14" opacity="0.3"/>
      {/* Monitor stand */}
      <rect x="153" y="135" width="14" height="5" fill="#222"/>
      <rect x="145" y="140" width="30" height="4" fill="#333"/>
      {/* Desk */}
      <rect x="80" y="144" width="160" height="8" fill="#1e1428"/>
      {/* Campus ground */}
      <rect x="0" y="155" width="320" height="25" fill="#0e0e18"/>
      {/* Trees */}
      <rect x="10" y="120" width="20" height="35" fill="#0a1a0a"/>
      <rect x="5" y="100" width="30" height="25" fill="#0d2a0d"/>
      <rect x="280" y="115" width="20" height="40" fill="#0a1a0a"/>
      <rect x="275" y="95" width="30" height="25" fill="#0d2a0d"/>
    </svg>
  ),

  // Level 3 — Dental operatory (photo background)
  "dental-chair": (
    <img
      src="/backgrounds/level3.jpg"
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
    />
  ),

  // Level 4 — Clinic front desk (photo background)
  "clinic-desk": (
    <img
      src="/backgrounds/level4.jpg"
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
    />
  ),

  // Level 4 — Clinic front desk SVG fallback (unused)
  "clinic-desk-svg": (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="180" fill="#0c0c18"/>
      {/* Reception desk */}
      <rect x="30" y="110" width="260" height="50" fill="#1a1a2c"/>
      <rect x="30" y="105" width="260" height="10" fill="#242436"/>
      {/* Desk screen 1 */}
      <rect x="50" y="70" width="70" height="40" fill="#0a0a12"/>
      <rect x="52" y="72" width="66" height="34" fill="#001428"/>
      {/* Patient recall list on screen */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="55" y={75+i*6} width="35" height="2" fill="#00e5ff" opacity={0.5-i*0.05}/>
          <rect x="94" y={75+i*6} width="18" height="2" fill="#ffe600" opacity={0.4-i*0.05}/>
        </g>
      ))}
      <rect x="86" y={75+5*6} width="20" height="3" fill="#39ff14" opacity="0.6"/>
      {/* Screen stand */}
      <rect x="81" y="110" width="8" height="5" fill="#111"/>
      {/* Desk screen 2 */}
      <rect x="190" y="68" width="80" height="45" fill="#0a0a12"/>
      <rect x="192" y="70" width="76" height="40" fill="#001428"/>
      {/* Appointment grid */}
      {[0,1,2,3].map(col => (
        [0,1,2,3,4].map(row => (
          <rect key={`${col}-${row}`} x={195+col*17} y={73+row*7} width="14" height="5"
            fill={col===1&&row===2 ? "#ff2d78" : col===0&&row===0 ? "#00e5ff" : "#0d2040"}
            opacity="0.7"
          />
        ))
      ))}
      <rect x="226" y="110" width="8" height="5" fill="#111"/>
      {/* Phone */}
      <rect x="150" y="108" width="30" height="5" fill="#1e1e30"/>
      {/* Logo on wall */}
      <rect x="120" y="30" width="80" height="30" fill="none" stroke="#00e5ff" strokeWidth="1" opacity="0.3"/>
      <rect x="130" y="36" width="60" height="4" fill="#00e5ff" opacity="0.4"/>
      <rect x="140" y="43" width="40" height="3" fill="#e8e8f0" opacity="0.2"/>
      {/* Floor */}
      <rect x="0" y="155" width="320" height="25" fill="#090912"/>
      {/* Waiting chairs */}
      <rect x="0" y="110" width="25" height="40" fill="#141428"/>
      <rect x="295" y="110" width="25" height="40" fill="#141428"/>
    </svg>
  ),

  // Level 5 — Agency studio (photo background)
  studio: (
    <img
      src="/backgrounds/level5.avif"
      alt=""
      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
    />
  ),

  // Level 6 — Glowing terminal / AI workspace
  terminal: (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="180" fill="#050510"/>
      {/* Grid floor */}
      {[0,40,80,120,160,200,240,280,320].map(x => (
        <line key={`v${x}`} x1={x} y1="130" x2={x} y2="180" stroke="#00e5ff" strokeWidth="0.5" opacity="0.12"/>
      ))}
      {[130,145,160,175].map(y => (
        <line key={`h${y}`} x1="0" y1={y} x2="320" y2={y} stroke="#00e5ff" strokeWidth="0.5" opacity="0.12"/>
      ))}
      {/* Main terminal */}
      <rect x="60" y="30" width="200" height="110" rx="4" fill="#080818"/>
      <rect x="62" y="32" width="196" height="106" rx="3" fill="#00050f"/>
      <rect x="62" y="32" width="196" height="10" fill="#0a1a2a"/>
      {/* Terminal dots */}
      <circle cx="72" cy="37" r="3" fill="#ff2d78"/>
      <circle cx="82" cy="37" r="3" fill="#ffe600"/>
      <circle cx="92" cy="37" r="3" fill="#39ff14"/>
      {/* Code lines */}
      {[
        { y: 50, w: 80, col: "#39ff14" },
        { y: 58, w: 110, col: "#00e5ff" },
        { y: 66, w: 60,  col: "#ffe600" },
        { y: 74, w: 130, col: "#e8e8f0" },
        { y: 82, w: 90,  col: "#00e5ff" },
        { y: 90, w: 50,  col: "#ff2d78" },
        { y: 98, w: 120, col: "#e8e8f0" },
        { y: 106, w: 70, col: "#39ff14" },
        { y: 114, w: 100, col: "#00e5ff" },
        { y: 122, w: 40, col: "#ffe600" },
      ].map(({ y, w, col }, i) => (
        <g key={i}>
          <rect x={68 + (i % 3) * 8} y={y} width={8} height="3" fill={col} opacity="0.5"/>
          <rect x={80 + (i % 3) * 4} y={y} width={w} height="3" fill={col} opacity="0.25"/>
        </g>
      ))}
      {/* Cursor */}
      <rect x="68" y="130" width="8" height="4" fill="#00e5ff" opacity="0.9"/>
      {/* Floating data streams */}
      {[15,42,290,305].map((x,i) => (
        <g key={i}>
          {[0,1,2,3,4,5,6,7].map(j => (
            <rect key={j} x={x} y={20+j*18} width="3" height="10"
              fill={i%2===0?"#00e5ff":"#ff2d78"}
              opacity={0.05+j*0.06}
            />
          ))}
        </g>
      ))}
      {/* Glow effect */}
      <ellipse cx="160" cy="85" rx="90" ry="50" fill="#00e5ff" opacity="0.03"/>
      {/* Bottom desk */}
      <rect x="0" y="148" width="320" height="32" fill="#050510"/>
      <rect x="0" y="148" width="320" height="4" fill="#0a1020"/>
    </svg>
  ),
};

interface Props {
  scene: string;
}

export function SceneBackground({ scene }: Props) {
  const art = scenes[scene] ?? scenes.terminal;
  return (
    <div
      className="absolute inset-0 pixelated"
      aria-hidden="true"
      style={{ overflow: "hidden" }}
    >
      {art}
    </div>
  );
}
