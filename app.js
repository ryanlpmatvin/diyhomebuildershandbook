/* DIY - Home Builders Handbook — client-side single-file app
   Storage:
     bh_users     -> { [email]: { name, email, passHash, createdAt } }
     bh_session   -> { email }
     bh_progress  -> { [email]: { [taskId]: { done: bool, viewedAt } } }
*/

// ---------- TASK DATA ----------
const TASKS = [
  // ===== EXTERIOR =====
  {
    id: 'fence-paling',
    category: 'Exterior',
    title: 'Build a timber paling fence',
    summary: 'A standard 1.8 m boundary fence with concreted posts, rails and palings.',
    difficulty: 'Intermediate',
    time: '1–2 weekends (per 10 m)',
    overview:
      'A paling fence is the most common Kiwi boundary fence. The basic anatomy is concreted posts at ~2.4 m centres, two or three horizontal rails fixed between the posts, and vertical palings nailed or screwed to the rails. Get the posts right and the rest is straightforward.',
    tools: [
      'Post hole borer (manual or hired powered)',
      'Spirit level (600 mm) and string line',
      'Measuring tape, builder’s pencil, chalk line',
      'Spade and crowbar (for rocks and clay)',
      'Cordless drill/driver and impact driver',
      'Circular skill saw with a sharp blade',
      'Hammer and/or nail gun (galvanised gun nails)',
      'Wheelbarrow for mixing concrete'
    ],
    materials: [
      'H4 or H5 treated posts (100×100 mm, 2.4 m long for 1.8 m above ground)',
      'H3.2 rails (100×50 mm)',
      'H3.2 palings (100×19 mm, 1.8 m)',
      'Rapid-set post concrete (one 20 kg bag per post is typical)',
      'Hot-dip galvanised or stainless screws/nails',
      'Galvanised brackets or rail-to-post hardware (optional)',
      'Builder’s twine and spray paint'
    ],
    steps: [
      { title: 'Mark the line and check the boundary', body: 'Confirm the boundary with title plans or talk to your neighbour. Run a string line between the start and end points to mark the exact fence line.' },
      { title: 'Set out post positions', body: 'Mark post centres at 2.4 m maximum (closer if the fence is exposed). Use spray paint or a peg at each location. Plan corners and gate posts first.' },
      { title: 'Dig the holes', body: 'Aim for holes 600 mm deep × 300 mm wide for a 1.8 m fence. Deeper and wider for corner/gate posts (up to 750 mm). Keep the bottom flat.' },
      { title: 'Stand the posts and brace', body: 'Drop in a small bed of metal or compacted soil for drainage. Stand the post, plumb in both directions with a level, and brace with timber off-cuts and stakes.' },
      { title: 'Pour the concrete', body: 'Tip dry rapid-set into the hole around the post, then add water as per the bag instructions. Slope the top of the concrete away from the post to shed water. Re-check plumb before it sets.' },
      { title: 'Set the rail heights', body: 'Once concrete is set (usually next day), run a string line from end post to end post at the top rail height and bottom rail height. Mark each post.' },
      { title: 'Fix the rails', body: 'Cut rails to span between posts (or run them past with a half-housing joint). Screw or nail through the post into the rail end — pre-drill to avoid splits. Stagger any joins.' },
      { title: 'Nail on the palings', body: 'Start at one end with a plumb paling. Use a string line at the top to keep heights consistent. Leave a 5–8 mm gap between palings (they will shrink and swell). Two fixings per rail.' },
      { title: 'Trim the tops', body: 'Run a chalk line across the paling tops at the finished height (e.g. 1800 mm). Cut with a skill saw set to depth, then sand any rough cuts.' },
      { title: 'Cap and finish', body: 'A capping rail along the top protects end-grain and looks tidy. Stain or oil with an exterior treatment within a few weeks of install.' }
    ],
    bestPractice: [
      'Always use H4 (or H5) treated timber for anything in ground contact — H3 will rot.',
      'Posts must be plumb in two planes — a single check is not enough.',
      'Concrete the hole, do not just backfill with dirt: the post will lean within a year.',
      'Pre-drill near the ends of rails and palings to avoid splitting.',
      'Where the fence is on a slope, step the fence (level panels) or rake it (parallel to slope). Don’t mix.',
      'For shared boundary fences in NZ, talk to your neighbour first — the Fencing Act 1978 covers cost-sharing for an adequate fence.'
    ],
    commonMistakes: [
      'Holes too shallow — fence racks in the first windy southerly.',
      'Posts spaced too far apart — rails sag and palings wave.',
      'Driving fixings flush into thin palings — they split. Sit the nail head just on the surface.',
      'No drainage gap below palings — wicking causes rot at the bottom edge.'
    ],
    safety: 'Locate underground services before digging — call beforeUdig.co.nz. Wear safety glasses when cutting and ear protection with the skill saw.'
  },

  {
    id: 'deck-build',
    category: 'Exterior',
    title: 'Build a low timber deck',
    summary: 'A ground-level deck with treated piles, bearers, joists and decking boards.',
    difficulty: 'Intermediate',
    time: '2–3 weekends (≈12 m²)',
    overview:
      'A standalone deck under 1.5 m off the ground and under 40 m² generally falls under Schedule 1 (no consent), but always check with your council. The structure is: piles → bearers → joists → decking. Get the slope, ventilation and fixings right and a deck will last 20+ years.',
    tools: [
      'Spirit level (1 m+), string line, builder’s square',
      'Tape measure, pencil, chalk line',
      'Post hole borer or spade',
      'Wheelbarrow for concrete',
      'Cordless drill/driver and impact driver',
      'Circular saw or mitre saw',
      'Joist hangers and a hanger nail gun (or palm nailer)',
      'Decking spacer (or a couple of 5 mm nails)'
    ],
    materials: [
      'H5 treated piles (100×100 or pre-cast concrete piles with anchors)',
      'H3.2 bearers (140×45 or 190×45 depending on span)',
      'H3.2 joists (140×45, typically at 400–450 mm centres)',
      'Galvanised joist hangers and stainless screws/nails',
      'H3.2 decking boards (90×19 or 140×19 grooved/smooth)',
      '20 kg bags of rapid-set concrete (one per pile)',
      '#10 stainless or class-4 coated decking screws'
    ],
    steps: [
      { title: 'Plan the layout', body: 'Decide on the deck position, height (one step down from your door is comfortable), and dimensions. Joist direction usually runs the short way; decking runs the long way.' },
      { title: 'Set out the piles', body: 'Run string lines at the perimeter and check the corners are square using the 3-4-5 method. Mark pile positions at 1.4–1.8 m centres along the bearer lines.' },
      { title: 'Dig and set piles', body: 'Dig holes 450–600 mm deep. Stand piles plumb, brace, and pour rapid-set concrete. For pre-cast piles, sit them on a bed of metal and concrete in.' },
      { title: 'Cut piles to height', body: 'Once concrete is set, run a string line at the finished bearer-top height. Mark every pile and trim with a skill saw. Subtract bearer + joist + decking depths to get the right height.' },
      { title: 'Fix bearers', body: 'Sit bearers on top of piles (or in saddles). Skew-nail or use bowmac brackets. Bearers should be dead level along their length.' },
      { title: 'Hang the joists', body: 'Mark joist positions on bearers at the chosen centres (400 mm for 19 mm decking, 450 mm for 32 mm). Fix joist hangers with galvanised teco nails. Crown side up (slight bow upward).' },
      { title: 'Check square and brace', body: 'Measure both diagonals — equal means square. Add herringbone or solid blocking between joists at mid-span on longer decks (>2.4 m joists) to stop twist.' },
      { title: 'Lay the first board', body: 'Start at the house (or the most visible edge). Pull a string line to keep it straight. Leave 8–10 mm off any cladding or wall.' },
      { title: 'Lay remaining boards', body: 'Maintain a consistent 4–6 mm gap with a spacer (kiln-dried decking can shrink slightly). Two screws per joist, 15 mm in from edges, pre-drill near board ends.' },
      { title: 'Trim and finish', body: 'Run a chalk line down the overhanging ends and cut flush (or leave 20 mm overhang). Sand any rough edges. Oil within a few weeks — kwila and vitex need oiling sooner to seal tannins.' }
    ],
    bestPractice: [
      'Slope the deck 1:100 away from the house so water sheds.',
      'Leave 8–10 mm gap from cladding for ventilation and movement.',
      'Use stainless steel or Class 4 coated fixings — galvanised will streak with kwila/hardwood tannins.',
      'Pre-drill within 50 mm of any board end to stop splitting.',
      'Boards on edge (bark side / crown up) helps shed water from the centre.',
      'Anything over 1.5 m off the ground will need a balustrade and likely consent — check.'
    ],
    commonMistakes: [
      'Insufficient pile depth — the deck sags or moves with the seasons.',
      'Joists too far apart for the board thickness — boards bounce or cup.',
      'No expansion gap between boards — they buckle in wet weather.',
      'Decking laid with the bark side down — water pools in the cup.',
      'Forgetting cross-bracing on tall piles — the deck racks under load.'
    ],
    safety: 'Wear glasses and ear protection. Tie back loose clothing near the saw. Don’t work alone when handling long timbers.'
  },

  {
    id: 'weatherboards',
    category: 'Exterior',
    title: 'Install bevel-back weatherboards',
    summary: 'Fit horizontal timber cladding over building paper and cavity battens.',
    difficulty: 'Advanced',
    time: 'A full weekend per wall',
    overview:
      'Modern NZ weatherboards are installed over a drained cavity (20 mm cavity battens) and building wrap. Each board overlaps the one below by ~30 mm to shed water. The detail at corners, around windows and at the bottom edge is where most failures happen.',
    tools: [
      'Mitre saw or chop saw with a fine-tooth blade',
      'Cordless drill/driver',
      'Stainless or galvanised nail gun',
      'Spirit level and a long straight edge',
      'String line and chalk line',
      'Hammer and nail punch',
      'Sealant gun for joints',
      'Coping saw for scribes'
    ],
    materials: [
      'H3.1 pre-primed bevel-back weatherboards (e.g. cedar, pine, vertical-grain)',
      'Cavity battens (20 mm H3.1)',
      'Building wrap (wall underlay)',
      'Aluminium or PVC scriber/jamb flashings',
      'Stainless steel jolt-head nails (or annular ring shank)',
      'Exterior-grade neutral-cure sealant',
      'Primer and topcoat exterior paint'
    ],
    steps: [
      { title: 'Confirm framing and wrap', body: 'Ensure wrap is up, taped at joins, and dressed into window openings. Cavity battens are fixed over studs at every stud (max 600 mm centres).' },
      { title: 'Install starter strip', body: 'Fix a starter strip (a rip of board or a manufactured kicker) along the bottom plate height so the first board sits at the correct angle. The bottom of the first board should be at least 175 mm above ground or 100 mm above paving.' },
      { title: 'Mark exposure lines', body: 'Calculate the visible "exposure" of each board (typical 135 mm cover for 180 mm boards). Mark lines on every cavity batten with a chalk line so each board lands consistently.' },
      { title: 'Cut the first board', body: 'Measure between the corner boxes (or scribers). Cut with a back-cut of 1–2° to tighten the joint. Pre-prime any cut ends.' },
      { title: 'Fix the board', body: 'Position the bottom edge on the chalk line. Single-nail near the top of each board, into the cavity batten / stud. Don’t nail through the board below — boards need to move.' },
      { title: 'Build up the wall', body: 'Each subsequent board overlaps the previous by 30 mm (or the manufacturer’s spec). Use a small story stick cut to the exposure to gauge each course.' },
      { title: 'Cope joints and scarf joints', body: 'Where boards butt mid-wall, cut a 30° scarf joint with the upper board sloping outward — water sheds. Seal cut ends and pre-prime.' },
      { title: 'Detail around openings', body: 'Window head flashings sit over the board above; sill scribers under the sill flashing. Leave a 5 mm gap and seal with a backer rod and sealant — do NOT seal the bottom of the window flashing (drainage path).' },
      { title: 'Corner boxes', body: 'Run vertical corner boxes (two boards mitred or butted L-shaped) over the weatherboard ends. Seal end-grain of every board where it lands at the corner.' },
      { title: 'Paint and finish', body: 'Spot-prime any nail heads with rust-inhibiting primer. Two topcoats of exterior paint, paying attention to the bottom edge (most rot here).' }
    ],
    bestPractice: [
      'Always paint or stain end-grain — that’s where rot starts.',
      'One nail per stud only — over-nailing causes splitting and stops natural movement.',
      'Maintain ground clearance: 175 mm to grass/dirt, 100 mm to paved surfaces.',
      'Cavity battens are required by NZBC E2/AS1 — don’t fix boards direct to wrap.',
      'Stainless nails are non-negotiable for cedar (tannin reacts with steel).',
      'Cross-check window flashings: head flashing OVER cladding, jamb flashings BEHIND.'
    ],
    commonMistakes: [
      'Boards finishing too close to the ground — wicking and splash-back rot.',
      'Two nails per board — splits along the grain in summer heat.',
      'Sealing the bottom of head flashings — traps water inside the wall.',
      'Buying the wrong treatment level (H3.1 minimum for cladding).'
    ],
    safety: 'Working at height — use a properly tied scaffold or an EWP, not a step ladder past 2 m. Wear glasses when nail-gunning; misfires happen.'
  },

  // ===== INTERIOR =====
  {
    id: 'cutting-trims',
    category: 'Interior trim',
    title: 'Cut and fit interior trims (skirting & architraves)',
    summary: 'Mitres, scribes and scarf joints for clean professional-looking trim work.',
    difficulty: 'Beginner',
    time: 'A few hours per room',
    overview:
      'Trims forgive nothing — every gap is visible. The two essential cuts are the 45° mitre (for external corners) and the scribe (for internal corners on skirting, which is more reliable than a mitre because rooms are rarely square).',
    tools: [
      'Mitre saw (compound for tall skirting)',
      'Coping saw or jigsaw with a fine blade',
      'Combination square and small protractor',
      'Pencil (sharp) and white marker for dark trims',
      'Nail gun (15 or 18 gauge brad/finishing) or hammer + punch',
      'Tape measure',
      'Sandpaper (180 grit) and a sanding block',
      'Caulking gun for gap-filler'
    ],
    materials: [
      'Pre-primed MDF or pine skirting / architrave',
      '38 mm or 45 mm finishing nails / brads',
      'Painters caulk (acrylic gap filler)',
      'Wood filler for nail holes',
      'Adhesive (e.g. Selley’s No More Gaps for joints)',
      'Undercoat and topcoat paint'
    ],
    steps: [
      { title: 'Plan the wall order', body: 'Start with the wall opposite the door (square cuts both ends). Then the two walls either side (one square end at the door, one scribed). Finish with the wall containing the door.' },
      { title: 'Measure tight', body: 'Measure wall length with the tape in the corner, not the trim. For long walls, measure and cut slightly long (1–2 mm), then "spring" the trim into place — a tight joint hides shrinkage.' },
      { title: 'Make a 45° mitre for external corners', body: 'Set the saw to 45° in the right direction. The back of the trim is the longest point; the face is the shortest. Always cut with the trim flat against the saw fence.' },
      { title: 'Cope an internal corner', body: 'Start with one trim cut square into the corner. The second trim gets a 45° internal mitre cut, then with the coping saw, cut along the visible profile line of the mitre, undercutting (back-cut) at 5–10°. The coped piece slides over the square piece.' },
      { title: 'Test fit before nailing', body: 'Hold the trim in position. If a joint gaps, mark high spots with a pencil and shave back with sandpaper or a sharp block plane. Don’t nail yet.' },
      { title: 'Glue and nail', body: 'Run a small bead of construction adhesive on the back. Nail every 400–600 mm into studs — angle 30° down for skirting (catches the bottom plate). Two nails near each corner.' },
      { title: 'Scarf joints for long walls', body: 'Where two trims meet on a long wall, don’t butt-join — cut a 45° scarf joint (both trims at the same angle) so the joint hides shrinkage. Glue the joint and place over a stud.' },
      { title: 'Punch and fill', body: 'Punch all nail heads 1 mm below the surface. Fill with wood filler, sand flush when dry.' },
      { title: 'Caulk the gaps', body: 'Run a fine bead of acrylic caulk along the top of the skirting (wall side) and any open joints. Smooth with a damp finger immediately. Don’t caulk the bottom against the floor on timber floors — it can crack as floor moves.' },
      { title: 'Paint', body: 'Undercoat any bare timber or filler, then topcoat — semi-gloss or satin enamel hides imperfections and wipes clean.' }
    ],
    bestPractice: [
      'On internal corners, always cope skirting — mitred internals open up with the seasons.',
      'On external corners, mitre — and back-bevel by 1° so the front face closes tight.',
      'Cut a hair long and spring in — never short.',
      'Sharp pencil only — a fat line is an open joint.',
      'Pre-paint trims before fixing (one coat) — only touch-up needed after.'
    ],
    commonMistakes: [
      'Mitring internal corners on skirting — they always open up.',
      'Trim cut too short — there is no fix that doesn’t show.',
      'Nailing into nothing — locate studs with a stud finder first.',
      'Skipping the caulk — every paint job will look amateurish without it.'
    ],
    safety: 'Mitre saws are forgiving but unforgiving — never reach across the blade, let it spin down before lifting, and clamp short off-cuts.'
  },

  {
    id: 'gibbing',
    category: 'Walls & ceilings',
    title: 'Hang plasterboard (gibbing)',
    summary: 'Fix GIB sheets to timber framing for walls and ceilings.',
    difficulty: 'Intermediate',
    time: '1 day per room (4 walls + ceiling)',
    overview:
      'Gibbing is mostly about handling big heavy sheets accurately. Standard interior boards are 10 mm (walls) and 13 mm (ceilings) — wet areas need Aqualine, garages need Fyreline. Sheets run horizontally on walls to minimise visible joints.',
    tools: [
      'Stanley knife with snap-off blades (and spares)',
      'Tape measure, straight edge / T-square (gib square)',
      'Cordless drill/driver or collated screw gun',
      'Gib lifter (panel lifter) for ceilings — well worth hiring',
      'Step platform / hop-up',
      'Rasp (gib rasp) for cleaning cut edges',
      'Spirit level and chalk line',
      'Stud finder',
      'Multi-tool or jab saw for cutouts'
    ],
    materials: [
      'GIB Standard 10 mm (walls), 13 mm (ceilings) — or Aqualine / Fyreline as required',
      '32 mm gib screws for 10 mm board, 41 mm for 13 mm',
      'GIB-Cove adhesive (for ceiling stopping later)',
      'Construction adhesive (e.g. Selleys GP)',
      'Block to set bottom of sheets off the floor (gib lifter or off-cuts)'
    ],
    steps: [
      { title: 'Inspect the framing', body: 'Check studs are plumb, dwangs at the right heights (around 800 mm and 1400 mm typically), and no nail heads or pipes proud. Sight along studs — pack any that bow >3 mm with packers or plane back.' },
      { title: 'Mark stud and dwang positions', body: 'Snap chalk lines across the wall surface showing stud centres. This saves a lot of time once the board is up.' },
      { title: 'Do the ceiling first', body: 'Ceilings before walls — wall sheets then support the ceiling edges. Run sheets perpendicular to the joists, stagger end joints.' },
      { title: 'Cut sheets to size', body: 'Score the paper face with a sharp knife along a straight edge. Snap the sheet back away from the cut. Cut the paper on the back side. Rasp the cut edge smooth.' },
      { title: 'Glue and screw', body: 'Run a bead of construction adhesive (≈10 mm wide) down every stud the sheet will cover. Lift the sheet into position — top sheet first on walls, tight to ceiling.' },
      { title: 'Fix with screws', body: 'Screws at 300 mm centres along studs and dwangs. Drive heads 1–2 mm into the paper (not through it). Stop a screw about 15 mm from the edge of the board.' },
      { title: 'Stagger end joints', body: 'Where two sheets butt end-to-end, stagger this joint with the row above/below by at least 600 mm. Avoid joints at door and window corners — sheets there should be L-shaped, not pieced.' },
      { title: 'Bottom sheet and floor gap', body: 'Lift the bottom sheet up 10–12 mm off the floor (use off-cuts or a gib lifter foot pedal). This keeps moisture out and gives the skirting room to sit.' },
      { title: 'Cut around openings', body: 'For power points and switches, measure precisely from a corner and a known edge. Drill a starter hole, then jab saw or multi-tool out. Test fit the box plate before stopping.' },
      { title: 'Final check', body: 'Run a hand over every joint and every screw — feel for proud screws or rough edges. Fix anything sloppy now; it’s much harder to fix after stopping.' }
    ],
    bestPractice: [
      'Horizontal sheets on walls — one continuous joint at chair-height is easier to hide than vertical seams every 1.2 m.',
      'Glue every stud — this halves the number of fixings visible and stiffens the wall.',
      'Set screws 1–2 mm deep, NEVER through the paper face. Through-paper screws lose holding strength.',
      'Wet areas (bathrooms, laundry) — use Aqualine and seal cut edges with sealer before tiling.',
      'Fire-rated walls (garage to house) — use Fyreline and check the GIB® system requirements.',
      'Two people for sheets longer than 2.4 m. Always two for ceilings (or a gib lifter).'
    ],
    commonMistakes: [
      'Screws over-driven through the paper — they pop out under load.',
      'Sheets touching the floor — wicks moisture, cracks at stopping later.',
      'Joints landing on door/window corners — guaranteed cracks within 12 months.',
      'Forgetting to mark studs on the floor before sheeting — guessing where to screw afterward.'
    ],
    safety: 'GIB dust contains gypsum and silica — wear a P2 dust mask when cutting. Sheets are 30+ kg — use proper lifting technique or get help.'
  },

  {
    id: 'plastering',
    category: 'Walls & ceilings',
    title: 'Stop and plaster GIB (Level 4 finish)',
    summary: 'Tape, base coat, top coat and sand to a paint-ready Level 4 finish.',
    difficulty: 'Intermediate',
    time: '3–4 days (with drying time between coats)',
    overview:
      'A Level 4 finish — three coats of stopping over taped joints and screw heads — is the standard paint-ready finish in NZ residential. Patience between coats is everything; rushing causes cracks and visible joints.',
    tools: [
      'Hawk and trowel (or wide stopping knife — 100 mm, 200 mm, 300 mm)',
      'Mud pan',
      'Internal corner tool (250 mm)',
      'External corner trowel or angle bead',
      'Mixing paddle and drill (for powdered compound)',
      'Sanding pole with mesh screen (120 grit, 180 grit)',
      'LED inspection light (raking light shows imperfections)',
      'Drop sheets — lots'
    ],
    materials: [
      'Paper joint tape (250 m roll) — better than mesh for flat joints',
      'Base coat / fibre stopping compound (e.g. GIB Tradeset 45 or Promix)',
      'Top coat / lite-weight finish compound (e.g. GIB ProMix Lite)',
      'External corner bead (paper-faced or metal)',
      'Sandpaper / sanding mesh (120, 180, 220 grit)',
      'PVA sealer or undercoat'
    ],
    steps: [
      { title: 'Inspect and prep', body: 'Run a wide knife over every screw head — anything proud needs another turn in. Knock back any sharp paper burrs on the cut edges with a rasp.' },
      { title: 'Mix the base coat', body: 'Mix base coat to a smooth, peanut-butter consistency. Let it slake for 5 minutes, then re-mix. Working time is typically 45–60 minutes — don’t mix more than you can apply.' },
      { title: 'Tape the joints', body: 'Run a thin layer of base coat down the joint with a 100 mm knife. Press the paper tape into the wet compound (centre the tape on the joint), then squeeze excess out from under it with the knife. No bubbles.' },
      { title: 'Cover the tape', body: 'Immediately apply another thin layer of base coat over the tape. Feather the edges out 100 mm either side. Let dry 12–24 hours.' },
      { title: 'First coat over screws', body: 'Same session — fill every screw dimple with base coat, levelled flush.' },
      { title: 'External corners', body: 'Fit paper-faced bead or metal angle bead set in compound. Embed in base coat both sides. Wipe excess. Internal corners — tape both sides in one go with the corner tool.' },
      { title: 'Second coat (filler coat)', body: 'Once base coat is bone dry (check colour change — no dark patches), apply a wider second coat using a 200 mm knife. Feather 200 mm either side of the joint. Coat screws again. Dry 12–24 hours.' },
      { title: 'Third coat (skim coat)', body: 'Use the lite-weight top coat. Wide knife (300 mm). Very thin, very wide — feather to nothing 300 mm either side. Goal: invisible transition. Coat screws a final time.' },
      { title: 'Sand to finish', body: 'Wait until completely dry. Sand with 120 grit on a pole, then 180 grit by hand on joints. Use a raking LED light held flat against the wall — every shadow is a defect. Touch up and re-sand as needed.' },
      { title: 'Seal before painting', body: 'A full coat of PVA sealer or proper undercoat — never paint topcoat direct onto stopping compound. The compound absorbs paint differently than the paper face, causing "joint flashing" without sealer.' }
    ],
    bestPractice: [
      'Three coats, three days, three knife widths (100 / 200 / 300).',
      'Apply thin coats and feather — never try to fill in one pass.',
      'Always sand between coats — knock back ridges with 120 grit before the next coat.',
      'Raking light at every stage — fix imperfections as you go, not at the end.',
      'PVA sealer before paint — non-negotiable for an even finish.',
      'Keep the room well ventilated but not drafty (drafts cause uneven drying and cracking).'
    ],
    commonMistakes: [
      'Mixing too much compound — half goes hard in the bucket.',
      'Sanding too soon — gouges the wet compound.',
      'Mesh tape on flat joints — flexes too much, joints crack.',
      'Skipping the third coat — joints are visible under paint forever.',
      'No sealer — patches of joint flash through the topcoat.'
    ],
    safety: 'Gypsum dust — P2 mask and goggles while sanding. Empty buckets — heavier than they look. Use a sanding pole, not a ladder, for ceilings where possible.'
  },

  {
    id: 'hang-door',
    category: 'Interior',
    title: 'Hang an interior door',
    summary: 'Hinge a new flush or panel door into an existing frame.',
    difficulty: 'Beginner',
    time: '1–2 hours',
    overview:
      'Hanging a door is the classic "looks easy, has details" job. Three hinges, even gaps all the way round, and a latch that catches first time.',
    tools: [
      'Sharp chisel (25 mm) and mallet',
      'Cordless drill and screwdrivers',
      'Combination square and pencil',
      'Spirit level (600 mm)',
      'Hand plane or electric planer',
      'Hinge jig (optional but speeds up hinge mortises)',
      'Wedges (timber or pre-made)',
      'Forstner bit (35 mm for latch mortice)'
    ],
    materials: [
      'Door (35 mm or 40 mm interior)',
      'Three 75–100 mm butt hinges (loose-pin for ease)',
      'Latch and handle set',
      'Strike plate',
      'Hinge screws (sized to suit hinges)'
    ],
    steps: [
      { title: 'Measure the opening', body: 'Measure the frame width at top, middle and bottom — frames are rarely truly square. Measure height in three places too. Allow 2 mm gap at each side and top, 6–10 mm at the bottom.' },
      { title: 'Trim the door to size', body: 'Mark the door — usually trim the lock-edge (handle side) first, then the bottom, then the hinge-edge if needed. Plane to the line with a sharp plane, with the grain. Final pass with a back-bevel of 2° to ease swing.' },
      { title: 'Wedge in place and mark hinges', body: 'Set the door in the opening with even gaps using wedges. Mark hinge positions — 175 mm down from top, 250 mm up from bottom, third hinge halfway between (or 25 mm above middle on heavy doors).' },
      { title: 'Cut hinge mortises', body: 'Score the hinge outline with a sharp chisel. Then chop a series of relief cuts across the grain ~3 mm apart, depth equal to hinge thickness. Lever the waste out and clean the bottom flat. Test-fit the hinge — it should sit perfectly flush.' },
      { title: 'Mirror mortises on the frame', body: 'Hold the door in position again, mark the hinge positions on the frame. Mortise the frame the same way.' },
      { title: 'Hang the door', body: 'Screw hinges to the door first, then offer the door up to the frame and put one screw in each frame hinge. Test swing. Adjust if needed before driving the rest of the screws.' },
      { title: 'Mark and bore the latch', body: 'Mark the latch height (usually 1000 mm to centre of handle). Drill 35 mm hole through the face for the latch barrel. Drill a smaller (22 mm) hole into the edge for the latch tongue. Mortise a recess for the latch faceplate so it sits flush.' },
      { title: 'Fit the strike plate', body: 'Close the door gently and mark where the latch tongue touches the frame. Mortise out for the strike plate and a small recess for the tongue itself. Screw the plate on — test that the door latches without slamming.' },
      { title: 'Final adjustments', body: 'Test the swing. Check gaps all round — should be 2 mm at top and sides, even bottom clearance. Adjust by packing behind hinges (cardboard) if a side is binding.' }
    ],
    bestPractice: [
      'Mark hinge positions with a sharp pencil and a knife line — chisel cuts to the knife line, not the pencil.',
      'Three hinges on any solid-core or external-style door — two only on hollow-core internals.',
      'Pack behind a hinge to throw the door away from the binding side — this is the pro trick for "the door won’t close".',
      'A 2° back-bevel on the lock edge stops the door from binding on the strike when shutting.',
      'Don’t over-tighten hinge screws into MDF or particleboard frames — they strip easily.'
    ],
    commonMistakes: [
      'Cutting too much off the bottom — the door won’t latch level afterwards. Trim the top, not the bottom, if you can.',
      'Hinge mortises too deep — the door is hinge-bound and won’t close fully.',
      'Hinge mortises too shallow — gap on the hinge side, won’t latch.',
      'Forgetting to allow for the floor covering — door fouls the new carpet.'
    ],
    safety: 'Sharp chisels are safer than blunt ones — keep them honed. Always chisel away from your hand. Doors are heavy — get help lifting solid-core.'
  },

  {
    id: 'painting',
    category: 'Interior',
    title: 'Paint an interior room',
    summary: 'Prep, cut in and roll for a uniform durable finish.',
    difficulty: 'Beginner',
    time: '1–2 days',
    overview:
      'Painting is 80% preparation. Skipping prep is the single biggest reason DIY paint jobs look DIY. Two coats minimum, sealer/undercoat on any bare patches.',
    tools: [
      'Drop sheets (canvas, not plastic — plastic is slippery and traps wet paint)',
      'Painters tape (low-tack 2-3 day tape, not masking tape)',
      'Filler knife and 180 grit sandpaper',
      '50 mm angle sash brush (good quality — Wooster, Purdy, Haydn)',
      'Roller frame (230 mm) and a roller tray',
      'Microfibre roller sleeves (12 mm nap for ceilings/walls)',
      'Extension pole for the roller',
      'Bucket for paint, wet edge tray',
      'Step ladder'
    ],
    materials: [
      'Sugar soap or mild detergent',
      'Lightweight wall filler (e.g. Polyfilla)',
      'Sealer undercoat (water-based acrylic)',
      'Topcoat — low sheen or eggshell for walls, semi-gloss for trim, flat for ceilings',
      'Clean rags',
      'Brush comb (for cleaning brushes)'
    ],
    steps: [
      { title: 'Clear and protect the room', body: 'Move furniture out or to the centre and cover. Drop sheets on the floor. Tape edges (skirting, architraves, switch plates). Remove curtain rails and switch plates.' },
      { title: 'Wash the walls', body: 'Sugar soap in warm water, wash from bottom up (drips down clean walls leave streaks; up a dirty wall washes clean). Rinse with clean water. Let dry fully.' },
      { title: 'Fill, sand, prime', body: 'Fill any holes and dents. Sand flush when dry. Spot-prime any bare patches and all filled spots with sealer undercoat. Don’t skip this — paint absorbs differently into bare substrate and you’ll see ghosts of every patch.' },
      { title: 'Cut in', body: 'Start with the ceiling. With a loaded angle brush, paint a band 50–80 mm wide around the perimeter and into all corners. Work in sections of 1–2 m at a time so the edge stays wet.' },
      { title: 'Roll', body: 'While cut-in is still wet, roll the field. Load the roller properly (don’t dunk — roll out the excess on the tray ramp). Roll a W or N pattern then back-roll in long parallel strokes to even out. Always finish in the same direction.' },
      { title: 'Maintain a wet edge', body: 'Don’t stop in the middle of a wall — finish each wall section in one go, otherwise you’ll see lap marks. Cut-in and roll one wall at a time.' },
      { title: 'Wait for full dry', body: 'Recoat time is on the can — usually 2–4 hours touch-dry, but 24 hours is safer for the second coat. Topcoats over still-soft undercoats lift and bobble.' },
      { title: 'Second coat', body: 'Same process — cut in then roll. The second coat covers more easily; resist the urge to apply too thin and skip patches.' },
      { title: 'Remove tape carefully', body: 'Pull tape off at a 45° angle while the paint is still slightly tacky (within an hour or two of the final coat). If it’s fully dry, score along the tape edge with a sharp knife first.' },
      { title: 'Clean up', body: 'Brushes — comb out paint, wash in warm water (acrylic) until water runs clean. Rollers — same. Hang to dry, don’t leave on a flat surface.' }
    ],
    bestPractice: [
      'Buy quality brushes — a $40 Purdy will outpaint and outlast a $10 brush every time.',
      'Two thin coats are always better than one thick coat.',
      'Keep a wet edge — overlap into wet paint, never into half-dry paint.',
      'Roll towards the light source — finish strokes towards the window.',
      'Same batch number on big jobs — paint can vary slightly between batches.'
    ],
    commonMistakes: [
      'Painting over dust and cobwebs — they show through forever.',
      'Skipping the undercoat on patched areas — ghost patches in the finish.',
      'Leaving tape on too long — peels paint off when removed.',
      'Cheap roller sleeves — leave fluff in the finish.'
    ],
    safety: 'Ventilate well even with low-VOC paint. Don’t paint with a ladder spanning steps — get a proper platform.'
  },

  {
    id: 'tiling-splashback',
    category: 'Wet areas',
    title: 'Tile a kitchen splashback',
    summary: 'A straightforward small-area tile job — adhesive, spacers, grout, seal.',
    difficulty: 'Beginner',
    time: '1 weekend (with drying time)',
    overview:
      'A splashback is a great first tiling job — small area, vertical surface (no levelling worries), and forgiving with cuts hidden under benchtop. The fundamentals here apply to any tiling.',
    tools: [
      'Notched trowel (6 mm or 8 mm notch to suit tile size)',
      'Tile spacers (2 or 3 mm)',
      'Spirit level (long enough to span)',
      'Wet saw or tile cutter (manual snap cutter works for ceramic; wet saw for porcelain/stone)',
      'Tile nippers for awkward cuts',
      'Grout float (rubber)',
      'Bucket and sponges',
      'Silicone sealant gun',
      'Pencil, tape measure'
    ],
    materials: [
      'Tiles (count area + 10–15% wastage)',
      'Tile adhesive (flexible white for most splashbacks — Mapei, Davco, Ardex)',
      'Grout (sanded or unsanded based on joint width and tile type)',
      'Tile spacers (2 mm typical for kitchen splashback)',
      'Neutral cure silicone (where the splashback meets the bench, joinery, and at corners)',
      'Tile sealer (for natural stone or porous tiles)'
    ],
    steps: [
      { title: 'Prep the surface', body: 'Wall must be clean, dry, and sound. Sand off any peeling paint. Fill big holes. For new gib, seal with a coat of PVA-based sealer or a coat of waterproof primer if specified by the adhesive.' },
      { title: 'Mark the layout', body: 'Find the centre of the area and dry-lay tiles either side to plan. Aim for at least half a tile at each end — full tiles in the middle, balanced cuts at the corners. Mark a vertical centreline.' },
      { title: 'Mark a horizontal level line', body: 'The bench may not be level. Mark a level line up from the lowest point of the bench, one tile high. Tile up from that line — fill the gap to the bench with cut tiles at the end.' },
      { title: 'Mix the adhesive', body: 'Mix to a peanut-butter consistency that holds a peak. Let it slake (rest) for 5 minutes then re-mix. Only mix what you can use in 30 minutes.' },
      { title: 'Spread adhesive', body: 'Apply with the flat side of the trowel, then comb with the notched side — straight lines in one direction. Cover only 1 m² at a time so the adhesive doesn’t skin over.' },
      { title: 'Set the tiles', body: 'Press each tile firmly, with a slight twist to bed it into the adhesive. Use spacers at every corner. Check level and plumb every few tiles.' },
      { title: 'Cut to fit edges', body: 'Measure each gap individually — walls and benches aren’t straight. Mark the tile, cut, dry-fit, then butter the back with adhesive and place.' },
      { title: 'Let it set', body: 'Adhesive cure: 12–24 hours typically. Don’t grout before then — the tiles will move.' },
      { title: 'Grout the joints', body: 'Mix grout to a soft ice-cream consistency. Apply with a rubber float at 45° to the joints, pressing grout deep into every gap. Work in 1 m² sections.' },
      { title: 'Wipe off excess', body: 'After ~10 minutes (when grout is firm but not hard), wipe with a damp sponge in circles, then in straight strokes. Rinse the sponge often. A second wipe after 30 min cleans up haze.' },
      { title: 'Final clean and seal', body: 'After 24 hours, polish off the grout haze with a dry microfibre. Run a neat bead of neutral-cure silicone at the bench join, the corners, and any joinery edge (never grout these — they crack).' }
    ],
    bestPractice: [
      'Plan the layout for visible cuts — never put a sliver of tile in a visible spot.',
      'Level line, not the bench, controls the first row. Then cut down to the bench.',
      'Silicone at every change of plane (corners, bench, joinery) — grout will crack at these joints.',
      'Cover only what you can tile in 20–30 min — adhesive skins over and bond fails.',
      'Comb adhesive in one direction only — multidirectional combing traps air.'
    ],
    commonMistakes: [
      'Trying to grout too soon — tiles slip and joints crack.',
      'Wiping grout while still wet — pulls grout out of the joints.',
      'Grout in the bench joint — cracks within weeks. Always silicone.',
      'Not back-buttering large or porous tiles — voids behind the tile cause cracks.'
    ],
    safety: 'Wear glasses for cutting. Wet saws throw spray — keep electrics dry. Tile dust is silica — mask up when cutting porcelain.'
  },

  {
    id: 'shelves',
    category: 'Interior',
    title: 'Install a wall-mounted shelf',
    summary: 'Locate studs, fix securely, and keep it level.',
    difficulty: 'Beginner',
    time: '30–60 minutes',
    overview:
      'A shelf is simple but commonly done badly — wrong fixings for the wall type, no studs found, and not level. Done right, it’s a 30-minute job that won’t fail.',
    tools: [
      'Stud finder (or knock-test and a thin nail)',
      'Spirit level (or laser level)',
      'Cordless drill with masonry, wood and metal bits',
      'Tape measure and pencil',
      'Screwdriver bits'
    ],
    materials: [
      'The shelf and brackets',
      'For timber stud (most homes): 8 g x 50 mm wood screws',
      'For metal stud: self-tapping screws or toggle bolts',
      'For solid concrete/brick: masonry plugs + screws',
      'For plasterboard without studs: GIB® toggles or Snap-Toggles (NOT plastic plugs)'
    ],
    steps: [
      { title: 'Decide the position', body: 'Hold the shelf in place, mark the rough position. Standard eye-level on a wall is about 1500–1600 mm — but consider what is going on it and what is below.' },
      { title: 'Find the studs', body: 'Use a stud finder along the line where the shelf will sit. Studs in NZ are usually 400 or 600 mm centres. If you have nothing on a stud finder, knock — solid sound = stud, hollow = between.' },
      { title: 'Mark the bracket holes', body: 'Hold the first bracket against the wall over a stud. Level it. Mark all the screw holes with a sharp pencil. Repeat for any other brackets, levelling between them.' },
      { title: 'Pick the right drill bit', body: 'Timber stud: pilot hole 1 mm smaller than the screw shank. Concrete/brick: masonry bit one size matching the plug. Metal stud: smaller pilot, self-tapper does the rest.' },
      { title: 'Drill the pilot holes', body: 'Drill straight (not angled — sight from two sides). Don’t go deeper than needed — for hollow walls, you only need to clear the GIB.' },
      { title: 'Fix the brackets', body: 'Drive screws until snug. With timber, stop when the head pulls into the surface — overdriving strips the thread. With toggles in plasterboard, tighten until firm; toggles self-set.' },
      { title: 'Re-check level', body: 'Before placing the shelf, hold the level across the brackets again. Adjust if needed (most brackets have slotted holes).' },
      { title: 'Mount the shelf', body: 'Place the shelf on the brackets and fix from underneath into the shelf body. Test the load gently before piling stuff on.' }
    ],
    bestPractice: [
      'Always fix into a stud where possible — a single screw into a stud holds more than four into plasterboard.',
      'No plastic plugs in plasterboard. They look fine, fail under load. Use spring toggles, GIB anchors or self-drilling metal anchors rated for the weight.',
      'Heavier loads (books, TVs) — use two-stud brackets, never one stud with anchors as backup.',
      'For floating shelves, the bracket hardware is what holds the load — buy a quality kit rated for your shelf weight.'
    ],
    commonMistakes: [
      'Plastic wall plugs in plasterboard — they pull out under load.',
      'Drilling pilot holes too big in timber — no grip.',
      'Not checking what is in the wall — drilling into a pipe or cable is a very bad day.',
      'Eyeballing level — every shelf needs the bubble.'
    ],
    safety: 'Avoid drilling above or below power points (cables run vertically from them) and either side of switches. A cable detector is cheap insurance.'
  },

  {
    id: 'flat-pack',
    category: 'Interior',
    title: 'Assemble flat-pack furniture (the right way)',
    summary: 'Skip the broken pieces and wobbly drawers with these steps.',
    difficulty: 'Beginner',
    time: '1–2 hours per unit',
    overview:
      'Flat-pack is mostly about reading the instructions properly and not over-tightening. The cam-and-dowel system is forgiving if assembled in the right order, but unforgiving if not.',
    tools: [
      'Cordless drill/driver (clutch set low!)',
      'Phillips and Pozidriv bits (most flat-pack uses Pozidriv #2)',
      'A short stubby screwdriver for tight spots',
      'Mallet (rubber)',
      'Tape measure and square',
      'Cloth or felt pads to protect finished surfaces during assembly'
    ],
    materials: [
      'All the bits from the box (count first!)',
      'Wood glue (optional — boosts strength on dowel joints)'
    ],
    steps: [
      { title: 'Lay out and count', body: 'Lay every panel flat, sorted. Open the hardware bag and count every bolt, dowel, cam, screw against the parts list. Easier to discover a missing part now than mid-build.' },
      { title: 'Identify left/right and inside/outside', body: 'Most panels have pre-drilled holes only on the correct face. Once you orient them, mark with sticky notes — top, bottom, left, right.' },
      { title: 'Insert dowels first', body: 'Tap wooden dowels into their holes with a rubber mallet. A drop of wood glue here triples joint strength but is optional for low-stress pieces.' },
      { title: 'Set cam barrels correctly', body: 'Cam barrels (the round disc) have an arrow. The arrow points toward the hole the cam screw enters. Fit them now, all of them, before assembling.' },
      { title: 'Assemble box upside-down', body: 'Most carcasses go together easier upside-down on a soft surface. Carpet, towels or the cardboard from the box.' },
      { title: 'Lock the cams', body: 'Half-turn locks the cam onto the cam screw. Don’t force past half a turn — you’ll snap the cam barrel. Half a turn is enough.' },
      { title: 'Fit the back panel', body: 'The thin masonite back panel is what stops the cabinet from racking. Don’t skip it. Tap it in evenly with the mallet, then small panel pins or supplied nails around the edge.' },
      { title: 'Fit doors and drawer fronts last', body: 'Hinges and drawer fronts have adjustment screws (top/bottom, left/right, depth). Get the carcass square and stable first; adjust doors and drawers afterward for even gaps.' },
      { title: 'Test in place before fully tightening', body: 'Stand the unit up. Push and wiggle. If it racks, the back isn’t fully home or you missed a cam. Fix before loading drawers.' }
    ],
    bestPractice: [
      'Power drill on its lowest clutch setting. Finish by hand. Stripped chipboard holes are unrepairable.',
      'A drop of glue on every dowel transforms a wobble-prone unit into a solid one.',
      'Soft surface to work on — protects finished surfaces.',
      'Use the Allen key by hand for the final quarter-turn. You can feel when it’s right.',
      'Photograph each step if disassembling something to move it — no instructions, no guesswork.'
    ],
    commonMistakes: [
      'Driving cam screws too far in — cam can’t grip.',
      'Skipping the back panel "to do later" — the carcass twists and joints fail.',
      'Power-driving cam locks — snaps them.',
      'Over-tightening adjustable feet — strips threads in particle board.'
    ],
    safety: 'No safety drama — but watch your back lifting big panels. Get help with anything wardrobe-sized.'
  },

  // ===== MORE WALLS & CEILINGS =====
  {
    id: 'plasterboard-patch',
    category: 'Walls & ceilings',
    title: 'Patch a hole in plasterboard',
    summary: 'Fix doorknob dings, small cracks and bigger holes up to about 200 mm.',
    difficulty: 'Beginner',
    time: '1–2 hours plus drying time',
    overview:
      'There are two patches: small (< 50 mm — mesh patch + two coats) and large (anything bigger — cut out a square, fit a timber backer, screw in an off-cut, stop in three coats). Both use the same compounds and finish you already use for stopping joints.',
    tools: [
      'Stanley knife and a jab saw',
      'Straight edge / square',
      'Stopping knives (100 mm and 200 mm)',
      'Sanding block (180 grit) or sanding pole',
      'Pencil and tape measure',
      'Cordless drill/driver'
    ],
    materials: [
      'GIB off-cut a bit larger than the hole',
      'Aluminium mesh patch (for small holes)',
      'Length of 50×25 timber for backers (for large holes)',
      '32 mm GIB screws',
      'Base coat and lite-weight top coat stopping compound',
      'Sealer / undercoat'
    ],
    steps: [
      { title: 'Assess the hole', body: 'Under 50 mm and a clean shape — mesh patch. Larger, irregular or near a corner — cut it out square and use a proper backer-and-patch.' },
      { title: 'Small hole: mesh patch', body: 'Stick the aluminium mesh patch over the hole. Apply a thin coat of base compound over the mesh, wider than the patch, feathered. Dry. Apply a wider top coat. Dry. Sand flush. Done.' },
      { title: 'Large hole: cut a square', body: 'Mark a square around the damage. Use a jab saw to cut along the lines — feel for cables and pipes first. Remove the damaged piece.' },
      { title: 'Fit the backer', body: 'Cut a length of 50×25 timber a bit longer than the hole is wide. Slide it into the cavity behind the gib, hold tight, and screw through the gib into the backer top and bottom. Now you have something to screw the patch to.' },
      { title: 'Cut and fix the patch', body: 'Cut a GIB off-cut to exactly fit the square hole (snug, not forced). Screw it to the backer with 32 mm gib screws, heads dimpled below the surface.' },
      { title: 'Tape the joint', body: 'Run a thin layer of base compound around the patch perimeter and embed paper tape into it, squeezing out excess.' },
      { title: 'Three coats', body: 'Cover the tape with base coat, feathered out 100 mm beyond the tape. Dry. Wider second coat (200 mm beyond). Dry. Thin third coat with lite-weight top coat, feathered to nothing.' },
      { title: 'Sand and seal', body: 'Sand smooth. Use a raking light to spot ridges. Seal with PVA sealer or undercoat before topcoat — patches always flash through paint without sealer.' }
    ],
    bestPractice: [
      'Cut the hole square — round holes are 5× harder to patch invisibly.',
      'Backer behind the patch is what stops the patch sinking under pressure.',
      'Three coats over a patch — same as a new joint. Two coats will always show.',
      'Always sealer before topcoat — patches absorb paint differently.'
    ],
    commonMistakes: [
      'Mesh patch alone on holes over 50 mm — flexes and the join cracks.',
      'Forgetting the backer — the patch flexes and pops.',
      'One thick coat instead of three thin ones — visible bump in the finish.'
    ],
    safety: 'Before cutting into a wall, locate cables and pipes. They typically run vertically from power points and switches. A cable detector is cheap insurance.'
  },

  // ===== MORE INTERIOR =====
  {
    id: 'caulking',
    category: 'Interior',
    title: 'Caulking and sealing',
    summary: 'Silicone for wet areas, painter\'s caulk for paintable gaps.',
    difficulty: 'Beginner',
    time: '30–60 minutes per area',
    overview:
      'Two completely different products: silicone (flexible, waterproof, NOT paintable — bathrooms, kitchens, expansion joints) and acrylic painter\'s caulk (paintable, less flexible — gaps between trims and walls, internal corners). Using the wrong one is the #1 caulking mistake.',
    tools: [
      'Caulking gun (good quality — cheap ones drip)',
      'Stanley knife and a nozzle cutter',
      'Masking tape (low tack)',
      'Caulking smoothing tool (or a wet finger)',
      'Damp cloth and methylated spirits',
      'Old screwdriver or silicone scraper for removing old caulk'
    ],
    materials: [
      'Neutral-cure silicone (e.g. Selleys Roof & Gutter, Holdfast Wet Area) for wet zones and metals',
      'Acrylic painter\'s caulk (e.g. No More Gaps) for painted gaps',
      'Caulking remover or methylated spirits',
      'Backer rod (foam strip) for deep gaps'
    ],
    steps: [
      { title: 'Remove old caulk', body: 'For replacement jobs: cut the old bead with a sharp knife along both edges and pull it out. Wipe the surfaces with methylated spirits to remove residue — new silicone won\'t bond to old.' },
      { title: 'Dry and clean', body: 'Both surfaces must be dry and dust-free. For wet areas, run a hairdryer over the joint before applying.' },
      { title: 'Tape the edges', body: 'Run masking tape either side of the joint, 4–6 mm from the gap. This gives a perfectly straight line and saves cleanup.' },
      { title: 'Cut the nozzle to size', body: 'Cut the tip at a 45° angle, hole roughly the same width as the gap. Pierce the seal inside the cartridge with a long nail or the gun\'s built-in pricker.' },
      { title: 'For deep gaps, fit backer rod', body: 'Push foam backer rod into gaps over 6 mm deep. Caulk bonds to two edges, not three — a backer rod gives the bead the right depth-to-width ratio.' },
      { title: 'Apply a steady bead', body: 'Hold the gun at 45° and pull (don\'t push) along the joint at a steady pace. Continuous pressure on the trigger. Stop a few mm before the end of the joint.' },
      { title: 'Tool the bead', body: 'Run a smoothing tool (or wet fingertip dipped in soapy water for silicone, plain water for acrylic) along the bead in one continuous stroke. This pushes the caulk into the joint and forms a smooth concave surface.' },
      { title: 'Remove tape immediately', body: 'Pull the tape off at a 45° angle before the caulk skins over (within 5 minutes). Wait too long and the tape pulls the caulk with it.' },
      { title: 'Cure', body: 'Silicone: 24 hours minimum before water exposure. Acrylic: 1–2 hours before painting (check the tube). Don\'t shower for at least 24 hours after re-siliconing a bathroom.' }
    ],
    bestPractice: [
      'Silicone in wet areas, acrylic where you need to paint — never the other way around.',
      'Acetic-cure silicone (vinegar smell) is fine on glass, NOT on metal — use neutral-cure for tapware and stainless.',
      'Backer rod first on any gap deeper than 6 mm — gives the caulk the right shape.',
      'Tape, bead, tool, untape — in that order, all within 5 minutes.',
      'Replace bathroom silicone every 3–5 years before mould gets behind it.'
    ],
    commonMistakes: [
      'Painting over silicone — it won\'t take paint, ever. Use acrylic if it needs to be painted.',
      'Caulking onto a wet or dirty surface — peels off in a week.',
      'Leaving the tape on until the bead is dry — it pulls the bead out.',
      'Cutting the nozzle too big — uncontrollable ugly bead.'
    ],
    safety: 'Silicone fumes (acetic-cure) sting eyes — ventilate. Wash hands before touching face. Methylated spirits is flammable — no naked flames.'
  },

  {
    id: 'hanging-pictures',
    category: 'Interior',
    title: 'Hang pictures and mirrors',
    summary: 'The right fixing for the weight, the wall, and how it sits flat.',
    difficulty: 'Beginner',
    time: '15–30 minutes per piece',
    overview:
      'A picture falls off the wall for one of three reasons: wrong fixing for the weight, wrong fixing for the wall type, or only one fixing for a wide piece. Pick the right fixing first, then the level.',
    tools: [
      'Stud finder (or a thin nail to probe)',
      'Spirit level (or laser level)',
      'Tape measure and pencil',
      'Cordless drill with masonry and wood bits',
      'Hammer'
    ],
    materials: [
      'Up to 5 kg: picture hook with a thin nail at 30°',
      '5–15 kg: screw into a stud, or a metal toggle/anchor rated for the weight',
      '15 kg+ (large mirrors, framed art): two fixings minimum, into studs, or a French cleat',
      'D-rings or sawtooth hangers (already on most frames)',
      'Picture wire (multi-strand, twisted)'
    ],
    steps: [
      { title: 'Pick the spot and the height', body: 'Standard gallery hanging is centre of the picture 1500 mm from the floor. Above a sofa: leave 200 mm above the back of the sofa. Above a console: 150–250 mm above the top.' },
      { title: 'Check the hanging hardware', body: 'Flip the picture over. D-rings either side need wire (or two fixings on the wall). A single sawtooth on the back hangs from a single hook. A French cleat means you fix the matching cleat on the wall.' },
      { title: 'Measure the drop', body: 'Lift the wire (or hanger) with one finger from the centre, as it will hang. Measure from the top of the wire down to the top of the frame. That number is the offset — the wall hook needs to be that much higher than where you want the top of the picture.' },
      { title: 'Mark the wall', body: 'Hold the picture up. Mark the top centre with light pencil. Measure your offset downward — that\'s where the hook goes.' },
      { title: 'Pick the fixing', body: 'For pictures with two D-rings (no wire), drop a perpendicular from each D-ring position and mark — you\'ll fix two hooks at the same height.' },
      { title: 'Drive the fixing', body: 'Picture hook with thin nail: drive at 30° downward into the wall. Screw into stud: 32 mm wood screw. Toggle anchor: drill the size in the toggle\'s instructions, insert and tighten until firm.' },
      { title: 'Hang and level', body: 'Hang the picture. Step back. Put a spirit level on the top edge and nudge until level. A small piece of museum putty or felt pad on the bottom corner stops it sliding off level.' }
    ],
    bestPractice: [
      'Two fixings beat one — even a small picture hangs more reliably with two hooks spaced 100 mm apart.',
      'For mirrors over 5 kg, two fixings into studs. Mirrors are unforgiving when they fall.',
      'Use a French cleat for anything you might want to lift down later (TVs, large mirrors).',
      'Measure the wire-drop offset — eyeballing is why pictures hang lower than expected.'
    ],
    commonMistakes: [
      'Plastic plugs in plasterboard for heavy pieces — they pull straight out.',
      'One sawtooth hook for a wide picture — tips off level constantly.',
      'Hanging from picture wire stretched tight to the frame — pulls D-rings out under load.'
    ],
    safety: 'Avoid drilling above and below power points and either side of switches — cables run vertically from them. Use a cable detector for big pieces or in older homes.'
  },

  {
    id: 'curtain-rails',
    category: 'Interior',
    title: 'Install curtain rails and blinds',
    summary: 'Brackets at the right height, fixed into something solid.',
    difficulty: 'Beginner',
    time: '30–60 minutes per window',
    overview:
      'Curtains and blinds either sit inside the window reveal (recess fit) or outside it (face fit). Face-fit looks bigger, hides smaller windows better, and gives more light control. Recess-fit looks tidier on bay/picture windows.',
    tools: [
      'Stud finder',
      'Spirit level (long enough to span brackets)',
      'Tape measure and pencil',
      'Cordless drill with the right bits',
      'Screwdriver bits'
    ],
    materials: [
      'Curtain rail or blind kit (with brackets, screws, end caps)',
      'For timber stud: 30–40 mm wood screws',
      'For brick/concrete lintel: masonry plugs + screws',
      'For plasterboard only: spring toggles or self-drilling metal anchors (no plastic plugs)'
    ],
    steps: [
      { title: 'Decide face vs recess fit', body: 'Recess fit: brackets fix to the top of the window reveal. Measure the reveal width and order a blind 10 mm narrower so it can move freely. Face fit: brackets above the window, overlapping the trim. Add 100 mm either side and lift the rail 100 mm above the top of the architrave.' },
      { title: 'Mark the bracket positions', body: 'For curtains: 100 mm above the window architrave, extending 100–150 mm beyond on each side so curtains pull back fully off the glass. For blinds: edges of the brackets just inside the reveal or 50 mm wider than the window for face-fit.' },
      { title: 'Find what\'s behind the gib', body: 'Above most windows is a lintel (solid timber on standard timber framing, or steel/concrete in masonry). The lintel is the strongest place to fix into. Use the stud finder to confirm.' },
      { title: 'Level the brackets', body: 'Hold one bracket, mark hole positions. Measure across to the other end and mark the matching bracket at the same height. Check with a long level before drilling.' },
      { title: 'Drill pilot holes', body: 'Timber: 3 mm pilot for 6 g screws. Concrete/brick: matched masonry bit for the plug. Plasterboard alone (no lintel): drill the size specified by the toggle.' },
      { title: 'Fix brackets', body: 'Drive screws snug, not over-tightened (especially into MDF or particleboard architraves).' },
      { title: 'Hang the rail or blind', body: 'Most rails clip into brackets. Test the curtain glide. For blinds, snap the headrail into the brackets and check that the chain side is correct.' },
      { title: 'Add a centre bracket on long rails', body: 'For rails over 1.5 m, fit a centre support bracket. Without one, the rail sags under heavy curtains and curtains stop gliding smoothly.' }
    ],
    bestPractice: [
      'Curtains "above and beyond" — 100 mm higher, 100 mm wider than the window — make rooms look taller and let the window fully open.',
      'Two-piece curtain track for big sliders allows them to overlap so cold air doesn\'t leak between panels.',
      'Centre bracket for any rail over 1.5 m or with heavy curtains.',
      'Heavy roman blinds need fixings into the lintel, not just architrave.'
    ],
    commonMistakes: [
      'Fixing only into the architrave (MDF) — strips out under curtain weight.',
      'No centre bracket — rail sags, glide jams.',
      'Recess-fit blind cut the exact width — it scrapes the reveal as it moves.'
    ],
    safety: 'Same warning — avoid drilling near power points. Test the wall with a cable detector if you\'re unsure.'
  },

  {
    id: 'sand-finish',
    category: 'Interior',
    title: 'Sand and finish a timber surface',
    summary: 'Refresh a table, bench, deck or floor — coarse to fine, then oil or poly.',
    difficulty: 'Beginner',
    time: 'Half a day for a table, longer for floors',
    overview:
      'The two rules: progress through grits without skipping, and choose a finish that matches the use. Oil penetrates and is easy to re-apply but doesn\'t protect against water. Polyurethane builds a hard film and is waterproof but harder to repair locally.',
    tools: [
      'Random orbit sander (150 mm) and sanding discs',
      'Dust mask (P2) and safety glasses',
      'Tack cloth or vacuum',
      'Brush or applicator pad',
      'Lint-free rags',
      'Hand sanding block for edges'
    ],
    materials: [
      'Sanding discs: 60 (coarse, only if removing finish), 80, 120, 180 (and 240 for furniture)',
      'Mineral turps or methylated spirits (clean-up)',
      'Finish: penetrating oil (Danish, tung, decking oil), polyurethane (water-based or solvent-based), wax, or stain + finish',
      'Foam brush or natural-bristle brush (oil/solvent) or synthetic (water-based)'
    ],
    steps: [
      { title: 'Strip or sand off old finish', body: 'Old polyurethane: 60 or 80 grit until you\'re into bare timber. Old oil: 120 grit is usually enough. Take it slowly — the sander pulls, don\'t fight it.' },
      { title: 'Sand through the grits', body: 'Each grit removes the scratches left by the previous grit. Don\'t skip more than one grit (80 → 120 → 180 is fine; 80 → 240 is not).' },
      { title: 'Sand WITH the grain', body: 'On hand sanding and the final passes, sand with the grain. Cross-grain scratches are obvious under finish, especially with stain.' },
      { title: 'Vacuum and tack', body: 'Vacuum the surface and the room. Wipe with a tack cloth or a damp lint-free rag. Any dust left under the finish stays there forever.' },
      { title: 'Raise the grain (water-based finishes)', body: 'Wipe over with a damp cloth, let dry, then lightly sand at 240 grit. Otherwise the first coat raises the grain and the surface feels rough.' },
      { title: 'Apply the first coat', body: 'Oil: flood the surface, let soak 10 minutes, wipe off ALL excess with a rag (or you get a sticky finish). Poly: thin first coat — use a brush or foam pad with the grain.' },
      { title: 'Sand between coats', body: 'Light sand at 240 grit between coats. Don\'t skip this — it\'s what gives the finish that smooth feel.' },
      { title: 'Second and third coats', body: 'Oil: usually 2–3 coats. Poly: 3 coats minimum for high-wear surfaces (table tops, floors).' },
      { title: 'Cure time', body: 'Finish is touch-dry in hours but takes 7–30 days to fully cure. Use the surface gently for the first week.' }
    ],
    bestPractice: [
      'Sand WITH the grain on the final pass, always.',
      'A clean surface matters more than a perfect surface — vacuum twice.',
      'Oil-soaked rags spontaneously combust. Lay them flat outside until fully dry, then dispose.',
      'Water-based poly is much faster to recoat (2 hours vs 12) and dries crystal clear. Solvent-based ambers slightly — sometimes desirable on darker timbers.',
      'For decks, use a decking-specific oil — UV inhibitors and mildew resistance matter.'
    ],
    commonMistakes: [
      'Skipping grits — visible swirl marks under the finish.',
      'Not wiping off excess oil — sticky surface that never cures.',
      'Painting over dust — fibres trapped in the finish forever.',
      'Recoating before the previous coat is dry — bubbles and crawling.'
    ],
    safety: 'Wear a P2 dust mask while sanding — fine wood dust is a respiratory hazard. Oily rags can self-combust — never bunch them up wet. Ventilate when using solvent-based finishes.'
  },

  // ===== MORE EXTERIOR =====
  {
    id: 'fence-gate',
    category: 'Exterior',
    title: 'Build a basic timber gate',
    summary: 'A matched gate for a paling fence — frame, brace, hinges, latch.',
    difficulty: 'Intermediate',
    time: 'Half a day',
    overview:
      'A gate is a small fence panel that swings. The key detail is the diagonal brace — it must run from the bottom of the hinge side UP to the top of the latch side. Get it the wrong way and the gate sags within months.',
    tools: [
      'Mitre or skill saw',
      'Cordless drill/driver',
      'Combination square and tape',
      'Spirit level',
      'Clamps (G-clamps)',
      'Chisel (for hinge mortises)'
    ],
    materials: [
      'H3.2 framing timber (100×50) for the frame',
      'Diagonal brace timber (offcut of the frame stock)',
      'Palings to match the fence (H3.2, 100×19)',
      'Two heavy T-hinges or strap hinges (galvanised or stainless)',
      'Gate latch (drop latch, ring latch, or thumb latch)',
      'Stainless or hot-dip galvanised screws/nails',
      'Construction adhesive (exterior grade)'
    ],
    steps: [
      { title: 'Measure the opening', body: 'Measure between the gate posts. Subtract 25 mm — gate timber moves and you need swing clearance. For a 900 mm opening, build an 875 mm gate.' },
      { title: 'Cut the frame parts', body: 'Cut two long verticals (the full height of the gate) and two horizontals (the gate width minus the thickness of two verticals). Frame is built like a picture frame.' },
      { title: 'Assemble the frame square', body: 'Lay the parts flat on a level surface. Pre-drill and screw through the long verticals into the ends of the horizontals (two screws per joint). Check the diagonals are equal (= square) before fully tightening.' },
      { title: 'Add the diagonal brace', body: 'Mark a line corner-to-corner — bottom hinge corner to top latch corner. Lay a brace piece across, mark the angle cuts, and cut. Screw into both rails. THIS IS WHAT STOPS THE GATE SAGGING — direction matters.' },
      { title: 'Fix the palings', body: 'Lay the frame face down. Lay palings on top, palings facing down. Adjust to match the fence pattern. Run a chalk line for the top edge, then nail or screw each paling to both horizontals and any palings hitting the brace.' },
      { title: 'Trim the top and bottom', body: 'Once palings are on, run a chalk line to mark the finished top and bottom heights. Cut with a skill saw set to depth.' },
      { title: 'Fit the hinges to the gate', body: 'T-hinges: position the long leaf horizontally on the gate face, screwed into the frame rails (not just the paling). The pivot end sits flush with the hinge edge of the gate.' },
      { title: 'Hang the gate', body: 'Stand the gate in the opening with a 12 mm gap at the bottom (sweeping clearance), and wedge it level with timber off-cuts. Mark the post hinge positions. Pre-drill and screw the hinges to the post.' },
      { title: 'Fit the latch', body: 'Hold the latch on the gate at a comfortable height (~1000 mm). Mark and fit the catch on the post matching the latch tongue.' }
    ],
    bestPractice: [
      'Diagonal brace from bottom of hinge side UP to top of latch side — the brace works in compression. Wrong way: works in tension and the gate sags.',
      'Hinges screwed into the frame, not just into palings. Palings split out.',
      'Gate clearance 10–15 mm at bottom for grass and gravel movement.',
      'Stainless or hot-dip galvanised fixings — gates see weather worse than fences.',
      'A small chain or wind clip stops the gate slamming itself off the hinges in a southerly.'
    ],
    commonMistakes: [
      'Brace going the wrong way (top hinge to bottom latch) — gate droops in weeks.',
      'No brace at all — gate racks into a parallelogram by month two.',
      'Hinges only into palings — palings split, gate drops.',
      'No clearance from the post — sticks every time it rains.'
    ],
    safety: 'Same as the fence guide — wear safety glasses and ear protection when cutting. Two people make hanging the finished gate much easier.'
  },

  {
    id: 'raised-garden-bed',
    category: 'Exterior',
    title: 'Build a raised garden bed',
    summary: 'A simple timber bed for vegetables, herbs or flowers.',
    difficulty: 'Beginner',
    time: 'A few hours',
    overview:
      'Raised beds make gardening easier on the back, drain better than ground beds, and you control the soil. Critical detail: the timber. Old tanalised CCA timber leaches into soil and is not recommended for edibles. Use H4 LOSP or H4 ACQ if treated, or untreated macrocarpa, cedar, or hardwood for vegies.',
    tools: [
      'Mitre saw or skill saw',
      'Cordless drill/driver',
      'Spade and rake',
      'Spirit level',
      'Square and tape measure'
    ],
    materials: [
      'Boards: H4 ACQ/LOSP treated, OR macrocarpa, cedar, or recycled hardwood (NOT CCA-treated for edibles)',
      'For a 1.2 × 2.4 × 0.3 m bed: 4 lengths of 200×50 (or two of 200×50 stacked) plus four 50×50 corner posts',
      'Stainless or hot-dip galvanised screws (100 mm)',
      'Weed mat or cardboard for the base',
      'Mix of garden soil, compost, and sheep pellets',
      'Optional: gravel for drainage at the base'
    ],
    steps: [
      { title: 'Pick the spot', body: 'Most vegies want 6+ hours of sun. Flat ground or as flat as you can manage. Allow access on at least 3 sides for weeding and harvesting.' },
      { title: 'Set out the size', body: '1.2 m wide is the maximum for reaching across from one side. Length is up to you. 300 mm high is plenty for shallow rooted crops; 450–600 mm for carrots, parsnips and on poor ground.' },
      { title: 'Cut the boards', body: 'Two long boards full length, two short boards (long length minus twice the board thickness). For taller beds, double up boards stacked.' },
      { title: 'Cut corner posts', body: 'Length = the bed height + 100 mm if you want them buried, or just bed height for flush corners. 50×50 is plenty.' },
      { title: 'Assemble corners', body: 'Stand a corner post and a short board against each other on a flat surface. Pre-drill and screw through the board into the post (two screws). Repeat on the other end of the short board with another post.' },
      { title: 'Add the long sides', body: 'Stand the assembled short ends up. Lay each long board against the two corner posts. Screw through the long board into the corner posts.' },
      { title: 'Place and level', body: 'Drop the assembled bed into position. Level by digging out the high side, not packing up the low side. Posts can sit into shallow holes for stability.' },
      { title: 'Line the base (optional)', body: 'Weed mat or thick cardboard over the ground inside — suppresses weeds coming up. Don\'t use plastic — it stops drainage and the bed becomes a bog.' },
      { title: 'Fill', body: 'Bottom third: cheap garden mix or topsoil + grass clippings + leaves. Top two-thirds: a quality vegie mix or 60% garden mix + 30% compost + 10% sheep pellets/blood and bone.' },
      { title: 'Plant and mulch', body: 'Water well before planting to settle the soil. Plant out. Top with mulch (pea straw, lucerne, bark) to retain moisture and suppress weeds.' }
    ],
    bestPractice: [
      'For edibles, avoid old CCA-treated timber (the green tinted stuff). H4 ACQ/LOSP is current-spec and considered safe. Untreated macrocarpa or cedar is the cleanest option but more expensive.',
      'Don\'t line with plastic — strangles drainage. Cardboard or weed mat is enough.',
      'Bed soil compacts in the first year — top up with compost each spring.',
      'A 1.2 m width is the limit for reaching across from one side without standing in the bed.'
    ],
    commonMistakes: [
      'Using old CCA-treated timber for vegie beds.',
      'Boards screwed directly to each other at the corners (no corner post) — racks over time.',
      'Plastic lining — soil stays wet and roots rot.',
      'Single line of cheap fence palings — they twist out of shape and rot in a year.'
    ],
    safety: 'Wear gloves with treated timber. Lift heavy bags of soil safely — bend at the knees. Sun protection on long planting days.'
  },

  // ===== TOOLS & TECHNIQUE =====
  {
    id: 'sharpen-tools',
    category: 'Tools & technique',
    title: 'Sharpen chisels and plane irons',
    summary: 'Flatten the back, set the bevel, work the grits, strop and test.',
    difficulty: 'Intermediate',
    time: '15–30 minutes per tool (first time slower)',
    overview:
      'A sharp chisel cuts where you point it and stays out of trouble. A blunt one slips. Sharpening is a learned skill — your first chisel takes 30 minutes; your tenth takes 5. The system: flatten the back once, then maintain the bevel.',
    tools: [
      'Sharpening stones — a combination 1000/6000 grit Japanese waterstone is a great starter, or 800/2000 diamond plates',
      'Honing guide (eclipse-style is cheap and works)',
      'Leather strop with honing compound',
      'Steel rule (for testing flatness)',
      'Clean rag',
      'Container of clean water (for waterstones)'
    ],
    materials: [
      'Honing compound (white or green chromium oxide stick)',
      'Camellia oil or 3-in-1 to wipe blades after use (rust prevention)'
    ],
    steps: [
      { title: 'Flatten the back (one-time job)', body: 'On a NEW chisel, lay the back flat on the coarse stone and rub flat. The back must be polished mirror-flat for at least the first 25 mm. Work through grits to the finest stone. This is the most important step. Done once, never again on that chisel.' },
      { title: 'Set the bevel angle', body: 'Most chisels come at 25°. Many people grind a primary bevel at 25° and put a tiny secondary (micro-bevel) at 30° — easier to maintain and cuts well. Set the chisel in the honing guide to the right angle (the guide instructions show the projection).' },
      { title: 'Work the coarse stone', body: 'Soak waterstone for 5–10 minutes first (skip if oil stone or diamond). Push the blade across the stone in figure-8 or straight strokes, applying even pressure. Keep going until you can feel a tiny burr on the back of the edge — run your finger gently from back toward edge.' },
      { title: 'Progress through grits', body: 'Move to the next finer stone. Each grit removes the scratches of the previous one and refines the burr. Keep the same angle (that\'s what the honing guide is for).' },
      { title: 'Polish on the finest stone', body: 'A few light strokes on the finest grit (6000 or 8000). The edge should be a polished line under good light. Flip the chisel flat-back-down for two light strokes to remove the burr.' },
      { title: 'Strop to finish', body: 'Charge a leather strop with honing compound. Drag the edge bevel-down (NEVER push — you\'ll cut the leather, and dull the edge). 10 strokes per side. The strop polishes the edge to a mirror.' },
      { title: 'Test the edge', body: 'It should cleanly slice end-grain of pine without crushing. Or shave the hair off your forearm (carefully). If it scrapes rather than slices, back to the finer stone.' },
      { title: 'Maintain', body: 'Touch up on the finest stone + strop every 30 minutes of use. Once the micro-bevel gets too wide (5+ minutes on the fine stone doesn\'t restore the edge), regrind the primary 25° bevel.' }
    ],
    bestPractice: [
      'Flatten the back ONCE properly — saves you time forever after.',
      'Honing guide eliminates the most common mistake (changing the angle every stroke).',
      'Touch up before it goes blunt — much faster than rescuing a dead edge.',
      'Strop after every sharpening session — it\'s what gives the edge that "scary sharp" feel.',
      'Keep stones flat — sharpening dishes them out. Re-flatten with a diamond plate or coarse grit on glass.'
    ],
    commonMistakes: [
      'Sharpening without a honing guide and rocking the angle — never gets sharp.',
      'Pushing the strop — cuts the leather and rounds the edge.',
      'Skipping the back-flattening on a new chisel — never gets properly sharp.',
      'Using a bench grinder without a coolant cup — bluing the steel ruins the temper.'
    ],
    safety: 'Sharp chisels cut better but are more dangerous if they slip. Always chisel away from your body. Never put a sharp tool in a drawer loose — sheath it or use a tool roll.'
  }
];

