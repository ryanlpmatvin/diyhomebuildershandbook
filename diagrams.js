/* Inline SVG diagrams.
   Style: clean technical line drawings with selective colour accents.
   Black outline, warm wood tones, concrete hatch, orange accent for dimensions.
   ViewBoxes are typically 800x500 — render at any size via CSS, stay crisp.

   Structure:
     DIAGRAMS[taskId] = {
       overview: '<svg>...</svg>',           // shown in the detail hero
       steps: { 'step-id-or-index': '<svg>...</svg>' }
     }
   Each step in TASKS may reference one of these via step.diagram.

   For tasks not yet redrawn, ILLUSTRATIONS (legacy PNG map) acts as fallback. */

const DIAGRAM_STYLE = `<defs>
  <pattern id="d-ground" patternUnits="userSpaceOnUse" width="10" height="10">
    <rect width="10" height="10" fill="#e8dcc0"/>
    <circle cx="2" cy="2" r="0.7" fill="#a89968"/>
    <circle cx="7" cy="6" r="0.6" fill="#a89968"/>
    <circle cx="5" cy="9" r="0.5" fill="#8a7848"/>
  </pattern>
  <pattern id="d-concrete" patternUnits="userSpaceOnUse" width="12" height="12">
    <rect width="12" height="12" fill="#d8d8d8"/>
    <line x1="0" y1="12" x2="12" y2="0" stroke="#9a9a9a" stroke-width="0.8"/>
    <line x1="6" y1="12" x2="12" y2="6" stroke="#9a9a9a" stroke-width="0.4"/>
  </pattern>
  <pattern id="d-timber" patternUnits="userSpaceOnUse" width="40" height="4">
    <rect width="40" height="4" fill="#eed9b0"/>
    <line x1="0" y1="2" x2="40" y2="2" stroke="#c9a868" stroke-width="0.5" opacity="0.5"/>
  </pattern>
  <pattern id="d-timber-dark" patternUnits="userSpaceOnUse" width="40" height="4">
    <rect width="40" height="4" fill="#c9a868"/>
    <line x1="0" y1="2" x2="40" y2="2" stroke="#8a7548" stroke-width="0.5" opacity="0.6"/>
  </pattern>
</defs>`;

