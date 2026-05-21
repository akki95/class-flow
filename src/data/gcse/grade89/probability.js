export const CHAPTER_META = {
  id: "gcse-prob-89",
  title: "Probability (Grade 8-9)",
  subtitle: "Conditional probability with algebra and complex scenarios",
  icon: "🎲",
  color: "#f59e0b",
  grade: "8-9",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "prob-algebra",
    icon: "🎲",
    title: "Probability with Algebra",
    subtitle: "Setting up and solving equations from probability contexts",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `At Grade 8-9, probability questions involve **unknowns** requiring you to form and solve equations.

**Setting up the equation:**
- Write an expression for the probability in terms of the unknown: e.g. $P(\\text{red}) = \\frac{x}{x+3}$
- Equate to the given probability value.
- For two-stage problems (without replacement), multiply sequential probabilities and equate to the given total.

**Without replacement — two items drawn:**
$$P(\\text{both A}) = \\frac{n}{n+k} \\times \\frac{n-1}{n+k-1}$$

**Steps:**
1. Write the probability expression using the unknown.
2. Form the equation using the given value.
3. Expand and simplify — may give a linear or quadratic equation.
4. Solve using factorisation or the quadratic formula.
5. **Check validity:** the solution must give $0 \\le P \\le 1$ and must make contextual sense (e.g. number of balls must be a positive integer).

**Common traps:**
- Forgetting to adjust the denominator after drawing one ball without replacement.
- Accepting a negative or non-integer solution for a "number of balls" question.
- Not checking both roots of a quadratic.`,
    formulas: [
      {
        label: "Basic probability",
        formula: "P(A) = \\frac{n(A)}{n(S)}",
      },
      {
        label: "All probabilities sum to 1",
        formula: "\\sum P_i = 1",
      },
      {
        label: "Without replacement (two draws)",
        formula: "P(\\text{both A}) = \\frac{n}{n+k} \\times \\frac{n-1}{n+k-1}",
      },
      {
        label: "Validity check",
        formula: "0 \\le P(A) \\le 1 \\quad \\text{and} \\quad n \\in \\mathbb{Z}^+",
      },
    ],
    example: {
      question:
        "A bag has $x$ red balls and 4 blue balls. $P(\\text{red}) = \\frac{3}{7}$. Find $x$.",
      solution: `**Set up the equation:**
$$\\frac{x}{x+4} = \\frac{3}{7}$$

**Cross-multiply:**
$$7x = 3(x+4) = 3x + 12$$

$$4x = 12$$

$$x = 3$$

**Check:** $P(\\text{red}) = \\frac{3}{3+4} = \\frac{3}{7}$ ✓

**Answer: $x = 3$**`,
    },
    practice: {
      question:
        "A bag has $n$ red balls and 5 blue balls. Two balls are drawn without replacement. $P(\\text{both red}) = \\frac{7}{22}$. Find $n$.",
      solution: `**Set up the equation:**
$$\\frac{n}{n+5} \\times \\frac{n-1}{n+4} = \\frac{7}{22}$$

**Cross-multiply:**
$$22n(n-1) = 7(n+5)(n+4)$$

**Expand both sides:**
$$22n^2 - 22n = 7(n^2 + 9n + 20) = 7n^2 + 63n + 140$$

**Rearrange:**
$$22n^2 - 22n - 7n^2 - 63n - 140 = 0$$
$$15n^2 - 85n - 140 = 0$$

**Divide through by 5:**
$$3n^2 - 17n - 28 = 0$$

**Factorise:**
$$(3n + 4)(n - 7) = 0$$

So $n = 7$ or $n = -\\frac{4}{3}$ (reject — must be a positive integer).

**Check:** $P(\\text{both red}) = \\frac{7}{12} \\times \\frac{6}{11} = \\frac{42}{132} = \\frac{7}{22}$ ✓

**Answer: $n = 7$**`,
    },
  },
  {
    id: "conditional-prob-89",
    icon: "🎲",
    title: "Harder Conditional Probability",
    subtitle: "Multi-stage problems and P(A|B) in complex contexts",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Conditional probability** restricts the sample space to the given condition.

$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$

**From a two-way table:** $P(A|B) = \\frac{\\text{value in intersection}}{\\text{total for column/row B}}$

**From a tree diagram (Bayes' approach):**

When you know the *outcome* and need to find the *cause*:

1. Identify all routes through the tree that lead to the observed outcome.
2. Calculate the probability of each route: $P(\\text{route}) = P(\\text{branch}_1) \\times P(\\text{branch}_2)$.
3. Sum all route probabilities to get $P(B)$ (total law of probability):
$$P(B) = P(B|A) \\cdot P(A) + P(B|A') \\cdot P(A')$$
4. Divide the desired route probability by this total:
$$P(A|B) = \\frac{P(A) \\cdot P(B|A)}{P(B)}$$

**Tips:**
- Draw and label the full tree diagram before calculating.
- $P(\\text{rain}|\\text{late})$ is **not** the same as $P(\\text{late}|\\text{rain})$.
- Always compute $P(B)$ using **all** routes, not just one.`,
    formulas: [
      {
        label: "Conditional probability",
        formula: "P(A|B) = \\frac{P(A \\cap B)}{P(B)}",
      },
      {
        label: "Total probability",
        formula: "P(B) = P(B|A)\\cdot P(A) + P(B|A')\\cdot P(A')",
      },
      {
        label: "Bayes' theorem",
        formula: "P(A|B) = \\frac{P(A)\\cdot P(B|A)}{P(B|A)\\cdot P(A) + P(B|A')\\cdot P(A')}",
      },
    ],
    example: {
      question:
        "$P(\\text{late} | \\text{rainy day}) = 0.4$, $P(\\text{late} | \\text{dry day}) = 0.1$, $P(\\text{rain}) = 0.3$. Find $P(\\text{rained} | \\text{was late})$.",
      solution: `**Step 1 — Find $P(\\text{late})$ using the total probability rule:**
$$P(\\text{late}) = P(\\text{late}|\\text{rain}) \\cdot P(\\text{rain}) + P(\\text{late}|\\text{dry}) \\cdot P(\\text{dry})$$
$$= 0.4 \\times 0.3 + 0.1 \\times 0.7 = 0.12 + 0.07 = 0.19$$

**Step 2 — Apply Bayes' theorem:**
$$P(\\text{rain}|\\text{late}) = \\frac{P(\\text{late}|\\text{rain}) \\cdot P(\\text{rain})}{P(\\text{late})} = \\frac{0.12}{0.19} = \\frac{12}{19} \\approx 0.632$$

**Answer: $P(\\text{rained} | \\text{was late}) = \\frac{12}{19} \\approx 0.632$**`,
    },
    practice: {
      question:
        "A factory produces items from machine A (60% of output) and machine B (40% of output). $P(\\text{defective}|A) = 0.02$ and $P(\\text{defective}|B) = 0.05$. An item is found to be defective. Find $P(\\text{from machine B} | \\text{defective})$.",
      solution: `**Step 1 — Find $P(\\text{defective})$:**
$$P(\\text{defective}) = P(\\text{defective}|A) \\cdot P(A) + P(\\text{defective}|B) \\cdot P(B)$$
$$= 0.02 \\times 0.6 + 0.05 \\times 0.4 = 0.012 + 0.020 = 0.032$$

**Step 2 — Apply Bayes' theorem:**
$$P(B|\\text{defective}) = \\frac{P(\\text{defective}|B) \\cdot P(B)}{P(\\text{defective})} = \\frac{0.05 \\times 0.4}{0.032} = \\frac{0.020}{0.032} = \\frac{20}{32} = \\frac{5}{8} = 0.625$$

**Answer: $P(\\text{from machine B} | \\text{defective}) = \\frac{5}{8} = 0.625$**`,
    },
  },
  {
    id: "venn-algebra",
    icon: "🎲",
    title: "Venn Diagrams with Algebra",
    subtitle: "Setting up equations from Venn diagram contexts",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `In Venn diagram problems with unknowns, **assign variables to the unknown regions** and form equations from the given information.

**The four regions of a two-set Venn diagram:**
- $A$ only (inside $A$, outside $B$)
- $A \\cap B$ (inside both)
- $B$ only (inside $B$, outside $A$)
- Neither (outside both circles)

**Key relationships:**
$$\\text{(A only)} + (A \\cap B) + \\text{(B only)} + \\text{neither} = n \\quad \\text{(total)}$$
$$\\text{(A only)} + (A \\cap B) = n(A) \\quad \\text{(total in A)}$$
$$\\text{(B only)} + (A \\cap B) = n(B) \\quad \\text{(total in B)}$$

**Strategy:**
1. Label all four regions with expressions involving your unknown.
2. Use the total to form an equation.
3. Solve and find all region values.
4. **Verify:** all regions must be non-negative and sum to the correct total.

**Conditional probability from Venn diagrams:**
$$P(A | A \\cup B) = \\frac{n(A)}{n(A \\cup B)} = \\frac{\\text{(A only)} + (A \\cap B)}{\\text{(A only)} + (A \\cap B) + \\text{(B only)}}$$`,
    formulas: [
      {
        label: "Four regions sum to total",
        formula: "(A\\text{ only}) + (A\\cap B) + (B\\text{ only}) + \\text{neither} = n",
      },
      {
        label: "Total in set A",
        formula: "n(A) = (A\\text{ only}) + (A\\cap B)",
      },
      {
        label: "Total in set B",
        formula: "n(B) = (B\\text{ only}) + (A\\cap B)",
      },
      {
        label: "Conditional from Venn",
        formula: "P(A | A\\cup B) = \\frac{(A\\text{ only})+(A\\cap B)}{(A\\text{ only})+(A\\cap B)+(B\\text{ only})}",
      },
    ],
    example: {
      question:
        "50 students: 30 study Maths ($M$), 25 study Science ($S$), $x$ study both. $P(M \\text{ only}) = 0.3$. Find $x$, then find the number who study neither.",
      solution: `**Step 1 — Express $M$ only in terms of $x$:**
$$M \\text{ only} = 30 - x$$

**Step 2 — Use the given probability:**
$$\\frac{30 - x}{50} = 0.3$$
$$30 - x = 15$$
$$x = 15$$

**Step 3 — Find all regions:**
- $M$ only $= 30 - 15 = 15$
- $M \\cap S = 15$
- $S$ only $= 25 - 15 = 10$
- Neither $= 50 - 15 - 15 - 10 = 10$

**Check:** $15 + 15 + 10 + 10 = 50$ ✓

**Answer: $x = 15$, neither = 10**`,
    },
    practice: {
      question:
        "80 people are surveyed. 45 drink tea ($T$), 35 drink coffee ($C$), $n$ drink both, and 15 drink neither. Find $n$ and calculate $P(\\text{tea only} | \\text{drinks tea or coffee})$.",
      solution: `**Step 1 — Use the total to find $n$:**
$$\\text{(T only)} + (T\\cap C) + \\text{(C only)} + \\text{neither} = 80$$
$$(45 - n) + n + (35 - n) + 15 = 80$$
$$95 - n = 80$$
$$n = 15$$

**Step 2 — Find all regions:**
- $T$ only $= 45 - 15 = 30$
- $T \\cap C = 15$
- $C$ only $= 35 - 15 = 20$
- Neither $= 15$

**Check:** $30 + 15 + 20 + 15 = 80$ ✓

**Step 3 — Find $P(\\text{tea only} | T \\cup C)$:**

$n(T \\cup C) = 30 + 15 + 20 = 65$

$$P(T \\text{ only} | T \\cup C) = \\frac{30}{65} = \\frac{6}{13}$$

**Answer: $n = 15$, $P(\\text{tea only} | T \\cup C) = \\frac{6}{13}$**`,
    },
  },
];
