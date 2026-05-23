export const CHAPTER_META = {
  id: "icse-10-ratio-factor",
  title: "Ratio, Proportion & Factorisation",
  subtitle: "Componendo-dividendo, remainder theorem and factor theorem",
  icon: "⚖️",
  color: "#10b981",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "ratio-proportion",
    icon: "⚖️",
    title: "Ratio & Proportion",
    subtitle: "Componendo-dividendo, k-method and continued proportion",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Proportion:** If $\\frac{a}{b} = \\frac{c}{d}$, then $a, b, c, d$ are in proportion, written $a : b :: c : d$.

**Properties of proportion:**

**Alternendo:** $\\frac{a}{b} = \\frac{c}{d} \\implies \\frac{a}{c} = \\frac{b}{d}$

**Invertendo:** $\\frac{a}{b} = \\frac{c}{d} \\implies \\frac{b}{a} = \\frac{d}{c}$

**Componendo:** $\\frac{a}{b} = \\frac{c}{d} \\implies \\frac{a + b}{b} = \\frac{c + d}{d}$

**Dividendo:** $\\frac{a}{b} = \\frac{c}{d} \\implies \\frac{a - b}{b} = \\frac{c - d}{d}$

**Componendo-Dividendo:** $\\frac{a}{b} = \\frac{c}{d} \\implies \\frac{a + b}{a - b} = \\frac{c + d}{c - d}$

**k-method:** If $\\frac{a}{b} = \\frac{c}{d} = k$, then $a = bk$ and $c = dk$. Substitute to prove the required result.

**Continued proportion:** $a, b, c$ are in continued proportion if $\\frac{a}{b} = \\frac{b}{c}$, i.e., $b^2 = ac$. Here $b$ is the **mean proportional**.`,
    formulas: [
      {
        label: "Componendo-Dividendo",
        latex: "\\frac{a+b}{a-b} = \\frac{c+d}{c-d}",
      },
      {
        label: "Mean proportional",
        latex: "b = \\sqrt{ac}",
      },
      {
        label: "k-method",
        latex: "\\frac{a}{b} = \\frac{c}{d} = k \\implies a = bk, \\; c = dk",
      },
    ],
    example: {
      question: "If $\\frac{3x + 4y}{3x - 4y} = \\frac{7}{3}$, find $\\frac{x}{y}$.",
      solution: `Apply componendo-dividendo:

$$\\frac{(3x+4y) + (3x-4y)}{(3x+4y) - (3x-4y)} = \\frac{7 + 3}{7 - 3}$$

$$\\frac{6x}{8y} = \\frac{10}{4}$$

$$\\frac{3x}{4y} = \\frac{5}{2}$$

$$\\frac{x}{y} = \\frac{5 \\times 4}{2 \\times 3} = \\mathbf{\\frac{10}{3}}$$`,
    },
    practice: {
      question: "Find the mean proportional between 4 and 25.",
      solution: `Let $b$ be the mean proportional.

$$\\frac{4}{b} = \\frac{b}{25} \\implies b^2 = 4 \\times 25 = 100$$

$$b = \\sqrt{100} = \\mathbf{10}$$

Check: $4 : 10 :: 10 : 25$ → $4 \\times 25 = 100 = 10^2$ ✓`,
    },
  },
  {
    id: "remainder-factor-theorem",
    icon: "🔓",
    title: "Remainder & Factor Theorem",
    subtitle: "Finding remainders, factors and zeroes of polynomials",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Remainder Theorem:** If a polynomial $f(x)$ is divided by $(x - a)$, the remainder is $f(a)$.

$$f(x) = (x - a) \\cdot q(x) + f(a)$$

**Factor Theorem:** $(x - a)$ is a factor of $f(x)$ if and only if $f(a) = 0$.

**Using the theorems:**
1. To check if $(x - 2)$ is a factor of $f(x)$: compute $f(2)$. If $f(2) = 0$, yes.
2. To find the remainder when $f(x)$ is divided by $(x + 3)$: compute $f(-3)$.
3. To factorise a cubic: find one root by trial, then divide to get a quadratic.

**Division by $(ax - b)$:** The remainder is $f\\left(\\frac{b}{a}\\right)$.

**Factorising cubics:**
1. Find $f(a) = 0$ for $a \\in \\{\\pm 1, \\pm 2, \\pm 3, \\ldots\\}$ (try factors of constant term).
2. Divide by $(x - a)$ using long division or synthetic division.
3. Factorise the resulting quadratic.`,
    formulas: [
      {
        label: "Remainder theorem",
        latex: "\\text{Remainder} = f(a) \\text{ when dividing by } (x - a)",
      },
      {
        label: "Factor theorem",
        latex: "(x - a) \\text{ is a factor} \\iff f(a) = 0",
      },
    ],
    example: {
      question: "Factorise: $f(x) = x^3 - 6x^2 + 11x - 6$",
      solution: `Try $f(1) = 1 - 6 + 11 - 6 = 0$ ✓

So $(x - 1)$ is a factor.

Divide $x^3 - 6x^2 + 11x - 6$ by $(x - 1)$:

$$x^3 - 6x^2 + 11x - 6 = (x - 1)(x^2 - 5x + 6)$$

Factorise $x^2 - 5x + 6 = (x - 2)(x - 3)$

$$f(x) = \\mathbf{(x - 1)(x - 2)(x - 3)}$$`,
    },
    practice: {
      question: "Find the value of $k$ if $(x - 2)$ is a factor of $2x^3 + kx^2 - 8x + 12$.",
      solution: `By the factor theorem: $f(2) = 0$

$$2(8) + k(4) - 8(2) + 12 = 0$$
$$16 + 4k - 16 + 12 = 0$$
$$4k + 12 = 0$$
$$k = \\mathbf{-3}$$`,
    },
  },
  {
    id: "linear-inequations",
    icon: "📊",
    title: "Linear Inequations",
    subtitle: "Solving inequalities and representing on the number line",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Inequation symbols:**
- $>$ (greater than), $<$ (less than)
- $\\ge$ (greater than or equal to), $\\le$ (less than or equal to)

**Rules for solving inequations** (same as equations, except):
- **Multiplying or dividing by a negative number reverses the inequality sign.**

$$-2x > 6 \\implies x < -3$$

**Solution set and number line:**
- Solid circle (●) for $\\le$ or $\\ge$ (included).
- Open circle (○) for $<$ or $>$ (excluded).

**Types of solutions:**
- Over **natural numbers** ($\\mathbb{N}$): $\\{1, 2, 3, \\ldots\\}$
- Over **whole numbers** ($\\mathbb{W}$): $\\{0, 1, 2, \\ldots\\}$
- Over **integers** ($\\mathbb{Z}$): $\\{\\ldots, -2, -1, 0, 1, 2, \\ldots\\}$
- Over **reals** ($\\mathbb{R}$): continuous interval

**Simultaneous inequations:** Solve each separately, then find the intersection (overlap).`,
    formulas: [
      {
        label: "Key rule",
        latex: "\\text{Multiply/divide by negative} \\implies \\text{reverse the sign}",
      },
    ],
    example: {
      question: "Solve $-3 < 2x - 1 \\le 5$ and represent on the number line, $x \\in \\mathbb{R}$.",
      solution: `Add 1 throughout:
$$-3 + 1 < 2x \\le 5 + 1$$
$$-2 < 2x \\le 6$$

Divide by 2:
$$-1 < x \\le 3$$

**Solution set:** $\\{x : -1 < x \\le 3, \\; x \\in \\mathbb{R}\\}$

On the number line: open circle at $-1$, solid circle at $3$, line between.`,
    },
    practice: {
      question: "Solve: $3x - 5 > 7$ and $2x + 3 \\le 15$. Find the solution set for $x \\in \\mathbb{Z}$.",
      solution: `**Inequation 1:** $3x - 5 > 7 \\implies 3x > 12 \\implies x > 4$

**Inequation 2:** $2x + 3 \\le 15 \\implies 2x \\le 12 \\implies x \\le 6$

**Intersection:** $4 < x \\le 6$

For $x \\in \\mathbb{Z}$: $\\mathbf{\\{5, 6\\}}$`,
    },
  },
];
