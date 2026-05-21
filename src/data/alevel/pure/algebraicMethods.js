export const CHAPTER_META = {
  id: "alevel-algebraic-methods",
  title: "Algebraic Methods",
  subtitle: "Partial fractions, proof by contradiction and modulus function",
  icon: "≡",
  color: "#6366f1",
  year: "2",
  paper: "A-Level Pure",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "partial-fractions",
    icon: "≡",
    title: "Partial Fractions",
    subtitle: "Decomposing algebraic fractions",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A proper fraction $A(x)/B(x)$ (degree of numerator < degree of denominator) can be split into partial fractions. There are three main types:

**Type 1 — Distinct linear factors:**
$$\\frac{f(x)}{(x+a)(x+b)} \\equiv \\frac{A}{x+a} + \\frac{B}{x+b}$$

**Type 2 — Repeated linear factor:**
$$\\frac{f(x)}{(x+a)^2} \\equiv \\frac{A}{x+a} + \\frac{B}{(x+a)^2}$$

**Type 3 — Irreducible quadratic factor:**
$$\\frac{f(x)}{(x+a)(x^2+bx+c)} \\equiv \\frac{A}{x+a} + \\frac{Bx+C}{x^2+bx+c}$$

**Method:** Write the identity, then substitute suitable values of $x$ to find $A$, $B$, $C$. The cover-up rule works for distinct linear factors: to find $A$, cover up $(x+a)$ in the denominator and substitute $x = -a$.

**If the fraction is improper** (degree numerator $\\geq$ degree denominator): perform polynomial long division first to extract a polynomial part, then decompose the remainder.`,
    formulas: [
      "\\frac{f(x)}{(x+a)(x+b)} \\equiv \\frac{A}{x+a}+\\frac{B}{x+b}",
      "\\frac{f(x)}{(x+a)^2} \\equiv \\frac{A}{x+a}+\\frac{B}{(x+a)^2}",
      "\\frac{f(x)}{(x+a)(x^2+bx+c)} \\equiv \\frac{A}{x+a}+\\frac{Bx+C}{x^2+bx+c}",
    ],
    example: {
      question: "Express $\\dfrac{3x+1}{(x-1)(x+2)}$ as partial fractions.",
      solution: `Write the identity:
$$\\frac{3x+1}{(x-1)(x+2)} \\equiv \\frac{A}{x-1} + \\frac{B}{x+2}$$

Multiply both sides by $(x-1)(x+2)$:
$$3x+1 \\equiv A(x+2) + B(x-1)$$

**Substitute $x = 1$:** $\\quad 4 = 3A \\implies A = \\dfrac{4}{3}$

**Substitute $x = -2$:** $\\quad -5 = -3B \\implies B = \\dfrac{5}{3}$

$$\\boxed{\\frac{3x+1}{(x-1)(x+2)} \\equiv \\frac{4}{3(x-1)} + \\frac{5}{3(x+2)}}$$`,
    },
    practice: {
      question: "Express $\\dfrac{5x-3}{(2x+1)(x-2)}$ as partial fractions.",
      solution: `Write the identity:
$$\\frac{5x-3}{(2x+1)(x-2)} \\equiv \\frac{A}{2x+1} + \\frac{B}{x-2}$$

Multiply both sides by $(2x+1)(x-2)$:
$$5x-3 \\equiv A(x-2) + B(2x+1)$$

**Substitute $x = 2$:** $\\quad 7 = 5B \\implies B = \\dfrac{7}{5}$

**Substitute $x = -\\tfrac{1}{2}$:** $\\quad -\\dfrac{11}{2} = -\\dfrac{5A}{2} \\implies A = \\dfrac{11}{5}$

$$\\boxed{\\frac{5x-3}{(2x+1)(x-2)} \\equiv \\frac{11}{5(2x+1)} + \\frac{7}{5(x-2)}}$$`,
    },
  },
  {
    id: "proof-contradiction",
    icon: "≡",
    title: "Proof by Contradiction",
    subtitle: "Assuming the negative and reaching a contradiction",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Proof by contradiction** (also called *reductio ad absurdum*):

To prove statement $P$ is true:
1. **Assume** that $P$ is false (i.e. assume $\\lnot P$ is true).
2. Using logical deduction, derive a **contradiction** — a statement that is clearly false or contradicts a known fact.
3. Since the assumption $\\lnot P$ led to a contradiction, $\\lnot P$ must be false, so $P$ must be **true**.

**Classic examples:**

- **$\\sqrt{2}$ is irrational:** Assume $\\sqrt{2} = \\frac{p}{q}$ in lowest terms. Show both $p$ and $q$ must be even — contradicting the assumption that the fraction is in lowest terms.

- **Infinitely many primes:** Assume only finitely many primes $p_1, p_2, \\ldots, p_n$. Consider $N = p_1 p_2 \\cdots p_n + 1$. $N$ is not divisible by any $p_i$ (leaves remainder 1), so either $N$ itself is prime or has a prime factor not in the list — a contradiction.`,
    formulas: [
      "\\text{Assume } \\lnot P \\implies \\text{contradiction} \\implies P \\text{ is true}",
    ],
    example: {
      question: "Prove that $\\sqrt{2}$ is irrational.",
      solution: `**Assume** $\\sqrt{2}$ is rational, i.e. $\\sqrt{2} = \\dfrac{p}{q}$ where $p, q \\in \\mathbb{Z}$, $q \\neq 0$, and $\\gcd(p,q) = 1$ (fraction in lowest terms).

Squaring: $2 = \\dfrac{p^2}{q^2}$, so $p^2 = 2q^2$.

Therefore $p^2$ is even, which implies $p$ is even (since if $p$ were odd, $p^2$ would be odd).

Write $p = 2k$ for some integer $k$. Then:
$$4k^2 = 2q^2 \\implies q^2 = 2k^2$$

So $q^2$ is even, which implies $q$ is even.

But $p$ and $q$ are both even — **contradicting** $\\gcd(p,q) = 1$.

Therefore $\\sqrt{2}$ is irrational. $\\blacksquare$`,
    },
    practice: {
      question: "Prove that if $n^2$ is even then $n$ is even. (Use proof by contradiction.)",
      solution: `**Assume** $n^2$ is even but $n$ is **odd**.

If $n$ is odd, write $n = 2k + 1$ for some integer $k$. Then:
$$n^2 = (2k+1)^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$$

This is **odd**, contradicting the assumption that $n^2$ is even.

Therefore if $n^2$ is even, $n$ must be even. $\\blacksquare$`,
    },
  },
  {
    id: "modulus",
    icon: "≡",
    title: "Modulus Function",
    subtitle: "Graphs, equations and inequalities with |x|",
    color: "#6366f1",
    visualization: null,
    videoUrl: null,
    desmosNote: "y=|2x-3| and y=5. Solutions occur where the graphs intersect — check both branches of the modulus.",
    desmosExpressions: [
      { id: "1", latex: "y=|2x-3|" },
      { id: "2", latex: "y=5" },
    ],
    theory: `The **modulus function** (absolute value) is defined as:
$$|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}$$

It is always **non-negative**: $|x| \\geq 0$ for all $x$.

**Graph of $y = |f(x)|$:** Draw $y = f(x)$, then reflect any part below the $x$-axis upwards in the $x$-axis.

**Solving equations:**
- $|f(x)| = k$ (where $k > 0$): solve $f(x) = k$ **and** $f(x) = -k$.
- $|f(x)| = |g(x)|$: solve $f(x) = g(x)$ **and** $f(x) = -g(x)$.

**Solving inequalities:**
- $|x| < a \\Rightarrow -a < x < a$
- $|x| > a \\Rightarrow x < -a \\text{ or } x > a$

Always **sketch the graphs** to verify which solutions lie in the correct region — especially important for more complex functions.`,
    formulas: [
      "|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}",
      "|f(x)| = k \\Rightarrow f(x) = k \\text{ or } f(x) = -k",
      "|x| < a \\Rightarrow -a < x < a",
      "|x| > a \\Rightarrow x < -a \\text{ or } x > a",
    ],
    example: {
      question: "Solve $|2x - 3| = 7$.",
      solution: `Set up two equations:

**Case 1:** $2x - 3 = 7 \\implies 2x = 10 \\implies x = 5$

**Case 2:** $2x - 3 = -7 \\implies 2x = -4 \\implies x = -2$

$$\\boxed{x = 5 \\quad \\text{or} \\quad x = -2}$$`,
    },
    practice: {
      question: "Solve $|3x + 1| < 8$.",
      solution: `Using $|f(x)| < k \\Rightarrow -k < f(x) < k$:
$$-8 < 3x + 1 < 8$$

Subtract 1 throughout:
$$-9 < 3x < 7$$

Divide by 3:
$$\\boxed{-3 < x < \\frac{7}{3}}$$`,
    },
  },
];
