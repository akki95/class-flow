export const CHAPTER_META = {
  id: "cambridge-ext-algebra",
  title: "Algebra (Extended)",
  subtitle: "Quadratics, functions, variation and harder graphs",
  icon: "𝑥",
  color: "#8b5cf6",
  tier: "Extended",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "quadratics-ext",
    icon: "∪",
    title: "Quadratic Equations",
    subtitle: "Factorising, formula and completing the square",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "Adjust a, b, c to see how the discriminant changes the roots of the quadratic.",
    desmosExpressions: [
      { id: "1", latex: "a=1" },
      { id: "2", latex: "b=-4" },
      { id: "3", latex: "c=3" },
      { id: "4", latex: "ax^2+bx+c" },
    ],
    theory: `A quadratic equation has the form $ax^2 + bx + c = 0$ where $a \\ne 0$. There are three standard methods for solving quadratics.

**Method 1 — Factorising**

Rewrite the quadratic as a product of two brackets. For $a = 1$: find two numbers that multiply to $c$ and add to $b$.

For $a \\ne 1$: find two numbers that multiply to $ac$ and add to $b$, then split the middle term and factor by grouping.

$$2x^2 + 5x + 3 = 2x^2 + 2x + 3x + 3 = 2x(x+1) + 3(x+1) = (2x+3)(x+1)$$

**Method 2 — Quadratic formula**

Works for any quadratic. Given $ax^2 + bx + c = 0$:

$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

**Method 3 — Completing the square**

Rewrite $x^2 + bx$ as a perfect square minus a constant:

$$x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 - \\left(\\frac{b}{2}\\right)^2 + c$$

This gives the **vertex form** $a(x - h)^2 + k$, which directly shows the vertex $(h, k)$ and whether the curve has a minimum (opening upward) or maximum (opening downward).

**The discriminant**

The expression $\\Delta = b^2 - 4ac$ determines the nature of the roots:

| $\\Delta$ | Nature of roots |
|---|---|
| $\\Delta > 0$ | Two distinct real roots |
| $\\Delta = 0$ | One repeated real root |
| $\\Delta < 0$ | No real roots |`,
    formulas: [
      {
        label: "Quadratic formula",
        latex: "x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
      },
      {
        label: "Completing the square",
        latex:
          "x^2+bx+c=\\left(x+\\frac{b}{2}\\right)^2-\\left(\\frac{b}{2}\\right)^2+c",
      },
      {
        label: "Discriminant",
        latex: "\\Delta=b^2-4ac",
      },
    ],
    example: {
      question: "Solve $x^2 - 5x + 6 = 0$ by factorising.",
      solution: `Find two numbers that multiply to $6$ and add to $-5$: these are $-2$ and $-3$.

$$x^2 - 5x + 6 = (x - 2)(x - 3) = 0$$

Setting each factor to zero:

$$x - 2 = 0 \\Rightarrow x = 2 \\qquad x - 3 = 0 \\Rightarrow x = 3$$`,
    },
    practice: [
      {
        question:
          "(a) Solve $2x^2 + 3x - 5 = 0$ using the quadratic formula. (b) Write $x^2 - 6x + 11$ in completed square form.",
        solution: `**(a) Using the quadratic formula** with $a = 2$, $b = 3$, $c = -5$:

$$x = \\frac{-3 \\pm \\sqrt{3^2 - 4(2)(-5)}}{2(2)} = \\frac{-3 \\pm \\sqrt{9 + 40}}{4} = \\frac{-3 \\pm \\sqrt{49}}{4} = \\frac{-3 \\pm 7}{4}$$

$$x = \\frac{-3 + 7}{4} = 1 \\qquad \\text{or} \\qquad x = \\frac{-3 - 7}{4} = -\\frac{5}{2}$$

**(b) Completing the square** for $x^2 - 6x + 11$:

$$\\left(x - 3\\right)^2 - 9 + 11 = (x - 3)^2 + 2$$`,
      },
    ],
  },
  {
    id: "simultaneous-ext",
    icon: "⊗",
    title: "Simultaneous Equations (Extended)",
    subtitle: "Linear-quadratic systems and algebraic solution",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Linear-linear systems** (from Core) can be solved by elimination or substitution. Extended adds **linear-quadratic** systems.

**Linear-quadratic systems**

When one equation is linear and one is quadratic (or a circle), always use **substitution**:

1. Rearrange the linear equation to make one variable the subject: $y = mx + c$ (or $x = \\ldots$).
2. Substitute this expression into the quadratic equation.
3. Expand, collect like terms, and solve the resulting quadratic.
4. Substitute each value back to find the other variable.

This produces up to **two solution pairs**, since the line can intersect the curve at 0, 1, or 2 points.

**Geometric interpretation**

- Two solutions: the line intersects the curve at two points.
- One solution: the line is tangent to the curve.
- No real solutions: the line does not intersect the curve. ($\\Delta < 0$ for the resulting quadratic.)

**Verification**

Always check solutions by substituting back into **both** original equations. This catches arithmetic errors.`,
    formulas: [
      {
        label: "Substitution method",
        latex:
          "\\text{Rearrange linear: } y=mx+c, \\text{ substitute into } ax^2+b(mx+c)+d=0",
      },
    ],
    example: {
      question:
        "Solve $y = 2x + 1$ and $y = x^2 - 1$ simultaneously, giving answers in surd form.",
      solution: `Substitute $y = 2x + 1$ into $y = x^2 - 1$:

$$2x + 1 = x^2 - 1$$

$$x^2 - 2x - 2 = 0$$

Use the quadratic formula with $a=1$, $b=-2$, $c=-2$:

$$x = \\frac{2 \\pm \\sqrt{4 + 8}}{2} = \\frac{2 \\pm \\sqrt{12}}{2} = \\frac{2 \\pm 2\\sqrt{3}}{2} = 1 \\pm \\sqrt{3}$$

Find corresponding $y$ values using $y = 2x + 1$:

$$y = 2(1 + \\sqrt{3}) + 1 = 3 + 2\\sqrt{3} \\qquad y = 2(1 - \\sqrt{3}) + 1 = 3 - 2\\sqrt{3}$$

Solutions: $(1 + \\sqrt{3},\\ 3 + 2\\sqrt{3})$ and $(1 - \\sqrt{3},\\ 3 - 2\\sqrt{3})$.`,
    },
    practice: [
      {
        question: "Solve $x^2 + y^2 = 25$ and $y = x + 1$ simultaneously.",
        solution: `Substitute $y = x + 1$ into $x^2 + y^2 = 25$:

$$x^2 + (x+1)^2 = 25$$

$$x^2 + x^2 + 2x + 1 = 25$$

$$2x^2 + 2x - 24 = 0$$

$$x^2 + x - 12 = 0$$

Factorise: $(x + 4)(x - 3) = 0$

So $x = -4$ or $x = 3$.

When $x = -4$: $y = -4 + 1 = -3$. &nbsp; When $x = 3$: $y = 3 + 1 = 4$.

Solutions: $(-4,\\ -3)$ and $(3,\\ 4)$.`,
      },
    ],
  },
  {
    id: "functions-ext",
    icon: "f(x)",
    title: "Functions",
    subtitle: "f(x) notation, composite and inverse functions",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **function** $f(x)$ is a rule that maps each input $x$ to exactly one output. The notation $f(3)$ means evaluate the function at $x = 3$.

**Evaluating functions**

Substitute the given value directly. If $f(x) = x^2 + 1$, then $f(3) = 9 + 1 = 10$.

**Domain and range**

The **domain** is the set of valid inputs. The **range** is the set of possible outputs. At IGCSE, domain restrictions are usually given (e.g. $x > 0$, $x \\ne 2$).

**Composite functions**

The composite function $fg(x)$ means apply $g$ first, then apply $f$ to the result:

$$fg(x) = f(g(x))$$

Order matters: $fg(x) \\ne gf(x)$ in general.

To evaluate $fg(2)$: first compute $g(2)$, then substitute that answer into $f$.

**Inverse functions**

The inverse $f^{-1}(x)$ reverses the effect of $f$: if $f(a) = b$ then $f^{-1}(b) = a$.

To find $f^{-1}(x)$ algebraically:

1. Write $y = f(x)$.
2. Swap $x$ and $y$ (i.e. replace every $x$ with $y$ and vice versa).
3. Rearrange to make $y$ the subject.
4. Replace $y$ with $f^{-1}(x)$.

**Key identity**

$$f(f^{-1}(x)) = x \\qquad \\text{and} \\qquad f^{-1}(f(x)) = x$$

Use this to verify your inverse is correct.`,
    formulas: [
      {
        label: "Composite function",
        latex: "fg(x)=f(g(x))",
      },
      {
        label: "Inverse identity",
        latex: "f(f^{-1}(x))=x",
      },
    ],
    example: {
      question: "Given $f(x) = 2x + 3$, find $f^{-1}(x)$ and verify it.",
      solution: `**Step 1:** Write $y = 2x + 3$.

**Step 2:** Swap $x$ and $y$: $x = 2y + 3$.

**Step 3:** Rearrange for $y$:

$$2y = x - 3 \\Rightarrow y = \\frac{x-3}{2}$$

So $f^{-1}(x) = \\dfrac{x-3}{2}$.

**Verification:**

$$f(f^{-1}(x)) = f\\!\\left(\\frac{x-3}{2}\\right) = 2 \\cdot \\frac{x-3}{2} + 3 = (x-3) + 3 = x \\checkmark$$`,
    },
    practice: [
      {
        question:
          "Given $f(x) = 3x - 1$ and $g(x) = x^2 + 2$, find (a) $fg(2)$, (b) $gf(x)$, and (c) $f^{-1}(x)$.",
        solution: `**(a) $fg(2)$**

First apply $g$: $g(2) = 4 + 2 = 6$.

Then apply $f$: $f(6) = 3(6) - 1 = 17$.

So $fg(2) = 17$.

**(b) $gf(x)$**

First apply $f$: $f(x) = 3x - 1$.

Then apply $g$: $gf(x) = (3x-1)^2 + 2 = 9x^2 - 6x + 1 + 2 = 9x^2 - 6x + 3$.

**(c) $f^{-1}(x)$**

Write $y = 3x - 1$, swap: $x = 3y - 1$, rearrange: $y = \\dfrac{x+1}{3}$.

So $f^{-1}(x) = \\dfrac{x+1}{3}$.`,
      },
    ],
  },
  {
    id: "variation",
    icon: "∝",
    title: "Direct & Inverse Variation",
    subtitle: "y∝x, y∝1/x and other variation types",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Variation** (also called **proportion**) describes a multiplicative relationship between two quantities.

**Direct proportion**

$y$ is directly proportional to $x$, written $y \\propto x$, means:

$$y = kx$$

for some constant $k > 0$. If $x$ doubles, $y$ doubles. The graph is a straight line through the origin.

**Direct proportion to a power or root**

| Statement | Equation |
|---|---|
| $y \\propto x^2$ | $y = kx^2$ |
| $y \\propto \\sqrt{x}$ | $y = k\\sqrt{x}$ |
| $y \\propto x^3$ | $y = kx^3$ |

**Inverse proportion**

$y$ is inversely proportional to $x$, written $y \\propto \\dfrac{1}{x}$, means:

$$y = \\frac{k}{x}$$

If $x$ doubles, $y$ halves. The graph is a hyperbola.

**Inverse proportion to a power**

$y \\propto \\dfrac{1}{x^2}$ gives $y = \\dfrac{k}{x^2}$, and so on.

**Standard method for all variation problems**

1. Write the variation statement as an equation with constant $k$.
2. Substitute the given pair of values to calculate $k$.
3. Rewrite the equation with the value of $k$.
4. Use the equation to find the required unknown.`,
    formulas: [
      {
        label: "Direct proportion",
        latex: "y=kx",
      },
      {
        label: "Direct square proportion",
        latex: "y=kx^2",
      },
      {
        label: "Inverse proportion",
        latex: "y=\\frac{k}{x}",
      },
      {
        label: "Inverse square proportion",
        latex: "y=\\frac{k}{x^2}",
      },
    ],
    example: {
      question:
        "$y$ is directly proportional to $x^2$. When $x = 3$, $y = 36$. Find $y$ when $x = 5$.",
      solution: `**Step 1:** Write the equation: $y = kx^2$.

**Step 2:** Substitute $x = 3$, $y = 36$:

$$36 = k \\times 9 \\Rightarrow k = 4$$

**Step 3:** Equation becomes $y = 4x^2$.

**Step 4:** Find $y$ when $x = 5$:

$$y = 4 \\times 25 = 100$$`,
    },
    practice: [
      {
        question:
          "$y$ is inversely proportional to $\\sqrt{x}$. When $x = 4$, $y = 6$. Find $x$ when $y = 4$.",
        solution: `**Step 1:** Write the equation: $y = \\dfrac{k}{\\sqrt{x}}$.

**Step 2:** Substitute $x = 4$, $y = 6$:

$$6 = \\frac{k}{\\sqrt{4}} = \\frac{k}{2} \\Rightarrow k = 12$$

**Step 3:** Equation becomes $y = \\dfrac{12}{\\sqrt{x}}$.

**Step 4:** Find $x$ when $y = 4$:

$$4 = \\frac{12}{\\sqrt{x}} \\Rightarrow \\sqrt{x} = 3 \\Rightarrow x = 9$$`,
      },
    ],
  },
];
