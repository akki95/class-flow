export const CHAPTER_META = {
  id: "alevel-regression-y2",
  title: "Regression & Correlation (Year 2)",
  subtitle: "Hypothesis testing for the product moment correlation coefficient",
  icon: "📡",
  color: "#a78bfa",
  year: "2",
  paper: "A-Level Applied",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "pmcc-hypothesis",
    icon: "📡",
    title: "Hypothesis Testing for Correlation",
    subtitle: "Testing whether population correlation coefficient is zero",
    color: "#a78bfa",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **product moment correlation coefficient (PMCC)**, denoted $r$, measures the strength and direction of linear association in a sample. The corresponding population parameter is $\\rho$ (rho).

**Hypotheses:**
- $H_0: \\rho = 0$ (no linear correlation in the population)
- $H_1: \\rho \\neq 0$ (two-tailed — testing for any linear correlation)
- $H_1: \\rho > 0$ (one-tailed — testing for positive correlation)
- $H_1: \\rho < 0$ (one-tailed — testing for negative correlation)

**Procedure:**
1. Calculate the sample PMCC $r$.
2. Look up the critical value from PMCC tables, using the sample size $n$ and the chosen significance level.
3. Compare: reject $H_0$ if $|r|$ exceeds the critical value (two-tailed), or if $r$ exceeds the critical value in the appropriate direction (one-tailed).

**Key observations:**
- Critical values **decrease** as $n$ increases — with more data, even a modest $|r|$ becomes statistically significant.
- A significant result means evidence of **linear** association only; it does not imply causation.
- Always state the conclusion in context, referring to the original variables.

**Assumptions:** The data come from a bivariate normal distribution (both variables are normally distributed).`,
    formulas: [
      "H_0: \\rho = 0",
      "\\text{Reject } H_0 \\text{ if } |r| > r_{\\text{crit}}(n, \\alpha)",
    ],
    example: {
      question:
        "$n = 10$, $r = 0.65$. Test $H_0: \\rho = 0$ at the 5% significance level (two-tailed).",
      solution: `**Hypotheses:** $H_0: \\rho = 0$, $H_1: \\rho \\neq 0$.

From PMCC critical value tables with $n = 10$ at the 5% two-tailed level:
$$r_{\\text{crit}} = 0.6319$$

Since $|0.65| = 0.65 > 0.6319$, we **reject $H_0$**.

**Conclusion:** There is significant evidence at the 5% level of a linear correlation between the two variables.`,
    },
    practice: {
      question:
        "$n = 15$, $r = -0.43$. Test $H_0: \\rho = 0$ vs $H_1: \\rho < 0$ at the 5% significance level.",
      solution: `From PMCC tables with $n = 15$ at the 5% one-tailed level:
$$r_{\\text{crit}} = 0.4409$$

Since $|{-0.43}| = 0.43 < 0.4409$, the test statistic does not fall in the critical region. We **fail to reject $H_0$**.

**Conclusion:** There is insufficient evidence at the 5% level of a negative linear correlation between the two variables.`,
    },
  },
];
