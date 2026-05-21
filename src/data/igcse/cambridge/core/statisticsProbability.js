export const CHAPTER_META = {
  id: "cambridge-core-stats-prob",
  title: "Statistics & Probability",
  subtitle: "Data display, averages, correlation and probability for Cambridge IGCSE Core",
  icon: "📊",
  color: "#f59e0b",
  tier: "Core",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "data-averages",
    icon: "📊",
    title: "Data Display & Averages",
    subtitle: "Charts, tables and measures of average and spread",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Measures of Average

| Measure | How to find it | Best used when… |
|---------|---------------|-----------------|
| **Mean** | $\\bar{x} = \\dfrac{\\sum x}{n}$ | Data has no outliers |
| **Median** | Middle value when data is ordered | Outliers are present |
| **Mode** | Most frequent value | Data is qualitative (categories) |

**Range** (measure of spread):
$$\\text{Range} = \\text{maximum} - \\text{minimum}$$

## Frequency Tables

When data is given as a frequency table:
$$\\bar{x} = \\frac{\\sum fx}{\\sum f}$$
where $f$ is the frequency of each value $x$.

Steps:
1. Add a column for $fx$ (value × frequency).
2. Find $\\sum fx$ (total of all $fx$ values).
3. Find $\\sum f$ (total frequency = $n$).
4. Divide: $\\bar{x} = \\dfrac{\\sum fx}{\\sum f}$.

## Grouped Data
Use the **midpoint** of each class interval to estimate the mean.

## Pie Charts
$$\\text{Angle for a sector} = \\frac{f}{\\sum f} \\times 360°$$

## Reading Charts
- **Bar charts / bar-line graphs:** read frequency from height.
- **Pictograms:** multiply count by the key value.
- **Stem-and-leaf diagrams:** leaves give individual values; back-to-back diagrams compare two data sets.`,

    formulas: [
      {
        label: "Mean from frequency table",
        latex: "\\bar{x} = \\frac{\\sum fx}{\\sum f}",
      },
      {
        label: "Pie chart sector angle",
        latex: "\\text{Angle} = \\frac{f}{\\sum f} \\times 360°",
      },
    ],

    example: {
      question: "Find the mean, median, mode and range of: 3, 5, 7, 5, 8, 2, 5.",
      solution: `**Mean:**
$$\\bar{x} = \\frac{3+5+7+5+8+2+5}{7} = \\frac{35}{7} = 5$$

**Median** — order the data first: $2, 3, 5, 5, 5, 7, 8$ (7 values).
Middle value is the 4th: **Median = 5**.

**Mode** = **5** (appears 3 times, more than any other value).

**Range** $= 8 - 2 = \\mathbf{6}$.`,
    },

    practice: {
      question:
        "A frequency table shows: score 1 (frequency 4), score 2 (frequency 7), score 3 (frequency 5), score 4 (frequency 4). Find the mean and the mode.",
      solution: `Build a $fx$ column:

| Score $x$ | Frequency $f$ | $fx$ |
|-----------|--------------|------|
| 1 | 4 | 4 |
| 2 | 7 | 14 |
| 3 | 5 | 15 |
| 4 | 4 | 16 |
| **Total** | **20** | **49** |

$$\\bar{x} = \\frac{\\sum fx}{\\sum f} = \\frac{49}{20} = \\mathbf{2.45}$$

**Mode = 2** (frequency 7 is the highest).`,
    },
  },

  {
    id: "scatter-core",
    icon: "🔵",
    title: "Scatter Diagrams & Correlation",
    subtitle: "Plotting, correlation types and line of best fit",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Scatter Diagrams

A scatter diagram plots **two variables** against each other to investigate whether a relationship exists.

## Types of Correlation

| Type | Description | Appearance |
|------|-------------|------------|
| **Positive correlation** | Both variables increase together | Points slope upward left to right |
| **Negative correlation** | One increases as the other decreases | Points slope downward left to right |
| **No correlation** | No clear pattern | Points scattered randomly |

**Strength:** points close to a straight line indicate **strong** correlation; widely scattered points indicate **weak** correlation.

## Line of Best Fit

- Drawn **by eye** through the middle of the data cloud.
- Should have approximately equal numbers of points above and below it.
- Passes through (or close to) the mean point $\\left(\\bar{x},\\ \\bar{y}\\right)$.

**Uses of the line of best fit:**
- **Interpolation** (predicting within the data range) — generally reliable.
- **Extrapolation** (predicting outside the data range) — unreliable; use with caution.

## Correlation ≠ Causation

Even if two variables are strongly correlated, one does **not necessarily cause** the other. Both could be influenced by a **third (lurking) variable**.`,

    formulas: [
      {
        label: "Line of best fit passes through mean point",
        latex: "(\\bar{x},\\ \\bar{y})",
      },
    ],

    example: {
      question:
        "A scatter graph plots height (cm) against shoe size for 20 students and shows positive correlation. Describe how to use the line of best fit to estimate the shoe size of a student who is 175 cm tall.",
      solution: `1. Draw the line of best fit through the middle of the data points.
2. From $\\text{height} = 175$ cm on the horizontal axis, draw a vertical line up to the line of best fit.
3. From that point, draw a horizontal line across to the vertical axis.
4. Read off the estimated shoe size.

This is **interpolation** (175 cm is within the range of the data), so the estimate is reasonably reliable.`,
    },

    practice: {
      question:
        "A scatter graph shows hours of TV watched per day against exam score — the graph shows negative correlation. (a) Describe what the correlation means in context. (b) Explain why this does not mean watching TV causes lower scores.",
      solution: `**(a) Meaning in context:**

As the number of hours of TV watched per day **increases**, exam scores tend to **decrease**. Students who watch more TV generally achieve lower scores.

**(b) Correlation does not imply causation:**

Both variables could be influenced by a **third factor** — for example, a student's study habits or attitude to school. A student who studies less may both watch more TV and score lower, but watching TV is not necessarily the direct cause of the lower score. An experiment (e.g. randomly assigning TV hours) would be needed to establish causation.`,
    },
  },

  {
    id: "probability-core",
    icon: "🎲",
    title: "Probability",
    subtitle: "Basic probability, expected outcomes and sample spaces",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `## Basic Probability

$$P(\\text{event}) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of equally likely outcomes}}$$

- Probability always satisfies $0 \\leq P(A) \\leq 1$.
- $P = 0$: impossible. $P = 1$: certain.

## Complement

$$P(A') = 1 - P(A)$$

($A'$ means "A does **not** happen".)

## Combined Events

**Mutually exclusive events** (cannot both happen):
$$P(A \\text{ or } B) = P(A) + P(B)$$

**Independent events** (one does not affect the other):
$$P(A \\text{ and } B) = P(A) \\times P(B)$$

## Expected Frequency

If an experiment is repeated $n$ times:
$$\\text{Expected frequency} = P(\\text{event}) \\times n$$

## Sample Space Diagrams

List **all possible outcomes** for two combined events in a table. Count the favourable cells and divide by the total number of cells.

## Tree Diagrams

- **Multiply** probabilities along each branch to find the probability of that combined outcome.
- **Add** the probabilities of separate branches that give the required outcome.
- Check: all end-branch probabilities must sum to 1.`,

    formulas: [
      {
        label: "Basic probability",
        latex: "P(A) = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}",
      },
      {
        label: "Complement rule",
        latex: "P(A') = 1 - P(A)",
      },
      {
        label: "Independent events",
        latex: "P(A \\cap B) = P(A) \\times P(B)",
      },
      {
        label: "Expected frequency",
        latex: "\\text{Expected frequency} = P(\\text{event}) \\times n",
      },
    ],

    example: {
      question:
        "A bag contains 4 red, 3 blue and 2 green balls. (a) Find $P(\\text{not red})$. (b) Two balls are drawn **with replacement**. Find $P(\\text{both red})$.",
      solution: `Total balls $= 4 + 3 + 2 = 9$.

**(a)**
$$P(\\text{not red}) = 1 - P(\\text{red}) = 1 - \\frac{4}{9} = \\frac{5}{9}$$

**(b)** The draws are independent (with replacement):
$$P(\\text{both red}) = P(\\text{red}) \\times P(\\text{red}) = \\frac{4}{9} \\times \\frac{4}{9} = \\frac{16}{81}$$`,
    },

    practice: {
      question:
        "A fair spinner has equal sections numbered 1 to 6. Find (a) $P(\\text{prime})$, (b) $P(\\text{even})$, (c) the expected number of 6s in 90 spins.",
      solution: `**(a) $P(\\text{prime})$:**

Prime numbers from 1–6: $2, 3, 5$ — that is 3 primes.
$$P(\\text{prime}) = \\frac{3}{6} = \\frac{1}{2}$$

**(b) $P(\\text{even})$:**

Even numbers from 1–6: $2, 4, 6$ — that is 3 even numbers.
$$P(\\text{even}) = \\frac{3}{6} = \\frac{1}{2}$$

**(c) Expected number of 6s in 90 spins:**

$$P(6) = \\frac{1}{6}$$
$$\\text{Expected frequency} = \\frac{1}{6} \\times 90 = \\mathbf{15}$$`,
    },
  },
];
