// FILE: src/data/pureMaths/algebra.js

export const CHAPTER_META = {
  id: "algebra",
  title: "Algebra & Functions",
  subtitle: "Indices, quadratics, polynomials and graphs",
  icon: "∫",
  color: "#10b981",
  videoUrl: "https://www.youtube.com/watch?v=iBtJyBIGRMc",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "indices-surds",
    videoUrl: "https://www.youtube.com/watch?v=iMIGYz9YD8M",
    icon: "√",
    title: "Indices & Surds",
    subtitle: "Laws of indices, simplifying surds",
    color: "#10b981",
    visualization: null,
    desmosNote: "Try plotting $y = x^{1/2}$, $y = x^{-1}$ and $y = x^{2/3}$ to see fractional and negative index curves.",
    desmosExpressions: [],
    theory: `**Laws of Indices** — for any base $a > 0$ and rational exponents $m, n$:\n\n- $a^m \\times a^n = a^{m+n}$ (multiply → add powers)\n- $a^m \\div a^n = a^{m-n}$ (divide → subtract powers)\n- $(a^m)^n = a^{mn}$ (power of a power → multiply)\n- $a^0 = 1$ (any non-zero base to the power zero is 1)\n- $a^{-n} = \\dfrac{1}{a^n}$ (negative index → reciprocal)\n- $a^{1/n} = \\sqrt[n]{a}$ (unit fraction index → $n$th root)\n- $a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$ (fractional index)\n\n**Surds** are irrational numbers that involve square (or higher) roots, e.g. $\\sqrt{2},\\; 3\\sqrt{5}$. Key simplification rules:\n- $\\sqrt{ab} = \\sqrt{a}\\,\\sqrt{b}$\n- $\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$\n\n**Rationalising the denominator** removes the surd from the denominator:\n- For $\\dfrac{a}{\\sqrt{b}}$: multiply numerator and denominator by $\\sqrt{b}$.\n- For $\\dfrac{a}{p + q\\sqrt{b}}$: multiply by the **conjugate** $p - q\\sqrt{b}$, using the difference of two squares identity $(p+q\\sqrt{b})(p-q\\sqrt{b}) = p^2 - q^2 b$.`,
    formulas: [
      {
        label: "Product rule",
        latex: "a^m \\times a^n = a^{m+n}",
      },
      {
        label: "Quotient rule",
        latex: "a^m \\div a^n = a^{m-n}",
      },
      {
        label: "Power of a power",
        latex: "(a^m)^n = a^{mn}",
      },
      {
        label: "Fractional index",
        latex: "a^{m/n} = \\left(\\sqrt[n]{a}\\right)^m",
      },
      {
        label: "Negative index",
        latex: "a^{-n} = \\frac{1}{a^n}",
      },
      {
        label: "Rationalise (simple)",
        latex: "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}",
        note: "Multiply top and bottom by $\\sqrt{b}$",
      },
      {
        label: "Rationalise (conjugate)",
        latex: "\\frac{a}{p + q\\sqrt{b}} = \\frac{a(p - q\\sqrt{b})}{p^2 - q^2 b}",
        note: "Multiply by the conjugate $p - q\\sqrt{b}$",
      },
    ],
    example: {
      question: "Simplify $\\dfrac{3}{\\sqrt{5}-1}$, writing your answer in the form $p(\\sqrt{5}+1)$.",
      steps: [
        {
          label: "Identify the conjugate of $\\sqrt{5}-1$",
          math: "\\text{Conjugate} = \\sqrt{5}+1",
        },
        {
          label: "Multiply numerator and denominator by the conjugate",
          math: "\\frac{3}{\\sqrt{5}-1} \\times \\frac{\\sqrt{5}+1}{\\sqrt{5}+1}",
        },
        {
          label: "Expand the denominator using difference of two squares",
          math: "(\\sqrt{5})^2 - 1^2 = 5 - 1 = 4",
        },
        {
          label: "Write the result",
          math: "\\frac{3(\\sqrt{5}+1)}{4}",
        },
      ],
    },
    practice: {
      question:
        "Simplify (a) $\\dfrac{6}{\\sqrt{3}}$ and (b) $\\sqrt{12} + \\sqrt{75}$.",
      solution: [
        {
          step: "(a) Rationalise by multiplying by $\\frac{\\sqrt{3}}{\\sqrt{3}}$",
          math: "\\frac{6}{\\sqrt{3}} = \\frac{6\\sqrt{3}}{3} = 2\\sqrt{3}",
        },
        {
          step: "(b) Simplify each surd",
          math: "\\sqrt{12} = \\sqrt{4 \\times 3} = 2\\sqrt{3}, \\qquad \\sqrt{75} = \\sqrt{25 \\times 3} = 5\\sqrt{3}",
        },
        {
          step: "Add the like surds",
          math: "2\\sqrt{3} + 5\\sqrt{3} = 7\\sqrt{3}",
        },
      ],
    },
  },
  {
    id: "quadratics",
    videoUrl: "https://www.youtube.com/watch?v=gYFLXnbboNM",
    icon: "∪",
    title: "Quadratics",
    subtitle: "Completing the square, discriminant",
    color: "#10b981",
    visualization: "quadratics",
    desmosNote: "Adjust $a$, $b$, $c$ sliders to see how the discriminant changes the roots.",
    desmosExpressions: [
      { id: "1", latex: "a=1" },
      { id: "2", latex: "b=-4" },
      { id: "3", latex: "c=3" },
      { id: "4", latex: "ax^2+bx+c" },
      { id: "5", latex: "y=0" },
    ],
    theory: `A **quadratic** is an expression of the form $ax^2 + bx + c$ where $a \\neq 0$.\n\n**Methods of solving $ax^2 + bx + c = 0$:**\n1. **Factorising** — express as $(px+q)(rx+s)=0$, then solve each factor.\n2. **Completing the square** — rewrite in the form $a(x+p)^2 + q = 0$ and solve for $x$.\n3. **Quadratic formula** — applies to all quadratics; see formula below.\n\n**Discriminant** $\\Delta = b^2 - 4ac$ determines the nature of the roots:\n- $\\Delta > 0$: two distinct real roots\n- $\\Delta = 0$: one repeated (equal) root; parabola touches the $x$-axis\n- $\\Delta < 0$: no real roots; parabola does not cross the $x$-axis\n\n**Completing the square** gives the vertex form:\n$$a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2 - 4ac}{4a}$$\nThe vertex of the parabola is $\\left(-\\dfrac{b}{2a},\\; -\\dfrac{b^2-4ac}{4a}\\right)$.\n\nNote: if $a > 0$ the parabola opens upward (minimum point); if $a < 0$ it opens downward (maximum point).`,
    formulas: [
      {
        label: "Quadratic formula",
        latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
        note: "Applies to $ax^2 + bx + c = 0$, $a \\neq 0$",
      },
      {
        label: "Discriminant",
        latex: "\\Delta = b^2 - 4ac",
        note: "$\\Delta > 0$ two roots, $\\Delta = 0$ one root, $\\Delta < 0$ no real roots",
      },
      {
        label: "Completed square form",
        latex: "a\\left(x+\\frac{b}{2a}\\right)^2 - \\frac{b^2-4ac}{4a}",
        note: "Vertex at $\\left(-\\dfrac{b}{2a},\\,-\\dfrac{b^2-4ac}{4a}\\right)$",
      },
    ],
    example: {
      question:
        "Express $2x^2 - 8x + 5$ in completed square form, and hence solve $2x^2 - 8x + 5 = 0$.",
      steps: [
        {
          label: "Factor out 2 from the first two terms",
          math: "2(x^2 - 4x) + 5",
        },
        {
          label: "Complete the square inside the bracket: halve $-4$ and square it",
          math: "2\\left[(x-2)^2 - 4\\right] + 5",
        },
        {
          label: "Expand and simplify",
          math: "2(x-2)^2 - 8 + 5 = 2(x-2)^2 - 3",
        },
        {
          label: "Set equal to zero and solve",
          math: "2(x-2)^2 = 3 \\implies (x-2)^2 = \\frac{3}{2}",
        },
        {
          label: "Take the square root",
          math: "x - 2 = \\pm\\sqrt{\\frac{3}{2}} \\implies x = 2 \\pm \\frac{\\sqrt{6}}{2}",
        },
      ],
    },
    practice: {
      question:
        "Find the values of $k$ such that $x^2 + kx + 9 = 0$ has equal roots.",
      solution: [
        {
          step: "For equal roots, set the discriminant equal to zero",
          math: "\\Delta = k^2 - 4(1)(9) = 0",
        },
        {
          step: "Solve for $k$",
          math: "k^2 = 36 \\implies k = \\pm 6",
        },
      ],
    },
  },
  {
    id: "simultaneous-equations",
    videoUrl: "https://www.youtube.com/watch?v=SeA856Q53yg",
    icon: "=",
    title: "Simultaneous Equations",
    subtitle: "Linear and nonlinear systems",
    color: "#10b981",
    visualization: null,
    desmosNote: "Plot both equations simultaneously in Desmos to visualise the intersection points.",
    desmosExpressions: [],
    theory: `**Simultaneous equations** are two or more equations that must be satisfied at the same time. At A-Level you need two methods:\n\n**1. Elimination** — used when both equations are linear. Multiply one or both equations so that the coefficient of one variable matches, then add or subtract to eliminate it.\n\n**2. Substitution** — required when one equation is linear and the other is quadratic (or higher). Steps:\n1. Rearrange the **linear** equation to express one variable in terms of the other.\n2. **Substitute** into the quadratic equation.\n3. Solve the resulting quadratic — you may get 0, 1, or 2 solutions.\n4. Back-substitute each $x$-value to find the corresponding $y$-value.\n\n**Number of solutions** for a linear–quadratic system:\n- **2 solutions**: line intersects the curve at two points ($\\Delta > 0$)\n- **1 solution**: line is tangent to the curve ($\\Delta = 0$)\n- **0 solutions**: line does not intersect the curve ($\\Delta < 0$)\n\n**Important**: when solving simultaneously, always pair each $x$-value with its correct $y$-value — state solutions as coordinate pairs $(x, y)$.`,
    formulas: [
      {
        label: "General system",
        latex: "\\begin{cases} f(x,\\,y) = 0 \\\\ g(x,\\,y) = 0 \\end{cases}",
        note: "Solve to find the values of $x$ and $y$ that satisfy both equations simultaneously",
      },
    ],
    example: {
      question:
        "Solve simultaneously: $y = x + 1$ and $y = x^2 - 3$.",
      steps: [
        {
          label: "Substitute the linear expression for $y$ into the quadratic",
          math: "x + 1 = x^2 - 3",
        },
        {
          label: "Rearrange to standard quadratic form",
          math: "x^2 - x - 4 = 0",
        },
        {
          label: "Apply the quadratic formula with $a=1, b=-1, c=-4$",
          math: "x = \\frac{1 \\pm \\sqrt{1 + 16}}{2} = \\frac{1 \\pm \\sqrt{17}}{2}",
        },
        {
          label: "Find corresponding $y$-values using $y = x + 1$",
          math: "y = \\frac{1 \\pm \\sqrt{17}}{2} + 1 = \\frac{3 \\pm \\sqrt{17}}{2}",
        },
        {
          label: "State solutions as coordinate pairs",
          math: "\\left(\\frac{1+\\sqrt{17}}{2},\\;\\frac{3+\\sqrt{17}}{2}\\right) \\quad \\text{and} \\quad \\left(\\frac{1-\\sqrt{17}}{2},\\;\\frac{3-\\sqrt{17}}{2}\\right)",
        },
      ],
    },
    practice: {
      question: "Solve simultaneously: $x + y = 5$ and $x^2 + y^2 = 13$.",
      solution: [
        {
          step: "Rearrange the linear equation",
          math: "y = 5 - x",
        },
        {
          step: "Substitute into $x^2 + y^2 = 13$",
          math: "x^2 + (5-x)^2 = 13",
        },
        {
          step: "Expand and simplify",
          math: "x^2 + 25 - 10x + x^2 = 13 \\implies 2x^2 - 10x + 12 = 0",
        },
        {
          step: "Divide by 2 and factorise",
          math: "x^2 - 5x + 6 = 0 \\implies (x-2)(x-3) = 0",
        },
        {
          step: "State the solutions",
          math: "x = 2,\\; y = 3 \\quad \\text{or} \\quad x = 3,\\; y = 2",
        },
      ],
    },
  },
  {
    id: "inequalities",
    videoUrl: "https://www.youtube.com/watch?v=fdKMpPw52ms",
    icon: "<",
    title: "Inequalities",
    subtitle: "Linear and quadratic inequalities",
    color: "#10b981",
    visualization: null,
    desmosNote: "Shade regions satisfying inequalities in Desmos using the inequality syntax, e.g. $y > x^2 - 5x + 4$.",
    desmosExpressions: [],
    theory: `**Linear inequalities** are solved like linear equations with one critical rule: **reverse the inequality sign when multiplying or dividing by a negative number**.\n\nExample: $-2x > 6 \\implies x < -3$ (sign flips).\n\n**Quadratic inequalities** — the recommended approach:\n1. Move all terms to one side: $ax^2 + bx + c \\gtrless 0$.\n2. Find the roots $\\alpha$ and $\\beta$ ($\\alpha < \\beta$) by solving $ax^2 + bx + c = 0$.\n3. **Sketch** the parabola to identify where it is above/below the $x$-axis.\n\nFor $a > 0$ (U-shaped parabola):\n- $ax^2 + bx + c > 0 \\implies x < \\alpha \\text{ or } x > \\beta$ (outside the roots)\n- $ax^2 + bx + c < 0 \\implies \\alpha < x < \\beta$ (between the roots)\n\nFor $a < 0$ (∩-shaped parabola), the inequalities are reversed.\n\n**Set notation**: solutions can be written as inequalities, in interval notation $[\\alpha, \\beta]$, or as a set $\\{x : \\alpha < x < \\beta\\}$. Check which form is required by the question.`,
    formulas: [
      {
        label: "Quadratic $> 0$ ($a > 0$)",
        latex: "ax^2+bx+c > 0,\\; a>0 \\;\\Rightarrow\\; x < \\alpha \\text{ or } x > \\beta",
        note: "Solution is outside the two roots",
      },
      {
        label: "Quadratic $< 0$ ($a > 0$)",
        latex: "ax^2+bx+c < 0,\\; a>0 \\;\\Rightarrow\\; \\alpha < x < \\beta",
        note: "Solution is between the two roots",
      },
    ],
    example: {
      question: "Solve $x^2 - 5x + 4 < 0$.",
      steps: [
        {
          label: "Factorise the quadratic",
          math: "(x-1)(x-4) < 0",
        },
        {
          label: "Find the roots",
          math: "x = 1 \\quad \\text{and} \\quad x = 4",
        },
        {
          label: "Since $a = 1 > 0$, the parabola is U-shaped; the expression is negative between the roots",
          math: "1 < x < 4",
        },
      ],
    },
    practice: {
      question: "Solve $2x^2 + x - 6 \\geq 0$.",
      solution: [
        {
          step: "Factorise",
          math: "(2x - 3)(x + 2) \\geq 0",
        },
        {
          step: "Find the roots",
          math: "x = \\frac{3}{2} \\quad \\text{and} \\quad x = -2",
        },
        {
          step: "Since $a = 2 > 0$, the expression is $\\geq 0$ outside (and at) the roots",
          math: "x \\leq -2 \\quad \\text{or} \\quad x \\geq \\frac{3}{2}",
        },
      ],
    },
  },
  {
    id: "polynomials",
    videoUrl: "https://www.youtube.com/watch?v=6A7PUA4UAPM",
    icon: "P",
    title: "Polynomials & Factor Theorem",
    subtitle: "Factor theorem, polynomial division",
    color: "#10b981",
    visualization: null,
    desmosNote: "Plot a cubic $f(x) = x^3 + ax^2 + bx + c$ in Desmos and adjust coefficients to observe how real roots correspond to $x$-intercepts.",
    desmosExpressions: [],
    theory: `A **polynomial** of degree $n$ has the form $a_n x^n + a_{n-1}x^{n-1} + \\cdots + a_1 x + a_0$ where $a_n \\neq 0$.\n\n**Factor Theorem**: $(x - a)$ is a factor of $f(x)$ if and only if $f(a) = 0$.\n- To test whether $(x - a)$ is a factor, simply substitute $x = a$ into $f(x)$.\n- If $f(a) = 0$, perform polynomial division to find the remaining factor.\n\n**Remainder Theorem**: when $f(x)$ is divided by $(x - a)$, the remainder equals $f(a)$.\n- If the remainder is 0, then $(x-a)$ is a factor (consistent with the Factor Theorem).\n\n**Polynomial division** methods:\n1. **Algebraic long division** — mirrors numerical long division.\n2. **Inspection / comparing coefficients** — set up $f(x) = (x-a)(ax^2 + bx + c)$ and equate coefficients to find $a$, $b$, $c$ by inspection.\n\nFor a cubic $f(x)$: once one linear factor $(x-a)$ is found, divide to obtain a quadratic, then factorise or use the quadratic formula on the quadratic.`,
    formulas: [
      {
        label: "Factor Theorem",
        latex: "f(a) = 0 \\iff (x-a) \\text{ is a factor of } f(x)",
      },
      {
        label: "Remainder Theorem",
        latex: "f(x) \\div (x-a) \\text{ has remainder } f(a)",
        note: "Remainder $= 0 \\Rightarrow (x-a)$ is a factor",
      },
    ],
    example: {
      question:
        "Show that $(x-2)$ is a factor of $f(x) = x^3 - 3x^2 + x + 2$, then fully factorise $f(x)$.",
      steps: [
        {
          label: "Apply the Factor Theorem: evaluate $f(2)$",
          math: "f(2) = 8 - 12 + 2 + 2 = 0 \\; \\checkmark",
        },
        {
          label: "Since $f(2)=0$, $(x-2)$ is a factor. Divide $f(x)$ by $(x-2)$",
          math: "x^3 - 3x^2 + x + 2 = (x-2)(x^2 - x - 1)",
        },
        {
          label: "Check the quadratic $x^2 - x - 1$: discriminant $= 1 + 4 = 5 > 0$, so two irrational roots",
          math: "x = \\frac{1 \\pm \\sqrt{5}}{2}",
        },
        {
          label: "Full factorisation",
          math: "f(x) = (x-2)\\left(x - \\frac{1+\\sqrt{5}}{2}\\right)\\left(x - \\frac{1-\\sqrt{5}}{2}\\right)",
        },
      ],
    },
    practice: {
      question:
        "Given $f(x) = 2x^3 + 3x^2 - 11x - 6$, show that $(x+3)$ is a factor and fully factorise $f(x)$.",
      solution: [
        {
          step: "Evaluate $f(-3)$",
          math: "f(-3) = 2(-27) + 3(9) - 11(-3) - 6 = -54 + 27 + 33 - 6 = 0 \\; \\checkmark",
        },
        {
          step: "Divide $f(x)$ by $(x+3)$ to find the quadratic factor",
          math: "f(x) = (x+3)(2x^2 - 3x - 2)",
        },
        {
          step: "Factorise the quadratic",
          math: "2x^2 - 3x - 2 = (2x+1)(x-2)",
        },
        {
          step: "Full factorisation",
          math: "f(x) = (x+3)(2x+1)(x-2)",
        },
      ],
    },
  },
  {
    id: "graphs-transformations",
    videoUrl: "https://www.youtube.com/watch?v=Ou5lHk9dsPQ",
    icon: "↕",
    title: "Graphs & Transformations",
    subtitle: "Translations, stretches, reflections",
    color: "#10b981",
    visualization: "transformations",
    desmosNote: "Drag $a$, $b$, $c$ sliders to see translations and stretches live.",
    desmosExpressions: [
      { id: "1", latex: "a=0" },
      { id: "2", latex: "b=0" },
      { id: "3", latex: "c=1" },
      { id: "4", latex: "c(x-a)^2+b" },
    ],
    theory: `You must know the shapes of these **standard graphs** and how transformations affect them:\n- $y = x^2$ (parabola, vertex at origin)\n- $y = x^3$ (cubic, point of inflection at origin)\n- $y = \\frac{1}{x}$ (hyperbola, asymptotes along axes)\n- $y = \\sqrt{x}$ (half-parabola, starts at origin)\n- $y = |x|$ (V-shape, vertex at origin)\n\n**Key transformations of $y = f(x)$:**\n\n| Transformation | Effect |\n|---|---|\n| $y = f(x) + a$ | Translation by $\\begin{pmatrix}0\\\\a\\end{pmatrix}$ — shift **up** by $a$ |\n| $y = f(x - a)$ | Translation by $\\begin{pmatrix}a\\\\0\\end{pmatrix}$ — shift **right** by $a$ |\n| $y = a\\,f(x)$ | Vertical stretch, scale factor $a$ (away from $x$-axis) |\n| $y = f(ax)$ | Horizontal stretch, scale factor $\\tfrac{1}{a}$ (towards $y$-axis) |\n| $y = -f(x)$ | Reflection in the $x$-axis |\n| $y = f(-x)$ | Reflection in the $y$-axis |\n\n**Remember**: $f(x-a)$ shifts **right** (not left) — the sign inside the function is counterintuitive. Always identify the transformation type before applying it to key points.`,
    formulas: [
      {
        label: "Vertical translation",
        latex: "y = f(x) + a",
        note: "Shift up by $a$ (down if $a < 0$)",
      },
      {
        label: "Horizontal translation",
        latex: "y = f(x - a)",
        note: "Shift right by $a$ (left if $a < 0$)",
      },
      {
        label: "Vertical stretch",
        latex: "y = a\\,f(x)",
        note: "Scale factor $a$ parallel to the $y$-axis",
      },
      {
        label: "Horizontal stretch",
        latex: "y = f(ax)",
        note: "Scale factor $\\tfrac{1}{a}$ parallel to the $x$-axis",
      },
      {
        label: "Reflection in $x$-axis",
        latex: "y = -f(x)",
      },
      {
        label: "Reflection in $y$-axis",
        latex: "y = f(-x)",
      },
    ],
    example: {
      question:
        "Sketch $y = (x-3)^2 + 2$, stating the vertex and $y$-intercept.",
      steps: [
        {
          label: "Identify the base graph",
          math: "y = x^2",
        },
        {
          label: "Apply translation right 3: $y = (x-3)^2$",
          math: "\\text{Vertex moves from } (0,0) \\text{ to } (3,0)",
        },
        {
          label: "Apply translation up 2: $y = (x-3)^2 + 2$",
          math: "\\text{Vertex moves to } (3,\\,2)",
        },
        {
          label: "Find the $y$-intercept by setting $x = 0$",
          math: "y = (0-3)^2 + 2 = 9 + 2 = 11 \\quad \\Rightarrow (0,\\,11)",
        },
      ],
    },
    practice: {
      question:
        "Describe fully the sequence of transformations that maps $y = x^3$ onto $y = 2(x+1)^3 - 5$.",
      solution: [
        {
          step: "Identify $f(x) = x^3$ and compare with $2(x+1)^3 - 5$",
          math: "y = 2\\,f(x+1) - 5",
        },
        {
          step: "$(x+1)$ means $f(x - (-1))$: translation left 1",
          math: "\\text{Translation by } \\begin{pmatrix}-1\\\\0\\end{pmatrix}",
        },
        {
          step: "Factor of 2 outside $f$: vertical stretch",
          math: "\\text{Vertical stretch, scale factor } 2 \\text{ (parallel to the } y\\text{-axis)}",
        },
        {
          step: "$-5$ added outside: translation down 5",
          math: "\\text{Translation by } \\begin{pmatrix}0\\\\-5\\end{pmatrix}",
        },
      ],
    },
  },
];
