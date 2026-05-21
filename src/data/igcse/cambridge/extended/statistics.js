export const CHAPTER_META = {
  id: "cambridge-ext-statistics",
  title: "Statistics (Extended)",
  subtitle: "Histograms, cumulative frequency, quartiles and probability",
  icon: "📊",
  color: "#10b981",
  tier: "Extended",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "histograms-ext",
    icon: "📊",
    title: "Histograms (Frequency Density)",
    subtitle: "Unequal class widths — frequency density on y-axis",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Histograms are used for **continuous grouped data**, especially when class widths are unequal.

**Key rule:** The $y$-axis shows **frequency density**, not frequency.

$$\text{Frequency Density} = \\frac{\text{Frequency}}{\text{Class Width}}$$

$$\text{Frequency} = \text{Frequency Density} \times \text{Class Width} = \text{Area of bar}$$

$$\text{Total Frequency} = \text{Sum of all bar areas}$$

**Reading a histogram:**
- The **area** of each bar equals the frequency for that class.
- To find a frequency: read the bar height (fd) and multiply by the class width.
- The **modal class** is the class with the highest frequency density (tallest bar), not necessarily the class with the greatest frequency.

**Drawing a histogram:**
1. Calculate fd = frequency ÷ class width for each class.
2. Plot fd on the $y$-axis against the class boundaries on the $x$-axis.
3. Bars are drawn with no gaps; each bar extends from the lower class boundary to the upper class boundary.

**Finding a missing frequency from a histogram:**
1. Read the bar height (frequency density) from the graph.
2. Multiply by the class width to get the frequency.

> **Common error:** Do NOT use frequency on the $y$-axis when class widths differ. The area represents frequency, not the height.`,
    formulas: [
      {
        label: "Frequency Density",
        expression: "\text{fd}=\\frac{\text{frequency}}{\text{class width}}",
      },
      {
        label: "Frequency from bar",
        expression: "\text{frequency}=\text{fd}\times\text{class width}",
      },
      {
        label: "Total Frequency",
        expression: "\text{total frequency}=\\sum(\text{fd}\times\text{class width})",
      },
    ],
    example: {
      question:
        "A histogram shows three bars with heights (frequency densities): $0{-}20$: fd $= 0.8$, $20{-}30$: fd $= 3.0$, $30{-}50$: fd $= 1.5$. Find the frequency of each class and the total frequency.",
      solution: `**Frequencies** (frequency = fd × class width):

| Class | fd | Class Width | Frequency |
|---|---|---|---|
| $0 - 20$ | $0.8$ | $20$ | $0.8 \times 20 = 16$ |
| $20 - 30$ | $3.0$ | $10$ | $3.0 \times 10 = 30$ |
| $30 - 50$ | $1.5$ | $20$ | $1.5 \times 20 = 30$ |

**Total frequency** $= 16 + 30 + 30 = 76$

**Modal class** $= 20{-}30$ (highest fd $= 3.0$)`,
    },
    practice: [
      {
        question:
          "A histogram has bars with the following heights: $5{-}10$: fd $= 4$, $10{-}20$: fd $= 2.5$, $20{-}30$: fd $= 1$, $30{-}50$: fd $= 0.5$. Find the total frequency and state the modal class.",
        solution: `**Frequencies:**

| Class | fd | Class Width | Frequency |
|---|---|---|---|
| $5 - 10$ | $4$ | $5$ | $4 \times 5 = 20$ |
| $10 - 20$ | $2.5$ | $10$ | $2.5 \times 10 = 25$ |
| $20 - 30$ | $1$ | $10$ | $1 \times 10 = 10$ |
| $30 - 50$ | $0.5$ | $20$ | $0.5 \times 20 = 10$ |

**Total frequency** $= 20 + 25 + 10 + 10 = 65$

**Modal class** $= 5{-}10$ (highest frequency density $= 4$)`,
      },
    ],
  },
  {
    id: "cumulative-freq-ext",
    icon: "📈",
    title: "Cumulative Frequency & Box Plots",
    subtitle: "Ogive, quartiles, IQR and comparing distributions",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Cumulative frequency** is the running total of frequencies.

**Drawing an ogive (cumulative frequency curve):**
1. Calculate running totals of frequency.
2. Plot each **upper class boundary** against the cumulative frequency up to that point.
3. Join points with a smooth S-shaped curve. The curve always starts at zero at the lower boundary of the first class.

**Reading off key values** (for $n$ data values):

| Value | Position on CF axis |
|---|---|
| Median | $\\frac{n}{2}$ |
| Lower quartile $Q_1$ | $\\frac{n}{4}$ |
| Upper quartile $Q_3$ | $\\frac{3n}{4}$ |

**Interquartile Range:**
$$\text{IQR} = Q_3 - Q_1$$

**Box plot** (box-and-whisker diagram): Drawn on a number line using five values: minimum, $Q_1$, median, $Q_3$, maximum.

**Outlier criterion:**
$$\text{Outlier if value} < Q_1 - 1.5 \times \text{IQR} \\quad \text{or} \\quad \text{value} > Q_3 + 1.5 \times \text{IQR}$$

**Comparing distributions — exam technique:**
When asked to compare two distributions, you **must** state:
1. A measure of **location** (median): which group has higher/lower typical values.
2. A measure of **spread** (IQR or range): which group is more/less consistent.

Always write comparisons **in context** using the actual data values.`,
    formulas: [
      {
        label: "Interquartile Range",
        expression: "\text{IQR}=Q_3-Q_1",
      },
      {
        label: "Median position",
        expression: "\text{median at } \\frac{n}{2}",
      },
      {
        label: "Quartile positions",
        expression: "Q_1 \text{ at } \\frac{n}{4}, \\quad Q_3 \text{ at } \\frac{3n}{4}",
      },
      {
        label: "Outlier bounds",
        expression: "<Q_1-1.5\times\text{IQR} \\quad \text{or} \\quad >Q_3+1.5\times\text{IQR}",
      },
    ],
    example: {
      question:
        "From a cumulative frequency diagram for $60$ students, the following values are read: $Q_1 = 42$, median $= 52$, $Q_3 = 61$. A second class has median $= 58$ and IQR $= 12$. Compare the two distributions.",
      solution: `**For the first class:**
$$\text{IQR} = Q_3 - Q_1 = 61 - 42 = 19$$

**Comparison:**

- **Median:** The second class has a higher median ($58 > 52$), so students in the second class typically scored higher.
- **IQR:** The second class has a smaller IQR ($12 < 19$), so the scores in the second class are more consistent (less spread out).`,
    },
    practice: [
      {
        question:
          "From a cumulative frequency diagram for $80$ students: $Q_1 = 35$, $Q_3 = 55$. Find the IQR. Determine whether a score of $85$ is an outlier.",
        solution: `**IQR:**
$$\text{IQR} = Q_3 - Q_1 = 55 - 35 = 20$$

**Outlier upper boundary:**
$$Q_3 + 1.5 \times \text{IQR} = 55 + 1.5 \times 20 = 55 + 30 = 85$$

A score of $85$ is exactly at the upper boundary. Whether it counts as an outlier depends on whether the criterion is strict ($>85$) or inclusive ($\\geq 85$). In most IGCSE mark schemes, a value exactly at the boundary is **not** classified as an outlier.`,
      },
    ],
  },
  {
    id: "conditional-prob-ext",
    icon: "🎲",
    title: "Conditional Probability & Tree Diagrams",
    subtitle: "P(A|B), without replacement and Venn diagrams",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Conditional probability** is the probability of event $A$ occurring given that event $B$ has already occurred.

$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

**Tree diagrams — without replacement:**
When items are selected without replacement, the probabilities on the second set of branches change depending on the outcome of the first selection. The total number of items decreases by one.

Multiply along branches to find the probability of a combined outcome. Add the results for mutually exclusive outcomes.

**Venn diagrams:**
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
$$P(A \text{ only}) = P(A) - P(A \\cap B)$$
$$P(A' \\cap B') = 1 - P(A \\cup B)$$

**Two-way tables:**
To find a conditional probability from a table, restrict attention to the relevant row or column and calculate within that subgroup.

**Independent events:**
Events $A$ and $B$ are independent if:
$$P(A|B) = P(A) \\quad \text{and} \\quad P(A \\cap B) = P(A) \times P(B)$$

> **Exam tip:** For without-replacement questions, always check whether to subtract 1 from the numerator, the denominator, or both when moving to the second draw.`,
    formulas: [
      {
        label: "Conditional Probability",
        expression: "P(A|B)=\\frac{P(A\\cap B)}{P(B)}",
      },
      {
        label: "Union Rule",
        expression: "P(A\\cup B)=P(A)+P(B)-P(A\\cap B)",
      },
      {
        label: "Independent Events",
        expression: "P(A\\cap B)=P(A)\times P(B)",
      },
      {
        label: "Without Replacement",
        expression: "\text{second probability depends on first outcome}",
      },
    ],
    example: {
      question:
        "A bag contains $5$ red balls and $3$ blue balls. Two balls are drawn without replacement. Find the probability that both balls are the same colour.",
      solution: `**P(both red):**
$$P(RR) = \\frac{5}{8} \times \\frac{4}{7} = \\frac{20}{56}$$

**P(both blue):**
$$P(BB) = \\frac{3}{8} \times \\frac{2}{7} = \\frac{6}{56}$$

**P(same colour):**
$$P(\text{same}) = \\frac{20}{56} + \\frac{6}{56} = \\frac{26}{56} = \\frac{13}{28}$$`,
    },
    practice: [
      {
        question:
          "A survey of $100$ students found: $60$ study Maths, $45$ study Science, $30$ study both. Find $P(\text{studies Maths} \\mid \text{studies Science})$.",
        solution: `**Identify the values:**
$$P(M \\cap S) = \\frac{30}{100} = 0.3$$
$$P(S) = \\frac{45}{100} = 0.45$$

**Apply the conditional probability formula:**
$$P(M|S) = \\frac{P(M \\cap S)}{P(S)} = \\frac{30/100}{45/100} = \\frac{30}{45} = \\frac{2}{3}$$

Alternatively, of the $45$ students who study Science, $30$ also study Maths, so $P(M|S) = \\frac{30}{45} = \\frac{2}{3}$.`,
      },
    ],
  },
];
