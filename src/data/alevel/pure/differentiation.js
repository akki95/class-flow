export const CHAPTER_META = {
  id: "alevel-differentiation-y2",
  title: "Differentiation (Year 2)",
  subtitle: "Chain rule, product & quotient rules, implicit & parametric differentiation",
  icon: "d/dx",
  color: "#f97316",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "chain-rule",
    icon: "d/dx",
    title: "Chain Rule",
    subtitle: "Differentiating composite functions",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "y=(2x+1)³ and its derivative y'=6(2x+1)². Notice the gradient function.",
    desmosExpressions: [
      { id: "1", latex: "y=(2x+1)^3" },
      { id: "2", latex: "y'=6(2x+1)^2" },
    ],
    theory: `## The Chain Rule

The chain rule is used to differentiate **composite functions** — functions of the form $f(g(x))$.

$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$

In Leibniz notation, if $y$ depends on $u$ and $u$ depends on $x$:

$$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$$

### Method

1. **Identify** the outer function $f$ and the inner function $g(x)$.
2. **Differentiate the outer** function with respect to the inner, leaving the inner unchanged.
3. **Multiply by the derivative** of the inner function.

### Common Patterns

$$\\frac{d}{dx}\\bigl[(f(x))^n\\bigr] = n[f(x)]^{n-1} \\cdot f'(x)$$

$$\\frac{d}{dx}\\bigl[e^{f(x)}\\bigr] = f'(x)\\,e^{f(x)}$$

$$\\frac{d}{dx}\\bigl[\\ln f(x)\\bigr] = \\frac{f'(x)}{f(x)}$$

$$\\frac{d}{dx}\\bigl[\\sin(f(x))\\bigr] = f'(x)\\cos(f(x))$$

$$\\frac{d}{dx}\\bigl[\\cos(f(x))\\bigr] = -f'(x)\\sin(f(x))$$

These all follow directly from applying the chain rule to the standard derivatives.`,
    formulas: [
      { label: "Chain rule (Leibniz)", formula: `\\frac{dy}{dx}=\\frac{dy}{du}\\cdot\\frac{du}{dx}` },
      { label: "Chain rule (function form)", formula: `\\frac{d}{dx}[f(g(x))]=f'(g(x))\\cdot g'(x)` },
      { label: "Exponential", formula: `\\frac{d}{dx}[e^{f(x)}]=f'(x)e^{f(x)}` },
      { label: "Natural log", formula: `\\frac{d}{dx}[\\ln f(x)]=\\frac{f'(x)}{f(x)}` },
    ],
    example: {
      question: "Differentiate $y = (3x^2 - 1)^5$.",
      steps: [
        "Let $u = 3x^2 - 1$, so $y = u^5$.",
        "$\\dfrac{dy}{du} = 5u^4$, $\\quad \\dfrac{du}{dx} = 6x$.",
        "By the chain rule: $\\dfrac{dy}{dx} = 5u^4 \\cdot 6x = 5(3x^2-1)^4 \\cdot 6x$.",
      ],
      answer: "$\\dfrac{dy}{dx} = 30x(3x^2-1)^4$",
    },
    practice: {
      question:
        "Differentiate each of the following: (a) $y = \\sin(4x+1)$, (b) $y = e^{x^2}$, (c) $y = \\ln(3x-2)$.",
      hint: "Identify inner and outer functions in each case, then apply the chain rule.",
      solution:
        "(a) Outer: $\\sin$, inner: $4x+1$. $\\dfrac{dy}{dx} = 4\\cos(4x+1)$. " +
        "(b) Outer: $e^{\\square}$, inner: $x^2$. $\\dfrac{dy}{dx} = 2x\\,e^{x^2}$. " +
        "(c) Outer: $\\ln$, inner: $3x-2$. $\\dfrac{dy}{dx} = \\dfrac{3}{3x-2}$.",
    },
  },
  {
    id: "product-quotient",
    icon: "d/dx",
    title: "Product & Quotient Rules",
    subtitle: "Differentiating products and fractions of functions",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Product Rule

If $y = uv$ where $u$ and $v$ are both functions of $x$:

$$\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx}$$

> **Memory aid:** "u dv + v du"

### When to use it

Any time two functions are **multiplied** together — e.g. $x^2 \\sin x$, $\\,x\\,e^x$, $\\,(x+1)\\ln x$.

---

## Quotient Rule

If $y = \\dfrac{u}{v}$ where $u$ and $v$ are both functions of $x$:

$$\\frac{d}{dx}\\!\\left(\\frac{u}{v}\\right) = \\frac{v\\,\\dfrac{du}{dx} - u\\,\\dfrac{dv}{dx}}{v^2}$$

> **Memory aid:** "v du minus u dv, all over v squared"

### Tip: Product vs Quotient

For $\\dfrac{u}{v}$ you can also write it as $u \\cdot v^{-1}$ and apply the **product rule** combined with the **chain rule** on $v^{-1}$. Either approach gives the same answer — use whichever feels more natural.

### Always Simplify

