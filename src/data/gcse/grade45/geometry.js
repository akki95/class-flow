// FILE: src/data/gcse/grade45/geometry.js

export const CHAPTER_META = {
  id: "gcse-geometry-45",
  title: "Geometry & Measures",
  subtitle: "Area, volume, Pythagoras and basic trigonometry",
  icon: "📐",
  color: "#06b6d4",
  grade: "4-5",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "area-perimeter",
    icon: "▭",
    title: "Area & Perimeter",
    subtitle: "Area of 2D shapes including circles",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Perimeter** is the total distance around the outside of a shape. Add up all the side lengths.

**Area formulas for common shapes:**
$$\\text{Rectangle: } A = lw$$
$$\\text{Triangle: } A = \\frac{1}{2}bh$$
$$\\text{Parallelogram: } A = bh$$
$$\\text{Trapezium: } A = \\frac{1}{2}(a+b)h$$
$$\\text{Circle: } A = \\pi r^2$$

**Circumference of a circle:**
$$C = 2\\pi r \\quad \\text{or} \\quad C = \\pi d$$

**Composite shapes:** Split the shape into simpler parts, then add or subtract areas as needed.

For example, an L-shape can be split into two rectangles. A shaded region between two circles = big circle area − small circle area.

**Units:** Always check the units. Area is always in **square units** — $\\text{cm}^2$, $\\text{m}^2$, $\\text{mm}^2$, etc. If lengths are in cm, area is in $\\text{cm}^2$.`,
    formulas: [
      { label: "Rectangle area", latex: "A = lw" },
      { label: "Triangle area", latex: "A = \\frac{1}{2}bh" },
      { label: "Trapezium area", latex: "A = \\frac{1}{2}(a+b)h" },
      { label: "Circle area", latex: "A = \\pi r^2" },
      { label: "Circumference", latex: "C = 2\\pi r" },
    ],
    example: {
      question:
        "Find the area of a trapezium with parallel sides 8 cm and 12 cm, and a height of 5 cm.",
      steps: [
        { label: "Write the formula", math: "A = \\frac{1}{2}(a + b)h" },
        { label: "Substitute values", math: "A = \\frac{1}{2}(8 + 12) \\times 5" },
        { label: "Add the parallel sides", math: "A = \\frac{1}{2} \\times 20 \\times 5" },
        { label: "Calculate", math: "A = 50 \\text{ cm}^2" },
      ],
    },
    practice: {
      question:
        "A circle has a circumference of 31.4 cm. Find its area. Use π ≈ 3.14.",
      solution: [
        { step: "Write circumference formula", math: "C = 2\\pi r" },
        { step: "Substitute and solve for r", math: "31.4 = 2 \\times 3.14 \\times r \\Rightarrow r = \\frac{31.4}{6.28} = 5 \\text{ cm}" },
        { step: "Write area formula", math: "A = \\pi r^2" },
        { step: "Substitute r = 5", math: "A = \\pi \\times 5^2 = 25\\pi \\approx 78.5 \\text{ cm}^2" },
      ],
    },
  },
  {
    id: "volume",
    icon: "📦",
    title: "Volume & Surface Area",
    subtitle: "3D shapes: prisms, cylinders and composite solids",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Volume of a prism** = cross-sectional area × length.
A prism is any 3D shape with a uniform (constant) cross-section — e.g. triangular prism, cylinder, cuboid.

$$V_{\\text{prism}} = \\text{area of cross-section} \\times \\text{length}$$

**Specific volume formulas:**
$$\\text{Cuboid: } V = lwh$$
$$\\text{Cylinder: } V = \\pi r^2 h$$
$$\\text{Cone: } V = \\frac{1}{3}\\pi r^2 h$$
$$\\text{Sphere: } V = \\frac{4}{3}\\pi r^3$$

**Surface area** = sum of the areas of all faces.

**Cylinder surface area:**
$$SA = 2\\pi r^2 + 2\\pi r h$$
(two circular ends + curved surface)

**Sphere surface area:** $SA = 4\\pi r^2$

**Cone surface area (including base):** $SA = \\pi r^2 + \\pi r l$, where $l$ is the slant height.

**Units:** Volume is always in **cubic units** — $\\text{cm}^3$, $\\text{m}^3$, etc. Surface area is in square units — $\\text{cm}^2$, $\\text{m}^2$.`,
    formulas: [
      { label: "Prism volume", latex: "V = \\text{area} \\times \\text{length}" },
      { label: "Cylinder volume", latex: "V = \\pi r^2 h" },
      { label: "Cylinder surface area", latex: "SA = 2\\pi r^2 + 2\\pi r h" },
      { label: "Sphere volume", latex: "V = \\frac{4}{3}\\pi r^3" },
      { label: "Sphere surface area", latex: "SA = 4\\pi r^2" },
    ],
    example: {
      question:
        "Find the volume and surface area of a cylinder with radius 4 cm and height 10 cm. Give answers in terms of π and as decimals.",
      steps: [
        { label: "Volume formula", math: "V = \\pi r^2 h" },
        { label: "Substitute values", math: "V = \\pi \\times 4^2 \\times 10 = 160\\pi" },
        { label: "Volume as decimal", math: "V \\approx 502.7 \\text{ cm}^3" },
        { label: "Surface area formula", math: "SA = 2\\pi r^2 + 2\\pi r h" },
        { label: "Substitute values", math: "SA = 2\\pi(16) + 2\\pi(4)(10) = 32\\pi + 80\\pi = 112\\pi" },
        { label: "SA as decimal", math: "SA \\approx 351.9 \\text{ cm}^2" },
      ],
    },
    practice: {
      question:
        "A prism has a triangular cross-section with base 6 cm and height 4 cm. The prism is 9 cm long. Find its volume.",
      solution: [
        { step: "Area of triangular cross-section", math: "A = \\frac{1}{2} \\times 6 \\times 4 = 12 \\text{ cm}^2" },
        { step: "Volume of prism", math: "V = \\text{area} \\times \\text{length} = 12 \\times 9" },
        { step: "Calculate", math: "V = 108 \\text{ cm}^3" },
      ],
    },
  },
  {
    id: "pythagoras",
    icon: "△",
    title: "Pythagoras' Theorem",
    subtitle: "Finding sides in right-angled triangles",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "Circle of radius 5 — all points (x, y) where x² + y² = 25. This shows why Pythagoras gives the distance formula.",
    desmosExpressions: [{ id: "1", latex: "x^2+y^2=25" }],
    theory: `**Pythagoras' Theorem** applies only to **right-angled triangles**.

Label the sides:
- $c$ = **hypotenuse** — the longest side, always **opposite** the right angle.
- $a$ and $b$ = the two shorter sides.

$$a^2 + b^2 = c^2$$

**Finding the hypotenuse** (the longest side):
$$c = \\sqrt{a^2 + b^2}$$

**Finding a shorter side** (when you know the hypotenuse):
$$a = \\sqrt{c^2 - b^2}$$

**Step-by-step approach:**
1. Identify which side is the hypotenuse (opposite the right angle).
2. Decide whether you are finding the hypotenuse or a shorter side.
3. Square the known sides, add or subtract, then take the square root.

**Checking for right angles:** If $a^2 + b^2 = c^2$, then the triangle is right-angled.

**Common Pythagorean triples:** $3,4,5$ and $5,12,13$ and $8,15,17$ — useful for checking answers.`,
    formulas: [
      { label: "Pythagoras' Theorem", latex: "a^2 + b^2 = c^2" },
      { label: "Finding the hypotenuse", latex: "c = \\sqrt{a^2 + b^2}" },
      { label: "Finding a shorter side", latex: "a = \\sqrt{c^2 - b^2}" },
    ],
    example: {
      question:
        "Find the missing side (hypotenuse) in a right-angled triangle with legs 6 cm and 8 cm.",
      steps: [
        { label: "Write Pythagoras' theorem", math: "c^2 = a^2 + b^2" },
        { label: "Substitute values", math: "c^2 = 6^2 + 8^2 = 36 + 64" },
        { label: "Add", math: "c^2 = 100" },
        { label: "Square root both sides", math: "c = \\sqrt{100} = 10 \\text{ cm}" },
      ],
    },
    practice: {
      question:
        "A ladder 13 m long leans against a wall. The base of the ladder is 5 m from the wall. How high up the wall does the ladder reach?",
      solution: [
        { step: "The ladder is the hypotenuse", math: "c = 13, \\; b = 5" },
        { step: "Use formula for shorter side", math: "a = \\sqrt{c^2 - b^2} = \\sqrt{13^2 - 5^2}" },
        { step: "Calculate", math: "a = \\sqrt{169 - 25} = \\sqrt{144}" },
        { step: "Answer", math: "a = 12 \\text{ m}" },
      ],
    },
  },
  {
    id: "sohcahtoa",
    icon: "sin",
    title: "Basic Trigonometry (SOHCAHTOA)",
    subtitle: "sin, cos and tan in right-angled triangles",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Trigonometry** lets you find unknown sides or angles in **right-angled triangles**.

**Label the sides relative to the angle $\\theta$ you're working with:**
- **Hypotenuse (H):** longest side, opposite the right angle.
- **Opposite (O):** side directly opposite the angle $\\theta$.
- **Adjacent (A):** side next to angle $\\theta$ (not the hypotenuse).

**SOHCAHTOA:**
$$\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}} \\qquad \\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}} \\qquad \\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}$$

