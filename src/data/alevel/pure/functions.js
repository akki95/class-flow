export const CHAPTER_META = {
  id: "alevel-functions",
  title: "Functions & Graphs",
  subtitle: "Composite and inverse functions, transformations and exponential models",
  icon: "f(x)",
  color: "#8b5cf6",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "composite-inverse",
    icon: "f(x)",
    title: "Composite & Inverse Functions",
    subtitle: "fg(x), f⁻¹(x), domain and range",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "f(x)=2x+3 and its inverse g(x)=(x-3)/2. They are reflections in the line y=x.",
    desmosExpressions: [
      { id: "1", latex: "f(x)=2x+3" },
      { id: "2", latex: "g(x)=(x-3)/2" },
      { id: "3", latex: "y=x" },
    ],
    theory: `**Domain and Range:**
- **Domain**: the set of all allowed input values.
- **Range**: the set of all possible output values.

**Composite functions:** $fg(x) = f(g(x))$ — apply $g$ first, then $f$.
- For $fg$ to exist, the **range of $g$** must be a subset of the **domain of $f$**.
- Note: $fg(x) \\neq gf(x)$ in general — composition is not commutative.

**Inverse functions:** $f^{-1}(x)$ reverses the action of $f$.
- To find $f^{-1}$: write $y = f(x)$, swap $x$ and $y$, then rearrange for $y$.
- Domain of $f^{-1}$ = Range of $f$.
- Range of $f^{-1}$ = Domain of $f$.
- $f(f^{-1}(x)) = x$ and $f^{-1}(f(x)) = x$.

**One-to-one (injective) functions:** $f^{-1}$ exists only if $f$ is one-to-one — each output corresponds to exactly one input. If $f$ is not one-to-one, **restrict the domain** so that it becomes one-to-one.

**Graph property:** The graph of $y = f^{-1}(x)$ is the reflection of $y = f(x)$ in the line $y = x$.`,
    formulas: [
      "fg(x) = f(g(x))",
      "f(f^{-1}(x)) = x = f^{-1}(f(x))",
      "\\text{domain}(f^{-1}) = \\text{range}(f)",
      "\\text{range}(f^{-1}) = \\text{domain}(f)",
    ],
    example: {
      question: "Given $f(x) = x^2 + 1$ for $x \\geq 0$, find $f^{-1}(x)$ and state its domain.",
      solution: `Let $y = x^2 + 1$. Swap $x$ and $y$:
$$x = y^2 + 1$$

Rearrange for $y$:
$$y^2 = x - 1 \\implies y = \\sqrt{x-1}$$

(Take positive root since the original domain is $x \\geq 0$.)

$$\\boxed{f^{-1}(x) = \\sqrt{x-1}, \\quad x \\geq 1}$$

The domain of $f^{-1}$ equals the range of $f$. Since $f(x) = x^2 + 1$ for $x \\geq 0$, the minimum value is $f(0) = 1$, so the range of $f$ is $[1, \\infty)$, giving domain of $f^{-1}$: $x \\geq 1$.`,
    },
    practice: {
      question: "Given $f(x) = \\dfrac{3}{x-2}$, $x \\neq 2$, and $g(x) = x^2 + 1$, find $fg(x)$ and all values of $x$ where $fg(x) = 1$.",
      solution: `**Finding $fg(x)$:**
$$fg(x) = f(g(x)) = f(x^2+1) = \\frac{3}{(x^2+1)-2} = \\frac{3}{x^2-1}$$

(Valid for $x^2 - 1 \\neq 0$, i.e. $x \\neq \\pm 1$.)

**Solving $fg(x) = 1$:**
$$\\frac{3}{x^2-1} = 1 \\implies x^2 - 1 = 3 \\implies x^2 = 4 \\implies x = \\pm 2$$

Check domain: $x = 2$ and $x = -2$ are both valid (neither equals $\\pm 1$).

$$\\boxed{x = 2 \\quad \\text{or} \\quad x = -2}$$`,
    },
  },
  {
    id: "graph-transformations-al",
    icon: "f(x)",
    title: "Graph Transformations",
    subtitle: "Stretches, reflections and combined transformations",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Key transformations of $y = f(x)$:

| Transformation | Effect on coordinates |
|---|---|
| $y = f(x) + a$ | Translate up by $a$ — $(x, y) \\to (x, y+a)$ |
| $y = f(x - a)$ | Translate right by $a$ — $(x, y) \\to (x+a, y)$ |
| $y = af(x)$ | Vertical stretch by factor $a$ — $(x, y) \\to (x, ay)$ |
| $y = f(ax)$ | Horizontal stretch by factor $\\tfrac{1}{a}$ — $(x, y) \\to \\left(\\tfrac{x}{a}, y\\right)$ |
| $y = -f(x)$ | Reflection in $x$-axis — $(x, y) \\to (x, -y)$ |
| $y = f(-x)$ | Reflection in $y$-axis — $(x, y) \\to (-x, y)$ |
| $y = |f(x)|$ | Reflect parts below $x$-axis upward |
| $y = f(|x|)$ | Reflect the right half ($x \\geq 0$) onto the left half |

**Combined transformations:** Apply transformations in the correct order. In general:
- Transformations **inside** $f(\\ldots)$ affect $x$-coordinates.
- Transformations **outside** $f(\\ldots)$ affect $y$-coordinates.
- Be careful with order when combining a stretch and a translation on the same axis.`,
    formulas: [
      "y = af(x) \\Rightarrow \\text{y-coords} \\times a \\text{ (vertical stretch)}",
      "y = f(ax) \\Rightarrow \\text{x-coords} \\div a \\text{ (horizontal stretch by } \\tfrac{1}{a})",
      "y = f(x-a) \\Rightarrow \\text{translate right by } a",
    ],
    example: {
      question: "Starting from $y = \\sin x$, describe the transformations that produce $y = 3\\sin(2x)$.",
      solution: `**Step 1:** $y = \\sin x \\to y = \\sin(2x)$

This is a **horizontal stretch** by factor $\\dfrac{1}{2}$ (x-coordinates are halved).

**Step 2:** $y = \\sin(2x) \\to y = 3\\sin(2x)$

This is a **vertical stretch** by factor $3$ (y-coordinates are multiplied by 3).

So the period halves (from $2\\pi$ to $\\pi$) and the amplitude triples (from 1 to 3).`,
    },
    practice: {
      question: "The graph of $y = f(x)$ has a maximum point at $(4, 6)$. Find the coordinates of the maximum point of $y = 2f(x-1)$.",
      solution: `Apply transformations to the point $(4, 6)$:

**Transformation $f(x) \\to f(x-1)$:** translate right by 1 — $x$-coordinate: $4 + 1 = 5$.

**Transformation $f(x-1) \\to 2f(x-1)$:** vertical stretch by 2 — $y$-coordinate: $6 \\times 2 = 12$.

$$\\boxed{\\text{Maximum point at } (5,\\, 12)}$$`,
    },
  },
  {
    id: "exp-log-graphs",
    icon: "f(x)",
    title: "Exponential & Log Graphs",
    subtitle: "Modelling with y=ab^x and log-linear graphs",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Exponential model:** $y = ab^x$

Taking $\\log_{10}$ of both sides:
$$\\log y = \\log a + x \\log b$$

A graph of $\\log y$ against $x$ is a **straight line** with:
- Gradient $= \\log b$
- $y$-intercept $= \\log a$

This allows the constants $a$ and $b$ to be determined from experimental data by plotting $\\log y$ against $x$.

**Natural exponential model:** $y = ae^{kx}$

Taking $\\ln$ of both sides:
$$\\ln y = \\ln a + kx$$

A graph of $\\ln y$ against $x$ is a **straight line** with:
- Gradient $= k$
- $y$-intercept $= \\ln a$

**Linearising data:** By plotting $\\log y$ (or $\\ln y$) against $x$, we can confirm whether data follows an exponential model and read off the constants. Always convert back from $\\log a$ or $\\ln a$ to find $a$.`,
    formulas: [
      "y = ab^x \\Rightarrow \\log y = \\log a + x\\log b",
      "y = ae^{kx} \\Rightarrow \\ln y = \\ln a + kx",
      "\\text{gradient} = \\log b \\text{ (or } k\\text{)}, \\quad y\\text{-intercept} = \\log a \\text{ (or } \\ln a\\text{)}",
    ],
    example: {
      question: "Data fits the model $y = ab^x$. The points $(2,\\, 12)$ and $(5,\\, 96)$ lie on the graph of $\\log y$ against $x$. Find $a$ and $b$.",
      solution: `**Gradient** of the $\\log y$ vs $x$ graph:
$$\\text{gradient} = \\frac{\\log 96 - \\log 12}{5 - 2} = \\frac{\\log(96/12)}{3} = \\frac{\\log 8}{3} = \\frac{3\\log 2}{3} = \\log 2$$

So $\\log b = \\log 2 \\implies \\boxed{b = 2}$.

**Finding $a$:** Use the point $(2, 12)$ on the $\\log y$ vs $x$ graph:
$$\\log 12 = \\log a + 2\\log 2 = \\log a + \\log 4$$
$$\\log a = \\log 12 - \\log 4 = \\log 3 \\implies \\boxed{a = 3}$$

**Model:** $y = 3 \\times 2^x$.`,
    },
    practice: {
      question: "A model $y = ae^{kx}$ passes through $(0,\\, 5)$ and $(3,\\, 40)$. Find $a$ and $k$.",
      solution: `**Substitute $x = 0$, $y = 5$:**
$$5 = ae^0 = a \\implies \\boxed{a = 5}$$

**Substitute $x = 3$, $y = 40$:**
$$40 = 5e^{3k} \\implies e^{3k} = 8 \\implies 3k = \\ln 8 = 3\\ln 2$$
$$\\boxed{k = \\ln 2 \\approx 0.693}$$

**Model:** $y = 5e^{(\\ln 2)x} = 5 \\times 2^x$.`,
    },
  },
];