const CATEGORIES = [
  { name: 'Exterior', desc: 'Outside the home — fences, decks, cladding.' },
  { name: 'Walls & ceilings', desc: 'Plasterboard, stopping and finishing.' },
  { name: 'Interior trim', desc: 'Skirtings, architraves and trim work.' },
  { name: 'Interior', desc: 'Doors, painting and fit-out.' },
  { name: 'Wet areas', desc: 'Tiling, splashbacks and bathrooms.' },
  { name: 'Tools & technique', desc: 'Sharpening, hand-tool skills.' }
];

// ---------- STORAGE ----------
const STORE = {
  users() { return JSON.parse(localStorage.getItem('bh_users') || '{}'); },
  saveUsers(u) { localStorage.setItem('bh_users', JSON.stringify(u)); },
  session() { return JSON.parse(localStorage.getItem('bh_session') || 'null'); },
  saveSession(s) { s ? localStorage.setItem('bh_session', JSON.stringify(s)) : localStorage.removeItem('bh_session'); },
  progress() { return JSON.parse(localStorage.getItem('bh_progress') || '{}'); },
  saveProgress(p) { localStorage.setItem('bh_progress', JSON.stringify(p)); }
};

// ---------- AUTH HELPERS ----------
async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const data = enc.encode(password + '::' + salt);
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function validEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function switchAuthTab(which) {
  document.getElementById('tab-login').classList.toggle('active', which === 'login');
  document.getElementById('tab-signup').classList.toggle('active', which === 'signup');
  document.getElementById('login-form').style.display = which === 'login' ? '' : 'none';
  document.getElementById('signup-form').style.display = which === 'signup' ? '' : 'none';
  document.getElementById('login-error').textContent = '';
  document.getElementById('signup-error').textContent = '';
}

