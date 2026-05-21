export const CHAPTER_META = {
  id: "alevel-forces-2d",
  title: "Forces in 2D",
  subtitle: "Resolving forces, equilibrium on slopes and friction",
  icon: "⚖️",
  color: "#ef4444",
  year: "2",
  paper: "A-Level Applied",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "resolving-2d",
    icon: "⚖️",
    title: "Resolving Forces & Equilibrium",
    subtitle: "Components, equilibrium on slopes and planes",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Resolving forces** means splitting a force into two perpendicular components. For a force of magnitude $F$ acting at angle $\\theta$ to the horizontal:
$$F_x = F\\cos\\theta \\qquad F_y = F\\sin\\theta$$

**Equilibrium conditions** (particle or rigid body):
$$\\sum F_x = 0 \\qquad \\sum F_y = 0$$

---

**Inclined plane at angle $\\alpha$:**

Taking axes parallel and perpendicular to the slope:
- Component of weight **along** the slope (down): $mg\\sin\\alpha$
- Component of weight **perpendicular** to the slope (into surface): $mg\\cos\\alpha$
- Normal reaction: $R = mg\\cos\\alpha$ (if no other perpendicular forces)
- Friction (opposing motion or tendency to move): $F \\leq \\mu R$

At limiting equilibrium (on the verge of sliding): $F = \\mu R$.

---

**Lami's theorem:** For three concurrent coplanar forces in equilibrium, each force divided by the sine of the angle between the other two forces is constant:
$$\\frac{F_1}{\\sin\\alpha_1} = \\frac{F_2}{\\sin\\alpha_2} = \\frac{F_3}{\\sin\\alpha_3}$$
where $\\alpha_i$ is the angle between the other two forces (i.e. the angle **opposite** to $F_i$).`,
    formulas: [
      "F_x = F\\cos\\theta, \\quad F_y = F\\sin\\theta",
      "\\text{Incline: weight along slope} = mg\\sin\\alpha",
      "\\text{Incline: weight perpendicular} = mg\\cos\\alpha",
      "F \\leq \\mu R \\quad (\\text{friction limit})",
    ],
    example: {
      question:
        "A particle of mass 4 kg rests on a rough slope inclined at 25° to the horizontal. The coefficient of friction is $\\mu = 0.3$. Find the acceleration of the particle down the slope.",
      solution: `**Normal reaction** (perpendicular to slope):
$$R = 4g\\cos 25° = 4 \\times 9.8 \\times 0.9063 \\approx 35.5 \\text{ N}$$

**Friction force** (limiting, up the slope):
$$F = \\mu R = 0.3 \\times 35.5 \\approx 10.6 \\text{ N}$$

**Net force down the slope** (Newton's second law):
$$4g\\sin 25° - F = 4a$$
$$4 \\times 9.8 \\times 0.4226 - 10.6 = 4a$$
$$16.56 - 10.6 = 4a$$
$$a = \\frac{5.96}{4} \\approx \\mathbf{1.5 \\text{ m s}^{-2}}$$`,
    },
    practice: {
      question:
        "A 5 kg block is held in equilibrium by two strings. String 1 makes 40° with the vertical, string 2 is horizontal. Find the tensions $T_1$ and $T_2$.",
      solution: `**Resolve vertically** ($T_1$ has a vertical component, weight acts down):
$$T_1 \\cos 40° = 5g$$
$$T_1 = \\frac{5 \\times 9.8}{\\cos 40°} = \\frac{49}{0.7660} \\approx \\mathbf{64.0 \\text{ N}}$$

**Resolve horizontally** ($T_2$ balances the horizontal component of $T_1$):
$$T_2 = T_1 \\sin 40° = 64.0 \\times 0.6428 \\approx \\mathbf{41.1 \\text{ N}}$$`,
    },
  },
  {
    id: "friction-al",
    icon: "μ",
    title: "Friction",
    subtitle: "Coefficient of friction, limiting equilibrium on slopes",
    color: "#ef4444",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Friction** is a contact force that opposes relative motion (or tendency of motion) between surfaces. The friction force $F$ satisfies:
$$F \\le \\mu R$$
where $\\mu$ is the **coefficient of friction** (a dimensionless constant, 0 ≤ μ ≤ 1 typically) and $R$ is the normal reaction.

At **limiting equilibrium** (object on the verge of moving): $F = \\mu R$.

When the object is **moving**: kinetic friction $F = \\mu R$ (constant, same formula).

When **stationary** with an applied force: $F < \\mu R$ (static friction adjusts to prevent motion).

On an **inclined plane** at angle α:
- Normal reaction: $R = mg\\cos\\alpha$
- Friction (limiting, up the slope): $F = \\mu mg\\cos\\alpha$
- Weight component down slope: $mg\\sin\\alpha$

At **limiting equilibrium on a slope**: $\\tan\\alpha = \\mu$ (the "angle of friction").

**Important**: always draw a force diagram first and state the direction of friction clearly (opposes direction of motion or impending motion).`,
    formulas: [
      { label: "Friction inequality", latex: "F \\le \\mu R", note: "Limiting case: $F = \\mu R$ when on the point of sliding" },
      { label: "On inclined plane", latex: "R = mg\\cos\\alpha, \\quad F = \\mu R = \\mu mg\\cos\\alpha", note: "Normal reaction perpendicular to slope" },
      { label: "Angle of friction", latex: "\\tan\\alpha = \\mu", note: "Angle at which object is on the point of sliding under gravity alone" },
    ],
    example: {
      question: "A box of mass 8 kg rests on a rough horizontal surface with coefficient of friction μ = 0.35. A horizontal force P is applied. Find (a) the maximum friction force, (b) the minimum value of P needed to move the box.",
      steps: [
        { label: "Find normal reaction (horizontal surface)", math: "R = mg = 8 \\times 9.8 = 78.4\\text{ N}" },
        { label: "(a) Maximum friction force", math: "F_{\\max} = \\mu R = 0.35 \\times 78.4 = 27.44\\text{ N}" },
        { label: "(b) Minimum P to move box", math: "P > F_{\\max} = 27.44\\text{ N, so minimum } P = 27.44\\text{ N}" },
      ],
    },
    practice: {
      question: "A particle of mass 5 kg rests on a rough slope inclined at 30° to the horizontal. The coefficient of friction between the particle and the slope is μ = 0.4. Find the acceleration of the particle if it is released from rest.",
      solution: [
        { step: "Find normal reaction", math: "R = 5g\\cos30° = 5 \\times 9.8 \\times \\frac{\\sqrt{3}}{2} \\approx 42.4\\text{ N}" },
        { step: "Find friction force (opposing motion, so acting up the slope)", math: "F = \\mu R = 0.4 \\times 42.4 = 16.97\\text{ N}" },
        { step: "Resultant force down the slope", math: "F_{\\text{net}} = 5g\\sin30° - F = 5 \\times 9.8 \\times 0.5 - 16.97 = 24.5 - 16.97 = 7.53\\text{ N}" },
        { step: "Apply Newton's second law", math: "a = \\frac{F_{\\text{net}}}{m} = \\frac{7.53}{5} \\approx 1.51\\text{ m/s}^2\\text{ down the slope}" },
      ],
    },
  },
];
