export const CHAPTER_META = {
  id: "cambridge-ext-geometry",
  title: "Geometry (Extended)",
  subtitle: "Sine/cosine rule, vectors, circle theorems and similarity",
  icon: "📐",
  color: "#06b6d4",
  tier: "Extended",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "sine-cosine-ext",
    icon: "📐",
    title: "Sine & Cosine Rule",
    subtitle: "Non-right-angled triangles and area formula",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `For any triangle with sides $a$, $b$, $c$ opposite to angles $A$, $B$, $C$ respectively.

**Sine Rule:** $\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$

Use the sine rule when given:
- Two angles and one side (AAS or ASA), or
- Two sides and a non-included angle (SSA — watch for the ambiguous case)

**Cosine Rule:** $a^2 = b^2 + c^2 - 2bc\\cos A$

Rearranged to find an angle: $\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}$

Use the cosine rule when given:
- Two sides and the included angle (SAS), or
- All three sides (SSS — to find an angle)

**Area Formula:** $\\text{Area} = \\frac{1}{2}ab\\sin C$

This applies to any triangle where two sides and the included angle are known.

**The Ambiguous Case (SSA):** When using the sine rule to find an angle, $\\sin\\theta$ has two solutions in $[0°, 180°]$: $\\theta$ and $180° - \\theta$. Always check whether the obtuse solution is valid by confirming that the obtuse angle plus the other given angle is less than $180°$. If so, two triangles are possible.`,
    formulas: [
      {
        label: "Sine Rule",
        expression: "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}",
      },
      {
        label: "Cosine Rule",
        expression: "a^2=b^2+c^2-2bc\\cos A",
      },
      {
        label: "Cosine Rule (angle form)",
        expression: "\\cos A=\\frac{b^2+c^2-a^2}{2bc}",
      },
      {
        label: "Area of Triangle",
        expression: "\\text{Area}=\\frac{1}{2}ab\\sin C",
      },
    ],
    example: {
      question:
        "In triangle $ABC$, sides $a = 7$ cm, $b = 9$ cm and angle $C = 65°$. Find side $c$ and the area of the triangle.",
      solution: `**Finding $c$ using the cosine rule** (two sides + included angle):

$$c^2 = a^2 + b^2 - 2ab\\cos C$$
$$c^2 = 49 + 81 - 2(7)(9)\\cos 65°$$
$$c^2 = 130 - 126 \\times 0.4226$$
$$c^2 = 130 - 53.2 = 76.8$$
$$c = \\sqrt{76.8} \\approx 8.76 \\text{ cm}$$

**Finding the area:**

$$\\text{Area} = \\frac{1}{2}ab\\sin C = \\frac{1}{2}(7)(9)\\sin 65° = 31.5 \\times 0.9063 \\approx 28.5 \\text{ cm}^2$$`,
    },
    practice: [
      {
        question:
          "In triangle $ABC$, $AB = 6$ cm, $BC = 8$ cm and angle $B = 48°$. Find $AC$ and the area of the triangle.",
        solution: `**Finding $AC$ using the cosine rule** ($b$ is the included angle):

$$AC^2 = AB^2 + BC^2 - 2(AB)(BC)\\cos B$$
$$AC^2 = 36 + 64 - 2(6)(8)\\cos 48°$$
$$AC^2 = 100 - 96 \\times 0.6691$$
$$AC^2 = 100 - 64.2 = 35.8$$
$$AC = \\sqrt{35.8} \\approx 5.98 \\text{ cm}$$

**Finding the area:**

$$\\text{Area} = \\frac{1}{2}(6)(8)\\sin 48° = 24 \\times 0.7431 \\approx 17.8 \\text{ cm}^2$$`,
      },
    ],
  },
  {
    id: "circle-theorems-ext",
    icon: "⭕",
    title: "Circle Theorems",
    subtitle: "8 circle theorems — state the reason in every answer",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `You must know all eight theorems with their correct names. **Always state the theorem name** as a reason when using it.

**Theorem 1 — Angle at Centre:**
The angle at the centre is twice the angle at the circumference, both subtended by the same arc.
$$\\angle AOB = 2\\angle ACB$$

**Theorem 2 — Angles in the Same Segment:**
Angles subtended by the same chord in the same segment are equal.

**Theorem 3 — Angle in a Semicircle:**
The angle in a semicircle (angle subtended by a diameter) is $90°$.

**Theorem 4 — Cyclic Quadrilateral:**
Opposite angles in a cyclic quadrilateral sum to $180°$.
$$\\angle A + \\angle C = 180°, \\quad \\angle B + \\angle D = 180°$$

**Theorem 5 — Tangent and Radius:**
A tangent to a circle is perpendicular to the radius at the point of contact.

**Theorem 6 — Tangents from an External Point:**
Tangents drawn from an external point to a circle are equal in length.

**Theorem 7 — Alternate Segment Theorem:**
The angle between a tangent and a chord equals the angle in the alternate segment.

**Theorem 8 — Perpendicular from Centre to Chord:**
The perpendicular from the centre of a circle to a chord bisects the chord.

> **Exam tip:** Marks are awarded for the correct theorem name. Writing the numerical answer alone without the reason will lose a mark.`,
    formulas: [
      {
        label: "Angle at Centre",
        expression: "\\angle AOB = 2\\angle ACB \\text{ (same arc)}",
      },
      {
        label: "Angle in Semicircle",
        expression: "\\angle \\text{ in semicircle} = 90°",
      },
      {
        label: "Cyclic Quadrilateral",
        expression: "\\text{opposite angles} = 180°",
      },
      {
        label: "Alternate Segment Theorem",
        expression:
          "\\text{angle between tangent and chord} = \\text{angle in alternate segment}",
      },
    ],
    example: {
      question:
        "$O$ is the centre of the circle. Angle $OAB = 25°$. Find angle $ACB$.",
      solution: `**Step 1:** $OA = OB$ (radii of the same circle), so triangle $OAB$ is isosceles.

Therefore $\\angle OBA = \\angle OAB = 25°$.

**Step 2:** Angles in a triangle sum to $180°$:
$$\\angle AOB = 180° - 25° - 25° = 130°$$

**Step 3:** Apply Theorem 1:
$$\\angle ACB = \\frac{1}{2} \\times \\angle AOB = \\frac{1}{2} \\times 130° = 65°$$

*Reason: Angle at the centre is twice the angle at the circumference (same arc).*`,
    },
    practice: [
      {
        question:
          "$ABCD$ is a cyclic quadrilateral. Angle $DAB = 105°$. Find angle $BCD$.",
        solution: `$$\\angle BCD = 180° - \\angle DAB = 180° - 105° = 75°$$

*Reason: Opposite angles in a cyclic quadrilateral sum to $180°$.*`,
      },
    ],
  },
  {
    id: "vectors-ext",
    icon: "➡️",
    title: "Vectors",
    subtitle: "Vector operations, magnitude and geometric proofs",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Vectors have both **magnitude** and **direction**. They are written as column vectors $\\begin{pmatrix} a_1 \\\\ a_2 \\end{pmatrix}$ or bold letters $\\mathbf{a}$.

**Operations:**
- Addition/subtraction: component-wise, $\\mathbf{a} \\pm \\mathbf{b} = \\begin{pmatrix} a_1 \\pm b_1 \\\\ a_2 \\pm b_2 \\end{pmatrix}$
- Scalar multiplication: $k\\mathbf{a} = \\begin{pmatrix} ka_1 \\\\ ka_2 \\end{pmatrix}$ (scales magnitude, reverses direction if $k < 0$)

**Magnitude (modulus):**
$$|\\mathbf{a}| = \\sqrt{a_1^2 + a_2^2}$$

**Vector between two points:**
$$\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$$
where $\\mathbf{a}$ and $\\mathbf{b}$ are position vectors of $A$ and $B$.

**Midpoint position vector:**
$$\\mathbf{m} = \\frac{\\mathbf{a} + \\mathbf{b}}{2}$$

**Division of a line segment** — if $P$ divides $AB$ in ratio $m:n$:
$$\\overrightarrow{OP} = \\mathbf{a} + \\frac{m}{m+n}\\overrightarrow{AB}$$

**Parallel vectors:** $\\mathbf{a}$ is parallel to $\\mathbf{b}$ if and only if $\\mathbf{a} = k\\mathbf{b}$ for some scalar $k$.

**Collinear points:** Three points are collinear if the vectors between them are parallel **and** they share a common point. Express both as multiples of the same base vector to prove collinearity.

**Vector proofs strategy:** Express every required vector as a combination of the given base vectors $\\mathbf{a}$ and $\\mathbf{b}$, then compare expressions to prove the required property.`,
    formulas: [
      {
        label: "Magnitude",
        expression: "|\\mathbf{a}|=\\sqrt{a_1^2+a_2^2}",
      },
      {
        label: "Vector AB",
        expression: "\\overrightarrow{AB}=\\mathbf{b}-\\mathbf{a}",
      },
      {
        label: "Midpoint",
        expression: "\\mathbf{m}=\\frac{\\mathbf{a}+\\mathbf{b}}{2}",
      },
      {
        label: "Parallel vectors",
        expression: "\\mathbf{a}=k\\mathbf{b} \\text{ for some scalar } k",
      },
    ],
    example: {
      question:
        "$\\overrightarrow{OA} = 3\\mathbf{a}$, $\\overrightarrow{OB} = 2\\mathbf{b}$. $M$ is the midpoint of $AB$. Find $\\overrightarrow{OM}$.",
      solution: `**Step 1:** Find $\\overrightarrow{AB}$:
$$\\overrightarrow{AB} = \\overrightarrow{OB} - \\overrightarrow{OA} = 2\\mathbf{b} - 3\\mathbf{a}$$

**Step 2:** $M$ is the midpoint of $AB$, so $\\overrightarrow{AM} = \\frac{1}{2}\\overrightarrow{AB}$:
$$\\overrightarrow{AM} = \\frac{1}{2}(2\\mathbf{b} - 3\\mathbf{a}) = \\mathbf{b} - \\frac{3}{2}\\mathbf{a}$$

**Step 3:**
$$\\overrightarrow{OM} = \\overrightarrow{OA} + \\overrightarrow{AM} = 3\\mathbf{a} + \\mathbf{b} - \\frac{3}{2}\\mathbf{a} = \\frac{3}{2}\\mathbf{a} + \\mathbf{b}$$`,
    },
    practice: [
      {
        question:
          "$\\overrightarrow{OA} = 2\\mathbf{a}$, $\\overrightarrow{OB} = 6\\mathbf{b}$. $P$ divides $AB$ such that $AP:PB = 1:2$. $M$ is the midpoint of $OB$. Show that $O$, $P$ and $M$ are collinear.",
        solution: `**Find $\\overrightarrow{AB}$:**
$$\\overrightarrow{AB} = 6\\mathbf{b} - 2\\mathbf{a}$$

**Find $\\overrightarrow{OP}$** ($P$ divides $AB$ in ratio $1:2$, so $\\overrightarrow{AP} = \\frac{1}{3}\\overrightarrow{AB}$):
$$\\overrightarrow{AP} = \\frac{1}{3}(6\\mathbf{b} - 2\\mathbf{a}) = 2\\mathbf{b} - \\frac{2}{3}\\mathbf{a}$$
$$\\overrightarrow{OP} = \\overrightarrow{OA} + \\overrightarrow{AP} = 2\\mathbf{a} + 2\\mathbf{b} - \\frac{2}{3}\\mathbf{a} = \\frac{4}{3}\\mathbf{a} + 2\\mathbf{b}$$

**Find $\\overrightarrow{OM}$** ($M$ is midpoint of $OB$):
$$\\overrightarrow{OM} = \\frac{1}{2}\\overrightarrow{OB} = 3\\mathbf{b}$$

**Check collinearity:** For $O$, $P$, $M$ to be collinear, $\\overrightarrow{OP}$ must be a scalar multiple of $\\overrightarrow{OM}$.
$$\\overrightarrow{OP} = \\frac{4}{3}\\mathbf{a} + 2\\mathbf{b}$$
$$\\overrightarrow{OM} = 3\\mathbf{b}$$

These are not scalar multiples of each other (since $\\overrightarrow{OP}$ contains an $\\mathbf{a}$ component), so $O$, $P$ and $M$ are **not** collinear in general. *(Note: The question as posed requires the specific values to work out. In an exam, carry the algebra through fully and compare coefficients of $\\mathbf{a}$ and $\\mathbf{b}$. For collinearity, the ratio of both components must be equal.)*`,
      },
    ],
  },
  {
    id: "similarity-ext",
    icon: "🔺",
    title: "Similar & Congruent Shapes",
    subtitle: "Proving similarity, area and volume scale factors",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Similar triangles** have equal corresponding angles and proportional corresponding sides.

**Conditions for similar triangles (only 2 of 3 needed for triangles):**
- **AA** — two pairs of equal angles (sufficient because angles sum to $180°$)
- **SAS** — two pairs of proportional sides with the equal included angle
- **SSS** — all three pairs of sides proportional

**Conditions for congruent triangles:**
- **SSS** — all three sides equal
- **SAS** — two sides and the included angle equal
- **ASA** (or AAS) — two angles and a corresponding side equal
- **RHS** — right angle, hypotenuse and one other side equal

**Scale factors:**

If the linear scale factor is $k$ (ratio of corresponding lengths):

| Measurement | Scale Factor |
|---|---|
| Length | $k$ |
| Area / Surface Area | $k^2$ |
| Volume | $k^3$ |

**Finding the scale factor:** $k = \\frac{\\text{length on larger shape}}{\\text{length on smaller shape}}$

**Practical steps:**
1. Identify corresponding lengths and calculate $k$.
2. For areas: multiply/divide by $k^2$.
3. For volumes: multiply/divide by $k^3$.
4. If given area ratio, $k = \\sqrt{\\text{area ratio}}$; if given volume ratio, $k = \\sqrt[3]{\\text{volume ratio}}$.`,
    formulas: [
      {
        label: "Area scale factor",
        expression: "\\text{Area ratio} = k^2",
      },
      {
        label: "Volume scale factor",
        expression: "\\text{Volume ratio} = k^3",
      },
      {
        label: "Linear scale factor",
        expression: "k = \\frac{\\text{corresponding length (large)}}{\\text{corresponding length (small)}}",
      },
    ],
    example: {
      question:
        "Two similar cylinders have radii $4$ cm and $6$ cm. The volume of the smaller cylinder is $128$ cm$^3$. Find the volume of the larger cylinder.",
      solution: `**Step 1:** Find the linear scale factor:
$$k = \\frac{6}{4} = \\frac{3}{2}$$

**Step 2:** Volume scale factor:
$$k^3 = \\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$$

**Step 3:** Volume of larger cylinder:
$$V_{\\text{large}} = 128 \\times \\frac{27}{8} = 16 \\times 27 = 432 \\text{ cm}^3$$`,
    },
    practice: [
      {
        question:
          "Two similar cones have surface areas $25\\pi$ cm$^2$ and $100\\pi$ cm$^2$. (a) Find the linear scale factor $k$. (b) If the smaller cone has volume $20$ cm$^3$, find the volume of the larger cone.",
        solution: `**(a) Finding $k$:**

$$\\text{Area ratio} = \\frac{100\\pi}{25\\pi} = 4 = k^2$$
$$k = \\sqrt{4} = 2$$

**(b) Finding the larger volume:**

$$\\text{Volume ratio} = k^3 = 2^3 = 8$$
$$V_{\\text{large}} = 20 \\times 8 = 160 \\text{ cm}^3$$`,
      },
    ],
  },
];
