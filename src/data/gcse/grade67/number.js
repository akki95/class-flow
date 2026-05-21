export const CHAPTER_META = {
  id: "gcse-number-67",
  title: "Number",
  subtitle: "Surds, bounds and recurring decimals for GCSE Higher Grade 6–7",
  icon: "🔢",
  color: "#f59e0b",
  grade: "6-7",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "surds",
    icon: "√",
    title: "Surds",
    subtitle: "Simplifying, expanding and rationalising the denominator",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **surd** is an irrational root that cannot be simplified to a rational number — for example $\\sqrt{2}$, $\\sqrt{5}$, $3\\sqrt{7}$.

**Simplifying surds:** Use the rule $\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}$ and find the largest perfect square factor.

$$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$$

**Expanding brackets:** Use FOIL (or the grid method) exactly as with algebra — remember $(\\sqrt{a})^2 = a$.

$$( 2 + \\sqrt{3})(1 - \\sqrt{3}) = 2 - 2\\sqrt{3} + \\sqrt{3} - 3 = -1 - \\sqrt{3}$$

**Rationalising the denominator — simple form:** Multiply numerator and denominator by $\\sqrt{b}$:

$$\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}$$

**Rationalising the denominator — conjugate form:** For expressions like $p + q\\sqrt{b}$, multiply by the conjugate $p - q\\sqrt{b}$, using the difference-of-two-squares identity $(p+q\\sqrt{b})(p-q\\sqrt{b}) = p^2 - q^2 b$, which is always rational.`,
    formulas: [
      { label: "Simplify surd", latex: "\\sqrt{ab} = \\sqrt{a} \\times \\sqrt{b}" },
      { label: "Key identity", latex: "(\\sqrt{a})^2 = a" },
      { label: "Rationalise (simple)", latex: "\\frac{a}{\\sqrt{b}} = \\frac{a\\sqrt{b}}{b}" },
      { label: "Rationalise (conjugate)", latex: "\\frac{a}{p+q\\sqrt{b}} = \\frac{a(p-q\\sqrt{b})}{p^2-q^2b}" },
      { label: "Difference of two squares", latex: "(p+q\\sqrt{b})(p-q\\sqrt{b}) = p^2 - q^2b" },
    ],
    example: {
      question: "Rationalise the denominator of $\\dfrac{6}{2+\\sqrt{3}}$.",
      steps: [
        { label: "Identify conjugate", math: "\\text{Conjugate of } (2+\\sqrt{3}) \\text{ is } (2-\\sqrt{3})" },
        { label: "Multiply top and bottom by conjugate", math: "\\frac{6}{2+\\sqrt{3}} \\times \\frac{2-\\sqrt{3}}{2-\\sqrt{3}}" },
        { label: "Expand denominator using difference of squares", math: "(2+\\sqrt{3})(2-\\sqrt{3}) = 4 - 3 = 1" },
        { label: "Expand numerator", math: "6(2-\\sqrt{3}) = 12 - 6\\sqrt{3}" },
        { label: "Write final answer", math: "\\frac{12-6\\sqrt{3}}{1} = 12 - 6\\sqrt{3}" },
      ],
    },
    practice: {
      question: "(a) Expand and simplify $(3+\\sqrt{5})(3-\\sqrt{5})$. (b) Rationalise the denominator of $\\dfrac{4}{\\sqrt{7}-1}$.",
      solution: [
        { step: "Part (a): recognise difference of two squares", math: "(3+\\sqrt{5})(3-\\sqrt{5}) = 3^2 - (\\sqrt{5})^2" },
        { step: "Simplify", math: "= 9 - 5 = 4" },
        { step: "Part (b): conjugate of $(\\sqrt{7}-1)$ is $(\\sqrt{7}+1)$", math: "\\frac{4}{\\sqrt{7}-1} \\times \\frac{\\sqrt{7}+1}{\\sqrt{7}+1}" },
        { step: "Denominator", math: "(\\sqrt{7})^2 - 1^2 = 7 - 1 = 6" },
        { step: "Numerator", math: "4(\\sqrt{7}+1)" },
        { step: "Final answer", math: "\\frac{4(\\sqrt{7}+1)}{6} = \\frac{2(\\sqrt{7}+1)}{3}" },
      ],
    },
  },
  {
    id: "bounds",
    icon: "↔",
    title: "Upper & Lower Bounds",
    subtitle: "Error intervals and calculations with bounds",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `When a measurement is **rounded** to a given degree of accuracy, the true value lies within an **error interval**.

If $x = 4.7$ to 1 decimal place, then: $4.65 \\le x < 4.75$

**Rules:**
- Lower bound $= \\text{rounded value} - \\tfrac{1}{2} \\times \\text{accuracy}$
- Upper bound $= \\text{rounded value} + \\tfrac{1}{2} \\times \\text{accuracy}$
- Note: lower bound uses $\\le$, upper bound uses $<$ (strict inequality)

**Calculations with bounds — to maximise a result:**

