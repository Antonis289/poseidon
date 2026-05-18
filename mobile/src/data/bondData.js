export const WORKOUT_PLAN = {
  monday: {
    title: "Push + Core",
    focus: "Chest · Shoulders · Triceps",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-10", notes: "Explosive up, controlled 3-count down. This was Craig's primary chest builder." },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", notes: "" },
      { name: "Dumbbell Shoulder Press", sets: 4, reps: "8-10", notes: "" },
      { name: "Lateral Raises", sets: 3, reps: "12-15", notes: "Control the negative. No swinging." },
      { name: "Tricep Dips", sets: 4, reps: "10-12", notes: "Bodyweight or weighted. Full lockout at top." },
      { name: "Plank", sets: 3, reps: "60s", notes: "Squeeze glutes and core. Don't let hips drop." },
      { name: "Cable Woodchops", sets: 3, reps: "12 each side", notes: "Rotational core — critical for the swimmer's torso look." },
    ],
  },
  tuesday: {
    title: "Pull + Swim",
    focus: "Back · Biceps · Cardio",
    exercises: [
      { name: "Pull-Ups", sets: 4, reps: "8-10", notes: "Controlled full range. Dead hang at bottom. Craig did these daily." },
      { name: "Barbell Rows", sets: 4, reps: "8-10", notes: "Chest to bench, row to lower chest." },
      { name: "Single-Arm Dumbbell Rows", sets: 3, reps: "10-12 each", notes: "" },
      { name: "Face Pulls", sets: 3, reps: "15", notes: "Rear delts — keeps posture impeccable." },
      { name: "Barbell Curls", sets: 3, reps: "10-12", notes: "" },
      { name: "Hammer Curls", sets: 3, reps: "10-12 each", notes: "Brachialis development." },
      { name: "Swim Laps", sets: 1, reps: "20 min", notes: "Freestyle. Bond's signature. Builds shoulder width and the V-taper." },
    ],
  },
  wednesday: {
    title: "Legs + Conditioning",
    focus: "Quads · Hamstrings · Calves",
    exercises: [
      { name: "Barbell Squat", sets: 4, reps: "8-10", notes: "Upright torso. Knees track toes. Craig went deep." },
      { name: "Romanian Deadlift", sets: 4, reps: "10", notes: "Hamstring stretch at bottom, drive hips through at top." },
      { name: "Leg Press", sets: 3, reps: "12", notes: "High foot placement for glute emphasis." },
      { name: "Walking Lunges", sets: 3, reps: "20 steps", notes: "Add dumbbells when bodyweight feels easy." },
      { name: "Calf Raises", sets: 4, reps: "15-20", notes: "Full stretch at bottom. Pause at top." },
      { name: "Interval Run", sets: 6, reps: "30s sprint / 90s walk", notes: "The conditioning that kept Craig lean without losing muscle." },
    ],
  },
  thursday: {
    title: "Push + Compound",
    focus: "Shoulders · Chest · Core",
    exercises: [
      { name: "Military Press", sets: 4, reps: "8", notes: "Strict form — no leg drive. Builds the squared-off shoulder look." },
      { name: "Arnold Press", sets: 3, reps: "10-12", notes: "" },
      { name: "Push-Ups", sets: 4, reps: "Max", notes: "Craig reportedly did hundreds per day. Make them slow and controlled." },
      { name: "Dumbbell Flyes", sets: 3, reps: "12", notes: "Feel the stretch. Light-to-moderate weight only." },
      { name: "Skull Crushers", sets: 3, reps: "10-12", notes: "" },
      { name: "Hanging Leg Raises", sets: 4, reps: "15", notes: "Lower ab focus. No swinging." },
    ],
  },
  friday: {
    title: "Full Body + Swim",
    focus: "Compound Lifts · Endurance",
    exercises: [
      { name: "Deadlift", sets: 5, reps: "5", notes: "The king of all lifts. Heavy. This is where the back and glutes are built." },
      { name: "Chin-Ups", sets: 4, reps: "Max", notes: "Supinated grip — hits biceps harder than pull-ups." },
      { name: "Dips", sets: 4, reps: "Max", notes: "Go deep, press fully. Add weight in a belt when easy." },
      { name: "Farmer's Carry", sets: 4, reps: "40m", notes: "Heavy dumbbells. Builds the grip and thick trapezius Craig has." },
      { name: "Swim Laps", sets: 1, reps: "30 min", notes: "Mixed strokes. The swim is non-negotiable." },
    ],
  },
  saturday: {
    title: "Active Recovery",
    focus: "Mobility · Low Intensity",
    exercises: [
      { name: "Light Swim", sets: 1, reps: "20 min", notes: "Easy pace. Recovery, not training." },
      { name: "Yoga / Stretching", sets: 1, reps: "30 min", notes: "Hip flexors, thoracic spine, hamstrings. The lifts require mobility." },
      { name: "Brisk Walk", sets: 1, reps: "45 min", notes: "Bond walks. He doesn't amble." },
    ],
  },
  sunday: {
    title: "Rest",
    focus: "Recovery",
    exercises: [
      { name: "Full Rest", sets: 0, reps: "—", notes: "Recovery is where growth happens. Eat well. Sleep 8 hours." },
    ],
  },
};

