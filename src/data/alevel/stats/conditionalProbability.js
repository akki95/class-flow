export const CHAPTER_META = {
  id: "alevel-conditional-prob",
  title: "Conditional Probability",
  subtitle: "P(A|B), Bayes theorem and probability distributions",
  icon: "P|",
  color: "#a78bfa",
  year: "2",
  paper: "A-Level Statistics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "bayes-theorem",
    icon: "P|",
    title: "Conditional Probability & Bayes",
    subtitle: "P(A|B) = P(A∩B)/P(B) and total probability",
    color: "#a78bfa",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Conditional probability**: $P(A|B)$ is the probability of $A$ given that $B$ has occurred:
$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

**Total probability rule**: if $B$ and $B'$ partition the sample space,
$$P(A) = P(A|B)P(B) + P(A|B')P(B')$$

**Bayes' theorem**: used to "reverse" conditional probabilities — given a result, find the probability of the cause:
$$P(B|A) = \\frac{P(A|B)P(B)}{P(A)}$$

**Method**:
1. Draw a tree diagram.
2. Find $P(A)$ using the total probability rule.
3. Find $P(B|A)$ using Bayes' theorem.

Always check: $P(B|A) + P(B'|A) = 1$.`,
    formulas: [
      { label: "Conditional probability", latex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}", note: "Probability of A given B has occurred" },
      { label: "Total probability", latex: "P(A) = P(A|B)P(B) + P(A|B')P(B')", note: "Partition the sample space by B and B'" },
      { label: "Bayes' theorem", latex: "P(B|A) = \\frac{P(A|B)P(B)}{P(A)}", note: "Reverses conditional probabilities" },
    ],
    example: {
      question: "A disease affects 1% of the population. A test is 95% accurate for those with the disease and 90% accurate for those without. Find P(has disease | positive test).",
      steps: [
        { label: "Define events and known probabilities", math: "P(+|D) = 0.95,\\quad P(+|D') = 0.10,\\quad P(D) = 0.01" },
        { label: "Find P(+) using total probability", math: "P(+) = 0.95 \\times 0.01 + 0.10 \\times 0.99 = 0.0095 + 0.099 = 0.1085" },
        { label: "Apply Bayes' theorem", math: "P(D|+) = \\frac{0.0095}{0.1085} \\approx 0.0876" },
        { label: "Interpret result", math: "\\text{Only 8.76% chance of having the disease despite a positive test!}" },
      ],
    },
    practice: {
      question: "Bag A has 3 red and 2 blue balls. Bag B has 1 red and 4 blue balls. A bag is chosen at random, then a ball is drawn. The ball is red. Find P(came from bag A).",
      solution: [
        { step: "State known probabilities", math: "P(R|A) = \\frac{3}{5},\\quad P(R|B) = \\frac{1}{5},\\quad P(A) = P(B) = \\frac{1}{2}" },
        { step: "Find P(R) using total probability", math: "P(R) = \\frac{3}{5} \\times \\frac{1}{2} + \\frac{1}{5} \\times \\frac{1}{2} = \\frac{3}{10} + \\frac{1}{10} = \\frac{4}{10} = \\frac{2}{5}" },
        { step: "Apply Bayes' theorem", math: "P(A|R) = \\frac{P(R|A)P(A)}{P(R)} = \\frac{\\frac{3}{5} \\times \\frac{1}{2}}{\\frac{2}{5}} = \\frac{\\frac{3}{10}}{\\frac{4}{10}} = \\frac{3}{4}" },
      ],
    },
  },
  {
    id: "distributions-review",
    icon: "~",
    title: "Discrete & Continuous Distributions",
    subtitle: "Choosing between binomial and normal distributions",
    color: "#a78bfa",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Binomial distribution** $B(n,p)$: use when there are a fixed number $n$ of independent trials, each with success probability $p$.

**Normal distribution** $N(\\mu, \\sigma^2)$: use for continuous data, symmetric bell-shaped distributions, or as an approximation to the binomial when $n$ is large and $p$ is not extreme (conditions: $np > 5$ and $n(1-p) > 5$).

**Normal approximation to binomial**: if $X \\sim B(n,p)$ and the conditions above hold:
$$X \\approx N(np,\\; np(1-p))$$

Apply a **continuity correction** because we are approximating a discrete distribution with a continuous one:
$$P(X \\le k) \\longrightarrow P\\!\\left(X < k + \\tfrac{1}{2}\\right)$$

**Identifying which distribution to use**:
- Discrete counts (e.g. number of successes in $n$ trials) → **binomial**
- Measurements (height, weight, time) → **normal**
- Large-sample counts where binomial conditions hold → **normal approximation**`,
    formulas: [
      { label: "Normal approximation to binomial", latex: "X\\sim B(n,p) \\approx N(np,\\, np(1-p))", note: "Valid when $np>5$ and $n(1-p)>5$" },
      { label: "Continuity correction", latex: "P(X\\le k) \\to P\\!\\left(X < k+\\tfrac{1}{2}\\right)", note: "Apply when using normal approximation to binomial" },
    ],
    example: {
      question: "Given $X \\sim B(100, 0.4)$, use a normal approximation to find $P(X \\le 35)$.",
      steps: [
        { label: "Check conditions and find parameters", math: "np = 40 > 5,\\quad n(1-p) = 60 > 5.\\quad \\mu = 40,\\quad \\sigma^2 = 24,\\quad \\sigma = \\sqrt{24}" },
        { label: "Apply continuity correction", math: "P(X \\le 35) \\approx P\\!\\left(Z < \\frac{35.5 - 40}{\\sqrt{24}}\\right) = P(Z < -0.919)" },
        { label: "Look up standard normal table", math: "P(Z < -0.919) \\approx 0.179" },
      ],
    },
    practice: {
      question: "Given $X \\sim B(200, 0.3)$, use a normal approximation to find $P(55 \\le X \\le 65)$.",
      solution: [
        { step: "Check conditions and find parameters", math: "np = 60 > 5,\\quad n(1-p) = 140 > 5.\\quad \\mu = 60,\\quad \\sigma^2 = 42,\\quad \\sigma \\approx 6.48" },
        { step: "Apply continuity correction", math: "P(55 \\le X \\le 65) \\approx P(54.5 < X < 65.5)" },
        { step: "Standardise and evaluate", math: "P\\!\\left(\\frac{54.5-60}{6.48} < Z < \\frac{65.5-60}{6.48}\\right) = P(-0.849 < Z < 0.849) = 2 \\times 0.8020 - 1 \\approx 0.604" },
      ],
    },
  },
];
