export const CHAPTER_META = {
  id: "gcse-geometry-89",
  title: "Geometry",
  subtitle: "Grade 8–9 Higher Geometry",
  icon: "📐",
  color: "#ef4444",
  grade: "8-9",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "circle-theorems-proof",
    icon: "○",
    title: "Circle Theorems Proof",
    subtitle: "Proving circle theorem results algebraically",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `At Grade 8–9 you may need to **prove** circle theorems, not just use them.

**Key proof approach:**
- Use **isosceles triangles** (two radii are always equal).
- Use angle properties of triangles and straight lines.

**Proof of "angle at centre = 2 × angle at circumference":** Draw a radius to the point on the circumference. The two smaller triangles formed are isosceles (equal radii). Use exterior angle of a triangle to show the central angle is double the circumferential angle.

**Proof of "opposite angles in a cyclic quadrilateral sum to 180°":** Apply the angle-at-centre theorem to each arc and use the fact that angles at a point sum to 360°.`,
    formulas: [
      {
        label: "Isosceles triangle (two equal radii)",
        value: "Base angles are equal",
      },
      { label: "Angle sum of triangle", value: "$180°$" },
      { label: "Angles on a straight line", value: "$180°$" },
      { label: "Angles at a point", value: "$360°$" },
    ],
    example: {
      question: "Prove that the angle in a semicircle is 90°.",
      solution: `Let $O$ be the centre and $AB$ a diameter.

The angle $\\angle AOB = 180°$ (straight line).

By the angle at centre theorem, $\\angle ACB = \\tfrac{1}{2} \\times 180° = \\mathbf{90°}$. ✓`,
    },
    practice: {
      question:
        "Prove that opposite angles of a cyclic quadrilateral sum to 180°.",
      solution: `Let the reflex angle $\\angle AOC = 2p$ and the non-reflex angle $\\angle AOC = 2q$, where $O$ is the centre.

$$2p + 2q = 360° \\quad (\\text{angles at a point})$$
$$\\therefore\\; p + q = 180°$$

By the angle at centre theorem, $\\angle ABC = p$ and $\\angle ADC = q$.

$$\\therefore\\; \\angle ABC + \\angle ADC = 180°\\qquad ✓$$`,
    },
  },
  {
    id: "vector-proof",
    icon: "→",
    title: "Vector Proof",
    subtitle: "Proving geometric properties using vectors",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Vector proofs** show geometric properties (parallel lines, midpoints, collinearity) algebraically.

**Method:**
1. Express all vectors in terms of base vectors $\\mathbf{a}$ and $\\mathbf{b}$.
2. Find each required vector by choosing a valid route.
3. Simplify and compare.

**Parallel vectors:** one is a scalar multiple of the other, e.g. $\\overrightarrow{AB} = k\\,\\overrightarrow{CD}$.

**Collinear points:** $\\overrightarrow{AB} = k\\,\\overrightarrow{AC}$ (same direction **and** share point $A$).

**Midpoint:** midpoint of $AC$ has position vector $\\dfrac{\\mathbf{a}+\\mathbf{c}}{2}$.

Always state your conclusion with a geometric reason.`,
    formulas: [
      {
        label: "Parallel",
        value:
          "$\\overrightarrow{AB} = k\\,\\overrightarrow{CD}$ for some scalar $k$",
      },
      {
        label: "Collinear",
        value:
          "Share a common point AND $\\overrightarrow{AB}$ is parallel to $\\overrightarrow{AC}$",
      },
      {
        label: "Midpoint position vector",
        value: "$\\dfrac{\\mathbf{a}+\\mathbf{b}}{2}$",
      },
    ],
    example: {
      question:
        "$\\overrightarrow{OA}=\\mathbf{a}$, $\\overrightarrow{OB}=\\mathbf{b}$. $M$ is the midpoint of $AB$. Show that $\\overrightarrow{OM}=\\tfrac{1}{2}(\\mathbf{a}+\\mathbf{b})$.",
      solution: `$$\\overrightarrow{OM} = \\overrightarrow{OA} + \\overrightarrow{AM} = \\mathbf{a} + \\tfrac{1}{2}\\overrightarrow{AB}$$

$$= \\mathbf{a} + \\tfrac{1}{2}(\\mathbf{b}-\\mathbf{a}) = \\mathbf{a} + \\tfrac{1}{2}\\mathbf{b} - \\tfrac{1}{2}\\mathbf{a} = \\tfrac{1}{2}\\mathbf{a}+\\tfrac{1}{2}\\mathbf{b} = \\tfrac{1}{2}(\\mathbf{a}+\\mathbf{b}) \\qquad ✓$$`,
    },
    practice: {
      question:
        "$\\overrightarrow{OA}=2\\mathbf{a}$, $\\overrightarrow{OB}=3\\mathbf{b}$. $P$ divides $AB$ in the ratio $2:1$. Find $\\overrightarrow{OP}$ in terms of $\\mathbf{a}$ and $\\mathbf{b}$.",
      solution: `$$\\overrightarrow{AB} = \\overrightarrow{OB}-\\overrightarrow{OA} = 3\\mathbf{b}-2\\mathbf{a}$$

$$\\overrightarrow{AP} = \\tfrac{2}{3}\\overrightarrow{AB} = \\tfrac{2}{3}(3\\mathbf{b}-2\\mathbf{a}) = 2\\mathbf{b}-\\tfrac{4}{3}\\mathbf{a}$$

$$\\overrightarrow{OP} = \\overrightarrow{OA}+\\overrightarrow{AP} = 2\\mathbf{a}+2\\mathbf{b}-\\tfrac{4}{3}\\mathbf{a} = \\mathbf{\\tfrac{2}{3}\\mathbf{a}+2\\mathbf{b}}$$`,
    },
  },
];
