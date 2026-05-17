// FILE: src/data/pureMaths/integration.js

export const CHAPTER_META = {
  id: "integration",
  title: "Integration",
  subtitle: "Indefinite, definite integration and area",
  icon: "∫",
  color: "#0be5a0",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "indefinite-integration",
    icon: "∫",
    title: "Indefinite Integration",
    subtitle: "Reverse of differentiation, +c",
    color: "#0be5a0",
    visualization: null,
    desmosNote: "$y=x^2+2x+1$ and its integral (c=0). The gradient of the red curve equals the blue curve.",
    desmosExpressions: [
      { id: "1", latex: "y=x^2+2x+1" },
      { id: "2", latex: "y=\\frac{x^3}{3}+x^2+x" },
    ],
    theory: `**Integration** is the reverse process of differentiation. For a polynomial, the **indefinite integral** of $x^n$ is:\n\n$$\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + c \\quad (n \\neq -1)$$\n\nwhere $c$ is the **constant of integration** (added because differentiating a constant gives zero).\n\n**Rules:**\n- Integrate **term by term** for sums and differences.\n- Constants factor out: $\\int kf(x)\\,dx = k\\int f(x)\\,dx$.\n- $\\int k\\,dx = kx + c$.\n\n**Finding the constant $c$:** If you are given a point on the curve (an **initial condition**), substitute its coordinates into the integrated expression to determine $c$.\n\n**Important:** Always rewrite products and quotients before integrating — expand brackets and write fractions/roots as separate powers of $x$.`,
    formulas: [
      {
        label: "Power rule",
        latex: "\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + c \\quad (n \\neq -1)",
      },
      {
        label: "Constant",
        latex: "\\int k \\, dx = kx + c",
      },
      {
        label: "Sum rule",
        latex: "\\int(f+g)\\,dx = \\int f\\,dx + \\int g\\,dx",
      },
    ],
    example: {
      question: "Find $\\displaystyle\\int(3x^2 - 4x + 5)\\,dx$.",
      steps: [
        {
          label: "Integrate term by term",
          math: "\\int 3x^2\\,dx = x^3, \\quad \\int 4x\\,dx = 2x^2, \\quad \\int 5\\,dx = 5x",
        },
        {
          label: "Combine and add the constant",
          math: "\\int(3x^2-4x+5)\\,dx = x^3 - 2x^2 + 5x + c",
        },
      ],
    },
    practice: {
      question: "A curve has $\\dfrac{dy}{dx} = 4x^3 - 6x + 2$ and passes through the point $(1,\\,3)$. Find $y$ in terms of $x$.",
      solution: [
        {
          step: "Integrate to find the general equation",
          math: "y = x^4 - 3x^2 + 2x + c",
        },
        {
          step: "Substitute the point $(1, 3)$ to find $c$",
          math: "3 = 1 - 3 + 2 + c \\implies c = 3",
        },
        {
          step: "Write the particular solution",
          math: "y = x^4 - 3x^2 + 2x + 3",
        },
      ],
    },
  },
  {
    id: "definite-integration",
    icon: "∫ₐᵇ",
    title: "Definite Integration",
    subtitle: "Evaluating between limits",
    color: "#0be5a0",
    visualization: null,
    desmosNote: "Use Desmos to shade the area under a curve between two limits and check your definite integral answer.",
    desmosExpressions: [],
    theory: `The **definite integral** $\\displaystyle\\int_a^b f(x)\\,dx$ gives a **numerical value**.\n\nGeometrically, it equals the **signed area** between the curve $y = f(x)$ and the $x$-axis from $x=a$ to $x=b$:\n- Area **above** the $x$-axis contributes positively.\n- Area **below** the $x$-axis contributes negatively.\n\n**Evaluation method:**\n1. Find the indefinite integral $F(x)$ (no need to write $+c$; it cancels).\n2. Compute $F(b) - F(a)$, written $\\Big[F(x)\\Big]_a^b$.\n\n**Key property:**\n$$\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx$$`,
    formulas: [
      {
        label: "Fundamental theorem",
        latex: "\\int_a^b f(x)\\,dx = \\Big[F(x)\\Big]_a^b = F(b) - F(a)",
      },
      {
        label: "Reversing limits",
        latex: "\\int_a^b f(x)\\,dx = -\\int_b^a f(x)\\,dx",
      },
    ],
    example: {
      question: "Evaluate $\\displaystyle\\int_1^3 (x^2 - 2x + 3)\\,dx$.",
      steps: [
        {
          label: "Integrate to get $F(x)$",
          math: "F(x) = \\frac{x^3}{3} - x^2 + 3x",
        },
        {
          label: "Evaluate $F(3)$",
          math: "F(3) = 9 - 9 + 9 = 9",
        },
        {
          label: "Evaluate $F(1)$",
          math: "F(1) = \\frac{1}{3} - 1 + 3 = \\frac{7}{3}",
        },
        {
          label: "Subtract",
          math: "\\int_1^3(x^2-2x+3)\\,dx = 9 - \\frac{7}{3} = \\frac{20}{3}",
        },
      ],
    },
    practice: {
      question: "Evaluate $\\displaystyle\\int_0^2 (4x^3 - 3x^2 + 2)\\,dx$.",
      solution: [
        {
          step: "Find $F(x)$",
          math: "F(x) = x^4 - x^3 + 2x",
        },
        {
          step: "Evaluate at the limits",
          math: "F(2) = 16 - 8 + 4 = 12, \\quad F(0) = 0",
        },
        {
          step: "Result",
          math: "\\int_0^2(4x^3-3x^2+2)\\,dx = 12 - 0 = 12",
        },
      ],
    },
  },
  {
    id: "area-under-curve",
    icon: "▭",
    title: "Area Under a Curve",
    subtitle: "Area bounded by curve and x-axis",
    color: "#0be5a0",
    visualization: null,
    desmosNote: "The area between $y=x^2-4$ and the x-axis. The curve dips below — take absolute value.",
    desmosExpressions: [
      { id: "1", latex: "y=x^2-4" },
      { id: "2", latex: "\\int_{-2}^{2}(x^2-4)dx" },
    ],
    theory: `The **area** between the curve $y = f(x)$ and the $x$-axis from $x=a$ to $x=b$ requires care about sign:\n\n- If $f(x) \\geq 0$ throughout: $A = \\displaystyle\\int_a^b f(x)\\,dx$.\n- If $f(x) \\leq 0$ throughout: $A = -\\displaystyle\\int_a^b f(x)\\,dx$.\n- If the curve **crosses the $x$-axis**, split into separate integrals at each root and sum the absolute values.\n\n**Area between two curves** ($f(x)$ above $g(x)$ on $[a,b]$):\n$$A = \\int_a^b \\bigl[f(x) - g(x)\\bigr]\\,dx$$\n\n**Always sketch first** to identify where the curve crosses the axes and which region is above/below.`,
    formulas: [
      {
        label: "Area above $x$-axis",
        latex: "A = \\int_a^b f(x)\\,dx",
      },
      {
        label: "Area below $x$-axis",
        latex: "A = -\\int_a^b f(x)\\,dx",
      },
      {
        label: "Area between two curves",
        latex: "A = \\int_a^b [f(x)-g(x)]\\,dx",
      },
    ],
    example: {
      question: "Find the area enclosed between $y = x^2 - 4$ and the $x$-axis.",
      steps: [
        {
          label: "Find the roots (where curve crosses $x$-axis)",
          math: "x^2 - 4 = 0 \\implies x = \\pm 2",
        },
        {
          label: "The curve is below the $x$-axis on $[-2,\\,2]$, so evaluate and negate",
          math: "\\int_{-2}^{2}(x^2-4)\\,dx = \\left[\\frac{x^3}{3}-4x\\right]_{-2}^{2}",
        },
        {
          label: "Evaluate",
          math: "= \\left(\\frac{8}{3}-8\\right) - \\left(-\\frac{8}{3}+8\\right) = -\\frac{32}{3}",
        },
        {
          label: "Area = $|{-32/3}|$",
          math: "A = \\frac{32}{3}",
        },
      ],
    },
    practice: {
      question: "Find the area enclosed between $y = x(4-x)$ and the $x$-axis.",
      solution: [
        {
          step: "Find the roots",
          math: "x(4-x) = 0 \\implies x = 0 \\text{ or } x = 4",
        },
        {
          step: "Curve is above $x$-axis on $[0,4]$; integrate",
          math: "A = \\int_0^4 (4x - x^2)\\,dx = \\left[2x^2 - \\frac{x^3}{3}\\right]_0^4",
        },
        {
          step: "Evaluate",
          math: "= 32 - \\frac{64}{3} = \\frac{32}{3}",
        },
      ],
    },
  },
  {
    id: "trapezium-rule",
    icon: "⌺",
    title: "Trapezium Rule",
    subtitle: "Numerical approximation of area",
    color: "#0be5a0",
    visualization: null,
    desmosNote: "Plot $y=\\sqrt{1+x^2}$ and shade 4 trapezoids on $[0,2]$ to see how they approximate the area.",
    desmosExpressions: [],
    theory: `The **trapezium rule** approximates $\\displaystyle\\int_a^b f(x)\\,dx$ when an exact integral is hard or impossible.\n\n**Setup:** Divide $[a,b]$ into $n$ strips of equal width $h = \\dfrac{b-a}{n}$. The $x$-values are $x_0 = a,\\, x_1,\\, \\ldots,\\, x_n = b$, and $y_i = f(x_i)$.\n\n$$\\int_a^b f(x)\\,dx \\approx \\frac{h}{2}\\left[y_0 + 2(y_1 + y_2 + \\cdots + y_{n-1}) + y_n\\right]$$\n\n**Accuracy:**\n- The approximation is an **overestimate** when the curve is **concave up** ($d^2y/dx^2 > 0$).\n- It is an **underestimate** when the curve is **concave down** ($d^2y/dx^2 < 0$).\n- More strips (larger $n$) gives a more accurate result.`,
    formulas: [
      {
        label: "Strip width",
        latex: "h = \\frac{b-a}{n}",
      },
      {
        label: "Trapezium rule",
        latex: "\\int_a^b f(x)\\,dx \\approx \\frac{h}{2}\\left[y_0 + 2(y_1+y_2+\\cdots+y_{n-1}) + y_n\\right]",
      },
    ],
    example: {
      question: "Use the trapezium rule with 4 strips to estimate $\\displaystyle\\int_0^2 \\sqrt{1+x^2}\\,dx$.",
      steps: [
        {
          label: "Strip width and $x$-values",
          math: "h = 0.5; \\quad x = 0,\\; 0.5,\\; 1,\\; 1.5,\\; 2",
        },
        {
          label: "$y$-values",
          math: "y_0=1,\\; y_1=\\sqrt{1.25}\\approx1.118,\\; y_2=\\sqrt{2}\\approx1.414,\\; y_3=\\sqrt{3.25}\\approx1.803,\\; y_4=\\sqrt{5}\\approx2.236",
        },
        {
          label: "Apply the trapezium rule",
          math: "\\approx \\frac{0.5}{2}\\left[1 + 2(1.118+1.414+1.803) + 2.236\\right]",
        },
        {
          label: "Evaluate",
          math: "= 0.25\\left[1 + 2(4.335) + 2.236\\right] = 0.25 \\times 12.906 \\approx 3.227",
        },
      ],
    },
    practice: {
      question: "Use the trapezium rule with 3 strips to estimate $\\displaystyle\\int_1^4 \\frac{1}{x}\\,dx$. Compare with the exact value $\\ln 4 \\approx 1.386$ and state whether your answer is an over- or underestimate.",
      solution: [
        {
          step: "Strip width and values",
          math: "h = 1; \\quad x = 1,\\;2,\\;3,\\;4; \\quad y_0=1,\\; y_1=0.5,\\; y_2=0.\\overline{3},\\; y_3=0.25",
        },
        {
          step: "Apply the trapezium rule",
          math: "\\approx \\frac{1}{2}\\left[1 + 2(0.5+0.\\overline{3}) + 0.25\\right] = \\frac{1}{2}\\times 2.916 = 1.458",
        },
        {
          step: "Compare with exact value",
          math: "1.458 > 1.386 \\implies \\text{overestimate}",
        },
        {
          step: "Reason: $1/x$ is concave up on $[1,4]$ (since $d^2y/dx^2 = 2/x^3 > 0$)",
          math: "\\frac{d^2y}{dx^2} = \\frac{2}{x^3} > 0 \\text{ on } [1,4] \\implies \\text{trapeziums lie above the curve}",
        },
      ],
    },
  },
];