// ---------- BACKEND ABSTRACTION ----------
// Two modes:
//   "local"    — accounts stored in localStorage (good for trying it out)
//   "supabase" — accounts and progress in Supabase (required for real apps)
// Selected by whether window.BH_CONFIG has real (non-placeholder) values.
const BACKEND = {
  mode: 'local',
  client: null,
  cachedUser: null,         // { id, name, email } when in supabase mode
  cachedProgress: {},       // { [taskId]: { done, viewedAt } }

  init() {
    const cfg = window.BH_CONFIG;
    const usable =
      cfg && cfg.supabaseUrl && cfg.supabaseAnonKey &&
      !cfg.supabaseUrl.includes('YOUR_') &&
      !cfg.supabaseAnonKey.includes('YOUR_') &&
      typeof window.supabase !== 'undefined';
    if (usable) {
      try {
        this.client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
        this.mode = 'supabase';
      } catch (e) {
        console.warn('Supabase init failed, falling back to local mode', e);
      }
    }
  },

  async loadProfileAndProgress(authUser) {
    let profile;
    const { data: p } = await this.client.from('profiles').select('*').eq('id', authUser.id).maybeSingle();
    if (p) {
      profile = { id: authUser.id, name: p.name, email: p.email || authUser.email };
    } else {
      const fallbackName = (authUser.user_metadata && authUser.user_metadata.name) || authUser.email.split('@')[0];
      profile = { id: authUser.id, name: fallbackName, email: authUser.email };
      await this.client.from('profiles').insert({ id: authUser.id, name: fallbackName, email: authUser.email });
    }
    this.cachedUser = profile;
    this.cachedProgress = {};
    const { data: rows } = await this.client.from('progress').select('*').eq('user_id', authUser.id);
    if (rows) {
      rows.forEach(r => {
        this.cachedProgress[r.task_id] = {
          done: r.done,
          viewedAt: r.viewed_at ? new Date(r.viewed_at).getTime() : Date.now()
        };
      });
    }
  },

  async restoreSession() {
    if (this.mode === 'local') {
      return !!(STORE.session() && this._localUser());
    }
    try {
      const { data } = await this.client.auth.getSession();
      if (data && data.session) {
        await this.loadProfileAndProgress(data.session.user);
        return true;
      }
    } catch (e) {
      console.warn('Supabase session restore failed', e);
    }
    return false;
  },

  _localUser() {
    const s = STORE.session();
    if (!s) return null;
    return STORE.users()[s.email] || null;
  },

  currentUser() {
    if (this.mode === 'supabase') return this.cachedUser;
    return this._localUser();
  },

  async signup({ name, email, password }) {
    if (this.mode === 'local') {
      const users = STORE.users();
      if (users[email]) throw new Error('An account with that email already exists. Try signing in.');
      const salt = crypto.randomUUID();
      const passHash = await hashPassword(password, salt);
      users[email] = { name, email, salt, passHash, createdAt: Date.now() };
      STORE.saveUsers(users);
      STORE.saveSession({ email });
      return { needsConfirmation: false };
    }
    const { data, error } = await this.client.auth.signUp({
      email, password,
      options: { data: { name } }
    });
    if (error) throw new Error(error.message);
    if (!data.session) {
      // Email confirmation is on in Supabase Auth settings.
      return { needsConfirmation: true };
    }
    await this.loadProfileAndProgress(data.user);
    return { needsConfirmation: false };
  },

  async login({ email, password }) {
    if (this.mode === 'local') {
      const user = STORE.users()[email];
      if (!user) throw new Error('No account found with that email.');
      const hash = await hashPassword(password, user.salt);
      if (hash !== user.passHash) throw new Error('Incorrect password.');
      STORE.saveSession({ email });
      return;
    }
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    await this.loadProfileAndProgress(data.user);
  },

  async logout() {
    if (this.mode === 'supabase') {
      try { await this.client.auth.signOut(); } catch (e) {}
      this.cachedUser = null;
      this.cachedProgress = {};
    } else {
      STORE.saveSession(null);
    }
  },

  progress() {
    if (this.mode === 'supabase') return this.cachedProgress;
    const u = this._localUser();
    if (!u) return {};
    return STORE.progress()[u.email] || {};
  },

  saveProgress(p) {
    if (this.mode === 'supabase') {
      this.cachedProgress = p;
      return;
    }
    const u = this._localUser();
    if (!u) return;
    const all = STORE.progress();
    all[u.email] = p;
    STORE.saveProgress(all);
  },

  async upsertTaskProgress(taskId, record) {
    if (this.mode !== 'supabase' || !this.cachedUser) return;
    try {
      await this.client.from('progress').upsert({
        user_id: this.cachedUser.id,
        task_id: taskId,
        done: record.done,
        viewed_at: new Date(record.viewedAt).toISOString()
      });
    } catch (e) {
      console.warn('Failed to sync progress to server', e);
    }
  },

  async clearProgress() {
    if (this.mode === 'supabase' && this.cachedUser) {
      try { await this.client.from('progress').delete().eq('user_id', this.cachedUser.id); }
      catch (e) { console.warn('Failed to clear server progress', e); }
      this.cachedProgress = {};
      return;
    }
    const u = this._localUser();
    if (!u) return;
    const all = STORE.progress();
    all[u.email] = {};
    STORE.saveProgress(all);
  }
};

