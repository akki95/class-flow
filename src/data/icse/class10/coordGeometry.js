export const CHAPTER_META = {
  id: "icse-10-coord-geometry",
  title: "Coordinate Geometry",
  subtitle: "Equation of a line, slope, section formula and distance formula",
  icon: "📊",
  color: "#0ea5e9",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "slope-equation-line",
    icon: "📈",
    title: "Slope & Equation of a Line",
    subtitle: "Gradient, slope-intercept form, point-slope form and two-point form",
    color: "#0ea5e9",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Slope (Gradient)** of a line through $(x_1, y_1)$ and $(x_2, y_2)$:
$$m = \\frac{y_2 - y_1}{x_2 - x_1}$$

**Slope of special lines:**
- Horizontal line: $m = 0$
- Vertical line: $m$ is undefined
- Line making angle $\\theta$ with positive x-axis: $m = \\tan\\theta$

**Forms of equation of a straight line:**

**Slope-intercept form:** $y = mx + c$ (where $c$ is the y-intercept)

**Point-slope form:** $y - y_1 = m(x - x_1)$

**Two-point form:** $\\frac{y - y_1}{y_2 - y_1} = \\frac{x - x_1}{x_2 - x_1}$

**Intercept form:** $\\frac{x}{a} + \\frac{y}{b} = 1$ (where $a$ = x-intercept, $b$ = y-intercept)

**General form:** $ax + by + c = 0$

**Parallel lines** have equal slopes: $m_1 = m_2$

**Perpendicular lines:** $m_1 \\times m_2 = -1$`,
    formulas: [
      {
        label: "Slope",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      },
      {
        label: "Slope-intercept",
        latex: "y = mx + c",
      },
      {
        label: "Point-slope",
        latex: "y - y_1 = m(x - x_1)",
      },
      {
        label: "Perpendicular condition",
        latex: "m_1 \\times m_2 = -1",
      },
    ],
    example: {
      question: "Find the equation of a line passing through $(3, -2)$ and perpendicular to the line $2x - 3y + 5 = 0$.",
      solution: `**Step 1:** Find slope of given line.
$2x - 3y + 5 = 0 \\implies y = \\frac{2}{3}x + \\frac{5}{3}$

Slope $m_1 = \\frac{2}{3}$

**Step 2:** Slope of perpendicular line:
$$m_2 = -\\frac{1}{m_1} = -\\frac{3}{2}$$

**Step 3:** Point-slope form through $(3, -2)$:
$$y - (-2) = -\\frac{3}{2}(x - 3)$$
$$y + 2 = -\\frac{3}{2}x + \\frac{9}{2}$$
$$2y + 4 = -3x + 9$$
$$\\mathbf{3x + 2y - 5 = 0}$$`,
    },
    practice: {
      question: "Find the equation of a line passing through the point $(1, 4)$ and parallel to the line $3x + 4y = 12$.",
      solution: `Slope of $3x + 4y = 12$: $y = -\\frac{3}{4}x + 3$, so $m = -\\frac{3}{4}$

Parallel line has same slope. Through $(1, 4)$:

$$y - 4 = -\\frac{3}{4}(x - 1)$$
$$4y - 16 = -3x + 3$$
$$\\mathbf{3x + 4y = 19}$$`,
    },
  },
  {
    id: "section-distance-10",
    icon: "📏",
    title: "Distance & Section Formula Applications",
    subtitle: "Collinearity, area of triangle, centroid and locus problems",
    color: "#0ea5e9",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Distance formula:**
$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$

**Section formula (internal division in ratio $m:n$):**
$$P = \\left(\\frac{mx_2 + nx_1}{m+n}, \\; \\frac{my_2 + ny_1}{m+n}\\right)$$

**Mid-point:** $\\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$

**Area of a triangle** with vertices $(x_1, y_1), (x_2, y_2), (x_3, y_3)$:
$$A = \\frac{1}{2}|x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)|$$

**Test for collinearity:** Three points are collinear if the area of the triangle they form is **zero**.

**Centroid:** $G = \\left(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3}\\right)$

**Finding the ratio in which a point divides a line:**
If point $P(x, y)$ divides $A(x_1,y_1)$ and $B(x_2,y_2)$ in ratio $k:1$:
$$x = \\frac{kx_2 + x_1}{k + 1}$$
Solve for $k$.`,
    formulas: [
      {
        label: "Area of triangle",
        latex: "A = \\frac{1}{2}|x_1(y_2-y_3) + x_2(y_3-y_1) + x_3(y_1-y_2)|",
      },
      {
        label: "Collinearity",
        latex: "\\text{Area} = 0 \\implies \\text{collinear}",
      },
      {
        label: "Centroid",
        latex: "G = \\left(\\frac{x_1+x_2+x_3}{3}, \\frac{y_1+y_2+y_3}{3}\\right)",
      },
    ],
    example: {
      question: "Find the area of the triangle with vertices $A(1, 2)$, $B(4, 6)$ and $C(7, 2)$.",
      solution: `$$A = \\frac{1}{2}|1(6-2) + 4(2-2) + 7(2-6)|$$

$$= \\frac{1}{2}|1(4) + 4(0) + 7(-4)|$$

$$= \\frac{1}{2}|4 + 0 - 28|$$

$$= \\frac{1}{2} \\times 24 = \\mathbf{12 \\text{ sq. units}}$$`,
    },
    practice: {
      question: "In what ratio does the point $(3, 5)$ divide the join of $(1, 3)$ and $(5, 7)$?",
      solution: `Let the ratio be $k : 1$.

$$3 = \\frac{k(5) + 1(1)}{k + 1} = \\frac{5k + 1}{k + 1}$$

$$3(k + 1) = 5k + 1$$
$$3k + 3 = 5k + 1$$
$$2 = 2k$$
$$k = 1$$

The ratio is $\\mathbf{1 : 1}$ (i.e., $(3, 5)$ is the mid-point).

Check: $\\frac{1+5}{2} = 3$ ✓, $\\frac{3+7}{2} = 5$ ✓`,
    },
  },
];
