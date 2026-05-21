export const CHAPTER_META = {
  id: "alevel-integration-y2",
  title: "Integration (Year 2)",
  subtitle: "Integration by substitution, parts, and partial fractions",
  icon: "∫",
  color: "#0be5a0",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "integration-substitution",
    icon: "∫",
    title: "Integration by Substitution",
    subtitle: "Using a substitution to simplify integrals",
    color: "#0be5a0",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Integration by Substitution

Substitution is the integration analogue of the chain rule. The goal is to replace a complicated integral in $x$ with a simpler integral in $u$.

### Method

1. **Choose** a substitution $u = g(x)$.
2. **Differentiate** to find $\\dfrac{du}{dx}$, then write $dx = \\dfrac{du}{g'(x)}$.
3. **Replace** every occurrence of $x$ (and $dx$) with expressions in $u$.
4. **Integrate** in terms of $u$.
5. **Back-substitute**: replace $u$ with the original expression in $x$.

### Definite Integrals

When evaluating a definite integral, change the limits at the substitution step:
- When $x = a$, the new lower limit is $u = g(a)$.
- When $x = b$, the new upper limit is $u = g(b)$.
Then there is no need to back-substitute.

### Common Substitutions

| Integrand contains | Try |
|---|---|
| $2x\\,\\sqrt{x^2+1}$ | $u = x^2+1$ |
| $\\sqrt{a^2 - x^2}$ | $x = a\\sin\\theta$ |
| $\\sqrt{a^2 + x^2}$ | $x = a\\tan\\theta$ |

### Reverse Chain Rule

When the integrand is a constant multiple of $f'(x)\\cdot[f(x)]^n$ or $\\dfrac{f'(x)}{f(x)}$, you can spot the answer directly:

$$\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln|f(x)| + c$$

$$\\int f'(x)\\,[f(x)]^n\\,dx = \\frac{[f(x)]^{n+1}}{n+1} + c \\qquad (n \\neq -1)$$`,
    formulas: [
      { label: "Substitution rule", formula: `\\int f(g(x))\\,g'(x)\\,dx = F(g(x))+c` },
      { label: "Log form (reverse chain rule)", formula: `\\int \\frac{f'(x)}{f(x)}\\,dx = \\ln|f(x)|+c` },
      { label: "Power form (reverse chain rule)", formula: `\\int f'(x)[f(x)]^n\\,dx = \\frac{[f(x)]^{n+1}}{n+1}+c` },
    ],
    example: {
      question: "Find $\\displaystyle\\int 2x(x^2+3)^4\\,dx$.",
      steps: [
        "Let $u = x^2+3$, so $\\dfrac{du}{dx} = 2x$, i.e. $du = 2x\\,dx$.",
        "Substitute: $\\displaystyle\\int u^4\\,du$.",
        "Integrate: $\\dfrac{u^5}{5} + c$.",
        "Back-substitute: $\\dfrac{(x^2+3)^5}{5} + c$.",
      ],
      answer: "$\\dfrac{(x^2+3)^5}{5} + c$",
    },
    practice: {
      question: "Find $\\displaystyle\\int \\frac{3x^2}{x^3+1}\\,dx$ using the substitution $u = x^3+1$.",
      hint: "Differentiate $u = x^3+1$ to find $du$, then identify the numerator.",
      solution:
        "Let $u = x^3+1$, so $du = 3x^2\\,dx$. " +
        "The integral becomes $\\displaystyle\\int \\frac{1}{u}\\,du = \\ln|u| + c = \\ln|x^3+1| + c$.",
    },
  },
  {
    id: "integration-by-parts",
    icon: "∫",
    title: "Integration by Parts",
    subtitle: "∫uv′dx = uv − ∫vu′dx",
    color: "#0be5a0",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Integration by Parts

Integration by parts is the integration counterpart of the product rule:

$$\\int u\\,\\frac{dv}{dx}\\,dx = uv - \\int v\\,\\frac{du}{dx}\\,dx$$

### Choosing $u$ and $\\dfrac{dv}{dx}$ — the LIATE Rule

Pick $u$ as the **first type** that appears in the integrand, working left to right:

| Letter | Stands for | Example |
|---|---|---|
| **L** | Logarithms | $\\ln x$ |
| **I** | Inverse trig | $\\arctan x$ |
| **A** | Algebraic | $x^2$, $3x-1$ |
| **T** | Trigonometric | $\\sin x$, $\\cos x$ |
| **E** | Exponentials | $e^x$, $2^x$ |

Everything left over becomes $\\dfrac{dv}{dx}$; integrate it to get $v$.

### Repeated Integration by Parts

Some integrals require applying the formula twice (or more). For example $\\int x^2 e^x\\,dx$ — after one application you get $\\int x\\,e^x\\,dx$, which itself requires parts.

### Cyclic Integrals

When integrating $\\int e^x \\sin x\\,dx$, applying parts twice returns the original integral on the right-hand side. Let $I$ denote the integral, rearrange to solve for $I$.`,
    formulas: [
      { label: "Integration by parts", formula: `\\int u\\,\\frac{dv}{dx}\\,dx = uv - \\int v\\,\\frac{du}{dx}\\,dx` },
      { label: "LIATE priority", formula: `\\text{Logs} > \\text{Inverse trig} > \\text{Algebra} > \\text{Trig} > \\text{Exponentials}` },
    ],
    example: {
      question: "Find $\\displaystyle\\int x\\,e^x\\,dx$.",
      steps: [
        "Choose $u = x$ (Algebraic) and $\\dfrac{dv}{dx} = e^x$ (Exponential).",
        "Differentiate and integrate: $\\dfrac{du}{dx} = 1$, $\\;v = e^x$.",
        "Apply the formula: $\\displaystyle\\int x\\,e^x\\,dx = x\\,e^x - \\int e^x\\,dx$.",
        "Evaluate remaining integral: $x\\,e^x - e^x + c$.",
        "Factorise: $e^x(x-1) + c$.",
      ],
      answer: "$e^x(x-1) + c$",
    },
    practice: {
      question: "Find $\\displaystyle\\int x\\cos x\\,dx$.",
      hint: "Use LIATE: $u = x$ (Algebraic) and $\\frac{dv}{dx} = \\cos x$.",
      solution:
        "Let $u = x$, $\\dfrac{dv}{dx} = \\cos x$. Then $\\dfrac{du}{dx} = 1$, $v = \\sin x$. " +
        "By parts: $\\displaystyle\\int x\\cos x\\,dx = x\\sin x - \\int \\sin x\\,dx = x\\sin x + \\cos x + c$.",
    },
  },
  {
    id: "integration-partial-fractions",
    icon: "∫",
    title: "Integration with Partial Fractions",
    subtitle: "Using partial fractions to integrate rational functions",
    color: "#0be5a0",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Integration with Partial Fractions

When the integrand is a rational function (polynomial over polynomial), split it into **partial fractions** first, then integrate each simpler term separately.

### Key Integration Results

$$\\int \\frac{A}{x+a}\\,dx = A\\ln|x+a| + c$$

$$\\int \\frac{A}{(x+a)^2}\\,dx = -\\frac{A}{x+a} + c$$

$$\\int \\frac{A}{ax+b}\\,dx = \\frac{A}{a}\\ln|ax+b| + c$$

### Important Notes

- **Always** include the absolute value sign inside the logarithm: $\\ln|\\cdot|$.
- For definite integrals, substitute the limits after integrating.
- If the degree of the numerator $\\geq$ degree of the denominator, perform **polynomial long division** first.
- If the numerator is (or is a multiple of) the derivative of the denominator, the reverse chain rule gives a logarithm directly — no need to decompose.

### Reminder: Setting Up Partial Fractions

For distinct linear factors:
$$\\frac{f(x)}{(x+a)(x+b)} = \\frac{A}{x+a} + \\frac{B}{x+b}$$

Multiply both sides by the denominator, then substitute convenient values of $x$ to find $A$ and $B$.`,
    formulas: [
      { label: "Linear factor", formula: `\\int \\frac{A}{x+a}\\,dx = A\\ln|x+a|+c` },
      { label: "Repeated linear factor", formula: `\\int \\frac{A}{(x+a)^2}\\,dx = -\\frac{A}{x+a}+c` },
    ],
    example: {
      question: "Find $\\displaystyle\\int \\frac{5x+1}{(x+1)(2x-1)}\\,dx$.",
      steps: [
        "Write $\\dfrac{5x+1}{(x+1)(2x-1)} = \\dfrac{A}{x+1} + \\dfrac{B}{2x-1}$.",
        "Multiply through: $5x+1 = A(2x-1) + B(x+1)$.",
        "Let $x = -1$: $-4 = -3A$, so $A = \\dfrac{4}{3}$.",
        "Let $x = \\dfrac{1}{2}$: $\\dfrac{7}{2} = \\dfrac{3B}{2}$, so $B = \\dfrac{7}{3}$.",
        "Integrate: $\\dfrac{4}{3}\\ln|x+1| + \\dfrac{7}{6}\\ln|2x-1| + c$.",
      ],
      answer: "$\\dfrac{4}{3}\\ln|x+1| + \\dfrac{7}{6}\\ln|2x-1| + c$",
    },
    practice: {
      question: "Find $\\displaystyle\\int \\frac{3}{(x+1)(x+2)}\\,dx$.",
      hint: "Decompose into partial fractions with denominators $(x+1)$ and $(x+2)$.",
      solution:
        "$\\dfrac{3}{(x+1)(x+2)} = \\dfrac{3}{x+1} - \\dfrac{3}{x+2}$. " +
        "Integrating: $3\\ln|x+1| - 3\\ln|x+2| + c = 3\\ln\\left|\\dfrac{x+1}{x+2}\\right| + c$.",
    },
  },
];
