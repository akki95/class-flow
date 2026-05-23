export const CHAPTER_META = {
  id: "icse-9-trig-coord",
  title: "Trigonometry & Coordinate Geometry",
  subtitle: "Trig ratios for standard angles, Cartesian plane, distance and section formulae",
  icon: "📊",
  color: "#0ea5e9",
  tier: "Class 9",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "trig-ratios",
    icon: "📐",
    title: "Trigonometric Ratios",
    subtitle: "sin, cos, tan for standard angles and complementary angles",
    color: "#0ea5e9",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `In a **right-angled triangle** with angle $\\theta$:

$$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}, \\quad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}, \\quad \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$$

**Reciprocal ratios:**
$$\\csc\\theta = \\frac{1}{\\sin\\theta}, \\quad \\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\cot\\theta = \\frac{1}{\\tan\\theta}$$

**Standard angle values:**

| $\\theta$ | $0°$ | $30°$ | $45°$ | $60°$ | $90°$ |
|---|---|---|---|---|---|
| $\\sin$ | $0$ | $\\frac{1}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{\\sqrt{3}}{2}$ | $1$ |
| $\\cos$ | $1$ | $\\frac{\\sqrt{3}}{2}$ | $\\frac{1}{\\sqrt{2}}$ | $\\frac{1}{2}$ | $0$ |
| $\\tan$ | $0$ | $\\frac{1}{\\sqrt{3}}$ | $1$ | $\\sqrt{3}$ | $\\infty$ |

**Complementary angle relations:**
$$\\sin(90° - \\theta) = \\cos\\theta, \\quad \\cos(90° - \\theta) = \\sin\\theta$$
$$\\tan(90° - \\theta) = \\cot\\theta$$

**Fundamental identity:** $\\sin^2\\theta + \\cos^2\\theta = 1$`,
    formulas: [
      {
        label: "SOH-CAH-TOA",
        latex: "\\sin = \\frac{O}{H}, \\; \\cos = \\frac{A}{H}, \\; \\tan = \\frac{O}{A}",
      },
      {
        label: "Identity",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1",
      },
      {
        label: "Complementary",
        latex: "\\sin(90° - \\theta) = \\cos\\theta",
      },
    ],
    example: {
      question: "Without using tables, evaluate: $\\frac{\\sin 30° + \\cos 60°}{\\sin 60° + \\cos 30°}$",
      solution: `Substitute standard values:

$$\\frac{\\frac{1}{2} + \\frac{1}{2}}{\\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{3}}{2}} = \\frac{1}{\\sqrt{3}} = \\frac{\\sqrt{3}}{3}$$

$$= \\mathbf{\\frac{1}{\\sqrt{3}}} = \\frac{\\sqrt{3}}{3} \\approx 0.577$$`,
    },
    practice: {
      question: "If $\\sin(A + B) = 1$ and $\\cos(A - B) = \\frac{\\sqrt{3}}{2}$, find $A$ and $B$ (where $A > B$ and both are acute).",
      solution: `$\\sin(A + B) = 1 \\implies A + B = 90°$

$\\cos(A - B) = \\frac{\\sqrt{3}}{2} \\implies A - B = 30°$

Adding: $2A = 120° \\implies A = 60°$

Subtracting: $2B = 60° \\implies B = 30°$

$$\\mathbf{A = 60°, \\; B = 30°}$$

Check: $\\sin 90° = 1$ ✓, $\\cos 30° = \\frac{\\sqrt{3}}{2}$ ✓`,
    },
  },
  {
    id: "cartesian-plane",
    icon: "📊",
    title: "Coordinate Geometry Basics",
    subtitle: "Cartesian plane, distance formula and section formula",
    color: "#0ea5e9",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **Cartesian plane** has two perpendicular axes (x-axis and y-axis) meeting at the origin $O(0, 0)$.

**Four quadrants:**
- Q1: $(+, +)$, Q2: $(-, +)$, Q3: $(-, -)$, Q4: $(+, -)$

**Distance formula** — distance between $A(x_1, y_1)$ and $B(x_2, y_2)$:
$$AB = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

**Distance from origin:** $\\sqrt{x^2 + y^2}$

**Section formula** — point dividing $AB$ in ratio $m : n$:

**Internal division:**
$$P = \\left(\\frac{mx_2 + nx_1}{m + n}, \\; \\frac{my_2 + ny_1}{m + n}\\right)$$

**External division:**
$$P = \\left(\\frac{mx_2 - nx_1}{m - n}, \\; \\frac{my_2 - ny_1}{m - n}\\right)$$

**Mid-point formula** (special case $m : n = 1 : 1$):
$$M = \\left(\\frac{x_1 + x_2}{2}, \\; \\frac{y_1 + y_2}{2}\\right)$$

**Centroid** of triangle with vertices $(x_1, y_1), (x_2, y_2), (x_3, y_3)$:
$$G = \\left(\\frac{x_1 + x_2 + x_3}{3}, \\; \\frac{y_1 + y_2 + y_3}{3}\\right)$$`,
    formulas: [
      {
        label: "Distance",
        latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
      },
      {
        label: "Section (internal)",
        latex: "P = \\left(\\frac{mx_2 + nx_1}{m+n}, \\frac{my_2 + ny_1}{m+n}\\right)",
      },
      {
        label: "Mid-point",
        latex: "M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)",
      },
      {
        label: "Centroid",
        latex: "G = \\left(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3}\\right)",
      },
    ],
    example: {
      question: "Find the coordinates of the point dividing the line segment joining $A(2, 3)$ and $B(8, 9)$ in the ratio $2:1$ internally.",
      solution: `Using the section formula with $m = 2, n = 1$:

$$x = \\frac{2(8) + 1(2)}{2 + 1} = \\frac{16 + 2}{3} = \\frac{18}{3} = 6$$

$$y = \\frac{2(9) + 1(3)}{2 + 1} = \\frac{18 + 3}{3} = \\frac{21}{3} = 7$$

The point is $\\mathbf{(6, 7)}$.`,
    },
    practice: {
      question: "Show that the points $A(1, 1)$, $B(4, 4)$ and $C(7, 7)$ are collinear.",
      solution: `$$AB = \\sqrt{(4-1)^2 + (4-1)^2} = \\sqrt{9+9} = 3\\sqrt{2}$$

$$BC = \\sqrt{(7-4)^2 + (7-4)^2} = \\sqrt{9+9} = 3\\sqrt{2}$$

$$AC = \\sqrt{(7-1)^2 + (7-1)^2} = \\sqrt{36+36} = 6\\sqrt{2}$$

Since $AB + BC = 3\\sqrt{2} + 3\\sqrt{2} = 6\\sqrt{2} = AC$, the points are **collinear**. ✓`,
    },
  },
];
