export const CHAPTER_META = {
  id: "cambridge-core-number",
  title: "Number",
  subtitle: "Integers, fractions, percentages, ratio, powers and standard form",
  icon: "🔢",
  color: "#6366f1",
  tier: "Core",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "integers-factors",
    icon: "🔢",
    title: "Integers, Factors & Multiples",
    subtitle: "Primes, HCF, LCM and prime factorisation",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Natural numbers** are positive integers (1, 2, 3, …). **Integers** include negative numbers and zero (…−2, −1, 0, 1, 2, …).

**Prime numbers** have exactly two factors: 1 and themselves. The first primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, … Note that 2 is the only even prime.

**Composite numbers** have more than two factors. The number **1 is neither prime nor composite**.

**Prime factorisation** expresses any integer as a product of primes. Use a factor tree to break the number into prime branches repeatedly until all branches are prime.

$$36 = 2 \times 2 \times 3 \times 3 = 2^2 \times 3^2$$

**HCF (Highest Common Factor):** The largest factor shared by two or more numbers. To find it:
1. Write each number as a product of prime factors.
2. Identify the prime factors that appear in **both** lists.
3. Multiply together, using the **lower** power of each shared prime.

**LCM (Lowest Common Multiple):** The smallest multiple shared by two or more numbers. To find it:
1. Write each number as a product of prime factors.
2. Take **all** prime factors that appear in **either** list.
3. Use the **highest** power of each prime and multiply.

A useful check: $\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b$.`,
    formulas: [
      {
        label: "HCF",
        latex: "\\text{HCF} = \\text{product of shared prime factors (lowest powers)}",
      },
      {
        label: "LCM",
        latex: "\\text{LCM} = \\text{product of all prime factors (highest powers)}",
      },
      {
        label: "Check",
        latex: "\\text{HCF}(a,b) \\times \\text{LCM}(a,b) = a \\times b",
      },
    ],
    example: {
      question: "Find the HCF and LCM of 24 and 36.",
      solution: `**Prime factorisations:**
$24 = 2^3 \\times 3$
$36 = 2^2 \\times 3^2$

**HCF:** shared primes with lowest powers $= 2^2 \\times 3 = 4 \\times 3 = \\mathbf{12}$

**LCM:** all primes with highest powers $= 2^3 \\times 3^2 = 8 \\times 9 = \\mathbf{72}$

**Check:** $24 \\times 36 = 864$ and $12 \\times 72 = 864$ ✓`,
    },
    practice: {
      question: "Find the HCF and LCM of 48 and 60.",
      solution: `**Prime factorisations:**
$48 = 2^4 \\times 3$
$60 = 2^2 \\times 3 \\times 5$

**HCF:** $2^2 \\times 3 = \\mathbf{12}$

**LCM:** $2^4 \\times 3 \\times 5 = 16 \\times 15 = \\mathbf{240}$

**Check:** $48 \\times 60 = 2880$ and $12 \\times 240 = 2880$ ✓`,
    },
  },
  {
    id: "fdp-core",
    icon: "💯",
    title: "Fractions, Decimals & Percentages",
    subtitle: "Converting, calculating and applying FDP",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Fractions, decimals and percentages are three ways of expressing the **same value**.

**Conversions:**
- Fraction → Decimal: divide numerator by denominator
- Decimal → Percentage: multiply by 100
- Percentage → Fraction: write over 100 and simplify

**Key equivalents to memorise:**

| Fraction | Decimal | Percentage |
|----------|---------|------------|
| $\\frac{1}{2}$ | 0.5 | 50% |
| $\\frac{1}{4}$ | 0.25 | 25% |
| $\\frac{3}{4}$ | 0.75 | 75% |
| $\\frac{1}{5}$ | 0.2 | 20% |
| $\\frac{1}{3}$ | $0.\\overline{3}$ | $33\\tfrac{1}{3}$% |
| $\\frac{1}{10}$ | 0.1 | 10% |

**Percentage of an amount:** multiply the amount by the percentage written as a decimal.
$$35\\%\\text{ of }80 = 0.35 \\times 80 = 28$$

**Percentage increase/decrease** uses a **multiplier**:
$$\\text{multiplier} = 1 + \\frac{r}{100} \\;(\\text{increase}), \\quad 1 - \\frac{r}{100} \\;(\\text{decrease})$$
$$\\text{new value} = \\text{original} \\times \\text{multiplier}$$

**Reverse percentage** — finding the original value before a change:
$$\\text{original} = \\frac{\\text{new value}}{\\text{multiplier}}$$`,
    formulas: [
      {
        label: "Percentage of amount",
        latex: "\\text{amount} \\times \\frac{\\%}{100}",
      },
      {
        label: "Multiplier (increase)",
        latex: "1 + \\frac{r}{100}",
      },
      {
        label: "Multiplier (decrease)",
        latex: "1 - \\frac{r}{100}",
      },
      {
        label: "Reverse percentage",
        latex: "\\text{original} = \\frac{\\text{new value}}{\\text{multiplier}}",
      },
    ],
    example: {
      question: "A shirt costs $48 after a 20% discount. Find the original price.",
      solution: `A 20% **decrease** uses multiplier $= 1 - 0.20 = 0.8$.

$$\\text{original} = \\frac{48}{0.8} = \\mathbf{\\$60}$$

**Check:** $60 \\times 0.8 = 48$ ✓`,
    },
    practice: {
      question: "Increase $350 by 12%, then decrease the result by 10%. Find the final amount.",
      solution: `**Step 1 — Increase by 12%:**
$$350 \\times 1.12 = \\$392$$

**Step 2 — Decrease by 10%:**
$$392 \\times 0.9 = \\mathbf{\\$352.80}$$

Note: the net change is $\\times 1.12 \\times 0.9 = \\times 1.008$, which is a 0.8% overall increase.`,
    },
  },
  {
    id: "ratio-core",
    icon: "⚖️",
    title: "Ratio & Proportion",
    subtitle: "Simplifying ratios, sharing and proportion problems",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **ratio** compares quantities of the **same units**. It is written $a : b$ and simplified by dividing both parts by their HCF.

**Sharing in a ratio:**
1. Find the total number of parts: $a + b$
2. Find the value of one part: $\\text{total} \\div (a + b)$
3. Multiply each ratio value by the value of one part.

**Direct proportion:** as one quantity increases, the other increases at the **same rate**.
$$y = kx \\quad (k \\text{ is constant})$$
If $y$ is directly proportional to $x$, doubling $x$ doubles $y$.

**Inverse proportion:** as one quantity increases, the other **decreases** at the same rate.
$$y = \\frac{k}{x}$$
If $y$ is inversely proportional to $x$, doubling $x$ halves $y$.

**Unitary method:** find the value for **one unit**, then scale to the required number. This works for both direct and inverse proportion.

**Best-buy problems:** find the cost per unit (or units per pound) for each option and compare.`,
    formulas: [
      {
        label: "One part (sharing)",
        latex: "\\text{one part} = \\frac{\\text{total}}{a + b}",
      },
      {
        label: "Direct proportion",
        latex: "y = kx",
      },
      {
        label: "Inverse proportion",
        latex: "y = \\frac{k}{x}",
      },
    ],
    example: {
      question: "Share $240 in the ratio 3 : 5.",
      solution: `**Total parts** $= 3 + 5 = 8$

**One part** $= 240 \\div 8 = \\$30$

$$\\text{First share} = 3 \\times 30 = \\mathbf{\\$90}$$
$$\\text{Second share} = 5 \\times 30 = \\mathbf{\\$150}$$

**Check:** $90 + 150 = 240$ ✓`,
    },
    practice: {
      question: "5 workers take 12 days to complete a job. How long would 8 workers take (assuming they work at a constant rate)?",
      solution: `This is **inverse proportion** — more workers means fewer days.

**Total work** $= 5 \\times 12 = 60$ worker-days

$$\\text{Time for 8 workers} = \\frac{60}{8} = \\mathbf{7.5 \\text{ days}}$$`,
    },
  },
  {
    id: "powers-standard-form",
    icon: "⚡",
    title: "Powers, Roots & Standard Form",
    subtitle: "Index laws, square/cube roots and standard form",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Index (power) notation:** $a^n$ means $a$ multiplied by itself $n$ times.

**Index laws:**
$$a^m \\times a^n = a^{m+n}$$
$$a^m \\div a^n = a^{m-n}$$
$$(a^m)^n = a^{mn}$$
$$a^0 = 1 \\quad (a \\neq 0)$$

**Square numbers** to know: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225.

**Cube numbers** to know: 1, 8, 27, 64, 125, 216.

**Negative indices:** $a^{-n} = \\dfrac{1}{a^n}$

**Standard form** (scientific notation) expresses a number as:
$$A \\times 10^n, \\quad \\text{where } 1 \\le A < 10 \\text{ and } n \\in \\mathbb{Z}$$

- **Large numbers:** positive $n$ (move decimal left to get $A$)
- **Small numbers:** negative $n$ (move decimal right to get $A$)

**Multiplying in standard form:**
$$(A \\times 10^m) \\times (B \\times 10^n) = (A \\times B) \\times 10^{m+n}$$
If $A \\times B \\ge 10$, adjust by writing in proper standard form.

**Dividing in standard form:**
$$(A \\times 10^m) \\div (B \\times 10^n) = \\left(\\frac{A}{B}\\right) \\times 10^{m-n}$$`,
    formulas: [
      {
        label: "Standard form",
        latex: "A \\times 10^n, \\quad 1 \\le A < 10",
      },
      {
        label: "Multiply",
        latex: "(A \\times 10^m) \\times (B \\times 10^n) = AB \\times 10^{m+n}",
      },
      {
        label: "Divide",
        latex: "(A \\times 10^m) \\div (B \\times 10^n) = \\tfrac{A}{B} \\times 10^{m-n}",
      },
      {
        label: "Index laws",
        latex: "a^m \\times a^n = a^{m+n}, \\quad a^m \\div a^n = a^{m-n}, \\quad (a^m)^n = a^{mn}",
      },
    ],
    example: {
      question: "Write 0.000056 in standard form.",
      solution: `Move the decimal point **5 places to the right** to get $A = 5.6$.

Since we moved right, the power is **negative**:

$$0.000056 = \\mathbf{5.6 \\times 10^{-5}}$$`,
    },
    practice: {
      question: "Calculate $(4 \\times 10^8) \\div (5 \\times 10^3)$. Give your answer in standard form.",
      solution: `**Divide the $A$ values:** $4 \\div 5 = 0.8$

**Subtract the powers:** $10^8 \\div 10^3 = 10^5$

$$0.8 \\times 10^5 = \\mathbf{8 \\times 10^4}$$

(Adjust: $0.8 = 8 \\times 10^{-1}$, so $0.8 \\times 10^5 = 8 \\times 10^{-1} \\times 10^5 = 8 \\times 10^4$)`,
    },
  },
];
