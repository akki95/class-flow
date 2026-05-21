export const CHAPTER_META = {
  id: "alevel-trig-y2",
  title: "Trigonometry (Year 2)",
  subtitle: "Reciprocal trig, addition formulae, R·sin(θ+α) form",
  icon: "〜",
  color: "#4ade80",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "reciprocal-trig",
    icon: "〜",
    title: "Reciprocal & Inverse Trig Functions",
    subtitle: "sec, cosec, cot and arcsin, arccos, arctan",
    color: "#4ade80",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Reciprocal Trigonometric Functions

The three reciprocal trig functions are defined as:

$$\\sec\\theta = \\frac{1}{\\cos\\theta}, \\quad \\text{cosec}\\,\\theta = \\frac{1}{\\sin\\theta}, \\quad \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta} = \\frac{1}{\\tan\\theta}$$

### New Pythagorean Identities

Starting from the fundamental identity $\\sin^2\\theta + \\cos^2\\theta \\equiv 1$:

**Divide every term by $\\cos^2\\theta$:**
$$\\frac{\\sin^2\\theta}{\\cos^2\\theta} + 1 \\equiv \\frac{1}{\\cos^2\\theta} \\implies \\tan^2\\theta + 1 \\equiv \\sec^2\\theta$$

**Divide every term by $\\sin^2\\theta$:**
$$1 + \\frac{\\cos^2\\theta}{\\sin^2\\theta} \\equiv \\frac{1}{\\sin^2\\theta} \\implies 1 + \\cot^2\\theta \\equiv \\text{cosec}^2\\theta$$

### Inverse Trigonometric Functions

Inverse trig functions return an angle given a ratio. Because trig functions are periodic, we must restrict their domains to guarantee a unique output:

| Function | Domain | Range |
|---|---|---|
| $\\arcsin(x)$ | $[-1,\\,1]$ | $\\left[-\\dfrac{\\pi}{2},\\,\\dfrac{\\pi}{2}\\right]$ |
| $\\arccos(x)$ | $[-1,\\,1]$ | $[0,\\,\\pi]$ |
| $\\arctan(x)$ | $\\mathbb{R}$ | $\\left(-\\dfrac{\\pi}{2},\\,\\dfrac{\\pi}{2}\\right)$ |