async function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim().toLowerCase();
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  const agreed = document.getElementById('signup-agree').checked;
  const err = document.getElementById('signup-error');
  const btn = e.target.querySelector('button[type=submit]');
  err.textContent = '';
  if (!name) { err.textContent = 'Please enter your name.'; return; }
  if (!validEmail(email)) { err.textContent = 'Please enter a valid email.'; return; }
  if (password.length < 6) { err.textContent = 'Password must be at least 6 characters.'; return; }
  if (password !== confirm) { err.textContent = 'Passwords do not match.'; return; }
  if (!agreed) { err.textContent = 'Please confirm you understand this is general guidance only.'; return; }

  btn.disabled = true;
  try {
    const { needsConfirmation } = await BACKEND.signup({ name, email, password });
    if (needsConfirmation) {
      err.style.color = 'var(--success)';
      err.textContent = 'Account created. Check your email to confirm, then sign in.';
      switchAuthTab('login');
    } else {
      enterApp();
    }
  } catch (ex) {
    err.style.color = '';
    err.textContent = ex.message || 'Sign up failed.';
  } finally {
    btn.disabled = false;
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const err = document.getElementById('login-error');
  const btn = e.target.querySelector('button[type=submit]');
  err.textContent = '';
  btn.disabled = true;
  try {
    await BACKEND.login({ email, password });
    enterApp();
  } catch (ex) {
    err.textContent = ex.message || 'Sign in failed.';
  } finally {
    btn.disabled = false;
  }
}