After applying either rule, factorise or cancel where possible. Examiners expect a simplified final answer.`,
    formulas: [
      { label: "Product rule", formula: `\\frac{d}{dx}(uv)=u\\frac{dv}{dx}+v\\frac{du}{dx}` },
      {
        label: "Quotient rule",
        formula: `\\frac{d}{dx}\\!\\left(\\frac{u}{v}\\right)=\\frac{v\\dfrac{du}{dx}-u\\dfrac{dv}{dx}}{v^2}`,
      },
    ],
    example: {
      question: "Differentiate $y = x^2 \\sin x$.",
      steps: [
        "Let $u = x^2$ and $v = \\sin x$.",
        "$\\dfrac{du}{dx} = 2x$, $\\quad \\dfrac{dv}{dx} = \\cos x$.",
        "Apply the product rule: $\\dfrac{dy}{dx} = x^2 \\cos x + \\sin x \\cdot 2x$.",
      ],
      answer: "$\\dfrac{dy}{dx} = x^2\\cos x + 2x\\sin x$",
    },
    practice: {
      question: "Differentiate $y = \\dfrac{x^2+1}{2x-3}$.",
      hint: "Use the quotient rule with $u = x^2+1$ and $v = 2x-3$.",
      solution:
        "$u = x^2+1,\\; v = 2x-3,\\; \\dfrac{du}{dx} = 2x,\\; \\dfrac{dv}{dx} = 2$. " +
        "$\\dfrac{dy}{dx} = \\dfrac{(2x-3)(2x) - (x^2+1)(2)}{(2x-3)^2} = \\dfrac{4x^2-6x-2x^2-2}{(2x-3)^2} = \\dfrac{2x^2-6x-2}{(2x-3)^2}$.",
    },
  },
  {
    id: "implicit-parametric",
    icon: "d/dx",
    title: "Implicit & Parametric Differentiation",
    subtitle: "Differentiating implicit equations and parametric curves",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Implicit Differentiation

An **implicit equation** is one where $y$ is not the subject, e.g. $x^2 + y^2 = 25$ or $x^3 + y^3 = 6xy$.

### Method

Differentiate **every term** with respect to $x$. For any term involving $y$, apply the **chain rule**:

$$\\frac{d}{dx}[f(y)] = f'(y)\\,\\frac{dy}{dx}$$

Then **rearrange** to make $\\dfrac{dy}{dx}$ the subject.

### Example pattern

$$\\frac{d}{dx}[y^3] = 3y^2\\,\\frac{dy}{dx}, \\qquad \\frac{d}{dx}[\\sin y] = \\cos y\\,\\frac{dy}{dx}$$

---

## Parametric Differentiation

A **parametric curve** is defined by $x = f(t)$ and $y = g(t)$ for a parameter $t$.

$$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$$

### Second Derivative (parametric)

$$\\frac{d^2y}{dx^2} = \\frac{\\dfrac{d}{dt}\\!\\left[\\dfrac{dy}{dx}\\right]}{\\dfrac{dx}{dt}}$$

That is: differentiate $\\dfrac{dy}{dx}$ with respect to $t$, then divide by $\\dfrac{dx}{dt}$.

> The gradient of a parametric curve at a point is found by evaluating $\\dfrac{dy}{dx}$ at the given value of $t$.`,
    formulas: [
      { label: "Implicit chain rule", formula: `\\frac{d}{dx}[f(y)] = f'(y)\\frac{dy}{dx}` },
      { label: "Parametric gradient", formula: `\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}` },
      {
        label: "Parametric second derivative",
        formula: `\\frac{d^2y}{dx^2}=\\frac{d}{dt}\\!\\left[\\frac{dy}{dx}\\right]\\div\\frac{dx}{dt}`,
      },
    ],
    example: {
      question: "Find $\\dfrac{dy}{dx}$ for the circle $x^2 + y^2 = 25$. Hence find the gradient at the point $(3, 4)$.",
      steps: [
        "Differentiate both sides with respect to $x$:",
        "$2x + 2y\\,\\dfrac{dy}{dx} = 0$.",
        "Rearrange: $\\dfrac{dy}{dx} = -\\dfrac{x}{y}$.",
        "At $(3, 4)$: $\\dfrac{dy}{dx} = -\\dfrac{3}{4}$.",
      ],
      answer: "$\\dfrac{dy}{dx} = -\\dfrac{x}{y}$; gradient at $(3,4)$ is $-\\dfrac{3}{4}$.",
    },
    practice: {
      question:
        "A curve is defined parametrically by $x = t^2 + 1$, $y = 2t^3 - 3t$. Find $\\dfrac{dy}{dx}$ in terms of $t$, and find the gradient of the curve when $t = 2$.",
      hint: "Differentiate $x$ and $y$ separately with respect to $t$, then divide.",
      solution:
        "$\\dfrac{dx}{dt} = 2t$, $\\quad \\dfrac{dy}{dt} = 6t^2 - 3$. " +
        "$\\dfrac{dy}{dx} = \\dfrac{6t^2-3}{2t}$. " +
        "At $t = 2$: $\\dfrac{dy}{dx} = \\dfrac{6(4)-3}{2(2)} = \\dfrac{24-3}{4} = \\dfrac{21}{4}$.",
    },
  },
];