function svg(viewBox, title, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${title.replace(/"/g, '&quot;')}">
${DIAGRAM_STYLE}
<rect x="0" y="0" width="100%" height="100%" fill="#ffffff"/>
<rect x="0" y="0" width="800" height="38" fill="#1a1a1a"/>
<text x="20" y="25" font-family="-apple-system,system-ui,sans-serif" font-size="15" font-weight="600" fill="#ffffff">${title}</text>
${body}
</svg>`;
}

const DIAGRAMS = {

  // =====================================================================
  // FENCE-PALING — full set
  // =====================================================================
  'fence-paling': {
    overview: svg('0 0 800 500', 'Timber paling fence — section view', `
      <!-- Ground -->
      <rect x="0" y="330" width="800" height="170" fill="url(#d-ground)"/>
      <line x1="0" y1="330" x2="800" y2="330" stroke="#5a4818" stroke-width="2"/>
      <!-- Concrete footing -->
      <rect x="340" y="330" width="120" height="120" fill="url(#d-concrete)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Post -->
      <rect x="380" y="80" width="40" height="370" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Top rail (behind palings) -->
      <rect x="220" y="160" width="360" height="22" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2" opacity="0.9"/>
      <!-- Bottom rail -->
      <rect x="220" y="280" width="360" height="22" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2" opacity="0.9"/>
      <!-- Palings -->
      <g stroke="#1a1a1a" stroke-width="1.5">
        <rect x="220" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="258" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="296" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="334" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="372" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="410" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="448" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="486" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="524" y="100" width="34" height="230" fill="url(#d-timber)"/>
        <rect x="562" y="100" width="18" height="230" fill="url(#d-timber)"/>
      </g>
      <!-- Cap rail -->
      <rect x="200" y="76" width="400" height="24" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>

      <!-- Leader labels -->
      <g font-family="-apple-system,system-ui,sans-serif" font-size="13" fill="#1a1a1a">
        <line x1="180" y1="88" x2="200" y2="88" stroke="#1a1a1a"/>
        <text x="175" y="92" text-anchor="end">Cap rail</text>
        <line x1="180" y1="215" x2="220" y2="215" stroke="#1a1a1a"/>
        <text x="175" y="219" text-anchor="end">Paling 100 × 19</text>
        <line x1="620" y1="171" x2="600" y2="171" stroke="#1a1a1a"/>
        <text x="625" y="175">Top rail 100 × 50</text>
        <line x1="620" y1="291" x2="600" y2="291" stroke="#1a1a1a"/>
        <text x="625" y="295">Bottom rail</text>
        <line x1="180" y1="395" x2="340" y2="395" stroke="#1a1a1a"/>
        <text x="175" y="399" text-anchor="end">Concrete footing</text>
        <line x1="620" y1="340" x2="600" y2="340" stroke="#1a1a1a"/>
        <text x="625" y="344">Ground line</text>
        <line x1="620" y1="100" x2="600" y2="100" stroke="#1a1a1a"/>
        <text x="625" y="104">Post 100 × 100 H4</text>
      </g>

      <!-- Dimensions (orange accent) -->
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a"
         font-family="-apple-system,system-ui,sans-serif" font-size="13" font-weight="600">
        <line x1="700" y1="100" x2="700" y2="330"/>
        <polygon points="700,100 696,108 704,108" stroke="none"/>
        <polygon points="700,330 696,322 704,322" stroke="none"/>
        <rect x="668" y="205" width="64" height="20" fill="#ffffff" stroke="none"/>
        <text x="700" y="219" text-anchor="middle">1800 mm</text>

        <line x1="500" y1="330" x2="500" y2="450"/>
        <polygon points="500,330 496,338 504,338" stroke="none"/>
        <polygon points="500,450 496,442 504,442" stroke="none"/>
        <rect x="470" y="380" width="60" height="20" fill="#ffffff" stroke="none"/>
        <text x="500" y="394" text-anchor="middle">600 mm</text>
      </g>
    `),

    'fence-paling-step-layout': svg('0 0 800 500', 'Step 1–2 — Set out the fence line (plan view)', `
      <!-- Compass -->
      <g transform="translate(720, 80)">
        <circle r="22" fill="#ffffff" stroke="#1a1a1a" stroke-width="1.5"/>
        <polygon points="0,-18 4,0 0,18 -4,0" fill="#d4711a" stroke="#1a1a1a"/>
        <text y="-26" font-family="-apple-system,sans-serif" font-size="11" text-anchor="middle">N</text>
      </g>
      <!-- Property line -->
      <line x1="80" y1="240" x2="720" y2="240" stroke="#1a1a1a" stroke-width="2.5" stroke-dasharray="14 4 2 4"/>
      <text x="400" y="222" font-family="-apple-system,sans-serif" font-size="13" text-anchor="middle" fill="#1a1a1a">Property boundary line</text>
      <!-- Your side / neighbour side labels -->
      <text x="400" y="170" font-family="-apple-system,sans-serif" font-size="13" font-style="italic" text-anchor="middle" fill="#6a6a6a">your side</text>
      <text x="400" y="320" font-family="-apple-system,sans-serif" font-size="13" font-style="italic" text-anchor="middle" fill="#6a6a6a">neighbour</text>
      <!-- String line (offset slightly so visible) -->
      <line x1="120" y1="252" x2="680" y2="252" stroke="#d4711a" stroke-width="2"/>
      <!-- End stakes -->
      <circle cx="120" cy="252" r="8" fill="#d4711a" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="680" cy="252" r="8" fill="#d4711a" stroke="#1a1a1a" stroke-width="1.5"/>
      <!-- Post markers along line at 2.4m centres -->
      <g>
        <rect x="116" y="248" width="8" height="8" fill="#1a1a1a"/>
        <rect x="236" y="248" width="8" height="8" fill="#1a1a1a"/>
        <rect x="356" y="248" width="8" height="8" fill="#1a1a1a"/>
        <rect x="476" y="248" width="8" height="8" fill="#1a1a1a"/>
        <rect x="596" y="248" width="8" height="8" fill="#1a1a1a"/>
        <rect x="676" y="248" width="8" height="8" fill="#1a1a1a"/>
      </g>
      <!-- Dimension between posts -->
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a" font-family="-apple-system,sans-serif" font-size="13" font-weight="600">
        <line x1="120" y1="290" x2="240" y2="290"/>
        <polygon points="120,290 128,286 128,294" stroke="none"/>
        <polygon points="240,290 232,286 232,294" stroke="none"/>
        <rect x="155" y="296" width="70" height="18" fill="#ffffff" stroke="none"/>
        <text x="180" y="308" text-anchor="middle">2.4 m max</text>
      </g>
      <!-- Callouts -->
      <g font-family="-apple-system,sans-serif" font-size="13" fill="#1a1a1a">
        <line x1="120" y1="380" x2="120" y2="262" stroke="#1a1a1a"/>
        <text x="118" y="398" text-anchor="middle">end stake</text>
        <line x1="356" y1="380" x2="356" y2="262" stroke="#1a1a1a"/>
        <text x="356" y="398" text-anchor="middle">intermediate post</text>
        <line x1="600" y1="380" x2="600" y2="262" stroke="#1a1a1a"/>
        <text x="600" y="398" text-anchor="middle">corner / gate post</text>
      </g>
      <!-- Builder's line label -->
      <text x="400" y="440" font-family="-apple-system,sans-serif" font-size="13" fill="#d4711a" font-weight="600" text-anchor="middle">— builder's line stretched between end stakes —</text>
    `),

    'fence-paling-step-hole': svg('0 0 800 500', 'Step 3 — Excavate post hole (section)', `
      <!-- Ground -->
      <rect x="0" y="160" width="800" height="340" fill="url(#d-ground)"/>
      <line x1="0" y1="160" x2="800" y2="160" stroke="#5a4818" stroke-width="2"/>
      <text x="40" y="150" font-family="-apple-system,sans-serif" font-size="12" fill="#5a4818">ground level</text>
      <!-- Hole -->
      <path d="M 320 160 L 320 460 L 480 460 L 480 160" fill="#ffffff" stroke="#1a1a1a" stroke-width="2.5"/>
      <!-- Hole bottom -->
      <line x1="320" y1="460" x2="480" y2="460" stroke="#1a1a1a" stroke-width="3"/>
      <!-- Drainage gravel at base -->
      <g stroke="#1a1a1a" stroke-width="1">
        <circle cx="340" cy="448" r="5" fill="#a89968"/>
        <circle cx="360" cy="452" r="6" fill="#a89968"/>
        <circle cx="385" cy="448" r="5" fill="#a89968"/>
        <circle cx="410" cy="453" r="6" fill="#a89968"/>
        <circle cx="440" cy="448" r="5" fill="#a89968"/>
        <circle cx="465" cy="452" r="6" fill="#a89968"/>
      </g>
      <text x="600" y="455" font-family="-apple-system,sans-serif" font-size="13" fill="#1a1a1a">← drainage metal</text>
      <line x1="595" y1="453" x2="480" y2="453" stroke="#1a1a1a" stroke-width="1"/>
      <!-- Dimensions -->
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a" font-family="-apple-system,sans-serif" font-size="13" font-weight="600">
        <!-- depth -->
        <line x1="540" y1="160" x2="540" y2="460"/>
        <polygon points="540,160 536,168 544,168" stroke="none"/>
        <polygon points="540,460 536,452 544,452" stroke="none"/>
        <rect x="510" y="295" width="60" height="20" fill="#ffffff" stroke="none"/>
        <text x="540" y="309" text-anchor="middle">600 mm</text>
        <!-- width -->
        <line x1="320" y1="120" x2="480" y2="120"/>
        <polygon points="320,120 328,116 328,124" stroke="none"/>
        <polygon points="480,120 472,116 472,124" stroke="none"/>
        <rect x="370" y="100" width="60" height="20" fill="#ffffff" stroke="none"/>
        <text x="400" y="114" text-anchor="middle">300 mm Ø</text>
      </g>
      <!-- Note for corner / gate -->
      <g font-family="-apple-system,sans-serif" font-size="12" fill="#1a1a1a">
        <text x="60" y="260">Corner &amp; gate posts:</text>
        <text x="60" y="278">— deepen to 750 mm</text>
        <text x="60" y="296">— widen to 400 mm Ø</text>
      </g>
      <!-- Services warning -->
      <g transform="translate(580, 200)">
        <polygon points="0,40 24,0 48,40" fill="#ffe9c2" stroke="#d4711a" stroke-width="2"/>
        <text x="24" y="34" font-family="-apple-system,sans-serif" font-size="22" font-weight="700" text-anchor="middle" fill="#d4711a">!</text>
        <text x="24" y="62" font-family="-apple-system,sans-serif" font-size="11" text-anchor="middle" fill="#1a1a1a">Locate services</text>
        <text x="24" y="76" font-family="-apple-system,sans-serif" font-size="11" text-anchor="middle" fill="#1a1a1a">beforeUdig.co.nz</text>
      </g>
    `),

    'fence-paling-step-brace': svg('0 0 800 500', 'Step 4 — Stand the post, brace plumb', `
      <rect x="0" y="320" width="800" height="180" fill="url(#d-ground)"/>
      <line x1="0" y1="320" x2="800" y2="320" stroke="#5a4818" stroke-width="2"/>
      <!-- Hole outline -->
      <path d="M 350 320 L 350 460 L 450 460 L 450 320" fill="#f5efde" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Post -->
      <rect x="380" y="60" width="40" height="400" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Drainage at base -->
      <g stroke="#1a1a1a" stroke-width="0.7">
        <circle cx="365" cy="453" r="5" fill="#a89968"/>
        <circle cx="385" cy="455" r="6" fill="#a89968"/>
        <circle cx="410" cy="453" r="5" fill="#a89968"/>
        <circle cx="435" cy="455" r="6" fill="#a89968"/>
      </g>
      <!-- Braces -->
      <line x1="380" y1="180" x2="200" y2="350" stroke="#8a6a3a" stroke-width="8"/>
      <line x1="420" y1="180" x2="600" y2="350" stroke="#8a6a3a" stroke-width="8"/>
      <!-- Stakes for braces -->
      <rect x="194" y="345" width="12" height="40" fill="#1a1a1a"/>
      <rect x="594" y="345" width="12" height="40" fill="#1a1a1a"/>
      <!-- Plumb level on post -->
      <rect x="425" y="130" width="100" height="22" fill="#ffe06b" stroke="#1a1a1a" stroke-width="1.5"/>
      <circle cx="475" cy="141" r="7" fill="#ffffff" stroke="#1a1a1a"/>
      <circle cx="475" cy="141" r="3" fill="#5fb55f"/>
      <text x="540" y="146" font-family="-apple-system,sans-serif" font-size="13" fill="#1a1a1a">spirit level — check both planes</text>
      <!-- Plumb direction arrows -->
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a">
        <line x1="400" y1="60" x2="400" y2="40"/>
        <polygon points="400,30 395,42 405,42" stroke="none"/>
        <text x="400" y="22" font-family="-apple-system,sans-serif" font-size="12" font-weight="600" text-anchor="middle">plumb</text>
      </g>
      <!-- Brace label -->
      <g font-family="-apple-system,sans-serif" font-size="13" fill="#1a1a1a">
        <text x="240" y="290">timber brace</text>
        <text x="100" y="400">stake</text>
        <line x1="120" y1="395" x2="195" y2="370" stroke="#1a1a1a"/>
      </g>
    `),

    'fence-paling-step-concrete': svg('0 0 800 500', 'Step 5 — Place the concrete', `
      <rect x="0" y="320" width="800" height="180" fill="url(#d-ground)"/>
      <line x1="0" y1="320" x2="800" y2="320" stroke="#5a4818" stroke-width="2"/>
      <!-- Hole with concrete (slope away from post) -->
      <path d="M 350 320 L 320 320 L 350 460 L 450 460 L 480 320 L 450 320 Z" fill="url(#d-concrete)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Sloped top surface -->
      <path d="M 320 320 L 380 305 L 420 305 L 480 320" fill="url(#d-concrete)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Post -->
      <rect x="380" y="60" width="40" height="400" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Water drainage arrows -->
      <g stroke="#1d7bd4" stroke-width="2" fill="#1d7bd4">
        <line x1="370" y1="290" x2="345" y2="312"/>
        <polygon points="345,312 354,308 351,318" stroke="none"/>
        <line x1="430" y1="290" x2="455" y2="312"/>
        <polygon points="455,312 446,308 449,318" stroke="none"/>
      </g>
      <text x="320" y="280" font-family="-apple-system,sans-serif" font-size="13" fill="#1d7bd4" font-weight="600">water sheds away from post</text>
      <!-- Slope angle indicator -->
      <text x="340" y="345" font-family="-apple-system,sans-serif" font-size="12" fill="#d4711a" font-weight="600">slope ≈ 1:6</text>
      <line x1="335" y1="335" x2="380" y2="313" stroke="#d4711a" stroke-width="1"/>
      <!-- Re-check plumb -->
      <g font-family="-apple-system,sans-serif" font-size="13" fill="#1a1a1a">
        <text x="500" y="200">Re-verify plumb</text>
        <text x="500" y="218">before initial set</text>
        <text x="500" y="236">(approx 15 min)</text>
        <line x1="495" y1="210" x2="425" y2="210" stroke="#1a1a1a"/>
        <polygon points="420,210 428,206 428,214" fill="#1a1a1a"/>
      </g>
      <!-- Quantity callout -->
      <g font-family="-apple-system,sans-serif" font-size="12" fill="#1a1a1a">
        <rect x="40" y="100" width="180" height="92" fill="#fff7e3" stroke="#d4711a" stroke-width="1.5"/>
        <text x="130" y="122" text-anchor="middle" font-weight="700" fill="#d4711a">RAPID-SET CONCRETE</text>
        <text x="130" y="142" text-anchor="middle">2 × 20 kg bags per hole</text>
        <text x="130" y="158" text-anchor="middle">(3 for corner / gate posts)</text>
        <text x="130" y="174" text-anchor="middle">add ≈ 3 L water per bag</text>
      </g>
    `),

    'fence-paling-step-rails': svg('0 0 800 500', 'Step 7 — Fix rails between posts (joint detail)', `
      <!-- Two posts -->
      <rect x="120" y="80" width="50" height="380" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <rect x="630" y="80" width="50" height="380" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Rails between posts -->
      <rect x="170" y="160" width="460" height="26" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <rect x="170" y="320" width="460" height="26" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Screws -->
      <g fill="#1a1a1a" stroke="#1a1a1a">
        <circle cx="145" cy="170" r="3"/><circle cx="145" cy="176" r="3"/>
        <circle cx="145" cy="330" r="3"/><circle cx="145" cy="336" r="3"/>
        <circle cx="655" cy="170" r="3"/><circle cx="655" cy="176" r="3"/>
        <circle cx="655" cy="330" r="3"/><circle cx="655" cy="336" r="3"/>
      </g>
      <!-- Pre-drill marker -->
      <g stroke="#d4711a" stroke-width="1.5" fill="none">
        <circle cx="660" cy="160" r="14"/>
      </g>
      <text x="700" y="142" font-family="-apple-system,sans-serif" font-size="12" fill="#d4711a" font-weight="600">pre-drill pilot</text>
      <text x="700" y="158" font-family="-apple-system,sans-serif" font-size="12" fill="#d4711a" font-weight="600">to prevent splits</text>
      <line x1="697" y1="155" x2="675" y2="162" stroke="#d4711a"/>
      <!-- Labels -->
      <g font-family="-apple-system,sans-serif" font-size="13" fill="#1a1a1a">
        <text x="60" y="174" text-anchor="end">top rail</text>
        <line x1="62" y1="170" x2="120" y2="170" stroke="#1a1a1a"/>
        <text x="60" y="334" text-anchor="end">bottom rail</text>
        <line x1="62" y1="330" x2="120" y2="330" stroke="#1a1a1a"/>
        <text x="145" y="448" text-anchor="middle">post</text>
        <text x="655" y="448" text-anchor="middle">post</text>
        <text x="400" y="226" text-anchor="middle" font-style="italic" fill="#6a6a6a">stagger rail joins between rows</text>
      </g>
      <!-- Dimension between posts -->
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a" font-family="-apple-system,sans-serif" font-size="13" font-weight="600">
        <line x1="170" y1="400" x2="630" y2="400"/>
        <polygon points="170,400 178,396 178,404" stroke="none"/>
        <polygon points="630,400 622,396 622,404" stroke="none"/>
        <rect x="358" y="406" width="84" height="20" fill="#ffffff" stroke="none"/>
        <text x="400" y="420" text-anchor="middle">≤ 2.4 m c/c</text>
      </g>
    `),

    'fence-paling-step-palings': svg('0 0 800 500', 'Step 8 — Fix palings (front elevation)', `
      <!-- Top rail (behind, dashed visible) -->
      <line x1="50" y1="120" x2="750" y2="120" stroke="#9a8a5a" stroke-width="2" stroke-dasharray="6 4" opacity="0.5"/>
      <line x1="50" y1="340" x2="750" y2="340" stroke="#9a8a5a" stroke-width="2" stroke-dasharray="6 4" opacity="0.5"/>
      <text x="60" y="115" font-family="-apple-system,sans-serif" font-size="11" fill="#9a8a5a">— top rail (behind)</text>
      <text x="60" y="355" font-family="-apple-system,sans-serif" font-size="11" fill="#9a8a5a">— bottom rail (behind)</text>
      <!-- Palings with consistent gap -->
      <g stroke="#1a1a1a" stroke-width="1.5">
        <rect x="80" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="144" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="208" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="272" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="336" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="400" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="464" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="528" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="592" y="80" width="56" height="320" fill="url(#d-timber)"/>
        <rect x="656" y="80" width="56" height="320" fill="url(#d-timber)"/>
      </g>
      <!-- Nail marks (2 per rail, on a few palings) -->
      <g fill="#1a1a1a">
        <circle cx="108" cy="120" r="2.5"/><circle cx="108" cy="128" r="2.5"/>
        <circle cx="108" cy="340" r="2.5"/><circle cx="108" cy="348" r="2.5"/>
        <circle cx="364" cy="120" r="2.5"/><circle cx="364" cy="128" r="2.5"/>
        <circle cx="364" cy="340" r="2.5"/><circle cx="364" cy="348" r="2.5"/>
        <circle cx="620" cy="120" r="2.5"/><circle cx="620" cy="128" r="2.5"/>
        <circle cx="620" cy="340" r="2.5"/><circle cx="620" cy="348" r="2.5"/>
      </g>
      <!-- Gap dimension -->
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a" font-family="-apple-system,sans-serif" font-size="12" font-weight="600">
        <line x1="200" y1="60" x2="208" y2="60"/>
        <text x="204" y="48" text-anchor="middle">5–8 mm</text>
        <line x1="180" y1="56" x2="180" y2="80" stroke="#d4711a" stroke-dasharray="2 2"/>
        <line x1="228" y1="56" x2="228" y2="80" stroke="#d4711a" stroke-dasharray="2 2"/>
      </g>
      <!-- Two-fixings-per-rail callout -->
      <g font-family="-apple-system,sans-serif" font-size="12" fill="#1a1a1a">
        <text x="730" y="124" text-anchor="end">2 fixings per rail</text>
        <line x1="730" y1="120" x2="630" y2="124" stroke="#1a1a1a"/>
      </g>
      <!-- Ground clearance -->
      <line x1="50" y1="430" x2="750" y2="430" stroke="#5a4818" stroke-width="2"/>
      <rect x="50" y="430" width="700" height="50" fill="url(#d-ground)"/>
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a" font-family="-apple-system,sans-serif" font-size="12" font-weight="600">
        <line x1="730" y1="400" x2="730" y2="430"/>
        <polygon points="730,400 726,408 734,408" stroke="none"/>
        <polygon points="730,430 726,422 734,422" stroke="none"/>
        <text x="700" y="420" text-anchor="end">25–40 mm clear</text>
      </g>
    `),

    'fence-paling-step-cap': svg('0 0 800 500', 'Step 10 — Cap rail detail', `
      <!-- Two palings, close up section -->
      <rect x="280" y="160" width="80" height="280" fill="url(#d-timber)" stroke="#1a1a1a" stroke-width="2"/>
      <rect x="368" y="160" width="80" height="280" fill="url(#d-timber)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Cap rail -->
      <rect x="240" y="120" width="248" height="40" fill="url(#d-timber-dark)" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Drip groove on underside -->
      <line x1="252" y1="158" x2="252" y2="155" stroke="#1a1a1a" stroke-width="2"/>
      <line x1="476" y1="158" x2="476" y2="155" stroke="#1a1a1a" stroke-width="2"/>
      <!-- Slight slope on top of cap -->
      <line x1="240" y1="120" x2="488" y2="125" stroke="#5a4818" stroke-width="1"/>
      <!-- Fix points (countersunk screws on top) -->
      <g fill="#1a1a1a" stroke="#1a1a1a">
        <circle cx="320" cy="130" r="3"/>
        <circle cx="408" cy="130" r="3"/>
      </g>
      <!-- Labels -->
      <g font-family="-apple-system,sans-serif" font-size="13" fill="#1a1a1a">
        <text x="220" y="140" text-anchor="end">cap rail</text>
        <line x1="222" y1="136" x2="240" y2="136" stroke="#1a1a1a"/>
        <text x="540" y="155" >drip edge</text>
        <line x1="535" y1="151" x2="478" y2="151" stroke="#1a1a1a"/>
        <text x="220" y="300" text-anchor="end">paling</text>
        <line x1="222" y1="296" x2="280" y2="296" stroke="#1a1a1a"/>
      </g>
      <!-- Overhang dimension -->
      <g stroke="#d4711a" stroke-width="1.5" fill="#d4711a" font-family="-apple-system,sans-serif" font-size="12" font-weight="600">
        <line x1="240" y1="90" x2="280" y2="90"/>
        <polygon points="240,90 248,86 248,94" stroke="none"/>
        <polygon points="280,90 272,86 272,94" stroke="none"/>
        <text x="260" y="80" text-anchor="middle">10–15 mm</text>
        <line x1="240" y1="90" x2="240" y2="120" stroke="#d4711a" stroke-dasharray="2 2"/>
        <line x1="280" y1="90" x2="280" y2="160" stroke="#d4711a" stroke-dasharray="2 2"/>
      </g>
      <!-- Seal end-grain note -->
      <g font-family="-apple-system,sans-serif" font-size="12" fill="#1a1a1a">
        <rect x="540" y="220" width="220" height="100" fill="#fff7e3" stroke="#d4711a" stroke-width="1.5"/>
        <text x="650" y="244" text-anchor="middle" font-weight="700" fill="#d4711a">SEAL END-GRAIN</text>
        <text x="650" y="266" text-anchor="middle">Pre-prime cap rail ends and</text>
        <text x="650" y="284" text-anchor="middle">paling tops before topcoat —</text>
        <text x="650" y="302" text-anchor="middle">end-grain is where rot starts.</text>
      </g>
    `)
  }
};
