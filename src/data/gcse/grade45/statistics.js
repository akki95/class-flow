// FILE: src/data/gcse/grade45/statistics.js

export const CHAPTER_META = {
  id: "gcse-statistics-45",
  title: "Statistics",
  subtitle: "Averages, charts and scatter graphs",
  icon: "📊",
  color: "#10b981",
  grade: "4-5",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "averages",
    icon: "μ",
    title: "Averages & Range",
    subtitle: "Mean, median, mode and range from data and tables",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**The four measures of average and spread:**

**Mean** — add all values and divide by how many there are.
$$\\bar{x} = \\frac{\\sum x}{n}$$

**Median** — the **middle value** when data is arranged in order. For $n$ values, the median is at position $\\frac{n+1}{2}$. If two values share the middle, find their mean.

**Mode** — the **most frequently occurring** value (there can be more than one, or none).

**Range** — a measure of spread:
$$\\text{Range} = \\text{max} - \\text{min}$$

**Mean from a frequency table:**
$$\\bar{x} = \\frac{\\sum fx}{\\sum f}$$
where $f$ = frequency and $x$ = value.

**Estimated mean from grouped data:** use the **midpoint** of each class interval as $x$. The answer is an estimate because you don't know the exact values within each class.

**Which average to use?**
- **Mean:** best when data has no extreme values (outliers), uses all the data.
- **Median:** better when there are outliers or skewed data.
- **Mode:** useful for qualitative (non-numerical) data, or when the most common value is needed.`,
    formulas: [
      { label: "Mean", latex: "\\bar{x} = \\frac{\\sum x}{n}" },
      { label: "Mean from frequency table", latex: "\\bar{x} = \\frac{\\sum fx}{\\sum f}" },
      { label: "Range", latex: "\\text{Range} = \\text{max} - \\text{min}" },
    ],
    example: {
      question:
        "Find the mean, median, mode and range of: 3, 7, 2, 9, 4, 7, 1, 8.",
      steps: [
        { label: "Order the data", math: "1, 2, 3, 4, 7, 7, 8, 9" },
        { label: "Mean = sum ÷ n", math: "\\bar{x} = \\frac{3+7+2+9+4+7+1+8}{8} = \\frac{41}{8} = 5.125" },
        { label: "Median (n = 8, so average of 4th and 5th values)", math: "\\text{Median} = \\frac{4 + 7}{2} = 5.5" },
        { label: "Mode (7 appears twice)", math: "\\text{Mode} = 7" },
        { label: "Range", math: "\\text{Range} = 9 - 1 = 8" },
      ],
    },
    practice: {
      question:
        "A frequency table shows: score 1 (frequency 3), score 2 (frequency 5), score 3 (frequency 8), score 4 (frequency 4). Find the mean score.",
      solution: [
        { step: "Calculate Σfx", math: "\\sum fx = 1(3) + 2(5) + 3(8) + 4(4) = 3 + 10 + 24 + 16 = 53" },
        { step: "Calculate Σf", math: "\\sum f = 3 + 5 + 8 + 4 = 20" },
        { step: "Mean", math: "\\bar{x} = \\frac{53}{20} = 2.65" },
      ],
    },
  },
  {
    id: "charts",
    icon: "📈",
    title: "Charts & Diagrams",
    subtitle: "Bar charts, pie charts and frequency polygons",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Bar chart:** frequency (or relative frequency) on the $y$-axis, categories on the $x$-axis. Bars are equal width with **gaps** between them. Do not confuse with a histogram (no gaps, area = frequency).

**Pie chart:** the whole circle represents the total. Each sector's angle is proportional to its frequency.
$$\\text{Angle} = \\frac{\\text{frequency}}{\\text{total}} \\times 360°$$
To read a pie chart: $\\text{frequency} = \\frac{\\text{angle}}{360°} \\times \\text{total}$.

**Frequency polygon:** plot the frequency against the **midpoint** of each class interval, then join the points with straight lines. Useful for comparing two distributions on the same diagram.

**Two-way tables:** rows and columns represent two different categories. Fill in missing values by using row totals, column totals and the grand total.

**Stem-and-leaf diagram:** the **stem** shows leading digits (e.g. tens), the **leaf** shows the final digit. Good for preserving individual data values and reading off median/quartiles.

**Back-to-back stem-and-leaf:** compare two data sets using a shared stem — leaves for one set go left, leaves for the other go right.`,
    formulas: [
      { label: "Pie chart sector angle", latex: "\\text{Angle} = \\frac{\\text{frequency}}{\\text{total}} \\times 360°" },
      { label: "Frequency from pie chart", latex: "\\text{frequency} = \\frac{\\text{angle}}{360°} \\times \\text{total}" },
    ],
    example: {
      question:
        "30 students were surveyed about their favourite subject. 12 prefer Maths. Find the angle for Maths in a pie chart.",
      steps: [
        { label: "Write the formula", math: "\\text{Angle} = \\frac{\\text{frequency}}{\\text{total}} \\times 360°" },
        { label: "Substitute values", math: "\\text{Angle} = \\frac{12}{30} \\times 360°" },
        { label: "Calculate", math: "\\text{Angle} = 0.4 \\times 360° = 144°" },
      ],
    },
    practice: {
      question:
        "In a pie chart, the angle for 'Science' is 72°. The survey had 50 students in total. How many students preferred Science?",
      solution: [
        { step: "Use the reverse pie chart formula", math: "\\text{frequency} = \\frac{\\text{angle}}{360°} \\times \\text{total}" },
        { step: "Substitute values", math: "\\text{frequency} = \\frac{72°}{360°} \\times 50" },
        { step: "Calculate", math: "\\text{frequency} = 0.2 \\times 50 = 10 \\text{ students}" },
      ],
    },
  },
  {
    id: "scatter",
    icon: "·",
    title: "Scatter Graphs & Correlation",
    subtitle: "Correlation, lines of best fit and prediction",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Scatter graphs** are used to investigate the relationship (correlation) between two numerical variables. Each point represents one individual/item.

**Types of correlation:**
- **Positive correlation:** as one variable increases, the other also increases. Points slope upward (↗).
- **Negative correlation:** as one variable increases, the other decreases. Points slope downward (↘).
- **No correlation:** no pattern — points are randomly scattered.

**Strength:**
- **Strong correlation:** points lie close to a straight line.
- **Weak correlation:** points are more spread out but still show a trend.

**Line of best fit:**
- A straight line drawn so that the points are roughly equally distributed above and below the line.
- It should pass through $( \\bar{x}, \\bar{y} )$ — the mean point.
- Use it to **predict** values.

**Interpolation** (predicting within the data range): generally **reliable**.

**Extrapolation** (predicting outside the data range): **unreliable** — the trend may not continue.

**Important:** Correlation does **not** imply causation. Two variables can be correlated without one causing the other — a third factor may explain both.`,
    formulas: [
      { label: "Mean point for line of best fit", latex: "(\\bar{x},\\; \\bar{y})", note: "The line of best fit passes through the mean of both variables" },
    ],
    example: {
      question:
        "A scatter graph shows hours of revision on the x-axis and exam score on the y-axis. The points show a strong positive correlation. Describe the correlation and how you would use the graph to predict.",
      steps: [
        { label: "Describe the correlation", math: "\\text{Strong positive correlation}" },
        { label: "In context", math: "\\text{As hours of revision increase, exam score increases.}" },
        { label: "Draw line of best fit", math: "\\text{Equal number of points above and below, passing through } (\\bar{x}, \\bar{y})" },
        { label: "Predict for 6 hours", math: "\\text{Read off the } y\\text{-value on the line of best fit at } x = 6" },
      ],
    },
    practice: {
      question:
        "A scatter graph shows outside temperature (°C) on the x-axis and number of hot drinks sold on the y-axis. Describe the correlation and explain what it means in context.",
      solution: [
        { step: "Identify the correlation type", math: "\\text{Negative correlation}" },
        { step: "Describe the trend", math: "\\text{As temperature increases, fewer hot drinks are sold.}" },
        { step: "Explain in context", math: "\\text{When it is warmer, people are less likely to buy hot drinks.}" },
        { step: "Note on causation", math: "\\text{Correlation does not prove causation — other factors may be involved.}" },
      ],
    },
  },
];