async function logout() {
  await BACKEND.logout();
  document.getElementById('app-shell').style.display = 'none';
  document.getElementById('auth-screen').style.display = '';
  document.getElementById('login-email').value = '';
  document.getElementById('login-password').value = '';
  document.getElementById('signup-name').value = '';
  document.getElementById('signup-email').value = '';
  document.getElementById('signup-password').value = '';
  document.getElementById('signup-confirm').value = '';
  const agree = document.getElementById('signup-agree');
  if (agree) agree.checked = false;
  switchAuthTab('login');
}

function currentUser() { return BACKEND.currentUser(); }

// ---------- PROGRESS ----------
function userProgress() { return BACKEND.progress(); }
function saveUserProgress(p) { BACKEND.saveProgress(p); }
function markDone(taskId, done) {
  const p = userProgress();
  const record = { done, viewedAt: Date.now() };
  p[taskId] = record;
  saveUserProgress(p);
  BACKEND.upsertTaskProgress(taskId, record);
}
async function resetProgress() {
  if (!confirm('Reset all your task progress? This cannot be undone.')) return;
  await BACKEND.clearProgress();
  if (BACKEND.mode !== 'supabase') saveUserProgress({});
  showView('home');
  showView('profile');
}

function dismissHomeDisclaimer() {
  try { localStorage.setItem('bh_disclaimer_dismissed', '1'); } catch (e) {}
  const el = document.getElementById('home-disclaimer');
  if (el) el.style.display = 'none';
}

