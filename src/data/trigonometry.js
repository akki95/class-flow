export const trigonometryChapter = {
  title: "Trigonometry",
  subject: "Geometry & Trigonometry",
  satWeight: "≈15% / 5-7 questions",

  slides: [
    {
      id: "slide_1",
      type: "theory",
      title: "What is Trigonometry?",
      content: `Trigonometry studies the relationships between the sides and angles of right triangles. On the SAT, trig questions appear in the Geometry & Trigonometry domain and account for 5–7 questions.`,
      keyPoints: [
        "Applies to RIGHT triangles only (unless unit circle is involved)",
        "Three primary ratios: sin, cos, tan",
        "SAT tests both degree and radian understanding",
        "Special triangles (30-60-90, 45-45-90) are heavily tested"
      ]
    },
    {
      id: "slide_2",
      type: "theory",
      title: "The Three Primary Ratios",
      content: `Remember SOH-CAH-TOA:\n\n• sin(θ) = Opposite / Hypotenuse\n• cos(θ) = Adjacent / Hypotenuse\n• tan(θ) = Opposite / Adjacent\n\nThe hypotenuse is always opposite the right angle and is always the longest side.`,
      keyPoints: [
        "SOH → sin = Opposite/Hypotenuse",
        "CAH → cos = Adjacent/Hypotenuse",
        "TOA → tan = Opposite/Adjacent",
        "tan(θ) = sin(θ)/cos(θ)"
      ],
      formula: "sin²θ + cos²θ = 1  (Pythagorean Identity)"
    },
    {
      id: "slide_3",
      type: "theory",
      title: "Complementary Angle Identity",
      content: `A critical SAT identity: the sine of an angle equals the cosine of its complement.\n\nIf two angles add up to 90°, they are complementary.\n\nsin(x) = cos(90° − x)\ncos(x) = sin(90° − x)`,
      keyPoints: [
        "sin(30°) = cos(60°) = 0.5",
        "sin(45°) = cos(45°) = √2/2",
        "This identity is tested directly on the SAT",
        "Always check if angles in a problem sum to 90°"
      ],
      formula: "sin(θ) = cos(90° − θ)"
    },
    {
      id: "slide_4",
      type: "theory",
      title: "Special Right Triangles",
      content: `The SAT provides these in the reference sheet, but knowing them cold saves time.\n\n30-60-90 Triangle:\nSides in ratio 1 : √3 : 2\n• Opposite 30° = x\n• Opposite 60° = x√3\n• Hypotenuse = 2x\n\n45-45-90 Triangle:\nSides in ratio 1 : 1 : √2\n• Both legs = s\n• Hypotenuse = s√2`,
      keyPoints: [
        "30-60-90 ratio: 1 : √3 : 2",
        "45-45-90 ratio: 1 : 1 : √2",
        "Given one side, find all others",
        "These appear in almost every SAT geometry section"
      ]
    },
    {
      id: "slide_5",
      type: "theory",
      title: "Radians vs Degrees",
      content: `The SAT tests both degrees and radians. Know the key conversions:\n\n• 180° = π radians\n• 360° = 2π radians\n• To convert degrees → radians: multiply by π/180\n• To convert radians → degrees: multiply by 180/π`,
      keyPoints: [
        "π/6 = 30°",
        "π/4 = 45°",
        "π/3 = 60°",
        "π/2 = 90°"
      ],
      formula: "Radians = Degrees × (π/180)"
    },
    {
      id: "slide_6",
      type: "theory",
      title: "SAT Strategy for Trig",
      content: `How to approach any SAT trig question:\n\n1. Identify the right angle and label sides (O, A, H)\n2. Write down which ratio connects what you know to what you need\n3. Use SOH-CAH-TOA or the complementary identity\n4. Check special triangles before reaching for the calculator`,
      keyPoints: [
        "Label sides first — don't skip this step",
        "Write the ratio out before calculating",
        "Complementary identity eliminates calculator need",
        "Elimination works well on trig MCQs — plug in values"
      ]
    }
  ],

  questions: [
    {
      id: "q1",
      type: "mcq",
      difficulty: "easy",
      topic: "SOH-CAH-TOA",
      question: "In a right triangle, the side opposite angle θ has length 5, and the hypotenuse has length 13. What is sin(θ)?",
      options: ["A) 5/12", "B) 12/13", "C) 5/13", "D) 13/5"],
      correct: "C",
      explanation: "sin(θ) = Opposite/Hypotenuse = 5/13. The adjacent side is 12 (from 5-12-13 Pythagorean triple), so cos(θ) = 12/13 and tan(θ) = 5/12.",
      timeLimit: 60
    },
    {
      id: "q2",
      type: "mcq",
      difficulty: "easy",
      topic: "Complementary Identity",
      question: "If sin(x°) = cos(40°), what is the value of x?",
      options: ["A) 40", "B) 50", "C) 60", "D) 140"],
      correct: "B",
      explanation: "sin(x) = cos(90° − x). So cos(40°) = sin(50°). Therefore x = 50.",
      timeLimit: 60
    },
    {
      id: "q3",
      type: "mcq",
      difficulty: "medium",
      topic: "Special Triangles",
      question: "In a 30-60-90 triangle, the side opposite the 30° angle has length 7. What is the length of the hypotenuse?",
      options: ["A) 7", "B) 7√3", "C) 14", "D) 7√2"],
      correct: "C",
      explanation: "In a 30-60-90 triangle, sides are in ratio 1:√3:2. The side opposite 30° is x = 7, so the hypotenuse = 2x = 14.",
      timeLimit: 90
    },
    {
      id: "q4",
      type: "mcq",
      difficulty: "medium",
      topic: "SOH-CAH-TOA",
      question: "In right triangle ABC, angle C = 90°, BC = 8, and AC = 15. What is cos(A)?",
      options: ["A) 8/17", "B) 15/17", "C) 8/15", "D) 15/8"],
      correct: "B",
      explanation: "AB (hypotenuse) = √(8² + 15²) = √(64+225) = √289 = 17. cos(A) = Adjacent/Hypotenuse = AC/AB = 15/17.",
      timeLimit: 90
    },
    {
      id: "q5",
      type: "mcq",
      difficulty: "medium",
      topic: "Radians",
      question: "Which of the following is equivalent to sin(π/3)?",
      options: ["A) sin(30°)", "B) cos(30°)", "C) cos(60°)", "D) tan(45°)"],
      correct: "B",
      explanation: "π/3 = 60°. sin(60°) = √3/2. cos(30°) = √3/2. By the complementary identity, sin(60°) = cos(30°). Answer: B.",
      timeLimit: 90
    },
    {
      id: "q6",
      type: "mcq",
      difficulty: "hard",
      topic: "Complementary Identity",
      question: "If cos(2x + 10°) = sin(3x − 20°), what is the value of x?",
      options: ["A) 12", "B) 20", "C) 24", "D) 30"],
      correct: "C",
      explanation: "cos(A) = sin(B) when A + B = 90°. So (2x+10) + (3x−20) = 90 → 5x − 10 = 90 → 5x = 100 → x = 20. Wait — let's recheck: 5x = 100, x = 20. Check: cos(50°) = sin(40°)? 50+40=90 ✓. Answer: B) 20.",
      timeLimit: 120
    },
    {
      id: "q7",
      type: "grid",
      difficulty: "hard",
      topic: "Special Triangles",
      question: "In a 45-45-90 triangle, the hypotenuse has length 10. What is the length of each leg? (Enter the exact decimal rounded to the nearest tenth)",
      correct: "7.1",
      explanation: "Hypotenuse = s√2 = 10, so s = 10/√2 = 5√2 ≈ 7.071 ≈ 7.1",
      timeLimit: 120
    },
    {
      id: "q8",
      type: "mcq",
      difficulty: "hard",
      topic: "SOH-CAH-TOA",
      question: "In right triangle PQR, angle R = 90°. If tan(P) = 3/4, what is sin(P) + cos(Q)?",
      options: ["A) 6/5", "B) 7/5", "C) 3/5", "D) 8/5"],
      correct: "A",
      explanation: "tan(P) = Opposite/Adjacent = 3/4. Hypotenuse = 5 (3-4-5 triple). sin(P) = 3/5. Since P and Q are complementary, cos(Q) = sin(P) = 3/5. So sin(P) + cos(Q) = 3/5 + 3/5 = 6/5.",
      timeLimit: 120
    }
  ]
};