export const STYLE_GUIDE = {
  suits: [
    {
      name: "Tom Ford 'Windsor' Suit",
      description: "The iconic Casino Royale poker suit. Slim lapels, clean silhouette, charcoal grey. This is the definitive Bond look — worn in the film's climactic scenes.",
      budget: "Investment",
      fit_tip: "Single-breasted, two-button. Jacket hits mid-seat. Trousers break just once at the shoe. Suppressed waist is non-negotiable.",
    },
    {
      name: "Navy Hopsack Suit",
      description: "Craig's go-to for lighter scenes. Breathable, textured weave. Pairs with a white shirt and no tie for a modern Bond.",
      budget: "Mid-range",
      fit_tip: "Suppressed waist. No excess fabric at chest or arms. Hopsack has texture — embrace it, don't fight it with pattern.",
    },
    {
      name: "Light Grey Suit",
      description: "Worn in the Montenegro scenes. Signals authority without aggression. Authority through restraint.",
      budget: "Mid-range",
      fit_tip: "Pair with white pocket square, folded flat — never puffed. White shirt only.",
    },
  ],
  casual: [
    {
      name: "White Henley",
      description: "The gym and beach staple. Craig's physique did the work — the Henley just framed it. Worn throughout Casino Royale's non-suit scenes.",
      tip: "Fitted, not tight. Should show your work without screaming for attention. Cotton or cotton-modal blend.",
    },
    {
      name: "Dark Denim",
      description: "Straight or slim cut, dark wash. No distressing — Bond doesn't do casual sloppily.",
      tip: "Pair with a simple white or mid-blue Oxford shirt. Roll the sleeves twice. Leather belt, no logo.",
    },
    {
      name: "La Perla Grigioperla Swim Shorts",
      description: "The beach shorts from Casino Royale's iconic emerging-from-the-ocean scene. Light blue, significantly shorter cut than modern board shorts.",
      tip: "Above the knee is the rule. The length is what makes them look sharp, not cheap.",
    },
  ],
  accessories: [
    {
      name: "Omega Seamaster Aqua Terra",
      description: "Bond's watch in Casino Royale. A tool watch with class — anti-magnetic, scratch-resistant, water resistant to 150m. The Seamaster Professional is the entry point.",
      tip: "Wear on metal bracelet. Sized so two fingers fit underneath. Never loose. The watch should sit on the wrist bone.",
    },
    {
      name: "Black Cap-Toe Oxford",
      description: "The foundational dress shoe. Full-brogue for tweed and country looks, plain cap-toe for suiting.",
      tip: "Shoes and belt match exactly, always. Polish regularly. Calf leather, not synthetic.",
    },
    {
      name: "No Tie (Done Right)",
      description: "Craig's Bond often skipped the tie with a well-fitted suit. It communicates confidence — but only when everything else is perfect.",
      tip: "Top button undone, collar lies flat. The collar should never be loose or flared. Only works with a slim-lapelled suit.",
    },
  ],
  grooming: [
    { name: "Haircut", detail: "Short back and sides, slightly longer on top. No product excess — natural, clean texture. Craig's hair sits without looking styled." },
    { name: "Stubble", detail: "2-3 day light stubble. Trimmed with a 2mm guard. Clean neckline shaved sharp — the definition line is everything." },
    { name: "Skin", detail: "Moisturise daily. SPF daily. Craig's skin is clean but weathered — healthy, not pampered. Exfoliate weekly." },
    { name: "Posture", detail: "The most underrated style element. Shoulders back, chin level, weight even. Craig stands like he owns every room he enters." },
    { name: "Nails", detail: "Clean, trimmed, not bitten. No length past the fingertip." },
  ],
};

