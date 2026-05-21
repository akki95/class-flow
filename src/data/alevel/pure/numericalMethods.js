export const CHAPTER_META = {
  id: "alevel-numerical",
  title: "Numerical Methods",
  subtitle: "Locating roots, iterative methods, and Newton-Raphson",
  icon: "≈",
  color: "#818cf8",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "iteration-al",
    icon: "≈",
    title: "Iteration & Change of Sign",
    subtitle: "Locating roots and iterative formulae",
    color: "#818cf8",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Change of Sign

If $f$ is **continuous** on $[a, b]$ and $f(a)$ and $f(b)$ have **opposite signs**, then by the Intermediate Value Theorem there is at least one root of $f(x)=0$ in the interval $(a, b)$.

$$f(a)\\,f(b) < 0 \\implies \\text{root in }(a,b)$$

Always state the sign change explicitly: give numerical values of $f(a)$ and $f(b)$.

> **Caveat:** A sign change guarantees at least one root, but there could be an odd number of roots. A failed sign change does not rule out roots (the function might touch the axis or have two roots close together).

---

## Fixed-Point Iteration

To solve $f(x) = 0$, rearrange into the form $x = g(x)$, then iterate:

$$x_{n+1} = g(x_n)$$

Starting from an initial estimate $x_0$ (found from a sketch or change of sign), generate a sequence $x_1, x_2, x_3, \\ldots$

### Convergence

The iteration converges if $|g'(x^*)| < 1$ at the root $x^*$, and diverges if $|g'(x^*)| > 1$.

- **Staircase diagram** (monotone): $0 < g'(x^*) < 1$ — successive iterates approach from one side.
- **Cobweb diagram** (oscillating): $-1 < g'(x^*) < 0$ — successive iterates alternate around the root.

### Showing Accuracy to $n$ Decimal Places

To confirm a root is $\\alpha$ to $n$ d.p., show a sign change of $f$ in the interval $(\\alpha - 0.5\\times10^{-n},\\, \\alpha + 0.5\\times10^{-n})$.`,
    formulas: [
      { label: "Change of sign", formula: `f(a)\\,f(b)<0 \\implies \\text{root in }(a,\\,b)` },
      { label: "Iteration formula", formula: `x_{n+1}=g(x_n)` },
      { label: "Convergence condition", formula: `|g'(x^*)| < 1` },
    ],
    example: {
      question:
        "Show that $f(x) = x^3 - 2x - 5$ has a root in $[2,3]$, then use $x_{n+1} = \\sqrt[3]{2x_n+5}$ with $x_0 = 2$ to find the root to 3 d.p.",
      steps: [
        "$f(2) = 8 - 4 - 5 = -1 < 0$.",
        "$f(3) = 27 - 6 - 5 = 16 > 0$.",
        "Sign change, and $f$ is continuous, so there is a root in $(2, 3)$.",
        "$x_1 = \\sqrt[3]{2(2)+5} = \\sqrt[3]{9} \\approx 2.0801$.",
        "$x_2 = \\sqrt[3]{2(2.0801)+5} \\approx 2.0938$.",
        "$x_3 = \\sqrt[3]{2(2.0938)+5} \\approx 2.0943$.",
        "$x_4 \\approx 2.0944$. Converged to $2.094$ (3 d.p.).",
      ],
      answer: "Root $\\approx 2.094$ to 3 d.p.",
    },
    practice: {
      question:
        "Show that $f(x) = x^3 - 4x - 1$ has a root between $x=1$ and $x=2$. Using $x_{n+1} = \\sqrt[3]{4x_n+1}$ and $x_0 = 2$, find the root to 2 d.p.",
      hint: "Evaluate $f(1)$ and $f(2)$ for the sign change, then iterate.",
      solution:
        "$f(1) = 1 - 4 - 1 = -4 < 0$. $f(2) = 8 - 8 - 1 = -1$... try $f(2) = 8-8-1=-1 < 0$, $f(3)=27-12-1=14>0$. " +
        "Root is in $(2,3)$. $x_1 = \\sqrt[3]{4(2)+1} = \\sqrt[3]{9} \\approx 2.08$. " +
        "$x_2 = \\sqrt[3]{4(2.08)+1} = \\sqrt[3]{9.32} \\approx 2.10$. " +
        "$x_3 \\approx \\sqrt[3]{9.40} \\approx 2.11$. Root $\\approx 2.11$ to 2 d.p.",
    },
  },
  {
    id: "newton-raphson",
    icon: "≈",
    title: "Newton-Raphson Method",
    subtitle: "Rapid convergence to a root",
    color: "#818cf8",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Newton-Raphson Method

The Newton-Raphson formula gives the next approximation to a root by following the tangent line to the curve at the current estimate:

$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$

### Why It Works

At the point $(x_n,\\, f(x_n))$, the tangent has slope $f'(x_n)$. This tangent crosses the $x$-axis at the new estimate $x_{n+1}$.

### Convergence

Newton-Raphson converges **quadratically** — the number of accurate decimal places roughly doubles with each iteration. It is much faster than simple iteration for smooth functions.

### When It Fails

- $f'(x_n) \\approx 0$: the tangent is nearly horizontal and the next iterate is far from the root.
- The starting point $x_0$ is too far from the root, or between two roots.
- The function has a turning point near the root.

Always choose $x_0$ carefully: use a sketch or change of sign to find an interval first.

### Showing Working

At each step, state the values of $f(x_n)$ and $f'(x_n)$, then compute $x_{n+1}$. Continue until the required accuracy is reached, and verify by showing a sign change around the final estimate.`,
    formulas: [
      { label: "Newton-Raphson formula", formula: `x_{n+1}=x_n-\\frac{f(x_n)}{f'(x_n)}` },
    ],
    example: {
      question:
        "Use the Newton-Raphson method once, with $x_0 = 3$, to estimate $\\sqrt{10}$ by solving $f(x) = x^2 - 10 = 0$.",
      steps: [
        "$f(x) = x^2 - 10$, so $f'(x) = 2x$.",
        "$f(3) = 9 - 10 = -1$.",
        "$f'(3) = 6$.",
        "$x_1 = 3 - \\dfrac{-1}{6} = 3 + \\dfrac{1}{6} \\approx 3.1\\overline{6}$.",
        "Compare: $\\sqrt{10} \\approx 3.1623$ — already accurate to 2 d.p. after one step.",
      ],
      answer: "$x_1 \\approx 3.167$ (compared with $\\sqrt{10} \\approx 3.162$)",
    },
    practice: {
      question:
        "Let $f(x) = x^3 - x - 5$. Use Newton-Raphson with $x_0 = 2$ to find the root to 3 d.p.",
      hint: "$f'(x) = 3x^2 - 1$. Compute $f(x_0)$ and $f'(x_0)$, then iterate.",
      solution:
        "$f(2) = 8 - 2 - 5 = 1$. $f'(2) = 12 - 1 = 11$. " +
        "$x_1 = 2 - \\dfrac{1}{11} \\approx 1.9091$. " +
        "$f(1.9091) \\approx -0.088$, $f'(1.9091) \\approx 9.94$. " +
        "$x_2 \\approx 1.9091 + \\dfrac{0.088}{9.94} \\approx 1.9180$. " +
        "$f(1.918) \\approx -0.001$, so root $\\approx 1.918$ to 3 d.p.",
    },
  },
];
