// FILE: src/data/stats/hypothesisTesting.js

export const CHAPTER_META = {
  id: "hypothesis-testing",
  title: "Hypothesis Testing",
  subtitle: "Significance tests for the binomial distribution",
  icon: "🔬",
  color: "#2dd4bf",
  videoUrl: "https://www.youtube.com/watch?v=z4kccxhR53k",
  paper: "Statistics",
};

export const CHAPTER_TOPICS = [
  {
    id: "hypothesis-framework",
    icon: "H",
    title: "Hypothesis Testing Framework",
    subtitle: "H₀, H₁, significance levels and errors",
    color: "#2dd4bf",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **hypothesis test** uses sample data to assess the evidence against a claim about a population parameter.

**Setting up the hypotheses:**
- $H_0$ — the **null hypothesis**: the assumption of no change or no effect (e.g. $p = 0.5$). This is what we assume to be true unless the data provide strong evidence otherwise.
- $H_1$ — the **alternative hypothesis**: what we believe to be true if $H_0$ is rejected (e.g. $p > 0.5$).

**Significance level** $\\alpha$ (typically 5% or 1%) is the maximum acceptable probability of incorrectly rejecting $H_0$ when it is actually true.

**The five steps of a hypothesis test:**
1. State $H_0$ and $H_1$ clearly, including the parameter.
2. State the distribution of the test statistic under $H_0$.
3. Calculate the **p-value** (the probability of obtaining a result at least as extreme as the observed value, assuming $H_0$).
4. Compare the p-value with $\\alpha$.
5. State a conclusion **in context**.

**Types of error:**
- **Type I error**: reject $H_0$ when $H_0$ is true. Probability = $\\alpha$ (the significance level).
- **Type II error**: fail to reject $H_0$ when $H_0$ is false. Probability = $\\beta$ (depends on the true value of $p$).

$$\\text{p-value} < \\alpha \\quad \\Rightarrow \\quad \\text{reject } H_0$$`,
    formulas: [
      { label: "Reject H₀ condition", latex: "\\text{p-value} < \\alpha \\Rightarrow \\text{reject } H_0" },
      { label: "Type I error probability", latex: "P(\\text{reject } H_0 \\mid H_0 \\text{ true}) = \\alpha" },
    ],
    example: {
      question: "A coin is flipped 20 times and shows 15 heads. Test H₀: p = 0.5 vs H₁: p > 0.5 at the 5% significance level.",
      steps: [
        { label: "State hypotheses", math: "H_0: p = 0.5,\\quad H_1: p > 0.5" },
        { label: "Distribution under H₀", math: "X \\sim B(20,\\, 0.5) \\text{ under } H_0" },
        { label: "Calculate p-value (upper tail, observed value = 15)", math: "\\text{p-value} = P(X \\ge 15) = 1 - P(X \\le 14)" },
        { label: "Use calculator", math: "P(X \\le 14) \\approx 0.9793,\\quad \\text{p-value} \\approx 0.0207" },
        { label: "Compare with significance level", math: "0.0207 < 0.05 \\quad \\Rightarrow \\quad \\text{reject } H_0" },
        { label: "Conclusion in context", math: "\\text{There is sufficient evidence at the 5\\% level that the coin is biased towards heads.}" },
      ],
    },
    practice: {
      question: "A teacher claims that 30% of students pass a test (p = 0.3). In a sample of 20 students, 10 pass. Test H₀: p = 0.3 vs H₁: p > 0.3 at the 5% significance level. State your conclusion clearly.",
      solution: [
        { step: "State hypotheses", math: "H_0: p = 0.3,\\quad H_1: p > 0.3" },
        { step: "Distribution under H₀", math: "X \\sim B(20,\\, 0.3) \\text{ under } H_0" },
        { step: "Calculate p-value", math: "\\text{p-value} = P(X \\ge 10) = 1 - P(X \\le 9)" },
        { step: "Use calculator", math: "P(X \\le 9) \\approx 0.9520,\\quad \\text{p-value} \\approx 0.0480" },
        { step: "Compare with significance level", math: "0.0480 < 0.05 \\quad \\Rightarrow \\quad \\text{reject } H_0" },
        { step: "Conclusion in context", math: "\\text{There is sufficient evidence at the 5\\% level that the true pass rate exceeds 30\\%.}" },
      ],
    },
  },
  {
    id: "one-tailed-tests",
    icon: "→",
    title: "One-Tailed Tests",
    subtitle: "Testing for increase or decrease using binomial",
    color: "#2dd4bf",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **one-tailed test** is used when $H_1$ specifies a **direction** of change:

- **Upper tail**: $H_1: p > p_0$ — we suspect the probability has increased.
- **Lower tail**: $H_1: p < p_0$ — we suspect the probability has decreased.

The **critical region** is the set of values of the test statistic that would lead to rejection of $H_0$. It lies entirely in one tail.

**Finding the critical region:**

For an upper-tail test at significance level $\\alpha$, find the smallest integer $c$ such that:
$$P(X \\ge c) \\le \\alpha \\quad \\text{under } H_0$$

For a lower-tail test, find the largest integer $c$ such that:
$$P(X \\le c) \\le \\alpha \\quad \\text{under } H_0$$

The **actual significance level** is $P(\\text{critical region under } H_0)$, which is less than or equal to $\\alpha$ because X is discrete. This is reported as the true probability of a Type I error for the test.`,
    formulas: [
      { label: "Upper tail critical region", latex: "P(X \\ge c) \\le \\alpha", note: "find smallest such c" },
      { label: "Lower tail critical region", latex: "P(X \\le c) \\le \\alpha", note: "find largest such c" },
      { label: "Actual significance level", latex: "P(\\text{critical region under } H_0) \\le \\alpha" },
    ],
    example: {
      question: "X ~ B(20, p). Test H₀: p = 0.4 vs H₁: p > 0.4 at the 5% significance level. Find the critical region and the actual significance level.",
      steps: [
        { label: "Distribution under H₀", math: "X \\sim B(20,\\, 0.4) \\text{ under } H_0" },
        { label: "Upper tail: find smallest c with P(X ≥ c) ≤ 0.05", math: "P(X \\ge 12) = 1 - P(X \\le 11) \\approx 0.0565 > 0.05" },
        { label: "Try c = 13", math: "P(X \\ge 13) = 1 - P(X \\le 12) \\approx 0.0210 \\le 0.05 \\checkmark" },
        { label: "State critical region", math: "\\text{Critical region: } X \\ge 13" },
        { label: "State actual significance level", math: "\\text{Actual significance} = P(X \\ge 13) \\approx 2.10\\%" },
      ],
    },
    practice: {
      question: "X ~ B(15, p). Test H₀: p = 0.5 vs H₁: p < 0.5 at the 5% significance level. Find the critical region and actual significance level.",
      solution: [
        { step: "Distribution under H₀", math: "X \\sim B(15,\\, 0.5) \\text{ under } H_0" },
        { step: "Lower tail: find largest c with P(X ≤ c) ≤ 0.05", math: "P(X \\le 3) \\approx 0.0176 \\le 0.05 \\checkmark" },
        { step: "Check c = 4 to confirm boundary", math: "P(X \\le 4) \\approx 0.0592 > 0.05 \\quad \\text{(too large)}" },
        { step: "State critical region", math: "\\text{Critical region: } X \\le 3" },
        { step: "Actual significance level", math: "\\text{Actual significance} = P(X \\le 3) \\approx 1.76\\%" },
      ],
    },
  },
  {
    id: "two-tailed-tests",
    icon: "⟺",
    title: "Two-Tailed Tests",
    subtitle: "Testing for any change using both tails",
    color: "#2dd4bf",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **two-tailed test** is used when $H_1$ states $p \\ne p_0$ — we are looking for evidence of **any** change from $p_0$, not a specific direction.

The significance level is **split equally** between both tails: use $\\alpha/2$ in each tail.

**Finding the two-sided critical region:**

- **Lower critical value** $c_1$: largest $k$ such that $P(X \\le k) \\le \\alpha/2$ under $H_0$.
- **Upper critical value** $c_2$: smallest $k$ such that $P(X \\ge k) \\le \\alpha/2$ under $H_0$.
- **Reject** $H_0$ if the observed value falls in $\\{X \\le c_1\\} \\cup \\{X \\ge c_2\\}$.

Because X is discrete, the actual significance level in each tail may be strictly less than $\\alpha/2$, and the combined actual significance level is:

$$P(\\text{lower CR}) + P(\\text{upper CR}) \\le \\alpha$$

**Comparing with p-value:** For a two-tailed test, double the one-tail p-value and compare with $\\alpha$, or equivalently compare the one-tail p-value with $\\alpha/2$.`,
    formulas: [
      { label: "Two-tailed alternative", latex: "H_1: p \\ne p_0" },
      { label: "Each tail uses", latex: "\\alpha / 2" },
      { label: "Actual combined significance", latex: "P(\\text{lower CR}) + P(\\text{upper CR}) \\le \\alpha" },
    ],
    example: {
      question: "X ~ B(20, p). Test H₀: p = 0.5 vs H₁: p ≠ 0.5 at the 5% significance level. Find the critical region and actual significance level.",
      steps: [
        { label: "Distribution under H₀; each tail uses 2.5%", math: "X \\sim B(20,\\, 0.5),\\quad \\alpha/2 = 0.025" },
        { label: "Lower tail: find largest k with P(X ≤ k) ≤ 0.025", math: "P(X \\le 5) \\approx 0.0207 \\le 0.025 \\checkmark" },
        { label: "Check k = 6 to confirm boundary", math: "P(X \\le 6) \\approx 0.0577 > 0.025 \\quad \\text{(too large)}" },
        { label: "Lower critical region", math: "X \\le 5" },
        { label: "Upper tail: find smallest k with P(X ≥ k) ≤ 0.025", math: "P(X \\ge 15) \\approx 0.0207 \\le 0.025 \\checkmark" },
        { label: "Check k = 14 to confirm boundary", math: "P(X \\ge 14) \\approx 0.0577 > 0.025 \\quad \\text{(too large)}" },
        { label: "Upper critical region", math: "X \\ge 15" },
        { label: "Full critical region", math: "X \\le 5 \\text{ or } X \\ge 15" },
        { label: "Actual significance level", math: "0.0207 + 0.0207 = 0.0414 = 4.14\\%" },
      ],
    },
    practice: {
      question: "A coin is tossed 25 times and gives 18 heads. Test H₀: p = 0.5 vs H₁: p ≠ 0.5 at the 5% significance level. State the conclusion in context.",
      solution: [
        { step: "State hypotheses", math: "H_0: p = 0.5,\\quad H_1: p \\ne 0.5" },
        { step: "Distribution under H₀", math: "X \\sim B(25,\\, 0.5) \\text{ under } H_0" },
        { step: "Observed value is 18 (above 12.5), so calculate upper-tail p-value", math: "P(X \\ge 18) = 1 - P(X \\le 17)" },
        { step: "Use calculator", math: "P(X \\le 17) \\approx 0.9784,\\quad P(X \\ge 18) \\approx 0.0216" },
        { step: "Compare with α/2 = 0.025", math: "0.0216 < 0.025 \\quad \\Rightarrow \\quad 18 \\text{ lies in the upper critical region}" },
        { step: "Reject H₀ and state conclusion", math: "\\text{There is sufficient evidence at the 5\\% level that the coin is biased.}" },
      ],
    },
  },
];
