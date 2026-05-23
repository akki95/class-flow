export const CHAPTER_META = {
  id: "icse-10-quadratics",
  title: "Quadratic Equations",
  subtitle: "Factorisation, quadratic formula, discriminant and nature of roots",
  icon: "📐",
  color: "#6366f1",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "solving-quadratics",
    icon: "📐",
    title: "Solving Quadratic Equations",
    subtitle: "Factorisation and the quadratic formula",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **quadratic equation** has the general form:
$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

**Method 1 — Factorisation:**
1. Split the middle term: find two numbers whose product is $ac$ and sum is $b$.
2. Group and factorise.
3. Set each factor equal to zero.

**Method 2 — Quadratic Formula:**
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

This always works when factorisation is difficult.

**Method 3 — Completing the square:**
1. Divide by $a$ to make the coefficient of $x^2$ equal to 1.
2. Move the constant to the RHS.
3. Add $\\left(\\frac{b}{2a}\\right)^2$ to both sides.
4. Write the LHS as a perfect square and solve.

**Verification:** Substitute roots back into the original equation, or use:
$$\\text{Sum of roots} = -\\frac{b}{a}, \\quad \\text{Product of roots} = \\frac{c}{a}$$`,
    formulas: [
      {
        label: "General form",
        latex: "ax^2 + bx + c = 0",
      },
      {
        label: "Quadratic formula",
        latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      },
      {
        label: "Sum of roots",
        latex: "\\alpha + \\beta = -\\frac{b}{a}",
      },
      {
        label: "Product of roots",
        latex: "\\alpha \\beta = \\frac{c}{a}",
      },
    ],
    example: {
      question: "Solve: $2x^2 - 7x + 3 = 0$",
      solution: `**By factorisation:**

$ac = 2 \\times 3 = 6$. Find two numbers with product 6 and sum $-7$: $-6$ and $-1$.

$$2x^2 - 6x - x + 3 = 0$$
$$2x(x - 3) - 1(x - 3) = 0$$
$$(2x - 1)(x - 3) = 0$$

$$x = \\frac{1}{2} \\quad \\text{or} \\quad x = 3$$

**Check:** Sum $= \\frac{1}{2} + 3 = \\frac{7}{2} = \\frac{-(-7)}{2}$ ✓, Product $= \\frac{1}{2} \\times 3 = \\frac{3}{2} = \\frac{3}{2}$ ✓`,
    },
    practice: {
      question: "Solve using the quadratic formula: $3x^2 + 5x - 2 = 0$",
      solution: `$a = 3, b = 5, c = -2$

$$x = \\frac{-5 \\pm \\sqrt{25 + 24}}{6} = \\frac{-5 \\pm \\sqrt{49}}{6} = \\frac{-5 \\pm 7}{6}$$

$$x = \\frac{-5 + 7}{6} = \\frac{2}{6} = \\frac{1}{3} \\quad \\text{or} \\quad x = \\frac{-5 - 7}{6} = \\frac{-12}{6} = -2$$

$$\\mathbf{x = \\frac{1}{3} \\text{ or } x = -2}$$`,
    },
  },
  {
    id: "discriminant-nature",
    icon: "🔍",
    title: "Discriminant & Nature of Roots",
    subtitle: "Using the discriminant to determine the nature of roots",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **discriminant** of $ax^2 + bx + c = 0$ is:
$$D = b^2 - 4ac$$

**Nature of roots based on $D$:**

| Discriminant | Nature of Roots |
|---|---|
| $D > 0$ | Two **distinct real** roots |
| $D = 0$ | Two **equal real** roots (repeated root) |
| $D < 0$ | **No real** roots (complex roots) |

**Special case:** If $D > 0$ and $D$ is a perfect square, the roots are **rational**.

**Equal root:** When $D = 0$, the repeated root is $x = \\frac{-b}{2a}$.

**Forming a quadratic equation** given roots $\\alpha$ and $\\beta$:
$$x^2 - (\\alpha + \\beta)x + \\alpha\\beta = 0$$

**Condition for common root:** If $a_1x^2 + b_1x + c_1 = 0$ and $a_2x^2 + b_2x + c_2 = 0$ have a common root, then:
$$(a_1c_2 - a_2c_1)^2 = (a_1b_2 - a_2b_1)(b_1c_2 - b_2c_1)$$`,
    formulas: [
      {
        label: "Discriminant",
        latex: "D = b^2 - 4ac",
      },
      {
        label: "Equal root",
        latex: "x = \\frac{-b}{2a} \\quad (\\text{when } D = 0)",
      },
      {
        label: "Form equation",
        latex: "x^2 - (\\text{sum})x + (\\text{product}) = 0",
      },
    ],
    example: {
      question: "Find the value of $k$ for which $kx^2 + 6x + 1 = 0$ has equal roots.",
      solution: `For equal roots: $D = 0$

$$b^2 - 4ac = 0$$
$$36 - 4(k)(1) = 0$$
$$36 = 4k$$
$$k = \\mathbf{9}$$

The equal root $= \\frac{-6}{2(9)} = \\frac{-6}{18} = -\\frac{1}{3}$.`,
    },
    practice: {
      question: "Form a quadratic equation whose roots are $3 + \\sqrt{2}$ and $3 - \\sqrt{2}$.",
      solution: `Sum of roots $= (3 + \\sqrt{2}) + (3 - \\sqrt{2}) = 6$

Product of roots $= (3 + \\sqrt{2})(3 - \\sqrt{2}) = 9 - 2 = 7$

Equation: $x^2 - (\\text{sum})x + (\\text{product}) = 0$

$$\\mathbf{x^2 - 6x + 7 = 0}$$

Check $D = 36 - 28 = 8 > 0$ ✓ (two distinct irrational roots)`,
    },
  },
  {
    id: "word-problems-quadratic",
    icon: "📝",
    title: "Word Problems on Quadratics",
    subtitle: "Age, number, speed-distance and geometry problems leading to quadratics",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Many real-world problems reduce to quadratic equations. The key steps:

1. **Read** the problem and identify the unknown — let it be $x$.
2. **Translate** the given conditions into an equation.
3. **Solve** the quadratic equation.
4. **Reject** any root that doesn't make sense in context (e.g., negative length, negative age).
5. **Answer** the original question.

**Common types:**

**Number problems:** "Find two consecutive numbers whose product is 72" → $x(x+1) = 72$.

**Age problems:** "5 years ago, a father's age was 4 times his son's" → set up ages in terms of $x$.

**Speed-distance-time:** $\\text{speed} = \\frac{\\text{distance}}{\\text{time}}$. If speed increases by $k$, time changes — set up and cross-multiply.

**Area/geometry:** Rectangle with perimeter 24 and area 32 → $l + b = 12$ and $lb = 32$, leading to $l^2 - 12l + 32 = 0$.`,
    formulas: [
      {
        label: "Consecutive numbers",
        latex: "x(x+1) = n \\implies x^2 + x - n = 0",
      },
      {
        label: "Speed-time",
        latex: "\\text{time} = \\frac{\\text{distance}}{\\text{speed}}",
      },
    ],
    example: {
      question: "A train covers 300 km at a uniform speed. If the speed had been 10 km/h more, it would have taken 1 hour less. Find the speed of the train.",
      solution: `Let the speed $= x$ km/h.

Time at speed $x$: $\\frac{300}{x}$ hours

Time at speed $x + 10$: $\\frac{300}{x + 10}$ hours

$$\\frac{300}{x} - \\frac{300}{x + 10} = 1$$

$$300\\left(\\frac{x + 10 - x}{x(x + 10)}\\right) = 1$$

$$\\frac{3000}{x^2 + 10x} = 1$$

$$x^2 + 10x - 3000 = 0$$

$$(x + 60)(x - 50) = 0$$

$x = 50$ or $x = -60$ (rejected)

Speed $= \\mathbf{50 \\text{ km/h}}$`,
    },
    practice: {
      question: "The product of two consecutive positive odd numbers is 143. Find the numbers.",
      solution: `Let the numbers be $x$ and $x + 2$.

$$x(x + 2) = 143$$
$$x^2 + 2x - 143 = 0$$
$$(x + 13)(x - 11) = 0$$

$x = 11$ or $x = -13$ (rejected, since positive)

The numbers are $\\mathbf{11}$ and $\\mathbf{13}$.

Check: $11 \\times 13 = 143$ ✓`,
    },
  },
];
