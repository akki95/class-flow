export const CHAPTER_META = {
  id: "icse-10-mensuration",
  title: "Mensuration",
  subtitle: "Surface area and volume of combined solids, conversion between solids",
  icon: "📦",
  color: "#8b5cf6",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "combined-solids",
    icon: "📦",
    title: "Combined & Converted Solids",
    subtitle: "Surface area and volume of composite figures and melting-recasting problems",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Key formulae recap:**

| Solid | CSA | TSA | Volume |
|-------|-----|-----|--------|
| Cylinder | $2\\pi rh$ | $2\\pi r(r+h)$ | $\\pi r^2 h$ |
| Cone | $\\pi rl$ | $\\pi r(r+l)$ | $\\frac{1}{3}\\pi r^2 h$ |
| Sphere | $4\\pi r^2$ | $4\\pi r^2$ | $\\frac{4}{3}\\pi r^3$ |
| Hemisphere | $2\\pi r^2$ | $3\\pi r^2$ | $\\frac{2}{3}\\pi r^3$ |

where $l = \\sqrt{r^2 + h^2}$ for a cone.

**Combined solids:** Break the figure into simpler shapes. Add the exposed surface areas (don't double-count the joining face).

**Common combinations:**
- Cone on top of a cylinder (like an ice-cream shape)
- Hemisphere on top of a cylinder (like a capsule)
- Cone inside a cylinder (funnel shape)

**Melting & recasting:** When a solid is melted and recast into a different shape:
$$\\text{Volume of original} = \\text{Volume of new solid}$$

**Number of objects formed:**
$$n = \\frac{\\text{Volume of original}}{\\text{Volume of one small object}}$$`,
    formulas: [
      {
        label: "Cylinder + Cone SA",
        latex: "\\text{SA} = 2\\pi rh + \\pi rl + \\pi r^2",
      },
      {
        label: "Conversion",
        latex: "V_{\\text{original}} = V_{\\text{new}}",
      },
      {
        label: "Number of objects",
        latex: "n = \\frac{V_{\\text{big}}}{V_{\\text{small}}}",
      },
    ],
    example: {
      question: "A solid is in the form of a cone mounted on a hemisphere, both of radius 3.5 cm. The total height of the solid is 9.5 cm. Find the total surface area. (Use $\\pi = \\frac{22}{7}$)",
      solution: `Radius $r = 3.5$ cm. Height of cone $h = 9.5 - 3.5 = 6$ cm.

Slant height: $l = \\sqrt{3.5^2 + 6^2} = \\sqrt{12.25 + 36} = \\sqrt{48.25} \\approx 6.95$ cm

**TSA** = CSA of cone + CSA of hemisphere (no base — they join):

$$= \\pi r l + 2\\pi r^2$$

$$= \\frac{22}{7} \\times 3.5 \\times 6.95 + 2 \\times \\frac{22}{7} \\times 3.5^2$$

$$= 11 \\times 6.95 + 2 \\times 11 \\times 3.5$$

$$= 76.45 + 77 = \\mathbf{153.45 \\text{ cm}^2}$$`,
    },
    practice: {
      question: "A metallic cylinder of radius 3 cm and height 5 cm is melted and recast into cones of radius 1 cm and height 1 cm. How many cones are formed?",
      solution: `**Volume of cylinder:**
$$V_c = \\pi (3)^2 (5) = 45\\pi \\text{ cm}^3$$

**Volume of one cone:**
$$V_{\\text{cone}} = \\frac{1}{3}\\pi (1)^2 (1) = \\frac{\\pi}{3} \\text{ cm}^3$$

**Number of cones:**
$$n = \\frac{45\\pi}{\\frac{\\pi}{3}} = 45 \\times 3 = \\mathbf{135}$$`,
    },
  },
  {
    id: "area-sector-segment",
    icon: "🥧",
    title: "Area of Sector & Segment",
    subtitle: "Arc length, area of sector and area of segment of a circle",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Arc length** of a sector with angle $\\theta$ (in degrees):
$$l = \\frac{\\theta}{360°} \\times 2\\pi r$$

**Area of a sector:**
$$A_{\\text{sector}} = \\frac{\\theta}{360°} \\times \\pi r^2$$

**Area of a segment** = Area of sector − Area of triangle

$$A_{\\text{segment}} = \\frac{\\theta}{360°} \\times \\pi r^2 - \\frac{1}{2}r^2 \\sin\\theta$$

**Perimeter of a sector** = arc length + 2 radii
$$P = \\frac{\\theta}{360°} \\times 2\\pi r + 2r$$

**Major vs Minor:**
- Minor sector/arc: $\\theta < 180°$
- Major sector/arc: $360° - \\theta$
- Area of major sector = $\\pi r^2 -$ area of minor sector

**Useful:** Area of ring (annulus) between radii $R$ and $r$:
$$A = \\pi(R^2 - r^2)$$`,
    formulas: [
      {
        label: "Arc length",
        latex: "l = \\frac{\\theta}{360°} \\times 2\\pi r",
      },
      {
        label: "Area of sector",
        latex: "A = \\frac{\\theta}{360°} \\times \\pi r^2",
      },
      {
        label: "Area of segment",
        latex: "A = \\frac{\\theta}{360°} \\pi r^2 - \\frac{1}{2}r^2\\sin\\theta",
      },
    ],
    example: {
      question: "Find the area of a sector with radius 14 cm and angle 90°. Also find the area of the corresponding segment. (Use $\\pi = \\frac{22}{7}$)",
      solution: `**Area of sector:**
$$= \\frac{90}{360} \\times \\frac{22}{7} \\times 14^2 = \\frac{1}{4} \\times \\frac{22}{7} \\times 196 = \\frac{1}{4} \\times 616 = 154 \\text{ cm}^2$$

**Area of triangle** (right triangle with legs = $r$):
$$= \\frac{1}{2} \\times 14 \\times 14 = 98 \\text{ cm}^2$$

**Area of segment:**
$$= 154 - 98 = \\mathbf{56 \\text{ cm}^2}$$`,
    },
    practice: {
      question: "The minute hand of a clock is 12 cm long. Find the area swept by it in 20 minutes.",
      solution: `In 60 minutes, the hand sweeps $360°$.

In 20 minutes: $\\theta = \\frac{20}{60} \\times 360° = 120°$

$$A = \\frac{120}{360} \\times \\pi \\times 12^2 = \\frac{1}{3} \\times \\pi \\times 144 = 48\\pi$$

$$= 48 \\times 3.14 = \\mathbf{150.72 \\text{ cm}^2}$$`,
    },
  },
];
