export const CHAPTER_META = {
  id: "cambridge-core-geometry",
  title: "Geometry & Measures",
  subtitle: "Angles, shapes, transformations and trigonometry for Cambridge IGCSE Core",
  icon: "📐",
  color: "#06b6d4",
  tier: "Core",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "angles-polygons",
    icon: "📐",
    title: "Angles & Polygons",
    subtitle: "Angle rules, triangles, quadrilaterals and polygons",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Angle Rules

**Basic angle facts:**
- Angles on a straight line sum to $180°$
- Angles around a point sum to $360°$
- Vertically opposite angles are equal

**Parallel lines** (cut by a transversal):
- **Alternate angles** are equal (Z-angles): $a = b$
- **Corresponding angles** are equal (F-angles): $a = b$
- **Co-interior angles** sum to $180°$ (C-angles): $a + b = 180°$

**Triangles:**
- Angle sum in any triangle $= 180°$
- Exterior angle of a triangle = sum of the two non-adjacent interior angles

**Quadrilaterals:**
- Angle sum $= 360°$

**Regular polygons** (all sides and angles equal):
$$\\text{Interior angle} = \\frac{(n-2)\\times 180°}{n}$$
$$\\text{Exterior angle} = \\frac{360°}{n}$$
- Interior + exterior angle $= 180°$ (angles on a straight line)
- Sum of all exterior angles of any polygon $= 360°$

**Bearings:**
- Measured **clockwise** from **north**
- Always written as **3 digits** (e.g. 045°, 270°)
- Back bearing = bearing + 180° (or − 180°)`,

    formulas: [
      {
        label: "Interior angle of regular polygon",
        latex: "\\text{Interior angle} = \\frac{(n-2)\\times 180°}{n}",
      },
      {
        label: "Exterior angle of regular polygon",
        latex: "\\text{Exterior angle} = \\frac{360°}{n}",
      },
      {
        label: "Bearing",
        latex: "\\text{Measured clockwise from north, written as 3 digits}",
      },
    ],

    example: {
      question:
        "Find the interior angle of a regular octagon.",
      solution: `A regular octagon has $n = 8$ sides.

$$\\text{Interior angle} = \\frac{(8-2)\\times 180°}{8} = \\frac{6\\times 180°}{8} = \\frac{1080°}{8} = 135°$$

The interior angle of a regular octagon is $\\mathbf{135°}$.`,
    },

    practice: {
      question:
        "The exterior angle of a regular polygon is 20°. Find (a) the number of sides, (b) the interior angle.",
      solution: `**(a) Number of sides:**

$$n = \\frac{360°}{\\text{exterior angle}} = \\frac{360°}{20°} = \\mathbf{18 \\text{ sides}}$$

**(b) Interior angle:**

$$\\text{Interior angle} = 180° - 20° = \\mathbf{160°}$$

(Interior and exterior angles are supplementary — they lie on a straight line.)`,
    },
  },

  {
    id: "area-volume-core",
    icon: "📦",
    title: "Area, Perimeter & Volume",
    subtitle: "2D and 3D shapes — all standard formulas",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Area and Perimeter of 2D Shapes

| Shape | Area | Perimeter |
|-------|------|-----------|
| Rectangle | $A = lw$ | $P = 2(l+w)$ |
| Triangle | $A = \\frac{1}{2}bh$ | sum of 3 sides |
| Parallelogram | $A = bh$ | sum of 4 sides |
| Trapezium | $A = \\frac{1}{2}(a+b)h$ | sum of 4 sides |
| Circle | $A = \\pi r^2$ | $C = 2\\pi r = \\pi d$ |

**Semicircle:** Area $= \\frac{1}{2}\\pi r^2$, Perimeter $= \\pi r + 2r$

## Volume of 3D Shapes

**Cuboid:** $V = lwh$

**Prism (any cross-section):**
$$V = A_{\\text{cross-section}} \\times l$$

**Cylinder** (circular prism):
$$V = \\pi r^2 h$$
$$\\text{Curved surface area} = 2\\pi r h$$
$$\\text{Total surface area} = 2\\pi r^2 + 2\\pi r h$$

## Compound Shapes
Split the shape into simpler rectangles, triangles or circles. **Add** areas that are included, **subtract** areas that are cut out.`,

    formulas: [
      { label: "Circle area", latex: "A = \\pi r^2" },
      { label: "Circumference", latex: "C = 2\\pi r" },
      { label: "Cylinder volume", latex: "V = \\pi r^2 h" },
      { label: "Prism volume", latex: "V = A_{\\text{cross}} \\times l" },
      { label: "Trapezium area", latex: "A = \\frac{1}{2}(a+b)h" },
    ],

    example: {
      question:
        "Find the area and perimeter of a semicircle with diameter 10 cm.",
      solution: `Diameter $= 10$ cm, so radius $r = 5$ cm.

**Area of semicircle:**
$$A = \\frac{1}{2}\\pi r^2 = \\frac{1}{2}\\times\\pi\\times 25 = 12.5\\pi \\approx 39.3 \\text{ cm}^2$$

**Perimeter** (curved arc + diameter):
$$P = \\pi r + 2r = 5\\pi + 10 \\approx 15.7 + 10 = 25.7 \\text{ cm}$$`,
    },

    practice: {
      question:
        "A cylinder has radius 3 cm and height 8 cm. Find (a) the volume, (b) the total surface area.",
      solution: `**(a) Volume:**
$$V = \\pi r^2 h = \\pi \\times 9 \\times 8 = 72\\pi \\approx 226 \\text{ cm}^3$$

**(b) Total surface area** (two circular ends + curved surface):
$$SA = 2\\pi r^2 + 2\\pi r h = 2\\pi(9) + 2\\pi(3)(8) = 18\\pi + 48\\pi = 66\\pi \\approx 207 \\text{ cm}^2$$`,
    },
  },

  {
    id: "pythagoras-trig-core",
    icon: "📏",
    title: "Pythagoras & Basic Trigonometry",
    subtitle: "Right-angled triangles — Pythagoras and SOHCAHTOA",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Pythagoras' Theorem

For any **right-angled triangle** with hypotenuse $c$ (the side opposite the right angle):

$$a^2 + b^2 = c^2$$

- To find the hypotenuse: $c = \\sqrt{a^2 + b^2}$
- To find a shorter side: $a = \\sqrt{c^2 - b^2}$

## SOHCAHTOA

Label sides **relative to the angle** $\\theta$ you are working with:
- **Opposite** — the side across from $\\theta$
- **Hypotenuse** — longest side, opposite the right angle
- **Adjacent** — the side next to $\\theta$ (not the hypotenuse)

$$\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}} \\qquad \\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}} \\qquad \\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}$$

