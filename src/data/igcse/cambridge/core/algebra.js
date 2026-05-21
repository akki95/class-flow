export const CHAPTER_META = {
  id: "cambridge-core-algebra",
  title: "Algebra & Graphs",
  subtitle: "Expressions, equations, sequences, straight lines and inequalities",
  icon: "𝑥",
  color: "#8b5cf6",
  tier: "Core",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "expressions-equations",
    icon: "✏️",
    title: "Expressions & Equations",
    subtitle: "Simplifying, expanding, factorising and solving",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Like terms** have the same variable(s) raised to the same power(s). They can be collected (added or subtracted) but unlike terms cannot.

$$3x^2 + 5x^2 = 8x^2 \\quad \text{(like terms)}$$
$$3x^2 + 5x \\quad \text{(cannot be simplified — unlike terms)}$$

**Expanding brackets:** multiply every term inside the brackets by the term outside.
$$a(b + c) = ab + ac$$

**Factorising** is the reverse — find the HCF of all terms and place it outside the bracket:
$$6x^2 + 9x = 3x(2x + 3)$$

**Solving linear equations** — use the **balance method**: whatever operation you do to one side, do the same to the other. Goal: isolate $x$.

Steps when brackets are present:
1. Expand all brackets.
2. Collect like terms on each side.
3. Move variable terms to one side and number terms to the other.
4. Divide both sides to find $x$.

**Unknowns on both sides:** collect the $x$ terms on the side where there are more.

**Substitution:** replace each variable with its given value and evaluate using BODMAS (Brackets, Orders, Division/Multiplication, Addition/Subtraction).`,
    formulas: [
      {
        label: "Expanding",
        latex: "a(b + c) = ab + ac",
      },
      {
        label: "Balance method",
        latex: "\\text{same operation applied to both sides}",
      },
      {
        label: "Equation with brackets on right",
        latex: "\\frac{ax + b}{c} = d \\implies ax + b = cd",
      },
    ],
    example: {
      question: "Solve $3(2x - 1) = 4x + 9$.",
      solution: `**Expand** the left side:
$$6x - 3 = 4x + 9$$

**Collect** $x$ terms on the left (subtract $4x$ from both sides):
$$2x - 3 = 9$$

**Add 3** to both sides:
$$2x = 12$$

**Divide by 2:**
$$x = \\mathbf{6}$$

**Check:** $3(12 - 1) = 33$ and $4(6) + 9 = 33$ ✓`,
    },
    practice: {
      question: "Solve: (a) $5x - 3 = 2x + 12$ \\quad (b) $4(x + 2) = 3(x - 1) + 17$",
      solution: `**(a)** $5x - 3 = 2x + 12$
$$3x = 15 \\implies x = \\mathbf{5}$$

**(b)** Expand both sides:
$$4x + 8 = 3x - 3 + 17$$
$$4x + 8 = 3x + 14$$
$$x = \\mathbf{6}$$

**Check (b):** $4(8) = 32$ and $3(5) + 17 = 32$ ✓`,
    },
  },
  {
    id: "formulae-sequences",
    icon: "🔗",
    title: "Formulae & Sequences",
    subtitle: "Substitution, rearranging and nth term",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Substitution:** replace letters with numbers and evaluate following **BODMAS**. Always substitute into the formula carefully, using brackets around negative values.

$$\text{If } s = ut + \tfrac{1}{2}at^2, \\; u=5, \\; a=10, \\; t=3: \\quad s = 5(3) + \tfrac{1}{2}(10)(9) = 15 + 45 = 60$$

**Rearranging formulae:** treat the formula like an equation. Use inverse operations to make the required variable the subject. Move terms step by step using the balance method.

**Linear sequences** have a **constant difference** $d$ between consecutive terms.

- $a$ = first term, $d$ = common difference
- **$n$th term formula:** $T_n = dn + (a - d)$
  - equivalently, $T_n = a + (n-1)d$

**To find the $n$th term:**
1. Find $d$ (subtract any term from the next).
2. Evaluate $a - d$ (the constant term).
3. Write $T_n = dn + (a - d)$.

**To check if a value $v$ is in the sequence:**
1. Set $T_n = v$ and solve for $n$.
2. If $n$ is a **positive integer**, the value is in the sequence.`,
    formulas: [
      {
        label: "nth term",
        latex: "T_n = dn + (a - d)",
      },
      {
        label: "nth term (alternative)",
        latex: "T_n = a + (n-1)d",
      },
      {
        label: "Check membership",
        latex: "\\text{Set } T_n = v, \\text{ solve for } n; \\text{ valid if } n \\in \\mathbb{Z}^+",
      },
    ],
    example: {
      question: "For the sequence 4, 7, 10, 13, … find the $n$th term, the 10th term, and determine whether 100 is in the sequence.",
      solution: `**Common difference:** $d = 7 - 4 = 3$. First term $a = 4$.

$$T_n = 3n + (4 - 3) = \\mathbf{3n + 1}$$

**10th term:** $T_{10} = 3(10) + 1 = \\mathbf{31}$

**Is 100 in the sequence?**
$$3n + 1 = 100 \\implies 3n = 99 \\implies n = 33$$
Since $n = 33$ is a positive integer, **yes** — 100 is the **33rd term**.`,
    },
    practice: {
      question: "The $n$th term of a sequence is $5n - 2$. (a) Find the first 4 terms. (b) Find the 20th term. (c) Is 98 a term in the sequence?",
      solution: `**(a)** Substitute $n = 1, 2, 3, 4$:
$$T_1 = 3, \\ T_2 = 8, \\ T_3 = 13, \\ T_4 = 18$$

**(b)** $T_{20} = 5(20) - 2 = 100 - 2 = \\mathbf{98}$

**(c)** $5n - 2 = 98 \\implies 5n = 100 \\implies n = 20$
Since $n = 20$ is a positive integer, **yes — 98 is the 20th term**.`,
    },
  },
  {
    id: "straight-lines-core",
    icon: "📈",
    title: "Coordinates & Straight Line Graphs",
    subtitle: "y=mx+c, gradient, plotting and interpreting graphs",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "Two straight lines. Find their intersection point and check where they cross.",
    desmosExpressions: [
      { id: "1", latex: "y=2x-1" },
      { id: "2", latex: "y=-x+4" },
    ],
    theory: `**Coordinates** $(x, y)$ locate a point on a Cartesian grid. The $x$-axis is horizontal; the $y$-axis is vertical.

**Gradient** measures the steepness and direction of a line:
$$m = \\frac{\\text{rise}}{\\text{run}} = \\frac{y_2 - y_1}{x_2 - x_1}$$

- **Positive gradient:** line slopes up from left to right.
- **Negative gradient:** line slopes down from left to right.
- **Steeper line:** larger $|m|$.
- **Horizontal line:** $m = 0$.
- **Vertical line:** gradient is undefined.

**Equation of a straight line:** $y = mx + c$
- $m$ = gradient
- $c$ = $y$-intercept (where the line crosses the $y$-axis)

**To draw a line from $y = mx + c$:**
1. Plot the $y$-intercept $(0, c)$.
2. Use the gradient to find a second point: go 1 unit right and $m$ units up.
3. Draw the line through both points.

**Parallel lines** have the **same gradient**.

**Midpoint** of two points $(x_1, y_1)$ and $(x_2, y_2)$:
$$M = \\left(\\frac{x_1 + x_2}{2},\\; \\frac{y_1 + y_2}{2}\\right)$$

**Distance** between two points:
$$d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$`,
    formulas: [
      {
        label: "Equation of line",
        latex: "y = mx + c",
      },
      {
        label: "Gradient",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      },
      {
        label: "Midpoint",
        latex: "M = \\left(\\frac{x_1 + x_2}{2},\\; \\frac{y_1 + y_2}{2}\\right)",
      },
      {
        label: "Distance",
        latex: "d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}",
      },
    ],
    example: {
      question: "Find the equation of the line passing through $(2, 5)$ and $(4, 9)$.",
      solution: `**Gradient:**
$$m = \\frac{9 - 5}{4 - 2} = \\frac{4}{2} = 2$$

**$y$-intercept** — substitute $(2, 5)$ into $y = 2x + c$:
$$5 = 2(2) + c \\implies c = 1$$

$$\\boxed{y = 2x + 1}$$

**Check with $(4, 9)$:** $2(4) + 1 = 9$ ✓`,
    },
    practice: {
      question: "A line has equation $3x + 2y = 12$. Find its gradient and $y$-intercept.",
      solution: `**Rearrange** into $y = mx + c$ form:
$$2y = -3x + 12$$
$$y = -\\frac{3}{2}x + 6$$

**Gradient** $= \\mathbf{-\\dfrac{3}{2}}$, \\quad **$y$-intercept** $= \\mathbf{6}$`,
    },
  },
  {
    id: "inequalities-core",
    icon: "⚡",
    title: "Inequalities & Graphs",
    subtitle: "Solving linear inequalities and travel graphs",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Inequalities** are solved using the same steps as equations, with one important rule:

> **When multiplying or dividing both sides by a negative number, flip (reverse) the inequality sign.**

$$-2x > 4 \\implies x < -2 \\quad \\text{(sign flipped)}$$

**Representing on a number line:**
- **Open circle** $\\circ$ for strict inequalities ($<$ or $>$) — the endpoint is **not** included.
- **Closed (filled) circle** $\\bullet$ for $\\le$ or $\\ge$ — the endpoint **is** included.

**Integer solutions:** list all integers that satisfy the inequality within the given range.

**Combined inequalities** such as $a < x \\le b$ are solved as one or split into two separate inequalities.

---

**Travel (distance–time) graphs:**
- The **gradient** at any point equals the **speed** at that moment.
- A horizontal line means the object is **stationary**.
- A steeper section means a higher speed.

**Speed–time graphs:**
- The **gradient** equals the **acceleration** (or deceleration if negative).
- The **area under the graph** equals the **distance** travelled.
- A horizontal line means constant speed (zero acceleration).

$$\\text{speed} = \\frac{\\text{distance}}{\\text{time}}, \\qquad \\text{acceleration} = \\frac{\\text{change in speed}}{\\text{time}}$$

Area of a **trapezium** on a speed–time graph:
$$\\text{distance} = \\tfrac{1}{2}(u + v) \\times t$$`,
    formulas: [
      {
        label: "Flip rule",
        latex: "\\text{multiply/divide by negative} \\Rightarrow \\text{flip the inequality sign}",
      },
      {
        label: "Speed",
        latex: "\\text{speed} = \\frac{\\text{distance}}{\\text{time}}",
      },
      {
        label: "Acceleration",
        latex: "\\text{acceleration} = \\frac{\\text{change in speed}}{\\text{time}}",
      },
      {
        label: "Distance (trapezium rule)",
        latex: "\\text{distance} = \\tfrac{1}{2}(u + v)t",
      },
    ],
    example: {
      question: "Solve $3 - 2x > 7$ and list the possible integer values.",
      solution: `**Subtract 3** from both sides:
$$-2x > 4$$

**Divide by $-2$** (flip the sign!):
$$x < -2$$

**Integer solutions:** $\\ldots, -5, -4, \\mathbf{-3}$ (all integers less than $-2$)`,
    },
    practice: {
      question: "A car travels at $20\\,\\text{m/s}$ for 5 seconds, then decelerates uniformly to rest in 8 seconds. (a) Find the deceleration. (b) Find the total distance travelled.",
      solution: `**(a) Deceleration:**
$$a = \\frac{\\text{change in speed}}{\\text{time}} = \\frac{20 - 0}{8} = \\mathbf{2.5\\,\\text{m/s}^2}$$

**(b) Total distance:**

Distance at constant speed: $20 \\times 5 = 100\\,\\text{m}$

Distance during deceleration (triangle on speed–time graph):
$$d = \\tfrac{1}{2} \\times 20 \\times 8 = 80\\,\\text{m}$$

$$\\text{Total} = 100 + 80 = \\mathbf{180\\,\\text{m}}$$`,
    },
  },
];
