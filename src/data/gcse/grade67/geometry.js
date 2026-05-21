export const CHAPTER_META = {
  id: "gcse-geometry-67",
  title: "Geometry",
  subtitle: "Sine & Cosine Rule, Circle Theorems, Vectors, Similar Shapes",
  icon: "📐",
  color: "#06b6d4",
  grade: "6-7",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "sine-cosine-67",
    icon: "📐",
    title: "Sine & Cosine Rule",
    subtitle: "Non-right-angled triangles",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `For any triangle with sides $a$, $b$, $c$ opposite angles $A$, $B$, $C$:

**Sine Rule:** Use when given an angle-side pair plus another angle or side.

$$\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$$

**Cosine Rule:** Use when given two sides and the included angle, or all three sides.

$$a^2 = b^2 + c^2 - 2bc\\cos A$$

**Area of any triangle:**

$$\\text{Area} = \\frac{1}{2}ab\\sin C$$

**Ambiguous case:** When using the sine rule to find an angle, check whether the obtuse angle is also valid — there may be two possible triangles.`,
    formulas: [
      { label: "Sine Rule", latex: "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}" },
      { label: "Cosine Rule", latex: "a^2=b^2+c^2-2bc\\cos A" },
      { label: "Area", latex: "\\text{Area}=\\frac{1}{2}ab\\sin C" },
    ],
    example: {
      question:
        "Triangle with $a=8$ cm, $b=6$ cm, $C=50°$. Find $c$ and the area of the triangle.",
      solution: `Using the cosine rule:

$$c^2 = a^2 + b^2 - 2ab\\cos C = 64 + 36 - 2(8)(6)\\cos 50°$$

$$c^2 = 100 - 96\\cos 50° = 100 - 61.71 = 38.29$$

$$c = \\sqrt{38.29} \\approx 6.19 \\text{ cm}$$

Area $= \\frac{1}{2}(8)(6)\\sin 50° = 24 \\times 0.766 \\approx 18.39 \\text{ cm}^2$`,
    },
    practice: {
      question:
        "In triangle $PQR$, $PQ = 9$ cm, $QR = 7$ cm, angle $Q = 64°$. Find $PR$ and the area of the triangle.",
      solution: `Using the cosine rule (two sides and included angle):

$$PR^2 = PQ^2 + QR^2 - 2(PQ)(QR)\\cos Q$$

$$PR^2 = 81 + 49 - 2(9)(7)\\cos 64° = 130 - 126\\cos 64°$$

$$PR^2 = 130 - 55.3 = 74.7$$

$$PR = \\sqrt{74.7} \\approx 8.64 \\text{ cm}$$

Area $= \\frac{1}{2}(9)(7)\\sin 64° = 31.5 \\times 0.899 \\approx 28.4 \\text{ cm}^2$`,
    },
  },
  {
    id: "circle-theorems",
    icon: "⭕",
    title: "Circle Theorems",
    subtitle: "8 key circle theorems with reasons",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `You must know all 8 theorems and state the correct geometric reason in every answer.

1. **Angle at centre = 2 × angle at circumference** (same arc)
   $$\\angle AOB = 2\\angle ACB$$

2. **Angles in the same segment are equal** — angles subtended by the same chord on the same side.

3. **Angle in a semicircle = 90°** — angle subtended by a diameter at the circumference.

4. **Opposite angles in a cyclic quadrilateral sum to 180°** — both pairs.

5. **Tangent meets radius at 90°** — at the point of contact.

6. **Tangents from an external point are equal in length.**

7. **Alternate segment theorem** — the angle between a tangent and a chord equals the angle in the alternate segment.

8. **Perpendicular from the centre bisects a chord** — and vice versa.

Always write the theorem name as your reason — do not just state the numerical answer.`,
    formulas: [
      { label: "Angle at centre", latex: "\\angle \\text{AOB} = 2\\angle\\text{ACB}" },
      { label: "Angle in semicircle", latex: "\\angle\\text{in semicircle} = 90°" },
      { label: "Cyclic quadrilateral", latex: "\\text{Opposite angles} = 180°" },
      { label: "Tangent-radius", latex: "\\text{Tangent} \\perp \\text{radius} = 90°" },
    ],
    example: {
      question:
        "$O$ is the centre of the circle. Angle $ACB = 35°$. Find angle $AOB$.",
      solution: `**Reason:** Angle at the centre is twice the angle at the circumference (same arc).

$$\\angle AOB = 2 \\times \\angle ACB = 2 \\times 35° = 70°$$`,
    },
    practice: {
      question:
        "$ABCD$ is a cyclic quadrilateral. Angle $A = 78°$, angle $B = 95°$. Find angles $C$ and $D$.",
      solution: `**Reason:** Opposite angles in a cyclic quadrilateral sum to 180°.

$$\\angle C = 180° - \\angle A = 180° - 78° = 102°$$

$$\\angle D = 180° - \\angle B = 180° - 95° = 85°$$`,
    },
  },
  {
    id: "vectors-gcse",
    icon: "➡️",
    title: "Vectors",
    subtitle: "Vector notation, addition and geometry",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Vectors have both **magnitude** and **direction**. Written as bold letters ($\\mathbf{a}$) or column vectors.

**Addition and subtraction** — work component-wise:
$$\\mathbf{a} + \\mathbf{b} = \\binom{a_1 + b_1}{a_2 + b_2}$$

**Scalar multiplication:** $k\\mathbf{a}$ scales both components by $k$.

**Displacement vector:** $\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$

**Midpoint:** If $M$ is the midpoint of $AB$, its position vector is $\\dfrac{\\mathbf{a} + \\mathbf{b}}{2}$.

**Collinear points:** Points $A$, $B$, $C$ are collinear if $\\overrightarrow{AB} = k\\overrightarrow{AC}$ for some scalar $k$.

**Proving shapes:** Express all relevant sides as vectors and compare — equal vectors are parallel and equal in length.`,
    formulas: [
      { label: "Column vector", latex: "\\mathbf{a}=\\binom{x}{y}" },
      { label: "Addition", latex: "\\mathbf{a}+\\mathbf{b}=\\binom{a_1+b_1}{a_2+b_2}" },
      { label: "Displacement", latex: "\\overrightarrow{AB}=\\mathbf{b}-\\mathbf{a}" },
      { label: "Midpoint", latex: "\\overrightarrow{OM}=\\frac{\\mathbf{a}+\\mathbf{b}}{2}" },
    ],
    example: {
      question:
        "$\\mathbf{a} = \\binom{3}{1}$, $\\mathbf{b} = \\binom{-1}{4}$. Find $\\mathbf{a}+\\mathbf{b}$, $2\\mathbf{a}-\\mathbf{b}$, and $|\\mathbf{a}|$.",
      solution: `$$\\mathbf{a}+\\mathbf{b} = \\binom{3+(-1)}{1+4} = \\binom{2}{5}$$

$$2\\mathbf{a}-\\mathbf{b} = \\binom{6}{2} - \\binom{-1}{4} = \\binom{7}{-2}$$

$$|\\mathbf{a}| = \\sqrt{3^2 + 1^2} = \\sqrt{10}$$`,
    },
    practice: {
      question:
        "$\\overrightarrow{OA} = 2\\mathbf{i} + 3\\mathbf{j}$, $\\overrightarrow{OB} = 5\\mathbf{i} - \\mathbf{j}$. $M$ is the midpoint of $AB$. Find $\\overrightarrow{OM}$.",
      solution: `$$\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = (5-2)\\mathbf{i} + (-1-3)\\mathbf{j} = 3\\mathbf{i} - 4\\mathbf{j}$$

$$\\overrightarrow{OM} = \\overrightarrow{OA} + \\frac{1}{2}\\overrightarrow{AB} = (2\\mathbf{i}+3\\mathbf{j}) + (1.5\\mathbf{i} - 2\\mathbf{j}) = 3.5\\mathbf{i} + \\mathbf{j}$$

As a column vector: $\\binom{3.5}{1}$`,
    },
  },
  {
    id: "similar-shapes",
    icon: "🔷",
    title: "Similar Shapes",
    subtitle: "Area and volume scale factors",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Similar shapes have **equal angles** and **proportional sides**.

If the **length scale factor** is $k$:
- **Area** scales by $k^2$
- **Volume** scales by $k^3$

$$\\text{Area ratio} = k^2 \\qquad \\text{Volume ratio} = k^3$$

**Finding $k$:** Divide any pair of corresponding lengths. $k = \\dfrac{\\text{larger length}}{\\text{smaller length}}$.

**Working backwards from area:** If area ratio = $r$, then $k = \\sqrt{r}$.

**Working backwards from volume:** If volume ratio = $r$, then $k = \\sqrt[3]{r}$.

**Congruent triangles** (SSS, SAS, ASA, RHS) are a special case of similar shapes where $k = 1$.`,
    formulas: [
      { label: "Area scale factor", latex: "\\text{Area ratio} = k^2" },
      { label: "Volume scale factor", latex: "\\text{Volume ratio} = k^3" },
    ],
    example: {
      question:
        "Two similar cylinders: the smaller has radius 3 cm and the larger has radius 6 cm. If the smaller cylinder has volume 56 cm³, find the volume of the larger cylinder.",
      solution: `Length scale factor: $k = \\dfrac{6}{3} = 2$

Volume scale factor: $k^3 = 2^3 = 8$

$$\\text{Larger volume} = 56 \\times 8 = 448 \\text{ cm}^3$$`,
    },
    practice: {
      question:
        "Two similar triangles have areas 25 cm² and 100 cm². The smaller triangle has a base of 4 cm. Find the base of the larger triangle.",
      solution: `Area ratio $= \\dfrac{100}{25} = 4$

$$k^2 = 4 \\implies k = 2$$

Larger base $= 4 \\times 2 = 8$ cm`,
    },
  },
];
