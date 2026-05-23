export const CHAPTER_META = {
  id: "icse-10-geometry",
  title: "Geometry",
  subtitle: "Similarity, circle theorems, tangent properties and constructions",
  icon: "📐",
  color: "#ef4444",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "similarity",
    icon: "🔺",
    title: "Similarity of Triangles",
    subtitle: "AA, SAS, SSS criteria, BPT and applications",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Two triangles are **similar** if they have the same shape (but not necessarily the same size). Corresponding angles are equal and corresponding sides are in proportion.

**Similarity criteria:**

**AA (Angle-Angle):** Two angles of one triangle equal two angles of the other.

**SAS (Side-Angle-Side):** Two sides are in the same ratio and the included angle is equal.

**SSS (Side-Side-Side):** All three sides are in the same ratio.

**Basic Proportionality Theorem (BPT / Thales' Theorem):**
If a line is drawn parallel to one side of a triangle, it divides the other two sides **proportionally**.

If $DE \\parallel BC$ in $\\triangle ABC$, where $D$ is on $AB$ and $E$ is on $AC$:
$$\\frac{AD}{DB} = \\frac{AE}{EC}$$

**Converse of BPT:** If a line divides two sides of a triangle proportionally, it is parallel to the third side.

**Properties of similar triangles:**
$$\\frac{\\text{Ratio of areas}}{} = \\left(\\frac{\\text{ratio of sides}}{}\\right)^2$$
$$\\frac{\\text{Ratio of perimeters}}{} = \\text{ratio of corresponding sides}$$`,
    formulas: [
      {
        label: "BPT",
        latex: "\\frac{AD}{DB} = \\frac{AE}{EC} \\quad (DE \\parallel BC)",
      },
      {
        label: "Area ratio",
        latex: "\\frac{\\text{Area}_1}{\\text{Area}_2} = \\left(\\frac{s_1}{s_2}\\right)^2",
      },
    ],
    example: {
      question: "In $\\triangle ABC$, $DE \\parallel BC$ with $D$ on $AB$ and $E$ on $AC$. If $AD = 3$ cm, $DB = 5$ cm and $AE = 4.5$ cm, find $EC$.",
      solution: `By BPT:
$$\\frac{AD}{DB} = \\frac{AE}{EC}$$

$$\\frac{3}{5} = \\frac{4.5}{EC}$$

$$EC = \\frac{5 \\times 4.5}{3} = \\frac{22.5}{3} = \\mathbf{7.5 \\text{ cm}}$$`,
    },
    practice: {
      question: "Two similar triangles have perimeters 30 cm and 20 cm. If a side of the larger triangle is 12 cm, find the corresponding side of the smaller triangle.",
      solution: `Ratio of perimeters = ratio of sides:

$$\\frac{30}{20} = \\frac{12}{x}$$

$$x = \\frac{12 \\times 20}{30} = \\frac{240}{30} = \\mathbf{8 \\text{ cm}}$$`,
    },
  },
  {
    id: "circle-theorems-10",
    icon: "⭕",
    title: "Circle Theorems",
    subtitle: "Tangent properties, secant-tangent relations and angle theorems",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Tangent properties:**
1. A tangent to a circle is **perpendicular** to the radius at the point of contact.
2. Tangents drawn from an **external point** are **equal** in length.
3. The angle between a tangent and a chord at the point of contact equals the angle in the **alternate segment** (Alternate Segment Theorem).

**Secant-Tangent theorem:**
If from an external point, a tangent and a secant are drawn:
$$\\text{(tangent)}^2 = \\text{external segment} \\times \\text{whole secant}$$
$$PT^2 = PA \\times PB$$

**Intersecting chords theorem:**
If two chords intersect inside the circle:
$$PA \\times PB = PC \\times PD$$

**Angle properties (recap + new):**
- Angle in a semicircle $= 90°$
- Angles in the same segment are equal
- Angle at centre $= 2 \\times$ angle at circumference
- Opposite angles of a cyclic quadrilateral are supplementary ($180°$)
- Exterior angle of a cyclic quadrilateral $=$ interior opposite angle`,
    formulas: [
      {
        label: "Tangent from external point",
        latex: "PA = PB \\quad (\\text{tangents from same point})",
      },
      {
        label: "Tangent-secant",
        latex: "PT^2 = PA \\times PB",
      },
      {
        label: "Intersecting chords",
        latex: "PA \\times PB = PC \\times PD",
      },
      {
        label: "Alternate segment",
        latex: "\\angle \\text{tangent-chord} = \\angle \\text{alternate segment}",
      },
    ],
    example: {
      question: "From an external point P, two tangents PA and PB are drawn to a circle with centre O. If $\\angle APB = 60°$, find $\\angle AOB$.",
      solution: `We know:
- $OA \\perp PA$ (radius ⊥ tangent), so $\\angle OAP = 90°$
- $OB \\perp PB$, so $\\angle OBP = 90°$

In quadrilateral OAPB:
$$\\angle AOB + \\angle OAP + \\angle APB + \\angle OBP = 360°$$
$$\\angle AOB + 90° + 60° + 90° = 360°$$
$$\\angle AOB = 360° - 240° = \\mathbf{120°}$$`,
    },
    practice: {
      question: "A tangent $PT$ and a secant $PAB$ are drawn from point $P$. If $PT = 6$ cm and $PA = 3$ cm, find $PB$.",
      solution: `By the tangent-secant theorem:
$$PT^2 = PA \\times PB$$
$$36 = 3 \\times PB$$
$$PB = \\frac{36}{3} = \\mathbf{12 \\text{ cm}}$$

So $AB = PB - PA = 12 - 3 = 9$ cm.`,
    },
  },
  {
    id: "loci-constructions-10",
    icon: "📏",
    title: "Loci & Constructions",
    subtitle: "Locus theorems and construction of tangents and circumscribed circles",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Locus** is the set of all points satisfying a given condition.

**Standard loci:**
1. Locus of points equidistant from two fixed points → **perpendicular bisector** of the segment.
2. Locus of points equidistant from two intersecting lines → **angle bisectors**.
3. Locus of points at a fixed distance from a point → **circle**.
4. Locus of points at a fixed distance from a line → **pair of parallel lines**.
5. Locus of points equidistant from a fixed point and a fixed line → **parabola**.

**Construction problems in ICSE:**
1. **Tangent to a circle** from an external point:
   - Join the point to the centre.
   - Find the mid-point of this line.
   - Draw a circle with this mid-point as centre and radius = half the line.
   - The intersections with the original circle give the points of tangency.

2. **Circumscribed circle** — draw perpendicular bisectors of any two sides; they meet at the circumcentre.

3. **Inscribed circle** — draw angle bisectors of any two angles; they meet at the incentre. Drop perpendicular to any side for the inradius.`,
    formulas: [],
    example: {
      question: "Construct the locus of points equidistant from two points A and B that are 8 cm apart, and also 5 cm from A. How many such points exist?",
      solution: `**Locus 1:** Points equidistant from A and B → perpendicular bisector of AB (a straight line through the midpoint of AB).

**Locus 2:** Points 5 cm from A → a circle with centre A and radius 5 cm.

The intersection gives the required points.

Since the perpendicular bisector passes through the midpoint of AB (which is 4 cm from A), and the circle has radius 5 cm > 4 cm, the line **intersects** the circle at **2 points**.

There are $\\mathbf{2}$ such points.`,
    },
    practice: {
      question: "Find the locus of a point that is equidistant from $(3, 0)$ and $(0, 4)$.",
      solution: `Let $P(x, y)$ be any point on the locus.

$PA = PB$:
$$\\sqrt{(x-3)^2 + y^2} = \\sqrt{x^2 + (y-4)^2}$$

Squaring:
$$(x-3)^2 + y^2 = x^2 + (y-4)^2$$
$$x^2 - 6x + 9 + y^2 = x^2 + y^2 - 8y + 16$$
$$-6x + 9 = -8y + 16$$
$$\\mathbf{6x - 8y + 7 = 0}$$

This is the perpendicular bisector of the segment joining $(3,0)$ and $(0,4)$.`,
    },
  },
];
