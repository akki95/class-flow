export const CHAPTER_META = {
  id: "sat-advanced-math",
  title: "Advanced Math",
  subtitle: "Quadratics, polynomials, radicals and exponential functions",
  icon: "🔢",
  color: "#8b5cf6",
  exam: "SAT Math",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "sat-quadratics",
    icon: "∪",
    title: "Quadratics",
    subtitle: "Solving, factoring, vertex form and quadratic graphs",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "Explore the parabola y = ax² + bx + c. Change the sliders for a, b, c to see how the vertex, direction, and roots shift.",
    desmosExpressions: [
      { id: "a", latex: "a=1" },
      { id: "b", latex: "b=-5" },
      { id: "c", latex: "c=6" },
      { id: "1", latex: "y=ax^2+bx+c" },
    ],

    theory: `A quadratic equation has the form $ax^2 + bx + c = 0$ where $a \\neq 0$.

Three methods to solve:

1. Factoring — rewrite as $(x - r)(x - s) = 0$, so $x = r$ or $x = s$.
- Works cleanly when roots are integers or simple fractions.

2. Completing the Square — rewrite in vertex form:
$$ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2 - 4ac}{4a}$$

3. Quadratic Formula — always works:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Vertex Form: $y = a(x - h)^2 + k$
- Vertex is at $(h, k)$.
- Axis of symmetry: $x = h$.
- If $a > 0$: parabola opens upward (minimum at vertex).
- If $a < 0$: parabola opens downward (maximum at vertex).

The Discriminant $\\Delta = b^2 - 4ac$ tells the number of real solutions:

Vieta's Formulas — for roots $p$ and $q$ of $ax^2 + bx + c = 0$:
$$p + q = -\\frac{b}{a} \\qquad p \\cdot q = \\frac{c}{a}$$

These are extremely useful on the SAT when you're asked about the sum or product of solutions without actually solving.`,

    formulas: [
      {
        label: "Quadratic formula",
        latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      },
      {
        label: "Vertex (axis of symmetry)",
        latex: "h = -\\frac{b}{2a}, \\quad k = f(h)",
      },
      {
        label: "Vertex form",
        latex: "y = a(x - h)^2 + k",
      },
      {
        label: "Discriminant",
        latex: "\\Delta = b^2 - 4ac",
      },
      {
        label: "Vieta's — sum of roots",
        latex: "p + q = -\\frac{b}{a}",
      },
      {
        label: "Vieta's — product of roots",
        latex: "p \\cdot q = \\frac{c}{a}",
      },
    ],

    example: {
      problem:
        "The equation $x^2 - 5x + 6 = 0$ has solutions $x = p$ and $x = q$. What is $p + q$?",
      solution: `Method 1: Vieta's Formulas (fastest on SAT)

For $x^2 - 5x + 6 = 0$, we have $a = 1$, $b = -5$, $c = 6$.

$$p + q = -\\frac{b}{a} = -\\frac{-5}{1} = 5$$

Method 2: Solve directly

Factor: $(x - 2)(x - 3) = 0$

So $x = 2$ or $x = 3$, and $p + q = 2 + 3 = 5$.

Answer: $p + q = 5$`,
    },

    practice: [
      {
        question:
          "For the equation $2x^2 + kx + 8 = 0$ to have exactly one real solution, what must $k$ equal?",
        answer: "$k = 8$ or $k = -8$",
        solution: `Exactly one real solution means the discriminant equals zero:

$$\\Delta = k^2 - 4(2)(8) = 0$$
$$k^2 - 64 = 0$$
$$k^2 = 64$$
$$k = \\pm 8$$

Answer: $k = 8$ or $k = -8$`,
      },
      {
        question:
          "The graph of $y = (x - 3)^2 - 4$ is a parabola. What are the x-intercepts of the parabola?",
        answer: "$x = 1$ and $x = 5$",
        solution: `Set $y = 0$:
$$(x - 3)^2 - 4 = 0$$
$$(x - 3)^2 = 4$$
$$x - 3 = \\pm 2$$
$$x = 3 + 2 = 5 \\quad \\text{or} \\quad x = 3 - 2 = 1$$

The x-intercepts are $x = 1$ and $x = 5$.

*Note:* The vertex is at $(3, -4)$ and the parabola opens upward ($a = 1 > 0$).`,
      },
    ],
  },

  {
    id: "sat-polynomials",
    icon: "🧮",
    title: "Polynomials & Non-linear Functions",
    subtitle: "Operations, graphs and linear-quadratic systems",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "Graph shows a cubic polynomial and a line. Adjust the line to see how many intersection points (solutions) are possible.",
    desmosExpressions: [
      { id: "1", latex: "y=x^3-2x^2-5x+6" },
      { id: "2", latex: "y=2x-2" },
    ],

    theory: `Polynomial Operations

*Adding and subtracting:* Combine like terms (same variable and exponent).
$$\\text{e.g., } (3x^2 + 2x - 1) + (x^2 - 4x + 5) = 4x^2 - 2x + 4$$

*Multiplying:* Use distribution (FOIL for two binomials).
$$(a + b)(c + d) = ac + ad + bc + bd$$

Key Algebraic Identities (memorize for SAT):
$$a^2 - b^2 = (a + b)(a - b) \\quad \\text{(difference of squares)}$$
$$(a + b)^2 = a^2 + 2ab + b^2$$
$$(a - b)^2 = a^2 - 2ab + b^2$$

Remainder Theorem:
When a polynomial $f(x)$ is divided by $(x - a)$, the remainder equals $f(a)$.
$$f(x) \\div (x - a) \\implies \\text{remainder} = f(a)$$

Factor Theorem:
$(x - a)$ is a factor of $f(x)$ if and only if $f(a) = 0$.
- This means $x = a$ is a zero (root, x-intercept) of the polynomial.

Polynomial Graphs:
- Zeros of $f(x)$ are the x-intercepts.
- A factor $(x - a)^2$ means the graph *touches* the x-axis at $x = a$ (even multiplicity = bounce).
- A factor $(x - a)^1$ means the graph *crosses* the x-axis at $x = a$ (odd multiplicity = cross).

Linear-Quadratic Systems:
To solve a system with one linear and one quadratic equation:
1. Substitute the linear expression into the quadratic.
2. Rearrange to form a standard quadratic.
3. Use the discriminant to determine the number of intersections.`,

    formulas: [
      {
        label: "Difference of squares",
        latex: "a^2 - b^2 = (a + b)(a - b)",
      },
      {
        label: "Perfect square (sum)",
        latex: "(a + b)^2 = a^2 + 2ab + b^2",
      },
      {
        label: "Perfect square (difference)",
        latex: "(a - b)^2 = a^2 - 2ab + b^2",
      },
      {
        label: "Remainder theorem",
        latex: "f(a) = \\text{remainder when } f(x) \\div (x - a)",
      },
      {
        label: "Factor theorem",
        latex: "f(a) = 0 \\iff (x - a) \\text{ is a factor of } f(x)",
      },
    ],

    example: {
      problem:
        "Given that $(x - 3)$ is a factor of $f(x) = x^3 - 2x^2 - 5x + 6$, find all factors of $f(x)$.",
      solution: `Verify the factor: $f(3) = 27 - 18 - 15 + 6 = 0$ ✓

Divide $f(x)$ by $(x - 3)$ using polynomial long division or synthetic division:

$$x^3 - 2x^2 - 5x + 6 = (x - 3)(x^2 + x - 2)$$

Factor the remaining quadratic:
$$x^2 + x - 2 = (x + 2)(x - 1)$$

Complete factorisation:
$$f(x) = (x - 3)(x + 2)(x - 1)$$

The zeros are $x = 3$, $x = -2$, and $x = 1$.`,
    },

    practice: [
      {
        question:
          "The function $f(x) = x^2 - 7x + c$ has a zero at $x = 4$. What is the value of $c$?",
        answer: "$c = 12$",
        solution: `Since $x = 4$ is a zero, $f(4) = 0$:

$$f(4) = (4)^2 - 7(4) + c = 0$$
$$16 - 28 + c = 0$$
$$-12 + c = 0$$
$$c = 12$$

Answer: $c = 12$

*Verify:* $f(x) = x^2 - 7x + 12 = (x - 3)(x - 4)$, so zeros are $x = 3$ and $x = 4$ ✓`,
      },
      {
        question:
          "When $p(x) = x^3 + 3x^2 - 4x + k$ is divided by $(x + 2)$, the remainder is 5. What is the value of $k$?",
        answer: "$k = 9$",
        solution: `By the Remainder Theorem, the remainder when $p(x)$ is divided by $(x + 2) = (x - (-2))$ equals $p(-2)$:

$$p(-2) = (-2)^3 + 3(-2)^2 - 4(-2) + k = 5$$
$$-8 + 12 + 8 + k = 5$$
$$12 + k = 5$$
$$k = -7$$

Wait — let me recompute:
$$(-2)^3 = -8, \\quad 3(-2)^2 = 12, \\quad -4(-2) = 8$$
$$-8 + 12 + 8 + k = 5$$
$$12 + k = 5$$
$$k = -7$$

Answer: $k = -7$`,
      },
    ],
  },

  {
    id: "sat-radicals",
    icon: "√",
    title: "Radicals & Rational Expressions",
    subtitle: "Radical equations, rational exponents and expressions",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],

    theory: `Radical Basics

$$\\sqrt{a^2} = |a| \\qquad \\sqrt[n]{a^n} = |a| \\text{ (for even } n\\text{)}$$

Solving Radical Equations:
1. Isolate the radical on one side.
2. Raise both sides to the appropriate power to eliminate the radical.
3. Solve the resulting equation.
4. Always check for extraneous solutions — squaring can introduce false answers.

Rational Exponents:
$$a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$$

Examples:
- $8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4$
- $16^{\\frac{3}{4}} = (\\sqrt[4]{16})^3 = 2^3 = 8$

Rational Expressions:
A rational expression is a fraction with polynomials in numerator and denominator.

*Simplifying:* Factor both numerator and denominator, then cancel common factors.
- Important: state restrictions on the variable (values that make the denominator zero).

*Adding/Subtracting:* Find the Least Common Denominator (LCD), rewrite each fraction, then combine.

*Equations with rational expressions:* Multiply every term by the LCD to clear fractions. Always verify solutions don't make any original denominator equal to zero.

SAT tip: Rational expression problems often hide a simple factoring step. Factor the numerator and denominator completely before doing anything else.`,

    formulas: [
      {
        label: "Rational exponent",
        latex: "a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m",
      },
      {
        label: "Solving radical equations",
        latex: "\\sqrt{f(x)} = g(x) \\implies f(x) = [g(x)]^2, \\text{ then check solutions}",
      },
      {
        label: "Simplifying rational expressions",
        latex: "\\frac{p(x)}{q(x)} = \\frac{\\text{factored numerator}}{\\text{factored denominator}}, \\text{ cancel common factors}",
      },
    ],

    example: {
      problem: "Solve $\\sqrt{2x + 3} = 5$.",
      solution: `Isolate the radical (already isolated).

Square both sides:
$$(\\sqrt{2x + 3})^2 = 5^2$$
$$2x + 3 = 25$$

Solve:
$$2x = 22$$
$$x = 11$$

Check for extraneous solutions:
$$\\sqrt{2(11) + 3} = \\sqrt{25} = 5 \\checkmark$$

Answer: $x = 11$`,
    },

    practice: [
      {
        question:
          "Simplify the expression $\\dfrac{x^2 - 9}{x^2 + x - 6}$. State any restrictions on $x$.",
        answer: "$\\dfrac{x - 3}{x - 2}$, where $x \\neq -3$ and $x \\neq 2$",
        solution: `Factor the numerator:
$$x^2 - 9 = (x + 3)(x - 3)$$

Factor the denominator:
$$x^2 + x - 6 = (x + 3)(x - 2)$$

Cancel the common factor $(x + 3)$:
$$\\frac{(x + 3)(x - 3)}{(x + 3)(x - 2)} = \\frac{x - 3}{x - 2}$$

Restrictions: $x \\neq -3$ (from original denominator) and $x \\neq 2$ (makes denominator zero).

Answer: $\\dfrac{x - 3}{x - 2}$, where $x \\neq -3$ and $x \\neq 2$`,
      },
      {
        question:
          "Solve $\\sqrt{3x - 2} = x - 2$. Which value(s) of $x$ satisfy the original equation?",
        answer: "$x = 6$",
        solution: `Square both sides:
$$3x - 2 = (x - 2)^2 = x^2 - 4x + 4$$

Rearrange:
$$0 = x^2 - 7x + 6$$
$$0 = (x - 1)(x - 6)$$

Potential solutions: $x = 1$ or $x = 6$.

Check $x = 1$: $\\sqrt{3(1) - 2} = \\sqrt{1} = 1$, but $x - 2 = -1$. Since $1 \\neq -1$, $x = 1$ is extraneous.

Check $x = 6$: $\\sqrt{3(6) - 2} = \\sqrt{16} = 4$, and $x - 2 = 4$. ✓

Answer: $x = 6$`,
      },
    ],
  },

  {
    id: "sat-exponentials",
    icon: "📉",
    title: "Exponential Functions",
    subtitle: "Growth, decay and comparing linear vs exponential",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "Compare exponential growth (b > 1) and decay (0 < b < 1). Change the base b and initial value a to explore different scenarios.",
    desmosExpressions: [
      { id: "a", latex: "a=500" },
      { id: "b", latex: "b=1.2" },
      { id: "1", latex: "f(x)=a\\cdot b^x" },
    ],

    theory: `Exponential Function: $f(x) = a \\cdot b^x$
- $a$ = initial value (value when $x = 0$)
- $b$ = base (growth/decay factor)
- Growth: $b > 1$ (value increases over time)
- Decay: $0 < b < 1$ (value decreases over time)

Percentage Growth and Decay:
$$\\text{Growth: } f(t) = a(1 + r)^t \\qquad \\text{Decay: } f(t) = a(1 - r)^t$$

where $r$ is the rate as a decimal (e.g., 15% → $r = 0.15$) and $t$ is time.

Half-Life: A special case of exponential decay where the base is $\\frac{1}{2}$:
$$f(t) = a \\cdot \\left(\\frac{1}{2}\\right)^{t/h}$$
where $h$ is the half-life period.

Linear vs. Exponential Change:

SAT strategy — reading a table:
- If consecutive outputs differ by a constant *amount*, the relationship is linear.
- If consecutive outputs differ by a constant *ratio*, the relationship is exponential.

Finding when two models are equal: Set the two expressions equal and solve algebraically or by testing answer choices.

Interpreting exponential models in context:
When a problem says "increases by 12% each year," write $b = 1.12$.
When it says "decreases by 8% each month," write $b = 0.92$.`,

    formulas: [
      {
        label: "General exponential",
        latex: "f(x) = a \\cdot b^x",
      },
      {
        label: "Exponential growth (percentage)",
        latex: "f(t) = a(1 + r)^t",
      },
      {
        label: "Exponential decay (percentage)",
        latex: "f(t) = a(1 - r)^t",
      },
      {
        label: "Half-life model",
        latex: "f(t) = a \\cdot \\left(\\frac{1}{2}\\right)^{t/h}, \\quad h = \\text{half-life}",
      },
    ],

    example: {
      problem:
        "A population of bacteria doubles every 3 hours. Starting with 500 bacteria, write the function and find the population after 9 hours.",
      solution: `Set up the model: The population doubles ($b = 2$) every 3 hours, so:

$$f(t) = 500 \\cdot 2^{t/3}$$

where $t$ is time in hours.

Find the population at $t = 9$:
$$f(9) = 500 \\cdot 2^{9/3} = 500 \\cdot 2^3 = 500 \\cdot 8 = 4000$$

Answer: After 9 hours, there are 4,000 bacteria.

*Sanity check:* Every 3 hours the population doubles — $500 \\to 1000 \\to 2000 \\to 4000$ ✓`,
    },

    practice: [
      {
        question:
          "A car worth $24,000 depreciates (loses value) by 15% each year. What is its approximate value after 4 years?",
        answer: "Approximately $12,523",
        solution: `Identify the model: Annual decay rate $r = 0.15$, so $b = 1 - 0.15 = 0.85$.

$$f(t) = 24{,}000 \\cdot (0.85)^t$$

Evaluate at $t = 4$:
$$f(4) = 24{,}000 \\cdot (0.85)^4$$

Calculate $(0.85)^4$:
$$0.85^2 = 0.7225$$
$$0.85^4 = (0.7225)^2 \\approx 0.5220$$

$$f(4) \\approx 24{,}000 \\times 0.5220 \\approx 12{,}523$$

The car is worth approximately $12,523 after 4 years.`,
      },
      {
        question:
          "The table below shows the value of a savings account over several years. Does the data represent a linear or exponential relationship, and what is the value after year 5?\n\n| Year | Value ($) |\n|---|---|\n| 0 | 1,000 |\n| 1 | 1,100 |\n| 2 | 1,210 |\n| 3 | 1,331 |",
        answer: "Exponential; approximately $1,610.51 after year 5",
        solution: `Identify the pattern:
- Year 0 → 1: $\\frac{1100}{1000} = 1.1$
- Year 1 → 2: $\\frac{1210}{1100} = 1.1$
- Year 2 → 3: $\\frac{1331}{1210} = 1.1$

Constant *ratio* of 1.1 → this is an exponential relationship (10% growth each year).

Write the model:
$$f(t) = 1000 \\cdot (1.1)^t$$

Find the value after year 5:
$$f(5) = 1000 \\cdot (1.1)^5 = 1000 \\cdot 1.61051 \\approx 1{,}610.51$$

The relationship is exponential, and the value after year 5 is approximately $1,610.51.`,
      },
    ],
  },
];