These restrictions ensure each inverse function is one-to-one and well-defined.`,
    formulas: [
      { label: "Secant", formula: `\\sec\\theta = \\frac{1}{\\cos\\theta}` },
      { label: "Cosecant", formula: `\\text{cosec}\\,\\theta = \\frac{1}{\\sin\\theta}` },
      { label: "Cotangent", formula: `\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}` },
      { label: "Pythagorean (tan)", formula: `1+\\tan^2\\theta \\equiv \\sec^2\\theta` },
      { label: "Pythagorean (cot)", formula: `1+\\cot^2\\theta \\equiv \\text{cosec}^2\\,\\theta` },
    ],
    example: {
      question: "Simplify $\\dfrac{\\sec^2\\theta - 1}{\\sec\\theta}$.",
      steps: [
        "Use the identity $1 + \\tan^2\\theta \\equiv \\sec^2\\theta$, so $\\sec^2\\theta - 1 = \\tan^2\\theta$.",
        "The expression becomes $\\dfrac{\\tan^2\\theta}{\\sec\\theta}$.",
        "Replace $\\sec\\theta$ with $\\dfrac{1}{\\cos\\theta}$: $\\quad \\tan^2\\theta \\cdot \\cos\\theta$.",
        "Write $\\tan^2\\theta = \\dfrac{\\sin^2\\theta}{\\cos^2\\theta}$: $\\quad \\dfrac{\\sin^2\\theta}{\\cos^2\\theta} \\cdot \\cos\\theta = \\dfrac{\\sin^2\\theta}{\\cos\\theta}$.",
      ],
      answer: "$\\dfrac{\\sin^2\\theta}{\\cos\\theta}$",
    },
    practice: {
      question: "Solve $\\sec^2\\theta = 4$ for $0 \\le \\theta \\le 2\\pi$.",
      hint: "Convert to $\\cos^2\\theta$ and solve.",
      solution:
        "$\\sec^2\\theta = 4 \\Rightarrow \\cos^2\\theta = \\dfrac{1}{4} \\Rightarrow \\cos\\theta = \\pm\\dfrac{1}{2}$. " +
        "Solutions: $\\theta = \\dfrac{\\pi}{3},\\; \\dfrac{2\\pi}{3},\\; \\dfrac{4\\pi}{3},\\; \\dfrac{5\\pi}{3}$.",
    },
  },
  {
    id: "addition-formulae",
    icon: "〜",
    title: "Addition & Double Angle Formulae",
    subtitle: "sin(A±B), cos(A±B), tan(A±B), double angles",
    color: "#4ade80",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Addition Formulae

$$\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B$$

$$\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B$$

$$\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}$$

> Note the **minus sign** in the denominator of $\\tan(A+B)$ and the **plus** in $\\tan(A-B)$.

## Double Angle Formulae

Setting $B = A$ in the addition formulae:

$$\\sin 2A = 2\\sin A\\cos A$$

$$\\cos 2A = \\cos^2 A - \\sin^2 A = 2\\cos^2 A - 1 = 1 - 2\\sin^2 A$$

$$\\tan 2A = \\frac{2\\tan A}{1 - \\tan^2 A}$$

The three forms of $\\cos 2A$ are all equivalent (using $\\sin^2 A + \\cos^2 A = 1$). Choose the form that is most useful for the problem.

### Key Applications

- **Finding exact values** — e.g. express 75° = 45° + 30° and use known values.
- **Simplifying expressions** — replace $\\cos^2 x$ with $\\tfrac{1}{2}(1+\\cos 2x)$ for integration.
- **Solving equations** — rewrite in terms of a single angle.`,
    formulas: [
      { label: "sin addition", formula: `\\sin(A\\pm B)=\\sin A\\cos B\\pm\\cos A\\sin B` },
      { label: "cos addition", formula: `\\cos(A\\pm B)=\\cos A\\cos B\\mp\\sin A\\sin B` },
      { label: "tan addition", formula: `\\tan(A\\pm B)=\\dfrac{\\tan A\\pm\\tan B}{1\\mp\\tan A\\tan B}` },
      { label: "sin double angle", formula: `\\sin 2A=2\\sin A\\cos A` },
      { label: "cos double angle (sin form)", formula: `\\cos 2A=1-2\\sin^2 A` },
      { label: "cos double angle (cos form)", formula: `\\cos 2A=2\\cos^2 A-1` },
    ],
    example: {
      question: "Find the exact value of $\\sin 75°$.",
      steps: [
        "Write $75° = 45° + 30°$.",
        "Apply $\\sin(A+B) = \\sin A\\cos B + \\cos A\\sin B$:",
        "$\\sin 75° = \\sin 45°\\cos 30° + \\cos 45°\\sin 30°$",
        "$= \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2} \\cdot \\dfrac{1}{2} = \\dfrac{\\sqrt{6}}{4} + \\dfrac{\\sqrt{2}}{4}$",
      ],
      answer: "$\\dfrac{\\sqrt{6}+\\sqrt{2}}{4}$",
    },
    practice: {
      question: "Prove that $\\dfrac{\\cos 2\\theta}{1+\\sin 2\\theta} = \\dfrac{\\cos\\theta - \\sin\\theta}{\\cos\\theta + \\sin\\theta}$.",
      hint: "Expand numerator and denominator on the LHS using double angle formulae.",
      solution:
        "LHS numerator: $\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = (\\cos\\theta-\\sin\\theta)(\\cos\\theta+\\sin\\theta)$. " +
        "LHS denominator: $1 + \\sin 2\\theta = \\sin^2\\theta + \\cos^2\\theta + 2\\sin\\theta\\cos\\theta = (\\cos\\theta+\\sin\\theta)^2$. " +
        "So LHS $= \\dfrac{(\\cos\\theta-\\sin\\theta)(\\cos\\theta+\\sin\\theta)}{(\\cos\\theta+\\sin\\theta)^2} = \\dfrac{\\cos\\theta-\\sin\\theta}{\\cos\\theta+\\sin\\theta}$ = RHS ✓",
    },
  },
  {
    id: "r-sin-form",
    icon: "〜",
    title: "Rsin(θ+α) Form",
    subtitle: "Writing a·sinθ + b·cosθ in the form R·sin(θ+α)",
    color: "#4ade80",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Writing $a\\sin\\theta + b\\cos\\theta$ in Harmonic Form

Any expression of the form $a\\sin\\theta + b\\cos\\theta$ can be written as a **single sinusoidal function**:

$$a\\sin\\theta + b\\cos\\theta = R\\sin(\\theta + \\alpha)$$

### How to Find R and α

Expand the right-hand side using the addition formula:

$$R\\sin(\\theta+\\alpha) = R\\sin\\theta\\cos\\alpha + R\\cos\\theta\\sin\\alpha$$

Comparing coefficients with $a\\sin\\theta + b\\cos\\theta$:

$$R\\cos\\alpha = a \\qquad R\\sin\\alpha = b$$

Squaring and adding: $R^2 = a^2 + b^2 \\Rightarrow \\boxed{R = \\sqrt{a^2+b^2}}$

Dividing: $\\tan\\alpha = \\dfrac{b}{a} \\Rightarrow \\boxed{\\alpha = \\arctan\\!\\left(\\dfrac{b}{a}\\right)}$

### Applications

- **Maximum value** = $R$, achieved when $\\sin(\\theta+\\alpha)=1$, i.e. $\\theta+\\alpha=\\dfrac{\\pi}{2}$.
- **Minimum value** = $-R$, achieved when $\\theta+\\alpha = -\\dfrac{\\pi}{2}$.
- **Solving equations** of the form $a\\sin\\theta + b\\cos\\theta = k$: rewrite as $R\\sin(\\theta+\\alpha)=k$, then $\\sin(\\theta+\\alpha)=k/R$.

> The same method works for $R\\cos(\\theta - \\beta)$ form; choose whichever suits the problem.`,
    formulas: [
      { label: "Harmonic form", formula: `a\\sin\\theta+b\\cos\\theta=R\\sin(\\theta+\\alpha)` },
      { label: "Amplitude", formula: `R=\\sqrt{a^2+b^2}` },
      { label: "Phase angle", formula: `\\tan\\alpha=\\dfrac{b}{a}` },
      { label: "Maximum value", formula: `\\text{max} = R \\text{ when } \\theta+\\alpha=\\dfrac{\\pi}{2}` },
    ],
    example: {
      question: "Write $3\\sin\\theta + 4\\cos\\theta$ in the form $R\\sin(\\theta+\\alpha)$. Hence state the maximum value and the value of $\\theta$ at which it occurs.",
      steps: [
        "$R = \\sqrt{3^2+4^2} = \\sqrt{9+16} = \\sqrt{25} = 5$.",
        "$\\tan\\alpha = \\dfrac{4}{3}$, so $\\alpha = \\arctan\\!\\left(\\dfrac{4}{3}\\right) \\approx 53.1°$.",
        "Answer: $3\\sin\\theta + 4\\cos\\theta = 5\\sin(\\theta + 53.1°)$.",
        "Maximum value $= 5$, when $\\theta + 53.1° = 90°$, i.e. $\\theta = 36.9°$.",
      ],
      answer: "$5\\sin(\\theta + 53.1°)$; maximum value $= 5$ at $\\theta \\approx 36.9°$.",
    },
    practice: {
      question:
        "Write $\\sin\\theta - \\sqrt{3}\\cos\\theta$ in the form $R\\sin(\\theta - \\alpha)$ where $R > 0$ and $0 < \\alpha < \\frac{\\pi}{2}$. State the maximum and minimum values.",
      hint: "Expand $R\\sin(\\theta-\\alpha)$ and compare coefficients.",
      solution:
        "$R\\sin(\\theta-\\alpha) = R\\sin\\theta\\cos\\alpha - R\\cos\\theta\\sin\\alpha$. " +
        "So $R\\cos\\alpha = 1$ and $R\\sin\\alpha = \\sqrt{3}$. " +
        "$R = \\sqrt{1+3} = 2$. $\\tan\\alpha = \\sqrt{3}$, so $\\alpha = \\dfrac{\\pi}{3}$ (i.e. 60°). " +
        "Answer: $2\\sin\\!\\left(\\theta - \\dfrac{\\pi}{3}\\right)$. Maximum $= 2$, minimum $= -2$.",
    },
  },
];
