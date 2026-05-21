// FILE: src/data/gcse/grade45/number.js

export const CHAPTER_META = {
  id: "gcse-number-45",
  title: "Number",
  subtitle: "Fractions, decimals, percentages, indices and standard form",
  icon: "🔢",
  color: "#6366f1",
  grade: "4-5",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "fdp",
    icon: "%",
    title: "Fractions, Decimals & Percentages",
    subtitle: "Converting and calculating between FDP",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Fractions, decimals and percentages are three ways of expressing the same value.

**Converting between forms:**
- Fraction to decimal: divide the numerator by the denominator. E.g. $\\frac{3}{4} = 3 \\div 4 = 0.75$
- Decimal to percentage: multiply by 100. E.g. $0.75 \\times 100 = 75\\%$
- Percentage to fraction: write over 100 and simplify. E.g. $75\\% = \\frac{75}{100} = \\frac{3}{4}$

**Key equivalences to memorise:**
$$\\frac{1}{2} = 0.5 = 50\\%, \\quad \\frac{1}{4} = 0.25 = 25\\%, \\quad \\frac{3}{4} = 0.75 = 75\\%$$
$$\\frac{1}{3} \\approx 0.\\overline{3} = 33.\\overline{3}\\%, \\quad \\frac{1}{5} = 0.2 = 20\\%, \\quad \\frac{1}{10} = 0.1 = 10\\%$$

**Finding a percentage of an amount:** Convert the percentage to its decimal equivalent and multiply.
$$35\\%\\text{ of }80 = 0.35 \\times 80 = 28$$

**Percentage increase/decrease:** Use a multiplier.
- Increase by $r\\%$: multiply by $1 + \\frac{r}{100}$
- Decrease by $r\\%$: multiply by $1 - \\frac{r}{100}$

For example, to increase £200 by 20%: $200 \\times 1.2 = £240$.`,
    formulas: [
      {
        label: "Percentage of amount",
        latex: "\\text{Percentage of amount} = \\frac{\\text{percentage}}{100} \\times \\text{amount}",
        note: "Convert percentage to decimal then multiply",
      },
      {
        label: "Percentage change",
        latex: "\\text{Percentage change} = \\frac{\\text{change}}{\\text{original}} \\times 100",
        note: "Change = new value − original value",
      },
      {
        label: "Multiplier",
        latex: "\\text{Multiplier} = 1 \\pm \\frac{\\text{percentage}}{100}",
        note: "+ for increase, − for decrease",
      },
    ],
    example: {
      question: "Increase £240 by 15%.",
      steps: [
        { label: "Find the multiplier", math: "\\text{Multiplier} = 1 + \\frac{15}{100} = 1.15" },
        { label: "Multiply original amount", math: "240 \\times 1.15 = 276" },
        { label: "Answer", math: "\\text{New amount} = £276" },
      ],
    },
    practice: {
      question:
        "A jacket costs £85 after a 32% discount. Find the original price.",
      solution: [
        { step: "Set up equation using multiplier", math: "85 = \\text{original} \\times (1 - 0.32)" },
        { step: "Simplify multiplier", math: "85 = \\text{original} \\times 0.68" },
        { step: "Divide both sides by 0.68", math: "\\text{original} = \\frac{85}{0.68} = 125" },
        { step: "Answer", math: "\\text{Original price} = £125" },
      ],
    },
  },
  {
    id: "ratio",
    icon: ":",
    title: "Ratio & Proportion",
    subtitle: "Sharing, simplifying and using ratios",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A ratio compares two or more quantities of the same kind.

**Simplifying ratios:** Divide all parts by their Highest Common Factor (HCF).
$$12 : 18 = 2 : 3 \\quad (\\text{dividing both by 6})$$

**Sharing in a ratio:** For ratio $a : b$:
1. Find total parts: $a + b$
2. Divide the amount by the total number of parts to find the value of one part
3. Multiply one part by each number in the ratio

$$\\text{One part} = \\frac{\\text{total amount}}{a + b}$$

**Direct proportion:** If $y$ is directly proportional to $x$, then $y = kx$ where $k$ is the constant of proportionality. As one quantity increases, the other increases in the same ratio.

**Inverse proportion:** If $y$ is inversely proportional to $x$, then $y = \\frac{k}{x}$. As one quantity increases, the other decreases.

**Unitary method:** Find the value of 1 unit first, then scale up or down as required. This is especially useful in proportion word problems.`,
    formulas: [
      {
        label: "One part (sharing in ratio)",
        latex: "\\text{One part} = \\frac{\\text{total amount}}{a + b}",
        note: "Multiply by each ratio number to find each share",
      },
      {
        label: "Direct proportion",
        latex: "y = kx",
        note: "k is the constant of proportionality",
      },
      {
        label: "Inverse proportion",
        latex: "y = \\frac{k}{x}",
        note: "As x increases, y decreases",
      },
    ],
    example: {
      question: "Share £360 in the ratio 3 : 5.",
      steps: [
        { label: "Find total number of parts", math: "3 + 5 = 8 \\text{ parts}" },
        { label: "Find value of one part", math: "\\frac{360}{8} = 45" },
        { label: "First share", math: "3 \\times 45 = £135" },
        { label: "Second share", math: "5 \\times 45 = £225" },
        { label: "Check", math: "135 + 225 = 360 \\checkmark" },
      ],
    },
    practice: {
      question:
        "4 workers build a wall in 15 days. How long would 6 workers take? (Assume all workers work at the same rate.)",
      solution: [
        { step: "Find total worker-days (inverse proportion)", math: "\\text{Total work} = 4 \\times 15 = 60 \\text{ worker-days}" },
        { step: "Divide by new number of workers", math: "\\text{Time for 6 workers} = \\frac{60}{6} = 10 \\text{ days}" },
        { step: "Answer", math: "6 \\text{ workers take } 10 \\text{ days}" },
      ],
    },
  },
  {
    id: "indices",
    icon: "xⁿ",
    title: "Powers, Roots & Indices",
    subtitle: "Index laws, squares, cubes and roots",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Index laws** allow us to simplify expressions involving powers.

| Law | Rule |
|---|---|
| Multiply same base | $a^m \\times a^n = a^{m+n}$ |
| Divide same base | $a^m \\div a^n = a^{m-n}$ |
| Power of a power | $(a^m)^n = a^{mn}$ |
| Zero index | $a^0 = 1$ (for any $a \\neq 0$) |
| Negative index | $a^{-n} = \\dfrac{1}{a^n}$ |
| Fractional index | $a^{\\frac{1}{n}} = \\sqrt[n]{a}$ |
| Fractional index (general) | $a^{\\frac{m}{n}} = (\\sqrt[n]{a})^m$ |

**Square numbers** to know: $1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144$

**Cube numbers** to know: $1, 8, 27, 64, 125, 216$

**Key tip for fractional indices:** $a^{\\frac{m}{n}}$ means "take the $n$th root first, then raise to the power $m$" — root first is usually easier!

$$27^{\\frac{2}{3}} = (\\sqrt[3]{27})^2 = 3^2 = 9$$`,
    formulas: [
      {
        label: "Multiply (same base)",
        latex: "a^m \\times a^n = a^{m+n}",
      },
      {
        label: "Divide (same base)",
        latex: "a^m \\div a^n = a^{m-n}",
      },
      {
        label: "Power of a power",
        latex: "(a^m)^n = a^{mn}",
      },
      {
        label: "Negative index",
        latex: "a^{-n} = \\frac{1}{a^n}",
      },
      {
        label: "Fractional index",
        latex: "a^{\\frac{1}{n}} = \\sqrt[n]{a}",
      },
      {
        label: "Fractional index (general)",
        latex: "a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m",
        note: "Root first, then power",
      },
    ],
    example: {
      question: "Evaluate $27^{\\frac{2}{3}}$.",
      steps: [
        { label: "Identify root and power", math: "27^{\\frac{2}{3}} = \\left(\\sqrt[3]{27}\\right)^2" },
        { label: "Evaluate the cube root", math: "\\sqrt[3]{27} = 3" },
        { label: "Raise to the power 2", math: "3^2 = 9" },
        { label: "Answer", math: "27^{\\frac{2}{3}} = 9" },
      ],
    },
    practice: {
      question: "Simplify: (a) $2^3 \\times 2^5$,  (b) $6^4 \\div 6^2$,  (c) $(3^2)^4$.",
      solution: [
        { step: "Part (a): add the indices", math: "2^3 \\times 2^5 = 2^{3+5} = 2^8 = 256" },
        { step: "Part (b): subtract the indices", math: "6^4 \\div 6^2 = 6^{4-2} = 6^2 = 36" },
        { step: "Part (c): multiply the indices", math: "(3^2)^4 = 3^{2 \\times 4} = 3^8 = 6561" },
      ],
    },
  },
  {
    id: "standard-form",
    icon: "×10ⁿ",
    title: "Standard Form",
    subtitle: "Writing very large and small numbers",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Standard form (also called scientific notation) is a way of writing very large or very small numbers concisely.

**Standard form:** $A \\times 10^n$ where $1 \\leq A < 10$ and $n$ is an integer.

**Large numbers** (greater than 10): $n$ is **positive**.
Count how many places you move the decimal point to the **left**.
$$4{,}300{,}000 = 4.3 \\times 10^6$$

**Small numbers** (between 0 and 1): $n$ is **negative**.
Count how many places you move the decimal point to the **right**.
$$0.0000056 = 5.6 \\times 10^{-6}$$

**Adding and subtracting:** Convert to ordinary numbers first (or rewrite so both have the same power of 10), then add/subtract.

**Multiplying in standard form:**
$$(A \\times 10^m) \\times (B \\times 10^n) = (A \\times B) \\times 10^{m+n}$$
If the result for $A \\times B \\geq 10$, adjust: e.g. $12.8 \\times 10^8 = 1.28 \\times 10^9$.

**Dividing in standard form:**
$$(A \\times 10^m) \\div (B \\times 10^n) = \\frac{A}{B} \\times 10^{m-n}$$`,
    formulas: [
      {
        label: "Standard form",
        latex: "A \\times 10^n, \\quad 1 \\leq A < 10,\\ n \\in \\mathbb{Z}",
      },
      {
        label: "Multiply",
        latex: "(A \\times 10^m) \\times (B \\times 10^n) = AB \\times 10^{m+n}",
        note: "Adjust A if result ≥ 10",
      },
      {
        label: "Divide",
        latex: "(A \\times 10^m) \\div (B \\times 10^n) = \\frac{A}{B} \\times 10^{m-n}",
        note: "Adjust A if result < 1",
      },
    ],
    example: {
      question: "Write 0.000347 in standard form.",
      steps: [
        { label: "Identify the significant figure position", math: "0.000347 \\to 3.47" },
        { label: "Count decimal places moved to the right", math: "\\text{Moved 4 places right} \\Rightarrow n = -4" },
        { label: "Write in standard form", math: "0.000347 = 3.47 \\times 10^{-4}" },
      ],
    },
    practice: {
      question: "Calculate $(3.2 \\times 10^5) \\times (4 \\times 10^3)$. Give your answer in standard form.",
      solution: [
        { step: "Multiply the A values", math: "3.2 \\times 4 = 12.8" },
        { step: "Add the powers of 10", math: "10^5 \\times 10^3 = 10^{5+3} = 10^8" },
        { step: "Combine", math: "12.8 \\times 10^8" },
        { step: "Adjust so A is between 1 and 10", math: "12.8 \\times 10^8 = 1.28 \\times 10^9" },
        { step: "Answer", math: "1.28 \\times 10^9" },
      ],
    },
  },
  {
    id: "factors-primes",
    icon: "🔑",
    title: "Factors, Multiples & Primes",
    subtitle: "HCF, LCM and prime factorisation",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Definitions:**
- **Factor:** a number that divides exactly into another number.
- **Multiple:** the result of multiplying a number by a positive integer.
- **Prime number:** a number with exactly two factors — 1 and itself.

**Primes to know:** 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 … (Note: 1 is **not** prime.)

**Prime factorisation:** Write any integer as a product of prime factors using a factor tree.
$$60 = 2^2 \\times 3 \\times 5$$

**Highest Common Factor (HCF):** the largest number that divides into both numbers.
$$\\text{HCF} = \\text{product of shared prime factors (lowest powers)}$$

**Lowest Common Multiple (LCM):** the smallest number that is a multiple of both numbers.
$$\\text{LCM} = \\text{product of all prime factors (highest powers)}$$

**Method using Venn diagram:** Place shared prime factors in the overlap. HCF = product of overlap. LCM = product of all values in the Venn diagram.

**Example:** $36 = 2^2 \\times 3^2$ and $48 = 2^4 \\times 3$
$$\\text{HCF} = 2^2 \\times 3 = 12$$
$$\\text{LCM} = 2^4 \\times 3^2 = 144$$`,
    formulas: [
      {
        label: "HCF",
        latex: "\\text{HCF} = \\text{product of shared prime factors (lowest powers)}",
      },
      {
        label: "LCM",
        latex: "\\text{LCM} = \\text{product of all prime factors (highest powers)}",
      },
    ],
    example: {
      question: "Find the HCF and LCM of 36 and 48.",
      steps: [
        { label: "Prime factorise 36", math: "36 = 2^2 \\times 3^2" },
        { label: "Prime factorise 48", math: "48 = 2^4 \\times 3" },
        { label: "HCF: shared factors, lowest powers", math: "\\text{HCF} = 2^2 \\times 3^1 = 4 \\times 3 = 12" },
        { label: "LCM: all factors, highest powers", math: "\\text{LCM} = 2^4 \\times 3^2 = 16 \\times 9 = 144" },
      ],
    },
    practice: {
      question: "Find the HCF and LCM of 60 and 84.",
      solution: [
        { step: "Prime factorise 60", math: "60 = 2^2 \\times 3 \\times 5" },
        { step: "Prime factorise 84", math: "84 = 2^2 \\times 3 \\times 7" },
        { step: "HCF: shared factors with lowest powers", math: "\\text{HCF} = 2^2 \\times 3 = 4 \\times 3 = 12" },
        { step: "LCM: all factors with highest powers", math: "\\text{LCM} = 2^2 \\times 3 \\times 5 \\times 7 = 4 \\times 3 \\times 5 \\times 7 = 420" },
      ],
    },
  },
];
