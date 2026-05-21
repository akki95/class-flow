export const CHAPTER_META = {
  id: "gcse-algebra-89",
  title: "Algebra",
  subtitle: "Grade 8–9 Higher Algebra",
  icon: "𝑥",
  color: "#6366f1",
  grade: "8-9",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "algebraic-proof",
    icon: "✓",
    title: "Algebraic Proof",
    subtitle: "Proving identities and general statements",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Algebraic proof uses algebra to show a statement is **always true**. Key technique: represent numbers algebraically — even: $2n$, odd: $2n+1$, consecutive integers: $n, n+1, n+2$, consecutive even: $2n, 2n+2$. Always expand fully and simplify. Use "let $n$ be any integer" to start.

For **disproof**: find ONE counter-example.

To show an expression is always **even**: show it equals $2 \\times (\\text{something})$.

Always **odd**: show it equals $2n+1$.`,
    formulas: [
      { label: "Even", value: "$2n$" },
      { label: "Odd", value: "$2n+1$" },
      { label: "Consecutive integers", value: "$n,\\; n+1,\\; n+2$" },
      { label: "Consecutive even integers", value: "$2n,\\; 2n+2,\\; 2n+4$" },
    ],
    example: {
      question:
        "Prove that $(2n+3)^2-(2n-1)^2$ is always a multiple of 8.",
      solution: `$$
(2n+3)^2-(2n-1)^2 = [(2n+3)+(2n-1)]\\,[(2n+3)-(2n-1)]
= (4n+2)(4)
= 16n+8
= 8(2n+1)
$$
This is always a multiple of 8. ✓`,
    },
    practice: {
      question:
        "Prove that the sum of the squares of two consecutive odd numbers is always even.",
      solution: `Let the two consecutive odd numbers be $2n+1$ and $2n+3$.

$$(2n+1)^2+(2n+3)^2 = 4n^2+4n+1+4n^2+12n+9 = 8n^2+16n+10 = 2(4n^2+8n+5)$$

This equals $2 \\times \\text{integer}$, so it is always even. ✓`,
    },
  },
  {
    id: "functions-89",
    icon: "f",
    title: "Functions",
    subtitle: "Composite and inverse functions",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **function** maps inputs to outputs. $f(x)$ means apply function $f$ to $x$.

**Composite function** $fg(x)$: apply $g$ first, then $f$. Written $fg(x)=f(g(x))$.

**Inverse function** $f^{-1}(x)$: reverses the function — swap $x$ and $y$, then rearrange.

- **Domain**: allowed inputs.
- **Range**: possible outputs.
- $f(f^{-1}(x))=x$ always.

For composite functions: work **from right to left**.`,
    formulas: [
      { label: "Composite", value: "$fg(x) = f(g(x))$" },
      {
        label: "Inverse",
        value: "Let $y=f(x)$, swap $x$ and $y$, rearrange for $x$",
      },
      { label: "Self-inverse property", value: "$f(f^{-1}(x)) = x$" },
    ],
    example: {
      question:
        "Given $f(x)=2x+1$ and $g(x)=x^2$, find (a) $fg(3)$ and (b) $f^{-1}(x)$.",
      solution: `**(a)** $fg(3)=f(g(3))=f(9)=2(9)+1=\\mathbf{19}$

**(b)** Let $y=2x+1 \\Rightarrow x=\\dfrac{y-1}{2}$, so $f^{-1}(x)=\\dfrac{x-1}{2}$.`,
    },
    practice: {
      question:
        "Given $f(x)=3x-2$ and $g(x)=x+4$, find (a) $gf(x)$, (b) $f^{-1}(x)$, (c) $x$ if $fg(x)=25$.",
      solution: `**(a)** $gf(x)=g(3x-2)=(3x-2)+4=\\mathbf{3x+2}$

**(b)** $y=3x-2 \\Rightarrow x=\\dfrac{y+2}{3}$, so $f^{-1}(x)=\\dfrac{x+2}{3}$

**(c)** $fg(x)=f(x+4)=3(x+4)-2=3x+10=25 \\Rightarrow x=\\mathbf{5}$`,
    },
  },
  {
    id: "iteration",
    icon: "↺",
    title: "Iteration",
    subtitle: "Iterative methods to find approximate solutions",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Iteration** finds approximate solutions to equations by repeated application of a formula.

**Method:**
1. Rearrange the equation to form $x_{n+1}=f(x_n)$.
2. Start with an initial value $x_0$.
3. Substitute to find $x_1$, then $x_2$, etc.
4. Repeat until **convergence** (values stop changing significantly).

**To show a root exists in $[a,b]$:** evaluate $f(a)$ and $f(b)$. If they have opposite signs, a root exists (change of sign method).

**Accuracy:** round to the required decimal places after convergence.`,
    formulas: [
      { label: "Iterative formula", value: "$x_{n+1} = f(x_n)$" },
      {
        label: "Change of sign",
        value:
          "$f(a) < 0$ and $f(b) > 0 \\Rightarrow$ root between $a$ and $b$",
      },
    ],
    example: {
      question:
        "Using $x_{n+1}=\\dfrac{x_n^2+3}{4}$ with $x_0=2$, perform three iterations.",
      solution: `$$x_1 = \\frac{4+3}{4} = 1.75$$
$$x_2 = \\frac{(1.75)^2+3}{4} = \\frac{3.0625+3}{4} \\approx 1.516$$
$$x_3 = \\frac{(1.516)^2+3}{4} \\approx \\frac{2.298+3}{4} \\approx 1.324$$

Converges to a root of $4x = x^2+3$, i.e. $x^2-4x+3=0$, giving $x=1$ or $x=3$.`,
    },
    practice: {
      question:
        "Show that $x^3-3x-1=0$ has a root between $x=1$ and $x=2$. Using $x_{n+1}=\\sqrt[3]{3x_n+1}$ with $x_0=1.5$, find the root to 2 d.p.",
      solution: `**Change of sign:** $f(1)=1-3-1=-3<0$ and $f(2)=8-6-1=1>0$. Sign change ✓, so root exists between 1 and 2.

$$x_1 = \\sqrt[3]{3(1.5)+1} = \\sqrt[3]{5.5} \\approx 1.765$$
$$x_2 = \\sqrt[3]{3(1.765)+1} = \\sqrt[3]{6.295} \\approx 1.847$$
$$x_3 = \\sqrt[3]{3(1.847)+1} = \\sqrt[3]{6.541} \\approx 1.869$$
$$x_4 \\approx 1.878,\\quad x_5 \\approx 1.882,\\quad x_6 \\approx 1.884$$

Root $\\approx \\mathbf{1.88}$ (to 2 d.p.).`,
    },
  },
  {
    id: "tangent-curve",
    icon: "∂",
    title: "Equation of a Tangent to a Curve",
    subtitle: "Using gradient at a point from a graph",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **gradient of a curve** at a point equals the gradient of the **tangent** at that point.

**Method:**
1. Draw a tangent to the curve at the given point (touching the curve at just that one point).
2. Pick two well-separated points on the tangent line.
3. Calculate gradient: $m = \\dfrac{\\Delta y}{\\Delta x}$.
4. Use $y - y_1 = m(x - x_1)$ to find the equation.

At GCSE this is done **graphically**, not using calculus.

- **Velocity–time graph:** gradient = acceleration.
- **Distance–time graph:** gradient = speed.`,
    formulas: [
      {
        label: "Gradient from graph",
        value: "$m = \\dfrac{\\Delta y}{\\Delta x}$",
      },
      {
        label: "Tangent equation",
        value: "$y - y_1 = m(x - x_1)$",
      },
    ],
    example: {
      question:
        "A curve passes through $(3,\\,9)$. The tangent at this point has gradient 6. Find the equation of the tangent.",
      solution: `$$y - 9 = 6(x - 3) \\implies y = 6x - 9$$`,
    },
    practice: {
      question:
        "A distance–time graph shows a curved line. At $t=4$ s a tangent is drawn through the points $(2,\\,10)$ and $(6,\\,30)$. Find the speed at $t=4$ s.",
      solution: `$$\\text{gradient} = \\frac{30-10}{6-2} = \\frac{20}{4} = \\mathbf{5 \\text{ m/s}}$$`,
    },
  },
];
