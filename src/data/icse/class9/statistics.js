export const CHAPTER_META = {
  id: "icse-9-statistics",
  title: "Statistics",
  subtitle: "Mean, median, mode, frequency distributions and graphical representation",
  icon: "📊",
  color: "#14b8a6",
  tier: "Class 9",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "central-tendency-9",
    icon: "📊",
    title: "Mean, Median & Mode",
    subtitle: "Measures of central tendency for raw and grouped data",
    color: "#14b8a6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Mean (Arithmetic Average):**

For raw data: $\\bar{x} = \\frac{\\sum x_i}{n}$

For a frequency distribution: $\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}$

**Median** — the middle value when data is arranged in order.

For $n$ values:
- If $n$ is odd: median $= \\left(\\frac{n+1}{2}\\right)^{\\text{th}}$ value
- If $n$ is even: median $= \\frac{1}{2}\\left[\\left(\\frac{n}{2}\\right)^{\\text{th}} + \\left(\\frac{n}{2}+1\\right)^{\\text{th}}\\right]$

**Mode** — the value that occurs most frequently. A data set can have no mode, one mode (unimodal), or multiple modes.

**Relationship (approximate):**
$$\\text{Mode} \\approx 3 \\times \\text{Median} - 2 \\times \\text{Mean}$$

**Choosing the right average:**
- Mean: best for symmetric data without outliers.
- Median: best when data has outliers or is skewed.
- Mode: best for categorical data or finding the most common value.`,
    formulas: [
      {
        label: "Mean (raw)",
        latex: "\\bar{x} = \\frac{\\sum x_i}{n}",
      },
      {
        label: "Mean (grouped)",
        latex: "\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}",
      },
      {
        label: "Median (odd n)",
        latex: "\\text{Median} = \\left(\\frac{n+1}{2}\\right)^{\\text{th}} \\text{value}",
      },
    ],
    example: {
      question: "Find the mean, median and mode of: 5, 3, 7, 3, 8, 5, 3, 9, 5, 3",
      solution: `**Arranged in order:** 3, 3, 3, 3, 5, 5, 5, 7, 8, 9

**Mean:** $\\frac{3+3+3+3+5+5+5+7+8+9}{10} = \\frac{51}{10} = \\mathbf{5.1}$

**Median:** $n = 10$ (even), so median $= \\frac{5^{\\text{th}} + 6^{\\text{th}}}{2} = \\frac{5 + 5}{2} = \\mathbf{5}$

**Mode:** 3 appears 4 times (most frequent), so mode $= \\mathbf{3}$`,
    },
    practice: {
      question: "The mean of 5 numbers is 12. Four of the numbers are 8, 10, 15 and 14. Find the fifth number.",
      solution: `Sum of 5 numbers $= 5 \\times 12 = 60$

Sum of 4 known numbers $= 8 + 10 + 15 + 14 = 47$

Fifth number $= 60 - 47 = \\mathbf{13}$`,
    },
  },
  {
    id: "histograms-ogives",
    icon: "📈",
    title: "Histograms & Frequency Polygons",
    subtitle: "Graphical representation of grouped data",
    color: "#14b8a6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Histogram:**
- Used for **continuous** grouped data.
- Bars are drawn with **no gaps** between them.
- Width of each bar = class interval width.
- Height of each bar = frequency (or frequency density if class widths are unequal).

**For unequal class widths:**
$$\\text{Frequency density} = \\frac{\\text{frequency}}{\\text{class width}}$$

**Frequency polygon:**
- Plot the mid-point (class mark) of each class interval against its frequency.
- Join the points with straight lines.
- Class mark $= \\frac{\\text{lower boundary} + \\text{upper boundary}}{2}$

**Ogive (Cumulative Frequency Curve):**
- Plot the **upper boundary** of each class against the cumulative frequency.
- Join with a smooth curve.
- Used to find the **median**, **quartiles** and **percentiles** graphically.

**From an ogive:**
- Median = value at $\\frac{N}{2}$ on the y-axis.
- Lower quartile ($Q_1$) = value at $\\frac{N}{4}$.
- Upper quartile ($Q_3$) = value at $\\frac{3N}{4}$.
- Interquartile range $= Q_3 - Q_1$.`,
    formulas: [
      {
        label: "Class mark",
        latex: "\\text{Class mark} = \\frac{\\text{lower} + \\text{upper}}{2}",
      },
      {
        label: "Frequency density",
        latex: "\\text{Freq. density} = \\frac{\\text{frequency}}{\\text{class width}}",
      },
      {
        label: "IQR",
        latex: "\\text{IQR} = Q_3 - Q_1",
      },
    ],
    example: {
      question: "Draw a frequency polygon for the data: 0–10 (5), 10–20 (8), 20–30 (12), 30–40 (7), 40–50 (3). What are the class marks?",
      solution: `**Class marks:**

| Class | Class mark | Frequency |
|-------|-----------|-----------|
| 0–10 | 5 | 5 |
| 10–20 | 15 | 8 |
| 20–30 | 25 | 12 |
| 30–40 | 35 | 7 |
| 40–50 | 45 | 3 |

Plot the points $(5, 5), (15, 8), (25, 12), (35, 7), (45, 3)$ and join with straight lines.

Close the polygon by adding points at $(-5, 0)$ and $(55, 0)$.`,
    },
    practice: {
      question: "From an ogive, the cumulative frequencies at the upper boundaries are: 10 (at 20), 25 (at 30), 50 (at 40), 75 (at 50), 90 (at 60), 100 (at 70). Find the median and IQR.",
      solution: `$N = 100$

**Median** at $\\frac{N}{2} = 50$: From the ogive, cumulative frequency 50 corresponds to upper boundary $\\mathbf{40}$.

**$Q_1$** at $\\frac{N}{4} = 25$: corresponds to $\\mathbf{30}$.

**$Q_3$** at $\\frac{3N}{4} = 75$: corresponds to $\\mathbf{50}$.

$$\\text{IQR} = Q_3 - Q_1 = 50 - 30 = \\mathbf{20}$$`,
    },
  },
];
