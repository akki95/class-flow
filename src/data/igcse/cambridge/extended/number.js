export const CHAPTER_META = {
  id: "cambridge-ext-number",
  title: "Number (Extended)",
  subtitle: "Surds, bounds, indices and exponential models",
  icon: "🔢",
  color: "#f97316",
  tier: "Extended",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "surds-ext",
    icon: "√",
    title: "Surds",
    subtitle: "Simplifying, expanding and rationalising surds",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A surd is an irrational square root that cannot be simplified to a rational number. Surds arise whenever a square root cannot be evaluated exactly as a fraction or integer.

**Simplifying surds**

To simplify a surd, find the largest perfect-square factor of the number under the root:

$$\\sqrt{12} = \\sqrt{4 \\times 3} = \\sqrt{4} \\times \\sqrt{3} = 2\\sqrt{3}$$

$$\\sqrt{75} = \\sqrt{25 \\times 3} = 5\\sqrt{3}$$

**Expanding brackets with surds**

Use FOIL exactly as with algebraic expressions:

$$(\\sqrt{a} + \\sqrt{b})(\\sqrt{c} + \\sqrt{d}) = \\sqrt{ac} + \\sqrt{ad} + \\sqrt{bc} + \\sqrt{bd}$$

A particularly important pattern is the difference of two squares:

$$(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$$

This always produces a rational result, which is the key to rationalising.

**Rationalising the denominator — simple case**

To remove a surd from a denominator of the form $\\sqrt{q}$, multiply numerator and denominator by $\\sqrt{q}$:

$$\\frac{p}{\\sqrt{q}} = \\frac{p \\cdot \\sqrt{q}}{\\sqrt{q} \\cdot \\sqrt{q}} = \\frac{p\\sqrt{q}}{q}$$

**Rationalising the denominator — conjugate**

When the denominator has the form $a + \\sqrt{b}$, multiply top and bottom by the conjugate $a - \\sqrt{b}$:

$$\\frac{p}{a + \\sqrt{b}} = \\frac{p(a - \\sqrt{b})}{(a + \\sqrt{b})(a - \\sqrt{b})} = \\frac{p(a - \\sqrt{b})}{a^2 - b}$$

The denominator becomes rational because $(\\sqrt{b})^2 = b$.

**Key identities to remember**

- $(\\sqrt{a})^2 = a$
- $(a + \\sqrt{b})(a - \\sqrt{b}) = a^2 - b$
- $\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$`,
    formulas: [
      {
        label: "Product rule",
        latex: "\\sqrt{ab}=\\sqrt{a}\\times\\sqrt{b}",
      },
      {
        label: "Rationalise simple",
        latex: "\\frac{p}{\\sqrt{q}}=\\frac{p\\sqrt{q}}{q}",
      },
      {
        label: "Rationalise with conjugate",
        latex: "\\frac{p}{a+\\sqrt{b}}=\\frac{p(a-\\sqrt{b})}{a^2-b}",
      },
    ],
    example: {
      question:
        "Rationalise the denominator of $\\dfrac{6}{2+\\sqrt{3}}$ and simplify fully.",
      solution: `Multiply numerator and denominator by the conjugate $(2 - \\sqrt{3})$:

$$\\frac{6}{2+\\sqrt{3}} \\times \\frac{2-\\sqrt{3}}{2-\\sqrt{3}} = \\frac{6(2-\\sqrt{3})}{(2)^2-(\\sqrt{3})^2} = \\frac{6(2-\\sqrt{3})}{4-3} = \\frac{6(2-\\sqrt{3})}{1}$$

$$= 6(2-\\sqrt{3}) = 12 - 6\\sqrt{3}$$`,
    },
    practice: [
      {
        question: "Simplify $(3+\\sqrt{5})^2-(3-\\sqrt{5})^2$.",
        solution: `Expand each bracket:

$(3+\\sqrt{5})^2 = 9 + 6\\sqrt{5} + 5 = 14 + 6\\sqrt{5}$

$(3-\\sqrt{5})^2 = 9 - 6\\sqrt{5} + 5 = 14 - 6\\sqrt{5}$

Subtracting:

$(14 + 6\\sqrt{5}) - (14 - 6\\sqrt{5}) = 12\\sqrt{5}$`,
      },
    ],
  },
  {
    id: "bounds-ext",
    icon: "⟺",
    title: "Upper & Lower Bounds",
    subtitle: "Error intervals and bounds in calculations",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `When a measurement or value is rounded to a given degree of accuracy, the true value can lie anywhere in an **error interval** (also called a **bound**).

**Finding bounds from a rounded value**

If a value $x$ has been rounded to a given accuracy, the lower bound (LB) and upper bound (UB) are:

$$\\text{LB} = \\text{rounded value} - \\tfrac{1}{2} \\times \\text{accuracy}$$
$$\\text{UB} = \\text{rounded value} + \\tfrac{1}{2} \\times \\text{accuracy}$$

The error interval is written as $\\text{LB} \\le x < \\text{UB}$ (note: lower bound is included, upper bound is excluded).

**Example of error intervals**

- $x = 6.4$ rounded to 1 d.p.: accuracy = 0.1, so LB = 6.35, UB = 6.45. Error interval: $6.35 \\le x < 6.45$
- $x = 300$ rounded to the nearest 100: accuracy = 100, so LB = 250, UB = 350.

**Bounds in calculations**

When combining bounds to maximise or minimise a result, use these rules:

| Expression | Maximum | Minimum |
|---|---|---|
| $a + b$ | UB$(a)$ + UB$(b)$ | LB$(a)$ + LB$(b)$ |
| $a - b$ | UB$(a)$ $-$ LB$(b)$ | LB$(a)$ $-$ UB$(b)$ |
| $a \\times b$ | UB$(a)$ $\\times$ UB$(b)$ | LB$(a)$ $\\times$ LB$(b)$ |
| $a \\div b$ | UB$(a)$ $\\div$ LB$(b)$ | LB$(a)$ $\\div$ UB$(b)$ |

The key idea: to **maximise** a result, use values that make the result as large as possible (larger top, smaller bottom for division). To **minimise**, do the reverse.`,
    formulas: [
      {
        label: "Lower bound",
        latex: "\\text{LB}=\\text{value}-\\tfrac{1}{2}\\times\\text{accuracy}",
      },
      {
        label: "Upper bound",
        latex: "\\text{UB}=\\text{value}+\\tfrac{1}{2}\\times\\text{accuracy}",
      },
      {
        label: "Error interval",
        latex: "\\text{LB}\\le x<\\text{UB}",
      },
    ],
    example: {
      question:
        "$p = 3.7$ and $q = 1.4$, both rounded to 1 decimal place. Find the upper bound of $p \\div q$.",
      solution: `For $p = 3.7$ (1 d.p., accuracy = 0.1): UB$(p) = 3.75$, LB$(p) = 3.65$

For $q = 1.4$ (1 d.p., accuracy = 0.1): UB$(q) = 1.45$, LB$(q) = 1.35$

To **maximise** $p \\div q$, use the largest numerator and smallest denominator:

$$\\text{Upper bound of } p \\div q = \\frac{\\text{UB}(p)}{\\text{LB}(q)} = \\frac{3.75}{1.35} \\approx 2.778$$`,
    },
    practice: [
      {
        question:
          "$a = 8.4$ cm and $b = 3.6$ cm, both measured to 1 decimal place. Find (i) the upper bound of $a - b$, and (ii) the lower bound of $a \\times b$.",
        solution: `For $a = 8.4$: LB$(a) = 8.35$, UB$(a) = 8.45$

For $b = 3.6$: LB$(b) = 3.55$, UB$(b) = 3.65$

**(i) Upper bound of $a - b$:**

Use UB$(a)$ and LB$(b)$:

$$8.45 - 3.55 = 4.90 \\text{ cm}$$

**(ii) Lower bound of $a \\times b$:**

Use LB$(a)$ and LB$(b)$:

$$8.35 \\times 3.55 = 29.6425 \\approx 29.64 \\text{ cm}^2$$`,
      },
    ],
  },
  {
    id: "indices-ext",
    icon: "xⁿ",
    title: "Negative & Fractional Indices",
    subtitle: "All index laws including negative and fractional powers",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The index laws from Core (multiplication, division, power of a power, power of zero) all still apply. Extended adds **negative** and **fractional** indices.

**Negative indices**

A negative index means take the reciprocal:

$$a^{-n} = \\frac{1}{a^n}$$

So $2^{-3} = \\dfrac{1}{8}$, and $x^{-1} = \\dfrac{1}{x}$.

**Fractional indices — unit fraction**

A fraction as an index means a root:

$$a^{\\frac{1}{n}} = \\sqrt[n]{a}$$

So $8^{\\frac{1}{3}} = \\sqrt[3]{8} = 2$, and $25^{\\frac{1}{2}} = \\sqrt{25} = 5$.

**Fractional indices — general**

A general fractional index combines root and power. The safest order is **root first, then power**:

$$a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m$$

Root first avoids working with large numbers. For example, $8^{\\frac{2}{3}} = (\\sqrt[3]{8})^2 = 2^2 = 4$.

**Negative fractional indices**

Combine both rules:

$$a^{-\\frac{m}{n}} = \\frac{1}{\\left(\\sqrt[n]{a}\\right)^m}$$

**Fractional base with index**

$$\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n} \\qquad \\left(\\frac{a}{b}\\right)^{-n} = \\left(\\frac{b}{a}\\right)^n$$

These rules apply equally to numeric and algebraic expressions.`,
    formulas: [
      {
        label: "Negative index",
        latex: "a^{-n}=\\frac{1}{a^n}",
      },
      {
        label: "Unit fractional index",
        latex: "a^{\\frac{1}{n}}=\\sqrt[n]{a}",
      },
      {
        label: "General fractional index",
        latex: "a^{\\frac{m}{n}}=\\left(\\sqrt[n]{a}\\right)^m",
      },
      {
        label: "Negative fractional base",
        latex: "\\left(\\frac{a}{b}\\right)^{-n}=\\left(\\frac{b}{a}\\right)^n",
      },
    ],
    example: {
      question:
        "Evaluate (a) $27^{-\\frac{1}{3}}$ and (b) $\\left(\\dfrac{4}{9}\\right)^{\\frac{3}{2}}$.",
      solution: `**(a) $27^{-\\frac{1}{3}}$**

First find the cube root: $27^{\\frac{1}{3}} = \\sqrt[3]{27} = 3$

Then apply the negative: $27^{-\\frac{1}{3}} = \\dfrac{1}{3}$

**(b) $\\left(\\dfrac{4}{9}\\right)^{\\frac{3}{2}}$**

Apply the root first: $\\left(\\dfrac{4}{9}\\right)^{\\frac{1}{2}} = \\dfrac{\\sqrt{4}}{\\sqrt{9}} = \\dfrac{2}{3}$

Then cube the result: $\\left(\\dfrac{2}{3}\\right)^3 = \\dfrac{8}{27}$`,
    },
    practice: [
      {
        question:
          "Simplify (a) $(8x^6)^{\\frac{1}{3}}$ and (b) $16^{-\\frac{3}{4}}$.",
        solution: `**(a) $(8x^6)^{\\frac{1}{3}}$**

Apply the index to each factor:

$$8^{\\frac{1}{3}} = \\sqrt[3]{8} = 2 \\qquad (x^6)^{\\frac{1}{3}} = x^{\\frac{6}{3}} = x^2$$

So $(8x^6)^{\\frac{1}{3}} = 2x^2$.

**(b) $16^{-\\frac{3}{4}}$**

Root first: $16^{\\frac{1}{4}} = \\sqrt[4]{16} = 2$

Then power: $2^3 = 8$

Apply the negative: $16^{-\\frac{3}{4}} = \\dfrac{1}{8}$`,
      },
    ],
  },
];
