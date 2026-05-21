export const CHAPTER_META = {
  id: "alevel-binomial",
  title: "Binomial Expansion",
  subtitle: "Expanding (1+x)ⁿ for any rational n and applications with partial fractions",
  icon: "(1+x)ⁿ",
  color: "#06b6d4",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "binomial-any-n",
    icon: "(1+x)ⁿ",
    title: "Binomial Expansion for Any n",
    subtitle: "Valid for |x|<1, any rational n",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**For positive integer $n$** (A-Level Year 1):
$$(1+x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\cdots + x^n$$
This is a **finite** series with $n+1$ terms — exact for all $x$.

**For any rational $n$** (including negative integers and fractions):
$$(1+x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\cdots$$

This is an **infinite series**, valid only when $|x| < 1$.

**Standard form:** The formula requires the bracket to start with 1. For $(a + bx)^n$, first factor out $a^n$:
$$(a + bx)^n = a^n\\!\\left(1 + \\frac{b}{a}x\\right)^{\\!n}$$

Then expand $\\left(1 + \\frac{b}{a}x\\right)^n$ using the formula, valid for $\\left|\\frac{b}{a}x\\right| < 1$, i.e. $|x| < \\dfrac{a}{b}$.

**Approximations:** Truncate the series after a few terms to obtain polynomial approximations valid for small $|x|$.`,
    formulas: [
      "(1+x)^n = 1 + nx + \\frac{n(n-1)}{2!}x^2 + \\frac{n(n-1)(n-2)}{3!}x^3 + \\cdots",
      "\\text{Valid for } |x| < 1 \\text{ when } n \\notin \\mathbb{Z}^+",
      "(a+bx)^n = a^n\\!\\left(1+\\frac{b}{a}x\\right)^{\\!n}",
    ],
    example: {
      question: "Expand $(1+x)^{-2}$ up to and including the term in $x^3$. State the range of validity.",
      solution: `Using the formula with $n = -2$:
$$(1+x)^{-2} = 1 + (-2)x + \\frac{(-2)(-3)}{2!}x^2 + \\frac{(-2)(-3)(-4)}{3!}x^3 + \\cdots$$

$$= 1 - 2x + \\frac{6}{2}x^2 + \\frac{-24}{6}x^3 + \\cdots$$

$$\\boxed{(1+x)^{-2} = 1 - 2x + 3x^2 - 4x^3 + \\cdots}$$

**Range of validity:** $|x| < 1$.

(Notice the coefficients follow the pattern $1, -2, 3, -4, \\ldots$, which are the terms of $\\sum_{r=0}^{\\infty}(-1)^r(r+1)x^r$.)`,
    },
    practice: {
      question: "(a) Expand $(1-2x)^{1/2}$ up to and including the term in $x^2$. (b) State the range of validity.",
      solution: `**(a)** Using the formula with $n = \\dfrac{1}{2}$ and replacing $x$ with $(-2x)$:

$$(1-2x)^{1/2} = 1 + \\frac{1}{2}(-2x) + \\frac{\\frac{1}{2}\\cdot(-\\frac{1}{2})}{2!}(-2x)^2 + \\cdots$$

$$= 1 + (-x) + \\frac{-\\frac{1}{4}}{2}\\cdot 4x^2 + \\cdots$$

$$= 1 - x + \\frac{-\\frac{1}{4}}{2} \\cdot 4x^2 + \\cdots = 1 - x - \\frac{1}{2}x^2 + \\cdots$$

$$\\boxed{(1-2x)^{1/2} \\approx 1 - x - \\tfrac{1}{2}x^2}$$

**(b)** Validity requires $|-2x| < 1$, i.e. $|x| < \\dfrac{1}{2}$.`,
    },
  },
  {
    id: "binomial-applications",
    icon: "(1+x)ⁿ",
    title: "Binomial Expansion Applications",
    subtitle: "Partial fractions + approximations",
    color: "#06b6d4",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Combining partial fractions with binomial expansion:**

To expand a complex rational function as a power series:
1. **Split** into partial fractions first.
2. **Expand** each simpler fraction separately using the binomial formula.
3. **Combine** the results, collecting like powers of $x$.

This avoids trying to expand a complicated fraction directly.

**Numerical approximations:** Once you have a polynomial expansion, substitute a small value of $x$ to estimate a numerical quantity. Check your answer against a calculator to verify accuracy.

**Positive integer $n$ — exact expansion:**
$$(a+b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r$$

where $\\dbinom{n}{r} = \\dfrac{n!}{r!(n-r)!}$ — this gives an exact, finite result valid for all values.

**Range of validity for combined expansions:** The overall expansion is valid for the most restrictive of the individual validity conditions.`,
    formulas: [
      "\\binom{n}{r} = \\frac{n!}{r!(n-r)!}",
      "(a+b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{n-r} b^r \\quad (n \\in \\mathbb{Z}^+)",
      "\\text{Split into partial fractions, then expand each term separately}",
    ],
    example: {
      question: "Express $f(x) = \\dfrac{1}{(1+x)(1-2x)}$ as a power series up to and including $x^2$.",
      solution: `**Step 1 — Partial fractions:**
$$\\frac{1}{(1+x)(1-2x)} \\equiv \\frac{A}{1+x} + \\frac{B}{1-2x}$$

Multiply through: $1 \\equiv A(1-2x) + B(1+x)$.

$x = -1$: $1 = 3A \\implies A = \\dfrac{1}{3}$.
$x = \\tfrac{1}{2}$: $1 = \\dfrac{3B}{2} \\implies B = \\dfrac{2}{3}$.

**Step 2 — Expand each fraction:**
$$\\frac{1}{1+x} = (1+x)^{-1} = 1 - x + x^2 - \\cdots$$

$$\\frac{1}{1-2x} = (1-2x)^{-1} = 1 + 2x + 4x^2 + \\cdots$$

**Step 3 — Combine:**
$$f(x) = \\frac{1}{3}(1 - x + x^2) + \\frac{2}{3}(1 + 2x + 4x^2) + \\cdots$$

$$= \\frac{1}{3} + \\frac{2}{3} + \\left(-\\frac{1}{3} + \\frac{4}{3}\\right)x + \\left(\\frac{1}{3} + \\frac{8}{3}\\right)x^2 + \\cdots$$

$$\\boxed{f(x) = 1 + x + 3x^2 + \\cdots}$$

Valid for $|x| < \\dfrac{1}{2}$ (most restrictive condition).`,
    },
    practice: {
      question: "Expand $\\dfrac{3}{(1+x)(2-x)}$ as a power series up to and including $x^2$ using partial fractions.",
      solution: `**Step 1 — Partial fractions:**
$$\\frac{3}{(1+x)(2-x)} \\equiv \\frac{A}{1+x} + \\frac{B}{2-x}$$

Multiply through: $3 \\equiv A(2-x) + B(1+x)$.

$x = -1$: $3 = 3A \\implies A = 1$.
$x = 2$: $3 = 3B \\implies B = 1$.

$$\\frac{3}{(1+x)(2-x)} = \\frac{1}{1+x} + \\frac{1}{2-x}$$

**Step 2 — Expand each fraction:**
$$\\frac{1}{1+x} = 1 - x + x^2 - \\cdots$$

$$\\frac{1}{2-x} = \\frac{1}{2}\\cdot\\frac{1}{1-\\frac{x}{2}} = \\frac{1}{2}\\left(1 + \\frac{x}{2} + \\frac{x^2}{4} + \\cdots\\right) = \\frac{1}{2} + \\frac{x}{4} + \\frac{x^2}{8} + \\cdots$$

**Step 3 — Combine:**
$$\\left(1 - x + x^2\\right) + \\left(\\frac{1}{2} + \\frac{x}{4} + \\frac{x^2}{8}\\right) + \\cdots$$

$$= \\frac{3}{2} + \\left(-1 + \\frac{1}{4}\\right)x + \\left(1 + \\frac{1}{8}\\right)x^2 + \\cdots$$

$$\\boxed{\\frac{3}{(1+x)(2-x)} = \\frac{3}{2} - \\frac{3}{4}x + \\frac{9}{8}x^2 + \\cdots}$$

Valid for $|x| < 1$ (most restrictive).`,
    },
  },
];
