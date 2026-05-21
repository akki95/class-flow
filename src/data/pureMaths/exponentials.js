// FILE: src/data/pureMaths/exponentials.js

export const CHAPTER_META = {
  id: "exponentials",
  title: "Exponentials & Logarithms",
  subtitle: "Laws of logs, natural log, solving equations",
  icon: "eˣ",
  color: "#22c55e",
  videoUrl: "https://www.youtube.com/watch?v=EdN6irvBYqc",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "exponential-functions",
    videoUrl: "https://www.youtube.com/watch?v=lKl67oxtuhE",
    icon: "eˣ",
    title: "Exponential Functions",
    subtitle: "Properties and graphs of aˣ",
    color: "#22c55e",
    visualization: null,
    desmosNote: "Compare $e^x$, $2^x$, and $0.5^x$. All pass through (0,1).",
    desmosExpressions: [
      { id: "1", latex: "e^x" },
      { id: "2", latex: "2^x" },
      { id: "3", latex: "0.5^x" },
    ],
    theory: `**Exponential functions** have the form $y = a^x$ where $a > 0$, $a \\neq 1$.

**Key properties of $y = a^x$:**
- Always passes through $(0, 1)$ since $a^0 = 1$
- Always **positive** (the graph never touches or crosses the $x$-axis)
- **Increasing** if $a > 1$; **decreasing** (decay) if $0 < a < 1$
- The $x$-axis is a horizontal asymptote

**The natural exponential $e$:**

$$e \\approx 2.71828\\ldots$$

$y = e^x$ is special: its **gradient at every point equals its value**. This unique property makes $e$ the natural base for calculus.

**Exponential models:**

$$N = N_0 e^{kt}$$

- $k > 0$: exponential **growth** (population, compound interest)
- $k < 0$: exponential **decay** (radioactive decay, cooling)`,
    formulas: [
      { label: "General exponential", latex: "y = a^x, \\; a > 0,\\; a \\neq 1" },
      { label: "Natural base", latex: "e \\approx 2.718" },
      { label: "Exponential model", latex: "N = N_0 e^{kt}" },
    ],
    example: {
      question:
        "A population $P$ satisfies $P = 2000e^{0.03t}$ where $t$ is in years. Find $P$ when $t = 10$, and find the time when $P = 5000$.",
      steps: [
        { label: "Find P when t = 10", math: "P = 2000e^{0.03 \\times 10} = 2000e^{0.3} \\approx 2000 \\times 1.3499 \\approx 2699" },
        { label: "Set P = 5000 and divide both sides by 2000", math: "\\frac{5000}{2000} = e^{0.03t} \\implies 2.5 = e^{0.03t}" },
        { label: "Take natural log of both sides", math: "\\ln 2.5 = 0.03t" },
        { label: "Solve for t", math: "t = \\frac{\\ln 2.5}{0.03} \\approx \\frac{0.9163}{0.03} \\approx 30.5 \\text{ years}" },
      ],
    },
    practice: {
      question:
        "The temperature $T$ °C of an object at time $t$ minutes is $T = 20 + 80e^{-0.1t}$. Find $T$ when $t = 5$, and find $t$ when $T = 50$.",
      solution: [
        { step: "Find T when t = 5", math: "T = 20 + 80e^{-0.5} = 20 + 80 \\times 0.6065 \\approx 20 + 48.5 = 68.5°\\text{C}" },
        { step: "Set T = 50", math: "50 = 20 + 80e^{-0.1t} \\implies 30 = 80e^{-0.1t}" },
        { step: "Isolate the exponential", math: "e^{-0.1t} = \\frac{30}{80} = \\frac{3}{8}" },
        { step: "Take natural log", math: "-0.1t = \\ln\\!\\left(\\tfrac{3}{8}\\right) \\implies t = \\frac{-\\ln(3/8)}{0.1} \\approx 9.86 \\text{ min}" },
      ],
    },
  },
  {
    id: "laws-of-logs",
    videoUrl: "https://www.youtube.com/watch?v=4oRHOsWR-JI",
    icon: "log",
    title: "Laws of Logarithms",
    subtitle: "log(ab), log(a/b), log(aⁿ)",
    color: "#22c55e",
    visualization: null,
    desmosNote: "Plot $y = \\log_{10}(x)$ and $y = \\ln(x)$ to compare their shapes — both pass through $(1,0)$.",
    desmosExpressions: [],
    theory: `**Definition:** $\\log_a x = y \\iff a^y = x$ — the logarithm answers "what power of $a$ gives $x$?"

The logarithm is the **inverse** of the exponential.

**Laws of logarithms** (valid for any consistent base):

$$\\log_a(AB) = \\log_a A + \\log_a B \\quad \\textbf{(product)}$$

$$\\log_a\\!\\left(\\frac{A}{B}\\right) = \\log_a A - \\log_a B \\quad \\textbf{(quotient)}$$

$$\\log_a(A^n) = n\\log_a A \\quad \\textbf{(power)}$$

**Special values:**
- $\\log_a a = 1$ (since $a^1 = a$)
- $\\log_a 1 = 0$ (since $a^0 = 1$)
- $\\log_a\\!\\left(\\tfrac{1}{x}\\right) = -\\log_a x$

**Change of base:**

$$\\log_a x = \\frac{\\log_b x}{\\log_b a}$$

(Useful for evaluating logs in a different base on a calculator.)`,
    formulas: [
      { label: "Product law", latex: "\\log_a(AB) = \\log_a A + \\log_a B" },
      { label: "Quotient law", latex: "\\log_a\\!\\left(\\frac{A}{B}\\right) = \\log_a A - \\log_a B" },
      { label: "Power law", latex: "\\log_a(A^n) = n\\log_a A" },
      { label: "Change of base", latex: "\\log_a x = \\frac{\\log_b x}{\\log_b a}" },
    ],
    example: {
      question: "Express $\\log 4 + \\log 5 - \\log 2$ as a single logarithm and evaluate.",
      steps: [
        { label: "Combine using product and quotient laws", math: "\\log 4 + \\log 5 - \\log 2 = \\log\\!\\left(\\frac{4 \\times 5}{2}\\right)" },
        { label: "Simplify inside", math: "= \\log 10" },
        { label: "Evaluate (base 10)", math: "= 1" },
      ],
    },
    practice: {
      question: "Solve $\\log_3(x + 2) + \\log_3(x - 1) = 2$.",
      solution: [
        { step: "Combine using the product law", math: "\\log_3[(x+2)(x-1)] = 2" },
        { step: "Convert to exponential form", math: "(x+2)(x-1) = 3^2 = 9" },
        { step: "Expand and rearrange", math: "x^2 + x - 2 = 9 \\implies x^2 + x - 11 = 0" },
        { step: "Quadratic formula", math: "x = \\frac{-1 + \\sqrt{1+44}}{2} = \\frac{-1+3\\sqrt{5}}{2} \\approx 2.85" },
        { step: "Reject the negative root (need $x > 1$ for $\\log_3(x-1)$ to be defined)", math: "x = \\frac{-1+3\\sqrt{5}}{2} \\approx 2.85" },
      ],
    },
  },
  {
    id: "natural-log",
    videoUrl: "https://www.youtube.com/watch?v=ThWB-z6bheo",
    icon: "ln",
    title: "The Natural Logarithm",
    subtitle: "ln x and its properties",
    color: "#22c55e",
    visualization: null,
    desmosNote: "$y=e^x$ and $y=\\ln x$ are reflections in $y=x$.",
    desmosExpressions: [
      { id: "1", latex: "e^x" },
      { id: "2", latex: "\\ln(x)" },
      { id: "3", latex: "y=x" },
    ],
    theory: `**The natural logarithm** $\\ln x = \\log_e x$ is the logarithm with base $e$.

It is the **inverse** of $e^x$:

$$\\ln(e^x) = x \\qquad e^{\\ln x} = x$$

**Graph of $y = \\ln x$:**
- Domain: $x > 0$ (only defined for positive $x$)
- Passes through $(1, 0)$ since $\\ln 1 = 0$
- Passes through $(e, 1)$ since $\\ln e = 1$
- Increasing for all $x > 0$; no upper bound
- The $y$-axis is a vertical asymptote (as $x \\to 0^+$, $\\ln x \\to -\\infty$)

$y = \\ln x$ and $y = e^x$ are **reflections** of each other in the line $y = x$.

**Useful special values:**
$$\\ln 1 = 0, \\quad \\ln e = 1, \\quad \\ln\\!\\left(\\tfrac{1}{x}\\right) = -\\ln x$$`,
    formulas: [
      { label: "Inverse property", latex: "\\ln(e^x) = x" },
      { label: "Inverse property (other direction)", latex: "e^{\\ln x} = x" },
      { label: "Special values", latex: "\\ln 1 = 0, \\quad \\ln e = 1" },
      { label: "Reciprocal", latex: "\\ln\\!\\left(\\frac{1}{x}\\right) = -\\ln x" },
    ],
    example: {
      question: "Solve $e^{2x-1} = 5$.",
      steps: [
        { label: "Take natural log of both sides", math: "\\ln(e^{2x-1}) = \\ln 5" },
        { label: "Use $\\ln(e^u) = u$", math: "2x - 1 = \\ln 5" },
        { label: "Solve for x", math: "x = \\frac{1 + \\ln 5}{2} \\approx \\frac{1 + 1.6094}{2} \\approx 1.30" },
      ],
    },
    practice: {
      question: "Solve $\\ln(3x - 1) = 4$.",
      solution: [
        { step: "Exponentiate both sides (raise $e$ to each side)", math: "e^{\\ln(3x-1)} = e^4" },
        { step: "Simplify left side", math: "3x - 1 = e^4" },
        { step: "Solve for x", math: "x = \\frac{e^4 + 1}{3} \\approx \\frac{54.598 + 1}{3} \\approx 18.53" },
      ],
    },
  },
  {
    id: "solving-exp-log",
    videoUrl: "https://www.youtube.com/watch?v=w2b99d9sFBw",
    icon: "=",
    title: "Solving Exponential & Log Equations",
    subtitle: "Apply logs to solve equations",
    color: "#22c55e",
    visualization: null,
    desmosNote: "Plot $y = 5^x$ and $y = 3^{x+1}$ to find their intersection — this is the solution to $5^x = 3^{x+1}$.",
    desmosExpressions: [],
    theory: `**Solving $a^x = b$:** Take the natural log (or log base 10) of both sides:

$$a^x = b \\implies x\\ln a = \\ln b \\implies x = \\frac{\\ln b}{\\ln a}$$

**Equations with base $e$:** Simply take $\\ln$ of both sides and use $\\ln(e^u) = u$.

**Quadratic-type exponential equations:** If an equation such as $3^{2x} - 5 \\cdot 3^x + 4 = 0$ appears, notice that $3^{2x} = (3^x)^2$. Let $u = 3^x$ and solve the resulting quadratic in $u$. Then solve $3^x = \\text{value}$ for each valid root.

**Domain warning:** When solving log equations, always check that the argument of each logarithm is **positive** in your answer. Reject any solution that makes a log argument $\\leq 0$.`,
    formulas: [
      { label: "Solve exponential", latex: "a^x = b \\implies x = \\frac{\\ln b}{\\ln a}" },
      { label: "Substitution for quadratic", latex: "\\text{let } u = a^x" },
    ],
    example: {
      question: "Solve $5^x = 3^{x+1}$.",
      steps: [
        { label: "Take natural log of both sides", math: "x\\ln 5 = (x+1)\\ln 3" },
        { label: "Expand right side", math: "x\\ln 5 = x\\ln 3 + \\ln 3" },
        { label: "Collect x terms", math: "x(\\ln 5 - \\ln 3) = \\ln 3" },
        { label: "Use log quotient law on bracket", math: "x\\ln\\!\\left(\\frac{5}{3}\\right) = \\ln 3" },
        { label: "Solve for x", math: "x = \\frac{\\ln 3}{\\ln(5/3)} \\approx \\frac{1.0986}{0.5108} \\approx 2.15" },
      ],
    },
    practice: {
      question: "Solve $2^{2x} - 5 \\cdot 2^x + 4 = 0$.",
      solution: [
        { step: "Let $u = 2^x$, note $2^{2x} = u^2$", math: "u^2 - 5u + 4 = 0" },
        { step: "Factorise", math: "(u-1)(u-4) = 0 \\implies u = 1 \\text{ or } u = 4" },
        { step: "Solve $2^x = 1$", math: "x = 0" },
        { step: "Solve $2^x = 4 = 2^2$", math: "x = 2" },
        { step: "Solutions", math: "x = 0 \\text{ or } x = 2" },
      ],
    },
  },
];
