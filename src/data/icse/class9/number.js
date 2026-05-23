export const CHAPTER_META = {
  id: "icse-9-number",
  title: "Number Systems",
  subtitle: "Rational & irrational numbers, surds, rationalisation and the real number line",
  icon: "🔢",
  color: "#6366f1",
  tier: "Class 9",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "rational-irrational",
    icon: "🔢",
    title: "Rational & Irrational Numbers",
    subtitle: "Classifying numbers, decimal representations and proofs of irrationality",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **rational number** can be written as $\\frac{p}{q}$ where $p, q$ are integers and $q \\neq 0$. Its decimal expansion is either **terminating** or **non-terminating recurring**.

$$\\frac{3}{4} = 0.75 \\quad \\text{(terminating)}, \\qquad \\frac{1}{3} = 0.\\overline{3} \\quad \\text{(recurring)}$$

An **irrational number** cannot be written as $\\frac{p}{q}$. Its decimal expansion is **non-terminating, non-recurring**.

$$\\sqrt{2} = 1.41421356\\ldots, \\qquad \\pi = 3.14159265\\ldots$$

**Proof that $\\sqrt{2}$ is irrational (by contradiction):**
1. Assume $\\sqrt{2} = \\frac{p}{q}$ where $\\frac{p}{q}$ is in lowest terms.
2. Then $2 = \\frac{p^2}{q^2}$, so $p^2 = 2q^2$, meaning $p^2$ is even, so $p$ is even.
3. Let $p = 2k$. Then $4k^2 = 2q^2$, giving $q^2 = 2k^2$, so $q$ is also even.
4. Both $p$ and $q$ even contradicts $\\frac{p}{q}$ being in lowest terms. ∎

The **real number line** includes all rational and irrational numbers. Between any two rationals, there exists an irrational, and vice versa.`,
    formulas: [
      {
        label: "Rational form",
        latex: "\\frac{p}{q}, \\quad p,q \\in \\mathbb{Z}, \\; q \\neq 0",
      },
      {
        label: "Real numbers",
        latex: "\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{Q}'",
      },
    ],
    example: {
      question: "Classify each number as rational or irrational: (a) $0.\\overline{142857}$  (b) $\\sqrt{5}$  (c) $3.010010001\\ldots$",
      solution: `**(a)** $0.\\overline{142857}$ — non-terminating **recurring** → **Rational** ($= \\frac{1}{7}$)

**(b)** $\\sqrt{5}$ — 5 is not a perfect square → **Irrational**

**(c)** $3.010010001\\ldots$ — the pattern is not repeating (gaps increase) → **Irrational**`,
    },
    practice: {
      question: "Prove that $\\sqrt{3}$ is irrational.",
      solution: `Assume $\\sqrt{3} = \\frac{p}{q}$ in lowest terms.

Then $3 = \\frac{p^2}{q^2}$, so $p^2 = 3q^2$.

This means $3 \\mid p^2$, hence $3 \\mid p$. Let $p = 3k$.

Then $9k^2 = 3q^2$, giving $q^2 = 3k^2$, so $3 \\mid q$.

Both $p$ and $q$ divisible by 3 contradicts lowest terms. ∎

Therefore $\\sqrt{3}$ is **irrational**.`,
    },
  },
  {
    id: "surds",
    icon: "√",
    title: "Surds & Rationalisation",
    subtitle: "Simplifying surds, operations and rationalising the denominator",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **surd** is an irrational root that cannot be simplified to a rational number: $\\sqrt{2}, \\sqrt{3}, \\sqrt{5}, \\ldots$

**Simplifying surds:** Extract perfect-square factors.
$$\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt{2}$$

**Rules for surds:**
$$\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$$
$$\\frac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\frac{a}{b}}$$
$$(\\sqrt{a})^2 = a$$

**Adding/subtracting:** Only like surds can be combined.
$$3\\sqrt{5} + 2\\sqrt{5} = 5\\sqrt{5}$$
$$3\\sqrt{2} + \\sqrt{3} \\text{ — cannot be simplified}$$

**Rationalising the denominator:** Multiply top and bottom by the conjugate or the surd itself.

For $\\frac{1}{\\sqrt{a}}$: multiply by $\\frac{\\sqrt{a}}{\\sqrt{a}}$.

For $\\frac{1}{a + \\sqrt{b}}$: multiply by $\\frac{a - \\sqrt{b}}{a - \\sqrt{b}}$ (the conjugate).

The key identity: $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$.`,
    formulas: [
      {
        label: "Product rule",
        latex: "\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}",
      },
      {
        label: "Conjugate identity",
        latex: "(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b",
      },
      {
        label: "Rationalise",
        latex: "\\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}",
      },
    ],
    example: {
      question: "Rationalise the denominator: $\\frac{5}{3 + \\sqrt{2}}$",
      solution: `Multiply numerator and denominator by the conjugate $3 - \\sqrt{2}$:

$$\\frac{5}{3 + \\sqrt{2}} \\times \\frac{3 - \\sqrt{2}}{3 - \\sqrt{2}} = \\frac{5(3 - \\sqrt{2})}{9 - 2} = \\frac{15 - 5\\sqrt{2}}{7}$$

$$= \\mathbf{\\frac{15 - 5\\sqrt{2}}{7}}$$`,
    },
    practice: {
      question: "Simplify: $\\frac{\\sqrt{50} + \\sqrt{18}}{\\sqrt{2}}$",
      solution: `$$\\sqrt{50} = 5\\sqrt{2}, \\quad \\sqrt{18} = 3\\sqrt{2}$$

$$\\frac{5\\sqrt{2} + 3\\sqrt{2}}{\\sqrt{2}} = \\frac{8\\sqrt{2}}{\\sqrt{2}} = \\mathbf{8}$$`,
    },
  },
  {
    id: "real-number-line",
    icon: "📏",
    title: "Real Number Line & Representation",
    subtitle: "Plotting irrationals, density property and intervals",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **real number line** represents all real numbers as points on a continuous line.

**Plotting $\\sqrt{2}$ on the number line:**
1. Draw a right triangle with legs of length 1 unit each.
2. The hypotenuse has length $\\sqrt{1^2 + 1^2} = \\sqrt{2}$.
3. With compass centred at the origin, arc the hypotenuse onto the number line.

**Density property:** Between any two distinct real numbers, there are infinitely many rationals **and** infinitely many irrationals.

**Successive magnification:** To locate $2.665$ on the number line:
1. It lies between 2 and 3.
2. Zoom into 2.6 and 2.7.
3. Zoom into 2.66 and 2.67.
4. Zoom into 2.665.

**Intervals:** For $a < b$:
- $(a, b)$ = open interval (excludes endpoints)
- $[a, b]$ = closed interval (includes endpoints)
- $(a, b]$ or $[a, b)$ = half-open intervals`,
    formulas: [
      {
        label: "Pythagorean construction",
        latex: "\\sqrt{n} = \\text{hypotenuse of triangle with legs } \\sqrt{n-1} \\text{ and } 1",
      },
    ],
    example: {
      question: "Represent $\\sqrt{5}$ on the number line using geometric construction.",
      solution: `**Step 1:** We know $\\sqrt{5} = \\sqrt{4 + 1} = \\sqrt{2^2 + 1^2}$.

**Step 2:** Draw a line segment OA = 2 units on the number line from the origin.

**Step 3:** At A, draw a perpendicular AB = 1 unit.

**Step 4:** OB = $\\sqrt{2^2 + 1^2} = \\sqrt{5}$.

**Step 5:** With compass centred at O, radius OB, draw an arc to cut the number line at point P.

Then OP = $\\mathbf{\\sqrt{5} \\approx 2.236}$.`,
    },
    practice: {
      question: "Find two irrational numbers between $\\sqrt{2}$ and $\\sqrt{3}$.",
      solution: `$\\sqrt{2} \\approx 1.414$ and $\\sqrt{3} \\approx 1.732$.

Two irrationals between them:

$$\\sqrt{2.5} \\approx 1.581 \\quad \\text{and} \\quad \\sqrt{2.8} \\approx 1.673$$

Both lie between $\\sqrt{2}$ and $\\sqrt{3}$ and are irrational (since 2.5 and 2.8 are not perfect squares). ✓`,
    },
  },
];
