// FILE: src/data/gcse/grade45/algebra.js

export const CHAPTER_META = {
  id: "gcse-algebra-45",
  title: "Algebra",
  subtitle: "Expressions, equations, sequences and graphs",
  icon: "𝑥",
  color: "#8b5cf6",
  grade: "4-5",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "expanding",
    icon: "()",
    title: "Expressions & Expanding Brackets",
    subtitle: "Simplifying, expanding and factorising",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Collecting like terms:** Only terms with the same letter and power can be added or subtracted.
$$3x^2 + 5x - x^2 + 2x = 2x^2 + 7x$$

**Expanding a single bracket:** Multiply every term inside the bracket by the term outside.
$$3(2x - 5) = 6x - 15$$

**Expanding double brackets (FOIL):** Multiply each term in the first bracket by each term in the second.
$$(a + b)(c + d) = ac + ad + bc + bd$$

For example:
$$(x + 3)(x - 5) = x^2 - 5x + 3x - 15 = x^2 - 2x - 15$$

**Special cases to recognise:**
$$\\text{Perfect square (positive):} \\quad (a + b)^2 = a^2 + 2ab + b^2$$
$$\\text{Perfect square (negative):} \\quad (a - b)^2 = a^2 - 2ab + b^2$$
$$\\text{Difference of two squares:} \\quad (a + b)(a - b) = a^2 - b^2$$

**Factorising:** The reverse of expanding. Always look for a common factor first.
- Common factor: $6x^2 + 9x = 3x(2x + 3)$
- Difference of two squares: $x^2 - 25 = (x+5)(x-5)$
- Quadratic trinomial: $x^2 + 5x + 6 = (x+2)(x+3)$`,
    formulas: [
      {
        label: "Expanding double brackets (FOIL)",
        latex: "(a+b)(c+d) = ac + ad + bc + bd",
      },
      {
        label: "Difference of two squares",
        latex: "a^2 - b^2 = (a+b)(a-b)",
      },
      {
        label: "Perfect square (sum)",
        latex: "(a+b)^2 = a^2 + 2ab + b^2",
      },
      {
        label: "Perfect square (difference)",
        latex: "(a-b)^2 = a^2 - 2ab + b^2",
      },
    ],
    example: {
      question: "Expand and simplify $(x + 3)(x - 5)$.",
      steps: [
        { label: "Expand using FOIL", math: "(x+3)(x-5) = x \\cdot x + x \\cdot (-5) + 3 \\cdot x + 3 \\cdot (-5)" },
        { label: "Write out all four terms", math: "= x^2 - 5x + 3x - 15" },
        { label: "Collect like terms", math: "= x^2 - 2x - 15" },
      ],
    },
    practice: {
      question: "(a) Expand $(2x + 3)^2$.   (b) Factorise $x^2 - 16$.",
      solution: [
        { step: "Part (a): use perfect square formula", math: "(2x+3)^2 = (2x)^2 + 2(2x)(3) + 3^2" },
        { step: "Simplify", math: "= 4x^2 + 12x + 9" },
        { step: "Part (b): recognise difference of two squares", math: "x^2 - 16 = x^2 - 4^2 = (x+4)(x-4)" },
      ],
    },
  },
  {
    id: "linear-equations",
    icon: "=",
    title: "Solving Linear Equations",
    subtitle: "One/two-step, unknowns on both sides",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `To solve an equation, perform the **same operation on both sides** to isolate the unknown. Work in reverse order — undo operations in reverse BIDMAS (reverse of the order of operations).

**Simple equations:**
$$5x + 3 = 18 \\implies 5x = 15 \\implies x = 3$$

**Unknowns on both sides:** Collect all unknown terms on one side and all number terms on the other.
$$7x - 2 = 3x + 10 \\implies 4x = 12 \\implies x = 3$$

**Equations with brackets:** Expand the brackets first, then solve.
$$3(2x - 1) = 4x + 9 \\implies 6x - 3 = 4x + 9 \\implies 2x = 12 \\implies x = 6$$

**Equations with fractions:** Multiply through by the denominator to clear fractions.
$$\\frac{x + 4}{3} = 5 \\implies x + 4 = 15 \\implies x = 11$$

**Negative solutions are valid!** Always substitute your answer back into the original equation to check.`,
    formulas: [
      {
        label: "Balance method",
        latex: "\\text{Do the same operation to both sides}",
        note: "Keeps the equation balanced",
      },
      {
        label: "General linear form",
        latex: "ax + b = c \\implies x = \\frac{c - b}{a}",
      },
    ],
    example: {
      question: "Solve $3(2x - 1) = 4x + 9$.",
      steps: [
        { label: "Expand the bracket", math: "6x - 3 = 4x + 9" },
        { label: "Subtract 4x from both sides", math: "2x - 3 = 9" },
        { label: "Add 3 to both sides", math: "2x = 12" },
        { label: "Divide both sides by 2", math: "x = 6" },
        { label: "Check: LHS", math: "3(2 \\times 6 - 1) = 3 \\times 11 = 33" },
        { label: "Check: RHS", math: "4 \\times 6 + 9 = 24 + 9 = 33 \\checkmark" },
      ],
    },
    practice: {
      question: "Solve: (a) $5x - 7 = 3x + 11$,   (b) $\\dfrac{x + 4}{3} = 5$.",
      solution: [
        { step: "Part (a): subtract 3x from both sides", math: "2x - 7 = 11" },
        { step: "Add 7 to both sides", math: "2x = 18" },
        { step: "Divide by 2", math: "x = 9" },
        { step: "Part (b): multiply both sides by 3", math: "x + 4 = 15" },
        { step: "Subtract 4", math: "x = 11" },
      ],
    },
  },
  {
    id: "sequences",
    icon: "...",
    title: "Sequences & nth Term",
    subtitle: "Arithmetic sequences and nth term formula",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **sequence** is an ordered list of numbers following a rule.

**Arithmetic sequences** have a **constant difference** $d$ between consecutive terms.
$$5,\\ 8,\\ 11,\\ 14,\\ \\ldots \\quad (d = 3)$$

**nth term formula** for an arithmetic sequence:
$$u_n = a + (n-1)d$$
where $a$ is the **first term** and $d$ is the **common difference**.

This is often simplified to the form $u_n = dn + c$ where $c = a - d$.

**Finding d and a:**
- $d$ = (any term) $-$ (previous term)
- $a$ = the first term ($n = 1$)

**Is a value in the sequence?** Set the nth term equal to the value and solve for $n$. If $n$ is a **positive integer**, the value is in the sequence.

**Geometric sequences** multiply by a constant **ratio** $r$ each time:
$$2,\\ 6,\\ 18,\\ 54,\\ \\ldots \\quad (r = 3)$$
The nth term of a geometric sequence is $u_n = ar^{n-1}$.`,
    formulas: [
      {
        label: "Arithmetic nth term",
        latex: "u_n = a + (n-1)d",
        note: "a = first term, d = common difference",
      },
      {
        label: "Arithmetic nth term (simplified form)",
        latex: "u_n = dn + c, \\quad c = a - d",
      },
      {
        label: "Geometric nth term",
        latex: "u_n = ar^{n-1}",
        note: "a = first term, r = common ratio",
      },
    ],
    example: {
      question: "Find the nth term of the sequence 5, 8, 11, 14, …",
      steps: [
        { label: "Find the common difference", math: "d = 8 - 5 = 3" },
        { label: "First term", math: "a = 5" },
        { label: "Apply the formula", math: "u_n = 5 + (n-1) \\times 3 = 5 + 3n - 3 = 3n + 2" },
        { label: "Check n=1", math: "3(1) + 2 = 5 \\checkmark" },
        { label: "Check n=4", math: "3(4) + 2 = 14 \\checkmark" },
      ],
    },
    practice: {
      question: "The nth term of a sequence is $3n + 2$. Is 101 a term in this sequence?",
      solution: [
        { step: "Set nth term equal to 101", math: "3n + 2 = 101" },
        { step: "Subtract 2 from both sides", math: "3n = 99" },
        { step: "Divide both sides by 3", math: "n = 33" },
        { step: "Since n = 33 is a positive integer, 101 is in the sequence", math: "101 \\text{ is the } 33\\text{rd term}" },
      ],
    },
  },
  {
    id: "straight-lines-gcse",
    icon: "/",
    title: "Straight Line Graphs",
    subtitle: "y=mx+c, gradient and intercept",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "Two lines with gradients 2 and -0.5. Notice they are perpendicular (2 × -0.5 = -1). Adjust the sliders.",
    desmosExpressions: [
      { id: "1", latex: "y=2x+3" },
      { id: "2", latex: "y=-0.5x+1" },
    ],
    theory: `Every straight line can be written in the form $y = mx + c$ where:
- $m$ is the **gradient** (steepness and direction of the line)
- $c$ is the **y-intercept** (the $y$-coordinate where the line crosses the $y$-axis)

**Gradient** measures how steep the line is:
$$m = \\frac{\\text{change in } y}{\\text{change in } x} = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}$$

A positive gradient slopes upward (left to right); a negative gradient slopes downward.

**Parallel lines** have **equal gradients**: $m_1 = m_2$.

**Perpendicular lines** have gradients that multiply to $-1$:
$$m_1 \\times m_2 = -1 \\implies m_2 = -\\frac{1}{m_1}$$
(the gradient is the **negative reciprocal**).

**Finding the equation of a line** given two points or a gradient and a point:
1. Calculate the gradient $m$ (if not given)
2. Substitute one point $(x_1, y_1)$ into $y = mx + c$
3. Solve for $c$
4. Write the full equation`,
    formulas: [
      {
        label: "Equation of a straight line",
        latex: "y = mx + c",
        note: "m = gradient, c = y-intercept",
      },
      {
        label: "Gradient between two points",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      },
      {
        label: "Perpendicular gradients",
        latex: "m_1 \\times m_2 = -1",
        note: "Negative reciprocal",
      },
    ],
    example: {
      question: "Find the equation of the line through $(1, 5)$ and $(3, 9)$.",
      steps: [
        { label: "Calculate the gradient", math: "m = \\frac{9 - 5}{3 - 1} = \\frac{4}{2} = 2" },
        { label: "Substitute into y = mx + c using point (1, 5)", math: "5 = 2(1) + c" },
        { label: "Solve for c", math: "c = 5 - 2 = 3" },
        { label: "Write the equation", math: "y = 2x + 3" },
      ],
    },
    practice: {
      question: "Find the equation of the line perpendicular to $y = 3x - 1$ that passes through $(6, 2)$.",
      solution: [
        { step: "Gradient of given line", math: "m_1 = 3" },
        { step: "Perpendicular gradient (negative reciprocal)", math: "m_2 = -\\frac{1}{3}" },
        { step: "Substitute into y = mx + c using point (6, 2)", math: "2 = -\\frac{1}{3}(6) + c" },
        { step: "Simplify", math: "2 = -2 + c \\implies c = 4" },
        { step: "Write the equation", math: "y = -\\frac{1}{3}x + 4" },
      ],
    },
  },
  {
    id: "inequalities-gcse",
    icon: "<",
    title: "Linear Inequalities",
    subtitle: "Solving and representing on number lines",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Inequalities** show that two expressions are not necessarily equal. The four symbols are:
- $<$ (strictly less than)
- $>$ (strictly greater than)
- $\\leq$ (less than or equal to)
- $\\geq$ (greater than or equal to)

**Solving inequalities:** Use the same methods as solving equations — **EXCEPT** when you multiply or divide both sides by a **negative number**, you must **flip the inequality sign**.

$$-2x > 6 \\implies x < -3 \\quad \\text{(sign flipped!)}$$

**Number line representation:**
- **Open circle** (○): strict inequality ($<$ or $>$) — the endpoint is **not** included
- **Filled/closed circle** (●): non-strict inequality ($\\leq$ or $\\geq$) — the endpoint **is** included

**Integer solutions:** List all whole numbers (integers) that satisfy the inequality.
$$-2 \\leq x < 3 \\implies \\text{integers: } -2,\\, -1,\\, 0,\\, 1,\\, 2$$

**Double (compound) inequalities:** Operate on all three parts simultaneously.
$$-4 \\leq 2x < 6 \\implies -2 \\leq x < 3$$`,
    formulas: [
      {
        label: "Key rule: flip sign",
        latex: "\\text{Flip } < / > / \\leq / \\geq \\text{ when multiplying or dividing by a negative}",
        note: "Most common error in inequality questions",
      },
      {
        label: "Number line: open circle",
        latex: "\\circ \\text{ for strict inequality } < \\text{ or } >",
        note: "Endpoint not included",
      },
      {
        label: "Number line: filled circle",
        latex: "\\bullet \\text{ for } \\leq \\text{ or } \\geq",
        note: "Endpoint included",
      },
    ],
    example: {
      question: "Solve $-3 \\leq 2x + 1 < 7$ and list the integer solutions.",
      steps: [
        { label: "Subtract 1 from all three parts", math: "-3 - 1 \\leq 2x + 1 - 1 < 7 - 1" },
        { label: "Simplify", math: "-4 \\leq 2x < 6" },
        { label: "Divide all parts by 2", math: "-2 \\leq x < 3" },
        { label: "List the integers satisfying the inequality", math: "x \\in \\{-2,\\, -1,\\, 0,\\, 1,\\, 2\\}" },
      ],
    },
    practice: {
      question: "Solve $5x - 3 > 2x + 9$ and represent the solution on a number line.",
      solution: [
        { step: "Subtract 2x from both sides", math: "3x - 3 > 9" },
        { step: "Add 3 to both sides", math: "3x > 12" },
        { step: "Divide both sides by 3", math: "x > 4" },
        { step: "Number line representation", math: "\\text{Open circle at } 4, \\text{ arrow pointing right}" },
      ],
    },
  },
];
