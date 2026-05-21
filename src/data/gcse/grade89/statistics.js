export const CHAPTER_META = {
  id: "gcse-stats-89",
  title: "Statistics (Grade 8-9)",
  subtitle: "Harder data interpretation and comparing distributions",
  icon: "📊",
  color: "#10b981",
  grade: "8-9",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "comparing-data-89",
    icon: "📊",
    title: "Interpreting & Comparing Data",
    subtitle: "Using statistics to make detailed comparisons in context",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `At Grade 8-9, you must compare distributions using **precise statistical language**. Always quote specific values when comparing.

**Two required comparisons:**

**(1) A measure of location** — compare the mean or median. State which is higher/lower and interpret what this means in context.

**(2) A measure of spread** — compare the range, IQR, or standard deviation. State which is more or less consistent and what this implies.

When asked to compare, you **must** make two separate, clearly structured comparisons.

**Worked language examples:**
- "On average, Group A scored higher than Group B (median 72 vs 65), suggesting Group A performed better overall."
- "Group B's results were more consistent (IQR 8 vs IQR 20), indicating less variation in performance."

**Key reminders:**
- Always give specific numerical values for both groups in each comparison.
- Always interpret in context — don't just say "higher mean"; say what it means.
- For spread: a **smaller** IQR/range/SD means **more consistent** (less spread out).
- If comparing two box plots, identify median (middle line) and IQR (box width).
- If comparing two frequency polygons or histograms, estimate means and ranges visually.`,
    formulas: [
      {
        label: "Mean",
        formula: "\\bar{x} = \\frac{\\sum fx}{\\sum f}",
      },
      {
        label: "Median (from cumulative frequency)",
        formula: "\\text{Median} = \\frac{n}{2}\\text{th value}",
      },
      {
        label: "Interquartile Range",
        formula: "\\text{IQR} = Q_3 - Q_1",
      },
      {
        label: "Standard Deviation (population)",
        formula: "\\sigma = \\sqrt{\\frac{\\sum(x-\\bar{x})^2}{n}}",
      },
      {
        label: "Comparison approach",
        formula: "\\text{Compare: (1) location (mean/median), (2) spread (IQR/range/SD)}",
      },
    ],
    example: {
      question:
        "Class A: median = 68, IQR = 15. Class B: median = 74, IQR = 22. Write two comparisons in context.",
      solution: `**(1) Comparing averages (location):**
Class B has a higher median (74 vs 68), suggesting that Class B performed better on average.

**(2) Comparing consistency (spread):**
Class A has a smaller IQR (15 vs 22), indicating that Class A's results were more consistent and less spread out.

**Tip:** Always structure your answer with two clearly separate comparisons and include both numbers for each comparison.`,
    },
    practice: {
      question:
        "Two groups completed a reaction time test. Group X: mean = 245 ms, SD = 18. Group Y: mean = 260 ms, SD = 8. Write two comparisons in context.",
      solution: `**(1) Comparing averages (location):**
Group X has a lower mean reaction time (245 ms vs 260 ms), suggesting that Group X reacted faster on average.

**(2) Comparing consistency (spread):**
Group Y has a smaller standard deviation (8 vs 18), indicating that Group Y's reaction times were more consistent and less variable.

**Remember:** Lower reaction time = faster response. A smaller SD = results closer to the mean = more consistent.`,
    },
  },
  {
    id: "histograms-89",
    icon: "📊",
    title: "Harder Histograms",
    subtitle: "Multi-step histogram problems with missing values",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `At Grade 8-9, histogram problems involve **multiple steps**: finding missing frequencies, using given information to find class widths or frequency densities.

**Core formula:**
$$\\text{Frequency} = \\text{Frequency Density} \\times \\text{Class Width}$$

In a histogram, the **area** of each bar equals its **frequency**.

**Step-by-step approach for missing fd or frequency:**

**Step 1:** Calculate the frequency for each known bar using $f = \\text{fd} \\times \\text{width}$.

**Step 2:** Sum the known frequencies.

**Step 3:** Subtract from the total to find the missing frequency.

**Step 4:** Divide by the class width to find the missing frequency density.

**Estimating percentages from a histogram:**
- Find the frequency in the required class or range.
- Divide by total frequency and multiply by 100.

**Estimating the median from a histogram:**
- Accumulate frequencies class by class.
- Find which class contains the $\\frac{n}{2}$th value.
- Interpolate within that class:
$$\\text{Median} \\approx L + \\frac{\\frac{n}{2} - F_{\\text{prev}}}{f_{\\text{class}}} \\times w$$
where $L$ = lower class boundary, $F_{\\text{prev}}$ = cumulative frequency before this class, $f_{\\text{class}}$ = frequency of this class, $w$ = class width.`,
    formulas: [
      {
        label: "Frequency Density",
        formula: "\\text{fd} = \\frac{f}{\\text{class width}}",
      },
      {
        label: "Frequency from histogram",
        formula: "f = \\text{fd} \\times \\text{class width} = \\text{area of bar}",
      },
      {
        label: "Total frequency",
        formula: "n = \\sum (\\text{fd}_i \\times w_i)",
      },
      {
        label: "Median interpolation",
        formula: "\\text{Median} \\approx L + \\frac{\\frac{n}{2} - F_{\\text{prev}}}{f_{\\text{class}}} \\times w",
      },
    ],
    example: {
      question:
        "A histogram shows the following bars: 0–10 (fd = 1.2), 10–20 (fd = 2.8), 20–30 (fd = ?), 30–50 (fd = 0.8). The total frequency is 86. Find the missing frequency density.",
      solution: `**Step 1:** Calculate frequencies for known bars.
- 0–10: $1.2 \\times 10 = 12$
- 10–20: $2.8 \\times 10 = 28$
- 30–50: $0.8 \\times 20 = 16$

**Step 2:** Sum of known frequencies = $12 + 28 + 16 = 56$

**Step 3:** Missing frequency = $86 - 56 = 30$

**Step 4:** Class width of 20–30 = 10, so:
$$\\text{fd} = \\frac{30}{10} = 3.0$$

**Answer: fd = 3.0**`,
    },
    practice: {
      question:
        "A histogram shows times taken to complete a task. Bars: 0–5 mins (fd = 4), 5–15 mins (fd = 3), 15–25 mins (fd = ?), 25–40 mins (fd = 1). Total = 155 people. Find the missing frequency density and estimate the median.",
      solution: `**Part 1 — Finding the missing fd:**

Known frequencies:
- 0–5 mins: $4 \\times 5 = 20$
- 5–15 mins: $3 \\times 10 = 30$
- 25–40 mins: $1 \\times 15 = 15$

Sum of known = $20 + 30 + 15 = 65$

Missing frequency = $155 - 65 = 90$

Class width of 15–25 = 10, so:
$$\\text{fd} = \\frac{90}{10} = 9$$

**Part 2 — Estimating the median:**

$\\frac{n}{2} = \\frac{155}{2} = 77.5$

Cumulative frequencies:
- Up to 5: 20
- Up to 15: $20 + 30 = 50$
- Up to 25: $50 + 90 = 140$ ← 77.5th value falls here

Interpolate in class 15–25:
$$\\text{Median} \\approx 15 + \\frac{77.5 - 50}{90} \\times 10 = 15 + \\frac{27.5}{90} \\times 10 \\approx 15 + 3.06 \\approx 18.1 \\text{ mins}$$

**Answer: fd = 9, Median ≈ 18.1 minutes**`,
    },
  },
];
