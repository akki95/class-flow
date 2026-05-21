export const CHAPTER_META = {
  id: "gcse-statistics-67",
  title: "Statistics",
  subtitle: "Histograms, Box Plots and Comparing Distributions",
  icon: "📊",
  color: "#10b981",
  grade: "6-7",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "histograms-67",
    icon: "📊",
    title: "Histograms",
    subtitle: "Unequal class widths and frequency density",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Histograms represent **continuous grouped data**. When class widths are unequal, the y-axis must show **frequency density** — not frequency.

$$\\text{Frequency density} = \\frac{\\text{Frequency}}{\\text{Class width}}$$

$$\\text{Frequency} = \\text{Frequency density} \\times \\text{Class width} \\quad (= \\text{area of bar})$$

**Key points:**
- The **area** of each bar represents the frequency.
- To find a missing frequency: read the bar height (fd) and multiply by the class width.
- **Total frequency** = sum of all bar areas.
- **Modal class** = the class with the highest frequency density (tallest bar).
- Never read frequency directly from the y-axis when class widths differ.`,
    formulas: [
      {
        label: "Frequency density",
        latex: "\\text{Frequency density} = \\frac{\\text{Frequency}}{\\text{Class width}}",
      },
      {
        label: "Frequency from histogram",
        latex: "\\text{Frequency} = \\text{fd} \\times \\text{class width}",
      },
    ],
    example: {
      question:
        "A histogram has a bar from 20–30 with frequency density 3.5, and a bar from 30–50 with frequency density 1.8. Find the frequency for each class.",
      solution: `**Class 20–30:** class width $= 10$

$$\\text{Frequency} = 3.5 \\times 10 = 35$$

**Class 30–50:** class width $= 20$

$$\\text{Frequency} = 1.8 \\times 20 = 36$$`,
    },
    practice: {
      question:
        "A histogram has the following bars: 0–10 (fd = 2.4), 10–25 (fd = 1.6), 25–30 (fd = 4.0). Find the total frequency.",
      solution: `**Class 0–10:** class width $= 10$ → frequency $= 2.4 \\times 10 = 24$

**Class 10–25:** class width $= 15$ → frequency $= 1.6 \\times 15 = 24$

**Class 25–30:** class width $= 5$ → frequency $= 4.0 \\times 5 = 20$

$$\\text{Total frequency} = 24 + 24 + 20 = 68$$`,
    },
  },
  {
    id: "box-plots-67",
    icon: "📦",
    title: "Box Plots & Quartiles",
    subtitle: "Quartiles, IQR and comparing distributions",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A box plot displays the **five-number summary**: minimum, $Q_1$, median ($Q_2$), $Q_3$, maximum.

**Interquartile Range (IQR):**
$$\\text{IQR} = Q_3 - Q_1$$

**Finding quartiles** for $n$ data values:
- $Q_1$ at position $\\dfrac{n}{4}$, $Q_3$ at position $\\dfrac{3n}{4}$ (adjust for even/odd $n$).

**Outlier test:**
$$\\text{Outlier if value} < Q_1 - 1.5 \\times \\text{IQR} \\quad \\text{or} \\quad > Q_3 + 1.5 \\times \\text{IQR}$$

**Comparing two distributions** — always include **both**:
1. A measure of **location** (compare medians) — which group scored higher on average?
2. A measure of **spread** (compare IQR or range) — which group is more consistent?

Write your comparison **in context** (mention what the data represents).`,
    formulas: [
      { label: "IQR", latex: "\\text{IQR}=Q_3-Q_1" },
      {
        label: "Lower outlier boundary",
        latex: "Q_1 - 1.5\\times\\text{IQR}",
      },
      {
        label: "Upper outlier boundary",
        latex: "Q_3 + 1.5\\times\\text{IQR}",
      },
    ],
    example: {
      question:
        "A dataset has $Q_1 = 15$, $Q_2 = 22$, $Q_3 = 30$. Is the value 55 an outlier?",
      solution: `$$\\text{IQR} = Q_3 - Q_1 = 30 - 15 = 15$$

Upper outlier boundary:
$$Q_3 + 1.5 \\times \\text{IQR} = 30 + 1.5 \\times 15 = 30 + 22.5 = 52.5$$

Since $55 > 52.5$, **yes, 55 is an outlier**.`,
    },
    practice: {
      question:
        "Two classes sat the same test. Class A: median = 65, IQR = 20. Class B: median = 72, IQR = 8. Compare the two classes' performance.",
      solution: `**Location:** Class B has a higher median (72 vs 65), suggesting that students in Class B scored higher on average.

**Spread:** Class B has a smaller IQR (8 vs 20), suggesting that Class B's results are more consistent and less variable than Class A's.`,
    },
  },
];
