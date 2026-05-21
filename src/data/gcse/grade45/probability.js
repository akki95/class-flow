// FILE: src/data/gcse/grade45/probability.js

export const CHAPTER_META = {
  id: "gcse-probability-45",
  title: "Probability",
  subtitle: "Basic probability, listing outcomes and expected results",
  icon: "🎲",
  color: "#f59e0b",
  grade: "4-5",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "basic-prob",
    icon: "P",
    title: "Basic Probability",
    subtitle: "Probability scale, calculating and listing outcomes",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Probability** measures how likely an event is. It always lies between 0 and 1:
$$0 \\leq P(A) \\leq 1$$
- $P = 0$: impossible.
- $P = 1$: certain.
- $P = 0.5$: equally likely to happen or not.

**Basic probability formula** (for equally likely outcomes):
$$P(A) = \\frac{\\text{number of favourable outcomes}}{\\text{total number of equally likely outcomes}}$$

**Complement:** the probability of an event **not** happening:
$$P(A') = 1 - P(A)$$

**Mutually exclusive events** cannot both happen at the same time:
$$P(A \\text{ or } B) = P(A) + P(B)$$

**Exhaustive events:** all possible outcomes are listed. Their probabilities **sum to 1**.

**Sample space:** the complete list of all possible outcomes.

**Theoretical vs experimental probability:**
- **Theoretical:** calculated from equally likely outcomes.
- **Experimental (relative frequency):** based on results from an actual experiment.
- As the number of trials increases, experimental probability gets closer to theoretical probability.`,
    formulas: [
      { label: "Basic probability", latex: "P(A) = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}" },
      { label: "Complement rule", latex: "P(A') = 1 - P(A)" },
      { label: "Mutually exclusive (or)", latex: "P(A \\text{ or } B) = P(A) + P(B)" },
    ],
    example: {
      question:
        "A bag contains 3 red, 5 blue and 2 green balls. A ball is picked at random. Find P(red) and P(not red).",
      steps: [
        { label: "Total balls", math: "3 + 5 + 2 = 10" },
        { label: "P(red)", math: "P(\\text{red}) = \\frac{3}{10}" },
        { label: "P(not red) using complement", math: "P(\\text{not red}) = 1 - \\frac{3}{10} = \\frac{7}{10}" },
      ],
    },
    practice: {
      question:
        "A fair spinner has sections labelled 1, 2, 3, 4, 5 — each equally likely. Find P(prime number) and P(even number).",
      solution: [
        { step: "List prime numbers from 1 to 5", math: "2, 3, 5 \\quad (\\text{3 primes})" },
        { step: "P(prime)", math: "P(\\text{prime}) = \\frac{3}{5}" },
        { step: "List even numbers from 1 to 5", math: "2, 4 \\quad (\\text{2 even numbers})" },
        { step: "P(even)", math: "P(\\text{even}) = \\frac{2}{5}" },
      ],
    },
  },
  {
    id: "expected-freq",
    icon: "≈",
    title: "Expected Frequency & Relative Frequency",
    subtitle: "Estimating probability from experiments",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Relative frequency** is the experimental estimate of probability, calculated from the results of an experiment:
$$P(\\text{event}) \\approx \\frac{\\text{number of times event occurred}}{\\text{total number of trials}}$$

As the number of trials **increases**, relative frequency gets **closer** to the true theoretical probability. This is the **Law of Large Numbers**.

**Expected frequency** tells you how many times you would expect an event to occur in a given number of trials:
$$\\text{Expected frequency} = \\text{probability} \\times \\text{number of trials}$$

This is a predicted average — the actual result may differ.

**Bias:** if the relative frequency differs noticeably from the theoretical probability after many trials, the experiment may be **biased** (e.g. a weighted die, an unfair coin).

For example, if a fair coin is flipped 1000 times and lands on heads 620 times, the relative frequency $\\frac{620}{1000} = 0.62$ is much higher than the theoretical $0.5$ — suggesting the coin may be biased.`,
    formulas: [
      { label: "Relative frequency", latex: "P(\\text{event}) \\approx \\frac{\\text{frequency}}{\\text{total trials}}" },
      { label: "Expected frequency", latex: "\\text{Expected frequency} = \\text{probability} \\times \\text{number of trials}" },
    ],
    example: {
      question:
        "A fair coin is flipped 200 times. How many heads would you expect?",
      steps: [
        { label: "P(head) for a fair coin", math: "P(\\text{head}) = 0.5" },
        { label: "Expected frequency formula", math: "\\text{Expected frequency} = P \\times \\text{trials}" },
        { label: "Calculate", math: "\\text{Expected heads} = 0.5 \\times 200 = 100" },
      ],
    },
    practice: {
      question:
        "A biased die is known to have P(6) = 0.2. The die is rolled 150 times. How many times would you expect to roll a 6?",
      solution: [
        { step: "State the probability", math: "P(6) = 0.2" },
        { step: "Use expected frequency formula", math: "\\text{Expected frequency} = 0.2 \\times 150" },
        { step: "Calculate", math: "\\text{Expected sixes} = 30 \\text{ times}" },
      ],
    },
  },
  {
    id: "sample-space",
    icon: "⊞",
    title: "Sample Space Diagrams & Two-Way Tables",
    subtitle: "Listing outcomes systematically",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Sample space diagrams** (possibility spaces) are used to list **all possible outcomes** for two events systematically — usually in a grid.

For example, rolling two dice: one die on each axis, giving $6 \\times 6 = 36$ equally likely outcomes.

$$P(\\text{event}) = \\frac{\\text{number of outcomes satisfying the condition}}{\\text{total outcomes in sample space}}$$

**Two-way tables** organise data into rows and columns for two categorical variables. Use known totals to fill in missing values.

**Tree diagrams:**
- Each branch shows one outcome and its probability.
- **With replacement:** the item is returned, so probabilities are the **same** on every branch.
- **Without replacement:** the item is not returned, so probabilities **change** on the second branch (denominator decreases by 1).
- **Multiplying along branches:** $P(A \\text{ and } B) = P(A) \\times P(B|A)$
- **Adding between branches:** use addition for OR events (mutually exclusive paths).`,
    formulas: [
      { label: "Probability from sample space", latex: "P(\\text{event}) = \\frac{\\text{outcomes satisfying condition}}{\\text{total outcomes in sample space}}" },
      { label: "Combined events (tree diagram)", latex: "P(A \\text{ and } B) = P(A) \\times P(B)" },
    ],
    example: {
      question:
        "Two fair dice are rolled. Find P(sum = 7).",
      steps: [
        { label: "Total outcomes in sample space", math: "6 \\times 6 = 36" },
        { label: "List pairs that sum to 7", math: "(1,6),\\ (2,5),\\ (3,4),\\ (4,3),\\ (5,2),\\ (6,1) \\quad = 6 \\text{ pairs}" },
        { label: "Calculate probability", math: "P(\\text{sum} = 7) = \\frac{6}{36} = \\frac{1}{6}" },
      ],
    },
    practice: {
      question:
        "A bag contains 4 red and 6 blue balls. Two balls are drawn at random, with replacement. Find P(both red).",
      solution: [
        { step: "P(red) on first draw", math: "P(\\text{red}) = \\frac{4}{10} = \\frac{2}{5}" },
        { step: "With replacement, P(red) on second draw is the same", math: "P(\\text{red}) = \\frac{2}{5}" },
        { step: "Multiply along the branches", math: "P(\\text{both red}) = \\frac{2}{5} \\times \\frac{2}{5} = \\frac{4}{25}" },
      ],
    },
  },
];
