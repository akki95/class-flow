// FILE: src/data/stats/measuresOfLocation.js

export const CHAPTER_META = {
  id: "measures-location-spread",
  title: "Measures of Location & Spread",
  subtitle: "Mean, median, standard deviation and coding",
  icon: "📈",
  color: "#60a5fa",
  videoUrl: "https://www.youtube.com/watch?v=cM9u_hmYIDI",
  paper: "Statistics",
};

export const CHAPTER_TOPICS = [
  {
    id: "central-tendency",
    icon: "μ",
    title: "Measures of Central Tendency",
    subtitle: "Mean, median and mode",
    color: "#60a5fa",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `Measures of central tendency describe the **centre** or **typical value** of a dataset.

**Mean** ($\\bar{x}$): the arithmetic average. Calculated by summing all values and dividing by the number of values:
$$\\bar{x} = \\frac{\\sum x}{n}$$
For frequency tables, weight each value by its frequency:
$$\\bar{x} = \\frac{\\sum fx}{\\sum f}$$
For grouped data, use the **midpoint** of each class as the representative value for that class to estimate the mean. The mean uses all data values, making it sensitive to extreme values (outliers).

**Median**: the middle value when data is arranged in ascending order. For $n$ values, the median is at position $\\frac{n+1}{2}$. If $n$ is even, average the two middle values. The median is resistant to outliers and is preferred for skewed distributions.

**Mode**: the value (or class) that occurs most frequently. A dataset can be bimodal (two modes) or have no mode. Useful for qualitative data and for identifying the most common value.

**When to use each measure:**
- Mean: symmetric distributions with no outliers — uses all data
- Median: skewed distributions or when outliers are present
- Mode: most common/typical value; always appropriate for qualitative data`,
    formulas: [
      {
        label: "Mean (raw data)",
        latex: "\\bar{x} = \\frac{\\sum x}{n}",
        note: "Sum of all values divided by the number of values."
      },
      {
        label: "Mean (frequency table)",
        latex: "\\bar{x} = \\frac{\\sum fx}{\\sum f}",
        note: "Each value $x$ weighted by its frequency $f$."
      },
      {
        label: "Median Position",
        latex: "\\text{Median position} = \\frac{n+1}{2}\\text{th value}",
        note: "For even $n$, average the $\\frac{n}{2}$th and $\\left(\\frac{n}{2}+1\\right)$th values."
      }
    ],
    example: {
      question: "Find the mean and median of the dataset: 3, 7, 2, 9, 4, 7, 1, 8.",
      steps: [
        {
          label: "Order the data",
          math: "1,\\; 2,\\; 3,\\; 4,\\; 7,\\; 7,\\; 8,\\; 9"
        },
        {
          label: "Calculate the mean",
          math: "\\bar{x} = \\frac{3+7+2+9+4+7+1+8}{8} = \\frac{41}{8} = 5.125"
        },
        {
          label: "Find median position (n=8)",
          math: "\\text{Median position} = \\frac{8+1}{2} = 4.5\\text{th value}"
        },
        {
          label: "Average 4th and 5th values",
          math: "\\text{Median} = \\frac{4+7}{2} = 5.5"
        }
      ]
    },
    practice: {
      question: "The frequency table below shows the number of siblings for 20 students:\n$$\\begin{array}{c|cccc} x & 0 & 1 & 2 & 3 \\\\ \\hline f & 5 & 8 & 4 & 3 \\end{array}$$\nFind the mean and median number of siblings.",
      solution: [
        {
          step: "Calculate Σfx",
          math: "\\sum fx = (0 \\times 5) + (1 \\times 8) + (2 \\times 4) + (3 \\times 3) = 0 + 8 + 8 + 9 = 25"
        },
        {
          step: "Calculate mean",
          math: "\\bar{x} = \\frac{25}{20} = 1.25"
        },
        {
          step: "Find cumulative frequencies",
          math: "0 \\text{ siblings}: \\text{CF}=5;\\quad 1 \\text{ sibling}: \\text{CF}=13;\\quad 2 \\text{ siblings}: \\text{CF}=17"
        },
        {
          step: "Median position (n=20)",
          math: "\\text{Position} = \\frac{20+1}{2} = 10.5\\text{th value}"
        },
        {
          step: "Identify median value",
          math: "\\text{10th and 11th values both fall in the '1 sibling' group (CF goes from 5 to 13)} \\Rightarrow \\text{Median} = 1"
        }
      ]
    }
  },
  {
    id: "measures-spread",
    icon: "σ",
    title: "Measures of Spread",
    subtitle: "Range, IQR, variance and standard deviation",
    color: "#60a5fa",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `Measures of spread describe how **dispersed** or **spread out** data values are.

**Range**
$$\\text{Range} = \\text{Maximum} - \\text{Minimum}$$
Simple to calculate but sensitive to outliers — one extreme value dramatically changes the range.

**Interquartile Range (IQR)**
$$\\text{IQR} = Q_3 - Q_1$$
The spread of the middle 50% of data. Resistant to outliers and more informative than the range.

**Variance ($\\sigma^2$)**
The average squared deviation from the mean. The computational (shortcut) formula avoids rounding errors:
$$\\sigma^2 = \\frac{\\sum x^2}{n} - \\bar{x}^2$$
For frequency data:
$$\\sigma^2 = \\frac{\\sum fx^2}{\\sum f} - \\bar{x}^2$$

**Standard Deviation ($\\sigma$)**
$$\\sigma = \\sqrt{\\sigma^2} = \\sqrt{\\frac{\\sum x^2}{n} - \\bar{x}^2}$$
In the **same units** as the original data (unlike variance which is in squared units). Standard deviation is the most commonly used measure of spread in statistics.

A **larger** standard deviation means data values are more spread out from the mean; a **smaller** standard deviation means data is more tightly clustered.`,
    formulas: [
      {
        label: "Variance (computational)",
        latex: "\\sigma^2 = \\frac{\\sum x^2}{n} - \\bar{x}^2",
        note: "Equivalent to $\\frac{\\sum(x-\\bar{x})^2}{n}$ but easier to compute."
      },
      {
        label: "Standard Deviation",
        latex: "\\sigma = \\sqrt{\\frac{\\sum x^2}{n} - \\bar{x}^2}",
        note: "Always the positive square root of the variance."
      },
      {
        label: "Variance (frequency data)",
        latex: "\\sigma^2 = \\frac{\\sum fx^2}{\\sum f} - \\bar{x}^2",
        note: "Used when data is given in a frequency table."
      },
      {
        label: "Interquartile Range",
        latex: "\\text{IQR} = Q_3 - Q_1",
        note: "Spread of the middle 50% of data; resistant to outliers."
      }
    ],
    example: {
      question: "Find the variance and standard deviation of: 2, 4, 4, 4, 5, 5, 7, 9.",
      steps: [
        {
          label: "Find n and mean",
          math: "n = 8,\\quad \\bar{x} = \\frac{2+4+4+4+5+5+7+9}{8} = \\frac{40}{8} = 5"
        },
        {
          label: "Calculate Σx²",
          math: "\\sum x^2 = 4 + 16 + 16 + 16 + 25 + 25 + 49 + 81 = 232"
        },
        {
          label: "Calculate variance",
          math: "\\sigma^2 = \\frac{232}{8} - 5^2 = 29 - 25 = 4"
        },
        {
          label: "Calculate standard deviation",
          math: "\\sigma = \\sqrt{4} = 2"
        }
      ]
    },
    practice: {
      question: "The ages of 6 employees are: 23, 27, 31, 35, 39, 43. Find: (a) the mean, (b) the variance, (c) the standard deviation.",
      solution: [
        {
          step: "(a) Mean",
          math: "\\bar{x} = \\frac{23+27+31+35+39+43}{6} = \\frac{198}{6} = 33"
        },
        {
          step: "(b) Calculate Σx²",
          math: "\\sum x^2 = 529 + 729 + 961 + 1225 + 1521 + 1849 = 6814"
        },
        {
          step: "(b) Variance",
          math: "\\sigma^2 = \\frac{6814}{6} - 33^2 = 1135.\\overline{6} - 1089 = 46.\\overline{6} \\approx 46.67"
        },
        {
          step: "(c) Standard deviation",
          math: "\\sigma = \\sqrt{46.\\overline{6}} \\approx 6.83"
        }
      ]
    }
  },
  {
    id: "coding",
    icon: "≈",
    title: "Coding",
    subtitle: "Linear transformations of data",
    color: "#60a5fa",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `**Coding** is a technique to simplify calculations by applying a linear transformation to data values before computing statistics.

If the coded variable is defined as:
$$y = \\frac{x - a}{b}$$

then the original statistics can be recovered using:
$$\\bar{x} = a + b\\bar{y}$$
$$\\sigma_x = |b|\\,\\sigma_y$$

**Key insight:**
- **Subtracting $a$** shifts all values by $a$, so the **mean** shifts by $a$ but the **spread is unchanged**.
- **Dividing by $b$** scales all values by $\\frac{1}{b}$, so **both the mean and standard deviation** are scaled.
- Adding a constant does **not** change variance or standard deviation — only multiplication/division does.

Therefore, the variance transforms as $\\sigma_x^2 = b^2\\,\\sigma_y^2$.

This technique was historically important before calculators, but still appears in exam questions because it tests understanding of how transformations affect statistical measures. If the data is large (e.g. exam marks out of 100), coding reduces values to a manageable range.`,
    formulas: [
      {
        label: "Coding Transform",
        latex: "y = \\frac{x - a}{b}",
        note: "Subtract $a$ (location shift), then divide by $b$ (scale factor)."
      },
      {
        label: "Recover Original Mean",
        latex: "\\bar{x} = a + b\\bar{y}",
        note: "Reverse the coding: multiply by $b$, then add $a$."
      },
      {
        label: "Recover Original Standard Deviation",
        latex: "\\sigma_x = |b|\\,\\sigma_y",
        note: "Spread is only affected by multiplication/division, not by adding/subtracting $a$."
      },
      {
        label: "Recover Original Variance",
        latex: "\\sigma_x^2 = b^2\\,\\sigma_y^2",
        note: "Variance scales by $b^2$; the constant $a$ has no effect on spread."
      }
    ],
    example: {
      question: "Data $x$ is coded using $y = \\dfrac{x - 100}{10}$. The coded data has mean $\\bar{y} = 3.5$ and standard deviation $\\sigma_y = 2.1$. Find the mean and standard deviation of $x$.",
      steps: [
        {
          label: "Identify a and b from coding",
          math: "a = 100,\\quad b = 10"
        },
        {
          label: "Recover mean of x",
          math: "\\bar{x} = a + b\\bar{y} = 100 + 10 \\times 3.5 = 100 + 35 = 135"
        },
        {
          label: "Recover standard deviation of x",
          math: "\\sigma_x = |b|\\,\\sigma_y = 10 \\times 2.1 = 21"
        }
      ]
    },
    practice: {
      question: "Data $x$ is coded using $y = \\dfrac{x - 50}{5}$, giving $\\bar{y} = 4.2$ and $\\sigma_y = 1.8$. Find $\\bar{x}$ and $\\sigma_x$.",
      solution: [
        {
          step: "Identify a and b",
          math: "a = 50,\\quad b = 5"
        },
        {
          step: "Recover mean of x",
          math: "\\bar{x} = 50 + 5 \\times 4.2 = 50 + 21 = 71"
        },
        {
          step: "Recover standard deviation of x",
          math: "\\sigma_x = 5 \\times 1.8 = 9"
        }
      ]
    }
  }
];
