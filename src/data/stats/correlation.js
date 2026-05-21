// FILE: src/data/stats/correlation.js

export const CHAPTER_META = {
  id: "correlation",
  title: "Correlation & Regression",
  subtitle: "Scatter diagrams, PMCC and linear regression",
  icon: "📡",
  color: "#a78bfa",
  videoUrl: "https://www.youtube.com/watch?v=Fr1t7R8yWSU",
  paper: "Statistics",
};

export const CHAPTER_TOPICS = [
  {
    id: "scatter-diagrams",
    icon: "·",
    title: "Scatter Diagrams",
    subtitle: "Plotting, correlation types and strength",
    color: "#a78bfa",
    visualization: null,
    desmosNote: "These points show strong positive correlation. Add more points to explore patterns.",
    desmosExpressions: [
      { id: "1", latex: "(1,2)" },
      { id: "2", latex: "(2,4)" },
      { id: "3", latex: "(3,5)" },
      { id: "4", latex: "(4,7)" },
      { id: "5", latex: "(5,8)" }
    ],
    theory: `A **scatter diagram** (scatter graph) plots pairs of values for two variables, one on each axis, to investigate whether a relationship exists between them.

**Types of correlation:**

- **Positive correlation**: as one variable increases, the other tends to increase. Points rise from left to right.
- **Negative correlation**: as one variable increases, the other tends to decrease. Points fall from left to right.
- **Zero (no) correlation**: no clear linear pattern between the variables. Points are scattered randomly.

**Strength of correlation:**

- **Strong**: points lie close to a straight line — the relationship is clear and consistent.
- **Weak**: points are more scattered — the trend exists but is less clear.
- **Perfect**: all points lie exactly on a straight line (rarely seen in real data).

**The independent variable (explanatory variable)** is plotted on the x-axis. The **dependent variable (response variable)** is plotted on the y-axis.

**Correlation does NOT imply causation:**
Even if two variables are strongly correlated, this does not mean that one causes the other. There may be a **lurking (confounding) variable** that is linked to both. For example, ice cream sales and drowning rates are positively correlated — but neither causes the other (both are linked to hot weather). Always be cautious about drawing causal conclusions from correlation alone.`,
    formulas: [
      {
        label: "Correlation — visual interpretation",
        latex: "r > 0 \\Rightarrow \\text{positive},\\quad r < 0 \\Rightarrow \\text{negative},\\quad r = 0 \\Rightarrow \\text{no linear correlation}",
        note: "For scatter diagrams, correlation type is identified visually from the pattern of points."
      }
    ],
    example: {
      question: "A student claims: 'People who eat more chocolate are better at maths because there is a positive correlation between chocolate consumption and maths scores.' Explain why this conclusion is not valid.",
      steps: [
        {
          label: "Identify the error",
          math: "\\text{Correlation does not imply causation.}"
        },
        {
          label: "Suggest a lurking variable",
          math: "\\text{Both chocolate consumption and maths scores may be linked to a third factor, such as socioeconomic status or access to education.}"
        },
        {
          label: "State correct interpretation",
          math: "\\text{A correlation only shows an association between two variables, not that one causes the other.}"
        }
      ]
    },
    practice: {
      question: "Describe the type of correlation you would expect between each pair of variables, and give a brief reason: (a) hours of revision and exam score, (b) age of a car and its resale value, (c) shoe size and IQ.",
      solution: [
        {
          step: "(a) Hours revision vs exam score",
          math: "\\text{Positive correlation — more revision generally leads to higher exam scores.}"
        },
        {
          step: "(b) Age of car vs resale value",
          math: "\\text{Negative correlation — older cars tend to have lower resale values.}"
        },
        {
          step: "(c) Shoe size vs IQ",
          math: "\\text{Zero/no correlation — shoe size and intelligence are unrelated.}"
        }
      ]
    }
  },
  {
    id: "pmcc",
    icon: "r",
    title: "Product Moment Correlation Coefficient",
    subtitle: "Pearson's r: measuring linear correlation strength",
    color: "#a78bfa",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `The **Product Moment Correlation Coefficient (PMCC)**, denoted $r$, measures the **strength and direction** of the **linear** relationship between two variables.

**Key properties of $r$:**
$$-1 \\leq r \\leq 1$$

| Value of $r$ | Interpretation |
|---|---|
| $r = 1$ | Perfect positive linear correlation |
| $r = -1$ | Perfect negative linear correlation |
| $r = 0$ | No linear correlation |
| $0.7 \\leq r < 1$ | Strong positive correlation |
| $0 < r < 0.3$ | Weak positive correlation |

**Formula:**
$$r = \\frac{S_{xy}}{\\sqrt{S_{xx}\\, S_{yy}}}$$

where the summary statistics are:
$$S_{xy} = \\sum xy - \\frac{\\sum x \\sum y}{n}$$
$$S_{xx} = \\sum x^2 - \\frac{(\\sum x)^2}{n}$$
$$S_{yy} = \\sum y^2 - \\frac{(\\sum y)^2}{n}$$

In exam questions you will usually be given the values of $S_{xy}$, $S_{xx}$, and $S_{yy}$ (or the raw summary statistics $\\sum x$, $\\sum y$, $\\sum xy$, $\\sum x^2$, $\\sum y^2$, and $n$) rather than all individual data points.

**Important:** PMCC only measures **linear** correlation. Two variables can have a strong non-linear relationship (e.g. quadratic) yet give $r \\approx 0$.`,
    formulas: [
      {
        label: "PMCC",
        latex: "r = \\frac{S_{xy}}{\\sqrt{S_{xx}\\, S_{yy}}}",
        note: "$-1 \\leq r \\leq 1$; sign gives direction, magnitude gives strength."
      },
      {
        label: "Sxy",
        latex: "S_{xy} = \\sum xy - \\frac{\\sum x \\sum y}{n}",
        note: "Cross-product deviation from means."
      },
      {
        label: "Sxx",
        latex: "S_{xx} = \\sum x^2 - \\frac{(\\sum x)^2}{n}",
        note: "Sum of squared deviations of $x$ from its mean."
      },
      {
        label: "Syy",
        latex: "S_{yy} = \\sum y^2 - \\frac{(\\sum y)^2}{n}",
        note: "Sum of squared deviations of $y$ from its mean."
      }
    ],
    example: {
      question: "Given $n = 5$, $\\sum x = 25$, $\\sum y = 30$, $\\sum xy = 162$, $\\sum x^2 = 135$, $\\sum y^2 = 190$. Calculate $r$ and interpret its value.",
      steps: [
        {
          label: "Calculate Sxy",
          math: "S_{xy} = 162 - \\frac{25 \\times 30}{5} = 162 - 150 = 12"
        },
        {
          label: "Calculate Sxx",
          math: "S_{xx} = 135 - \\frac{25^2}{5} = 135 - 125 = 10"
        },
        {
          label: "Calculate Syy",
          math: "S_{yy} = 190 - \\frac{30^2}{5} = 190 - 180 = 10"
        },
        {
          label: "Calculate r",
          math: "r = \\frac{12}{\\sqrt{10 \\times 10}} = \\frac{12}{10} = 0.6"
        },
        {
          label: "Interpret",
          math: "r = 0.6 \\Rightarrow \\text{moderate positive linear correlation between } x \\text{ and } y"
        }
      ]
    },
    practice: {
      question: "$n = 6$, $\\sum x = 42$, $\\sum y = 60$, $\\sum xy = 450$, $\\sum x^2 = 308$, $\\sum y^2 = 614$. Calculate $r$ and state the type of correlation.",
      solution: [
        {
          step: "Calculate Sxy",
          math: "S_{xy} = 450 - \\frac{42 \\times 60}{6} = 450 - 420 = 30"
        },
        {
          step: "Calculate Sxx",
          math: "S_{xx} = 308 - \\frac{42^2}{6} = 308 - \\frac{1764}{6} = 308 - 294 = 14"
        },
        {
          step: "Calculate Syy",
          math: "S_{yy} = 614 - \\frac{60^2}{6} = 614 - 600 = 14"
        },
        {
          step: "Calculate r",
          math: "r = \\frac{30}{\\sqrt{14 \\times 14}} = \\frac{30}{14} \\approx 0.857"
        },
        {
          step: "Interpret",
          math: "r \\approx 0.857 \\Rightarrow \\text{strong positive linear correlation}"
        }
      ]
    }
  },
  {
    id: "linear-regression",
    icon: "y=a+bx",
    title: "Linear Regression",
    subtitle: "Least squares regression line and interpretation",
    color: "#a78bfa",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `The **regression line of $y$ on $x$** is the straight line of best fit that minimises the sum of squared **vertical** distances (residuals) from the data points to the line. It is given by:
$$\\hat{y} = a + bx$$

**Gradient ($b$):**
$$b = \\frac{S_{xy}}{S_{xx}}$$

**Intercept ($a$):**
$$a = \\bar{y} - b\\bar{x}$$

The regression line always passes through the **mean point** $(\\bar{x},\\, \\bar{y})$.

**Using the regression line:**
Substitute a value of $x$ into $\\hat{y} = a + bx$ to predict the corresponding value of $y$.

**Interpolation vs Extrapolation:**
- **Interpolation**: predicting $y$ for an $x$ value **within** the range of the original data. This is generally reliable.
- **Extrapolation**: predicting $y$ for an $x$ value **outside** the range of the original data. This is unreliable — the linear relationship may not hold beyond the observed range.

**Important — which regression line to use:**
The regression line of $y$ on $x$ is used to predict $y$ from $x$. If you want to predict $x$ from $y$, you need the regression line of $x$ on $y$ (a different line). Do not use the $y$ on $x$ line to predict $x$ values.

**Interpreting the gradient:** The gradient $b$ represents the change in $y$ for a one-unit increase in $x$, in the context of the data.`,
    formulas: [
      {
        label: "Regression Line",
        latex: "\\hat{y} = a + bx",
        note: "$\\hat{y}$ denotes the predicted value of $y$; the hat indicates an estimate."
      },
      {
        label: "Gradient",
        latex: "b = \\frac{S_{xy}}{S_{xx}}",
        note: "Rate of change of $y$ with respect to $x$."
      },
      {
        label: "Intercept",
        latex: "a = \\bar{y} - b\\bar{x}",
        note: "The line always passes through $(\\bar{x}, \\bar{y})$."
      }
    ],
    example: {
      question: "Given $S_{xy} = 12$, $S_{xx} = 10$, $\\bar{x} = 5$, $\\bar{y} = 6$. Find the equation of the regression line of $y$ on $x$ and predict $y$ when $x = 7$.",
      steps: [
        {
          label: "Calculate gradient b",
          math: "b = \\frac{S_{xy}}{S_{xx}} = \\frac{12}{10} = 1.2"
        },
        {
          label: "Calculate intercept a",
          math: "a = \\bar{y} - b\\bar{x} = 6 - 1.2 \\times 5 = 6 - 6 = 0"
        },
        {
          label: "Write regression line",
          math: "\\hat{y} = 1.2x"
        },
        {
          label: "Predict y when x = 7",
          math: "\\hat{y} = 1.2 \\times 7 = 8.4"
        }
      ]
    },
    practice: {
      question: "Given $S_{xy} = 30$, $S_{xx} = 14$, $\\bar{x} = 7$, $\\bar{y} = 10$. Find the regression line of $y$ on $x$ and predict $y$ when $x = 8$.",
      solution: [
        {
          step: "Calculate gradient b",
          math: "b = \\frac{30}{14} = \\frac{15}{7} \\approx 2.14"
        },
        {
          step: "Calculate intercept a",
          math: "a = 10 - \\frac{15}{7} \\times 7 = 10 - 15 = -5"
        },
        {
          step: "Write regression line",
          math: "\\hat{y} = 2.14x - 5"
        },
        {
          step: "Predict y when x = 8",
          math: "\\hat{y} = 2.14 \\times 8 - 5 = 17.12 - 5 = 12.12"
        }
      ]
    }
  }
];
