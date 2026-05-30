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
    summary: 'A 1.8 m boundary fence with concreted posts, two rails and vertical palings.',
    difficulty: 'Intermediate',
    time: '1–2 weekends per 10 m',
    overview:
      'A paling fence comprises three structural elements: timber posts set in concrete footings at a maximum 2.4 m centres, horizontal rails fixed between posts, and vertical palings fastened to the rails. Post installation is the critical phase — once posts are plumb and the concrete has cured, the remainder of the build is straightforward carpentry.',
    tools: [
      'Post hole borer (manual auger or hired powered borer)',
      'Spirit level, 600 mm minimum',
      'Builder\'s line and stakes',
      'Tape measure, pencil, chalk line',
      'Spade and crowbar',
      'Cordless drill/driver and impact driver',
      'Circular saw with a sharp blade',
      'Hammer or framing nail gun (galvanised collated nails)',
      'Wheelbarrow and shovel for concrete mixing'
    ],
    materials: [
      'H4 or H5 treated posts — 100 × 100 mm × 2.4 m (1.8 m above ground, 600 mm below)',
      'H3.2 rails — 100 × 50 mm',
      'H3.2 palings — 100 × 19 mm × 1.8 m',
      'Rapid-set post concrete — approximately 2 × 20 kg bags per standard post hole (3 bags for corner / gate post holes)',
      'Hot-dip galvanised or stainless 75 mm screws or nails',
      'Builder\'s twine and marker paint'
    ],
    steps: [
      { title: 'Confirm the boundary and set the line', body: 'Verify the boundary using the property title plan. Where the fence is on a shared boundary, discuss the position and cost-sharing with the affected neighbour(s) — the Fencing Act 1978 applies. Drive a stake at each end of the fence run and tension a builder\'s line between them to establish the centreline.', diagram: 'fence-paling-step-layout' },
      { title: 'Set out post positions', body: 'Mark post centres along the line at 2.4 m maximum spacing. Reduce to 1.8 m on exposed or sloping sites. Plan corner and gate posts first — these typically need deeper, wider footings.', diagram: 'fence-paling-step-layout' },
      { title: 'Excavate the post holes', body: 'Dig holes 300 mm diameter × 600 mm deep for a standard 1.8 m fence. Increase to 750 mm depth for corner posts and gate hangs. Keep the base flat and clear of loose spoil. Locate buried services before digging — beforeUdig.co.nz.', diagram: 'fence-paling-step-hole' },
      { title: 'Stand the post and brace plumb', body: 'Place a small bed of compacted metal at the base of the hole for drainage. Set the post centrally and check plumb in both planes with a spirit level. Brace the post temporarily with timber off-cuts staked to the ground.', diagram: 'fence-paling-step-brace' },
      { title: 'Place the concrete', body: 'A standard 600 × 300 mm post hole typically takes 2 × 20 kg bags of rapid-set concrete (allow 3 bags for corner and gate post holes). Tip the dry mix into the hole around the post, then add water per the bag instructions — typically 3 litres per 20 kg bag. Trowel the top surface so it slopes away from the post on all sides to shed water. Re-verify plumb before initial set.', diagram: 'fence-paling-step-concrete' },
      { title: 'Mark rail heights', body: 'Once the concrete has cured (24 hours minimum), run a builder\'s line between end posts at the top and bottom rail heights. Mark each intermediate post.' },
      { title: 'Fix the rails', body: 'Cut rails to span tightly between posts, or run continuous with a half-lap or scarf joint at posts. Pre-drill before fixing to prevent splitting at the rail ends. Stagger rail joints across the fence — never align top and bottom joints on the same post.', diagram: 'fence-paling-step-rails' },
      { title: 'Fix the palings', body: 'Start with a plumb paling at one end. Maintain a 5–8 mm gap between palings to allow for moisture movement. Use a spacer block for consistency. Fix each paling with two fasteners per rail. Run a top string line to keep paling heights uniform.', diagram: 'fence-paling-step-palings' },
      { title: 'Trim the tops', body: 'Snap a chalk line across the palings at the finished height (1800 mm above ground typical). Cut with a circular saw set to the paling thickness. Light sand any visible saw marks.' },
      { title: 'Install the cap rail', body: 'Fix a continuous cap rail over the paling tops to protect the end-grain and shed water. The cap should overhang each face by 10–15 mm. Apply an exterior stain, oil or paint within four weeks of installation.', diagram: 'fence-paling-step-cap' }
    ],
    bestPractice: [
      'Use H4 (or H5 in marine zones) treated timber for any component in ground contact. H3.2 is rated for exterior above-ground use only.',
      'Check posts for plumb in both planes during bracing — a single-plane check leaves the fence leaning along its length.',
      'Always concrete post footings. Compacted soil alone will not hold a fence through a typical New Zealand winter.',
      'Pre-drill near the ends of rails and palings to prevent splitting.',
      'On sloped sites, either step the fence in level panels or rake it parallel to the ground. Do not mix the two methods within a single run.',
      'Maintain a 25–40 mm gap between paling bottoms and ground level to prevent moisture wicking and rot.'
    ],
    commonMistakes: [
      'Footings under-excavated — fence racks within the first storm season.',
      'Posts spaced beyond 2.4 m — rails deflect and palings wave under load.',
      'Fasteners over-driven into thin palings — heads break through and the paling splits.',
      'Palings hard down on the ground — capillary moisture causes rot at the base within 2–3 years.'
    ],
    safety: 'Locate underground services before digging by requesting a free plan from beforeUdig.co.nz. Wear safety glasses and hearing protection when operating a circular saw. Wet concrete is caustic — wear gloves and rinse skin contact immediately.'
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
    category: 'Cladding',
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
      'Trim work is unforgiving — every gap and misaligned joint is visible in the finished room. Two cuts do most of the work: the 45° mitre for external corners, and the scribe for internal corners on skirting (more reliable than a mitre, because rooms are rarely perfectly square).',
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
      'Cut slightly long and spring the trim into place — never cut short.',
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
      'Installing plasterboard ("gibbing") is largely about handling large, heavy sheets accurately and fixing them flat. Standard interior board is 10 mm on walls and 13 mm on ceilings; wet areas require a moisture-resistant board (Aqualine) and garage-to-house walls require a fire-rated board (Fyreline). Sheets are run horizontally on walls to minimise the number of visible joints.',
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
      'Hanging a door into an existing frame is a precise job: it comes down to consistent hinge mortises, an even gap (margin) all the way around, and a latch that catches cleanly. This covers fitting a slab door to an existing lined frame — for a frame-and-door unit, see the pre-hung door guide.',
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
      'Painting is roughly 80% preparation. Inadequate preparation is the single biggest reason a DIY paint job looks amateur. Apply two coats minimum, over a sealer or undercoat on any bare or patched areas.',
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
      'A splashback is an ideal first tiling project: a small area, a vertical surface (no levelling to worry about), and edge cuts that are largely hidden under the benchtop and cabinetry. The fundamentals covered here apply to any tiling job.',
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
      'A wall shelf is a simple job that fails for predictable reasons: the wrong fixing for the wall type, no fixing into a stud, or an out-of-level result. Done correctly it is a 30-minute job that will hold its load reliably.',
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
      { title: 'Mount the shelf', body: 'Place the shelf on the brackets and fix from underneath into the shelf body. Test the load gently before loading it up.' }
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
      'Flat-pack assembly comes down to following the sequence carefully and not over-tightening the fixings. The cam-and-dowel system used in most furniture is forgiving when assembled in the correct order, and troublesome when it is not.',
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
      'There are two distinct products. Silicone is flexible, waterproof and not paintable — use it in bathrooms, kitchens and movement joints. Acrylic painter\'s caulk is paintable but less flexible — use it for gaps between trims and walls and at internal corners. Choosing the wrong one is the most common caulking mistake.',
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
      'A gate spring, chain or wind clip stops the gate slamming itself off the hinges in high wind.'
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
      'For edibles, avoid old CCA-treated timber (the green-tinted type). H4 ACQ/LOSP is current-specification and considered safe. Untreated macrocarpa or cedar is the cleanest option, though more expensive.',
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
  },

  // ===== MORE INTERIOR =====
  {
    id: 'floating-floor',
    category: 'Interior',
    title: 'Lay a floating laminate or engineered floor',
    summary: 'A click-lock floating floor over underlay — no nails or glue to the subfloor.',
    difficulty: 'Beginner',
    time: '1–2 days for a typical room',
    overview:
      'A floating floor is not fixed to the subfloor — the boards click together and "float" as one sheet over a foam underlay, expanding and contracting with humidity. The two things that ruin a floating floor are skipping the expansion gap at the walls and laying over an uneven subfloor.',
    tools: [
      'Tape measure, pencil, square',
      'Hand saw, jigsaw or circular saw (or a laminate cutter)',
      'Tapping block and pull bar',
      'Spacers (8–10 mm)',
      'Rubber mallet',
      'Long spirit level or straight edge for checking the subfloor',
      'Utility knife'
    ],
    materials: [
      'Click-lock laminate or engineered boards (order 10% extra for cuts and waste)',
      'Foam or rubber underlay (with vapour barrier for concrete subfloors)',
      'Scotia or quarter-round trim to cover the expansion gap',
      'Self-levelling compound (only if the subfloor is out of level)',
      'Threshold/transition strips for doorways'
    ],
    steps: [
      { title: 'Acclimatise the boards', body: 'Leave the unopened packs flat in the room for 48 hours before laying. The boards need to reach the room\'s temperature and humidity, or they\'ll expand or shrink after installation.' },
      { title: 'Check and prepare the subfloor', body: 'The subfloor must be clean, dry and flat to within 3 mm over 2 m. Check with a straight edge. Fill low spots with self-levelling compound; sand down high spots. On concrete, lay a vapour-barrier underlay.' },
      { title: 'Plan the direction and layout', body: 'Lay boards parallel to the longest wall, or towards the main light source. Measure the room so the final row isn\'t a thin sliver — if it is, trim the first row to balance it.' },
      { title: 'Lay the underlay', body: 'Roll out the underlay, butting edges (don\'t overlap) and taping the seams. Trim to the room.' },
      { title: 'Lay the first row', body: 'Start in a corner with the tongue side facing the wall. Use 8–10 mm spacers against every wall to maintain the expansion gap. Connect boards end to end along the row.' },
      { title: 'Stagger the joints', body: 'Start each new row with the offcut from the previous row (provided it\'s over 300 mm), so end joints are staggered by at least 300 mm between rows. Aligned joints look wrong and weaken the floor.' },
      { title: 'Click the rows together', body: 'Angle the board into the row in front, push down to click, then use the tapping block and mallet to close the end joints. A pull bar closes the last board against the wall.' },
      { title: 'Cut around obstacles', body: 'Scribe and jigsaw around door frames, pipes and corners. Undercut timber door jambs with a flush saw so boards slide underneath — much tidier than cutting boards around them.' },
      { title: 'Fit the last row', body: 'Rip the final row to width (less the expansion gap). Use the pull bar to draw it tight.' },
      { title: 'Remove spacers and trim', body: 'Remove all spacers. Fit scotia/quarter-round to the skirting (not the floor — the floor must stay free to move) to cover the gap. Fit threshold strips at doorways.' }
    ],
    bestPractice: [
      'The 8–10 mm expansion gap around every wall and fixed object is non-negotiable — without it the floor buckles in summer.',
      'Acclimatise the boards for 48 hours first. Skipping this is the most common cause of gapping and peaking.',
      'Fix the scotia to the skirting, never to the floor — the floor must float freely.',
      'Stagger end joints by 300 mm minimum and avoid a "stairstep" pattern.',
      'For wet areas and kitchens use a water-resistant board and a vapour-barrier underlay.'
    ],
    commonMistakes: [
      'No expansion gap — the floor lifts and peaks at the joints.',
      'Laying over a subfloor that isn\'t flat — boards flex, joints click and gap underfoot.',
      'Pinning the scotia through the floorboards — stops the floor floating, causes gaps.',
      'Aligned end joints — looks amateur and weakens the lock.'
    ],
    safety: 'Wear safety glasses when cutting. Cut laminate outdoors or with dust extraction — the dust is fine and irritating. Watch your knees — use a kneeling pad.'
  },

  {
    id: 'draught-proofing',
    category: 'Insulation & energy',
    title: 'Draught-proof doors and windows',
    summary: 'Seal gaps to cut heat loss — one of the cheapest comfort upgrades.',
    difficulty: 'Beginner',
    time: '2–3 hours per house',
    overview:
      'Draughts are the cheapest heat loss to fix in a New Zealand home. The main culprits are the gaps around external doors (especially the bottom), window sashes, and unused vents. A few hours and a small budget makes a noticeable difference to warmth and power bills.',
    tools: [
      'Tape measure',
      'Scissors or sharp knife',
      'Screwdriver or drill (for door seals)',
      'Hacksaw (to cut door-bottom seals to length)',
      'A lit incense stick or candle (to find draughts)'
    ],
    materials: [
      'Self-adhesive foam or rubber/EPDM compression strip (for door and window stops)',
      'Door bottom seal — brush strip, or a door snake for a no-fix option',
      'Silicone sealant for fixed gaps (frame-to-wall)',
      'Draught-stopper for unused fireplaces / vents'
    ],
    steps: [
      { title: 'Find the draughts', body: 'On a windy day, move a lit incense stick slowly around door and window edges. Where the smoke wavers, there\'s a draught. Note every leak before you start.' },
      { title: 'Clean the surfaces', body: 'Adhesive seals only stick to clean, dry surfaces. Wipe the door/window stops and frames with methylated spirits and let dry.' },
      { title: 'Seal door stops and window sashes', body: 'Apply self-adhesive compression strip to the door stop (the part the door closes against) so the door compresses it when shut. For double-hung and casement windows, apply to the closing edges. Don\'t over-thicken — the door/window must still close easily.' },
      { title: 'Seal the door bottom', body: 'Measure the door width and cut a brush or blade bottom-seal to length. Screw it to the inside face of the door so it just sweeps the floor when closed. For a no-fix option, a fabric door snake works on internal doors.' },
      { title: 'Seal fixed gaps', body: 'Where a window or door frame meets the wall lining and there\'s a visible gap, run a neat bead of sealant (paintable acrylic for painted frames, neutral silicone elsewhere). Backer rod first for gaps over 6 mm.' },
      { title: 'Address vents and fireplaces', body: 'Block unused wall vents and disused fireplace flues with a removable draught-stopper. Keep ventilation where it\'s needed — never block vents serving gas appliances or active fireplaces.' },
      { title: 'Re-test', body: 'Repeat the incense test on a windy day to confirm the leaks are sealed.' }
    ],
    bestPractice: [
      'Don\'t over-seal a home with unflued gas heaters or open fires — they need air. Only draught-proof rooms with safe, flued or electric heating.',
      'Compression seals (rubber/EPDM) last far longer than cheap foam — worth the extra cost on doors used daily.',
      'A draught at the door bottom is usually the biggest single leak — fix it first.',
      'Keep at least one source of fresh-air ventilation per living area to manage moisture and avoid condensation.'
    ],
    commonMistakes: [
      'Sealing a home so tight that moisture and condensation build up — balance airtightness with ventilation.',
      'Foam strip too thick — the door won\'t latch.',
      'Applying adhesive seals to dusty or damp surfaces — they peel off within weeks.',
      'Blocking vents that serve combustion appliances — a carbon monoxide risk.'
    ],
    safety: 'Never block vents or flues serving gas heaters, gas hot water, or solid-fuel fires — restricting their air supply can cause dangerous carbon monoxide build-up. If unsure, consult a registered gasfitter.'
  },

  {
    id: 'tv-mount',
    category: 'Interior',
    title: 'Mount a TV on the wall',
    summary: 'Fix a bracket securely into studs and hang the TV level.',
    difficulty: 'Beginner',
    time: '1–2 hours',
    overview:
      'A wall-mounted TV is a straightforward job that goes wrong when the bracket is fixed into plasterboard alone. A modern TV plus a swing-arm bracket is heavy and cantilevered — it must be fixed into the timber studs (or solid masonry). Get the fixings and the level right and it\'s a quick job.',
    tools: [
      'Stud finder',
      'Spirit level (or laser level)',
      'Cordless drill and bits (wood, and masonry if on a block/brick wall)',
      'Socket or spanner for the lag bolts',
      'Tape measure and pencil',
      'A helper (TVs are awkward to lift onto a bracket alone)'
    ],
    materials: [
      'VESA-compatible wall bracket rated above your TV\'s weight (check the VESA hole spacing on the TV)',
      'Lag bolts/coach screws supplied with the bracket (into timber studs)',
      'Masonry anchors if fixing to brick/concrete (never plasterboard plugs)',
      'Cable management trunking or in-wall cable kit (optional)'
    ],
    steps: [
      { title: 'Choose the height', body: 'For comfortable viewing, the centre of the screen should be roughly at eye level when seated — typically 1000–1200 mm from floor to screen centre in a lounge. Mark the intended screen centre on the wall.' },
      { title: 'Find the studs', body: 'Use a stud finder to locate the timber studs (usually 400 or 600 mm centres). Mark the centre of at least two studs that fall within the bracket\'s width. The bracket must bolt into solid timber, not just plasterboard.' },
      { title: 'Attach the arms to the TV', body: 'Bolt the bracket\'s vertical arms (or plate) to the back of the TV using the correct VESA screws. Don\'t over-tighten into the TV\'s plastic bosses.' },
      { title: 'Mark and drill the wall plate', body: 'Hold the wall plate at the marked height, centred on the studs, and check it dead level with a spirit level. Mark the bolt holes over the stud centres. Drill pilot holes into the studs (or masonry holes for a block wall).' },
      { title: 'Bolt the plate to the wall', body: 'Drive the lag bolts/coach screws into the studs and tighten firmly. Re-check level. The plate should not move at all when pulled.' },
      { title: 'Hang the TV', body: 'With a helper, lift the TV and engage its arms onto the wall plate per the bracket instructions. Fit any locking screws or safety catch.' },
      { title: 'Level and manage cables', body: 'Most brackets allow a small tilt/level adjustment — fine-tune until level. Run cables through trunking or an in-wall cable kit for a tidy finish. Never run mains power inside the wall unless done by an electrician — use a proper recessed power kit.' }
    ],
    bestPractice: [
      'Always fix into at least two studs (or solid masonry). Plasterboard anchors alone will not safely hold a wall-mounted TV.',
      'Buy a bracket rated well above your TV\'s weight — the rating includes a safety margin you want.',
      'Cantilevered (swing-arm) brackets put far more leverage on the fixings than flat brackets — stud fixing is essential.',
      'Check the VESA pattern (the square hole spacing on the TV back) before buying the bracket.'
    ],
    commonMistakes: [
      'Fixing into plasterboard with anchors — the TV pulls out of the wall.',
      'Only catching one stud with a wide bracket — it twists under load.',
      'Running mains cable inside the wall cavity without a compliant power outlet kit — an electrical hazard.',
      'Over-tightening VESA screws and cracking the TV\'s mounting bosses.'
    ],
    safety: 'A falling TV can seriously injure a child. Fix into studs or masonry only, use the safety catch, and never compromise on the bracket weight rating. Any new mains wiring must be done by a registered electrician.'
  },

  // ===== MORE EXTERIOR =====
  {
    id: 'retaining-wall',
    category: 'Exterior',
    title: 'Build a low timber retaining wall',
    summary: 'A timber pole-and-sleeper wall up to 1 m, with drainage behind.',
    difficulty: 'Advanced',
    time: '2–3 weekends',
    overview:
      'A retaining wall holds back soil — it works hard and fails dangerously if built wrong. In New Zealand, a retaining wall over 1.5 m high (or under load, e.g. a driveway above it) requires building consent and engineering. This guide covers a simple timber wall up to about 1 m on a stable site. Drainage behind the wall is as important as the wall itself.',
    tools: [
      'Post hole borer or spade',
      'Spirit level and string line',
      'Circular saw and/or chainsaw for poles',
      'Cordless drill/driver and an auger bit',
      'Wheelbarrow and shovel',
      'Sledgehammer',
      'Compacting tool (or hired plate compactor)'
    ],
    materials: [
      'H5 treated round poles or 100×100 posts for verticals',
      'H4 treated sleepers (200×50 or 200×75) for the wall face',
      'Rapid-set concrete for the post footings',
      'Hot-dip galvanised coach screws / bolts',
      'Novacoil or slotted drainage pipe (Nova flow) for behind the wall',
      'Drainage metal (drainage scoria / GAP 20–40) and geotextile cloth',
      'Galvanised wall ties / deadmen anchors for higher walls'
    ],
    steps: [
      { title: 'Confirm height and consent', body: 'Measure the retained height. Up to 1.5 m, free-standing and not surcharged (no load like a driveway, building or steep slope above), generally does not need consent — but confirm with your council, as district rules vary. Anything higher or under load needs engineering and consent. Do not guess with retaining walls.' },
      { title: 'Set out and dig post holes', body: 'Mark post positions at 1.2–1.5 m centres along a string line. Dig holes at least as deep as the wall is high (a 1 m wall needs ~1 m deep footings), 300 mm diameter. The embedment is what stops the wall tipping.' },
      { title: 'Set the posts', body: 'Stand each post plumb, brace it, and concrete it in. Run a string line to keep the front faces aligned and the tops to height. Let the concrete cure fully (several days for a load-bearing wall) before backfilling.' },
      { title: 'Fix the sleepers', body: 'Coach-screw or bolt the sleepers horizontally to the back of the posts (soil side), starting from the bottom and working up. Stagger any end joints over posts. Leave a small gap between sleepers, or drill weep holes, to let water through.' },
      { title: 'Lay the drainage', body: 'Wrap the base behind the wall in geotextile cloth, lay a slotted drainage pipe (Novacoil) running to a stormwater outfall or soak hole, and surround it with drainage metal. This is the most important step — water pressure behind a wall is what pushes it over.' },
      { title: 'Backfill with drainage metal', body: 'Backfill directly behind the sleepers with free-draining metal (scoria or GAP 40), not the excavated clay. Wrap the metal in geotextile to stop soil clogging it. Compact in layers.' },
      { title: 'Add deadmen if needed', body: 'For taller walls (towards 1 m+) or where engineering specifies, fit deadman anchors — timber members running back into the bank, tied to the wall, to resist tipping.' },
      { title: 'Top off and finish', body: 'Topsoil the last 100–150 mm so plants can grow. Ensure surface water is graded to run away from the top of the wall, not over it.' }
    ],
    bestPractice: [
      'Drainage is everything. A wall with no drainage behind it is holding back waterlogged soil at many times the dry weight — it will eventually fail.',
      'Post embedment depth should at least equal the retained height for a simple cantilever timber wall.',
      'Backfill with free-draining metal, never the clay you dug out.',
      'Use H5 for posts in ground, H4 for sleepers. Ground-contact timber must be properly treated.',
      'When in any doubt about height, load or soil, get a chartered engineer and council consent. Retaining wall failures cause serious injury and expensive damage.'
    ],
    commonMistakes: [
      'No drainage behind the wall — hydrostatic pressure pushes it over within a few wet seasons.',
      'Posts not deep enough — the wall leans forward at the top.',
      'Backfilling with clay — holds water against the wall.',
      'Building over 1.5 m, or under a surcharge, without engineering or consent — illegal and dangerous.'
    ],
    safety: 'Excavations can collapse — never work in a deep unsupported trench. Retaining walls are structural; an under-built wall can fail suddenly. Get engineering for anything tall, loaded, or on unstable ground. Locate services before digging (beforeUdig.co.nz).'
  },

  {
    id: 'paver-path',
    category: 'Exterior',
    title: 'Lay a paver path or patio',
    summary: 'A sand-and-base paved area with proper fall and edge restraint.',
    difficulty: 'Intermediate',
    time: '1–2 weekends',
    overview:
      'A good paved area is mostly about what\'s underneath: a compacted base, a screeded sand bed, and a fall to drain water away. Pavers laid straight onto soil will sink and weed. The work is in the preparation, not the laying.',
    tools: [
      'Spade and shovel',
      'Wheelbarrow',
      'String line and pegs',
      'Spirit level and a long straight edge',
      'Rubber mallet',
      'Screed rails (two lengths of pipe or timber) and a screed board',
      'Plate compactor (hire one — essential)',
      'Brick/block splitter or angle grinder with a diamond blade',
      'Broom'
    ],
    materials: [
      'Pavers (order 5–10% extra for cuts)',
      'Basecourse / GAP 20–40 hardfill for the sub-base',
      'Bedding sand (coarse / concrete sand)',
      'Edge restraints (haunching concrete, or proprietary plastic edging with pegs)',
      'Fine kiln-dried jointing sand for sweeping into the joints',
      'Weed mat (optional, under the base)'
    ],
    steps: [
      { title: 'Set out and excavate', body: 'Mark the area with string lines. Excavate to allow for the paver thickness + 30 mm sand bed + 80–100 mm compacted base (more for a driveway). Set the string lines to the finished surface height with a fall of about 1:60 (roughly 15–20 mm per metre) away from any building.' },
      { title: 'Lay and compact the base', body: 'Spread basecourse hardfill in 50 mm layers and compact each layer with the plate compactor. A well-compacted base is what stops the pavers sinking. Check the fall with a level as you go.' },
      { title: 'Install edge restraints', body: 'Pavers must be restrained on all edges or they\'ll creep apart. Either haunch the edge pavers in concrete, or fit proprietary edging pinned into the base. Do this before or as you lay the field.' },
      { title: 'Screed the sand bed', body: 'Lay two screed rails on the base set to the right height (paver thickness below the string), spread sand between them, and drag the screed board across to get a flat, even 30 mm bed. Don\'t walk on the screeded sand.' },
      { title: 'Lay the pavers', body: 'Work from one corner, laying pavers in your chosen pattern, gently bedding each with a rubber mallet. Keep consistent joints (2–3 mm). Kneel on a board laid over placed pavers, not on the sand.' },
      { title: 'Cut the edges', body: 'Mark and cut border pavers with a splitter or grinder. Measure each individually — edges are rarely perfectly straight.' },
      { title: 'Compact the pavers in', body: 'Run the plate compactor (with a rubber mat or carpet to protect the surface) over the laid pavers to bed them into the sand. Watch for any that crack.' },
      { title: 'Sweep in jointing sand', body: 'Spread dry kiln-dried sand over the surface and sweep it into all the joints. Compact again, top up the sand, and sweep until joints are full. Full joints lock the pavers together.' },
      { title: 'Final clean', body: 'Sweep off the excess. The joints will settle after a few weeks — top up the jointing sand again if needed.' }
    ],
    bestPractice: [
      'Build in a fall of about 1:60 away from the house — water must drain off, or the area becomes slippery and weedy.',
      'Compaction is everything: compact the base in layers, and compact the pavers in at the end.',
      'Edge restraint on every edge — without it the whole field slowly spreads and gaps open up.',
      'Use the right sand: coarse bedding sand under the pavers, fine kiln-dried sand for the joints. Don\'t use builder\'s sand in the joints.',
      'For a driveway, increase the base to 150 mm+ and use thicker pavers.'
    ],
    commonMistakes: [
      'No fall — water ponds, the area grows moss and gets slippery.',
      'Skipping compaction — pavers sink into ruts within a year.',
      'No edge restraint — pavers migrate and joints open up.',
      'Laying on a thick sand bed with no base — guaranteed sinking and movement.'
    ],
    safety: 'Plate compactors are heavy and vibrate hard — wear steel-cap boots, gloves and ear protection. Cutting pavers throws silica dust — wear a P2 mask and eye protection, and cut wet where possible. Lift pavers with your legs, not your back.'
  },

  {
    id: 'timber-steps',
    category: 'Exterior',
    title: 'Build timber garden steps',
    summary: 'Simple box-frame steps for a bank or to a deck, with safe, even risers.',
    difficulty: 'Intermediate',
    time: '1 weekend',
    overview:
      'Safe steps have consistent riser heights and going (tread depth) — uneven steps are a trip hazard. This covers simple timber box steps suitable for a garden or a low deck. For steps that are part of a building exit or over 1 m high, balustrade and Building Code rules apply.',
    tools: [
      'Tape measure, pencil, square',
      'Spirit level',
      'Circular saw',
      'Cordless drill/driver',
      'Spade',
      'String line'
    ],
    materials: [
      'H4 treated timber for stringers and box frames (200×50)',
      'H3.2 treated decking or 200×50 for treads',
      'H5 posts or concrete pads for the base where in ground contact',
      'Stainless or hot-dip galvanised structural screws',
      'Drainage metal for the base'
    ],
    steps: [
      { title: 'Measure the total rise', body: 'Measure the vertical height from the bottom landing to the top, held level (the "total rise"). This is the key number — everything is calculated from it.' },
      { title: 'Calculate the steps', body: 'Aim for a riser of 150–190 mm and a going (tread depth) of at least 280 mm. Divide the total rise by your target riser to get the number of steps, then divide the total rise by that whole number to get the exact, equal riser height. Every riser must be the same.' },
      { title: 'Prepare a firm base', body: 'Excavate and compact a base of drainage metal at the bottom, or pour a small concrete pad. The bottom step must sit on something stable that won\'t sink or wash out.' },
      { title: 'Build the box frames', body: 'For box steps, build a rectangular timber frame for each step at the calculated riser height and going. Screw the frames together, each sitting on and set back from the one below.' },
      { title: 'Level and fix each box', body: 'Set the bottom box level on the base, check it front-to-back and side-to-side, and fix it. Stack and fix each subsequent box, checking level at every step.' },
      { title: 'Fix the treads', body: 'Cut treads to overhang the front of each box by 20–30 mm (a small nosing). Fix with two screws per bearer, with a 4–6 mm gap between boards for drainage. Leave a slight fall forward so water runs off.' },
      { title: 'Add grip and a handrail if needed', body: 'For safety, especially on a shady or wet path, add anti-slip strips to the tread nosings. Steps that are part of a building access route, or more than a few risers, should have a handrail — check the Building Code for required dimensions.' }
    ],
    bestPractice: [
      'Every riser must be the same height — even a 10 mm variation between steps is a trip hazard.',
      'Keep risers 150–190 mm and goings 280 mm+ for comfortable, safe steps.',
      'A 20–30 mm tread nosing and a slight forward fall improves safety and sheds water.',
      'Anti-slip strips on outdoor timber steps prevent slips in the wet — timber gets dangerously slippery.',
      'Steps forming a required building exit, or higher than the Code threshold, need compliant handrails and balustrades.'
    ],
    commonMistakes: [
      'Uneven riser heights — the classic trip hazard, especially the bottom or top step.',
      'Bottom step sitting on bare soil — it sinks and the whole flight goes out of level.',
      'Treads with no gap between boards — water pools and the timber rots.',
      'No grip on outdoor treads — slippery and dangerous when wet.'
    ],
    safety: 'Inconsistent steps cause falls — measure and calculate carefully. Wear glasses and ear protection when cutting. For anything over about 1 m, or steps people rely on daily, consider a handrail and check Building Code requirements.'
  },

  {
    id: 'guttering',
    category: 'Exterior',
    title: 'Install or replace spouting and a downpipe',
    summary: 'Hang guttering to a fall and run a downpipe to the stormwater.',
    difficulty: 'Intermediate',
    time: '1 day per elevation',
    overview:
      'Spouting (guttering) collects roof runoff and carries it to a downpipe and into the stormwater system. The critical detail is the fall — the gutter must slope gently towards the downpipe so it drains and doesn\'t overflow. Working at height is the main risk on this job.',
    tools: [
      'Ladder or scaffold (a tower is far safer than a ladder for a full run)',
      'Tape measure, chalk line, string line',
      'Cordless drill/driver',
      'Hacksaw or tin snips for cutting spouting',
      'Spirit level',
      'Pop rivet gun',
      'Sealant gun'
    ],
    materials: [
      'Spouting/guttering (PVC or Colorsteel to match the house)',
      'Gutter brackets / fascia brackets',
      'Downpipe and downpipe brackets',
      'Outlet (dropper), stop ends, internal/external corners',
      'Neutral-cure gutter sealant',
      'Pop rivets and gutter screws'
    ],
    steps: [
      { title: 'Plan the fall and outlet position', body: 'Decide where the downpipe will go (near an existing stormwater connection). The gutter falls towards this outlet at about 1:500 (a gentle 2–3 mm per metre). On a long run, fall from the centre to outlets at both ends, or from one end to the other.' },
      { title: 'Mark the bracket line', body: 'Mark the high end of the gutter just below the roof line, then measure down the fall over the length to mark the low (outlet) end. Snap a chalk line between them — this is your bracket line.' },
      { title: 'Fix the brackets', body: 'Fix gutter/fascia brackets along the chalk line at the spacing the manufacturer specifies (typically 500–900 mm, closer in snow/heavy-rain areas). Brackets carry the load — don\'t over-space them.' },
      { title: 'Cut and fit the outlet and stop ends', body: 'Cut the outlet hole and fit the dropper where the downpipe will connect. Fit stop ends to the ends of the run. Seal all joints with neutral-cure gutter sealant.' },
      { title: 'Clip in the spouting', body: 'Lay the spouting into the brackets, joining lengths with jointers (sealed and riveted) and fitting corners as needed. Check the fall with a level as you go.' },
      { title: 'Fit the downpipe', body: 'Connect the downpipe to the outlet, run it down the wall fixing it with brackets every 1.5–2 m, and direct the bottom into the stormwater gully or a connection — never just onto the ground beside the foundation.' },
      { title: 'Test with water', body: 'Run a hose into the high end of the gutter. Check it flows to the outlet without ponding, and that all joints are watertight. Fix any low spots or leaks.' }
    ],
    bestPractice: [
      'Get the fall right — too little and it ponds and overflows; the gutter must drain completely to the outlet.',
      'Don\'t over-space the brackets, especially on long runs or heavy-rainfall areas — sagging gutters pond and leak.',
      'Use neutral-cure sealant rated for guttering on every joint; assemble joints clean and dry.',
      'Direct the downpipe into the stormwater system, not onto the ground next to the house — water against foundations causes damp and erosion.',
      'Match new spouting profile and colour to the existing house where you\'re only replacing a section.'
    ],
    commonMistakes: [
      'No fall (or fall the wrong way) — water ponds and overflows behind the gutter.',
      'Brackets too far apart — the gutter sags between them and holds water.',
      'Downpipe discharging at the base of the wall — damp foundations and erosion.',
      'Unsealed or poorly assembled joints — persistent drips.'
    ],
    safety: 'Most of the risk on this job is the height. Use a scaffold or tower rather than over-reaching from a ladder; never stand on the top rungs. Be aware of overhead power lines near the eaves — keep well clear, and if the service line is close, call your lines company. Don\'t work on a roof edge alone.'
  },

  // ===== MORE WALLS & CEILINGS =====
  {
    id: 'ceiling-insulation',
    category: 'Insulation & energy',
    title: 'Install ceiling insulation',
    summary: 'Lay insulation batts in the ceiling cavity to keep heat in.',
    difficulty: 'Beginner',
    time: 'Half a day to a day',
    overview:
      'Ceiling insulation is the highest-value insulation in a house — heat rises, and an uninsulated ceiling is the biggest single heat loss. Laying batts in an accessible roof space is a straightforward DIY job. The keys are full coverage with no gaps, and not blocking ventilation or covering anything that gets hot.',
    tools: [
      'Sturdy ladder for roof access',
      'Knee boards or a crawl board (never stand between the joists)',
      'Sharp knife and a straight edge for cutting batts',
      'Tape measure',
      'Head torch or work light',
      'Dust mask (P2), gloves, long sleeves, safety glasses'
    ],
    materials: [
      'Ceiling insulation batts at the recommended R-value for your climate zone (e.g. R3.6–R6.0 ceiling, check NZ zone requirements)',
      'Offcuts for filling small gaps',
      'Insulation as needed to top up existing thin or settled insulation'
    ],
    steps: [
      { title: 'Check access and safety', body: 'Make sure you can move safely in the roof space. Lay a crawl board across the ceiling joists — the ceiling lining (gib) between joists will NOT take your weight. Set up good lighting before you start.' },
      { title: 'Identify hazards to keep clear of', body: 'Locate downlights, transformers, flues, and any heat-producing fittings. Keep insulation clear of these unless the fitting is rated IC (insulation contact). Old downlights need a clearance gap or a cover — covering them is a fire risk.' },
      { title: 'Measure and plan coverage', body: 'Plan to cover the whole ceiling area edge to edge, including the tricky bits near the eaves. Note where you\'ll need to cut batts to fit around obstacles.' },
      { title: 'Lay the batts', body: 'Place batts snugly between the joists, butted hard against each other end-to-end with no gaps. The batt should fill the space without being squashed — compressing insulation reduces its R-value.' },
      { title: 'Cut to fit neatly', body: 'Cut batts to length with a knife against a straight edge on a board. Cut around braces and obstacles so the batt still fills the full space rather than leaving a gap.' },
      { title: 'Maintain eave ventilation', body: 'Don\'t push insulation hard into the eaves and block the airflow path — the roof space needs to breathe to avoid moisture build-up. Keep the ventilation gap at the eaves clear.' },
      { title: 'Top up existing insulation', body: 'If there\'s old, thin or settled insulation, lay new batts over the top (at right angles to the joists if topping up) to reach the target R-value. Don\'t leave gaps between the old and new.' }
    ],
    bestPractice: [
      'Full, gap-free coverage matters more than thickness — even small gaps dramatically reduce performance.',
      'Never compress batts to fit — squashed insulation loses much of its R-value. Cut to fit instead.',
      'Keep the required clearance around non-IC downlights and any heat source — covering them is a genuine fire risk.',
      'Don\'t block eave ventilation — a roof space needs airflow to stay dry.',
      'Choose the R-value for your climate zone; higher R-value insulates better.'
    ],
    commonMistakes: [
      'Gaps between batts or at the edges — heat escapes straight through them.',
      'Compressing insulation into tight spaces — drastically reduces its effectiveness.',
      'Covering old-style downlights or transformers — overheating and fire risk.',
      'Stepping on the ceiling lining instead of the joists — a foot through the ceiling.'
    ],
    safety: 'Only step on joists or a crawl board — the ceiling will not hold your weight. Wear a P2 mask, gloves, long sleeves and glasses; insulation fibres irritate skin, eyes and lungs. Keep insulation clear of hot fittings and recessed lights unless they\'re rated for insulation contact. Beware of live wiring in the roof space — don\'t disturb it; if in doubt, get an electrician.'
  },

  {
    id: 'underfloor-insulation',
    category: 'Insulation & energy',
    title: 'Install underfloor insulation',
    summary: 'Fit insulation between the floor joists from below to stop heat loss through the floor.',
    difficulty: 'Intermediate',
    time: '1 day for a typical house (more if access is tight)',
    overview:
      'Underfloor insulation is one of the most effective comfort upgrades for a suspended timber floor. It is fitted from within the subfloor space, friction-fitted between the joists and held up with straps or netting. The work is physical and dusty in a confined space, but the method is simple: full coverage, snug fit, properly supported, with subfloor ventilation kept clear.',
    tools: [
      'Head torch and a work light',
      'Mechanic\'s creeper or a crawl mat',
      'Sharp knife and a straight edge for cutting',
      'Staple gun or proprietary insulation hold-up clips/straps',
      'Tape measure',
      'Overalls, P2 dust mask, gloves, safety glasses, knee pads'
    ],
    materials: [
      'Underfloor insulation (polyester segments, foil-faced blanket, or proprietary press-fit panels)',
      'Insulation support — straps, netting, or product-specific clips',
      'Ground vapour barrier (polythene) if the subfloor ground is damp'
    ],
    steps: [
      { title: 'Check access, dryness and hazards', body: 'Confirm you can move safely under the floor. If the ground is damp, lay a polythene ground vapour barrier first — insulating over a wet subfloor traps moisture against the floor. Note any old wiring, pipes and signs of borer or rot.' },
      { title: 'Measure the joist spacing', body: 'Measure the gap between joists (usually 400–450 mm). Buy insulation sized to friction-fit that spacing, or plan to cut blanket to width plus a little for a snug fit.' },
      { title: 'Cut to a snug fit', body: 'Cut segments slightly wider than the gap so they friction-fit without being compressed. Insulation that is squashed loses much of its R-value; insulation with gaps leaks heat.' },
      { title: 'Fit between the joists', body: 'Push each piece up between the joists, hard against the underside of the floor with no air gap above it (unless using a foil product that requires an air gap — follow its instructions).' },
      { title: 'Support it from below', body: 'Hold the insulation up with straps, netting or the product\'s clips at regular spacing so it cannot sag or fall over time. Sagging insulation leaves a cold air gap and stops working.' },
      { title: 'Work methodically for full coverage', body: 'Cover the whole floor area, fitting tightly around piles, braces and pipes. Cut neatly around obstacles rather than leaving gaps.' },
      { title: 'Keep subfloor vents clear', body: 'Do not block the subfloor vents — the space must stay ventilated to carry moisture away. Keep insulation and any vapour barrier clear of the vents.' }
    ],
    bestPractice: [
      'Friction-fit snug, never compressed — compressed insulation loses R-value.',
      'Support every length so it can\'t sag or drop; sagging insulation stops working.',
      'Lay a ground vapour barrier first if the subfloor ground is damp.',
      'Keep subfloor vents clear — ventilation prevents moisture and rot.',
      'Foil-faced products usually need an air gap to work — follow the manufacturer\'s spec.'
    ],
    commonMistakes: [
      'Gaps between segments or around piles — heat leaks straight out.',
      'Poor support so the insulation sags and a cold gap forms.',
      'Insulating over damp ground with no vapour barrier — traps moisture against the floor.',
      'Blocking subfloor vents — leads to damp and rot.'
    ],
    safety: 'Confined-space work: tell someone you\'re under there, ensure ventilation, and watch for low oxygen in tight spaces. Wear a P2 mask, overalls, gloves and glasses — fibres and subfloor dust irritate. Do not disturb wiring; if you find damaged or exposed cables, stop and call an electrician. Beware of nails protruding through the floor above.'
  },

  // ===== CLADDING =====
  {
    id: 'building-wrap',
    category: 'Cladding',
    title: 'Install building wrap (wall underlay)',
    summary: 'Fix wall underlay over the framing as a drainage plane behind the cladding.',
    difficulty: 'Intermediate',
    time: '1 day per elevation',
    overview:
      'Building wrap (wall underlay) is the secondary weather barrier behind the cladding. With a drained cavity in front of it, it sheds any water that gets past the cladding and lets the framing dry. The single rule that governs everything is shingle-lapping: every upper layer overlaps the one below, so water always runs over a join, never into it.',
    tools: [
      'Staple gun (or hammer and large-head clouts)',
      'Tape measure and a sharp knife',
      'Chalk line',
      'Scaffold or safe working platform',
      'Sealant gun for penetrations'
    ],
    materials: [
      'Wall underlay / building wrap to NZ standards (synthetic, breathable)',
      'Wrap tape (compatible with the underlay)',
      'Flexible flashing tape for openings and penetrations',
      'Staples or large-head galvanised clouts'
    ],
    steps: [
      { title: 'Start at the bottom', body: 'Begin the first run at the base of the wall, running horizontally. Working bottom-up means each higher course laps over the one below so water sheds outward.' },
      { title: 'Run it horizontally with correct laps', body: 'Roll the wrap along the wall and fix it to every stud. Overlap horizontal joins by about 75 mm and vertical joins by about 150 mm — check your product\'s specification, as some differ.' },
      { title: 'Always shingle-lap, never reverse-lap', body: 'Each upper sheet must sit OVER the sheet below (like roof shingles). A reverse lap funnels water in behind the lower sheet — the classic leak.' },
      { title: 'Tape the joins', body: 'Tape horizontal and vertical laps with the manufacturer\'s wrap tape so the drainage plane is continuous.' },
      { title: 'Detail the openings', body: 'Dress the wrap into window and door openings and integrate it with the flashing tape and flashings in the correct sequence — sill first, then jambs, then head — so each layer laps over the one below. This sequencing is what keeps openings watertight.' },
      { title: 'Seal penetrations', body: 'Tape or seal around pipe and cable penetrations so water can\'t track in behind the wrap.' },
      { title: 'Fix cavity battens over the wrap', body: 'Install the cavity battens over the studs (through the wrap) to create the drained, ventilated cavity, then the cladding goes on the battens. The wrap must be behind the cavity, not in front of it.' }
    ],
    bestPractice: [
      'Shingle-lap everything: upper over lower, always. This one rule prevents most underlay leaks.',
      'Don\'t leave the wrap exposed to UV longer than the manufacturer allows — sunlight degrades it; get the cladding on within the stated window.',
      'Sequence window flashings correctly (sill, jambs, head) so every layer sheds onto the one below.',
      'Tape laps and penetrations to keep the drainage plane continuous.',
      'The wrap goes behind the cavity battens — it is the back of the drained cavity, per NZBC E2/AS1.'
    ],
    commonMistakes: [
      'Reverse laps (lower sheet over upper) — funnels water into the wall.',
      'Leaving wrap exposed to the weather for weeks — UV and wind damage it.',
      'Poor sequencing at windows — water gets behind the underlay at the openings.',
      'Fixing cladding straight to the wrap with no cavity — not compliant and traps moisture.'
    ],
    safety: 'Most of the risk is working at height — use a scaffold, not a ladder, for full elevations. Wrap is slippery underfoot if it ends up on the ground. Watch for wind catching large sheets.'
  },

  {
    id: 'cladding-types',
    category: 'Cladding',
    title: 'Types of cladding explained',
    summary: 'A plain-English guide to the common exterior claddings and how to choose.',
    difficulty: 'Beginner',
    time: 'A short read',
    overview:
      'Cladding is the weatherproof skin of the house. This is a selection guide rather than an install how-to: it explains the common cladding types used in New Zealand, their look, rough cost, maintenance and who should install them. Almost all modern cladding is installed over a drained cavity on building wrap. Always check council and manufacturer requirements — recladding usually needs consent.',
    tools: [
      'This is an overview guide — installation tools vary by system',
      'For any cladding: a moisture-aware approach, cavity battens, building wrap and flashings'
    ],
    materials: [
      'Bevel-back / rusticated timber weatherboard',
      'Fibre-cement weatherboard (e.g. pre-finished bevel profiles)',
      'Board-and-batten or vertical shiplap timber',
      'Fibre-cement or plywood sheet (with battens or grooves)',
      'Brick veneer',
      'Plaster / EIFS (texture-coated systems)',
      'Profiled metal (corrugate and trays)'
    ],
    steps: [
      { title: 'Timber weatherboard (bevel-back / rusticated)', body: 'The traditional New Zealand look. Horizontal timber boards that overlap to shed water. Warm and repairable, but needs repainting/oiling every several years. DIY-friendly to repair; full installs are skilled work. Best on cavity battens, treated to at least H3.1.' },
      { title: 'Fibre-cement weatherboard', body: 'Pre-primed cement-composite boards that mimic timber weatherboards (e.g. bevel profiles). Very stable, low movement, doesn\'t rot, holds paint well. Heavier and more brittle to cut (silica dust — cut with the right blade and a mask). Popular for low-maintenance new builds.' },
      { title: 'Board-and-batten / vertical shiplap', body: 'Vertical timber boards with battens over the joins (board-and-batten) or interlocking vertical boards (shiplap). A more modern or rural look. Needs careful flashing at horizontal joins because water runs down the face.' },
      { title: 'Sheet cladding (fibre-cement or plywood)', body: 'Large sheets fixed to the framing, with battens over the joins or grooved profiles. Fast to install over big areas, contemporary look. Joints and fixings must be detailed and sealed correctly or they leak. Plywood (e.g. grooved ply) gives a vertical-groove look and must be a proper exterior cladding grade.' },
      { title: 'Brick veneer', body: 'A single skin of brick tied back to the framing with a cavity behind. Extremely durable and essentially maintenance-free, good thermal mass. Heavier (needs adequate footings), more expensive, and laid by a bricklayer rather than DIY.' },
      { title: 'Plaster / texture-coated systems (EIFS)', body: 'A render or texture coat over a backing (solid plaster over block, or a texture-coated panel system). Seamless modern look. Quality of the system and installer is critical — older face-fixed plaster systems were a major leaky-building culprit, so use a current cavity-based system and an experienced applicator.' },
      { title: 'Profiled metal (corrugate / trays)', body: 'Long-run steel in corrugate or tray profiles, used vertically or horizontally. Durable, light, fast, and a strong modern or rural aesthetic. Needs careful flashing and fixing; avoid in very corrosive coastal zones unless the right coating/grade is specified.' }
    ],
    bestPractice: [
      'Whatever you choose, install it over a drained cavity on building wrap — this is what keeps modern homes weathertight.',
      'Match the cladding to the climate: coastal and high-rainfall zones demand the right material grade and coatings.',
      'Lower-maintenance materials (fibre-cement, brick, metal) cost more upfront but save repainting over the years; timber rewards regular maintenance with the best repairability.',
      'Detailing at junctions, windows and the base is where cladding succeeds or fails — flashings matter more than the boards themselves.',
      'Recladding and many new cladding jobs are Restricted Building Work — use Licensed Building Practitioners and get consent.'
    ],
    commonMistakes: [
      'Choosing a cladding for looks alone without considering maintenance and the local climate.',
      'Face-fixed/no-cavity systems on a wet site — the leaky-building lesson.',
      'Cutting fibre-cement dry without dust control — hazardous silica dust.',
      'Skimping on flashings and junction detailing — where almost all cladding failures start.'
    ],
    safety: 'Cutting fibre-cement and masonry releases silica dust — use the correct blade, cut outdoors, wear a P2/P3 mask and eye protection. Most cladding work is at height — use proper scaffold. Weathertightness failures are expensive and slow to show; when in doubt, use a Licensed Building Practitioner.'
  },

  // ===== MORE INTERIOR =====
  {
    id: 'painting-tips',
    category: 'Interior',
    title: 'Painting tips and techniques',
    summary: 'The craft behind a professional paint finish — tools, technique and finishing.',
    difficulty: 'Beginner',
    time: 'Reference — apply to any paint job',
    overview:
      'Most of the difference between a DIY paint job and a professional one is technique, not paint. This guide covers the craft: choosing and loading tools, cutting in, rolling for an even finish, keeping a wet edge, choosing the right sheen, and fixing the common faults. Use it alongside any specific painting project.',
    tools: [
      'Quality angled sash brush (50–63 mm) — a good brush is the single best investment',
      'Roller frame and quality microfibre/mohair sleeves (not the cheapest — they shed)',
      'Roller tray or a pail with a grid',
      'Extension pole',
      'Low-tack painter\'s tape',
      'Filler, sanding block and sealer/undercoat for prep'
    ],
    materials: [
      'Quality paint (better coverage and flow than budget paint)',
      'Sealer/undercoat for bare or patched areas',
      'Brush and roller cleaning gear'
    ],
    steps: [
      { title: 'Prep is 80% of the result', body: 'Wash, fill, sand and dust before opening the paint. Spot-prime bare timber, filler and stains with sealer/undercoat — unsealed patches "flash" (show through) in the finish. A perfect coat over poor prep still looks poor.' },
      { title: 'Box your paint', body: 'If using more than one tin of the same colour, mix them together in a larger bucket ("boxing") so the colour is identical across the whole job — tins can vary slightly between batches.' },
      { title: 'Load the brush properly', body: 'Dip only the bottom third of the bristles, then tap (don\'t scrape) each side against the tin. A correctly loaded brush carries plenty of paint without dripping. Scraping the brush dry-loads it and causes drag marks.' },
      { title: 'Cut in with confidence', body: 'Paint a 50–75 mm band along edges, corners and around fittings with the angled brush. Work in sections so the cut-in stays wet until you roll up to it. Steady the brush, lead with the long bristles, one smooth pass.' },
      { title: 'Roll while the cut-in is wet', body: 'Load the roller and roll the field in a large W or N, then fill it in, finishing with light parallel strokes in one direction. Roll up close to the wet cut-in so the two blend with no visible band ("hatbanding").' },
      { title: 'Keep a wet edge', body: 'Always work into wet paint, never back into a section that has started to dry — overlapping dry paint leaves lap marks. Do a whole wall in one go rather than stopping mid-wall.' },
      { title: 'Two thin coats, sanded between', body: 'Two thin coats always beat one thick coat — better coverage, no runs, harder finish. A light sand (220 grit) between coats on trim gives a glass-smooth result. Respect the recoat time on the tin.' },
      { title: 'Choose the right sheen', body: 'Flat/matte hides wall imperfections (ceilings, low-traffic walls); low-sheen/eggshell is the practical wall standard (wipeable); semi-gloss/satin enamel for trim and doors (durable, washable). Higher sheen shows every surface flaw, so prep accordingly.' },
      { title: 'Fix faults early', body: 'Catch runs and drips while wet and brush them out — once skinned, leave them to dry fully, then sand back and recoat. Remove tape while the final coat is still slightly tacky, pulling at 45°, to avoid peeling a dried film.' },
      { title: 'Clean and store tools', body: 'Wash water-based paint out of brushes and rollers under warm water until it runs clear; comb the brush, reshape it and hang or lay flat to dry. Good tools cleaned well last for years.' }
    ],
    bestPractice: [
      'Buy a quality brush and roller sleeve — they hold more paint, lay it more evenly and don\'t shed fibres.',
      'Two thin coats, not one thick one — every time.',
      'Keep a wet edge and finish a wall in one session to avoid lap marks.',
      'Seal/undercoat bare and patched areas or they flash through the topcoat.',
      'Box multiple tins for colour consistency on bigger jobs.'
    ],
    commonMistakes: [
      'Skipping prep and painting over dust, gloss or bare patches.',
      'Overloading the brush or roller — runs, drips and spatter.',
      'Stopping in the middle of a wall — visible lap marks.',
      'Cheap roller sleeves leaving fluff in the finish.',
      'Leaving tape on until the paint is bone dry — it peels the film off.'
    ],
    safety: 'Ventilate the room even with low-VOC paint. Use a proper platform or step stool, not the top of a ladder. Pre-1980 homes may have lead-based paint under newer coats — do not dry-sand or burn it; see the joinery restoration guide for safe handling.'
  },

  {
    id: 'prehung-door',
    category: 'Interior',
    title: 'Install a pre-hung internal door',
    summary: 'Fit a door that comes pre-mounted in its frame — plumb, shim and fix.',
    difficulty: 'Intermediate',
    time: '1–2 hours per door',
    overview:
      'A pre-hung door comes already hinged in its jamb (frame) as a single unit, ready to drop into the rough opening — the common method in modern builds. The whole job is about getting the frame plumb, square and not bowed, then packing it solidly so the door swings true and the margins are even.',
    tools: [
      'Spirit level (long) and/or a plumb reference',
      'Tape measure and pencil',
      'Cordless drill/driver',
      'Nail gun or hammer (finishing nails) — or finishing screws',
      'Timber packers / shims',
      'Hand saw or multi-tool for trimming shims',
      'Utility knife'
    ],
    materials: [
      'Pre-hung internal door set (door + jamb + stops)',
      'Tapered timber packers / shims',
      '60–75 mm finishing nails or jamb screws',
      'Architraves to trim both sides',
      'Construction adhesive (optional, for architraves)'
    ],
    steps: [
      { title: 'Check the opening', body: 'The rough opening should be about 10–15 mm wider and taller than the frame to allow for packing. Check the floor across the opening is level — if it isn\'t, you\'ll pack the low side up so the head ends up level.' },
      { title: 'Stand the set in the opening', body: 'Lift the pre-hung set into the opening, centred, with the door closed and the jamb sitting on the floor. The architrave/casing reveal should sit against the wall lining on the face side.' },
      { title: 'Plumb the hinge jamb first', body: 'The hinge side carries the door\'s weight, so plumb it first. Pack behind the jamb at the top hinge, shim until the jamb is dead plumb, and fix through the jamb and packers into the stud. Then pack and fix at the middle and bottom hinges.' },
      { title: 'Set an even reveal', body: 'Close the door and check the gap (margin) between the door edge and the jamb all the way around — aim for an even 2–3 mm. Adjust the latch jamb in or out until the margin is consistent top to bottom.' },
      { title: 'Pack and fix the latch jamb', body: 'Shim behind the latch jamb at the top, middle (at the strike) and bottom, keeping that even margin, and fix through into the stud. Pack right behind the strike plate so the jamb can\'t flex when the door is closed.' },
      { title: 'Fix the head and re-check', body: 'Pack and fix the head jamb if the design requires it. Open and close the door several times — it should swing smoothly, stay where you put it (not drift open or shut), and latch cleanly.' },
      { title: 'Trim shims and fit architraves', body: 'Score and snap or saw the packers off flush with the framing. Fit the architraves to both faces with a consistent reveal, mitred at the top corners. Punch and fill the nail holes ready for painting.' }
    ],
    bestPractice: [
      'Plumb and fix the hinge jamb first — everything else references off it.',
      'Always pack directly behind each hinge and behind the strike plate, so the jamb is solid where it carries load.',
      'Keep the margin around the door even (2–3 mm) — uneven gaps are the tell-tale of a poorly hung door.',
      'Don\'t overdrive fixings — pulling the jamb tight to a packer is fine, but bowing the jamb ruins the margin and the swing.',
      'Account for the floor covering (carpet/tiles) when setting the bottom clearance.'
    ],
    commonMistakes: [
      'Fixing the frame without plumbing the hinge side — the door drifts open or won\'t latch.',
      'No packer behind the strike — the jamb flexes and the door rattles or won\'t catch.',
      'Overdriven nails/screws bowing the jamb — uneven margins and a binding door.',
      'Forgetting the floor finish height — door fouls the new carpet or leaves a big gap.'
    ],
    safety: 'Door sets are heavy and awkward — lift with help. Keep fingers clear of the hinge side when testing the swing. Standard eye protection when nailing.'
  },

  // ===== EXTERIOR =====
  {
    id: 'deck-stairs',
    category: 'Exterior',
    title: 'Build deck stairs with cut stringers',
    summary: 'Lay out and cut stringers for stairs from a deck to the ground.',
    keywords: ['deck steps', 'stairs', 'steps', 'stringers', 'riser', 'going'],
    difficulty: 'Advanced',
    time: '1 weekend',
    overview:
      'Deck stairs use cut (sawtooth) stringers — angled timber with the steps cut into them — fixed to the deck at the top and a solid footing at the base. The make-or-break is the layout: every riser must be equal and the stringers accurately marked, or the stairs are unsafe and uncomfortable. Stairs forming building access, or above a certain height, must meet Building Code dimensions and need a handrail/balustrade.',
    tools: [
      'Framing square with stair gauges (the little brass buttons)',
      'Circular saw and a hand saw to finish the cuts',
      'Spirit level and tape measure',
      'Cordless drill/driver',
      'Spade and gear for a concrete footing pad'
    ],
    materials: [
      'Stringer stock — H3.2 (or H4 near ground) 240×45 or wider',
      'Tread timber — two decking boards per tread, or solid 200×50',
      'Stainless or hot-dip galvanised structural screws / bolts',
      'Stringer-to-deck brackets or a ledger',
      'Concrete for the base pad / footing'
    ],
    steps: [
      { title: 'Measure the total rise', body: 'Measure the vertical distance from the top of the deck surface to the ground where the stairs will land, held truly level out from the deck. This total rise drives every calculation.' },
      { title: 'Calculate equal risers and going', body: 'Divide the total rise by a target riser (150–190 mm) to get the number of steps, then divide the total rise by that whole number for the exact equal riser. Choose a going (tread depth) of 250–300 mm+. Every riser must be identical — including the bottom one once the tread thickness is accounted for.' },
      { title: 'Lay out the stringer', body: 'Set the stair gauges on the framing square to your riser (on the tongue) and going (on the blade). Walk the square down the stringer board, marking each step. Mark the top plumb cut (against the deck) and the bottom seat cut, and drop the bottom by one tread thickness so the first step ends up equal.' },
      { title: 'Cut the stringers', body: 'Cut the steps with a circular saw, stopping at the inside corner of each notch, and finish the corners with a hand saw so you don\'t overcut and weaken the stringer. Use the first stringer as a template for the rest.' },
      { title: 'Pour or set the base footing', body: 'The stairs must land on a solid, level concrete pad or footing — never bare soil, which washes out and lets the stairs drop and go out of level.' },
      { title: 'Fix the stringers', body: 'Fix the top of the stringers to the deck framing with brackets or a ledger, and the bottom to the footing. Space stringers no more than ~450 mm apart (use three for wide stairs) so the treads don\'t flex.' },
      { title: 'Fit the treads', body: 'Fix treads with a 4–6 mm gap for drainage and a small nosing overhang. Two screws per stringer per board. Keep the treads level side to side with a slight forward fall to shed water.' },
      { title: 'Add the handrail / balustrade', body: 'Stairs that are part of building access, or more than the Code threshold above ground, require a compliant handrail and balustrade (graspable rail, limited gap sizes, set heights). Check the Building Code and your council — this is often where consent is triggered.' }
    ],
    bestPractice: [
      'Every riser equal — measure, calculate and remember to deduct one tread thickness from the bottom riser.',
      'Stringers no more than ~450 mm apart, three for wide stairs, or treads bounce.',
      'Land on a concrete footing, never bare soil.',
      'Finish saw cuts by hand so you don\'t overcut the notches and weaken the stringer.',
      'Handrails and balustrades to Building Code where stairs serve the building or exceed the height threshold.'
    ],
    commonMistakes: [
      'Unequal risers (especially the bottom step) — a serious trip hazard.',
      'Overcutting the stringer notches with the circular saw — weakens them.',
      'Stringers spaced too far apart — springy, unsafe treads.',
      'Bottom of the stairs on soil — it sinks and the flight racks.',
      'Omitting a required handrail/balustrade — non-compliant and unsafe.'
    ],
    safety: 'Stairs are structural and a serious fall risk — get the layout and fixings right. Handrails/balustrades are a Code requirement in many situations; check before you build, as consent may be needed. Wear eye and ear protection when cutting; support long stringers when sawing.'
  },

  // ===== JOINERY & RESTORATION =====
  {
    id: 'restore-joinery',
    category: 'Joinery & restoration',
    title: 'Restore timber window and door joinery',
    summary: 'Strip, repair, re-putty, prime and repaint old timber windows and doors.',
    keywords: ['restoring', 'restoration', 'restore', 'villa', 'bungalow', 'character', 'heritage', 'sash', 'putty', 'rot repair', 'lead paint', 'old windows', 'timber joinery'],
    difficulty: 'Advanced',
    time: 'A weekend per window/door',
    overview:
      'Original timber joinery on villas and bungalows is usually worth saving — old-growth timber outlasts modern replacements and restoration keeps a home\'s character. The work is methodical: strip back failed paint, repair rot and splits, re-bed loose glass with fresh putty, then build a proper paint system back up. The big caution is lead paint, which is present in most pre-1980 homes.',
    tools: [
      'Paint scrapers (flat and shaped) and a hook scraper',
      'Infrared paint stripper or a low-temperature heat gun (used carefully)',
      'Sharp chisels and a putty knife / glazing knife',
      'Orbital sander and hand sanding blocks',
      'Multi-tool / oscillating tool for raking out old putty',
      'Filling knives',
      'Dust extraction or HEPA vacuum, P2/P3 respirator, gloves, glasses'
    ],
    materials: [
      'Linseed-oil glazing putty (for traditional single-glazed timber sashes)',
      'Two-part epoxy timber repair filler and consolidant (for rot repair)',
      'Matching timber for splicing in larger repairs',
      'Oil-based wood primer (or a quality acrylic primer/undercoat system)',
      'Undercoat and exterior enamel or acrylic topcoat',
      'Abrasives (80–180 grit), methylated spirits, dust sheets'
    ],
    steps: [
      { title: 'Assess what you\'re dealing with', body: 'Check the joinery for rot (probe soft spots with a screwdriver), failed putty, loose joints and flaking paint. Decide what can be repaired in place versus what needs a sash removed. Assume any paint in a pre-1980 home is lead-based until proven otherwise.', diagram: 'restore-joinery-step-anatomy' },
      { title: 'Set up for safe lead-paint work', body: 'For pre-1980 paint: work outdoors or isolate the room with drop sheets, wear a P2/P3 respirator, and use wet-scraping, chemical stripper, or an infrared stripper / low-temp heat — never a high-heat gun or dry power-sanding, which create toxic lead dust and fumes. Collect and bag all debris.', diagram: 'restore-joinery-step-leadsafe' },
      { title: 'Strip back the failed paint', body: 'Remove flaking and built-up paint back to a sound, firm surface (you don\'t always need bare timber — just stable paint). Scrape with the grain; use the stripper/heat to soften stubborn build-up. Keep the profiles crisp.', diagram: 'restore-joinery-step-strip' },
      { title: 'Repair rot and splits', body: 'Dig out soft, rotten timber back to sound wood. Treat the area with epoxy consolidant, then rebuild the profile with two-part epoxy filler, or splice in a matching timber section (a "dutchman") for larger losses. Sand to profile once cured.', diagram: 'restore-joinery-step-rotrepair' },
      { title: 'Rake out and renew the putty', body: 'On single-glazed sashes, rake out cracked, loose glazing putty with a multi-tool or chisel without cracking the glass. Re-bed any loose glass, then press in fresh linseed putty and strike it off at a clean 45° bevel with a glazing knife.', diagram: 'restore-joinery-step-putty' },
      { title: 'Let the putty skin, then prime', body: 'New linseed putty must skin/cure (days to a couple of weeks) before painting. Prime all bare timber — knots get a knotting sealer, and prime the putty too. Back-prime any faces you can reach; end-grain especially needs sealing.' },
      { title: 'Build the paint system', body: 'Apply undercoat, then one or two topcoats of exterior-grade enamel/acrylic. On glazing, lap the paint about 2 mm onto the glass off the putty — this seals the putty-to-glass join against water. Sand lightly between coats.', diagram: 'restore-joinery-step-paintlap' },
      { title: 'Rehang, adjust and seal', body: 'Refit hardware and rehang sashes/doors. Check they open, close and latch smoothly; ease any binding edges. Make sure drainage paths (weep holes in sills) are clear, not painted shut.' }
    ],
    bestPractice: [
      'Treat all pre-1980 paint as lead-based: wet methods, chemical or infrared stripping, P2/P3 respirator, full clean-up. Never dry-sand or burn it.',
      'Repair, don\'t replace, sound old-growth timber — it\'s better than most new timber and keeps the home\'s character.',
      'Let linseed putty skin before painting, and lap paint slightly onto the glass to seal the putty.',
      'Prime every bare surface, seal knots, and back-prime/seal end-grain — that\'s where decay restarts.',
      'Keep sill weep holes and drainage paths clear of paint.'
    ],
    commonMistakes: [
      'Dry-sanding or burning old lead paint — creates serious toxic dust and fumes.',
      'Painting over damp timber or fresh, un-skinned putty — it fails quickly.',
      'Skipping primer on bare wood and knots — bleed-through and early peeling.',
      'Painting weep holes and moving edges shut — traps water and jams the joinery.'
    ],
    safety: 'Lead paint is the serious hazard here: homes built before about 1980 almost certainly have it. Use wet/chemical/infrared removal, a P2/P3 respirator, gloves and drop sheets; keep children and pregnant people away; bag and dispose of debris responsibly. Glass and chisels cut — handle sashes carefully. Ventilate when using chemical strippers.'
  },

  {
    id: 'window-hardware',
    category: 'Joinery & restoration',
    title: 'Repair and fit window joinery hardware',
    summary: 'Stays, fasteners and sash cords — get old windows opening and latching again.',
    keywords: ['restoring', 'restoration', 'sash cord', 'sash window', 'villa', 'bungalow', 'casement', 'double-hung', 'window latch', 'painted shut'],
    difficulty: 'Intermediate',
    time: '1–2 hours per window',
    overview:
      'Old timber windows fail at the hardware long before the timber gives up: seized casement stays, broken fasteners, and snapped sash cords on double-hung windows. Most are straightforward to repair or replace, and period-correct hardware keeps the look right on a character home.',
    tools: [
      'Screwdrivers (flat and posi) and a small drill',
      'Pliers and a sharp chisel',
      'Utility knife to cut paint lines',
      'Putty knife / pry bar to lift beads and stops',
      'Pencil and tape'
    ],
    materials: [
      'Replacement casement stays and fasteners (match the period/finish)',
      'Sash cord (waxed sash line) and sash weights if missing',
      'Brass or matching screws',
      'Beeswax or candle wax to lubricate runners',
      'Penetrating oil for seized metal hardware'
    ],
    steps: [
      { title: 'Identify the window type', body: 'Casement windows hinge on the side and use a stay (the arm that holds them open) and a fastener (the latch). Double-hung windows slide vertically and run on cords connected to hidden counterweights. The repair differs for each.' },
      { title: 'Free up painted-shut windows', body: 'Run a sharp knife along the paint line between sash and frame to break the paint seal, then ease the sash free. Many "broken" old windows are simply painted shut.' },
      { title: 'Remove the old hardware', body: 'Unscrew the old stay, fastener or catch. If screws are seized or painted, clear the slots with a knife and apply penetrating oil. Keep old hardware as a pattern when buying replacements.' },
      { title: 'Record a double-hung sash (if needed)', body: 'For a broken sash cord: prise off the staff bead, swing the lower sash out, and open the weight pocket cover in the frame jamb. Tie new waxed sash cord to the weight, run it over the pulley, set the correct length with the sash at the sill, and fix it into the groove in the sash edge. Repeat both sides so the sash is balanced.' },
      { title: 'Fit casement stay and fastener', body: 'Screw the stay to the sill/frame and the arm to the sash so the window holds at the open positions. Fit the fastener so it pulls the sash firmly closed against the frame. Pre-drill screw holes in old hard timber to avoid splitting.' },
      { title: 'Adjust and lubricate', body: 'Check the window opens, holds and latches smoothly. Rub beeswax or candle wax on double-hung runners and pulleys. A touch of oil on casement pivots stops squeaks. Don\'t over-tighten stays so the window still moves freely.' },
      { title: 'Reinstate beads and finish', body: 'Refit any staff beads or stops you removed. Touch up paint where needed — but keep paint off moving metal parts and out of the sash channels so nothing seizes again.' }
    ],
    bestPractice: [
      'Match period hardware (finish and style) on villas and bungalows — it preserves the character and value.',
      'Use brass or the correct screws and pre-drill old hard timber to avoid splits.',
      'Balance double-hung sash weights so the window stays put at any height and doesn\'t slam down.',
      'Wax runners and pulleys; oil pivots — keep moving parts free, and keep paint off them.'
    ],
    commonMistakes: [
      'Wrong sash cord length — the sash won\'t reach the top or sits proud of the sill.',
      'Over-tightening stays so the window binds.',
      'Painting hardware and channels shut again after freeing them.',
      'Forcing a painted-shut sash and cracking the joint or glass instead of cutting the paint line first.'
    ],
    safety: 'Double-hung sashes are under spring or weight tension — control the sash and keep fingers clear of the pulley and pocket. Handle old glass carefully (it can be thin and brittle). If the existing paint is pre-1980, treat it as lead-based when cutting or sanding — see the joinery restoration guide.'
  },

  // ===== WET AREAS =====
  {
    id: 'tile-floor',
    category: 'Wet areas',
    title: 'Tile a floor',
    summary: 'Lay floor tiles over a prepared, rigid substrate with full adhesive coverage.',
    difficulty: 'Intermediate',
    time: '1–2 days plus curing',
    overview:
      'Floor tiling differs from wall tiling in two ways: the substrate must be rigid and flat, and the tiles must be fully bedded with no voids underneath. A flexing floor or a hollow under a tile leads to cracked tiles and grout. In wet areas the floor must be waterproofed first. Get the substrate and the set-out right and the tiling itself is methodical.',
    tools: [
      'Notched trowel (10–12 mm for floor tiles)',
      'Tile cutter or wet saw (wet saw for porcelain and stone)',
      'Long spirit level / straight edge',
      'Chalk line and tape measure',
      'Tile spacers and levelling clips (for large-format tiles)',
      'Rubber grout float, sponge and buckets',
      'Mixing paddle and drill',
      'Knee pads'
    ],
    materials: [
      'Floor tiles (porcelain is the durable standard) — order 10–15% extra',
      'Flexible tile adhesive rated for floors',
      'Flexible grout',
      'Decoupling/uncoupling membrane (over timber floors or where movement is likely)',
      'Substrate primer/sealer',
      'Neutral-cure silicone for perimeter and movement joints'
    ],
    steps: [
      { title: 'Assess and prepare the substrate', body: 'Concrete must be cured, sound and flat to within 3 mm over 2 m — grind high spots, fill lows with a floor leveller. Timber floors must be rigid and deflection-free; overlay with a tile underlay/cement sheet and use a decoupling membrane to absorb movement. In a wet area, waterproof first (see the waterproofing guide).' },
      { title: 'Prime the substrate', body: 'Apply the adhesive manufacturer\'s primer to seal porous substrates and improve the bond. Let it dry as specified.' },
      { title: 'Set out from the centre', body: 'Find the centre of the room, dry-lay tiles out to the walls, and adjust so you avoid thin slivers at the most visible edges. Snap chalk lines as guides. Plan so cut tiles fall at the least conspicuous edges.' },
      { title: 'Mix and comb the adhesive', body: 'Mix adhesive to a firm, smooth consistency and let it slake, then re-mix. Spread with the flat side, then comb with the notched side in one direction. Only cover an area you can tile before the adhesive skins (about 1 m²).' },
      { title: 'Lay the tiles with full coverage', body: 'Bed each tile with a slight twisting motion. Back-butter large-format and porcelain tiles to eliminate voids. Use spacers (and levelling clips for big tiles) and check flatness across several tiles with a straight edge as you go.' },
      { title: 'Cut the edges', body: 'Measure each perimeter gap individually and cut tiles to fit, allowing the perimeter expansion gap. Cut porcelain on a wet saw.' },
      { title: 'Let the adhesive cure', body: 'Stay off the floor and don\'t grout until the adhesive has cured (typically 24 hours, longer in cold conditions).' },
      { title: 'Grout and clean', body: 'Work flexible grout fully into the joints with the float held at 45°, then clean back with a damp sponge in stages, rinsing often. Polish off the haze once dry.' },
      { title: 'Silicone the perimeter and movement joints', body: 'Leave the perimeter gap and any movement joints free of grout and seal them with neutral-cure silicone — these joints must flex, and grout there will always crack.' }
    ],
    bestPractice: [
      'The substrate must be rigid and flat — a flexing floor cracks tiles and grout no matter how well you tile.',
      'Full adhesive coverage with no voids — back-butter large and porcelain tiles. A hollow under a tile is a future crack.',
      'Use a decoupling membrane over timber floors and where movement is likely.',
      'Silicone (not grout) at the perimeter and any movement joints.',
      'Set out to avoid thin cut slivers in the most visible areas.'
    ],
    commonMistakes: [
      'Tiling over a floor that flexes — tiles and grout crack within months.',
      'Voids under tiles from poor coverage — tiles crack underfoot or sound hollow.',
      'Grouting the perimeter instead of siliconing it — cracks at the walls.',
      'Grouting before the adhesive has cured — tiles shift.'
    ],
    safety: 'Cutting porcelain and stone releases silica dust — cut wet, wear a P2 mask and eye protection. Tiles and adhesive are heavy; lift with care. Kneel on a pad to protect your knees. Keep the wet saw\'s electrics clear of water.'
  },

  {
    id: 'waterproofing',
    category: 'Wet areas',
    title: 'Waterproof a bathroom or wet area',
    summary: 'Apply a tanking membrane before tiling so water can\'t reach the structure.',
    difficulty: 'Advanced',
    time: '1 day plus curing between coats',
    overview:
      'Waterproofing (tanking) is the membrane behind the tiles and fittings that stops water reaching the building structure. In New Zealand this is governed by Building Code clause E3 (internal moisture), and showers — particularly on upper floors or over living spaces — can have specific compliance and producer-statement requirements. A waterproofing failure causes hidden rot that is expensive to fix and can affect insurance, so confirm what your job requires before you start.',
    tools: [
      'Paintbrush and roller',
      'Scissors / utility knife (for reinforcing fabric)',
      'Notched trowel or spreader',
      'Bucket and mixing gear',
      'Clean rags'
    ],
    materials: [
      'A complete waterproofing membrane system (liquid-applied) — use one manufacturer\'s system throughout',
      'Reinforcing fabric / bandage for joints, corners and penetrations',
      'System primer',
      'Bond-breaker tape for movement junctions',
      'Waterstop angle for shower thresholds (where required)'
    ],
    steps: [
      { title: 'Confirm what the job requires', body: 'Check with your council whether your wet area needs a licensed applicator and a producer statement — this is common for showers, upper-floor bathrooms and tiled areas over living spaces. Don\'t assume a DIY membrane satisfies E3 for every situation.' },
      { title: 'Get the falls right first', body: 'In a shower or tiled floor with a waste, the substrate must already fall to the waste before you waterproof. A membrane cannot fix a flat or back-falling floor — water will pond. Correct the falls in the substrate first.' },
      { title: 'Prepare and prime', body: 'The substrate must be clean, dry, sound and dust-free. Apply the system primer and allow it to dry per the data sheet.' },
      { title: 'Install bond breakers and reinforcing', body: 'Fit bond-breaker tape at wall/floor and wall/wall junctions so the membrane can flex there. Embed reinforcing fabric into the membrane at all internal corners, junctions, the waste and every penetration (taps, mixer, waste) — these are the points that fail first.' },
      { title: 'Apply the membrane in full coats', body: 'Apply the membrane in the number of coats the system specifies, at the specified spread rate, with each coat fully covering and cured before the next. Take it up the walls to the required height (notably in and around showers) and over the hob/threshold.' },
      { title: 'Check and flood test', body: 'Inspect for thin spots, pinholes and missed corners and touch them up. Where practical, flood-test the floor for 24 hours to confirm it holds water before tiling.' },
      { title: 'Tile only once cured', body: 'Let the membrane fully cure before tiling over it. Tile adhesive and tiles then go directly onto the cured membrane.' }
    ],
    bestPractice: [
      'Falls to the waste must be built into the substrate before waterproofing — the membrane cannot create a fall.',
      'Reinforce every corner, junction and penetration with fabric — these are where leaks start.',
      'Use one manufacturer\'s complete system and follow its coats, spread rate and cure times exactly.',
      'Take the membrane up the walls to the required height in showers and wet zones.',
      'For showers and upper-floor wet areas, confirm whether a licensed applicator and producer statement are needed for E3 compliance.'
    ],
    commonMistakes: [
      'No fall to the waste — water ponds behind the tiles forever.',
      'Skipping corner and penetration reinforcing — the membrane splits at the junctions.',
      'Too few coats or thin spots — pinhole leaks.',
      'Tiling before the membrane has cured, or assuming DIY tanking meets E3 when the job legally needs a licensed applicator.'
    ],
    safety: 'Ventilate the room — some membranes give off solvent fumes. Follow the product data sheet precisely. Most importantly, a hidden waterproofing failure causes serious, costly structural damage and can void insurance — if your job needs a licensed waterproofer and a producer statement, use one. When in doubt, get it done professionally.'
  },

  // ===== EXTERIOR =====
  {
    id: 'exterior-painting',
    category: 'Exterior',
    title: 'Paint the exterior of a house',
    summary: 'Wash, prep, prime and coat exterior cladding with the right system and weather.',
    difficulty: 'Intermediate',
    time: 'Several days to weeks, weather-dependent',
    overview:
      'Exterior paint protects the cladding as much as it decorates it, so preparation and the right coating system matter even more than indoors. The job is mostly washing, scraping, repairing and priming; the colour goes on last. Work with the weather and the sun, top to bottom, and don\'t rush a wall in poor conditions.',
    tools: [
      'Water blaster or hose, brush and bucket',
      'Scrapers and sanding gear',
      'Ladders and, ideally, scaffold for the high work',
      'Quality brushes, rollers and extension poles',
      'Airless sprayer (optional, for large areas)',
      'Filler, sealant gun, drop sheets and masking'
    ],
    materials: [
      'House wash / sugar soap and mould treatment',
      'Exterior primer/sealer (plus rust-inhibiting primer for metal and knot sealer for timber)',
      'Quality exterior-grade acrylic topcoat',
      'Exterior filler and paintable sealant',
      'Masking film and tape'
    ],
    steps: [
      { title: 'Wash the whole surface', body: 'Wash off dirt, mould, salt and chalking — paint will not adhere to a dirty or chalky surface. Treat mould with a suitable wash and rinse. Let the cladding dry thoroughly (days, not hours, after washing).' },
      { title: 'Scrape, sand and repair', body: 'Scrape and sand back all flaking and failed paint to a sound edge. Replace rotten boards, re-fix loose ones, and fill holes and cracks with exterior filler. (On pre-1980 paint, follow lead-safe methods — no dry sanding or blasting without containment.)' },
      { title: 'Spot-prime bare areas', body: 'Prime all bare timber (seal knots), and apply rust-inhibiting primer to any bare metal and fixings. Unprimed bare areas and rusty nail heads bleed through and fail early.' },
      { title: 'Mask and protect', body: 'Mask windows, mask or remove fittings, and lay drop sheets over paths, decks and plants.' },
      { title: 'Seal gaps', body: 'After the first coat (or priming), run exterior paintable sealant into gaps around joinery and junctions — but never seal drainage paths or the underside of head flashings.' },
      { title: 'Coat top to bottom, in the shade', body: 'Cut in and coat working from the top of the wall down, following the shade around the house. Avoid painting in direct hot sun, high humidity, or when rain or heavy dew is expected within the drying window.' },
      { title: 'Apply two topcoats', body: 'Apply two full topcoats, respecting the recoat time on the can. Two coats give the colour depth and the protection the cladding needs.' },
      { title: 'Remove masking and clean up', body: 'Pull masking while the final coat is still slightly tacky, clean tools, and check the finished work for missed spots and runs.' }
    ],
    bestPractice: [
      'Wash first and let it dry fully — adhesion fails over dirt, mould and chalk.',
      'Don\'t paint in direct hot sun, in high humidity, or when rain/dew is due within the drying window — it causes lap marks and poor adhesion.',
      'Prime every bare area, seal knots, and rust-prime metal and fixings.',
      'Work top to bottom, following the shade around the building.',
      'Use a quality exterior system and apply two topcoats.'
    ],
    commonMistakes: [
      'Painting over a dirty, mouldy or chalky surface — it peels within a season.',
      'Painting in hot sun or before rain — lap marks, blistering and adhesion failure.',
      'Skipping primer on bare timber and metal — bleed-through and early failure.',
      'Sealing drainage paths or flashing undersides shut — traps water in the wall.'
    ],
    safety: 'Working at height is the major risk — use scaffold rather than over-reaching from ladders, secure ladders on firm ground, and never work near the eaves where the power service line connects without keeping well clear. Treat pre-1980 paint as lead-based: no dry sanding or water-blasting without proper containment and a respirator.'
  },

  {
    id: 'concrete-pad',
    category: 'Exterior',
    title: 'Lay a small concrete pad or path',
    summary: 'Form, pour and finish a small slab on a compacted base — shed bases, steps, paths.',
    difficulty: 'Intermediate',
    time: '1–2 days plus curing',
    overview:
      'A small concrete pad — a shed base, a step landing, a short path — is achievable for a careful DIYer. The work is in the base, the formwork and the finishing, and once the concrete is poured it sets on its own schedule, so preparation, a plan and enough helpers matter. Structural slabs (house floors, driveways carrying vehicles) need engineering and are not a DIY job.',
    tools: [
      'Spade, shovel and wheelbarrow',
      'Formwork timber, pegs and a hand saw',
      'Spirit level and string line',
      'Plate compactor (hire) for the base',
      'Screed board, bull float and hand float',
      'Edging trowel and a stiff broom',
      'Gloves, gumboots and eye protection'
    ],
    materials: [
      'Concrete — bagged mix for small pads, or ordered ready-mix for anything larger',
      'Basecourse / GAP hardfill for the sub-base',
      'Reinforcing mesh and chairs (where the pad needs it)',
      'Form timber and stakes',
      'Polythene (damp-proof membrane under a slab where required)',
      'Expansion-joint material for longer paths'
    ],
    steps: [
      { title: 'Set out and excavate', body: 'Mark the area and excavate to allow for the compacted base plus the slab thickness (about 100 mm of concrete is typical for light-duty pads). Keep the base depth consistent.' },
      { title: 'Lay and compact the base', body: 'Spread basecourse hardfill and compact it firmly with a plate compactor — a soft base is the main cause of cracking and sinking. Lay polythene over the base if a damp-proof membrane is required.' },
      { title: 'Build and brace the formwork', body: 'Set form timber to the finished height with a slight fall (about 1:50) for drainage, and brace it well with stakes — wet concrete is heavy and pushes the forms outward.' },
      { title: 'Place reinforcing if needed', body: 'Lay reinforcing mesh on chairs so it sits within the slab (not on the ground) where the pad requires it.' },
      { title: 'Pour and screed', body: 'Place the concrete, working it into the corners and tamping out air pockets. Screed it off level with the top of the forms using a straight board worked side to side. Don\'t add extra water to make it flow — that weakens the concrete and dusts the surface.' },
      { title: 'Float, edge and finish', body: 'Bull-float the surface, then wait for the bleed water to disappear before hand-floating and edging. Finish with a stiff broom drawn across for a non-slip surface.' },
      { title: 'Cure it slowly', body: 'Keep the slab damp or covered with polythene for several days. Slow curing is what gives concrete its strength — letting it dry out fast causes surface cracking and dusting. Strip the forms after a couple of days.' }
    ],
    bestPractice: [
      'A firm, well-compacted base is the foundation of a crack-free pad.',
      'Brace the formwork solidly — wet concrete will push out weak forms.',
      'Build in a fall (about 1:50) so water drains off the pad.',
      'Never add water on site to make the mix easier to place — it weakens the concrete and ruins the surface.',
      'Cure slowly: keep it moist for several days. Plan the pour with enough people to place and finish before it sets.'
    ],
    commonMistakes: [
      'Pouring onto a soft or uncompacted base — the slab cracks and sinks.',
      'Under-braced forms that bulge or blow out during the pour.',
      'Adding water to the mix — weak, dusty, low-strength concrete.',
      'Floating while bleed water is still on the surface, or skipping curing — surface defects and cracking.'
    ],
    safety: 'Wet concrete is caustic — wear gloves, gumboots and eye protection and wash any skin contact off immediately. Dry mix contains silica — wear a mask when mixing. Bags and barrows are heavy; lift with your legs. Plan the job so you are not caught out as the concrete goes off.'
  },

  {
    id: 'pergola',
    category: 'Exterior',
    title: 'Build a pergola',
    summary: 'Posts, beams and rafters for an open shade structure — freestanding or attached.',
    difficulty: 'Advanced',
    time: '2–3 weekends',
    overview:
      'A pergola is a frame of posts, beams and rafters that creates shade or supports climbing plants. A freestanding garden pergola is within reach of a confident DIYer; one attached to the house, or above a certain size, may require building consent and proper structural fixing to the building — check with your council. Footings, plumb posts and bracing are what keep it standing; even rafter spacing is what makes it look right.',
    tools: [
      'Post hole borer or spade',
      'Spirit level and string line',
      'Circular saw and a handsaw',
      'Cordless drill/driver and a socket set (for coach bolts)',
      'Framing square and clamps',
      'Ladder or trestles'
    ],
    materials: [
      'H4/H5 posts (e.g. 100 × 100)',
      'Beam timber (e.g. 190 × 45, often doubled)',
      'Rafter / cross-member timber',
      'Rapid-set concrete for footings',
      'Galvanised post anchors / bases (keep posts off the concrete)',
      'Coach bolts, structural screws and joist/rafter brackets',
      'Knee-brace timber for rigidity'
    ],
    steps: [
      { title: 'Plan size, height and position', body: 'Decide the footprint, height and post positions. Check council requirements and boundary setbacks — an attached or larger pergola may need consent. Plan rafter spacing for the look and the shade you want.' },
      { title: 'Set out square', body: 'Mark the post positions and check the layout is square using the 3-4-5 method and equal diagonals before you dig.' },
      { title: 'Set the posts', body: 'Concrete the posts into footings (or fix galvanised post anchors to an existing slab/footings), plumb in both planes and braced, and let the concrete cure. Galvanised anchors keep the post off the concrete so it doesn\'t sit in water and rot.' },
      { title: 'Cut posts to height', body: 'Run a level line around the posts at the finished height and cut them all to a consistent level.' },
      { title: 'Fix the beams', body: 'Lift the beams onto the posts and fix them with coach bolts or beam brackets (notching the posts gives a stronger seat). Keep the beams level.' },
      { title: 'Fit the rafters', body: 'Lay the rafters across the beams at even spacing and fix each with rafter brackets or skew screws. Consistent spacing is what makes a pergola look professional.' },
      { title: 'Add bracing', body: 'Fit knee braces at the post-to-beam joints (or cross-bracing) to stop the structure racking and to resist wind. A pergola without bracing leans over time.' },
      { title: 'Finish', body: 'Stain or oil the timber. Add battens, shade sail or a climbing plant as desired.' }
    ],
    bestPractice: [
      'Size the footings for the structure and the wind exposure — an under-footed pergola moves and leans.',
      'Keep posts plumb and braced until everything is fixed.',
      'Fit knee braces or cross-bracing to resist racking and wind — this is not optional on an open structure.',
      'Use galvanised post anchors so posts sit clear of standing water, and stainless/hot-dip fixings throughout.',
      'Space rafters evenly — it is the single biggest factor in how good the finished pergola looks.'
    ],
    commonMistakes: [
      'Under-sized footings — the pergola shifts and leans in wind.',
      'No bracing — the frame racks into a parallelogram over time.',
      'Posts in direct ground/water contact without proper treatment — rot at the base.',
      'Fixing an "attached" pergola to fascia or spouting rather than structural framing — it pulls away.'
    ],
    safety: 'Lifting and fixing beams overhead is the main risk — get help, support beams while you bolt them, and use a stable platform rather than over-reaching from a ladder. Locate underground services before digging footings. Wind loads on a pergola are real — brace it properly, and get consent and structural fixing for attached or large structures.'
  },

  // ===== CLADDING =====
  {
    id: 'weatherboard-repair',
    category: 'Cladding',
    title: 'Repair or replace damaged weatherboards',
    summary: 'Swap out a rotten or split board without disturbing the rest of the wall.',
    difficulty: 'Advanced',
    time: 'Half a day to a day per board',
    overview:
      'Individual damaged, split or rotten weatherboards can be replaced without re-cladding the whole wall. The skill is removing the damaged board without wrecking the boards above and below, repairing any building wrap or flashing behind it, and integrating the new board so the wall stays weathertight. Always find and fix the cause of the rot — a leak, splashback or ground contact — or the problem returns.',
    tools: [
      'Oscillating multi-tool or a fine handsaw',
      'Pry bar and a wide chisel',
      'Hammer and nail punch',
      'Cordless drill/driver',
      'Caulking gun',
      'Paintbrush',
      'Scaffold or a safely footed ladder'
    ],
    materials: [
      'Replacement weatherboard matching the profile and treatment (H3.1 minimum)',
      'Stainless steel nails',
      'Building wrap / flashing tape for repairs behind the board',
      'Exterior primer and topcoat to match',
      'Neutral-cure exterior sealant',
      'Timber preservative for cut ends'
    ],
    steps: [
      { title: 'Find the extent and the cause', body: 'Probe the board and surrounds to find how far the damage or rot goes, and identify where the water is getting in (a failed joint, a leaking flashing, splashback from the ground, paint failure). Fixing the board without fixing the cause just delays the next failure.' },
      { title: 'Release the damaged board', body: 'Cut along the length of the damaged board, and free the nails holding the board above it (the nails usually pin through into the board below). Work the board out without levering hard against the sound boards around it.' },
      { title: 'Check and repair behind', body: 'Inspect the building wrap and any flashing behind the gap. If the wrap is torn or the flashing is compromised, repair it with flashing tape / new underlay, shingle-lapped so water sheds outward. This hidden layer is what actually keeps the wall dry.' },
      { title: 'Prime the new board', body: 'Cut the replacement to length and prime every face, the back, and especially all cut ends with primer/preservative before fitting. End-grain left bare is where rot restarts.' },
      { title: 'Fit and fix the board', body: 'Slide the new board into place, maintaining the same overlap as the existing boards. Where it butts another board, cut a back-bevelled scarf so water sheds outward. Nail with stainless nails — one per stud — into the framing.' },
      { title: 'Seal and paint', body: 'Seal the butt joints and prime the nail heads, then paint the board to match the wall. Don\'t seal the bottom edges of the boards or any drainage paths.' }
    ],
    bestPractice: [
      'Find and fix the water source first — replacing the board alone won\'t stop the rot returning.',
      'Prime all faces and especially the end-grain of the new board before fitting.',
      'Repair the building wrap/flashing behind the board, shingle-lapped, before closing the wall up.',
      'Match the profile and treatment (H3.1 minimum), use stainless nails, and fix one nail per stud.',
      'Back-bevel butt joints so water sheds, and leave drainage paths and bottom edges unsealed.'
    ],
    commonMistakes: [
      'Replacing the board but not fixing the leak — the rot simply returns.',
      'Leaving cut ends and the back of the new board unprimed — it re-rots from the end-grain.',
      'Tearing the building wrap during removal and not repairing it.',
      'Using the wrong profile or treatment level, or over-nailing and splitting the board.'
    ],
    safety: 'Most weatherboard repairs are at height — use a scaffold or a properly footed ladder and don\'t over-reach. Treat pre-1980 paint as lead-based when sanding. Before plunge-cutting into a wall, consider what may be behind the cladding (wiring, pipes). Wear eye protection when cutting.'
  }
];

