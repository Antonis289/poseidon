WORKOUT_PLAN = {
    "monday": {
        "title": "Push + Core",
        "exercises": [
            {"name": "Bench Press", "sets": 4, "reps": "8-10", "notes": "Explosive up, controlled down"},
            {"name": "Incline Dumbbell Press", "sets": 3, "reps": "10-12", "notes": ""},
            {"name": "Dumbbell Shoulder Press", "sets": 4, "reps": "8-10", "notes": ""},
            {"name": "Lateral Raises", "sets": 3, "reps": "12-15", "notes": ""},
            {"name": "Tricep Dips", "sets": 4, "reps": "10-12", "notes": "Bodyweight or weighted"},
            {"name": "Plank", "sets": 3, "reps": "60s", "notes": ""},
            {"name": "Cable Woodchops", "sets": 3, "reps": "12 each side", "notes": ""},
        ]
    },
    "tuesday": {
        "title": "Pull + Swim",
        "exercises": [
            {"name": "Pull-Ups", "sets": 4, "reps": "8-10", "notes": "Controlled full range"},
            {"name": "Barbell Rows", "sets": 4, "reps": "8-10", "notes": ""},
            {"name": "Single-Arm Dumbbell Rows", "sets": 3, "reps": "10-12 each", "notes": ""},
            {"name": "Face Pulls", "sets": 3, "reps": "15", "notes": ""},
            {"name": "Barbell Curls", "sets": 3, "reps": "10-12", "notes": ""},
            {"name": "Hammer Curls", "sets": 3, "reps": "10-12 each", "notes": ""},
            {"name": "Swim Laps", "sets": 1, "reps": "20 min", "notes": "Freestyle — Bond's signature"},
        ]
    },
    "wednesday": {
        "title": "Legs + Conditioning",
        "exercises": [
            {"name": "Barbell Squat", "sets": 4, "reps": "8-10", "notes": "Upright torso"},
            {"name": "Romanian Deadlift", "sets": 4, "reps": "10", "notes": ""},
            {"name": "Leg Press", "sets": 3, "reps": "12", "notes": ""},
            {"name": "Walking Lunges", "sets": 3, "reps": "20 steps", "notes": ""},
            {"name": "Calf Raises", "sets": 4, "reps": "15-20", "notes": ""},
            {"name": "Interval Run", "sets": 6, "reps": "30s sprint / 90s walk", "notes": ""},
        ]
    },
    "thursday": {
        "title": "Push + Compound",
        "exercises": [
            {"name": "Military Press", "sets": 4, "reps": "8", "notes": "Strict form"},
            {"name": "Arnold Press", "sets": 3, "reps": "10-12", "notes": ""},
            {"name": "Push-Ups", "sets": 4, "reps": "Max", "notes": "Craig did hundreds daily"},
            {"name": "Dumbbell Flyes", "sets": 3, "reps": "12", "notes": ""},
            {"name": "Skull Crushers", "sets": 3, "reps": "10-12", "notes": ""},
            {"name": "Hanging Leg Raises", "sets": 4, "reps": "15", "notes": ""},
        ]
    },
    "friday": {
        "title": "Full Body + Swim",
        "exercises": [
            {"name": "Deadlift", "sets": 5, "reps": "5", "notes": "The king of all lifts"},
            {"name": "Chin-Ups", "sets": 4, "reps": "Max", "notes": ""},
            {"name": "Dips", "sets": 4, "reps": "Max", "notes": ""},
            {"name": "Farmer's Carry", "sets": 4, "reps": "40m", "notes": "Heavy dumbbells"},
            {"name": "Swim Laps", "sets": 1, "reps": "30 min", "notes": "Mixed strokes"},
        ]
    },
    "saturday": {
        "title": "Active Recovery",
        "exercises": [
            {"name": "Light Swim", "sets": 1, "reps": "20 min", "notes": "Easy pace"},
            {"name": "Yoga / Stretching", "sets": 1, "reps": "30 min", "notes": "Mobility work"},
            {"name": "Brisk Walk", "sets": 1, "reps": "45 min", "notes": ""},
        ]
    },
    "sunday": {
        "title": "Rest",
        "exercises": [
            {"name": "Full Rest", "sets": 0, "reps": "—", "notes": "Recovery is where gains happen"}
        ]
    }
}

