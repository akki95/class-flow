export const CHAPTER_META = {
  id: "icse-9-mensuration",
  title: "Mensuration",
  subtitle: "Area of triangles, surface area and volume of solids",
  icon: "📦",
  color: "#8b5cf6",
  tier: "Class 9",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "area-triangles",
    icon: "🔺",
    title: "Area of Triangles",
    subtitle: "Heron's formula and area from base-height",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Area using base and height:**
$$A = \\frac{1}{2} \\times b \\times h$$

**Heron's formula** — when all three sides are known:

Let $a, b, c$ be the sides and $s$ the semi-perimeter:
$$s = \\frac{a + b + c}{2}$$
$$A = \\sqrt{s(s-a)(s-b)(s-c)}$$

**Special cases:**
- Equilateral triangle (side $a$): $A = \\frac{\\sqrt{3}}{4} a^2$
- Isosceles triangle (equal sides $a$, base $b$): $A = \\frac{b}{4}\\sqrt{4a^2 - b^2}$
- Right triangle (legs $a, b$): $A = \\frac{1}{2}ab$

**Area of a quadrilateral** can be found by splitting it into two triangles using a diagonal.`,
    formulas: [
      {
        label: "Base-height",
        latex: "A = \\frac{1}{2} \\times b \\times h",
      },
      {
        label: "Heron's formula",
        latex: "A = \\sqrt{s(s-a)(s-b)(s-c)}",
      },
      {
        label: "Semi-perimeter",
        latex: "s = \\frac{a + b + c}{2}",
      },
      {
        label: "Equilateral",
        latex: "A = \\frac{\\sqrt{3}}{4} a^2",
      },
    ],
    example: {
      question: "Find the area of a triangle with sides 13 cm, 14 cm and 15 cm.",
      solution: `$$s = \\frac{13 + 14 + 15}{2} = \\frac{42}{2} = 21$$

$$A = \\sqrt{21(21-13)(21-14)(21-15)}$$

$$= \\sqrt{21 \\times 8 \\times 7 \\times 6}$$

$$= \\sqrt{21 \\times 8 \\times 42} = \\sqrt{7056}$$

$$= \\mathbf{84 \\text{ cm}^2}$$`,
    },
    practice: {
      question: "Find the area of an equilateral triangle with perimeter 36 cm.",
      solution: `Side $= \\frac{36}{3} = 12$ cm.

$$A = \\frac{\\sqrt{3}}{4} \\times 12^2 = \\frac{\\sqrt{3}}{4} \\times 144 = 36\\sqrt{3}$$

$$= 36 \\times 1.732 = \\mathbf{62.35 \\text{ cm}^2}$$`,
    },
  },
  {
    id: "solids-sa-vol",
    icon: "📦",
    title: "Surface Area & Volume of Solids",
    subtitle: "Cylinder, cone and sphere — CSA, TSA and volume",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Cylinder** (radius $r$, height $h$):
$$\\text{CSA} = 2\\pi rh$$
$$\\text{TSA} = 2\\pi r(r + h)$$
$$\\text{Volume} = \\pi r^2 h$$

**Cone** (radius $r$, height $h$, slant height $l = \\sqrt{r^2 + h^2}$):
$$\\text{CSA} = \\pi r l$$
$$\\text{TSA} = \\pi r(r + l)$$
$$\\text{Volume} = \\frac{1}{3}\\pi r^2 h$$

**Sphere** (radius $r$):
$$\\text{Surface area} = 4\\pi r^2$$
$$\\text{Volume} = \\frac{4}{3}\\pi r^3$$

**Hemisphere** (radius $r$):
$$\\text{CSA} = 2\\pi r^2$$
$$\\text{TSA} = 3\\pi r^2$$
$$\\text{Volume} = \\frac{2}{3}\\pi r^3$$

**Useful relationship:** Volume of sphere : Volume of cylinder : Volume of cone $= 2 : 3 : 1$ (when all have the same radius and height $= 2r$).`,
    formulas: [
      {
        label: "Cylinder volume",
        latex: "V = \\pi r^2 h",
      },
      {
        label: "Cone volume",
        latex: "V = \\frac{1}{3}\\pi r^2 h",
      },
      {
        label: "Sphere volume",
        latex: "V = \\frac{4}{3}\\pi r^3",
      },
      {
        label: "Slant height",
        latex: "l = \\sqrt{r^2 + h^2}",
      },
    ],
    example: {
      question: "A cone has radius 7 cm and height 24 cm. Find its slant height, CSA and volume. (Take $\\pi = \\frac{22}{7}$)",
      solution: `$$l = \\sqrt{7^2 + 24^2} = \\sqrt{49 + 576} = \\sqrt{625} = \\mathbf{25 \\text{ cm}}$$

$$\\text{CSA} = \\pi r l = \\frac{22}{7} \\times 7 \\times 25 = \\mathbf{550 \\text{ cm}^2}$$

$$\\text{Volume} = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3} \\times \\frac{22}{7} \\times 49 \\times 24$$

$$= \\frac{1}{3} \\times 22 \\times 7 \\times 24 = \\frac{3696}{3} = \\mathbf{1232 \\text{ cm}^3}$$`,
    },
    practice: {
      question: "A metallic sphere of radius 6 cm is melted and recast into a cylinder of radius 4 cm. Find the height of the cylinder.",
      solution: `Volume of sphere = Volume of cylinder

$$\\frac{4}{3}\\pi (6)^3 = \\pi (4)^2 \\times h$$

$$\\frac{4}{3} \\times 216 = 16h$$

$$288 = 16h$$

$$h = \\frac{288}{16} = \\mathbf{18 \\text{ cm}}$$`,
    },
  },
];
