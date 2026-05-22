export const CHAPTER_META = {
  id: "sat-geometry",
  title: "Geometry & Trigonometry",
  subtitle: "Shapes, circles and right-triangle trigonometry",
  icon: "📏",
  color: "#10b981",
  exam: "SAT Math",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "sat-shapes",
    icon: "🔷",
    title: "Shapes, Area & Volume",
    subtitle: "2D and 3D shapes, similarity and angle relationships",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Shapes, Area & Volume

**Area formulas:**
| Shape | Formula |
|---|---|
| Rectangle | $A = lw$ |
| Triangle | $A = \\dfrac{1}{2}bh$ |
| Circle | $A = \\pi r^2$ |
| Trapezoid | $A = \\dfrac{1}{2}(b_1+b_2)h$ |
| Parallelogram | $A = bh$ |

**Volume formulas:**
| Solid | Formula |
|---|---|
| Rectangular prism | $V = lwh$ |
| Cylinder | $V = \\pi r^2 h$ |
| Sphere | $V = \\dfrac{4}{3}\\pi r^3$ |
| Cone | $V = \\dfrac{1}{3}\\pi r^2 h$ |
| Pyramid | $V = \\dfrac{1}{3}\\times\\text{base area}\\times h$ |

**Similar figures:** When two shapes are similar with linear scale factor $k$:
$$\\text{Area ratio} = k^2 \\qquad \\text{Volume ratio} = k^3$$
Corresponding angles are equal; corresponding sides are proportional.

**Angle relationships:**
- **Vertical angles** (formed by two intersecting lines) are equal.
- **Supplementary angles** sum to $180°$.
- **Complementary angles** sum to $90°$.
- The three interior angles of any triangle sum to $180°$.
- An **exterior angle** of a triangle equals the sum of the two non-adjacent interior angles.
- Parallel lines cut by a transversal: alternate interior angles are equal; co-interior (same-side) angles are supplementary.

**SAT tips:**
- The SAT provides a reference sheet with key area and volume formulas — but you still need to know how to apply them quickly.
- When a problem involves two similar shapes, find the scale factor $k$ first, then raise it to the appropriate power.
- For composite shapes, break them into simpler pieces.`,
    formulas: [
      {
        label: "Triangle area",
        formula: "A=\\frac{1}{2}bh",
      },
      {
        label: "Circle area",
        formula: "A=\\pi r^2",
      },
      {
        label: "Cylinder volume",
        formula: "V=\\pi r^2 h",
      },
      {
        label: "Sphere volume",
        formula: "V=\\frac{4}{3}\\pi r^3",
      },
      {
        label: "Exterior angle theorem",
        formula: "\\text{exterior angle} = \\text{sum of two non-adjacent interior angles}",
      },
      {
        label: "Similarity — area ratio",
        formula: "\\text{area ratio} = k^2",
      },
      {
        label: "Similarity — volume ratio",
        formula: "\\text{volume ratio} = k^3",
      },
    ],
    example: {
      question:
        "Two similar triangles have corresponding sides in the ratio 3:5. If the area of the smaller triangle is 27 cm², find the area of the larger triangle.",
      solution: `**Step 1 — Find the area ratio.**
Linear scale factor $k = \\dfrac{5}{3}$.
$$\\text{Area ratio} = k^2 = \\left(\\frac{5}{3}\\right)^2 = \\frac{25}{9}$$

**Step 2 — Find the larger area.**
$$\\text{Larger area} = 27 \\times \\frac{25}{9} = 3 \\times 25 = 75 \\text{ cm}^2$$

**Answer:** 75 cm².`,
    },
    practice: {
      question:
        "A cylindrical tank has radius 4 m and height 6 m. A similar tank has radius 6 m. What is the volume of the larger tank?",
      solution: `**Step 1 — Find the linear scale factor.**
$$k = \\frac{6}{4} = \\frac{3}{2}$$

**Step 2 — Find the volume ratio.**
$$\\text{Volume ratio} = k^3 = \\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$$

**Step 3 — Calculate the smaller tank's volume.**
$$V_{\\text{small}} = \\pi r^2 h = \\pi (4)^2 (6) = 96\\pi \\text{ m}^3$$

**Step 4 — Scale up.**
$$V_{\\text{large}} = 96\\pi \\times \\frac{27}{8} = 12\\pi \\times 27 = 324\\pi \\approx 1018 \\text{ m}^3$$

**Answer:** $324\\pi \\approx 1018$ m³.`,
    },
  },
  {
    id: "sat-circles",
    icon: "⭕",
    title: "Circles",
    subtitle: "Circle equations, arc length, sector area and theorems",
    color: "#059669",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "Circle with centre (2, 3) and radius 5. What are the x- and y-intercepts?",
    desmosExpressions: [{ id: "1", latex: "(x-2)^2+(y-3)^2=25" }],
    theory: `## Circles

**Standard form of a circle equation:**
$$(x-h)^2+(y-k)^2=r^2$$
where $(h, k)$ is the centre and $r$ is the radius.

**Finding centre and radius from general form:** If the equation is given as $x^2+y^2+Dx+Ey+F=0$, complete the square for both $x$ and $y$:
$$\\left(x+\\frac{D}{2}\\right)^2+\\left(y+\\frac{E}{2}\\right)^2 = \\frac{D^2}{4}+\\frac{E^2}{4}-F$$

**Arc length** (fraction of circumference):
$$\\text{arc length} = \\frac{\\theta}{360°}\\times 2\\pi r$$

**Sector area** (fraction of circle area):
$$\\text{sector area} = \\frac{\\theta}{360°}\\times \\pi r^2$$

**Key circle theorems:**
- **Central angle** equals the arc it intercepts (in degrees).
- **Inscribed angle** $= \\dfrac{1}{2}\\times$ the central angle that subtends the same arc.
- A **tangent** to a circle is perpendicular to the radius drawn to the point of tangency.
- A perpendicular from the centre **bisects** any chord.
- An angle in a **semicircle** (inscribed in a diameter) is always $90°$.

**SAT tips:**
- When asked for a radius from an equation, always bring the equation to standard form first.
- Arc and sector questions always involve setting up the fraction $\\dfrac{\\theta}{360°}$.
- Radian measure: $360° = 2\\pi$ rad, so arc length $= r\\theta$ (with $\\theta$ in radians).`,
    formulas: [
      {
        label: "Circle equation",
        formula: "(x-h)^2+(y-k)^2=r^2",
      },
      {
        label: "Arc length",
        formula: "= \\frac{\\theta}{360°}\\times 2\\pi r",
      },
      {
        label: "Sector area",
        formula: "= \\frac{\\theta}{360°}\\times \\pi r^2",
      },
      {
        label: "Inscribed angle",
        formula: "= \\frac{1}{2}\\times\\text{central angle}",
      },
      {
        label: "Arc length (radians)",
        formula: "= r\\theta",
      },
    ],
    example: {
      question:
        "Find the centre and radius of the circle $x^2+y^2-4x+6y-3=0$.",
      solution: `**Step 1 — Group $x$ and $y$ terms.**
$$(x^2-4x)+(y^2+6y) = 3$$

**Step 2 — Complete the square for each variable.**
For $x$: add $\\left(\\dfrac{-4}{2}\\right)^2 = 4$ to both sides.
For $y$: add $\\left(\\dfrac{6}{2}\\right)^2 = 9$ to both sides.
$$(x^2-4x+4)+(y^2+6y+9) = 3+4+9 = 16$$

**Step 3 — Write in standard form.**
$$(x-2)^2+(y+3)^2 = 16$$

**Answer:** Centre $(2,\\,-3)$, radius $r = \\sqrt{16} = 4$.`,
    },
    practice: {
      question:
        "A circle has centre $(3, -1)$ and passes through the point $(7, -1)$. Find the equation of the circle and the length of an arc subtended by a $90°$ central angle.",
      solution: `**Step 1 — Find the radius.**
$$r = \\text{distance from centre to point} = |7-3| = 4$$

**Step 2 — Write the equation.**
$$(x-3)^2+(y+1)^2 = 16$$

**Step 3 — Find the arc length for $\\theta = 90°$.**
$$\\text{arc length} = \\frac{90}{360}\\times 2\\pi(4) = \\frac{1}{4}\\times 8\\pi = 2\\pi$$

**Answer:** Equation: $(x-3)^2+(y+1)^2=16$. Arc length $= 2\\pi \\approx 6.28$ units.`,
    },
  },
  {
    id: "sat-trig",
    icon: "📐",
    title: "Trigonometry",
    subtitle: "SOHCAHTOA, special angles and unit circle basics",
    color: "#047857",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Trigonometry

**SOHCAHTOA** — for a right triangle with acute angle $\\theta$:
$$\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}} \\qquad \\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}} \\qquad \\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}$$

**Pythagorean identity:**
$$\\sin^2\\theta + \\cos^2\\theta = 1$$
This is used to find $\\sin\\theta$ from $\\cos\\theta$ or vice versa.

**Complementary angle identity:**
$$\\sin(\\theta) = \\cos(90°-\\theta) \\qquad \\cos(\\theta) = \\sin(90°-\\theta)$$

**Special right triangles:**
| Triangle | Angles | Side ratio |
|---|---|---|
| 30-60-90 | $30°, 60°, 90°$ | $1 : \\sqrt{3} : 2$ |
| 45-45-90 | $45°, 45°, 90°$ | $1 : 1 : \\sqrt{2}$ |

Key values to memorise:
$$\\sin 30° = \\cos 60° = \\frac{1}{2}, \\quad \\sin 60° = \\cos 30° = \\frac{\\sqrt{3}}{2}, \\quad \\sin 45° = \\cos 45° = \\frac{\\sqrt{2}}{2}$$

**Unit circle basics:** A point on the unit circle at angle $\\theta$ has coordinates $(\\cos\\theta,\\, \\sin\\theta)$.

**Radian conversion:**
$$180° = \\pi \\text{ radians}$$
- Degrees to radians: multiply by $\\dfrac{\\pi}{180}$
- Radians to degrees: multiply by $\\dfrac{180}{\\pi}$

**SAT trig tips:**
- Most SAT trig problems involve right triangles — set up the correct ratio from SOHCAHTOA.
- If $\\sin(a°) = \\cos(b°)$, then $a + b = 90$.
- Use the Pythagorean identity to avoid needing a calculator for exact values.
- Radian problems usually just require the conversion formula.`,
    formulas: [
      {
        label: "Sine",
        formula: "\\sin\\theta=\\frac{\\text{opp}}{\\text{hyp}}",
      },
      {
        label: "Cosine",
        formula: "\\cos\\theta=\\frac{\\text{adj}}{\\text{hyp}}",
      },
      {
        label: "Tangent",
        formula: "\\tan\\theta=\\frac{\\text{opp}}{\\text{adj}}",
      },
      {
        label: "Pythagorean identity",
        formula: "\\sin^2\\theta+\\cos^2\\theta=1",
      },
      {
        label: "Complementary angles",
        formula: "\\sin(\\theta)=\\cos(90°-\\theta)",
      },
      {
        label: "Degree to radian",
        formula: "\\text{radians} = \\text{degrees}\\times\\frac{\\pi}{180}",
      },
    ],
    example: {
      question:
        "In a right triangle, one angle is $30°$ and the hypotenuse is 10. Find the side opposite the $30°$ angle.",
      solution: `**Step 1 — Identify the relevant ratio.**
We know the hypotenuse and want the opposite side, so use sine:
$$\\sin 30° = \\frac{\\text{opp}}{\\text{hyp}}$$

**Step 2 — Substitute known values.**
$$\\frac{1}{2} = \\frac{\\text{opp}}{10}$$

**Step 3 — Solve.**
$$\\text{opp} = 10 \\times \\frac{1}{2} = 5$$

**Answer:** The side opposite the $30°$ angle is $5$ units.`,
    },
    practice: {
      question:
        "If $\\sin(x°) = \\dfrac{3}{5}$ and $x$ is an acute angle, find $\\cos(x°)$ and $\\tan(x°)$.",
      solution: `**Step 1 — Use the Pythagorean identity to find $\\cos(x°)$.**
$$\\sin^2 x + \\cos^2 x = 1$$
$$\\left(\\frac{3}{5}\\right)^2 + \\cos^2 x = 1$$
$$\\frac{9}{25} + \\cos^2 x = 1$$
$$\\cos^2 x = \\frac{16}{25}$$
Since $x$ is acute, $\\cos x > 0$:
$$\\cos x = \\frac{4}{5}$$

**Step 2 — Find $\\tan(x°)$.**
$$\\tan x = \\frac{\\sin x}{\\cos x} = \\frac{\\tfrac{3}{5}}{\\tfrac{4}{5}} = \\frac{3}{4}$$

**Answer:** $\\cos(x°) = \\dfrac{4}{5}$ and $\\tan(x°) = \\dfrac{3}{4}$.`,
    },
  },
];
