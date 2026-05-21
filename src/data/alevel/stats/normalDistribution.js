export const CHAPTER_META = {
  id: "alevel-normal-dist",
  title: "Normal Distribution",
  subtitle: "Continuous bell-shaped distribution, standardisation and hypothesis testing",
  icon: "🔔",
  color: "#22d3ee",
  year: "2",
  paper: "A-Level Applied",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "normal-dist-basics",
    icon: "🔔",
    title: "The Normal Distribution",
    subtitle: "Properties, standardisation and Z-scores",
    color: "#22d3ee",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **normal distribution** $N(\\mu, \\sigma^2)$ is a continuous, bell-shaped distribution that is symmetric about its mean $\\mu$. The standard deviation $\\sigma$ controls the spread — larger $\\sigma$ gives a flatter, wider curve.

**Standardisation:** Any normal variable can be converted to the standard normal $Z \\sim N(0,1)$ using:
$$Z = \\frac{X - \\mu}{\\sigma}$$

Use statistical tables or a calculator to find $P(Z < z)$ for the standard normal.

**Key symmetry properties:**
- $P(Z < 0) = 0.5$
- $P(Z > z) = 1 - P(Z < z)$
- $P(-z < Z < z) = 2P(Z < z) - 1$

**Finding $P(X < a)$:** Standardise to get $Z = (a - \\mu)/\\sigma$, then look up.

**Finding $x$ given probability:** Look up the $z$-value from tables (inverse normal), then un-standardise: $x = \\mu + z\\sigma$.

**The 68–95–99.7 rule:**
- $P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 0.68$
- $P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) \\approx 0.95$
- $P(\\mu - 3\\sigma < X < \\mu + 3\\sigma) \\approx 0.997$`,
    formulas: [
      "X \\sim N(\\mu, \\sigma^2)",
      "Z = \\frac{X-\\mu}{\\sigma}",
      "Z \\sim N(0,1)",
      "P(X < a) = P\\!\\left(Z < \\frac{a-\\mu}{\\sigma}\\right)",
    ],
    example: {
      question: "$X \\sim N(50, 16)$. Find $P(X < 54)$.",
      solution: `Standardise:
$$Z = \\frac{54 - 50}{4} = 1$$

Look up $P(Z < 1)$ from tables:
$$P(Z < 1) = 0.8413$$

Therefore $P(X < 54) = \\mathbf{0.8413}$.`,
    },
    practice: {
      question:
        "$X \\sim N(30, 25)$. Find (a) $P(X > 35)$, (b) the value of $a$ such that $P(X < a) = 0.9$.",
      solution: `**(a)** Standardise: $Z = (35 - 30)/5 = 1$.
$$P(X > 35) = P(Z > 1) = 1 - 0.8413 = \\mathbf{0.1587}$$

**(b)** From inverse normal tables, $P(Z < z) = 0.9 \\Rightarrow z = 1.282$.

Un-standardise:
$$a = \\mu + z\\sigma = 30 + 5 \\times 1.282 = \\mathbf{36.41}$$`,
    },
  },
  {
    id: "normal-hypothesis",
    icon: "🔔",
    title: "Normal Distribution Hypothesis Testing",
    subtitle: "Testing claims about population mean",
    color: "#22d3ee",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `To test whether a population mean has changed, given a known population variance $\\sigma^2$:

**Hypotheses:**
- $H_0: \\mu = \\mu_0$ (no change)
- $H_1: \\mu \\neq \\mu_0$ (two-tailed) or $H_1: \\mu > \\mu_0$ / $H_1: \\mu < \\mu_0$ (one-tailed)

**Sampling distribution:** Under $H_0$, the sample mean satisfies:
$$\\bar{X} \\sim N\\!\\left(\\mu_0,\\; \\frac{\\sigma^2}{n}\\right)$$

**Test statistic:** Standardise the sample mean:
$$Z = \\frac{\\bar{X} - \\mu_0}{\\sigma / \\sqrt{n}}$$

**Decision rules (critical value method):**
- One-tailed test at 5%: reject $H_0$ if $|Z| > 1.645$
- Two-tailed test at 5%: reject $H_0$ if $|Z| > 1.960$
- One-tailed test at 1%: reject $H_0$ if $|Z| > 2.326$
- Two-tailed test at 1%: reject $H_0$ if $|Z| > 2.576$

**p-value method:** Calculate $P(Z > |z_{\\text{obs}}|)$; reject $H_0$ if this is less than the significance level (one-tailed) or half the significance level (two-tailed).

Always state the conclusion in context of the original problem.`,
    formulas: [
      "Z = \\frac{\\bar{X}-\\mu_0}{\\sigma/\\sqrt{n}}",
      "\\text{One-tailed 5%: } |Z| > 1.645",
      "\\text{Two-tailed 5%: } |Z| > 1.960",
    ],
    example: {
      question:
        "Claim: $\\mu = 100$. A sample of $n = 25$ gives $\\bar{X} = 104$, with known $\\sigma = 10$. Test at 5% significance (two-tailed).",
      solution: `**Hypotheses:** $H_0: \\mu = 100$, $H_1: \\mu \\neq 100$.

**Test statistic:**
$$Z = \\frac{104 - 100}{10/\\sqrt{25}} = \\frac{4}{2} = 2$$

**Critical value** (two-tailed, 5%): $z_{\\text{crit}} = 1.960$.

Since $|2| = 2 > 1.960$, we **reject $H_0$**.

**Conclusion:** There is sufficient evidence at the 5% level that the population mean has changed.`,
    },
    practice: {
      question:
        "A machine fills bottles to a mean of 500 ml with $\\sigma = 8$ ml. A sample of 16 bottles gives $\\bar{X} = 496$ ml. Test $H_0: \\mu = 500$ vs $H_1: \\mu < 500$ at the 1% significance level.",
      solution: `**Test statistic:**
$$Z = \\frac{496 - 500}{8/\\sqrt{16}} = \\frac{-4}{2} = -2$$

**Critical value** (one-tailed lower, 1%): $z_{\\text{crit}} = -2.326$.

Since $-2 > -2.326$ (i.e. the test statistic does not lie in the critical region), we **fail to reject $H_0$**.

**Conclusion:** There is insufficient evidence at the 1% level that the mean fill has decreased.`,
    },
  },
];
