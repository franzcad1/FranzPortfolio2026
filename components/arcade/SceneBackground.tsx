"use client";

// Inline pixel art scenes — pure SVG, no external assets needed
// Each scene is designed on a 320×180 grid (16:9), scaled to fill viewport

const scenes: Record<string, React.ReactNode> = {
  // Level 1 — Airport gate, pixel plane crossing the sky
  airport: (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      {/* Sky gradient */}
      <rect width="320" height="100" fill="#0a0a2e"/>
      <rect y="100" width="320" height="80" fill="#12121e"/>
      {/* Stars */}
      {[40,80,130,190,240,280,20,160,300,60,220].map((x,i) => (
        <rect key={i} x={x} y={8+(i*7)%50} width="2" height="2" fill="#e8e8f0" opacity={0.4+(i%3)*0.2}/>
      ))}
      {/* Moon */}
      <circle cx="260" cy="30" r="12" fill="#ffe600" opacity="0.9"/>
      <circle cx="265" cy="27" r="10" fill="#0a0a2e"/>
      {/* Pixel plane */}
      <g transform="translate(40,45)">
        <rect x="0" y="4" width="40" height="10" fill="#e8e8f0"/>
        <rect x="30" y="2" width="12" height="6" fill="#00e5ff"/>
        <rect x="8" y="0" width="16" height="5" fill="#e8e8f0"/>
        <rect x="0" y="12" width="10" height="4" fill="#e8e8f0"/>
        <rect x="42" y="6" width="6" height="3" fill="#aaa"/>
        {/* Engine glow */}
        <rect x="2" y="10" width="4" height="2" fill="#ff2d78" opacity="0.8"/>
      </g>
      {/* Gate building */}
      <rect x="0" y="110" width="320" height="70" fill="#12121e"/>
      <rect x="20" y="95" width="100" height="85" fill="#1a1a2e"/>
      <rect x="180" y="100" width="120" height="80" fill="#1a1a2e"/>
      {/* Windows */}
      {[30,50,70,90].map(x => (
        <rect key={x} x={x} y={105} width="12" height="10" fill="#00e5ff" opacity="0.4"/>
      ))}
      {[190,215,240,265].map(x => (
        <rect key={x} x={x} y={110} width="12" height="10" fill="#ffe600" opacity="0.3"/>
      ))}
      {/* Runway lights */}
      {[60,90,120,150,180,210,240,270].map(x => (
        <rect key={x} x={x} y={172} width="4" height="4" fill="#ffe600" opacity={0.6}/>
      ))}
      {/* Floor */}
      <rect x="0" y="165" width="320" height="15" fill="#0e0e1a"/>
      {/* Gate sign */}
      <rect x="110" y="98" width="60" height="14" fill="#00e5ff" opacity="0.15"/>
      <rect x="112" y="100" width="56" height="10" fill="none" stroke="#00e5ff" strokeWidth="1" opacity="0.4"/>
    </svg>
  ),

  // Level 2 — Campus with monitor showing a game
  campus: (
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

  // Level 3 — Dental operatory
  "dental-chair": (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="180" fill="#0c1218"/>
      {/* Ceiling light */}
      <rect x="100" y="0" width="120" height="8" fill="#1a2830"/>
      <rect x="130" y="8" width="60" height="4" fill="#2a3840"/>
      <ellipse cx="160" cy="24" rx="30" ry="16" fill="#ffe600" opacity="0.15"/>
      <ellipse cx="160" cy="22" rx="20" ry="10" fill="#ffe600" opacity="0.25"/>
      <circle cx="160" cy="20" r="10" fill="#fff" opacity="0.8"/>
      {/* Dental chair */}
      <rect x="60" y="110" width="180" height="20" fill="#1e3040"/>
      <rect x="80" y="90" width="140" height="25" fill="#1e3040"/>
      <rect x="100" y="70" width="60" height="25" fill="#1e3040"/>
      {/* Chair arm */}
      <rect x="230" y="100" width="20" height="40" fill="#16222e"/>
      <rect x="228" y="95" width="25" height="10" fill="#1e3040"/>
      {/* Tray */}
      <rect x="220" y="85" width="60" height="6" fill="#2a4050"/>
      {/* Instruments on tray */}
      <rect x="225" y="80" width="2" height="10" fill="#ccc"/>
      <rect x="230" y="79" width="2" height="12" fill="#aaa"/>
      <rect x="235" y="81" width="2" height="8" fill="#ccc"/>
      <rect x="240" y="78" width="2" height="14" fill="#bbb"/>
      {/* Monitor on wall */}
      <rect x="10" y="40" width="60" height="45" fill="#0a0a12"/>
      <rect x="12" y="42" width="56" height="38" fill="#001a2a"/>
      <rect x="14" y="44" width="20" height="6" fill="#00e5ff" opacity="0.5"/>
      <rect x="14" y="52" width="30" height="2" fill="#ffe600" opacity="0.4"/>
      <rect x="14" y="56" width="25" height="2" fill="#ffe600" opacity="0.3"/>
      {/* Floor */}
      <rect x="0" y="150" width="320" height="30" fill="#0a1018"/>
      {/* Floor tile lines */}
      {[0,40,80,120,160,200,240,280].map(x => (
        <rect key={x} x={x} y={150} width="1" height="30" fill="#111820"/>
      ))}
      <rect x="0" y="165" width="320" height="1" fill="#111820"/>
      {/* Cabinet */}
      <rect x="250" y="60" width="65" height="90" fill="#0e1e2c"/>
      <rect x="255" y="65" width="25" height="35" fill="#122030"/>
      <rect x="285" y="65" width="25" height="35" fill="#122030"/>
      <rect x="255" y="105" width="55" height="40" fill="#0e1c28"/>
    </svg>
  ),

  // Level 4 — Clinic front desk
  "clinic-desk": (
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

  // Level 5 — Agency studio with analytics dashboards
  studio: (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="180" fill="#0c0810"/>
      {/* Back wall */}
      <rect width="320" height="120" fill="#0e0a14"/>
      {/* Large monitor left */}
      <rect x="20" y="35" width="120" height="75" rx="3" fill="#080610"/>
      <rect x="22" y="37" width="116" height="68" rx="2" fill="#100820"/>
      {/* Analytics bar chart */}
      {[0,1,2,3,4,5,6].map((i) => {
        const h = [20,35,15,45,30,50,25][i];
        return <rect key={i} x={28+i*15} y={90-h} width="10" height={h} fill="#ff2d78" opacity={0.5+i*0.05} rx="1"/>;
      })}
      <rect x="22" y="37" width="116" height="10" fill="#1a0a28"/>
      <rect x="26" y="40" width="40" height="4" fill="#ff2d78" opacity="0.5"/>
      <rect x="70" y="40" width="25" height="4" fill="#e8e8f0" opacity="0.15"/>
      {/* Monitor stand */}
      <rect x="74" y="110" width="12" height="6" fill="#111"/>
      <rect x="65" y="115" width="30" height="3" fill="#1a1a28"/>
      {/* Large monitor right */}
      <rect x="180" y="30" width="125" height="80" rx="3" fill="#080610"/>
      <rect x="182" y="32" width="121" height="73" rx="2" fill="#0a0618"/>
      {/* World map dots */}
      {[[195,55],[210,50],[230,58],[250,52],[270,56],[290,54],[205,65],[245,62],[275,60]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill="#ff2d78" opacity={0.4+i*0.04}/>
      ))}
      {/* Connecting lines */}
      <line x1="195" y1="55" x2="210" y2="50" stroke="#ff2d78" strokeWidth="0.5" opacity="0.25"/>
      <line x1="210" y1="50" x2="230" y2="58" stroke="#ff2d78" strokeWidth="0.5" opacity="0.25"/>
      <line x1="230" y1="58" x2="250" y2="52" stroke="#ff2d78" strokeWidth="0.5" opacity="0.25"/>
      <line x1="250" y1="52" x2="270" y2="56" stroke="#ff2d78" strokeWidth="0.5" opacity="0.2"/>
      {/* KPI tiles */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={185+i*40} y={75} width="34" height="24" rx="1" fill="#180828" opacity="0.9"/>
          <rect x={187+i*40} y={77} width="20" height="3" fill="#ff2d78" opacity={0.6-i*0.1}/>
          <rect x={187+i*40} y={82} width="28" height="5" fill="#e8e8f0" opacity="0.2"/>
          <rect x={187+i*40} y={89} width="15" height="3" fill="#ffe600" opacity={0.3}/>
        </g>
      ))}
      {/* Monitor stand right */}
      <rect x="236" y="110" width="12" height="6" fill="#111"/>
      <rect x="227" y="115" width="30" height="3" fill="#1a1a28"/>
      {/* Desk */}
      <rect x="0" y="118" width="320" height="12" fill="#16101e"/>
      <rect x="0" y="118" width="320" height="3" fill="#201428"/>
      {/* Glow */}
      <ellipse cx="80" cy="72" rx="55" ry="30" fill="#ff2d78" opacity="0.04"/>
      <ellipse cx="242" cy="65" rx="60" ry="35" fill="#ff2d78" opacity="0.04"/>
      {/* Floor */}
      <rect x="0" y="130" width="320" height="50" fill="#0a0810"/>
      {/* Floor reflection */}
      <rect x="0" y="130" width="320" height="2" fill="#1e1028" opacity="0.6"/>
    </svg>
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
