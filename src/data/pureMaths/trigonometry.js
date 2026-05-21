// FILE: src/data/pureMaths/trigonometry.js

export const CHAPTER_META = {
  id: "trigonometry",
  title: "Trigonometry",
  subtitle: "Ratios, identities, equations and radians",
  icon: "〜",
  color: "#4ade80",
  videoUrl: "https://www.youtube.com/watch?v=OkYGhvKIYiE",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "sine-cosine-rule",
    icon: "△",
    title: "Sine & Cosine Rule",
    subtitle: "Non-right-angled triangles",
    color: "#4ade80",
    visualization: null,
    desmosNote: "Plot a general triangle and explore how the sine and cosine rules apply as you drag the vertices.",
    desmosExpressions: [],
    theory: `For any triangle with sides $a$, $b$, $c$ opposite to angles $A$, $B$, $C$ respectively:

**Sine Rule:**

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$$

Use when you know: two angles and a side, or two sides and a non-included angle.

**Cosine Rule:**

$$a^2 = b^2 + c^2 - 2bc\\cos A$$

Rearranged to find an angle:

$$\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$$

Use when you know: two sides and the included angle, or all three sides.

**Area of a triangle:**

$$\\text{Area} = \\frac{1}{2}ab\\sin C$$

**Ambiguous case:** When using the sine rule to find an angle (rather than a side), there may be **two valid solutions** — one acute and one obtuse. Always check whether the obtuse solution is geometrically possible.`,
    formulas: [
      { label: "Sine rule", latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}" },
      { label: "Cosine rule", latex: "a^2 = b^2+c^2-2bc\\cos A" },
      { label: "Cosine rule (angle)", latex: "\\cos A = \\frac{b^2+c^2-a^2}{2bc}" },
      { label: "Area", latex: "\\text{Area} = \\frac{1}{2}ab\\sin C" },
    ],
    example: {
      question:
        "In triangle ABC, AB = 8 cm, BC = 5 cm and angle B = 35°. Find AC.",
      steps: [
        { label: "Identify sides and angle: b = AC, a = BC = 5, c = AB = 8, angle B = 35°", math: "b^2 = a^2 + c^2 - 2ac\\cos B" },
        { label: "Substitute values", math: "AC^2 = 5^2 + 8^2 - 2(5)(8)\\cos 35°" },
        { label: "Evaluate", math: "AC^2 = 25 + 64 - 80(0.8192) = 89 - 65.53 = 23.47" },
        { label: "Square root", math: "AC = \\sqrt{23.47} \\approx 4.84 \\text{ cm}" },
      ],
    },
    practice: {
      question:
        "In triangle PQR, PQ = 7 cm, QR = 9 cm and angle P = 52°. Find angle R and the length PR.",
      solution: [
        { step: "Use the sine rule to find angle R", math: "\\frac{\\sin R}{PQ} = \\frac{\\sin P}{QR} \\implies \\frac{\\sin R}{7} = \\frac{\\sin 52°}{9}" },
        { step: "Solve for sin R", math: "\\sin R = \\frac{7\\sin 52°}{9} = \\frac{7 \\times 0.7880}{9} \\approx 0.6128 \\implies R \\approx 37.8°" },
        { step: "Find angle Q", math: "Q = 180° - 52° - 37.8° = 90.2°" },
        { step: "Use sine rule to find PR", math: "\\frac{PR}{\\sin Q} = \\frac{QR}{\\sin P} \\implies PR = \\frac{9\\sin 90.2°}{\\sin 52°} \\approx \\frac{9 \\times 1.000}{0.788} \\approx 11.4 \\text{ cm}" },
      ],
    },
  },
  {
    id: "trig-ratios",
    icon: "θ",
    title: "Trig Ratios & Exact Values",
    subtitle: "SOHCAHTOA and exact values",
    color: "#4ade80",
    visualization: null,
    desmosNote: "Use the unit circle in Desmos to visualise how sin and cos relate to coordinates at different angles.",
    desmosExpressions: [],
    theory: `**SOHCAHTOA** — in a right-angled triangle with angle $\\theta$:

$$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}, \\quad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}, \\quad \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$$

**Exact values to memorise:**

| Angle | $\\sin$ | $\\cos$ | $\\tan$ |
|-------|---------|---------|---------|
| $0°$ | $0$ | $1$ | $0$ |
| $30°$ | $\\dfrac{1}{2}$ | $\\dfrac{\\sqrt{3}}{2}$ | $\\dfrac{1}{\\sqrt{3}}$ |
| $45°$ | $\\dfrac{1}{\\sqrt{2}}$ | $\\dfrac{1}{\\sqrt{2}}$ | $1$ |
| $60°$ | $\\dfrac{\\sqrt{3}}{2}$ | $\\dfrac{1}{2}$ | $\\sqrt{3}$ |
| $90°$ | $1$ | $0$ | undefined |

These come from the 30-60-90 and 45-45-90 special triangles.`,
    formulas: [
      { label: "sin 30°", latex: "\\sin 30° = \\frac{1}{2}" },
      { label: "sin 45°", latex: "\\sin 45° = \\frac{1}{\\sqrt{2}}" },
      { label: "sin 60°", latex: "\\sin 60° = \\frac{\\sqrt{3}}{2}" },
      { label: "tan in terms of sin and cos", latex: "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}" },
    ],
    example: {
      question:
        "Without a calculator, find the exact value of $\\sin^2 60° + \\cos^2 30° + \\tan 45°$.",
      steps: [
        { label: "Substitute exact values", math: "\\left(\\frac{\\sqrt{3}}{2}\\right)^2 + \\left(\\frac{\\sqrt{3}}{2}\\right)^2 + 1" },
        { label: "Evaluate squares", math: "\\frac{3}{4} + \\frac{3}{4} + 1" },
        { label: "Add", math: "\\frac{6}{4} + 1 = \\frac{3}{2} + 1 = \\frac{5}{2}" },
      ],
    },
    practice: {
      question:
        "Without a calculator, find the exact value of $\\dfrac{4\\cos 30° - 2\\sin 60°}{\\tan 60°}$.",
      solution: [
        { step: "Substitute exact values", math: "\\frac{4 \\cdot \\dfrac{\\sqrt{3}}{2} - 2 \\cdot \\dfrac{\\sqrt{3}}{2}}{\\sqrt{3}}" },
        { step: "Simplify numerator", math: "\\frac{2\\sqrt{3} - \\sqrt{3}}{\\sqrt{3}} = \\frac{\\sqrt{3}}{\\sqrt{3}}" },
        { step: "Result", math: "= 1" },
      ],
    },
  },
  {
    id: "radians",
    icon: "rad",
    title: "Radians, Arc Length & Sector Area",
    subtitle: "Converting, arc length, sector area",
    color: "#4ade80",
    visualization: null,
    desmosNote: "In Desmos, switch angle mode to radians and plot $y = \\sin x$ to see one full period over $[0, 2\\pi]$.",
    desmosExpressions: [],
    theory: `**Radians** are an alternative unit for measuring angles. The full revolution is $2\\pi$ radians:

$$2\\pi \\text{ rad} = 360° \\implies \\pi \\text{ rad} = 180°$$

**Converting:**
- Degrees to radians: multiply by $\\dfrac{\\pi}{180}$
- Radians to degrees: multiply by $\\dfrac{180}{\\pi}$

**Arc length** (for a sector with radius $r$ and angle $\\theta$ in radians):

$$l = r\\theta$$

**Sector area:**

$$A = \\frac{1}{2}r^2\\theta$$

**Segment area** (sector minus the triangle):

$$A_{\\text{segment}} = \\frac{1}{2}r^2\\theta - \\frac{1}{2}r^2\\sin\\theta = \\frac{1}{2}r^2(\\theta - \\sin\\theta)$$`,
    formulas: [
      { label: "Conversion", latex: "1 \\text{ rad} = \\frac{180°}{\\pi}" },
      { label: "Arc length", latex: "l = r\\theta" },
      { label: "Sector area", latex: "A = \\frac{1}{2}r^2\\theta" },
      { label: "Segment area", latex: "A = \\frac{1}{2}r^2(\\theta - \\sin\\theta)" },
    ],
    example: {
      question:
        "A sector has radius 8 cm and area 40 cm². Find the angle $\\theta$ in radians and the arc length.",
      steps: [
        { label: "Use sector area formula", math: "\\frac{1}{2}r^2\\theta = 40 \\implies \\frac{1}{2}(64)\\theta = 40" },
        { label: "Solve for θ", math: "\\theta = \\frac{40}{32} = 1.25 \\text{ rad}" },
        { label: "Arc length", math: "l = r\\theta = 8 \\times 1.25 = 10 \\text{ cm}" },
      ],
    },
    practice: {
      question:
        "Convert 135° to radians, then find the arc length and sector area for a sector with radius 6 cm and angle 135°.",
      solution: [
        { step: "Convert to radians", math: "135 \\times \\frac{\\pi}{180} = \\frac{3\\pi}{4} \\text{ rad}" },
        { step: "Arc length", math: "l = 6 \\times \\frac{3\\pi}{4} = \\frac{18\\pi}{4} = \\frac{9\\pi}{2} \\approx 14.1 \\text{ cm}" },
        { step: "Sector area", math: "A = \\frac{1}{2}(36)\\cdot\\frac{3\\pi}{4} = \\frac{27\\pi}{2} \\approx 42.4 \\text{ cm}^2" },
      ],
    },
  },
  {
    id: "trig-identities",
    icon: "≡",
    title: "Trigonometric Identities",
    subtitle: "Pythagorean identities",
    color: "#4ade80",
    visualization: null,
    desmosNote: "Plot $y = \\sin^2 x + \\cos^2 x$ in Desmos — it is a horizontal line at $y = 1$, confirming the identity.",
    desmosExpressions: [],
    theory: `**Two key identities at AS Level:**

1. **Pythagorean identity:**

$$\\sin^2\\theta + \\cos^2\\theta \\equiv 1$$

Derived forms:
$$\\sin^2\\theta \\equiv 1 - \\cos^2\\theta \\qquad \\cos^2\\theta \\equiv 1 - \\sin^2\\theta$$

2. **Quotient identity:**

$$\\tan\\theta \\equiv \\frac{\\sin\\theta}{\\cos\\theta}$$

**Proving identities:** Work on **one side only** (usually the more complicated side) and manipulate it using known identities until it matches the other side. Never "cross-multiply" or assume the result in your working.`,
    formulas: [
      { label: "Pythagorean identity", latex: "\\sin^2\\theta + \\cos^2\\theta \\equiv 1" },
      { label: "Quotient identity", latex: "\\tan\\theta \\equiv \\frac{\\sin\\theta}{\\cos\\theta}" },
      { label: "Derived (sin²)", latex: "\\sin^2\\theta \\equiv 1 - \\cos^2\\theta" },
      { label: "Derived (cos²)", latex: "\\cos^2\\theta \\equiv 1 - \\sin^2\\theta" },
    ],
    example: {
      question: "Show that $\\dfrac{1 - \\sin^2\\theta}{\\cos\\theta} \\equiv \\cos\\theta$.",
      steps: [
        { label: "Start with LHS", math: "\\frac{1 - \\sin^2\\theta}{\\cos\\theta}" },
        { label: "Replace $1 - \\sin^2\\theta$ using the Pythagorean identity", math: "= \\frac{\\cos^2\\theta}{\\cos\\theta}" },
        { label: "Cancel one factor of $\\cos\\theta$", math: "= \\cos\\theta = \\text{RHS} \\checkmark" },
      ],
    },
    practice: {
      question:
        "Show that $(\\sin\\theta + \\cos\\theta)^2 \\equiv 1 + 2\\sin\\theta\\cos\\theta$. Also show that $\\dfrac{1-\\cos^2\\theta}{\\sin\\theta} \\equiv \\sin\\theta$.",
      solution: [
        { step: "Expand the LHS of the first identity", math: "\\sin^2\\theta + 2\\sin\\theta\\cos\\theta + \\cos^2\\theta" },
        { step: "Apply $\\sin^2\\theta + \\cos^2\\theta = 1$", math: "= 1 + 2\\sin\\theta\\cos\\theta = \\text{RHS} \\checkmark" },
        { step: "Second identity — start with LHS", math: "\\frac{1 - \\cos^2\\theta}{\\sin\\theta} = \\frac{\\sin^2\\theta}{\\sin\\theta}" },
        { step: "Cancel one $\\sin\\theta$", math: "= \\sin\\theta = \\text{RHS} \\checkmark" },
      ],
    },
  },
  {
    id: "trig-equations",
    icon: "π",
    title: "Trigonometric Equations",
    subtitle: "Solving equations in given intervals",
    color: "#4ade80",
    visualization: null,
    desmosNote: "Plot $y = 2\\cos^2 x - \\cos x - 1$ and see where it crosses $y = 0$ in $[0°, 360°]$.",
    desmosExpressions: [],
    theory: `**Strategy for solving trig equations:**

1. Rearrange to get a single trig function = constant (or factorise).
2. Find the **principal value** using your calculator (or exact values).
3. Use the **CAST diagram** or symmetry of the unit circle to find ALL solutions in the given interval.

**Finding additional solutions:**
- $\\sin\\theta = k$: solutions are $\\theta$ and $180° - \\theta$ in $[0°, 360°]$ (if $\\theta \\in$ Q1)
- $\\cos\\theta = k$: solutions are $\\theta$ and $360° - \\theta$
- $\\tan\\theta = k$: solutions are $\\theta$ and $\\theta + 180°$

**CAST diagram:** going anticlockwise from Q1 — **A**ll (Q1), **S**in (Q2), **T**an (Q3), **C**os (Q4) are positive.

**Compound/substitution equations:** if the argument is $2\\theta$, $\\theta + 30°$ etc., substitute $u = 2\\theta$ (or similar) and **extend the interval** accordingly before finding solutions.`,
    formulas: [
      { label: "Sine symmetry", latex: "\\sin\\theta = \\sin(180° - \\theta)" },
      { label: "Cosine symmetry", latex: "\\cos\\theta = \\cos(360° - \\theta)" },
      { label: "Tangent period", latex: "\\tan\\theta = \\tan(\\theta + 180°)" },
      { label: "CAST reminder", latex: "\\text{All} \\to \\text{Sin} \\to \\text{Tan} \\to \\text{Cos (Q1 to Q4)}", note: "Positive functions per quadrant" },
    ],
    example: {
      question: "Solve $2\\cos^2\\theta - \\cos\\theta - 1 = 0$ for $0° \\leq \\theta \\leq 360°$.",
      steps: [
        { label: "Let $c = \\cos\\theta$ and factorise", math: "2c^2 - c - 1 = (2c + 1)(c - 1) = 0" },
        { label: "Two cases", math: "\\cos\\theta = -\\tfrac{1}{2} \\quad \\text{or} \\quad \\cos\\theta = 1" },
        { label: "Solve $\\cos\\theta = -\\tfrac{1}{2}$ (Q2 and Q3)", math: "\\theta = 120°,\\; 240°" },
        { label: "Solve $\\cos\\theta = 1$", math: "\\theta = 0°,\\; 360°" },
        { label: "All solutions", math: "\\theta = 0°,\\;120°,\\;240°,\\;360°" },
      ],
    },
    practice: {
      question: "Solve $\\sin 2\\theta = \\cos\\theta$ for $0° \\leq \\theta \\leq 360°$.",
      solution: [
        { step: "Use double angle: $\\sin 2\\theta = 2\\sin\\theta\\cos\\theta$", math: "2\\sin\\theta\\cos\\theta - \\cos\\theta = 0" },
        { step: "Factorise", math: "\\cos\\theta(2\\sin\\theta - 1) = 0" },
        { step: "Case 1: $\\cos\\theta = 0$", math: "\\theta = 90°,\\;270°" },
        { step: "Case 2: $\\sin\\theta = \\tfrac{1}{2}$", math: "\\theta = 30°,\\;150°" },
        { step: "All solutions", math: "\\theta = 30°,\\;90°,\\;150°,\\;270°" },
      ],
    },
  },
];
