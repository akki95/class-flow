export const CHAPTER_META = {
  id: "sat-algebra",
  title: "Algebra",
  subtitle: "Linear equations, inequalities and graphs",
  icon: "📐",
  color: "#6366f1",
  exam: "SAT Math",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "sat-linear-eq",
    icon: "⚖️",
    title: "Linear Equations & Inequalities",
    subtitle: "Solving equations, inequalities and word problems",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **linear equation** has the form $ax + b = c$. To solve, isolate $x$ by performing the same operation on both sides:

$$ax + b = c \\implies x = \\frac{c - b}{a}$$

**Steps to solve a linear equation:**
1. Distribute and simplify both sides.
2. Move variable terms to one side, constants to the other.
3. Divide by the coefficient of $x$.

**Inequalities** follow the same steps with one crucial rule: **flip the inequality sign when you multiply or divide by a negative number**.

$$-2x > 6 \\implies x < -3$$

**SAT Word Problem Translations:**
| Words | Symbol |
|---|---|
| "more than", "increased by" | $+$ |
| "less than", "decreased by" | $-$ |
| "of", "times", "product of" | $\\times$ |
| "is", "equals", "was" | $=$ |
| "at least" | $\\geq$ |
| "at most" | $\\leq$ |

**Strategy for SAT word problems:**
1. Assign a variable to the unknown.
2. Translate each phrase into algebra.
3. Write the equation and solve.
4. Check your answer in the original context.

For inequalities on the SAT, you may be asked which value satisfies the inequality, to find the range of possible values, or to interpret a number line or region on a graph.`,

    formulas: [
      {
        label: "Linear equation",
        latex: "ax + b = c \\implies x = \\frac{c - b}{a}",
      },
      {
        label: "Inequality — flip sign when dividing by negative",
        latex: "\\text{if } -ax > b \\implies x < -\\frac{b}{a}",
      },
      {
        label: "Two-step word problem setup",
        latex: "\\text{(rate)} \\times \\text{(quantity)} + \\text{(fixed)} = \\text{total}",
      },
    ],

    example: {
      problem:
        "A phone plan charges a $25 monthly fee plus $0.10 per text message. Maya's bill was $43. How many text messages did she send?",
      solution: `**Define the variable:** Let $t$ = number of texts sent.

**Set up the equation:**
$$25 + 0.10t = 43$$

**Solve:**
$$0.10t = 43 - 25 = 18$$
$$t = \\frac{18}{0.10} = 180$$

**Answer:** Maya sent **180 text messages**.

*Check:* $25 + 0.10(180) = 25 + 18 = 43$ ✓`,
    },

    practice: [
      {
        question:
          "A store sells notebooks for $3 each and pens for $1.50 each. Jamal buys a total of 12 items and spends exactly $27. How many notebooks did he buy?",
        answer: "6 notebooks",
        solution: `**Define variables:** Let $n$ = number of notebooks, $p$ = number of pens.

**Set up the system:**
$$n + p = 12 \\quad \\text{(total items)}$$
$$3n + 1.5p = 27 \\quad \\text{(total cost)}$$

**Solve by substitution:** From the first equation, $p = 12 - n$.

Substitute into the second:
$$3n + 1.5(12 - n) = 27$$
$$3n + 18 - 1.5n = 27$$
$$1.5n = 9$$
$$n = 6$$

**Answer:** Jamal bought **6 notebooks**.

*Check:* $6 + 6 = 12$ items ✓ and $3(6) + 1.5(6) = 18 + 9 = 27$ ✓`,
      },
      {
        question:
          "The inequality $3x - 7 > 2$ is satisfied by which of the following values of $x$? (A) 0  (B) 1  (C) 2  (D) 4",
        answer: "(D) 4",
        solution: `**Solve the inequality:**
$$3x - 7 > 2$$
$$3x > 9$$
$$x > 3$$

Only $x = 4$ satisfies $x > 3$.

**Answer: (D) 4**`,
      },
    ],
  },

  {
    id: "sat-systems",
    icon: "🔀",
    title: "Systems of Linear Equations",
    subtitle: "Two equations, two unknowns — substitution and elimination",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "Two intersecting lines — the solution is the intersection point. Try changing the equations to see how the solution moves.",
    desmosExpressions: [
      { id: "1", latex: "2x+y=8" },
      { id: "2", latex: "x-y=1" },
    ],

    theory: `A **system of two linear equations** can be solved by two main methods:

**Method 1: Substitution**
1. Rearrange one equation to isolate one variable (e.g., $x = ...$).
2. Substitute that expression into the other equation.
3. Solve for the remaining variable, then back-substitute.

**Method 2: Elimination**
1. Multiply one or both equations so that a variable has matching (or opposite) coefficients.
2. Add or subtract the equations to eliminate that variable.
3. Solve for the remaining variable, then substitute back.

**Special Cases:**
| Situation | Graphical Meaning | Algebra Result |
|---|---|---|
| One solution | Lines intersect at one point | Unique $(x, y)$ |
| No solution | Lines are parallel (same slope, different intercept) | $0 = \\text{nonzero}$ (contradiction) |
| Infinite solutions | Lines are identical | $0 = 0$ (always true) |

**No solution condition:** The ratios of $x$-coefficients and $y$-coefficients are equal, but the ratio of constants is different:
$$\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}$$