**To find a missing side:** rearrange the appropriate ratio.
**To find a missing angle:** use inverse trig — $\\sin^{-1}$, $\\cos^{-1}$, $\\tan^{-1}$.

## Bearings and Right-Angled Triangles
Many bearing problems produce right-angled triangles. Draw a clear diagram, mark north, then apply Pythagoras or SOHCAHTOA to find distances and directions.`,

    formulas: [
      { label: "Pythagoras", latex: "a^2 + b^2 = c^2" },
      {
        label: "Sine ratio",
        latex: "\\sin\\theta = \\frac{\\text{Opp}}{\\text{Hyp}}",
      },
      {
        label: "Cosine ratio",
        latex: "\\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}}",
      },
      {
        label: "Tangent ratio",
        latex: "\\tan\\theta = \\frac{\\text{Opp}}{\\text{Adj}}",
      },
    ],

    example: {
      question:
        "A ladder 5 m long leans against a wall. Its base is 2 m from the wall. Find (a) the angle the ladder makes with the ground, (b) the height it reaches up the wall.",
      solution: `**(a) Angle with ground:**

The adjacent side is 2 m and hypotenuse is 5 m.
$$\\cos\\theta = \\frac{\\text{Adj}}{\\text{Hyp}} = \\frac{2}{5} = 0.4$$
$$\\theta = \\cos^{-1}(0.4) \\approx 66.4°$$

