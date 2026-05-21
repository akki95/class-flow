export const CHAPTER_META = {
  id: "gcse-probability-67",
  title: "Probability",
  subtitle: "Tree Diagrams, Conditional Probability and Set Notation",
  icon: "🎲",
  color: "#f59e0b",
  grade: "6-7",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "tree-diagrams-67",
    icon: "🌳",
    title: "Tree Diagrams (Dependent Events)",
    subtitle: "With and without replacement",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Tree diagrams show sequential probabilities for two or more events.

**Rules:**
- **Multiply** along branches → $P(A \\text{ AND } B)$
- **Add** end results for OR scenarios

**With replacement:** Probabilities stay the same at every stage — the denominator is unchanged.

**Without replacement:** Probabilities change — the denominator decreases by 1, and the numerator may also change depending on what was picked first.

**Conditional probability from a tree:**
$$P(A \\cap B) = P(A) \\times P(B|A)$$

Always read the question carefully to determine whether replacement is used — it changes every branch probability in the second stage.`,
    formulas: [
      {
        label: "Multiplication rule",
        latex: "P(A \\cap B) = P(A) \\times P(B|A)",
      },
      {
        label: "With replacement",
        latex: "P(B|A) = P(B) \\quad \\text{(unchanged)}",
      },
    ],
    example: {
      question:
        "A bag contains 4 red and 3 blue balls. Two balls are drawn without replacement. Find the probability that both balls are the same colour.",
      solution: `**P(both red):**
$$P(RR) = \\frac{4}{7} \\times \\frac{3}{6} = \\frac{12}{42}$$

**P(both blue):**
$$P(BB) = \\frac{3}{7} \\times \\frac{2}{6} = \\frac{6}{42}$$

$$P(\\text{same colour}) = \\frac{12}{42} + \\frac{6}{42} = \\frac{18}{42} = \\frac{3}{7}$$`,
    },
    practice: {
      question:
        "A box contains 5 green and 3 yellow sweets. Two sweets are taken without replacement. Find $P(\\text{both different colours})$.",
      solution: `**P(green then yellow):**
$$P(GY) = \\frac{5}{8} \\times \\frac{3}{7} = \\frac{15}{56}$$

**P(yellow then green):**
$$P(YG) = \\frac{3}{8} \\times \\frac{5}{7} = \\frac{15}{56}$$

$$P(\\text{different colours}) = \\frac{15}{56} + \\frac{15}{56} = \\frac{30}{56} = \\frac{15}{28}$$`,
    },
  },
  {
    id: "conditional-prob-67",
    icon: "🔗",
    title: "Conditional Probability & Venn Diagrams",
    subtitle: "P(A|B), Venn diagrams and two-way tables",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Conditional probability** — the probability of $A$ given that $B$ has already occurred:

$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

**Key idea:** When you are told $B$ has happened, you **restrict the sample space** to $B$ and ask what fraction of $B$ also satisfies $A$.

**Venn diagrams:** Two overlapping circles inside a rectangle (the universal set).
- $A$ only region: $P(A) - P(A \\cap B)$
- $B$ only region: $P(B) - P(A \\cap B)$
- Overlap: $P(A \\cap B)$
- Neither: $1 - P(A \\cup B)$

**Two-way tables:** Read off frequencies carefully. For conditional probability, restrict to the relevant row or column.`,
    formulas: [
      {
        label: "Conditional probability",
        latex: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
      },
      {
        label: "Multiplication rule",
        latex: "P(A \\cap B) = P(A|B) \\times P(B)",
      },
    ],
    example: {
      question:
        "$P(A) = 0.6$, $P(B) = 0.4$, $P(A \\cap B) = 0.3$. Find $P(A|B)$.",
      solution: `$$P(A|B) = \\frac{P(A \\cap B)}{P(B)} = \\frac{0.3}{0.4} = 0.75$$`,
    },
    practice: {
      question:
        "In a class of 30 students: 18 study French, 12 study German, 8 study both. A student is chosen at random. Given that they study French, find the probability that they also study German.",
      solution: `Restrict the sample space to French students: there are 18.

Of these 18, 8 also study German.

$$P(\\text{German} | \\text{French}) = \\frac{8}{18} = \\frac{4}{9}$$`,
    },
  },
  {
    id: "set-notation",
    icon: "∪",
    title: "Set Notation & Probability Rules",
    subtitle: "Union, intersection, complement and independence",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Set notation:**
- $A \\cup B$ = $A$ **or** $B$ (or both) — union
- $A \\cap B$ = $A$ **and** $B$ — intersection
- $A'$ = **not** $A$ — complement

**Addition rule (general):**
$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$

**Mutually exclusive events** (cannot both occur, $A \\cap B = \\emptyset$):
$$P(A \\cup B) = P(A) + P(B)$$

**Independence test:** $A$ and $B$ are independent if and only if:
$$P(A \\cap B) = P(A) \\times P(B)$$

To check independence, calculate $P(A) \\times P(B)$ and compare to $P(A \\cap B)$. If equal, they are independent.

**Venn diagram regions:** Draw two overlapping circles to visualise $A$ only, $B$ only, $A \\cap B$, and neither.`,
    formulas: [
      {
        label: "Addition rule",
        latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      },
      {
        label: "Independence test",
        latex: "P(A \\cap B) = P(A) \\times P(B)",
      },
      {
        label: "Complement",
        latex: "P(A') = 1 - P(A)",
      },
    ],
    example: {
      question:
        "$P(A) = 0.5$, $P(B) = 0.4$, $P(A \\cap B) = 0.2$. (a) Find $P(A \\cup B)$. (b) Are $A$ and $B$ independent?",
      solution: `**(a)**
$$P(A \\cup B) = 0.5 + 0.4 - 0.2 = 0.7$$

**(b)** Check: $P(A) \\times P(B) = 0.5 \\times 0.4 = 0.2 = P(A \\cap B)$ ✓

Since $P(A \\cap B) = P(A) \\times P(B)$, **$A$ and $B$ are independent**.`,
    },
    practice: {
      question:
        "$P(C) = 0.3$, $P(D) = 0.5$, $P(C \\cup D) = 0.65$. Find $P(C \\cap D)$ and state whether $C$ and $D$ are independent.",
      solution: `Using the addition rule:

$$P(C \\cap D) = P(C) + P(D) - P(C \\cup D) = 0.3 + 0.5 - 0.65 = 0.15$$

**Independence check:** $P(C) \\times P(D) = 0.3 \\times 0.5 = 0.15 = P(C \\cap D)$ ✓

Since $P(C \\cap D) = P(C) \\times P(D)$, **$C$ and $D$ are independent**.`,
    },
  },
];