// ---------- APP RENDERING ----------
let viewStack = ['home'];

function enterApp() {
  document.getElementById('auth-screen').style.display = 'none';
  document.getElementById('app-shell').style.display = '';
  const u = currentUser();
  document.getElementById('hero-title').textContent = 'Kia ora, ' + u.name.split(' ')[0];
  document.getElementById('user-greet').textContent = u.name.split(' ')[0];
  if (localStorage.getItem('bh_disclaimer_dismissed') === '1') {
    const el = document.getElementById('home-disclaimer');
    if (el) el.style.display = 'none';
  }
  renderHome();
  renderProfile();
  showView('home');
}

function showView(name, taskId) {
  ['home','task','profile'].forEach(v => {
    document.getElementById('view-' + v).classList.toggle('active', v === name);
  });
  ['home','profile'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (el) el.classList.toggle('active', t === name);
  });
  document.getElementById('back-btn').style.display = name === 'task' ? '' : 'none';
  const titles = { home: 'Home', task: '', profile: 'Profile' };
  if (name === 'task') {
    const t = TASKS.find(x => x.id === taskId);
    document.getElementById('page-title').textContent = t ? t.title : 'Task';
    renderTask(taskId);
    if (viewStack[viewStack.length-1] !== 'task') viewStack.push('task');
  } else {
    document.getElementById('page-title').textContent = titles[name];
    viewStack = [name];
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function goBack() {
  showView('home');
}

function iconForCategory(cat) {
  const icons = {
    'Exterior': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></svg>',
    'Walls & ceilings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="9" x2="9" y2="21"/></svg>',
    'Interior trim': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l3-3 7 7 10-10"/></svg>',
    'Interior': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18"/><circle cx="15" cy="12" r="1"/></svg>',
    'Wet areas': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 7 6 11 6 14a6 6 0 0012 0c0-3-2-7-6-12z"/></svg>'
  };
  return icons[cat] || icons['Interior'];
}

function renderHome() {
  const query = (document.getElementById('search').value || '').trim().toLowerCase();
  const progress = userProgress();
  const completed = Object.values(progress).filter(p => p.done).length;
  const total = TASKS.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  document.getElementById('home-progress').style.width = pct + '%';
  document.getElementById('home-progress-text').textContent =
    completed + ' of ' + total + ' tasks marked as learned (' + pct + '%)';

  const container = document.getElementById('categories-container');
  container.innerHTML = '';

  const filtered = TASKS.filter(t =>
    !query ||
    t.title.toLowerCase().includes(query) ||
    t.summary.toLowerCase().includes(query) ||
    t.category.toLowerCase().includes(query) ||
    t.overview.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty">No tasks match "' + escapeHtml(query) + '".</div>';
    return;
  }

  CATEGORIES.forEach(cat => {
    const tasks = filtered.filter(t => t.category === cat.name);
    if (tasks.length === 0) return;
    const section = document.createElement('div');
    section.innerHTML = '<div class="section-title">' + escapeHtml(cat.name) + '</div>';
    const grid = document.createElement('div');
    grid.className = 'grid';
    tasks.forEach(t => {
      const done = progress[t.id] && progress[t.id].done;
      const card = document.createElement('button');
      card.className = 'task-card';
      card.onclick = () => showView('task', t.id);
      card.innerHTML =
        '<div class="task-icon">' + iconForCategory(t.category) + '</div>' +
        '<div class="task-title">' + escapeHtml(t.title) + '</div>' +
        '<div class="task-meta">' +
          '<span class="badge ' + (done ? 'done' : '') + '">' + (done ? 'Learned' : t.difficulty) + '</span>' +
        '</div>';
      grid.appendChild(card);
    });
    section.appendChild(grid);
    container.appendChild(section);
  });
}

function renderTask(id) {
  const t = TASKS.find(x => x.id === id);
  const root = document.getElementById('view-task');
  if (!t) { root.innerHTML = '<div class="empty">Task not found.</div>'; return; }
  const progress = userProgress();
  const done = progress[t.id] && progress[t.id].done;

  root.innerHTML = `
    <div class="detail-hero">
      <h2>${escapeHtml(t.title)}</h2>
      <p>${escapeHtml(t.summary)}</p>
      <div class="chips">
        <span class="badge">${escapeHtml(t.category)}</span>
        <span class="badge">${escapeHtml(t.difficulty)}</span>
        <span class="badge">${escapeHtml(t.time)}</span>
      </div>
    </div>

    <div class="disclaimer compact">
      <strong>Guide only.</strong> This is general guidance for an everyday DIY job. Confirm requirements with your local council and product manufacturers. Restricted Building Work, structural changes, plumbing, gas and electrical work must be carried out or supervised by a qualified, licensed person.
    </div>

    ${(typeof ILLUSTRATIONS !== 'undefined' && ILLUSTRATIONS[t.id]) ? `
    <div class="illustration">
      <img src="${ILLUSTRATIONS[t.id]}" alt="${escapeHtml(t.title)} illustration" loading="lazy" />
      <div class="illustration-caption">Illustration — indicative only, refer to product specifications</div>
    </div>` : ''}

    <div class="panel">
      <div class="panel-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
        Overview
      </div>
      <div class="panel-body">${escapeHtml(t.overview)}</div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 00-5.6 5.6L3 18v3h3l6.1-6.1a4 4 0 005.6-5.6l-2.4 2.4-2.6-2.6 2.4-2.4z"/></svg>
        Tools you’ll need
      </div>
      <div class="panel-body">
        <ul>${t.tools.map(x => '<li>' + escapeHtml(x) + '</li>').join('')}</ul>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v4H3z"/><path d="M5 7v14h14V7"/></svg>
        Materials
      </div>
      <div class="panel-body">
        <ul>${t.materials.map(x => '<li>' + escapeHtml(x) + '</li>').join('')}</ul>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        Step-by-step
      </div>
      <div class="panel-body">
        ${t.steps.map((s, i) => `
          <div class="step">
            <div class="step-num">${i + 1}</div>
            <div class="step-body">
              <strong>${escapeHtml(s.title)}</strong>
              <p>${escapeHtml(s.body)}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/></svg>
        Best practice
      </div>
      <div class="panel-body">
        <ul>${t.bestPractice.map(x => '<li>' + escapeHtml(x) + '</li>').join('')}</ul>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.86a2 2 0 013.4 0l8.18 14.13A2 2 0 0120.18 21H3.82a2 2 0 01-1.71-2.99z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>
        Common mistakes
      </div>
      <div class="panel-body">
        <ul>${t.commonMistakes.map(x => '<li>' + escapeHtml(x) + '</li>').join('')}</ul>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6z"/></svg>
        Safety
      </div>
      <div class="panel-body">${escapeHtml(t.safety)}</div>
    </div>

    <div class="mark-done-bar">
      <button class="btn ${done ? 'secondary' : ''}" id="done-btn" onclick="toggleDone('${t.id}')">
        ${done ? '✓ Marked as learned — tap to unmark' : 'Mark as learned'}
      </button>
    </div>
  `;
}

function toggleDone(id) {
  const p = userProgress();
  const done = p[id] && p[id].done;
  markDone(id, !done);
  renderTask(id);
  renderHome();
  renderProfile();
}

function renderProfile() {
  const u = currentUser();
  if (!u) return;
  document.getElementById('avatar-letter').textContent = (u.name[0] || '?').toUpperCase();
  document.getElementById('profile-name').textContent = u.name;
  document.getElementById('profile-email').textContent = u.email;
  const progress = userProgress();
  const completed = Object.values(progress).filter(p => p.done).length;
  const total = TASKS.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;
  document.getElementById('profile-progress').style.width = pct + '%';
  document.getElementById('profile-progress-text').textContent =
    completed + ' of ' + total + ' tasks marked as learned.';
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------- BOOT ----------
window.addEventListener('load', async () => {
  BACKEND.init();
  // Show the backend mode subtly on the auth screen for clarity during dev.
  const modeLabel = document.getElementById('backend-mode');
  if (modeLabel) {
    modeLabel.textContent = BACKEND.mode === 'supabase'
      ? 'Cloud accounts enabled'
      : 'Local accounts (configure Supabase for cloud sync)';
  }
  try {
    const restored = await BACKEND.restoreSession();
    if (restored) {
      enterApp();
    } else {
      document.getElementById('auth-screen').style.display = '';
      document.getElementById('app-shell').style.display = 'none';
    }
  } catch (e) {
    console.warn('Session restore error', e);
    document.getElementById('auth-screen').style.display = '';
    document.getElementById('app-shell').style.display = 'none';
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => null);
  }
});
