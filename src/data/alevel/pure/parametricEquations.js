export const CHAPTER_META = {
  id: "alevel-parametric",
  title: "Parametric Equations",
  subtitle: "Sketching curves, converting to Cartesian, differentiation and areas",
  icon: "t",
  color: "#f43f5e",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "parametric-curves",
    icon: "t",
    title: "Parametric Curves",
    subtitle: "Sketching and converting parametric to Cartesian",
    color: "#f43f5e",
    visualization: null,
    videoUrl: null,
    desmosNote: "Unit circle parametrically. Change to (2cos(t), 3sin(t)) for an ellipse.",
    desmosExpressions: [
      { id: "1", latex: "(\\cos(t),\\sin(t))" },
      { id: "2", latex: "0\\le t\\le 2\\pi" },
    ],
    theory: `## Parametric Equations

In a **parametric** representation, both $x$ and $y$ are expressed as functions of a third variable, the **parameter** $t$:

$$x = f(t), \\qquad y = g(t)$$

As $t$ varies over its domain, the point $(x, y)$ traces out a curve.

### Sketching a Parametric Curve

Make a table of values: choose a range of $t$, compute $x$ and $y$, then plot the resulting points. Note any restrictions on $t$ (e.g. $t \\geq 0$, $0 \\leq t \\leq 2\\pi$) — these restrict the part of the curve that is drawn.

### Converting to Cartesian Form

**Method 1 — Eliminate $t$ algebraically:** solve one equation for $t$ and substitute into the other.

**Method 2 — Use a trigonometric identity:** when $x = a\\cos t$ and $y = b\\sin t$, use $\\cos^2 t + \\sin^2 t = 1$:

$$\\left(\\frac{x}{a}\\right)^2 + \\left(\\frac{y}{b}\\right)^2 = 1 \\quad \\text{(ellipse)}$$

### Common Parametric Curves

| Parametric form | Cartesian | Shape |
|---|---|---|
| $x = r\\cos t,\\; y = r\\sin t$ | $x^2+y^2=r^2$ | Circle, radius $r$ |
| $x = a\\cos t,\\; y = b\\sin t$ | $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}=1$ | Ellipse |
| $x = at^2,\\; y = 2at$ | $y^2 = 4ax$ | Parabola |

### Domain and Range

When converting, pay attention to the range of $t$: this may restrict the domain of $x$ or the range of $y$ in the Cartesian equation.`,
    formulas: [
      {
        label: "Eliminate parameter",
        formula: `\\text{From }x=f(t),\\,y=g(t):\\text{ find }t=f^{-1}(x),\\text{ substitute into }y`,
      },
      {
        label: "Trig identity conversion",
        formula: `\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1 \\text{ from } x=a\\cos t,\\,y=b\\sin t`,
      },
    ],
    example: {
      question: "Convert $x = 2t$, $y = t^2 - 1$ to Cartesian form.",
      steps: [
        "From the $x$ equation: $t = \\dfrac{x}{2}$.",
        "Substitute into the $y$ equation: $y = \\left(\\dfrac{x}{2}\\right)^2 - 1$.",
        "Simplify: $y = \\dfrac{x^2}{4} - 1$.",
      ],
      answer: "$y = \\dfrac{x^2}{4} - 1$ (a parabola)",
    },
    practice: {
      question:
        "Convert $x = 3\\cos\\theta$, $y = 2\\sin\\theta$ to Cartesian form and identify the curve.",
      hint: "Express $\\cos\\theta$ and $\\sin\\theta$ in terms of $x$ and $y$, then use $\\cos^2\\theta + \\sin^2\\theta = 1$.",
      solution:
        "$\\cos\\theta = \\dfrac{x}{3}$, $\\sin\\theta = \\dfrac{y}{2}$. " +
        "Using $\\cos^2\\theta + \\sin^2\\theta = 1$: $\\dfrac{x^2}{9} + \\dfrac{y^2}{4} = 1$. " +
        "This is an **ellipse** with semi-major axis $3$ (along the $x$-axis) and semi-minor axis $2$ (along the $y$-axis).",
    },
  },
  {
    id: "parametric-diff-area",
    icon: "t",
    title: "Parametric Differentiation & Areas",
    subtitle: "dy/dx and area under parametric curves",
    color: "#f43f5e",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Parametric Differentiation

Using the chain rule:

$$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$$

This gives the gradient of the curve at the point corresponding to parameter value $t$.

### Second Derivative

$$\\frac{d^2y}{dx^2} = \\frac{\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}$$

Differentiate $\\dfrac{dy}{dx}$ (which is a function of $t$) with respect to $t$, then divide by $\\dfrac{dx}{dt}$.

### Tangents and Normals

At parameter value $t = t_0$:
- **Gradient of tangent:** $m = \\left.\\dfrac{dy}{dx}\\right|_{t=t_0}$
- **Point on curve:** $\\bigl(f(t_0),\\, g(t_0)\\bigr)$
- **Tangent equation:** $y - g(t_0) = m\\,\\bigl(x - f(t_0)\\bigr)$

---

## Area Under a Parametric Curve

$$A = \\int_{t_1}^{t_2} y\\,\\frac{dx}{dt}\\,dt$$

The limits $t_1$ and $t_2$ are the **parameter values** corresponding to the $x$-limits of the region. If $\\dfrac{dx}{dt} < 0$ throughout, the integral gives a negative value — take the absolute value for area.

> **Important:** always convert the limits from $x$-values to $t$-values before integrating.`,
    formulas: [
      { label: "Parametric derivative", formula: `\\frac{dy}{dx}=\\frac{dy/dt}{dx/dt}` },
      { label: "Second parametric derivative", formula: `\\frac{d^2y}{dx^2}=\\frac{\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}` },
      { label: "Area under curve", formula: `A=\\int_{t_1}^{t_2} y\\,\\frac{dx}{dt}\\,dt` },
    ],
    example: {
      question:
        "Given $x = t^2$, $y = 2t$, find $\\dfrac{dy}{dx}$ and the equation of the tangent at $t = 3$.",
      steps: [
        "$\\dfrac{dy}{dt} = 2$, $\\quad \\dfrac{dx}{dt} = 2t$.",
        "$\\dfrac{dy}{dx} = \\dfrac{2}{2t} = \\dfrac{1}{t}$.",
        "At $t = 3$: gradient $= \\dfrac{1}{3}$.",
        "Point on curve: $\\bigl(3^2,\\,2(3)\\bigr) = (9,\\,6)$.",
        "Tangent: $y - 6 = \\dfrac{1}{3}(x - 9)$, i.e. $y = \\dfrac{x}{3} + 3$.",
      ],
      answer: "$y = \\dfrac{x}{3} + 3$",
    },
    practice: {
      question:
        "Given $x = t + 1$, $y = t^2 - 4t$, find the area enclosed between the curve and the $x$-axis.",
      hint: "Find the values of $t$ where $y = 0$, then evaluate $\\displaystyle\\int y\\,\\frac{dx}{dt}\\,dt$ between those limits.",
      solution:
        "$y = 0$: $t^2 - 4t = 0 \\Rightarrow t(t-4) = 0$, so $t = 0$ or $t = 4$. " +
        "$\\dfrac{dx}{dt} = 1$. " +
        "$A = \\left|\\displaystyle\\int_0^4 (t^2 - 4t)(1)\\,dt\\right| " +
        "= \\left|\\left[\\dfrac{t^3}{3} - 2t^2\\right]_0^4\\right| " +
        "= \\left|\\dfrac{64}{3} - 32\\right| " +
        "= \\left|-\\dfrac{32}{3}\\right| = \\dfrac{32}{3}$.",
    },
  },
];
