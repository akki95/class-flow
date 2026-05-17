// FILE: src/data/stats/probability.js

export const CHAPTER_META = {
  id: "probability",
  title: "Probability",
  subtitle: "Venn diagrams, tree diagrams and conditional probability",
  icon: "🎲",
  color: "#c084fc",
  paper: "Statistics",
};

export const CHAPTER_TOPICS = [
  {
    id: "basic-probability",
    icon: "P",
    title: "Basic Probability",
    subtitle: "Sample spaces and probability rules",
    color: "#c084fc",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `For a random experiment, the **sample space** S contains all possible outcomes. For an event A:

$$P(A) = \\frac{n(A)}{n(S)}$$

when outcomes are **equally likely**, where $n(A)$ is the number of outcomes in A and $n(S)$ is the total number of outcomes.

Probability always satisfies $0 \\le P(A) \\le 1$, with $P(S)=1$ and $P(\\emptyset)=0$.

The **complement** of A is A' (the event that A does NOT occur):

$$P(A') = 1 - P(A)$$

For any two events A and B, the **addition rule** (also called the inclusion-exclusion principle) gives:

$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

The term $P(A \\cap B)$ is subtracted because outcomes in both A and B are counted twice if we simply add $P(A)$ and $P(B)$.`,
    formulas: [
      { label: "Basic probability", latex: "P(A) = \\frac{n(A)}{n(S)}" },
      { label: "Complement rule", latex: "P(A') = 1 - P(A)" },
      { label: "Addition rule", latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)" },
    ],
    example: {
      question: "In a class of 30 students, 18 study French, 12 study German, and 5 study both. Find the probability that a randomly chosen student studies French or German.",
      steps: [
        { label: "Define events", math: "F = \\text{studies French},\\quad G = \\text{studies German}" },
        { label: "Write known probabilities", math: "P(F) = \\frac{18}{30},\\quad P(G) = \\frac{12}{30},\\quad P(F \\cap G) = \\frac{5}{30}" },
        { label: "Apply the addition rule", math: "P(F \\cup G) = \\frac{18}{30} + \\frac{12}{30} - \\frac{5}{30}" },
        { label: "Simplify", math: "P(F \\cup G) = \\frac{25}{30} = \\frac{5}{6}" },
      ],
    },
    practice: {
      question: "P(A) = 0.6, P(B) = 0.5, P(A ∩ B) = 0.3. Find (a) P(A ∪ B), (b) P(A'), (c) P(A' ∩ B').",
      solution: [
        { step: "Part (a): Apply the addition rule", math: "P(A \\cup B) = 0.6 + 0.5 - 0.3 = 0.8" },
        { step: "Part (b): Use the complement rule", math: "P(A') = 1 - P(A) = 1 - 0.6 = 0.4" },
        { step: "Part (c): Note that A' ∩ B' = (A ∪ B)' by De Morgan's law", math: "P(A' \\cap B') = 1 - P(A \\cup B) = 1 - 0.8 = 0.2" },
      ],
    },
  },
  {
    id: "venn-diagrams",
    icon: "⊆",
    title: "Venn Diagrams",
    subtitle: "Union, intersection and complement",
    color: "#c084fc",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Venn diagrams use overlapping circles drawn inside a rectangle (which represents the sample space S) to show relationships between events.

- The **intersection** $A \\cap B$ is the region where both circles overlap — outcomes in both A and B.
- The **union** $A \\cup B$ covers all of A and all of B combined.
- The **complement** A' is everything inside the rectangle but outside circle A.

A useful identity for "in A but not B":

$$P(A \\cap B') = P(A) - P(A \\cap B)$$

For **mutually exclusive** events, the circles do not overlap at all:

$$A \\cap B = \\emptyset \\quad \\Rightarrow \\quad P(A \\cap B) = 0$$

so the addition rule simplifies to $P(A \\cup B) = P(A) + P(B)$.

For the region outside both circles (neither A nor B), apply De Morgan's law:

$$P(A' \\cap B') = 1 - P(A \\cup B)$$

When filling in a Venn diagram always start with the innermost region ($A \\cap B$) and work outwards.`,
    formulas: [
      { label: "A only (A but not B)", latex: "P(A \\cap B') = P(A) - P(A \\cap B)" },
      { label: "Mutually exclusive union", latex: "P(A \\cup B) = P(A) + P(B)", note: "only when A ∩ B = ∅" },
      { label: "Neither A nor B", latex: "P(A' \\cap B') = 1 - P(A \\cup B)" },
    ],
    example: {
      question: "P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2. Find P(A only), P(B only) and P(neither A nor B).",
      steps: [
        { label: "Find P(A only) = P(A ∩ B')", math: "P(A \\cap B') = 0.5 - 0.2 = 0.3" },
        { label: "Find P(B only) = P(B ∩ A')", math: "P(B \\cap A') = 0.4 - 0.2 = 0.2" },
        { label: "Find P(A ∪ B)", math: "P(A \\cup B) = 0.5 + 0.4 - 0.2 = 0.7" },
        { label: "Find P(neither)", math: "P(A' \\cap B') = 1 - 0.7 = 0.3" },
        { label: "Check: all four regions sum to 1", math: "0.3 + 0.2 + 0.2 + 0.3 = 1.0 \\checkmark" },
      ],
    },
    practice: {
      question: "In a survey of 100 people: 60 like coffee (C), 45 like tea (T), 25 like both. Find the probability that a randomly chosen person likes exactly one of the two drinks.",
      solution: [
        { step: "Find 'coffee only' region", math: "n(C \\text{ only}) = 60 - 25 = 35" },
        { step: "Find 'tea only' region", math: "n(T \\text{ only}) = 45 - 25 = 20" },
        { step: "Find 'neither' region", math: "n(\\text{neither}) = 100 - 35 - 25 - 20 = 20" },
        { step: "Probability of exactly one drink", math: "P(\\text{exactly one}) = \\frac{35 + 20}{100} = \\frac{55}{100} = 0.55" },
      ],
    },
  },
  {
    id: "tree-diagrams",
    icon: "🌲",
    title: "Tree Diagrams",
    subtitle: "Sequential events and combined probability",
    color: "#c084fc",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Tree diagrams show the outcomes of **sequential events** and their probabilities in a clear branching structure.

**How to use tree diagrams:**
- Each set of branches from a node represents the possible outcomes of one event.
- The probability on each branch is the **conditional probability** given everything that happened on the path before it.
- The probabilities on all branches from any single node must **sum to 1**.

**Multiplication rule (along branches):**

$$P(A \\cap B) = P(A) \\times P(B|A)$$

Multiply the probabilities along a path to find the **joint probability** at that end node.

**Addition rule (across branches):**

To find the probability of an event that can happen in multiple ways, **add** the end-node probabilities for all paths that correspond to that event.

This combination of multiplying along and adding across is the core technique for all tree diagram problems.`,
    formulas: [
      { label: "Multiply along branches", latex: "P(A \\cap B) = P(A) \\times P(B|A)" },
      { label: "Add across branches", latex: "P(\\text{event}) = \\sum_{\\text{paths giving event}} P(\\text{path})" },
    ],
    example: {
      question: "A bag contains 4 red balls and 6 blue balls. Two balls are drawn without replacement. Find P(both balls are the same colour).",
      steps: [
        { label: "First draw probabilities", math: "P(R_1) = \\frac{4}{10},\\quad P(B_1) = \\frac{6}{10}" },
        { label: "P(both red) — multiply along RR branch", math: "P(R_1 \\cap R_2) = \\frac{4}{10} \\times \\frac{3}{9} = \\frac{12}{90}" },
        { label: "P(both blue) — multiply along BB branch", math: "P(B_1 \\cap B_2) = \\frac{6}{10} \\times \\frac{5}{9} = \\frac{30}{90}" },
        { label: "Add the two paths (same colour)", math: "P(\\text{same colour}) = \\frac{12}{90} + \\frac{30}{90} = \\frac{42}{90} = \\frac{7}{15}" },
      ],
    },
    practice: {
      question: "P(rain on Monday) = 0.3. If it rains on Monday, P(rain on Tuesday) = 0.6. If it is dry on Monday, P(rain on Tuesday) = 0.2. Find P(it rains on exactly one of the two days).",
      solution: [
        { step: "Path 1: Rain Monday, Dry Tuesday", math: "P(R \\cap D) = 0.3 \\times 0.4 = 0.12" },
        { step: "Path 2: Dry Monday, Rain Tuesday", math: "P(D \\cap R) = 0.7 \\times 0.2 = 0.14" },
        { step: "Add the two paths", math: "P(\\text{exactly one day}) = 0.12 + 0.14 = 0.26" },
      ],
    },
  },
  {
    id: "mut-exc-independent",
    icon: "⊥",
    title: "Mutually Exclusive & Independent Events",
    subtitle: "Testing independence and mutual exclusivity",
    color: "#c084fc",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Mutually exclusive events** cannot both occur at the same time:

$$P(A \\cap B) = 0$$

On a Venn diagram the circles do not overlap. The addition rule simplifies: $P(A \\cup B) = P(A) + P(B)$.

**Independent events** are events where the occurrence of one does NOT affect the probability of the other:

$$P(A \\cap B) = P(A) \\times P(B)$$

An equivalent condition is $P(A|B) = P(A)$ — knowing B occurred gives no information about A.

**To test independence:** check whether $P(A \\cap B) = P(A) \\times P(B)$.

**To test mutual exclusivity:** check whether $P(A \\cap B) = 0$.

**Important distinction:** Mutually exclusive events with $P(A) > 0$ and $P(B) > 0$ are **never** independent. If A and B cannot both happen, then knowing A happened tells you B definitely did not — so they influence each other. Do not confuse the two concepts.`,
    formulas: [
      { label: "Mutually exclusive", latex: "P(A \\cap B) = 0" },
      { label: "Independent events", latex: "P(A \\cap B) = P(A) \\times P(B)" },
      { label: "Independent consequence", latex: "P(A|B) = P(A)" },
    ],
    example: {
      question: "P(A) = 0.4, P(B) = 0.3, P(A ∩ B) = 0.12. Test whether A and B are independent.",
      steps: [
        { label: "Calculate P(A) × P(B)", math: "P(A) \\times P(B) = 0.4 \\times 0.3 = 0.12" },
        { label: "Compare with P(A ∩ B)", math: "P(A \\cap B) = 0.12 = P(A) \\times P(B) \\checkmark" },
        { label: "Conclusion", math: "\\text{Since } P(A \\cap B) = P(A) \\times P(B), \\text{ A and B are independent.}" },
      ],
    },
    practice: {
      question: "P(A) = 0.5, P(B) = 0.4, P(A ∪ B) = 0.7. (a) Find P(A ∩ B). (b) Are A and B independent? (c) Are they mutually exclusive?",
      solution: [
        { step: "Part (a): Rearrange the addition rule", math: "P(A \\cap B) = P(A) + P(B) - P(A \\cup B) = 0.5 + 0.4 - 0.7 = 0.2" },
        { step: "Part (b): Test independence", math: "P(A) \\times P(B) = 0.5 \\times 0.4 = 0.2 = P(A \\cap B) \\checkmark" },
        { step: "Independence conclusion", math: "\\text{A and B are independent.}" },
        { step: "Part (c): Test mutual exclusivity", math: "P(A \\cap B) = 0.2 \\ne 0" },
        { step: "Mutual exclusivity conclusion", math: "\\text{A and B are NOT mutually exclusive.}" },
      ],
    },
  },
  {
    id: "conditional-probability",
    icon: "P|",
    title: "Conditional Probability",
    subtitle: "P(A|B) and Bayes' approach",
    color: "#c084fc",
    visualization: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **conditional probability** of event A given that event B has already occurred is:

$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

This can be rearranged to give the **product rule**:

$$P(A \\cap B) = P(B) \\times P(A|B)$$

For **independent** events, knowing B occurred gives no information about A, so $P(A|B) = P(A)$.

In tree diagrams, the probabilities written on branches after the first event are conditional probabilities.

The **law of total probability** is used when event A can happen via two mutually exclusive routes through B or B':

$$P(A) = P(A|B)\\,P(B) + P(A|B')\\,P(B')$$

This is the formula underlying all "given the result, find the cause" (reverse conditional) calculations, sometimes called **Bayes' theorem**:

$$P(B|A) = \\frac{P(A|B)\\,P(B)}{P(A)}$$`,
    formulas: [
      { label: "Conditional probability", latex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}" },
      { label: "Product rule", latex: "P(A \\cap B) = P(B) \\times P(A|B)" },
      { label: "Total probability", latex: "P(A) = P(A|B)\\,P(B) + P(A|B')\\,P(B')" },
    ],
    example: {
      question: "P(A ∩ B) = 0.15, P(B) = 0.5, P(A) = 0.4. Find P(A|B) and P(B|A).",
      steps: [
        { label: "Find P(A|B)", math: "P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.15}{0.5} = 0.3" },
        { label: "Find P(B|A)", math: "P(B|A) = \\frac{P(A \\cap B)}{P(A)} = \\frac{0.15}{0.4} = 0.375" },
      ],
    },
    practice: {
      question: "On rainy days, P(late to work) = 0.2. On dry days, P(late to work) = 0.05. P(rain on any given day) = 0.3. Find (a) P(late to work), (b) P(it rained | person was late).",
      solution: [
        { step: "Part (a): Apply the law of total probability", math: "P(\\text{late}) = P(\\text{late}|\\text{rain})\\,P(\\text{rain}) + P(\\text{late}|\\text{dry})\\,P(\\text{dry})" },
        { step: "Substitute values", math: "P(\\text{late}) = 0.2 \\times 0.3 + 0.05 \\times 0.7 = 0.06 + 0.035 = 0.095" },
        { step: "Part (b): Apply conditional probability (Bayes)", math: "P(\\text{rain}|\\text{late}) = \\frac{P(\\text{late} \\cap \\text{rain})}{P(\\text{late})} = \\frac{0.06}{0.095}" },
        { step: "Calculate", math: "P(\\text{rain}|\\text{late}) \\approx 0.632" },
      ],
    },
  },
];