**Finding a side:** rearrange the chosen ratio. E.g. $\\text{Opp} = \\text{Hyp} \\times \\sin\\theta$.

**Finding an angle:** use the **inverse** function — $\\sin^{-1}$, $\\cos^{-1}$, $\\tan^{-1}$ — on your calculator.

**Exact values to memorise:**
| Angle | $\\sin$ | $\\cos$ | $\\tan$ |
|-------|---------|---------|---------|
| 30° | $\\frac{1}{2}$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{\\sqrt{3}}$ |
| 45° | $\\frac{1}{\\sqrt{2}}$ | $\\frac{1}{\\sqrt{2}}$ | 1 |
| 60° | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{2}$ | $\\sqrt{3}$ |`,
    formulas: [
      { label: "Sine ratio", latex: "\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}}" },
      { label: "Cosine ratio", latex: "\\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}}" },
      { label: "Tangent ratio", latex: "\\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}" },
    ],
    example: {
      question:
        "Find angle θ in a right-angled triangle where the opposite side is 5 cm and the hypotenuse is 10 cm.",
      steps: [
        { label: "We know Opp and Hyp, so use sin", math: "\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}} = \\frac{5}{10} = 0.5" },
        { label: "Use inverse sine", math: "\\theta = \\sin^{-1}(0.5)" },
        { label: "Answer", math: "\\theta = 30°" },
      ],
    },
    practice: {
      question:
        "A right-angled triangle has an angle of 35° and the adjacent side is 8 cm. Find the length of the opposite side.",
      solution: [
        { step: "We know Adj and want Opp, so use tan", math: "\\tan 35° = \\frac{\\text{Opp}}{8}" },
        { step: "Rearrange", math: "\\text{Opp} = 8 \\times \\tan 35°" },
        { step: "Evaluate (tan 35° ≈ 0.7002)", math: "\\text{Opp} = 8 \\times 0.7002 \\approx 5.60 \\text{ cm}" },
      ],
    },
  },
  {
    id: "angles",
    icon: "∠",
    title: "Angles in Polygons",
    subtitle: "Angles in triangles, quadrilaterals and polygons",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Basic angle facts:**
- Angles in a **triangle** = 180°
- Angles in a **quadrilateral** = 360°
- Angles on a **straight line** = 180°
- Angles around a **point** = 360°
- **Vertically opposite** angles are equal.

**Regular polygons** ($n$ sides):
$$\\text{Sum of interior angles} = (n - 2) \\times 180°$$
$$\\text{Interior angle} = \\frac{(n-2) \\times 180°}{n}$$
$$\\text{Exterior angle} = \\frac{360°}{n}$$

Note: interior angle + exterior angle = 180°.

**Parallel lines** — when a line crosses two parallel lines:
- **Alternate angles** (Z-angles): equal.
- **Corresponding angles** (F-angles): equal.
- **Co-interior angles** (C-angles): add up to 180°.

Always give a **reason** when answering angle problems.`,
    formulas: [
      { label: "Angle sum of triangle", latex: "\\text{angle sum} = 180°" },
      { label: "Sum of interior angles (polygon)", latex: "S = (n - 2) \\times 180°" },
      { label: "Interior angle (regular polygon)", latex: "= \\frac{(n-2) \\times 180°}{n}" },
      { label: "Exterior angle (regular polygon)", latex: "= \\frac{360°}{n}" },
    ],
    example: {
      question: "Find the interior angle of a regular hexagon.",
      steps: [
        { label: "A hexagon has n = 6 sides", math: "n = 6" },
        { label: "Sum of interior angles", math: "S = (6 - 2) \\times 180° = 4 \\times 180° = 720°" },
        { label: "Each interior angle (regular, so all equal)", math: "\\text{Interior angle} = \\frac{720°}{6} = 120°" },
      ],
    },
    practice: {
      question:
        "The exterior angle of a regular polygon is 24°. How many sides does the polygon have?",
      solution: [
        { step: "Use exterior angle formula", math: "\\text{Exterior angle} = \\frac{360°}{n}" },
        { step: "Rearrange for n", math: "n = \\frac{360°}{24°}" },
        { step: "Calculate", math: "n = 15 \\text{ sides}" },
      ],
    },
  },
  {
    id: "transformations",
    icon: "↔",
    title: "Transformations",
    subtitle: "Reflection, rotation, translation and enlargement",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `There are four types of transformation. Always **describe fully** — one word is never enough.

**Reflection**
Describe: the **mirror line** (e.g. $y = x$, $x = 3$, the $x$-axis).

**Rotation**
Describe: the **centre**, the **angle**, and the **direction** (clockwise or anticlockwise).

**Translation**
Describe: the **column vector** $\\begin{pmatrix} x \\\\ y \\end{pmatrix}$ where $x$ is the shift right and $y$ is the shift up.

**Enlargement**
Describe: the **centre of enlargement** and the **scale factor (SF)**.
- $SF > 1$: image is larger than object.
- $0 < SF < 1$: image is smaller than object.
- **Negative SF**: image is on the **opposite side** of the centre and inverted.

**Scale factor and area/volume:**
$$\\text{New area} = k^2 \\times \\text{original area}$$
$$\\text{New volume} = k^3 \\times \\text{original volume}$$

**Congruent shapes:** same shape **and** size — produced by reflections, rotations and translations.
**Similar shapes:** same shape, different size — produced by enlargements.`,
    formulas: [
      { label: "Translation vector", latex: "\\begin{pmatrix} x \\\\ y \\end{pmatrix}" },
      { label: "Area after enlargement", latex: "\\text{New area} = k^2 \\times \\text{original area}" },
      { label: "Volume after enlargement", latex: "\\text{New volume} = k^3 \\times \\text{original volume}" },
    ],
    example: {
      question:
        "Describe fully the single transformation that maps triangle A to triangle B, given that B is triangle A rotated 90° clockwise about the origin.",
      steps: [
        { label: "Type of transformation", math: "\\text{Rotation}" },
        { label: "Angle and direction", math: "90° \\text{ clockwise}" },
        { label: "Centre of rotation", math: "\\text{Centre } (0, 0)" },
      ],
    },
    practice: {
      question:
        "A shape has area 12 cm². It is enlarged by scale factor 3. What is the area of the enlarged shape?",
      solution: [
        { step: "Area scale factor = (length scale factor)²", math: "k^2 = 3^2 = 9" },
        { step: "Multiply original area by area scale factor", math: "\\text{New area} = 12 \\times 9" },
        { step: "Calculate", math: "\\text{New area} = 108 \\text{ cm}^2" },
      ],
    },
  },
];
