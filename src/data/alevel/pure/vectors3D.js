export const CHAPTER_META = {
  id: "alevel-vectors-3d",
  title: "Vectors in 3D",
  subtitle: "3D vector algebra, dot product, lines and skew lines",
  icon: "→",
  color: "#2563eb",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "vectors-3d-basics",
    icon: "→",
    title: "3D Vectors",
    subtitle: "Column vectors, magnitude and direction in 3D",
    color: "#2563eb",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Vectors in Three Dimensions

A **3D vector** can be written in component form or using unit vectors $\\mathbf{i}$, $\\mathbf{j}$, $\\mathbf{k}$:

$$\\mathbf{a} = \\begin{pmatrix}a_1\\\\a_2\\\\a_3\\end{pmatrix} = a_1\\mathbf{i} + a_2\\mathbf{j} + a_3\\mathbf{k}$$

### Magnitude

$$|\\mathbf{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}$$

### Unit Vector

$$\\hat{\\mathbf{a}} = \\frac{\\mathbf{a}}{|\\mathbf{a}|}$$

A unit vector has magnitude 1.

### Addition, Subtraction, Scalar Multiplication

These all work component-wise, exactly as in 2D:
$$\\mathbf{a} + \\mathbf{b} = \\begin{pmatrix}a_1+b_1\\\\a_2+b_2\\\\a_3+b_3\\end{pmatrix}, \\qquad k\\mathbf{a} = \\begin{pmatrix}ka_1\\\\ka_2\\\\ka_3\\end{pmatrix}$$

### Scalar (Dot) Product

$$\\mathbf{a}\\cdot\\mathbf{b} = a_1 b_1 + a_2 b_2 + a_3 b_3 = |\\mathbf{a}||\\mathbf{b}|\\cos\\theta$$

where $\\theta$ is the angle between the two vectors ($0 \\leq \\theta \\leq 180°$).

### Key Results from the Dot Product

- **Perpendicular vectors:** $\\mathbf{a}\\cdot\\mathbf{b} = 0$
- **Angle between vectors:** $\\cos\\theta = \\dfrac{\\mathbf{a}\\cdot\\mathbf{b}}{|\\mathbf{a}||\\mathbf{b}|}$
- **Parallel vectors:** $\\mathbf{b} = k\\mathbf{a}$ for some scalar $k$ (equivalent to $|\\cos\\theta|=1$)`,
    formulas: [
      { label: "Magnitude", formula: `|\\mathbf{a}|=\\sqrt{a_1^2+a_2^2+a_3^2}` },
      { label: "Dot product (component form)", formula: `\\mathbf{a}\\cdot\\mathbf{b}=a_1b_1+a_2b_2+a_3b_3` },
      { label: "Dot product (geometric form)", formula: `\\mathbf{a}\\cdot\\mathbf{b}=|\\mathbf{a}||\\mathbf{b}|\\cos\\theta` },
      { label: "Perpendicular condition", formula: `\\mathbf{a}\\cdot\\mathbf{b}=0` },
    ],
    example: {
      question:
        "Given $\\mathbf{a} = (2,\\,1,\\,-3)$ and $\\mathbf{b} = (1,\\,-2,\\,1)$, find $\\mathbf{a}\\cdot\\mathbf{b}$ and the angle between them.",
      steps: [
        "$\\mathbf{a}\\cdot\\mathbf{b} = (2)(1)+(1)(-2)+(-3)(1) = 2-2-3 = -3$.",
        "$|\\mathbf{a}| = \\sqrt{4+1+9} = \\sqrt{14}$.",
        "$|\\mathbf{b}| = \\sqrt{1+4+1} = \\sqrt{6}$.",
        "$\\cos\\theta = \\dfrac{-3}{\\sqrt{14}\\cdot\\sqrt{6}} = \\dfrac{-3}{\\sqrt{84}}$.",
        "$\\theta = \\arccos\\!\\left(\\dfrac{-3}{\\sqrt{84}}\\right) \\approx 109.1°$.",
      ],
      answer: "$\\mathbf{a}\\cdot\\mathbf{b} = -3$, $\\;\\theta \\approx 109.1°$",
    },
    practice: {
      question:
        "Show that $\\mathbf{a} = (3,\\,-1,\\,2)$ and $\\mathbf{b} = (1,\\,5,\\,1)$ are perpendicular, then find $|\\mathbf{a}+\\mathbf{b}|$.",
      hint: "Compute the dot product; if it equals zero the vectors are perpendicular.",
      solution:
        "$\\mathbf{a}\\cdot\\mathbf{b} = 3-5+2 = 0$ \\checkmark, so they are perpendicular. " +
        "$\\mathbf{a}+\\mathbf{b} = (4,\\,4,\\,3)$. " +
        "$|\\mathbf{a}+\\mathbf{b}| = \\sqrt{16+16+9} = \\sqrt{41}$.",
    },
  },
  {
    id: "line-3d",
    icon: "→",
    title: "Equation of a Line in 3D",
    subtitle: "Vector and Cartesian equations of lines, intersection",
    color: "#2563eb",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Vector Equation of a Line

The line through point $\\mathbf{a}$ in direction $\\mathbf{d}$ is:

$$\\mathbf{r} = \\mathbf{a} + t\\mathbf{d}, \\quad t \\in \\mathbb{R}$$

$t$ is a **scalar parameter**. Different values of $t$ give different points on the line.

### Equivalent Cartesian Form

$$\\frac{x - a_1}{d_1} = \\frac{y - a_2}{d_2} = \\frac{z - a_3}{d_3}$$

### Showing a Point Lies on a Line

Given a point $P$, find $t$ from one coordinate equation and verify it satisfies the remaining equations.

---

## Relationships Between Two Lines

Given lines $l_1: \\mathbf{r} = \\mathbf{a} + s\\mathbf{d_1}$ and $l_2: \\mathbf{r} = \\mathbf{b} + t\\mathbf{d_2}$:

| Relationship | Condition |
|---|---|
| **Parallel** | $\\mathbf{d_1} = k\\mathbf{d_2}$ for some scalar $k$ |
| **Intersecting** | System $\\mathbf{a}+s\\mathbf{d_1}=\\mathbf{b}+t\\mathbf{d_2}$ is consistent |
| **Skew** | Not parallel, and the system is inconsistent |

> Skew lines exist only in 3D — two lines can be neither parallel nor intersecting.

### Angle Between Two Lines

$$\\cos\\theta = \\frac{|\\mathbf{d_1}\\cdot\\mathbf{d_2}|}{|\\mathbf{d_1}||\\mathbf{d_2}|}$$

Use the absolute value so $\\theta$ is the acute angle between the lines.`,
    formulas: [
      { label: "Vector equation of line", formula: `\\mathbf{r}=\\mathbf{a}+t\\mathbf{d}` },
      {
        label: "Cartesian equation of line",
        formula: `\\frac{x-a_1}{d_1}=\\frac{y-a_2}{d_2}=\\frac{z-a_3}{d_3}`,
      },
      {
        label: "Angle between lines",
        formula: `\\cos\\theta=\\frac{|\\mathbf{d_1}\\cdot\\mathbf{d_2}|}{|\\mathbf{d_1}||\\mathbf{d_2}|}`,
      },
    ],
    example: {
      question:
        "Line $l$: $\\mathbf{r} = (1,\\,2,\\,-1) + t(2,\\,1,\\,3)$. Does the point $(5,\\,4,\\,5)$ lie on $l$?",
      steps: [
        "From the $x$-component: $1 + 2t = 5 \\Rightarrow t = 2$.",
        "Check $y$: $2 + 1(2) = 4$ \\checkmark.",
        "Check $z$: $-1 + 3(2) = 5$ \\checkmark.",
        "All three components are consistent, so the point lies on $l$.",
      ],
      answer: "Yes, $(5,\\,4,\\,5)$ lies on the line (at $t=2$).",
    },
    practice: {
      question:
        "Line 1: $\\mathbf{r} = (1,\\,0,\\,2) + s(1,\\,2,\\,-1)$. Line 2: $\\mathbf{r} = (3,\\,2,\\,0) + t(1,\\,-1,\\,2)$. Find the intersection or show the lines are skew.",
      hint: "Write out three simultaneous equations from the $x$, $y$, $z$ components and check for consistency.",
      solution:
        "Equations: (i) $1+s = 3+t$, (ii) $2s = 2-t$, (iii) $2-s = 2t$. " +
        "From (ii): $t = 2-2s$. Substitute into (i): $1+s = 3+(2-2s) = 5-2s$, so $3s = 4$, $s = \\tfrac{4}{3}$. " +
        "Then $t = 2 - \\tfrac{8}{3} = -\\tfrac{2}{3}$. " +
        "Check (iii): LHS $= 2 - \\tfrac{4}{3} = \\tfrac{2}{3}$; RHS $= 2\\left(-\\tfrac{2}{3}\\right) = -\\tfrac{4}{3}$. " +
        "$\\tfrac{2}{3} \\neq -\\tfrac{4}{3}$, so the system is inconsistent. The lines are **skew**.",
    },
  },
];