const CATEGORIES = [
  { name: 'Exterior', desc: 'Outside the home — fences, decks, cladding.' },
  { name: 'Cladding', desc: 'Weatherboards, sheet cladding, building wrap.' },
  { name: 'Walls & ceilings', desc: 'Plasterboard, stopping and finishing.' },
  { name: 'Insulation & energy', desc: 'Insulation and draught-proofing.' },
  { name: 'Interior trim', desc: 'Skirtings, architraves and trim work.' },
  { name: 'Interior', desc: 'Doors, painting and fit-out.' },
  { name: 'Joinery & restoration', desc: 'Restoring timber windows, doors and hardware.' },
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
  },

  async deleteAccount() {
    if (this.mode === 'supabase') {
      if (!this.cachedUser) throw new Error('Not signed in.');
      const { error } = await this.client.rpc('delete_account');
      if (error) throw new Error(error.message);
      try { await this.client.auth.signOut(); } catch (e) {}
      this.cachedUser = null;
      this.cachedProgress = {};
      return;
    }
    // Local mode — remove the user record and their progress.
    const s = STORE.session();
    if (s) {
      const users = STORE.users();
      delete users[s.email];
      STORE.saveUsers(users);
      const all = STORE.progress();
      delete all[s.email];
      STORE.saveProgress(all);
      STORE.saveSession(null);
    }
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

async function deleteAccount() {
  const msg = 'Permanently delete your account and all your data? This cannot be undone.';
  if (!confirm(msg)) return;
  if (!confirm('Are you absolutely sure? Your account and progress will be erased.')) return;
  try {
    await BACKEND.deleteAccount();
    alert('Your account has been deleted.');
    logout();
  } catch (e) {
    alert('Could not delete account: ' + (e.message || 'unknown error') + '\nPlease try again or contact support.');
  }
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
  renderCategoryFilters();
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

let activeCategory = 'All';

function setCategory(cat) {
  activeCategory = cat;
  renderCategoryFilters();
  renderHome();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderCategoryFilters() {
  const el = document.getElementById('cat-filters');
  if (!el) return;
  const cats = ['All'].concat(CATEGORIES.map(c => c.name));
  el.innerHTML = cats.map(c =>
    '<button class="cat-chip ' + (c === activeCategory ? 'active' : '') + '" onclick="setCategory(' +
    JSON.stringify(c).replace(/"/g, '&quot;') + ')">' + escapeHtml(c) + '</button>'
  ).join('');
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

  const words = query.split(/\s+/).filter(Boolean);
  const filtered = TASKS.filter(t => {
    if (activeCategory !== 'All' && t.category !== activeCategory) return false;
    if (!words.length) return true;
    const hay = (
      t.title + ' ' + t.summary + ' ' + t.category + ' ' + t.overview +
      (t.keywords ? ' ' + t.keywords.join(' ') : '')
    ).toLowerCase();
    return words.every(w => hay.includes(w));
  });

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

    ${renderOverviewIllustration(t)}

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
              ${renderStepDiagram(t, s, i)}
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

// ---------- DIAGRAMS / PHOTOS ----------
// Photo-first: each task shows a real photo if one exists at
//   photo-<task-id>.jpg            (overview / hero)
//   photo-<task-id>-<stepNumber>.jpg (per step)
// Until a photo is added, the technical diagram (or legacy PNG) shows as a
// placeholder. Photos are silently preloaded; if found, they replace the
// placeholder automatically — no code changes needed to add a photo.
function renderOverviewIllustration(t) {
  // Photo-only: show a real photo if one exists at photo-<id>.jpg, otherwise
  // nothing. Guides read as clean structured text until a photo is added.
  const photo = 'photo-' + t.id + '.jpg';
  return '<div class="illustration" id="ovr-' + t.id + '" style="display:none">' +
    '<img class="photo-preload" src="' + photo + '" alt="" ' +
    'onload="upgradeOverviewToPhoto(\'' + t.id + '\',\'' + photo + '\')" onerror="this.closest(\'.illustration\').remove()" />' +
    '</div>';
}

function upgradeOverviewToPhoto(taskId, photo) {
  const box = document.getElementById('ovr-' + taskId);
  if (!box) return;
  box.style.display = '';
  box.innerHTML = '<img src="' + photo + '" alt="" loading="lazy" />' +
    '<div class="illustration-caption">Tap to enlarge</div>';
  box.onclick = function () { openLightboxImage(photo); };
}

function renderStepDiagram(t, step, idx) {
  // Photo-only per step: shows photo-<id>-<n>.jpg if present, else nothing.
  const photo = 'photo-' + t.id + '-' + (idx + 1) + '.jpg';
  const slotId = 'stepvis-' + t.id + '-' + idx;
  return '<div class="step-diagram" id="' + slotId + '" style="display:none">' +
    '<img class="photo-preload" src="' + photo + '" alt="" ' +
    'onload="upgradeStepToPhoto(\'' + slotId + '\',\'' + photo + '\')" onerror="this.closest(\'.step-diagram\').remove()" />' +
    '</div>';
}

function upgradeStepToPhoto(slotId, photo) {
  const box = document.getElementById(slotId);
  if (!box) return;
  box.style.display = '';
  box.innerHTML = '<img src="' + photo + '" alt="" loading="lazy" />';
  box.onclick = function () { openLightboxImage(photo); };
}

// ---------- LIGHTBOX (pan + zoom) ----------
const LIGHTBOX = {
  el: null, content: null, scale: 1, tx: 0, ty: 0,
  pointers: new Map(), pinchStart: 0, scaleStart: 1,
  panStart: null, txStart: 0, tyStart: 0,
  init() {
    this.el = document.getElementById('lightbox');
    this.content = document.getElementById('lightbox-content');
    document.getElementById('lightbox-close').addEventListener('click', () => this.close());
    this.el.addEventListener('click', (e) => { if (e.target === this.el) this.close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.el.classList.contains('open')) this.close(); });
    // Pointer events for pan/zoom on the inner content
    this.el.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.el.addEventListener('pointermove', (e) => this.onPointerMove(e));
    this.el.addEventListener('pointerup', (e) => this.onPointerUp(e));
    this.el.addEventListener('pointercancel', (e) => this.onPointerUp(e));
    this.el.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
  },
  open(html) {
    this.content.innerHTML = html;
    this.scale = 1; this.tx = 0; this.ty = 0;
    this.applyTransform();
    this.el.classList.add('open');
  },
  close() {
    this.el.classList.remove('open');
    this.content.innerHTML = '';
    this.pointers.clear();
  },
  applyTransform() {
    const child = this.content.firstElementChild;
    if (child) child.style.transform = `translate(${this.tx}px, ${this.ty}px) scale(${this.scale})`;
  },
  onPointerDown(e) {
    if (e.target.id === 'lightbox-close' || e.target === this.el) return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 2) {
      const pts = Array.from(this.pointers.values());
      this.pinchStart = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      this.scaleStart = this.scale;
    } else if (this.pointers.size === 1) {
      this.panStart = { x: e.clientX, y: e.clientY };
      this.txStart = this.tx; this.tyStart = this.ty;
    }
    if (this.el.setPointerCapture) try { this.el.setPointerCapture(e.pointerId); } catch (_) {}
  },
  onPointerMove(e) {
    if (!this.pointers.has(e.pointerId)) return;
    this.pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this.pointers.size === 2) {
      const pts = Array.from(this.pointers.values());
      const d = Math.hypot(pts[1].x - pts[0].x, pts[1].y - pts[0].y);
      this.scale = Math.max(0.5, Math.min(6, this.scaleStart * (d / this.pinchStart)));
      this.applyTransform();
    } else if (this.pointers.size === 1 && this.panStart) {
      this.tx = this.txStart + (e.clientX - this.panStart.x);
      this.ty = this.tyStart + (e.clientY - this.panStart.y);
      this.applyTransform();
    }
  },
  onPointerUp(e) {
    this.pointers.delete(e.pointerId);
    if (this.pointers.size < 2) this.pinchStart = 0;
    if (this.pointers.size === 0) this.panStart = null;
  },
  onWheel(e) {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    this.scale = Math.max(0.5, Math.min(6, this.scale * factor));
    this.applyTransform();
  }
};

function openLightbox(diagramKey, taskId) {
  if (typeof DIAGRAMS === 'undefined' || !DIAGRAMS[taskId]) return;
  const d = DIAGRAMS[taskId];
  const svgStr = diagramKey === 'overview' ? d.overview : d[diagramKey];
  if (!svgStr) return;
  LIGHTBOX.open(svgStr);
}
function openLightboxImage(src) {
  LIGHTBOX.open(`<img src="${src}" alt="" />`);
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
  if (typeof LIGHTBOX !== 'undefined') LIGHTBOX.init();
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
