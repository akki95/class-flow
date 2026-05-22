export const CHAPTER_META = {
  id: "sat-problem-solving",
  title: "Problem Solving & Data",
  subtitle: "Ratios, data interpretation and statistics",
  icon: "📊",
  color: "#06b6d4",
  exam: "SAT Math",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "sat-ratios",
    icon: "⚖️",
    title: "Ratios, Rates & Percentages",
    subtitle: "Proportional reasoning, unit rates and percentage change",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Ratios, Rates & Percentages

Ratios compare two quantities. A ratio $a:b$ means:
- $a$ represents $\\dfrac{a}{a+b}$ of the total
- $b$ represents $\\dfrac{b}{a+b}$ of the total

Proportions state that two ratios are equal:
$$\\frac{a}{b} = \\frac{c}{d}$$
Cross multiply to solve: $ad = bc$.

Rates express a quantity per unit of another quantity. A unit rate is reduced so the denominator is 1 (e.g. 60 miles per hour, $12 per item).

Percentage change measures relative increase or decrease:
$$\\text{Percentage change} = \\frac{\\text{new} - \\text{old}}{\\text{old}} \\times 100\\%$$

Percent of a number: Convert the percentage to a decimal and multiply. For example, $35\\%$ of $80 = 0.35 \\times 80 = 28$.

Markup and markdown:
$$\\text{new price} = \\text{original} \\times (1 \\pm r)$$
where $r$ is the decimal rate. A $20\\%$ increase gives $\\text{original} \\times 1.20$; a $20\\%$ decrease gives $\\text{original} \\times 0.80$.

SAT strategy tips:
- Always identify whether the question asks for a ratio, the actual amounts, or a percentage.
- When given a ratio and a total, use parts: total parts = sum of ratio values, then find each share.
- "Per unit" comparisons often require finding the unit rate before comparing.
- Percent problems sometimes chain two changes — apply them one at a time, not by adding the percentages.`,
    formulas: [
      {
        label: "Proportion",
        latex: "\\frac{a}{b}=\\frac{c}{d} \\Rightarrow ad=bc",
      },
      {
        label: "Percentage Change",
        latex: "\\frac{\\text{new}-\\text{old}}{\\text{old}}\\times100\\%",
      },
      {
        label: "Markup / Markdown",
        latex: "\\text{new}=\\text{original}\\times(1\\pm r)",
      },
      {
        label: "Ratio to fraction",
        latex: "a:b \\Rightarrow \\frac{a}{a+b}\\text{ and }\\frac{b}{a+b}",
      },
    ],
    example: {
      question:
        "A recipe uses flour and sugar in a 5:2 ratio. If 14 cups total are used, how many cups of flour are needed?",
      solution: `Step 1 — Find total parts.
Total parts $= 5 + 2 = 7$.

Step 2 — Find flour's share.
$$\\text{Flour} = \\frac{5}{7} \\times 14 = 10 \\text{ cups}$$

Answer: 10 cups of flour.`,
    },
    practice: {
      question:
        "A jacket's price increased from $80 to $108. By what percentage did the price increase?",
      solution: `Step 1 — Apply the percentage change formula.
$$\\text{Percentage change} = \\frac{108 - 80}{80} \\times 100\\%$$

Step 2 — Calculate.
$$= \\frac{28}{80} \\times 100\\% = 0.35 \\times 100\\% = 35\\%$$

Answer: The price increased by $35\\%$.`,
    },
  },
  {
    id: "sat-data",
    icon: "📈",
    title: "Data Interpretation",
    subtitle: "Reading tables, charts, probability and statistical claims",
    color: "#0891b2",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Data Interpretation

Reading tables and graphs: Use only the information provided. Identify axis labels, units, and totals before attempting to answer.

Probability measures how likely an event is:
$$P(\\text{event}) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}$$
Probability always lies in $[0, 1]$.

Relative frequency is the proportion of times an outcome occurs:
$$\\text{Relative frequency} = \\frac{f}{\\sum f}$$

Conditional probability is the probability of $A$ given that $B$ has already occurred:
$$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$$
In a two-way table, the denominator becomes the row or column total that represents the given condition.

Two-way tables: Always compute the row totals, column totals, and grand total first. Be careful whether the question asks for a proportion of the whole table, a row proportion, or a column proportion.

Statistical claims on the SAT:
- A random sample allows conclusions to be generalised to the entire population from which the sample was drawn.
- A non-random sample (e.g. volunteers, convenience sample) may be biased and conclusions should be limited to the sample itself.
- Even a random sample only supports conclusions about its own population — you cannot generalise to a different group.
- Larger random samples reduce sampling error but do not eliminate bias.`,
    formulas: [
      {
        label: "Probability",
        latex: "P = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}",
      },
      {
        label: "Relative Frequency",
        latex: "= \\frac{f}{\\sum f}",
      },
      {
        label: "Conditional Probability",
        latex: "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}",
      },
      {
        label: "Complement Rule",
        latex: "P(\\text{not } A) = 1 - P(A)",
      },
    ],
    example: {
      question:
        "In a survey of 200 students, 120 prefer math and 80 prefer English. Of those who prefer math, 45 are in Year 12. What is the probability that a randomly chosen student prefers math AND is in Year 12?",
      solution: `Step 1 — Identify the favourable outcomes and total.
Students who prefer math AND are in Year 12 $= 45$.
Total students surveyed $= 200$.

Step 2 — Apply the probability formula.
$$P = \\frac{45}{200} = \\frac{9}{40}$$

Answer: $\\dfrac{9}{40}$ (or $0.225$, i.e. $22.5\\%$).`,
    },
    practice: {
      question:
        "A bag has 4 red, 6 blue, and 2 green marbles. A marble is drawn at random. What is the probability it is NOT red?",
      solution: `Step 1 — Find total marbles.
Total $= 4 + 6 + 2 = 12$.

Step 2 — Use the complement rule.
$$P(\\text{not red}) = 1 - P(\\text{red}) = 1 - \\frac{4}{12} = \\frac{8}{12} = \\frac{2}{3}$$

Alternatively: not-red outcomes $= 6 + 2 = 8$, so $P = \\dfrac{8}{12} = \\dfrac{2}{3}$.

Answer: $\\dfrac{2}{3}$.`,
    },
  },
  {
    id: "sat-statistics",
    icon: "📉",
    title: "Statistics",
    subtitle: "Mean, median, spread, distributions and scatterplots",
    color: "#0e7490",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Statistics

Measures of centre:
- Mean (average): $\\bar{x} = \\dfrac{\\sum x}{n}$
- Median: the middle value when data are ordered. Position $= \\dfrac{n+1}{2}$. If $n$ is even, average the two middle values.
- Mode: the value that appears most often.

Measures of spread:
- Range $= \\text{max} - \\text{min}$
- Standard deviation (SD): measures how spread out values are from the mean. A larger SD means more spread; a smaller SD means values are clustered near the mean. The SAT does not ask you to calculate SD by hand but does ask you to compare or interpret it.
- Interquartile range (IQR) $= Q_3 - Q_1$: the spread of the middle $50\\%$ of data.

Effect of outliers:
- Outliers pull the mean toward them but have little effect on the median.
- When data are skewed or contain outliers, the median is a better measure of centre than the mean.

Scatterplots and correlation:
- A line of best fit (regression line) minimises overall distance from data points.
- Positive correlation: both variables increase together ($r > 0$).
- Negative correlation: one increases as the other decreases ($r < 0$).
- No correlation: no clear linear pattern ($r \\approx 0$).
- $r = 1$ is perfect positive; $r = -1$ is perfect negative.
- Residual $= \\text{actual value} - \\text{predicted value}$. A positive residual means the actual is above the line; negative means below.

SAT tips:
- Adding a value equal to the mean keeps the mean unchanged.
- Adding a value below the mean lowers the mean; above raises it.
- Adding or removing a value may or may not change the median depending on position.`,
    formulas: [
      {
        label: "Mean",
        latex: "\\bar{x}=\\frac{\\sum x}{n}",
      },
      {
        label: "Median position",
        latex: "\\text{position} = \\frac{n+1}{2}",
      },
      {
        label: "Range",
        latex: "\\text{range} = \\text{max} - \\text{min}",
      },
      {
        label: "Residual",
        latex: "\\text{residual} = \\text{actual} - \\text{predicted}",
      },
    ],
    example: {
      question:
        "Data set: 3, 7, 7, 8, 10, 15. If the value 15 is removed, which measure of centre changes more — the mean or the median?",
      solution: `Step 1 — Calculate original mean and median.
Sum $= 3+7+7+8+10+15 = 50$. Mean $= \\dfrac{50}{6} \\approx 8.33$.
Ordered: 3, 7, 7, 8, 10, 15. Median $= \\dfrac{7+8}{2} = 7.5$.

Step 2 — Calculate new mean and median (15 removed).
Sum $= 3+7+7+8+10 = 35$. Mean $= \\dfrac{35}{5} = 7.0$.
Ordered: 3, 7, 7, 8, 10. Median $= 7$ (middle value).

Step 3 — Compare changes.
Mean change $= 8.33 - 7.0 \\approx 1.33$.
Median change $= 7.5 - 7 = 0.5$.

Answer: The mean changes more (by about 1.33 points vs 0.5 for the median). This is because 15 is an outlier that pulls the mean upward.`,
    },
    practice: {
      question:
        "A class of 5 students scored 72, 85, 90, 68, and 95 on a test. What is the mean score, and how does adding a 6th student with a score of 72 change the mean?",
      solution: `Step 1 — Calculate original mean.
$$\\bar{x} = \\frac{72+85+90+68+95}{5} = \\frac{410}{5} = 82$$

Step 2 — Calculate new mean with 6th student (score = 72).
$$\\bar{x}_{\\text{new}} = \\frac{410+72}{6} = \\frac{482}{6} \\approx 80.3$$

Step 3 — Interpret the change.
The new score of 72 is below the original mean of 82, so the mean decreases by approximately $82 - 80.3 = 1.7$ points.

Answer: Original mean $= 82$; new mean $\\approx 80.3$. The mean decreases by about $1.7$ points.`,
    },
  },
];
