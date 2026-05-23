export const CHAPTER_META = {
  id: "icse-10-trigonometry",
  title: "Trigonometry",
  subtitle: "Identities, proofs, and heights & distances",
  icon: "📐",
  color: "#f97316",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "trig-identities",
    icon: "📐",
    title: "Trigonometric Identities & Proofs",
    subtitle: "Fundamental identities and proving trigonometric equations",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Fundamental identities:**
$$\\sin^2\\theta + \\cos^2\\theta = 1$$
$$1 + \\tan^2\\theta = \\sec^2\\theta$$
$$1 + \\cot^2\\theta = \\csc^2\\theta$$

**Derived forms:**
$$\\sin^2\\theta = 1 - \\cos^2\\theta, \\quad \\cos^2\\theta = 1 - \\sin^2\\theta$$
$$\\sec^2\\theta - \\tan^2\\theta = 1 \\implies (\\sec\\theta + \\tan\\theta)(\\sec\\theta - \\tan\\theta) = 1$$
$$\\csc^2\\theta - \\cot^2\\theta = 1$$

**Strategies for proving identities:**
1. Start from the **more complex** side (usually LHS).
2. Convert everything to $\\sin$ and $\\cos$.
3. Look for opportunities to use $\\sin^2 + \\cos^2 = 1$.
4. Factorise using $a^2 - b^2 = (a+b)(a-b)$.
5. Multiply numerator and denominator by a conjugate.

**Common manipulations:**
$$\\frac{1 - \\cos\\theta}{\\sin\\theta} = \\frac{\\sin\\theta}{1 + \\cos\\theta}$$
$$\\sec\\theta + \\tan\\theta = \\frac{1}{\\sec\\theta - \\tan\\theta}$$`,
    formulas: [
      {
        label: "Pythagorean",
        latex: "\\sin^2\\theta + \\cos^2\\theta = 1",
      },
      {
        label: "sec-tan",
        latex: "1 + \\tan^2\\theta = \\sec^2\\theta",
      },
      {
        label: "csc-cot",
        latex: "1 + \\cot^2\\theta = \\csc^2\\theta",
      },
    ],
    example: {
      question: "Prove: $\\frac{\\sin\\theta}{1 - \\cos\\theta} + \\frac{\\sin\\theta}{1 + \\cos\\theta} = 2\\csc\\theta$",
      solution: `**LHS:**

$$= \\frac{\\sin\\theta(1 + \\cos\\theta) + \\sin\\theta(1 - \\cos\\theta)}{(1 - \\cos\\theta)(1 + \\cos\\theta)}$$

$$= \\frac{\\sin\\theta + \\sin\\theta\\cos\\theta + \\sin\\theta - \\sin\\theta\\cos\\theta}{1 - \\cos^2\\theta}$$

$$= \\frac{2\\sin\\theta}{\\sin^2\\theta}$$

$$= \\frac{2}{\\sin\\theta} = 2\\csc\\theta = \\text{RHS}$$

∎`,
    },
    practice: {
      question: "Prove: $(\\sin\\theta + \\cos\\theta)^2 + (\\sin\\theta - \\cos\\theta)^2 = 2$",
      solution: `**LHS:**
$$= \\sin^2\\theta + 2\\sin\\theta\\cos\\theta + \\cos^2\\theta + \\sin^2\\theta - 2\\sin\\theta\\cos\\theta + \\cos^2\\theta$$

$$= 2\\sin^2\\theta + 2\\cos^2\\theta$$

$$= 2(\\sin^2\\theta + \\cos^2\\theta)$$

$$= 2(1) = 2 = \\text{RHS}$$

∎`,
    },
  },
  {
    id: "heights-distances",
    icon: "🏔️",
    title: "Heights & Distances",
    subtitle: "Angle of elevation, angle of depression and multi-step problems",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Angle of Elevation:** The angle formed between the horizontal and the line of sight when looking **upward** at an object.

**Angle of Depression:** The angle formed between the horizontal and the line of sight when looking **downward** at an object.

**Key fact:** The angle of elevation from point A to point B equals the angle of depression from B to A (alternate angles).

**Problem-solving strategy:**
1. Draw a clear diagram with all given information.
2. Identify right triangles in the figure.
3. Choose the appropriate trig ratio (SOH-CAH-TOA).
4. Set up and solve equations.

**Common setups:**
- **Tower on ground:** observer at a distance, angle of elevation given.
- **Two positions:** observer moves, two angles of elevation → find height.
- **Tower on a building/cliff:** two right triangles share a vertical side.
- **Two objects:** angle of depression from a height to two points.

**Standard values used:**
$\\tan 30° = \\frac{1}{\\sqrt{3}}$, $\\tan 45° = 1$, $\\tan 60° = \\sqrt{3}$`,
    formulas: [
      {
        label: "Height from elevation",
        latex: "h = d \\times \\tan(\\text{angle of elevation})",
      },
      {
        label: "Distance from elevation",
        latex: "d = \\frac{h}{\\tan(\\text{angle})}",
      },
    ],
    example: {
      question: "From a point on the ground 40 m away from the base of a tower, the angle of elevation of the top is $60°$. Find the height of the tower.",
      solution: `Let the height $= h$.

$$\\tan 60° = \\frac{h}{40}$$

$$\\sqrt{3} = \\frac{h}{40}$$

$$h = 40\\sqrt{3} = 40 \\times 1.732$$

$$= \\mathbf{69.28 \\text{ m}}$$`,
    },
    practice: {
      question: "From the top of a 75 m high lighthouse, the angles of depression of two ships are $30°$ and $45°$ on the same side. Find the distance between the two ships.",
      solution: `Let the distances from the base be $d_1$ (nearer, $45°$) and $d_2$ (farther, $30°$).

$$\\tan 45° = \\frac{75}{d_1} \\implies d_1 = 75 \\text{ m}$$

$$\\tan 30° = \\frac{75}{d_2} \\implies d_2 = 75\\sqrt{3} = 129.9 \\text{ m}$$

Distance between ships $= d_2 - d_1 = 75\\sqrt{3} - 75 = 75(\\sqrt{3} - 1)$

$$= 75(1.732 - 1) = 75 \\times 0.732 = \\mathbf{54.9 \\text{ m}}$$`,
    },
  },
];
