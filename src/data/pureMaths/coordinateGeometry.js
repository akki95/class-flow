// FILE: src/data/pureMaths/coordinateGeometry.js

export const CHAPTER_META = {
  id: "coord-geometry",
  title: "Coordinate Geometry",
  subtitle: "Straight lines and circles",
  icon: "📍",
  color: "#34d399",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "straight-lines",
    icon: "/",
    title: "Straight Lines",
    subtitle: "Gradient, equation, midpoint, distance",
    color: "#34d399",
    visualization: null,
    desmosNote: "The perpendicular bisector of AB. Try moving the points.",
    desmosExpressions: [
      { id: "1", latex: "y=-x+8" },
      { id: "2", latex: "(1,3)" },
      { id: "3", latex: "(5,7)" },
    ],
    theory: `**Gradient** measures the steepness of a line between two points $(x_1, y_1)$ and $(x_2, y_2)$:

$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$

**Line equations:**
- Slope-intercept form: $y = mx + c$ (where $c$ is the $y$-intercept)
- Point-slope form: $y - y_1 = m(x - x_1)$ (use when you know the gradient and a point)

**Parallel & perpendicular lines:**
- Parallel lines have **equal gradients**: $m_1 = m_2$
- Perpendicular lines satisfy $m_1 \\times m_2 = -1$ — the gradient of a perpendicular line is the **negative reciprocal**

**Midpoint** of a segment joining $(x_1, y_1)$ and $(x_2, y_2)$:

$$M = \\left(\\frac{x_1 + x_2}{2},\\; \\frac{y_1 + y_2}{2}\\right)$$

**Distance** between two points:

$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$`,
    formulas: [
      { label: "Gradient", latex: "m = \\frac{y_2-y_1}{x_2-x_1}" },
      { label: "Line through point", latex: "y - y_1 = m(x - x_1)" },
      { label: "Distance", latex: "d = \\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}" },
      { label: "Midpoint", latex: "M = \\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)" },
      { label: "Perpendicular gradients", latex: "m_1 \\times m_2 = -1" },
    ],
    example: {
      question: "Find the equation of the perpendicular bisector of AB where A = (1, 3) and B = (5, 7).",
      steps: [
        { label: "Find midpoint M of AB", math: "M = \\left(\\frac{1+5}{2}, \\frac{3+7}{2}\\right) = (3, 5)" },
        { label: "Find gradient of AB", math: "m_{AB} = \\frac{7-3}{5-1} = \\frac{4}{4} = 1" },
        { label: "Perpendicular gradient", math: "m_{\\perp} = -\\frac{1}{1} = -1" },
        { label: "Equation through M(3, 5) with gradient −1", math: "y - 5 = -(x - 3)" },
        { label: "Simplify", math: "y = -x + 8" },
      ],
    },
    practice: {
      question:
        "A line passes through P(2, −1) and Q(−4, 5). Find: (a) the gradient of PQ, (b) the equation of PQ, (c) the equation of the line perpendicular to PQ passing through Q.",
      solution: [
        { step: "(a) Gradient of PQ", math: "m = \\frac{5-(-1)}{-4-2} = \\frac{6}{-6} = -1" },
        { step: "(b) Equation of PQ using point P(2, −1)", math: "y - (-1) = -1(x - 2) \\implies y = -x + 1" },
        { step: "(c) Perpendicular gradient", math: "m_{\\perp} = 1" },
        { step: "Line through Q(−4, 5)", math: "y - 5 = 1(x + 4) \\implies y = x + 9" },
      ],
    },
  },
  {
    id: "circles",
    icon: "○",
    title: "Circles",
    subtitle: "Equation of a circle, tangents, chords",
    color: "#34d399",
    visualization: null,
    desmosNote: "Circle with centre (3, −2) and radius 4. Try changing the values.",
    desmosExpressions: [
      { id: "1", latex: "(x-3)^2+(y+2)^2=16" },
      { id: "2", latex: "(3,-2)" },
    ],
    theory: `**Standard form** of a circle with centre $(a, b)$ and radius $r$:

$$(x - a)^2 + (y - b)^2 = r^2$$

**General (expanded) form:**

$$x^2 + y^2 + 2fx + 2gy + c = 0$$

Centre $= (-f,\\, -g)$ and radius $r = \\sqrt{f^2 + g^2 - c}$.
To convert, **complete the square** on $x$ and $y$.

**Key circle theorems used in A-Level:**
- The angle in a semicircle is $90°$ (angle subtended by a diameter)
- A **tangent** is perpendicular to the radius at the point of contact
- The perpendicular from the centre to a chord **bisects** the chord`,
    formulas: [
      { label: "Circle equation", latex: "(x-a)^2+(y-b)^2=r^2" },
      { label: "General form", latex: "x^2+y^2+2fx+2gy+c=0" },
      { label: "Centre (general form)", latex: "(-f,\\,-g)" },
      { label: "Radius (general form)", latex: "r=\\sqrt{f^2+g^2-c}" },
    ],
    example: {
      question: "Find the centre and radius of the circle $x^2 + y^2 - 6x + 4y - 3 = 0$.",
      steps: [
        { label: "Group x and y terms", math: "(x^2 - 6x) + (y^2 + 4y) = 3" },
        { label: "Complete the square in x", math: "(x - 3)^2 - 9" },
        { label: "Complete the square in y", math: "(y + 2)^2 - 4" },
        { label: "Combine", math: "(x-3)^2 - 9 + (y+2)^2 - 4 = 3 \\implies (x-3)^2+(y+2)^2=16" },
        { label: "State centre and radius", math: "\\text{Centre } (3,\\,-2),\\quad r = \\sqrt{16} = 4" },
      ],
    },
    practice: {
      question:
        "A circle has centre C(5, 2) and passes through A(2, −2). Find: (a) the radius, (b) the equation of the circle, (c) the equation of the tangent at A.",
      solution: [
        {
          step: "(a) Radius = distance CA",
          math: "r = \\sqrt{(5-2)^2+(2-(-2))^2} = \\sqrt{9+16} = 5",
        },
        { step: "(b) Equation", math: "(x-5)^2+(y-2)^2=25" },
        {
          step: "(c) Gradient of radius CA",
          math: "m_{CA} = \\frac{-2-2}{2-5} = \\frac{-4}{-3} = \\frac{4}{3}",
        },
        { step: "Tangent is perpendicular to radius", math: "m_{\\text{tan}} = -\\frac{3}{4}" },
        {
          step: "Tangent through A(2, −2)",
          math: "y + 2 = -\\tfrac{3}{4}(x-2) \\implies 4y + 8 = -3x + 6 \\implies 3x + 4y + 2 = 0",
        },
      ],
    },
  },
];
