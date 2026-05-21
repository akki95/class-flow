export const CHAPTER_META = {
  id: "gcse-algebra-67",
  title: "Algebra",
  subtitle: "Quadratics, simultaneous equations, algebraic fractions and sequences for GCSE Higher Grade 6–7",
  icon: "𝑥",
  color: "#8b5cf6",
  grade: "6-7",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "factorising-quadratics",
    icon: "( )",
    title: "Factorising Quadratics",
    subtitle: "ax²+bx+c including harder cases",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Factorising** a quadratic means writing it as a product of two brackets.

**Step 1 — always check for a common factor first.**

**Simple quadratics ($a = 1$):** For $x^2 + bx + c$, find two numbers $p$ and $q$ such that $p + q = b$ and $pq = c$.

$$x^2 + 5x + 6 = (x+2)(x+3)$$

**Harder quadratics ($a \\ne 1$) — the AC method:**
1. Multiply $a \\times c$ to get the product $ac$.
2. Find two numbers $p$ and $q$ such that $pq = ac$ and $p + q = b$.
3. Split the middle term: $ax^2 + px + qx + c$.
4. Factorise by grouping in pairs.

**Difference of two squares:** A very common pattern:

$$a^2 - b^2 = (a+b)(a-b)$$

For example, $9x^2 - 16 = (3x+4)(3x-4)$.`,
    formulas: [
      { label: "Simple quadratic (a=1)", latex: "x^2 + bx + c = (x+p)(x+q) \\text{ where } p+q=b,\\ pq=c" },
      { label: "AC method: find p, q with", latex: "pq = ac \\text{ and } p+q = b" },
      { label: "Difference of two squares", latex: "a^2 - b^2 = (a+b)(a-b)" },
    ],
    example: {
      question: "Factorise $6x^2 + 11x - 10$.",
      steps: [
        { label: "Identify a, b, c", math: "a=6,\\ b=11,\\ c=-10" },
        { label: "Find ac", math: "ac = 6 \\times (-10) = -60" },
        { label: "Find p, q with pq = −60 and p + q = 11", math: "15 \\times (-4) = -60 \\text{ and } 15 + (-4) = 11" },
        { label: "Split the middle term", math: "6x^2 + 15x - 4x - 10" },
        { label: "Factorise by grouping", math: "3x(2x+5) - 2(2x+5)" },
        { label: "Final answer", math: "(3x-2)(2x+5)" },
      ],
    },
    practice: {
      question: "Factorise: (a) $2x^2 - 7x + 3$ and (b) $4x^2 - 9$.",
      solution: [
        { step: "Part (a): ac = 2×3 = 6; find p, q with pq=6, p+q=−7", math: "-6 \\times (-1) = 6,\\ -6+(-1)=-7" },
        { step: "Split and group", math: "2x^2 - 6x - x + 3 = 2x(x-3) - 1(x-3)" },
        { step: "Part (a) answer", math: "(2x-1)(x-3)" },
        { step: "Part (b): recognise difference of two squares", math: "4x^2 - 9 = (2x)^2 - 3^2" },
        { step: "Part (b) answer", math: "(2x+3)(2x-3)" },
      ],
    },
  },
  {
    id: "quadratic-formula",
    icon: "±√",
    title: "Quadratic Formula & Completing the Square",
    subtitle: "Solving quadratics including completing the square",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "Adjust a, b, c to see how the discriminant changes the number of roots.",
    desmosExpressions: [
      { id: "1", latex: "a=1" },
      { id: "2", latex: "b=-4" },
      { id: "3", latex: "c=3" },
      { id: "4", latex: "ax^2+bx+c" },
    ],
    theory: `**The quadratic formula** solves $ax^2 + bx + c = 0$ for any values of $a$, $b$, $c$:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

Use this when factorising is difficult or impossible.

**The discriminant** $\\Delta = b^2 - 4ac$ tells you how many solutions exist:
- $\\Delta > 0$: two distinct real solutions
- $\\Delta = 0$: exactly one real solution (repeated root)
- $\\Delta < 0$: no real solutions

**Completing the square** rewrites $x^2 + bx + c$ in the form $(x + p)^2 + q$:

$$x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2 + c$$

This form reveals the **vertex** of the parabola at $\\left(-\\frac{b}{2},\\, c - \\left(\\frac{b}{2}\\right)^2\\right)$ and is useful for solving and sketching.`,
    formulas: [
      { label: "Quadratic formula", latex: "x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" },
      { label: "Discriminant", latex: "\\Delta = b^2 - 4ac" },
      { label: "Completing the square", latex: "x^2+bx+c = \\left(x+\\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2+c" },
    ],
    example: {
      question: "Solve $x^2 - 6x + 4 = 0$ by completing the square, leaving your answer in surd form.",
      steps: [
        { label: "Half the coefficient of x", math: "\\frac{-6}{2} = -3" },
        { label: "Write completed square form", math: "(x-3)^2 - 9 + 4 = 0" },
        { label: "Simplify", math: "(x-3)^2 - 5 = 0" },
        { label: "Rearrange", math: "(x-3)^2 = 5" },
        { label: "Square root both sides", math: "x - 3 = \\pm\\sqrt{5}" },
        { label: "Final answer", math: "x = 3 \\pm \\sqrt{5}" },
      ],
    },
    practice: {
      question: "(a) Solve $2x^2 - 5x - 3 = 0$ using the quadratic formula. (b) Write $x^2 + 8x - 3$ in completed square form.",
      solution: [
        { step: "Part (a): identify a=2, b=−5, c=−3", math: "x = \\frac{5 \\pm \\sqrt{(-5)^2 - 4(2)(-3)}}{2(2)}" },
        { step: "Calculate discriminant", math: "25 + 24 = 49,\\quad \\sqrt{49}=7" },
        { step: "Two solutions", math: "x = \\frac{5+7}{4} = 3 \\quad \\text{or} \\quad x = \\frac{5-7}{4} = -\\frac{1}{2}" },
        { step: "Part (b): half of 8 is 4", math: "x^2 + 8x - 3 = (x+4)^2 - 16 - 3" },
        { step: "Part (b) answer", math: "(x+4)^2 - 19" },
      ],
    },
  },
  {
    id: "simultaneous-67",
    icon: "⇔",
    title: "Simultaneous Equations",
    subtitle: "Linear-linear and linear-quadratic systems",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Linear-linear systems** (two straight lines): use **elimination** or **substitution**.

- *Elimination:* scale equations so one variable has matching coefficients, then add or subtract.
- *Substitution:* rearrange one equation and substitute into the other.

**Linear-quadratic systems** (a line and a curve): **always use substitution**.

1. Rearrange the linear equation to make one variable the subject ($y = mx + c$).
2. Substitute into the quadratic equation.
3. Rearrange into standard form $ax^2 + bx + c = 0$ and solve.
4. Substitute back to find the corresponding values of the other variable.

**Number of solutions:**
- 2 solutions → line intersects curve at **two** points
- 1 solution → line is **tangent** to the curve
- 0 solutions → line **misses** the curve (discriminant $< 0$)`,
    formulas: [
      { label: "Substitution step", latex: "\\text{Rearrange linear: } y = mx+c" },
      { label: "Substitute into quadratic", latex: "ax^2 + b(mx+c) + d = 0" },
    ],
    example: {
      question: "Solve simultaneously $y = x + 3$ and $y = x^2 - 1$.",
      steps: [
        { label: "Substitute linear into quadratic", math: "x + 3 = x^2 - 1" },
        { label: "Rearrange to standard form", math: "x^2 - x - 4 = 0" },
        { label: "Apply quadratic formula (a=1, b=−1, c=−4)", math: "x = \\frac{1 \\pm \\sqrt{1+16}}{2} = \\frac{1 \\pm \\sqrt{17}}{2}" },
        { label: "Two x values", math: "x \\approx 2.56 \\quad \\text{or} \\quad x \\approx -1.56" },
        { label: "Find y using y = x + 3", math: "y \\approx 5.56 \\quad \\text{or} \\quad y \\approx 1.44" },
      ],
    },
    practice: {
      question: "Solve simultaneously $x + y = 5$ and $x^2 + y^2 = 17$.",
      solution: [
        { step: "Rearrange linear equation", math: "y = 5 - x" },
        { step: "Substitute into quadratic", math: "x^2 + (5-x)^2 = 17" },
        { step: "Expand", math: "x^2 + 25 - 10x + x^2 = 17" },
        { step: "Simplify", math: "2x^2 - 10x + 8 = 0 \\implies x^2 - 5x + 4 = 0" },
        { step: "Factorise", math: "(x-1)(x-4) = 0" },
        { step: "Solutions", math: "x = 1,\\ y = 4 \\quad \\text{or} \\quad x = 4,\\ y = 1" },
      ],
    },
  },
  {
    id: "algebraic-fractions",
    icon: "a/b",
    title: "Algebraic Fractions",
    subtitle: "Simplifying, adding and solving with fractions",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Algebraic fractions follow the same rules as numerical fractions — but you must **factorise** first.

**Simplifying:** Factorise both numerator and denominator fully, then cancel common factors.

$$\\frac{x^2-9}{x^2+6x+9} = \\frac{(x+3)(x-3)}{(x+3)^2} = \\frac{x-3}{x+3}$$

**Adding/Subtracting:** Find a common denominator, adjust numerators, then simplify.

$$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$$

**Multiplying:** Multiply numerators together and denominators together (factorise and cancel first where possible).

**Dividing:** Multiply by the reciprocal of the second fraction.

**Solving equations:** Multiply every term by the LCM of all denominators to clear fractions, then solve the resulting polynomial equation. Remember to check for values that make the original denominator zero (excluded values).`,
    formulas: [
      { label: "Simplify: factorise then cancel", latex: "\\frac{f(x)}{g(x)} \\xrightarrow{\\text{factorise}} \\text{cancel common factors}" },
      { label: "Add fractions", latex: "\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}" },
      { label: "Divide fractions", latex: "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}" },
    ],
    example: {
      question: "Simplify $\\dfrac{x^2-4}{x^2+4x+4}$.",
      steps: [
        { label: "Factorise the numerator (difference of two squares)", math: "x^2 - 4 = (x+2)(x-2)" },
        { label: "Factorise the denominator (perfect square)", math: "x^2 + 4x + 4 = (x+2)^2" },
        { label: "Write as one fraction", math: "\\frac{(x+2)(x-2)}{(x+2)^2}" },
        { label: "Cancel common factor (x+2)", math: "\\frac{x-2}{x+2} \\quad (x \\ne -2)" },
      ],
    },
    practice: {
      question: "Solve $\\dfrac{3}{x-1} + \\dfrac{2}{x+1} = 4$.",
      solution: [
        { step: "Common denominator is (x−1)(x+1)", math: "\\frac{3(x+1) + 2(x-1)}{(x-1)(x+1)} = 4" },
        { step: "Expand numerator", math: "3x+3+2x-2 = 5x+1" },
        { step: "Expand denominator (difference of squares)", math: "(x-1)(x+1) = x^2-1" },
        { step: "Multiply both sides by (x²−1)", math: "5x+1 = 4(x^2-1)" },
        { step: "Rearrange", math: "4x^2 - 5x - 5 = 0" },
        { step: "Apply quadratic formula", math: "x = \\frac{5 \\pm \\sqrt{25+80}}{8} = \\frac{5 \\pm \\sqrt{105}}{8}" },
      ],
    },
  },
  {
    id: "quadratic-sequences",
    icon: "n²",
    title: "Quadratic Sequences",
    subtitle: "Finding the nth term of quadratic sequences",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `In a **quadratic sequence**, the **second differences** are constant (whereas in a linear sequence, the first differences are constant).

The $n$th term has the form $an^2 + bn + c$.

**Method to find the nth term:**

1. Find the first differences (subtract consecutive terms).
2. Find the second differences (subtract consecutive first differences) — these should all be equal.
3. $2a =$ second difference, so $a = \\dfrac{\\text{second difference}}{2}$.
4. Subtract $an^2$ from each term of the original sequence to get a **linear sequence**.
5. Find the $n$th term of that linear sequence (it will be of the form $bn + c$).
6. Combine: $n\\text{th term} = an^2 + bn + c$.

**Check** by substituting $n = 1, 2, 3$ back into your formula.`,
    formulas: [
      { label: "nth term of quadratic sequence", latex: "T_n = an^2 + bn + c" },
      { label: "Finding a from second difference", latex: "2a = \\text{second difference} \\implies a = \\frac{\\text{second difference}}{2}" },
    ],
    example: {
      question: "Find the $n$th term of the sequence $3, 8, 15, 24, 35, \\ldots$",
      steps: [
        { label: "First differences", math: "5,\\ 7,\\ 9,\\ 11" },
        { label: "Second differences", math: "2,\\ 2,\\ 2 \\quad \\Rightarrow \\text{ constant, so quadratic confirmed}" },
        { label: "Find a", math: "2a = 2 \\implies a = 1" },
        { label: "Subtract n² from original terms (n=1,2,3,4,5)", math: "3-1=2,\\ 8-4=4,\\ 15-9=6,\\ 24-16=8,\\ 35-25=10" },
        { label: "Linear sequence 2,4,6,8,10 has nth term", math: "2n" },
        { label: "Combine", math: "T_n = n^2 + 2n" },
        { label: "Verify: n=1", math: "1+2=3\\ \\checkmark" },
      ],
    },
    practice: {
      question: "Find the $n$th term of the sequence $5, 14, 27, 44, 65, \\ldots$",
      solution: [
        { step: "First differences", math: "9,\\ 13,\\ 17,\\ 21" },
        { step: "Second differences", math: "4,\\ 4,\\ 4 \\quad \\Rightarrow a = \\frac{4}{2} = 2" },
        { step: "Subtract 2n² from original terms", math: "5-2=3,\\ 14-8=6,\\ 27-18=9,\\ 44-32=12,\\ 65-50=15" },
        { step: "Linear sequence 3,6,9,12,15 has nth term", math: "3n" },
        { step: "Combine", math: "T_n = 2n^2 + 3n" },
        { step: "Verify: n=1", math: "2(1)+3(1)=5\\ \\checkmark,\\quad n=2:\\ 8+6=14\\ \\checkmark" },
      ],
    },
  },
];