**(b) Height up the wall:**

Using Pythagoras:
$$h = \\sqrt{5^2 - 2^2} = \\sqrt{25 - 4} = \\sqrt{21} \\approx 4.58 \\text{ m}$$`,
    },

    practice: {
      question:
        "A ship travels 8 km north then 6 km east. Find (a) its distance from the starting point, (b) its bearing from the starting point.",
      solution: `**(a) Distance from start:**

The path forms a right-angled triangle with legs 8 km and 6 km.
$$d = \\sqrt{8^2 + 6^2} = \\sqrt{64 + 36} = \\sqrt{100} = \\mathbf{10 \\text{ km}}$$

**(b) Bearing from start:**

The angle $\\theta$ east of north satisfies:
$$\\tan\\theta = \\frac{\\text{east}}{\\text{north}} = \\frac{6}{8} = 0.75$$
$$\\theta = \\tan^{-1}(0.75) \\approx 36.9°$$

Bearing (measured clockwise from north) $= \\mathbf{037°}$ (to 3 significant figures).`,
    },
  },

  {
    id: "transformations-core",
    icon: "🔄",
    title: "Transformations",
    subtitle: "Reflection, rotation, translation and enlargement",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## The Four Transformations

### Reflection
- Describe the **mirror line** (e.g. $x = 2$, $y = -x$, the $x$-axis).
- Each point maps to an equal distance on the other side of the line.

### Rotation
- Describe the **centre** of rotation, the **angle**, and the **direction** (clockwise or anticlockwise).

### Translation
- Describe using a **column vector** $\\binom{x}{y}$, where $x$ is horizontal movement and $y$ is vertical.

### Enlargement
- Describe the **centre** of enlargement and the **scale factor** $k$.
- $k > 1$: image is larger than object.
- $0 < k < 1$: image is smaller (reduction).
- Negative $k$: image appears on the **opposite side** of the centre.

## Congruence and Similarity

- **Congruent shapes** — same size and shape. Produced by: reflections, rotations, translations.
- **Similar shapes** — same shape, different size. Produced by: enlargements.

For similar shapes with linear scale factor $k$:
$$\\text{Area scale factor} = k^2$$
$$\\text{Volume scale factor} = k^3$$`,

    formulas: [
      {
        label: "Translation vector",
        latex: "\\binom{x}{y}",
      },
      {
        label: "Area after enlargement",
        latex: "A_{\\text{image}} = k^2 \\times A_{\\text{object}}",
      },
      {
        label: "Volume after enlargement",
        latex: "V_{\\text{image}} = k^3 \\times V_{\\text{object}}",
      },
    ],

    example: {
      question:
        "Triangle A has vertices (1, 1), (3, 1) and (2, 3). Translate by the vector $\\binom{2}{-1}$. Write down the new vertices.",
      solution: `Add $\\binom{2}{-1}$ to each vertex:

$$( 1+2,\\ 1-1) = (3,\\ 0)$$
$$(3+2,\\ 1-1) = (5,\\ 0)$$
$$(2+2,\\ 3-1) = (4,\\ 2)$$

New vertices: $\\mathbf{(3,0),\\ (5,0),\\ (4,2)}$.`,
    },

    practice: {
      question:
        "Shape P has area 12 cm². It is enlarged with scale factor 3. (a) Find the area of the image. (b) If the enlarged solid has volume 270 cm³, find the volume of the original solid.",
      solution: `**(a) Area of image:**
$$A_{\\text{image}} = k^2 \\times A_{\\text{object}} = 3^2 \\times 12 = 9 \\times 12 = \\mathbf{108 \\text{ cm}^2}$$

**(b) Original volume:**

Volume scale factor $= k^3 = 3^3 = 27$.
$$V_{\\text{original}} = \\frac{V_{\\text{image}}}{27} = \\frac{270}{27} = \\mathbf{10 \\text{ cm}^3}$$`,
    },
  },
];