export const MINDSET_TIPS = [
  {
    title: "Calculated Composure",
    tip: "Bond never reacts — he responds. Before speaking or acting under pressure, pause one beat. That single beat is what separates composed from reactive. Practice it in low-stakes moments so it's automatic under pressure.",
  },
  {
    title: "Eye Contact",
    tip: "Craig's Bond holds eye contact longer than is comfortable. Not a stare — a steady, interested gaze. Practice holding it 1-2 seconds past where you'd naturally look away. Done without aggression, it communicates complete confidence.",
  },
  {
    title: "Economy of Words",
    tip: "Bond says less than he knows. Silence communicates confidence. Every word you add beyond what's needed dilutes the impact of what came before it. Cut every sentence to its sharpest form.",
  },
  {
    title: "Controlled Movement",
    tip: "Casino Royale Bond moves with absolute purpose. No fidgeting. No nervous energy. Slow your physical movements down by 20% and you'll appear twice as commanding. Speed signals anxiety.",
  },
  {
    title: "Embrace Discomfort",
    tip: "Craig trained through significant physical pain to build that physique. Bond is forged in adversity, not comfort. Seek the difficult thing daily — the cold finish, the harder lift, the conversation you've been avoiding.",
  },
  {
    title: "Dress the Part",
    tip: "Craig said the suit physically changed how he walked. What you wear changes how you carry yourself — which changes how others respond to you. Dress at your ceiling, not your floor. Every day.",
  },
  {
    title: "The Vesper Mindset",
    tip: "Bond orders what he wants, precisely as he wants it, without apology. Know your preferences. Have opinions. Vagueness is the enemy of authority. People respect specificity.",
  },
  {
    title: "Preparation Over Improvisation",
    tip: "Craig's Bond appears effortless because he's prepared obsessively. The composure under pressure comes from having done the work beforehand. Improvisation is for those who haven't prepared.",
  },
  {
    title: "Physical Foundation",
    tip: "Craig's transformation wasn't vanity — it was architecture. When you're physically capable, everything else follows: posture, energy, confidence, how others perceive you. The body is the foundation.",
  },
];

export const COCKTAILS = [
  {
    name: "The Vesper Martini",
    origin: "Invented by Bond in Casino Royale — both Fleming's novel (1953) and Craig's film (2006)",
    ingredients: [
      "3 measures Gordon's Gin",
      "1 measure Vodka",
      "½ measure Kina Lillet (substitute: Lillet Blanc)",
      "Thin lemon peel twist",
    ],
    method: "Shake (yes, shake — not stir) vigorously over cracked ice until the shaker is almost too cold to hold. Double-strain into a chilled deep champagne goblet. Twist lemon peel over the surface to release the oils, run around the rim, drop in.",
    bond_note: "The 'shaken not stirred' instruction was specifically for this drink — the vodka needed diluting and the gin needed breaking down. Order this and mean every word of it.",
  },
  {
    name: "Dry Vodka Martini",
    origin: "Bond's general standing order across the series",
    ingredients: [
      "2½ measures premium vodka (Belvedere or Grey Goose)",
      "½ measure dry vermouth",
      "Olive or lemon twist",
    ],
    method: "Stir over ice for 30 seconds until very cold. Strain into a frozen martini glass. Olive or twist — pick one and be consistent.",
    bond_note: "Stirred keeps it silky and clear. The Vesper is shaken by design — this one is stirred. Know the difference before you order either.",
  },
  {
    name: "Whisky on the Rocks",
    origin: "Craig-era Bond's casual off-duty drink",
    ingredients: [
      "2 measures single malt (Macallan 12 or Glenfiddich 15)",
      "One large ice cube",
    ],
    method: "Pour over a single large cube. No garnish. No fuss. Let it sit 90 seconds before the first sip.",
    bond_note: "One large cube melts slower, dilutes less. Know your whisky before you order it. 'Scotch' alone tells a bartender nothing useful.",
  },
];

export const DAILY_TASKS = [
  { id: "workout", label: "Complete today's workout", icon: "barbell-outline" },
  { id: "mindset", label: "Read the daily directive", icon: "eye-outline" },
  { id: "cold", label: "Cold finish (60 seconds)", icon: "water-outline" },
  { id: "posture", label: "Posture check — shoulders back", icon: "body-outline" },
];

export const BOND_SYSTEM_PROMPT = `You are a personal transformation coach specialising in helping people embody the Daniel Craig James Bond persona from Casino Royale (2006).

Your expertise covers:
- Daniel Craig's exact training methodology with his trainer Simon Waterson: compound lifts, high-volume push/pull/legs splits, swimming, and interval conditioning
- The Casino Royale style aesthetic: Tom Ford suits, slim British tailoring, Omega Seamaster, understated luxury
- Craig's grooming: short textured hair, light stubble, clean confident skin
- The psychological makeup of Craig's Bond: composed, direct, quietly confident, economic with words
- Diet: high-protein, whole foods, moderate carbs around training, no junk
- Classic Bond cocktails starting with the Vesper Martini

Communication style:
- Be direct, confident, and concise — like Bond himself
- No filler or waffle. Every sentence earns its place.
- Treat the user as capable of achieving this transformation with the right guidance
- Use specific, actionable advice — not generalities
- When discussing workouts, be precise with sets, reps, and form cues
- When discussing style, reference specific items Craig wore on screen when relevant

You are NOT a generic fitness coach, a fashion blogger, or a Bond trivia bot. You are a precise transformation specialist.`;
