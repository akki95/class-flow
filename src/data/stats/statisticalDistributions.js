// FILE: src/data/stats/statisticalDistributions.js

export const CHAPTER_META = {
  id: "statistical-distributions",
  title: "Statistical Distributions",
  subtitle: "Probability distributions and the binomial model",
  icon: "🔔",
  color: "#38bdf8",
  videoUrl: "https://www.youtube.com/watch?v=T77mtUNbfCc",
  paper: "Statistics",
};

export const CHAPTER_TOPICS = [
  {
    id: "discrete-random-variables",
    icon: "X",
    title: "Discrete Random Variables",
    subtitle: "Probability distributions, E(X) and Var(X)",
    color: "#38bdf8",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **discrete random variable** (DRV) X is a variable that takes specific numerical values, each with an associated probability.

The **probability distribution** of X lists every possible value alongside its probability. The probabilities must satisfy:

$$\\sum P(X = x) = 1$$

The **expected value** (mean) of X is the long-run average outcome:

$$E(X) = \\sum x \\, P(X = x)$$

The **variance** measures the spread of X around its mean:

$$\\text{Var}(X) = E(X^2) - [E(X)]^2$$

where $E(X^2) = \\sum x^2 \\, P(X = x)$.

The **standard deviation** is $\\sigma = \\sqrt{\\text{Var}(X)}$.

If $Y = aX + b$ for constants $a$ and $b$, then:
- $E(Y) = aE(X) + b$
- $\\text{Var}(Y) = a^2 \\text{Var}(X)$`,
    formulas: [
      { label: "Sum of probabilities", latex: "\\sum P(X = x) = 1" },
      { label: "Expected value", latex: "E(X) = \\sum x\\,P(X = x)" },
      { label: "E(X²)", latex: "E(X^2) = \\sum x^2\\,P(X = x)" },
      { label: "Variance", latex: "\\text{Var}(X) = E(X^2) - [E(X)]^2" },
    ],
    example: {
      question: "$X$ has the following probability distribution:\n$$\\begin{array}{c|ccc} x & 1 & 2 & 3 \\\\ \\hline P(X=x) & 0.2 & 0.5 & 0.3 \\end{array}$$\nFind $E(X)$ and $\\text{Var}(X)$.",
      steps: [
        { label: "Verify probabilities sum to 1", math: "0.2 + 0.5 + 0.3 = 1.0 \\checkmark" },
        { label: "Calculate E(X)", math: "E(X) = 1(0.2) + 2(0.5) + 3(0.3) = 0.2 + 1.0 + 0.9 = 2.1" },
        { label: "Calculate E(X²)", math: "E(X^2) = 1^2(0.2) + 2^2(0.5) + 3^2(0.3) = 0.2 + 2.0 + 2.7 = 4.9" },
        { label: "Calculate Var(X)", math: "\\text{Var}(X) = 4.9 - (2.1)^2 = 4.9 - 4.41 = 0.49" },
      ],
    },
    practice: {
      question: "A discrete random variable $X$ has the probability distribution below:\n$$\\begin{array}{c|cccc} x & 0 & 1 & 2 & 3 \\\\ \\hline P(X=x) & k & 2k & 3k & 4k \\end{array}$$\n(a) Find the value of $k$. (b) Find $E(X)$.",
      solution: [
        { step: "Part (a): Probabilities must sum to 1", math: "k + 2k + 3k + 4k = 10k = 1" },
        { step: "Solve for k", math: "k = 0.1" },
        { step: "Part (b): Write out the distribution", math: "P(X=0)=0.1,\\; P(X=1)=0.2,\\; P(X=2)=0.3,\\; P(X=3)=0.4" },
        { step: "Calculate E(X)", math: "E(X) = 0(0.1) + 1(0.2) + 2(0.3) + 3(0.4) = 0 + 0.2 + 0.6 + 1.2 = 2.0" },
      ],
    },
  },
  {
    id: "binomial-distribution",
    icon: "B",
    title: "The Binomial Distribution",
    subtitle: "B(n,p): conditions, formula and probabilities",
    color: "#38bdf8",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `$X \\sim B(n, p)$ if **all four conditions** are met:

1. There are a **fixed number** $n$ of trials.
2. The trials are **independent** of each other.
3. Each trial has **exactly two outcomes**: success (probability $p$) or failure (probability $1 - p$).
4. The probability of success $p$ is **constant** for every trial.

The probability of exactly $r$ successes in $n$ trials is:

$$P(X = r) = \\binom{n}{r} p^r (1-p)^{n-r}$$

where the binomial coefficient $\\binom{n}{r} = \\dfrac{n!}{r!(n-r)!}$ counts the number of ways to arrange $r$ successes among $n$ trials.

The **mean** and **variance** are:

$$E(X) = np \\qquad \\text{Var}(X) = np(1-p)$$

At AS Level you are expected to use your calculator's built-in binomial probability distribution (binomial PDF/CDF) rather than computing the formula by hand for large values.`,
    formulas: [
      { label: "Binomial PMF", latex: "P(X = r) = \\binom{n}{r} p^r (1-p)^{n-r}" },
      { label: "Binomial coefficient", latex: "\\binom{n}{r} = \\frac{n!}{r!(n-r)!}" },
      { label: "Mean", latex: "E(X) = np" },
      { label: "Variance", latex: "\\text{Var}(X) = np(1-p)" },
    ],
    example: {
      question: "X ~ B(10, 0.3). Find P(X = 4), E(X) and Var(X).",
      steps: [
        { label: "Identify parameters", math: "n = 10,\\quad p = 0.3,\\quad r = 4" },
        { label: "Apply the binomial formula", math: "P(X = 4) = \\binom{10}{4}(0.3)^4(0.7)^6" },
        { label: "Evaluate the coefficient and powers", math: "\\binom{10}{4} = 210,\\quad (0.3)^4 = 0.0081,\\quad (0.7)^6 \\approx 0.117649" },
        { label: "Multiply together", math: "P(X = 4) = 210 \\times 0.0081 \\times 0.117649 \\approx 0.2001" },
        { label: "Mean and variance", math: "E(X) = 10 \\times 0.3 = 3,\\quad \\text{Var}(X) = 10 \\times 0.3 \\times 0.7 = 2.1" },
      ],
    },
    practice: {
      question: "A biased coin has P(heads) = 0.6. It is tossed 8 times. X = number of heads. (a) State the distribution of X. (b) Find P(X = 5). (c) Find E(X) and Var(X).",
      solution: [
        { step: "Part (a): State distribution", math: "X \\sim B(8,\\, 0.6)" },
        { step: "Part (b): Apply the binomial formula", math: "P(X = 5) = \\binom{8}{5}(0.6)^5(0.4)^3" },
        { step: "Evaluate", math: "\\binom{8}{5} = 56,\\quad (0.6)^5 = 0.07776,\\quad (0.4)^3 = 0.064" },
        { step: "Multiply", math: "P(X = 5) = 56 \\times 0.07776 \\times 0.064 \\approx 0.2787" },
        { step: "Part (c): Mean and variance", math: "E(X) = 8 \\times 0.6 = 4.8,\\quad \\text{Var}(X) = 8 \\times 0.6 \\times 0.4 = 1.92" },
      ],
    },
  },
  {
    id: "cumulative-binomial",
    icon: "Σ",
    title: "Cumulative Binomial Probabilities",
    subtitle: "P(X≤k), P(X<k), P(X>k) and calculator use",
    color: "#38bdf8",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **cumulative distribution function** (CDF) gives the probability that X is at most k:

$$P(X \\le k) = \\sum_{r=0}^{k} P(X = r)$$

On your calculator this is usually labelled **binomCDF(n, p, k)** or **binomial CD**.

**Key transformations** — always read the inequality carefully:

| Probability required | How to calculate |
|---|---|
| $P(X < k)$ | $P(X \\le k-1)$ |
| $P(X \\ge k)$ | $1 - P(X \\le k-1)$ |
| $P(X > k)$ | $1 - P(X \\le k)$ |
| $P(a \\le X \\le b)$ | $P(X \\le b) - P(X \\le a-1)$ |

**Exam tip:** Strict inequalities ($<$, $>$) are the most common source of errors. Always convert to a CDF form before entering values into the calculator.`,
    formulas: [
      { label: "CDF definition", latex: "P(X \\le k) = \\sum_{r=0}^{k} P(X = r)" },
      { label: "At least k", latex: "P(X \\ge k) = 1 - P(X \\le k-1)" },
      { label: "More than k", latex: "P(X > k) = 1 - P(X \\le k)" },
      { label: "Between a and b (inclusive)", latex: "P(a \\le X \\le b) = P(X \\le b) - P(X \\le a-1)" },
    ],
    example: {
      question: "X ~ B(12, 0.4). Find (a) P(X ≥ 5) and (b) P(3 ≤ X ≤ 7).",
      steps: [
        { label: "Part (a): Convert to CDF form", math: "P(X \\ge 5) = 1 - P(X \\le 4)" },
        { label: "Use calculator: P(X ≤ 4) for B(12, 0.4)", math: "P(X \\le 4) \\approx 0.4382" },
        { label: "Subtract from 1", math: "P(X \\ge 5) = 1 - 0.4382 = 0.5618" },
        { label: "Part (b): Apply the between formula", math: "P(3 \\le X \\le 7) = P(X \\le 7) - P(X \\le 2)" },
        { label: "Use calculator for both CDFs", math: "P(X \\le 7) \\approx 0.9427,\\quad P(X \\le 2) \\approx 0.0834" },
        { label: "Subtract", math: "P(3 \\le X \\le 7) = 0.9427 - 0.0834 = 0.8593" },
      ],
    },
    practice: {
      question: "X ~ B(15, 0.35). Find: (a) P(X ≤ 6), (b) P(X > 8), (c) P(4 ≤ X ≤ 8). Use your calculator.",
      solution: [
        { step: "Part (a): Direct CDF calculation", math: "P(X \\le 6) \\approx 0.7548" },
        { step: "Part (b): Convert P(X > 8) to CDF form", math: "P(X > 8) = 1 - P(X \\le 8)" },
        { step: "Use calculator for P(X ≤ 8)", math: "P(X \\le 8) \\approx 0.9500" },
        { step: "Subtract", math: "P(X > 8) = 1 - 0.9500 = 0.0500" },
        { step: "Part (c): Apply the between formula", math: "P(4 \\le X \\le 8) = P(X \\le 8) - P(X \\le 3)" },
        { step: "Use calculator for P(X ≤ 3)", math: "P(X \\le 3) \\approx 0.1727" },
        { step: "Subtract", math: "P(4 \\le X \\le 8) = 0.9500 - 0.1727 = 0.7773" },
      ],
    },
  },
];