STYLE_GUIDE = {
    "suits": [
        {
            "name": "Tom Ford 'Windsor' Suit",
            "description": "The iconic Casino Royale poker suit. Slim lapels, clean silhouette, charcoal grey. This is the definitive Bond look.",
            "budget": "Investment",
            "fit_tip": "Single-breasted, two-button. Jacket should hit mid-seat. Trousers break just once."
        },
        {
            "name": "Navy Hopsack Suit",
            "description": "Craig's go-to for lighter scenes. Breathable, textured weave. Pairs with white shirt and no tie for a modern Bond.",
            "budget": "Mid-range",
            "fit_tip": "Suppressed waist is essential. No excess fabric at the chest or arms."
        },
        {
            "name": "Light Grey Suit",
            "description": "Worn in the Montenegro scenes. Signals authority without aggression.",
            "budget": "Mid-range",
            "fit_tip": "Pair with white pocket square, folded flat — never puffed."
        }
    ],
    "casual": [
        {
            "name": "White Henley",
            "description": "The gym/beach staple. Craig's physique did the work — fit is everything.",
            "tip": "Fitted, not tight. Should show your work without screaming for attention."
        },
        {
            "name": "Dark Denim",
            "description": "Straight or slim cut, dark wash. No distressing — Bond doesn't do casual sloppily.",
            "tip": "Pair with a simple white or blue Oxford shirt."
        },
        {
            "name": "La Perla Grigioperla Swim Shorts",
            "description": "The beach shorts from Casino Royale's iconic emerging-from-the-ocean scene. Light blue, shorter cut.",
            "tip": "The cut matters: above the knee, not board shorts."
        }
    ],
    "accessories": [
        {
            "name": "Omega Seamaster Aqua Terra",
            "description": "Bond's watch of choice in Casino Royale. A tool watch with class.",
            "tip": "Wear on a metal bracelet. Never loose, never too tight."
        },
        {
            "name": "Dress Shoes",
            "description": "Black Oxford cap-toe. Full-brogue for country tweed looks.",
            "tip": "Shoes and belt match exactly. Always. No exceptions."
        },
        {
            "name": "No Tie (Sometimes)",
            "description": "Craig's Bond often skipped the tie with a well-fitted suit. It works only if everything else is perfect.",
            "tip": "Top button undone, no tie. Never with a loose collar."
        }
    ],
    "grooming": [
        {"name": "Haircut", "detail": "Short back and sides, slightly longer on top. No product excess — natural, clean."},
        {"name": "Stubble", "detail": "2-3 day light stubble. Trimmed with a guard (2mm). Clean neckline shaved sharp."},
        {"name": "Skin", "detail": "Moisturise daily. Craig's skin is clean but weathered — healthy, not pampered."},
        {"name": "Posture", "detail": "The most underrated style tip. Shoulders back, chin level. Craig stands like he owns every room."},
    ]
}

MINDSET_TIPS = [
    {
        "title": "Calculated Composure",
        "tip": "Bond never reacts — he responds. Before speaking or acting under pressure, pause one beat. That pause is what separates composed from reactive."
    },
    {
        "title": "Eye Contact",
        "tip": "Craig's Bond holds eye contact longer than comfortable. Not a stare — a steady gaze. Practice holding it 1-2 seconds past the natural break-off point."
    },
    {
        "title": "Economy of Words",
        "tip": "Bond says less than he knows. Silence communicates confidence. Cut every sentence to its sharpest form."
    },
    {
        "title": "Controlled Movement",
        "tip": "Casino Royale Bond moves with purpose. No fidgeting, no nervous energy. Slow down your movements 20% and you'll appear twice as commanding."
    },
    {
        "title": "Embrace Discomfort",
        "tip": "Craig trained through pain to build that physique. Bond is forged in adversity. Seek the hard thing daily — the cold shower, the harder lift, the difficult conversation."
    },
    {
        "title": "Dress the Part",
        "tip": "Craig said the suit changed his walk. What you wear changes how you carry yourself. Dress at your ceiling, not your floor."
    },
    {
        "title": "The Vesper Mindset",
        "tip": "Bond orders what he wants, precisely as he wants it. Know your preferences. Have opinions. Vagueness is the enemy of authority."
    },
]

COCKTAILS = [
    {
        "name": "The Vesper Martini",
        "origin": "Invented by Bond in Casino Royale (book and film)",
        "ingredients": [
            "3 measures Gordon's Gin",
            "1 measure Vodka",
            "½ measure Kina Lillet (use Lillet Blanc)",
            "Lemon peel twist"
        ],
        "method": "Shake (yes, shake) over cracked ice until ice cold. Strain into a chilled deep champagne goblet. Add the lemon peel.",
        "bond_note": "\"Shaken, not stirred\" was about the Vesper specifically — the vodka needed breaking down. Order this and mean it."
    },
    {
        "name": "Dry Vodka Martini",
        "origin": "Bond's general request throughout the series",
        "ingredients": [
            "2½ measures premium vodka (Grey Goose, Belvedere)",
            "½ measure dry vermouth",
            "Olive or lemon twist"
        ],
        "method": "Stir over ice 30 seconds until very cold. Strain into a frozen martini glass.",
        "bond_note": "Stirring keeps it silky and clear. The shaken version is for the Vesper — don't confuse them."
    },
    {
        "name": "Whisky on the Rocks",
        "origin": "Craig-era Bond's casual drink",
        "ingredients": [
            "2 measures Macallan 12 or Glenfiddich",
            "Large ice cube (single)"
        ],
        "method": "Pour over one large cube. No garnish. No fuss.",
        "bond_note": "One large cube melts slower, dilutes less. Know your whisky."
    }
]