| Operation | Use |
|-----------|-----|
| Addition $a + b$ | UB($a$) + UB($b$) |
| Subtraction $a - b$ | UB($a$) $-$ LB($b$) |
| Multiplication $a \\times b$ | UB($a$) $\\times$ UB($b$) |
| Division $a \\div b$ | UB($a$) $\\div$ LB($b$) |

To **minimise**, reverse the strategy (use LB where you would use UB, and vice versa).`,
    formulas: [
      { label: "Lower bound", latex: "\\text{LB} = \\text{value} - \\tfrac{1}{2} \\times \\text{accuracy}" },
      { label: "Upper bound", latex: "\\text{UB} = \\text{value} + \\tfrac{1}{2} \\times \\text{accuracy}" },
      { label: "Error interval", latex: "\\text{LB} \\le x < \\text{UB}" },
      { label: "Max of division", latex: "\\max\\!\\left(\\frac{a}{b}\\right) = \\frac{\\text{UB}(a)}{\\text{LB}(b)}" },
    ],
    example: {
      question: "$a = 3.6\\text{ cm}$ and $b = 2.1\\text{ cm}$, both measured to 1 decimal place. Find the maximum value of $a \\div b$, giving your answer to 3 decimal places.",
      steps: [
        { label: "Find UB(a)", math: "\\text{UB}(a) = 3.6 + 0.05 = 3.65" },
        { label: "Find LB(b)", math: "\\text{LB}(b) = 2.1 - 0.05 = 2.05" },
        { label: "Maximum of a/b uses UB(a) ÷ LB(b)", math: "\\frac{3.65}{2.05} \\approx 1.780" },
      ],
    },
    practice: {
      question: "$x = 7.3$ and $y = 4.8$, both rounded to 1 decimal place. Find the upper bound of $x - y$.",
      solution: [
        { step: "Find UB(x)", math: "\\text{UB}(x) = 7.3 + 0.05 = 7.35" },
        { step: "Find LB(y)", math: "\\text{LB}(y) = 4.8 - 0.05 = 4.75" },
        { step: "Upper bound of subtraction: UB(x) − LB(y)", math: "7.35 - 4.75 = 2.60" },
      ],
    },
  },
  {
    id: "recurring-decimals",
    icon: "0.̄",
    title: "Recurring Decimals",
    subtitle: "Converting recurring decimals to fractions",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **recurring decimal** has a digit or block of digits that repeats forever, shown with a dot above (e.g. $0.\\dot{7}$ or $0.\\dot{7}\\dot{2}$).

**Algebraic method to convert to a fraction:**

1. Let $x$ equal the recurring decimal.
2. Multiply by a power of 10 to shift the recurring block to just before the decimal point.
3. Subtract the two equations to eliminate the recurring part.
4. Solve for $x$ and simplify the fraction.

**Choosing the multiplier:**
- Single digit recurring: multiply by **10**
- Two digit recurring block: multiply by **100**
- Three digit recurring block: multiply by **1000**

**Mixed recurring (non-recurring part followed by recurring):** multiply twice — once to move the non-recurring part, once to align the recurring blocks, then subtract.

For example, $0.4\\dot{1}$: multiply by 10 and by 100, then subtract to get a fraction.`,
    formulas: [
      { label: "Single digit recurring", latex: "x = 0.\\dot{a} \\Rightarrow 10x = a.\\dot{a} \\Rightarrow 9x = a \\Rightarrow x = \\frac{a}{9}" },
      { label: "Two digit recurring", latex: "x = 0.\\dot{a}\\dot{b} \\Rightarrow 100x = ab.\\dot{a}\\dot{b} \\Rightarrow 99x = ab \\Rightarrow x = \\frac{ab}{99}" },
    ],
    example: {
      question: "Convert $0.\\dot{7}\\dot{2}$ ($= 0.727272\\ldots$) to a fraction in its simplest form.",
      steps: [
        { label: "Let x equal the decimal", math: "x = 0.727272\\ldots" },
        { label: "Two digit block → multiply by 100", math: "100x = 72.727272\\ldots" },
        { label: "Subtract original equation", math: "100x - x = 72.727272\\ldots - 0.727272\\ldots" },
        { label: "Simplify", math: "99x = 72" },
        { label: "Solve and simplify", math: "x = \\frac{72}{99} = \\frac{8}{11}" },
      ],
    },
    practice: {
      question: "Convert $0.4\\dot{1}$ ($= 0.4111\\ldots$) to a fraction in its simplest form.",
      solution: [
        { step: "Let x equal the decimal", math: "x = 0.4111\\ldots" },
        { step: "Multiply by 10 to move non-recurring part", math: "10x = 4.111\\ldots" },
        { step: "Multiply by 100 to align recurring part", math: "100x = 41.111\\ldots" },
        { step: "Subtract: 100x − 10x", math: "90x = 41.111\\ldots - 4.111\\ldots = 37" },
        { step: "Solve", math: "x = \\frac{37}{90}" },
        { step: "Check: 37 and 90 share no common factors — already in simplest form", math: "\\frac{37}{90}" },
      ],
    },
  },
];
