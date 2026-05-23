export const CHAPTER_META = {
  id: "icse-9-geometry",
  title: "Geometry",
  subtitle: "Triangles, circles, mid-point theorem and constructions",
  icon: "📐",
  color: "#ef4444",
  tier: "Class 9",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "congruent-triangles",
    icon: "🔺",
    title: "Congruent Triangles",
    subtitle: "Congruence criteria: SSS, SAS, ASA, AAS and RHS",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Two triangles are **congruent** if they have exactly the same shape and size — all corresponding sides and angles are equal.

**Congruence criteria:**

**SSS (Side-Side-Side):** Three sides of one triangle equal three sides of the other.

**SAS (Side-Angle-Side):** Two sides and the **included angle** of one triangle equal those of the other.

**ASA (Angle-Side-Angle):** Two angles and the **included side** of one triangle equal those of the other.

**AAS (Angle-Angle-Side):** Two angles and a **non-included side** of one triangle equal those of the other.

**RHS (Right angle-Hypotenuse-Side):** The hypotenuse and one side of a right triangle equal those of another right triangle.

**CPCT (Corresponding Parts of Congruent Triangles):** Once congruence is established, all corresponding parts are equal. This is used to prove further relationships.

**Note:** AAA is **not** a congruence criterion — it only proves similarity.`,
    formulas: [
      {
        label: "Congruence",
        latex: "\\triangle ABC \\cong \\triangle DEF \\implies AB = DE, BC = EF, AC = DF",
      },
    ],
    example: {
      question: "In $\\triangle ABC$, $AB = AC$ and $D$ is the midpoint of $BC$. Prove that $AD \\perp BC$.",
      solution: `In $\\triangle ABD$ and $\\triangle ACD$:
- $AB = AC$ (given, isosceles triangle)
- $BD = DC$ (D is midpoint of BC)
- $AD = AD$ (common side)

By **SSS**, $\\triangle ABD \\cong \\triangle ACD$.

By **CPCT**: $\\angle ADB = \\angle ADC$

Since $\\angle ADB + \\angle ADC = 180°$ (linear pair):

$$2 \\times \\angle ADB = 180° \\implies \\angle ADB = 90°$$

Therefore $AD \\perp BC$. ∎`,
    },
    practice: {
      question: "In quadrilateral ABCD, $AB = CD$ and $AB \\parallel CD$. Prove that $AD = BC$.",
      solution: `Draw diagonal $AC$.

In $\\triangle ABC$ and $\\triangle CDA$:
- $AB = CD$ (given)
- $\\angle BAC = \\angle DCA$ (alternate angles, $AB \\parallel CD$)
- $AC = CA$ (common)

By **SAS**, $\\triangle ABC \\cong \\triangle CDA$.

By **CPCT**: $BC = DA$, i.e., $\\mathbf{AD = BC}$. ∎`,
    },
  },
  {
    id: "midpoint-theorem",
    icon: "📏",
    title: "Mid-Point & Intercept Theorems",
    subtitle: "Properties of mid-segments in triangles and parallel line intercepts",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Mid-Point Theorem:** The line segment joining the mid-points of two sides of a triangle is:
1. **Parallel** to the third side.
2. **Half** the length of the third side.

If $D$ and $E$ are mid-points of $AB$ and $AC$ respectively:
$$DE \\parallel BC \\quad \\text{and} \\quad DE = \\frac{1}{2}BC$$

**Converse of Mid-Point Theorem:** A line drawn through the mid-point of one side of a triangle, parallel to another side, bisects the third side.

**Intercept Theorem (Equal Intercept Theorem):** If three or more parallel lines make **equal intercepts** on one transversal, they make equal intercepts on any other transversal.

**Application in quadrilaterals:** The line segment joining the mid-points of any two sides of a triangle creates a smaller triangle similar to the original with ratio $1:2$.`,
    formulas: [
      {
        label: "Mid-point theorem",
        latex: "DE \\parallel BC, \\quad DE = \\frac{1}{2}BC",
      },
    ],
    example: {
      question: "In $\\triangle ABC$, $D$ and $E$ are mid-points of $AB$ and $AC$. If $BC = 10$ cm, find $DE$.",
      solution: `By the Mid-Point Theorem:

$$DE = \\frac{1}{2} \\times BC = \\frac{1}{2} \\times 10 = \\mathbf{5 \\text{ cm}}$$

Also, $DE \\parallel BC$.`,
    },
    practice: {
      question: "In $\\triangle PQR$, $A$ is the mid-point of $PQ$ and $AB \\parallel QR$ where $B$ lies on $PR$. If $PQ = 12$ cm and $QR = 16$ cm, find $AB$ and $PB$.",
      solution: `Since $A$ is the mid-point of $PQ$ and $AB \\parallel QR$, by the converse of the mid-point theorem, $B$ is the mid-point of $PR$.

$$AB = \\frac{1}{2} \\times QR = \\frac{1}{2} \\times 16 = \\mathbf{8 \\text{ cm}}$$

$PB = \\frac{1}{2} \\times PR$ (but we need $PR$ to find this — the question provides $PQ$ and $QR$ which are insufficient without an angle. If the triangle is right-angled at $Q$: $PR = \\sqrt{12^2 + 16^2} = 20$, so $PB = \\mathbf{10 \\text{ cm}}$.)`,
    },
  },
  {
    id: "circles-class9",
    icon: "⭕",
    title: "Circles",
    subtitle: "Chords, arcs, central angles and cyclic properties",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Key terms:** A **chord** is a line segment with both endpoints on the circle. A **diameter** is a chord through the centre. An **arc** is a part of the circumference.

**Properties of chords:**
1. The perpendicular from the centre to a chord **bisects** the chord.
2. Equal chords are equidistant from the centre.
3. Chords equidistant from the centre are equal.

**Arc and angle properties:**
1. The **angle at the centre** is **twice** the angle at the circumference subtended by the same arc.
$$\\angle \\text{centre} = 2 \\times \\angle \\text{circumference}$$

2. Angles in the **same segment** are equal.

3. The angle in a **semicircle** is $90°$.

**Cyclic Quadrilateral:** A quadrilateral inscribed in a circle.
- Opposite angles are **supplementary**: $\\angle A + \\angle C = 180°$
- Exterior angle equals the interior opposite angle.`,
    formulas: [
      {
        label: "Central angle",
        latex: "\\angle \\text{centre} = 2 \\times \\angle \\text{circumference}",
      },
      {
        label: "Cyclic quad",
        latex: "\\angle A + \\angle C = 180°",
      },
      {
        label: "Semicircle",
        latex: "\\text{Angle in a semicircle} = 90°",
      },
    ],
    example: {
      question: "In a circle with centre O, $\\angle AOB = 120°$ where A and B are on the circle. Find the angle subtended at the circumference by arc AB (on the major arc side).",
      solution: `The angle at the circumference is half the angle at the centre:

$$\\angle ACB = \\frac{1}{2} \\times 120° = \\mathbf{60°}$$

(where $C$ is any point on the **major arc** AB)

The angle on the **minor arc** side:

$$\\angle ADB = \\frac{1}{2} \\times (360° - 120°) = \\frac{240°}{2} = 120°$$`,
    },
    practice: {
      question: "ABCD is a cyclic quadrilateral. If $\\angle A = 75°$ and $\\angle B = 110°$, find $\\angle C$ and $\\angle D$.",
      solution: `Opposite angles of a cyclic quadrilateral are supplementary.

$$\\angle C = 180° - \\angle A = 180° - 75° = \\mathbf{105°}$$

$$\\angle D = 180° - \\angle B = 180° - 110° = \\mathbf{70°}$$

Check: $75° + 110° + 105° + 70° = 360°$ ✓`,
    },
  },
  {
    id: "constructions-class9",
    icon: "📏",
    title: "Constructions",
    subtitle: "Bisectors, triangles and basic geometric constructions",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Essential constructions** using only a ruler and compass:

**1. Bisect a line segment:**
Draw arcs of equal radius from both endpoints; the line through the intersections is the perpendicular bisector.

**2. Bisect an angle:**
From the vertex, draw an arc cutting both arms. From these points, draw equal arcs that intersect. The line from vertex to intersection bisects the angle.

**3. Construct 60°:**
Draw an arc from vertex cutting the base. From that point, same radius, cut the first arc. Join to vertex.

**4. Construct 90°:**
Construct 60°, then bisect the 60° angle to get 30°, or construct perpendicular bisector.

**5. Construct a triangle given:**
- Three sides (SSS)
- Two sides and included angle (SAS)
- Two angles and included side (ASA)
- Right angle, hypotenuse and one side (RHS)

**6. Circumscribed circle:** Perpendicular bisectors of sides meet at the circumcentre.

**7. Inscribed circle:** Angle bisectors meet at the incentre.`,
    formulas: [],
    example: {
      question: "Construct a triangle ABC where $AB = 6$ cm, $\\angle A = 60°$ and $\\angle B = 45°$. Describe the steps.",
      solution: `**Step 1:** Draw $AB = 6$ cm.

**Step 2:** At $A$, construct $\\angle BAC = 60°$ (using the 60° construction with compass).

**Step 3:** At $B$, construct $\\angle ABC = 45°$ (construct 90° then bisect to get 45°).

**Step 4:** Let the rays from $A$ and $B$ meet at $C$.

$\\triangle ABC$ is the required triangle.

Note: $\\angle C = 180° - 60° - 45° = 75°$.`,
    },
    practice: {
      question: "Construct the circumscribed circle of a triangle with sides 5 cm, 6 cm and 7 cm. Describe the steps.",
      solution: `**Step 1:** Construct $\\triangle ABC$ with $AB = 7$ cm, $BC = 5$ cm, $AC = 6$ cm (SSS construction).

**Step 2:** Construct the perpendicular bisector of $AB$.

**Step 3:** Construct the perpendicular bisector of $BC$.

**Step 4:** Let the bisectors meet at point $O$ (circumcentre).

**Step 5:** With centre $O$ and radius $OA$, draw the circle. It passes through $A$, $B$ and $C$.

The radius $OA = OB = OC$ is the **circumradius**.`,
    },
  },
];