**SAT tip:** Systems often model real-world scenarios (tickets, mixtures, speeds). Always define what each variable represents before writing equations.`,

    formulas: [
      {
        label: "Substitution — isolate one variable",
        latex: "\\text{From } ax + by = c,\\ \\text{write } x = \\frac{c - by}{a}, \\text{ then substitute}",
      },
      {
        label: "Elimination — match coefficients",
        latex: "\\text{Multiply equations so coefficients match, then add/subtract to eliminate one variable}",
      },
      {
        label: "No solution condition",
        latex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\neq \\frac{c_1}{c_2}",
      },
      {
        label: "Infinite solutions condition",
        latex: "\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}",
      },
    ],

    example: {
      problem: "Solve the system: $2x + y = 8$ and $x - y = 1$.",
      solution: `**Method: Elimination**

Add the two equations directly (since the $y$ terms are $+y$ and $-y$):
$$(2x + y) + (x - y) = 8 + 1$$
$$3x = 9$$
$$x = 3$$

**Back-substitute** into $x - y = 1$:
$$3 - y = 1 \\implies y = 2$$

**Solution:** $(x, y) = (3, 2)$

*Check in both equations:*
- $2(3) + 2 = 8$ ✓
- $3 - 2 = 1$ ✓`,
    },

    practice: [
      {
        question:
          "A museum charges $12 for adults and $5 for children. A group of 10 people paid a total of $78. How many adults were in the group?",
        answer: "4 adults",
        solution: `**Define variables:** Let $a$ = adults, $c$ = children.

**Set up the system:**
$$a + c = 10$$
$$12a + 5c = 78$$

**Solve by substitution:** $c = 10 - a$

$$12a + 5(10 - a) = 78$$
$$12a + 50 - 5a = 78$$
$$7a = 28$$
$$a = 4$$

**Answer:** There were **4 adults** in the group.

*Check:* $4 + 6 = 10$ ✓ and $12(4) + 5(6) = 48 + 30 = 78$ ✓`,
      },
      {
        question:
          "The system of equations $3x + ky = 6$ and $6x + 4y = 10$ has no solution. What is the value of $k$?",
        answer: "$k = 2$",
        solution: `For no solution, the coefficients must be proportional but the constants must not:

$$\\frac{3}{6} = \\frac{k}{4} \\neq \\frac{6}{10}$$

From $\\frac{3}{6} = \\frac{k}{4}$:
$$\\frac{1}{2} = \\frac{k}{4} \\implies k = 2$$

**Verify** the constants are not proportional: $\\frac{6}{10} = 0.6 \\neq 0.5$ ✓

