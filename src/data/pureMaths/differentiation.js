// FILE: src/data/pureMaths/differentiation.js

export const CHAPTER_META = {
  id: "differentiation",
  title: "Differentiation",
  subtitle: "Rates of change, tangents and stationary points",
  icon: "∂",
  color: "#16a34a",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "first-principles",
    icon: "lim",
    title: "First Principles",
    subtitle: "Definition of the derivative",
    color: "#16a34a",
    visualization: null,
    desmosNote: "Drag $h$ slider toward 0 to see the chord gradient approach the tangent gradient.",
    desmosExpressions: [
      { id: "1", latex: "f(x)=x^2" },
      { id: "2", latex: "h=1" },
      { id: "3", latex: "\\frac{f(x+h)-f(x)}{h}" },
    ],
    theory: `The derivative $f'(x)$ is defined as the limit:\n\n$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}$$\n\nThis represents the **gradient of the tangent** to the curve $y = f(x)$ at the point $x$. Geometrically, it is the limit of the gradient of a chord as the chord length approaches zero.\n\nAt AS Level you need to be able to differentiate $y = x^n$ from first principles for small integer $n$. The key steps are:\n1. Write out $f(x+h)$ by substituting $x+h$ into the function.\n2. Form $\\dfrac{f(x+h)-f(x)}{h}$ and simplify by cancelling the $h$ in the denominator.\n3. Take the limit as $h \\to 0$ — any remaining terms containing $h$ vanish.`,
    formulas: [
      {
        label: "Definition of derivative",
        latex: "f'(x) = \\lim_{h \\to 0} \\frac{f(x+h)-f(x)}{h}",
      },
      {
        label: "Result for power",
        latex: "\\frac{d}{dx}(x^n) = nx^{n-1}",
      },
    ],
    example: {
      question: "Differentiate $f(x) = x^2$ from first principles.",
      steps: [
        {
          label: "Write $f(x+h)$",
          math: "f(x+h) = (x+h)^2 = x^2 + 2xh + h^2",
        },
        {
          label: "Form the difference quotient",
          math: "\\frac{f(x+h)-f(x)}{h} = \\frac{x^2+2xh+h^2-x^2}{h} = \\frac{2xh+h^2}{h} = 2x+h",
        },
        {
          label: "Take the limit as $h \\to 0$",
          math: "f'(x) = \\lim_{h \\to 0}(2x+h) = 2x",
        },
      ],
    },
    practice: {
      question: "Differentiate $f(x) = x^3$ from first principles.",
      solution: [
        {
          step: "Expand $f(x+h)$",
          math: "f(x+h) = (x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3",
        },
        {
          step: "Form and simplify the difference quotient",
          math: "\\frac{f(x+h)-f(x)}{h} = \\frac{3x^2h+3xh^2+h^3}{h} = 3x^2+3xh+h^2",
        },
        {
          step: "Take the limit",
          math: "f'(x) = \\lim_{h \\to 0}(3x^2+3xh+h^2) = 3x^2",
        },
      ],
    },
  },
  {
    id: "diff-polynomials",
    icon: "d/dx",
    title: "Differentiating Polynomials",
    subtitle: "Power rule, sums and differences",
    color: "#16a34a",
    visualization: null,
    desmosNote: "Plot $y = 3x^4 - 2x^3 + 5x - 7$ and its derivative to see how turning points of $y$ correspond to roots of $y'$.",
    desmosExpressions: [],
    theory: `**The Power Rule** is the fundamental rule for differentiating powers of $x$:\n\n$$\\frac{d}{dx}(x^n) = nx^{n-1}$$\n\nIt works for all rational values of $n$ — positive integers, negative integers and fractions.\n\n**Key rules:**\n- Constants differentiate to $0$: $\\dfrac{d}{dx}(c) = 0$.\n- The rule applies **term by term** for sums and differences.\n- A constant factor is preserved: $\\dfrac{d}{dx}(af) = af'$.\n\n**Worked examples of the power rule with special indices:**\n- $\\dfrac{d}{dx}(x^{-1}) = -x^{-2} = -\\dfrac{1}{x^2}$\n- $\\dfrac{d}{dx}(x^{1/2}) = \\tfrac{1}{2}x^{-1/2} = \\dfrac{1}{2\\sqrt{x}}$\n\n**Always rewrite** products and fractions before differentiating — expand brackets and express roots/fractions as powers of $x$.`,
    formulas: [
      {
        label: "Power rule",
        latex: "\\frac{d}{dx}(x^n) = nx^{n-1}",
      },
      {
        label: "Constant",
        latex: "\\frac{d}{dx}(c) = 0",
      },
      {
        label: "Sum rule",
        latex: "\\frac{d}{dx}(f+g) = f'+g'",
      },
      {
        label: "Scalar multiple",
        latex: "\\frac{d}{dx}(af) = af'",
      },
    ],
    example: {
      question: "Differentiate $y = 3x^4 - 2x^3 + 5x - 7$.",
      steps: [
        {
          label: "Differentiate term by term using the power rule",
          math: "\\frac{dy}{dx} = 4 \\cdot 3x^3 - 3 \\cdot 2x^2 + 1 \\cdot 5x^0 - 0",
        },
        {
          label: "Simplify",
          math: "\\frac{dy}{dx} = 12x^3 - 6x^2 + 5",
        },
      ],
    },
    practice: {
      question: "Differentiate: (a) $y = x^3(x-2)$, (b) $y = \\dfrac{3x^2+1}{x}$.",
      solution: [
        {
          step: "(a) Expand the bracket first",
          math: "y = x^4 - 2x^3",
        },
        {
          step: "(a) Differentiate term by term",
          math: "\\frac{dy}{dx} = 4x^3 - 6x^2",
        },
        {
          step: "(b) Rewrite as separate fractions (powers of $x$)",
          math: "y = 3x + x^{-1}",
        },
        {
          step: "(b) Differentiate",
          math: "\\frac{dy}{dx} = 3 - x^{-2} = 3 - \\frac{1}{x^2}",
        },
      ],
    },
  },
  {
    id: "tangents-normals",
    icon: "/",
    title: "Tangents & Normals",
    subtitle: "Equations of tangent and normal lines",
    color: "#16a34a",
    visualization: null,
    desmosNote: "Tangent to $y=x^3-3x$ at $x=1$. Change $a$ to see the tangent move.",
    desmosExpressions: [
      { id: "1", latex: "y=x^3-3x" },
      { id: "2", latex: "a=1" },
      { id: "3", latex: "y-f(a)=f'(a)(x-a) \\text{ (concept)}" },
      { id: "4", latex: "y=0(x-1)+(-2)" },
    ],
    theory: `The **gradient of the tangent** to $y = f(x)$ at $x = a$ is $f'(a)$.\n\n**Equation of the tangent** at the point $(a,\\, f(a))$:\n$$y - f(a) = f'(a)(x-a)$$\n\nThe **normal** to the curve at $(a, f(a))$ is perpendicular to the tangent. Since perpendicular gradients satisfy $m_1 \\times m_2 = -1$, the gradient of the normal is $-\\dfrac{1}{f'(a)}$.\n\n**Equation of the normal** at $(a,\\, f(a))$:\n$$y - f(a) = -\\frac{1}{f'(a)}(x-a)$$\n\n**Method:**\n1. Differentiate to find $f'(x)$.\n2. Substitute $x = a$ to find the gradient.\n3. Find $f(a)$ (the $y$-coordinate of the point).\n4. Use the point-gradient form of a straight line.`,
    formulas: [
      {
        label: "Tangent",
        latex: "y - f(a) = f'(a)(x-a)",
      },
      {
        label: "Normal",
        latex: "y - f(a) = -\\dfrac{1}{f'(a)}(x-a)",
      },
    ],
    example: {
      question: "Find the equations of the tangent and normal to $y = x^3 - 3x$ at $x = 2$.",
      steps: [
        {
          label: "Find the $y$-coordinate at $x=2$",
          math: "y = 8 - 6 = 2 \\implies \\text{point } (2,\\,2)",
        },
        {
          label: "Differentiate and evaluate at $x=2$",
          math: "\\frac{dy}{dx} = 3x^2 - 3 \\implies f'(2) = 12 - 3 = 9",
        },
        {
          label: "Equation of the tangent",
          math: "y - 2 = 9(x-2) \\implies y = 9x - 16",
        },
        {
          label: "Gradient of normal is $-\\frac{1}{9}$; equation of normal",
          math: "y - 2 = -\\frac{1}{9}(x-2) \\implies 9y = -x + 20",
        },
      ],
    },
    practice: {
      question: "The curve $C$ has equation $y = x^2 - 4x + 3$. Find the equation of the normal to $C$ at the point where $x = 1$.",
      solution: [
        {
          step: "Find the point on the curve",
          math: "y = 1 - 4 + 3 = 0 \\implies \\text{point } (1,\\,0)",
        },
        {
          step: "Find the gradient of the tangent",
          math: "\\frac{dy}{dx} = 2x - 4 \\implies f'(1) = -2",
        },
        {
          step: "Gradient of the normal",
          math: "m_{\\text{normal}} = -\\frac{1}{-2} = \\frac{1}{2}",
        },
        {
          step: "Equation of the normal",
          math: "y - 0 = \\frac{1}{2}(x-1) \\implies 2y = x - 1 \\implies x - 2y - 1 = 0",
        },
      ],
    },
  },
  {
    id: "stationary-points",
    icon: "⊔",
    title: "Stationary Points",
    subtitle: "Finding and classifying turning points",
    color: "#16a34a",
    visualization: null,
    desmosNote: "Plot the curve and its derivative. Stationary points occur where the derivative crosses the $x$-axis.",
    desmosExpressions: [],
    theory: `**Stationary points** occur where $\\dfrac{dy}{dx} = 0$.\n\n**Classification using the second derivative:**\n- If $\\dfrac{d^2y}{dx^2} > 0$ at the stationary point → **local minimum** (curve is concave up).\n- If $\\dfrac{d^2y}{dx^2} < 0$ at the stationary point → **local maximum** (curve is concave down).\n- If $\\dfrac{d^2y}{dx^2} = 0$ → the test is inconclusive; use the **first derivative test** (check the sign of $\\dfrac{dy}{dx}$ either side of the point).\n\n**First derivative test** — examine the sign of $\\dfrac{dy}{dx}$:\n- $+$ then $-$: local maximum.\n- $-$ then $+$: local minimum.\n- Signs do not change: point of inflection.\n\nA **point of inflection** is a point where the concavity changes (curve changes from concave up to concave down or vice versa).`,
    formulas: [
      {
        label: "Stationary point condition",
        latex: "\\frac{dy}{dx} = 0",
      },
      {
        label: "Local minimum",
        latex: "\\frac{d^2y}{dx^2} > 0",
      },
      {
        label: "Local maximum",
        latex: "\\frac{d^2y}{dx^2} < 0",
      },
    ],
    example: {
      question: "Find and classify the stationary points of $y = x^3 - 3x^2 - 9x + 2$.",
      steps: [
        {
          label: "Differentiate and set equal to zero",
          math: "\\frac{dy}{dx} = 3x^2 - 6x - 9 = 3(x^2-2x-3) = 3(x-3)(x+1) = 0",
        },
        {
          label: "Solve for $x$",
          math: "x = 3 \\quad \\text{or} \\quad x = -1",
        },
        {
          label: "Find second derivative",
          math: "\\frac{d^2y}{dx^2} = 6x - 6",
        },
        {
          label: "Classify $x = 3$: $d^2y/dx^2 = 12 > 0$ → local minimum",
          math: "y(3) = 27 - 27 - 27 + 2 = -25 \\implies \\text{minimum at }(3,\\,-25)",
        },
        {
          label: "Classify $x = -1$: $d^2y/dx^2 = -12 < 0$ → local maximum",
          math: "y(-1) = -1 - 3 + 9 + 2 = 7 \\implies \\text{maximum at }(-1,\\,7)",
        },
      ],
    },
    practice: {
      question: "Find the stationary points of $y = 2x^3 - 9x^2 + 12x - 4$ and determine their nature.",
      solution: [
        {
          step: "Differentiate and factorise",
          math: "\\frac{dy}{dx} = 6x^2 - 18x + 12 = 6(x^2-3x+2) = 6(x-1)(x-2) = 0",
        },
        {
          step: "Stationary points at $x=1$ and $x=2$",
          math: "y(1) = 2-9+12-4 = 1, \\quad y(2) = 16-36+24-4 = 0",
        },
        {
          step: "Second derivative",
          math: "\\frac{d^2y}{dx^2} = 12x - 18",
        },
        {
          step: "$x=1$: $d^2y/dx^2 = -6 < 0$ → local maximum at $(1,\\,1)$",
          math: "\\text{Maximum at }(1,\\,1)",
        },
        {
          step: "$x=2$: $d^2y/dx^2 = 6 > 0$ → local minimum at $(2,\\,0)$",
          math: "\\text{Minimum at }(2,\\,0)",
        },
      ],
    },
  },
  {
    id: "second-derivative",
    icon: "d²",
    title: "Second Derivative",
    subtitle: "Concavity and the second derivative test",
    color: "#16a34a",
    visualization: null,
    desmosNote: "Plot $y=x^4-8x^2+5$ and its second derivative to see where concavity changes.",
    desmosExpressions: [],
    theory: `The **second derivative** $\\dfrac{d^2y}{dx^2}$ is the derivative of $\\dfrac{dy}{dx}$. It measures the **rate of change of the gradient** — i.e. the **concavity** of the curve.\n\n- $\\dfrac{d^2y}{dx^2} > 0$: curve is **concave up** ("smiling"), gradient is increasing.\n- $\\dfrac{d^2y}{dx^2} < 0$: curve is **concave down** ("frowning"), gradient is decreasing.\n\n**Uses:**\n1. **Classifying stationary points** — substitute the $x$-value of each stationary point into $d^2y/dx^2$.\n2. **Finding points of inflection** — solve $d^2y/dx^2 = 0$ and verify that the concavity actually changes (sign of $d^2y/dx^2$ changes either side).`,
    formulas: [
      {
        label: "Second derivative",
        latex: "\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\!\\left(\\frac{dy}{dx}\\right)",
      },
      {
        label: "Concave up",
        latex: "\\frac{d^2y}{dx^2}>0",
      },
      {
        label: "Concave down",
        latex: "\\frac{d^2y}{dx^2}<0",
      },
    ],
    example: {
      question: "Show that $y = x^4 - 8x^2 + 5$ has points of inflection and find their $x$-coordinates.",
      steps: [
        {
          label: "Differentiate twice",
          math: "\\frac{dy}{dx} = 4x^3 - 16x, \\quad \\frac{d^2y}{dx^2} = 12x^2 - 16",
        },
        {
          label: "Set second derivative to zero",
          math: "12x^2 - 16 = 0 \\implies x^2 = \\frac{4}{3} \\implies x = \\pm\\frac{2}{\\sqrt{3}}",
        },
        {
          label: "Verify sign change in $d^2y/dx^2$",
          math: "x < -\\tfrac{2}{\\sqrt{3}}: d^2y/dx^2>0;\\quad -\\tfrac{2}{\\sqrt{3}}<x<\\tfrac{2}{\\sqrt{3}}: d^2y/dx^2<0;\\quad x>\\tfrac{2}{\\sqrt{3}}: d^2y/dx^2>0",
        },
        {
          label: "Concavity changes at both values → points of inflection at",
          math: "x = \\pm\\frac{2}{\\sqrt{3}} = \\pm\\frac{2\\sqrt{3}}{3}",
        },
      ],
    },
    practice: {
      question: "Given $y = x^3 - 6x^2 + 9x + 1$, find $\\dfrac{d^2y}{dx^2}$ and use it to determine whether the stationary points are maxima or minima.",
      solution: [
        {
          step: "Find and solve $dy/dx = 0$",
          math: "\\frac{dy}{dx} = 3x^2 - 12x + 9 = 3(x-1)(x-3) = 0 \\implies x = 1 \\text{ or } x = 3",
        },
        {
          step: "Second derivative",
          math: "\\frac{d^2y}{dx^2} = 6x - 12",
        },
        {
          step: "At $x=1$: $d^2y/dx^2 = -6 < 0$",
          math: "\\implies \\text{local maximum at } x=1",
        },
        {
          step: "At $x=3$: $d^2y/dx^2 = 6 > 0$",
          math: "\\implies \\text{local minimum at } x=3",
        },
      ],
    },
  },
];
