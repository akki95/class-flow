// FILE: src/data/stats/dataCollection.js

export const CHAPTER_META = {
  id: "data-collection",
  title: "Data Collection",
  subtitle: "Populations, samples and sampling methods",
  icon: "📋",
  color: "#22d3ee",
  videoUrl: "https://www.youtube.com/watch?v=cM9u_hmYIDI",
  paper: "Statistics",
};

export const CHAPTER_TOPICS = [
  {
    id: "populations-samples",
    icon: "👥",
    title: "Populations & Samples",
    subtitle: "Census vs sample, advantages and disadvantages",
    color: "#22d3ee",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `A **population** is the entire set of items or individuals being studied. A **census** collects data from every single member of the population.

A **sample** is a subset of the population selected to represent the whole. Sampling is used when a full census is impractical.

**Advantages of sampling over a census:**
- Cheaper and quicker to carry out
- Less destructive (e.g. testing light bulbs to destruction would require destroying the entire output if a census were used)
- Manageable when the population is very large

**Advantages of a census over sampling:**
- Results are completely accurate — no sampling error
- Every member is represented, so no bias from selection
- More reliable for small populations

A **sampling unit** is each individual member of the population. A **sampling frame** is the complete list of all sampling units from which the sample is drawn (e.g. the electoral register, a school register). The quality of the sampling frame affects the quality of the sample — if some units are missing, the sample may be biased.

The **sampling fraction** is the ratio of the sample size to the population size:
$$\text{Sampling fraction} = \frac{\text{Sample size}}{\text{Population size}}$$`,
    formulas: [
      {
        label: "Sampling Fraction",
        latex: "\\text{Sampling fraction} = \\frac{\\text{Sample size}}{\\text{Population size}}",
        note: "Not a standard tested formula, but a useful concept for understanding proportional representation."
      }
    ],
    example: {
      question: "A factory produces 10,000 light bulbs per day. Explain why a sample rather than a census should be used to test the lifetime of the bulbs.",
      steps: [
        {
          label: "Identify why a census is unsuitable",
          math: "\\text{Testing lifetime requires running each bulb until it fails (destruction testing).}"
        },
        {
          label: "State the consequence of a census",
          math: "\\text{A census would destroy all 10,000 bulbs, leaving no products to sell.}"
        },
        {
          label: "Justify sampling",
          math: "\\text{A sample is cheaper, faster, and still provides representative data about bulb lifetimes.}"
        }
      ]
    },
    practice: {
      question: "A school has 800 students. Give one advantage and one disadvantage of using a census rather than a sample to find the average time students spend on homework each week.",
      solution: [
        {
          step: "Advantage of census",
          math: "\\text{Results are completely accurate — there is no sampling error as every student is included.}"
        },
        {
          step: "Disadvantage of census",
          math: "\\text{Time-consuming and expensive to collect data from all 800 students.}"
        }
      ]
    }
  },
  {
    id: "sampling-methods",
    icon: "🎲",
    title: "Sampling Methods",
    subtitle: "Simple random, stratified, systematic, opportunity",
    color: "#22d3ee",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `There are several standard sampling methods, each with advantages and disadvantages.

**Simple Random Sampling**
Every member of the population has an equal chance of being selected. A sampling frame is required. Numbers are assigned to each member and selected using random number tables or a random number generator. It is free from bias but may not represent all subgroups well.

**Stratified Sampling**
The population is divided into distinct groups (strata) based on a characteristic (e.g. year group, gender). A sample is then taken from each stratum **in proportion** to its size in the population:
$$n_i = \frac{N_i}{N} \times n$$
where $N_i$ is the stratum size, $N$ is the population size, and $n$ is the total sample size. This ensures each subgroup is proportionally represented.

**Systematic Sampling**
Every $k$th member is selected from an ordered list, where $k = \frac{\text{population size}}{\text{sample size}}$. Start at a randomly chosen point between 1 and $k$. This is quick and easy but can introduce bias if there is a periodic pattern in the list.

**Opportunity (Convenience) Sampling**
The sample consists of those most readily available to the researcher. This is quick and cheap but is likely to be biased as it does not give all members an equal chance of being selected.`,
    formulas: [
      {
        label: "Stratified Sample Size per Stratum",
        latex: "n_i = \\frac{N_i}{N} \\times n",
        note: "Where $N_i$ = size of stratum $i$, $N$ = total population size, $n$ = total sample size required."
      },
      {
        label: "Systematic Sampling Interval",
        latex: "k = \\frac{N}{n}",
        note: "Select every $k$th member; choose a random starting point between 1 and $k$."
      }
    ],
    example: {
      question: "A company has 200 male and 300 female employees. A stratified sample of 50 is required. How many employees should be sampled from each gender group?",
      steps: [
        {
          label: "Find total population",
          math: "N = 200 + 300 = 500"
        },
        {
          label: "Sample from males",
          math: "n_{\\text{male}} = \\frac{200}{500} \\times 50 = 20"
        },
        {
          label: "Sample from females",
          math: "n_{\\text{female}} = \\frac{300}{500} \\times 50 = 30"
        },
        {
          label: "Verify total",
          math: "20 + 30 = 50 \\checkmark"
        }
      ]
    },
    practice: {
      question: "A sixth form has 180 Year 12 students and 120 Year 13 students. A stratified sample of 60 is needed. (a) How many students should be selected from each year group? (b) Give one advantage of stratified sampling over simple random sampling.",
      solution: [
        {
          step: "Total population",
          math: "N = 180 + 120 = 300"
        },
        {
          step: "(a) Year 12 sample",
          math: "n_{12} = \\frac{180}{300} \\times 60 = 36"
        },
        {
          step: "(a) Year 13 sample",
          math: "n_{13} = \\frac{120}{300} \\times 60 = 24"
        },
        {
          step: "(b) Advantage",
          math: "\\text{Ensures the sample is representative of each year group, reducing bias.}"
        }
      ]
    }
  },
  {
    id: "types-of-data",
    icon: "📊",
    title: "Types of Data",
    subtitle: "Qualitative, quantitative, discrete, continuous",
    color: "#22d3ee",
    visualization: null,
    desmosNote: "No Desmos graph needed for this topic.",
    desmosExpressions: [],
    theory: `Understanding data types is essential for choosing appropriate statistical methods and charts.

**Qualitative (Categorical) Data**
Non-numerical, descriptive data. Examples: favourite colour, blood type, opinion on a policy. Cannot be used directly in arithmetic calculations.

**Quantitative Data**
Numerical data arising from measurement or counting. Divided into two types:

- **Discrete data**: can only take specific, separate values (usually whole numbers from counting). Examples: number of children in a family (0, 1, 2, 3, …), shoe size (UK). There are gaps between possible values.

- **Continuous data**: can take any value within a range, limited only by the precision of measurement. Examples: height (cm), time (s), temperature (°C). Recorded to a given degree of accuracy.

**Primary vs Secondary Data**
- **Primary data**: collected directly by the researcher for their specific purpose (e.g. conducting a survey, running an experiment). Reliable but time-consuming and costly.
- **Secondary data**: obtained from existing sources (e.g. government statistics, published research). Cheaper and readily available but may not perfectly fit the research need.

Knowing the data type determines which measures (mean, median, mode) and which diagrams (histograms for continuous, bar charts for discrete/qualitative) are appropriate.`,
    formulas: [
      {
        label: "Data Classification Summary",
        latex: "\\text{Quantitative} \\begin{cases} \\text{Discrete: countable, specific values} \\\\ \\text{Continuous: any value in a range} \\end{cases}",
        note: "No numeric formula — key skill is correct classification."
      }
    ],
    example: {
      question: "Classify each of the following as qualitative or quantitative (and if quantitative, state discrete or continuous): (a) Number of goals scored in a match. (b) Time to complete a race. (c) Favourite colour.",
      steps: [
        {
          label: "(a) Number of goals",
          math: "\\text{Quantitative, discrete — counted in whole numbers (0, 1, 2, \\ldots)}"
        },
        {
          label: "(b) Time to complete a race",
          math: "\\text{Quantitative, continuous — can take any value (e.g. 9.83 s, 9.831 s, \\ldots)}"
        },
        {
          label: "(c) Favourite colour",
          math: "\\text{Qualitative — non-numerical, descriptive category}"
        }
      ]
    },
    practice: {
      question: "A researcher records the following for 100 participants: age (in whole years), shoe size (UK), blood type, reaction time (seconds). Classify each variable as qualitative or quantitative discrete/continuous.",
      solution: [
        {
          step: "Age (whole years)",
          math: "\\text{Quantitative, discrete — recorded in whole numbers only}"
        },
        {
          step: "Shoe size (UK)",
          math: "\\text{Quantitative, discrete — takes specific values (3, 3.5, 4, \\ldots)}"
        },
        {
          step: "Blood type",
          math: "\\text{Qualitative — non-numerical categories (A, B, AB, O)}"
        },
        {
          step: "Reaction time (seconds)",
          math: "\\text{Quantitative, continuous — can take any positive real value}"
        }
      ]
    }
  }
];