**Answer:** $k = 2$`,
      },
    ],
  },

  {
    id: "sat-graphing",
    icon: "📈",
    title: "Graphing Linear Equations",
    subtitle: "Slope, intercepts, parallel and perpendicular lines",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "These two lines are perpendicular — their slopes (2 and −0.5) multiply to −1. Drag the slider or change the equations to explore.",
    desmosExpressions: [
      { id: "1", latex: "y=2x-3" },
      { id: "2", latex: "y=-0.5x+4" },
    ],

    theory: `**Slope-Intercept Form:** $y = mx + b$
- $m$ = slope = $\\frac{\\text{rise}}{\\text{run}} = \\frac{y_2 - y_1}{x_2 - x_1}$
- $b$ = y-intercept (where the line crosses the y-axis)

**Standard Form:** $Ax + By = C$ — useful for finding intercepts quickly.
- x-intercept: set $y = 0$ and solve.
- y-intercept: set $x = 0$ and solve.

**Slope tells direction:**
| Slope | Line direction |
|---|---|
| $m > 0$ | Upward (left to right) |
| $m < 0$ | Downward (left to right) |
| $m = 0$ | Horizontal |
| Undefined | Vertical |

**Parallel Lines:** Same slope, different y-intercepts.
$$m_1 = m_2, \\quad b_1 \\neq b_2$$

**Perpendicular Lines:** Slopes are negative reciprocals.
$$m_1 \\times m_2 = -1 \\quad \\text{(e.g., slopes 3 and } -\\tfrac{1}{3}\\text{)}$$

**SAT applications of slope:**
- *Rate of change in context:* If a line models distance vs. time, slope = speed.
- *Comparing two lines:* Identify parallel/perpendicular from equations.
- *Writing equations:* Use a point and slope (point-slope form: $y - y_1 = m(x - x_1)$).`,

    formulas: [
      {
        label: "Slope-intercept form",
        latex: "y = mx + b",
      },
      {
        label: "Slope formula",
        latex: "m = \\frac{y_2 - y_1}{x_2 - x_1}",
      },
      {
        label: "Point-slope form",
        latex: "y - y_1 = m(x - x_1)",
      },
      {
        label: "Perpendicular slopes",
        latex: "m_1 \\times m_2 = -1",
      },
      {
        label: "x-intercept",
        latex: "\\text{Set } y = 0 \\text{ and solve for } x",
      },
    ],

    example: {
      problem:
        "A line passes through the points $(0, 4)$ and $(2, 0)$. Find the slope and write the equation of the line.",
      solution: `**Find the slope:**
$$m = \\frac{0 - 4}{2 - 0} = \\frac{-4}{2} = -2$$

**Write the equation:** The y-intercept is $b = 4$ (the line passes through $(0, 4)$).

$$y = -2x + 4$$

*Check with the second point:* $y = -2(2) + 4 = 0$ ✓`,
    },

    practice: [
      {
        question:
          "In the $xy$-plane, line $k$ has slope 3 and passes through the point $(1, 5)$. What is the y-intercept of line $k$?",
        answer: "2",
        solution: `Use slope-intercept form $y = mx + b$ with $m = 3$ and the point $(1, 5)$:

$$5 = 3(1) + b$$
$$b = 5 - 3 = 2$$

**The y-intercept of line $k$ is 2.**

*Equation of line $k$:* $y = 3x + 2$`,
      },
      {
        question:
          "Line $\\ell$ has equation $y = 4x - 1$. Which of the following is an equation of a line perpendicular to $\\ell$? (A) $y = 4x + 3$  (B) $y = -4x + 1$  (C) $y = -\\frac{1}{4}x + 2$  (D) $y = \\frac{1}{4}x - 5$",
        answer: "(C) $y = -\\frac{1}{4}x + 2$",
        solution: `The slope of $\\ell$ is $m = 4$.

A perpendicular line has slope $m_{\\perp} = -\\frac{1}{4}$ (negative reciprocal).

Check: $4 \\times \\left(-\\frac{1}{4}\\right) = -1$ ✓

**Answer: (C)** $y = -\\frac{1}{4}x + 2$`,
      },
    ],
  },
];
