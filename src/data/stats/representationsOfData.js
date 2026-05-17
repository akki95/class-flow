// FILE: src/data/stats/representationsOfData.js

export const CHAPTER_META = {
  id: "representations-data",
  title: "Representations of Data",
  subtitle: "Histograms, box plots, cumulative frequency and outliers",
  icon: "📉",
  color: "#818cf8",
  paper: "Statistics",
};

export const CHAPTER_TOPICS = [
  {
    id: "histograms",
    icon: "▦",
    title: "Histograms",
    subtitle: "Frequency density, unequal class widths",
    color: "#818cf8",
    visualization: null,
    desmosNote: "Histograms are best drawn on paper or with specialist tools; Desmos is not suitable for frequency density diagrams.",
    desmosExpressions: [],
    theory: `Histograms are used to display **continuous** (or grouped) data. Unlike a bar chart, in a histogram:

- The **y-axis** shows **frequency density**, not frequency.
- There are **no gaps** between bars (data is continuous).
- The **area** of each bar represents the frequency for that class.

**Key relationships:**
$$\\text{Frequency density} = \\frac{\\text{Frequency}}{\\text{Class width}}$$
$$\\text{Frequency} = \\text{Frequency density} \\times \\text{Class width}$$

**Why frequency density?**
When class widths are **unequal**, using frequency on the y-axis would be misleading — a wider class would appear taller simply because it covers more values. Frequency density corrects for this by making area (not height) represent frequency.

**Drawing a histogram:**
1. Calculate the class width for each class.
2. Divide frequency by class width to get frequency density.
3. Draw bars with height = frequency density and width = class width.

**Reading a histogram:**
To find the frequency of a class, multiply the bar's height (frequency density) by the class width.

When all class widths are **equal**, frequency density is proportional to frequency, so the shape is the same as a bar chart — but the y-axis label must still be frequency density.`,
    formulas: [
      {
        label: "Frequency Density",
        latex: "\\text{Frequency density} = \\frac{\\text{Frequency}}{\\text{Class width}}",
        note: "The height of each bar in a histogram."
      },
      {
        label: "Frequency from Histogram",
        latex: "\\text{Frequency} = \\text{Frequency density} \\times \\text{Class width}",
        note: "Area of each bar = frequency for that class."
      }
    ],
    example: {
      question: "A histogram shows a bar from 10 to 15 with frequency density 4, and a bar from 15 to 25 with frequency density 2. Find the frequency of each class.",
      steps: [
        {
          label: "Class 10–15: class width",
          math: "\\text{Class width} = 15 - 10 = 5"
        },
        {
          label: "Class 10–15: frequency",
          math: "\\text{Frequency} = 4 \\times 5 = 20"
        },
        {
          label: "Class 15–25: class width",
          math: "\\text{Class width} = 25 - 15 = 10"
        },
        {
          label: "Class 15–25: frequency",
          math: "\\text{Frequency} = 2 \\times 10 = 20"
        }
      ]
    },
    practice: {
      question: "Times (seconds) to complete a task were recorded as shown below:\n$$\\begin{array}{c|cc} \\text{Class} & \\text{Frequency} \\\\ \\hline 0 < t \\leq 10 & 8 \\\\ 10 < t \\leq 15 & 20 \\\\ 15 < t \\leq 30 & 15 \\end{array}$$\nCalculate the frequency density for each class.",
      solution: [
        {
          step: "Class 0–10: frequency density",
          math: "\\text{fd} = \\frac{8}{10} = 0.8"
        },
        {
          step: "Class 10–15: frequency density",
          math: "\\text{fd} = \\frac{20}{5} = 4.0"
        },
        {
          step: "Class 15–30: frequency density",
          math: "\\text{fd} = \\frac{15}{15} = 1.0"
        },
        {
          step: "Histogram description",
          math: "\\text{Draw bars at heights 0.8, 4.0, 1.0 with widths 10, 5, 15 respectively. The tallest bar is 10\\text{–}15.}"
        }
      ]
    }
  },
  {
    id: "box-plots-outliers",
    icon: "⊟",
    title: "Box Plots & Outliers",
    subtitle: "Q1, Q3, IQR, whiskers, outliers",
    color: "#818cf8",
    visualization: null,
    desmosNote: "Box plots require specialist statistical software; Desmos is not suitable for this diagram type.",
    desmosExpressions: [],
    theory: `A **box plot** (box-and-whisker diagram) provides a visual summary of a distribution using five key values — the **five-number summary**:

| Feature | Value |
|---|---|
| Minimum | Smallest non-outlier value |
| Q1 | Lower quartile (25th percentile) |
| Median | Middle value (50th percentile) |
| Q3 | Upper quartile (75th percentile) |
| Maximum | Largest non-outlier value |

**Structure:**
- The **box** spans from Q1 to Q3; its width equals the IQR.
- A vertical line inside the box marks the **median**.
- **Whiskers** extend from the box to the smallest and largest values that are **not outliers**.
- **Outliers** are plotted as individual crosses (×) or dots beyond the whiskers.

**Outlier Rule (Edexcel):**
A value is an outlier if it lies:
$$\\text{Below } Q_1 - 1.5 \\times \\text{IQR} \\quad \\text{or} \\quad \\text{Above } Q_3 + 1.5 \\times \\text{IQR}$$

**Uses of box plots:**
- Comparing two or more distributions side-by-side (same scale, parallel box plots)
- Identifying skewness: if median is closer to Q1 → positive skew; closer to Q3 → negative skew
- Spotting outliers visually`,
    formulas: [
      {
        label: "Lower Outlier Boundary",
        latex: "Q_1 - 1.5 \\times \\text{IQR}",
        note: "Values below this are outliers."
      },
      {
        label: "Upper Outlier Boundary",
        latex: "Q_3 + 1.5 \\times \\text{IQR}",
        note: "Values above this are outliers."
      },
      {
        label: "Interquartile Range",
        latex: "\\text{IQR} = Q_3 - Q_1",
        note: "Width of the box; measures spread of the middle 50% of data."
      }
    ],
    example: {
      question: "For the dataset 2, 5, 7, 8, 9, 10, 11, 13, 22: $Q_1 = 6$, $Q_2 = 9$, $Q_3 = 11$. Calculate the IQR, find the outlier boundaries, and identify any outliers.",
      steps: [
        {
          label: "Calculate IQR",
          math: "\\text{IQR} = Q_3 - Q_1 = 11 - 6 = 5"
        },
        {
          label: "Lower outlier boundary",
          math: "Q_1 - 1.5 \\times \\text{IQR} = 6 - 1.5 \\times 5 = 6 - 7.5 = -1.5"
        },
        {
          label: "Upper outlier boundary",
          math: "Q_3 + 1.5 \\times \\text{IQR} = 11 + 1.5 \\times 5 = 11 + 7.5 = 18.5"
        },
        {
          label: "Check for outliers",
          math: "22 > 18.5 \\Rightarrow \\text{22 is an outlier.}\\quad \\text{Whisker extends to next value: 13.}"
        }
      ]
    },
    practice: {
      question: "The weights (kg) of parcels have $Q_1 = 3.2$ and $Q_3 = 5.8$. A parcel weighs 10.1 kg. Determine whether this is an outlier, showing all working.",
      solution: [
        {
          step: "Calculate IQR",
          math: "\\text{IQR} = 5.8 - 3.2 = 2.6"
        },
        {
          step: "Calculate upper outlier boundary",
          math: "Q_3 + 1.5 \\times \\text{IQR} = 5.8 + 1.5 \\times 2.6 = 5.8 + 3.9 = 9.7"
        },
        {
          step: "Compare to boundary",
          math: "10.1 > 9.7 \\Rightarrow \\text{The 10.1 kg parcel IS an outlier.}"
        }
      ]
    }
  },
  {
    id: "cumulative-frequency",
    icon: "∫",
    title: "Cumulative Frequency",
    subtitle: "Cumulative frequency curves, quartiles and median",
    color: "#818cf8",
    visualization: null,
    desmosNote: "Cumulative frequency curves are best drawn on graph paper; Desmos can approximate with plotted points.",
    desmosExpressions: [],
    theory: `A **cumulative frequency table** gives a running total of frequencies up to each class boundary. A **cumulative frequency curve (ogive)** is formed by plotting cumulative frequency against the **upper class boundary** and joining the points with a smooth S-shaped (sigmoidal) curve.

**Constructing the curve:**
1. Calculate the cumulative frequency at each upper class boundary.
2. Plot points (upper class boundary, cumulative frequency).
3. Include the point (lower boundary of first class, 0).
4. Join with a smooth curve — do not use straight lines between points.

**Reading off quartiles and median:**
$$\\text{Median at cumulative frequency } \\frac{n}{2}$$
$$Q_1 \\text{ at cumulative frequency } \\frac{n}{4}$$
$$Q_3 \\text{ at cumulative frequency } \\frac{3n}{4}$$

**Procedure:** Draw a horizontal line from the required cumulative frequency to the curve, then drop a vertical line to the x-axis to read off the corresponding value.

**Percentiles:** The $p$th percentile is found at cumulative frequency $\\frac{pn}{100}$.

The IQR can be read off as $Q_3 - Q_1$.

**Estimating frequencies:** To estimate how many values lie below a given data value, read the corresponding cumulative frequency from the graph.`,
    formulas: [
      {
        label: "Median Position",
        latex: "\\text{Median at CF} = \\frac{n}{2}",
        note: "Read across from $\\frac{n}{2}$ on the CF axis to find the median value."
      },
      {
        label: "Lower Quartile Position",
        latex: "Q_1 \\text{ at CF} = \\frac{n}{4}",
        note: "25th percentile."
      },
      {
        label: "Upper Quartile Position",
        latex: "Q_3 \\text{ at CF} = \\frac{3n}{4}",
        note: "75th percentile."
      },
      {
        label: "IQR from Graph",
        latex: "\\text{IQR} = Q_3 - Q_1",
        note: "Read $Q_1$ and $Q_3$ from the curve, then subtract."
      }
    ],
    example: {
      question: "60 students sat a test. From the cumulative frequency curve: at CF = 30, score = 52; at CF = 15, score = 44; at CF = 45, score = 61. Find the median, Q1, Q3 and IQR.",
      steps: [
        {
          label: "Median (CF = n/2 = 30)",
          math: "\\text{Median} = 52"
        },
        {
          label: "Q1 (CF = n/4 = 15)",
          math: "Q_1 = 44"
        },
        {
          label: "Q3 (CF = 3n/4 = 45)",
          math: "Q_3 = 61"
        },
        {
          label: "IQR",
          math: "\\text{IQR} = 61 - 44 = 17"
        }
      ]
    },
    practice: {
      question: "40 runners completed a race. From the cumulative frequency curve: at 25%, time = 37 min; at 50%, time = 42 min; at 75%, time = 49 min. (a) Find the median. (b) Find the IQR. (c) Estimate the fraction of runners who completed the race in under 45 minutes (from the graph, the CF at 45 min ≈ 24).",
      solution: [
        {
          step: "(a) Median",
          math: "\\text{Median} = 42 \\text{ min}\\quad (\\text{at } \\tfrac{n}{2} = 20\\text{th value})"
        },
        {
          step: "(b) IQR",
          math: "\\text{IQR} = Q_3 - Q_1 = 49 - 37 = 12 \\text{ min}"
        },
        {
          step: "(c) Fraction under 45 min",
          math: "\\text{CF at 45 min} \\approx 24 \\Rightarrow \\text{fraction} = \\frac{24}{40} = 0.6 = 60\\%"
        }
      ]
    }
  },
  {
    id: "comparing-distributions",
    icon: "⇔",
    title: "Comparing Distributions",
    subtitle: "Comparing location and spread in context",
    color: "#818cf8",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `When asked to **compare two distributions**, you must address two aspects and interpret in context:

**1. Compare a measure of location (average)**
Use the **mean** or **median** to compare the typical value. State which group has the higher or lower average, and what this means in the real-world context.

**2. Compare a measure of spread (consistency)**
Use the **IQR** or **standard deviation** to compare variability. A smaller IQR/SD means the data is more consistent; a larger IQR/SD means more variation.

**Exam technique — always:**
- Use comparative language: "Group A has a *higher* median than Group B..."
- Interpret in context: "...suggesting Group A students scored better on average."
- Make two separate comments (one on location, one on spread) — partial marks are awarded for each.
- Do not simply list numbers — link each comparison to the meaning in context.

**Which measure to choose?**
- If data is skewed or has outliers: prefer **median** and **IQR**
- If data is roughly symmetric: **mean** and **standard deviation** are appropriate
- Use the same measure for both groups to ensure a fair comparison

**Skewness from box plots:**
- Median close to Q1 → **positive skew** (tail to the right)
- Median close to Q3 → **negative skew** (tail to the left)
- Median central in box → **symmetric**`,
    formulas: [
      {
        label: "Comparison Framework",
        latex: "\\text{Compare: (1) location (mean or median)} \\quad \\text{(2) spread (IQR or SD)}",
        note: "Always interpret both comparisons in the context of the question."
      }
    ],
    example: {
      question: "Group A: median = 65 marks, IQR = 18. Group B: median = 72 marks, IQR = 8. Write two comparisons in context.",
      steps: [
        {
          label: "Compare medians (location)",
          math: "\\text{Group B has a higher median (72 vs 65), suggesting Group B performed better on average.}"
        },
        {
          label: "Compare IQRs (spread)",
          math: "\\text{Group B has a smaller IQR (8 vs 18), so Group B's results were more consistent and less spread out.}"
        }
      ]
    },
    practice: {
      question: "Two schools each have 30 students sit a test. School X: mean = 58, SD = 12. School Y: mean = 62, SD = 6. Write two comparisons in context.",
      solution: [
        {
          step: "Compare means (location)",
          math: "\\text{School Y has a higher mean (62 vs 58), suggesting students in School Y scored higher on average.}"
        },
        {
          step: "Compare standard deviations (spread)",
          math: "\\text{School Y has a smaller standard deviation (6 vs 12), indicating their results were more consistent with less variation.}"
        }
      ]
    }
  }
];
