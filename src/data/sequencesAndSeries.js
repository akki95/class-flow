export const SEQUENCES_META = {
  title: "Sequences & Series",
  subtitle: "A-Level Edexcel — Pure Mathematics",
  totalTopics: 6,
};

// Chapter-format meta (for PURE_CHAPTERS)
export const CHAPTER_META = {
  id: "sequences-series",
  title: "Sequences & Series",
  subtitle: "Arithmetic, geometric, infinite and sigma notation",
  icon: "∑",
  color: "#3ecfaa",
  paper: "Pure",
};

export const SEQUENCES_TOPICS = [
  {
    id: "arithmetic-sequence",
    icon: "➕",
    title: "Arithmetic Sequences",
    subtitle: "Constant common difference",
    color: "#6366f1",
    visualization: "arithmetic",
    desmosNote: "Explore: change $a$ and $d$ sliders to see how the sequence shifts.",
    desmosExpressions: [
      { id: "1", latex: "a=2" },
      { id: "2", latex: "d=3" },
      { id: "3", latex: "(n, a+(n-1)d) \\left\\{1 \\le n \\le 10\\right\\}", color: "#6366f1" },
    ],

    theory: `An **arithmetic sequence** (or arithmetic progression, AP) is a sequence where the difference between any two consecutive terms is constant. This constant is called the **common difference**, $d$.

Given first term $a$ and common difference $d$, the sequence is:
$$a, \\ a+d, \\ a+2d, \\ a+3d, \\ \\ldots$$

**Key observations:**
- If $d > 0$: sequence is **increasing**
- If $d < 0$: sequence is **decreasing**
- If $d = 0$: all terms are **equal**

**Checking for an AP:** verify that $u_2 - u_1 = u_3 - u_2 = \\cdots = d$ (constant).`,

    formulas: [
      {
        label: "nth term",
        latex: "u_n = a + (n-1)d",
        note: "$a$ = first term, $d$ = common difference, $n$ = term number",
      },
      {
        label: "Common difference",
        latex: "d = u_{n+1} - u_n",
        note: "Subtract any consecutive pair of terms",
      },
    ],

    example: {
      question: "The 3rd term of an arithmetic sequence is 11 and the 7th term is 23. Find: (a) the common difference, (b) the first term, (c) the 20th term.",
      steps: [
        { label: "Write equations for given terms", math: "u_3 = a + 2d = 11 \\quad \\cdots (1)" },
        { label: "", math: "u_7 = a + 6d = 23 \\quad \\cdots (2)" },
        { label: "(a) Subtract (1) from (2) to eliminate $a$", math: "4d = 12 \\implies d = 3" },
        { label: "(b) Substitute $d = 3$ into (1)", math: "a + 6 = 11 \\implies a = 5" },
        { label: "(c) Apply nth term formula", math: "u_{20} = 5 + 19 \\times 3 = 5 + 57 = \\mathbf{62}" },
      ],
    },

    practice: {
      question: "The 5th term of an arithmetic sequence is 19 and the 12th term is 40. Find the value of $n$ for which $u_n = 100$.",
      solution: [
        { step: "Set up two equations:", math: "u_5 = a + 4d = 19 \\quad \\cdots (1)" },
        { step: "", math: "u_{12} = a + 11d = 40 \\quad \\cdots (2)" },
        { step: "Subtract (1) from (2):", math: "7d = 21 \\implies d = 3" },
        { step: "Find $a$:", math: "a = 19 - 4(3) = 7" },
        { step: "Set $u_n = 100$ and solve:", math: "7 + (n-1)(3) = 100" },
        { step: "", math: "3(n-1) = 93 \\implies n - 1 = 31 \\implies \\mathbf{n = 32}" },
      ],
    },
  },

  {
    id: "arithmetic-series",
    icon: "∑",
    title: "Arithmetic Series",
    subtitle: "Sum of an AP",
    color: "#8b5cf6",
    visualization: "arithmeticSeries",
    desmosNote: "Partial sums $S_n$ form a quadratic curve. Try changing $a$ and $d$.",
    desmosExpressions: [
      { id: "1", latex: "a=3" },
      { id: "2", latex: "d=4" },
      { id: "3", latex: "S(n) = \\frac{n}{2}(2a + (n-1)d)" },
      { id: "4", latex: "(n, S(n)) \\left\\{1 \\le n \\le 15\\right\\}", color: "#8b5cf6" },
    ],

    theory: `An **arithmetic series** is the sum of the terms of an arithmetic sequence. The sum of the first $n$ terms is denoted $S_n$.

To derive the formula, write the sum forwards and backwards:
$$S_n = a + (a+d) + \\cdots + (l-d) + l$$
$$S_n = l + (l-d) + \\cdots + (a+d) + a$$

Adding both rows: $2S_n = n(a + l)$, giving the formula below.

**Note:** $S_n$ is always a **quadratic** in $n$. You can also find the $r$th term from the series: $u_r = S_r - S_{r-1}$.`,

    formulas: [
      {
        label: "Sum of first n terms (using a and d)",
        latex: "S_n = \\dfrac{n}{2}\\left(2a + (n-1)d\\right)",
        note: "Use when you know the first term and common difference",
      },
      {
        label: "Sum of first n terms (using first and last)",
        latex: "S_n = \\dfrac{n}{2}(a + l)",
        note: "Use when you know both endpoints; $l = u_n$ is the last term",
      },
    ],

    example: {
      question: "Find the sum of the first 20 terms of the AP: 3, 7, 11, 15, ...",
      steps: [
        { label: "Identify $a$, $d$, and $n$", math: "a = 3, \\quad d = 4, \\quad n = 20" },
        { label: "Apply the formula", math: "S_{20} = \\frac{20}{2}\\left(2(3) + 19(4)\\right)" },
        { label: "Simplify inside the brackets", math: "= 10\\left(6 + 76\\right) = 10 \\times 82" },
        { label: "Final answer", math: "S_{20} = \\mathbf{820}" },
      ],
    },

    practice: {
      question: "For the AP $3, 7, 11, 15, \\ldots$, find the value of $n$ such that $S_n = 171$.",
      solution: [
        { step: "Write the formula for $S_n$:", math: "S_n = \\frac{n}{2}(2 \\times 3 + (n-1) \\times 4) = \\frac{n}{2}(4n + 2) = n(2n+1)" },
        { step: "Set equal to 171:", math: "n(2n+1) = 171" },
        { step: "Rearrange into a quadratic:", math: "2n^2 + n - 171 = 0" },
        { step: "Factorise:", math: "(2n + 19)(n - 9) = 0" },
        { step: "Take the positive root:", math: "\\mathbf{n = 9}" },
        { step: "Verify:", math: "S_9 = 9(2 \\times 9 + 1) = 9 \\times 19 = 171 \\checkmark" },
      ],
    },
  },

  {
    id: "geometric-sequence",
    icon: "✕",
    title: "Geometric Sequences",
    subtitle: "Constant common ratio",
    color: "#06b6d4",
    visualization: "geometric",
    desmosNote: "Change $r$ to see exponential growth ($r>1$) or decay ($0<r<1$).",
    desmosExpressions: [
      { id: "1", latex: "a=2" },
      { id: "2", latex: "r=2" },
      { id: "3", latex: "(n, a \\cdot r^{n-1}) \\left\\{1 \\le n \\le 8\\right\\}", color: "#06b6d4" },
    ],

    theory: `A **geometric sequence** (or geometric progression, GP) is a sequence where each term is obtained by multiplying the previous term by a fixed constant called the **common ratio**, $r$.

Given first term $a$ and common ratio $r$:
$$a, \\ ar, \\ ar^2, \\ ar^3, \\ \\ldots$$

**Key observations:**
- If $r > 1$: sequence grows exponentially
- If $0 < r < 1$: sequence decreases toward 0
- If $r < 0$: terms alternate in sign
- If $r = 1$: all terms equal $a$

**Checking for a GP:** verify that $\\dfrac{u_2}{u_1} = \\dfrac{u_3}{u_2} = \\cdots = r$ (constant).`,

    formulas: [
      {
        label: "nth term",
        latex: "u_n = ar^{n-1}",
        note: "$a$ = first term, $r$ = common ratio",
      },
      {
        label: "Common ratio",
        latex: "r = \\dfrac{u_{n+1}}{u_n}",
        note: "Divide any term by the term before it",
      },
    ],

    example: {
      question: "A geometric sequence has first term 4 and common ratio 3. Find the 6th term.",
      steps: [
        { label: "Identify $a$, $r$, and $n$", math: "a = 4, \\quad r = 3, \\quad n = 6" },
        { label: "Apply the nth term formula", math: "u_6 = 4 \\times 3^{6-1} = 4 \\times 3^5" },
        { label: "Calculate $3^5$", math: "3^5 = 243" },
        { label: "Final answer", math: "u_6 = 4 \\times 243 = \\mathbf{972}" },
      ],
    },

    practice: {
      question: "A geometric sequence has 3rd term 12 and 6th term 96. Find: (a) the common ratio, (b) the first term, (c) the 10th term.",
      solution: [
        { step: "Write expressions for the given terms:", math: "u_3 = ar^2 = 12 \\quad \\cdots (1)" },
        { step: "", math: "u_6 = ar^5 = 96 \\quad \\cdots (2)" },
        { step: "(a) Divide (2) by (1) to eliminate $a$:", math: "r^3 = \\frac{96}{12} = 8 \\implies r = 2" },
        { step: "(b) Substitute $r=2$ into (1):", math: "a \\times 4 = 12 \\implies a = 3" },
        { step: "(c) Apply the nth term formula:", math: "u_{10} = 3 \\times 2^{9} = 3 \\times 512 = \\mathbf{1536}" },
      ],
    },
  },

  {
    id: "geometric-series",
    icon: "Σ",
    title: "Geometric Series",
    subtitle: "Sum of a GP",
    color: "#10b981",
    visualization: "geometricSeries",
    desmosNote: "Partial sums $S_n$ grow rapidly for $r > 1$ and plateau for $|r| < 1$.",
    desmosExpressions: [
      { id: "1", latex: "a=2" },
      { id: "2", latex: "r=2" },
      { id: "3", latex: "S(n) = \\frac{a(r^n - 1)}{r - 1}" },
      { id: "4", latex: "(n, S(n)) \\left\\{1 \\le n \\le 10\\right\\}", color: "#10b981" },
    ],

    theory: `A **geometric series** is the sum of the terms of a geometric sequence:
$$S_n = a + ar + ar^2 + \\cdots + ar^{n-1}$$

**Derivation:** Multiply by $r$: $\\;rS_n = ar + ar^2 + \\cdots + ar^n$. Subtract from $S_n$:
$$S_n(1-r) = a(1 - r^n) \\implies S_n = \\frac{a(1-r^n)}{1-r}$$

This is equivalent to $S_n = \\dfrac{a(r^n - 1)}{r - 1}$ — use whichever form avoids negatives.

**Special case:** If $r = 1$, then $S_n = na$.`,

    formulas: [
      {
        label: "Sum of first n terms",
        latex: "S_n = \\dfrac{a(1 - r^n)}{1 - r} \\quad (r \\neq 1)",
        note: "Convenient when $|r| < 1$",
      },
      {
        label: "Equivalent form",
        latex: "S_n = \\dfrac{a(r^n - 1)}{r - 1} \\quad (r \\neq 1)",
        note: "Convenient when $r > 1$",
      },
    ],

    example: {
      question: "Find the sum of the first 8 terms of the GP: 2, 6, 18, 54, ...",
      steps: [
        { label: "Identify $a$, $r$, and $n$", math: "a = 2, \\quad r = 3, \\quad n = 8" },
        { label: "Apply the formula (use $r > 1$ form)", math: "S_8 = \\frac{2(3^8 - 1)}{3 - 1}" },
        { label: "Calculate $3^8$", math: "3^8 = 6561" },
        { label: "Simplify", math: "S_8 = \\frac{2 \\times 6560}{2} = \\mathbf{6560}" },
      ],
    },

    practice: {
      question: "Find the smallest value of $n$ such that the sum of the first $n$ terms of the GP $3, 6, 12, \\ldots$ exceeds 1500.",
      solution: [
        { step: "Identify $a$ and $r$:", math: "a = 3, \\quad r = 2" },
        { step: "Write the sum formula:", math: "S_n = \\frac{3(2^n - 1)}{2 - 1} = 3(2^n - 1)" },
        { step: "Set up the inequality:", math: "3(2^n - 1) > 1500 \\implies 2^n > 501" },
        { step: "Test values of $n$:", math: "2^8 = 256 < 501, \\quad 2^9 = 512 > 501" },
        { step: "Smallest value:", math: "\\mathbf{n = 9}" },
        { step: "Verify:", math: "S_9 = 3(512 - 1) = 1533 > 1500 \\checkmark, \\quad S_8 = 3(255) = 765 < 1500 \\checkmark" },
      ],
    },
  },

  {
    id: "infinite-series",
    icon: "∞",
    title: "Infinite Geometric Series",
    subtitle: "Sum to infinity when |r| < 1",
    color: "#f59e0b",
    visualization: "infinite",
    desmosNote: "As $n \\to \\infty$, $S_n$ converges to $S_\\infty = a/(1-r)$ when $|r|<1$.",
    desmosExpressions: [
      { id: "1", latex: "a=8" },
      { id: "2", latex: "r=0.5" },
      { id: "3", latex: "S_{\\infty} = \\frac{a}{1-r}" },
      { id: "4", latex: "S(n) = \\frac{a(1-r^n)}{1-r}" },
      { id: "5", latex: "(n, S(n)) \\left\\{1 \\le n \\le 20\\right\\}", color: "#f59e0b" },
      { id: "6", latex: "y = S_{\\infty}", color: "#ef4444" },
    ],

    theory: `When the common ratio satisfies $|r| < 1$, the terms of a geometric sequence get smaller and smaller, tending to zero. In this case, the sum $S_n$ approaches a **finite limit** as $n \\to \\infty$.

$$S_\\infty = \\lim_{n \\to \\infty} \\frac{a(1-r^n)}{1-r} = \\frac{a}{1-r} \\quad \\text{since } r^n \\to 0$$

**Convergence condition:** The series converges **if and only if** $|r| < 1$.
- If $|r| \\geq 1$: the series **diverges** (no finite sum to infinity)

**Intuition:** $8 + 4 + 2 + 1 + 0.5 + \\cdots$ — each term halves, and the total approaches $16$.`,

    formulas: [
      {
        label: "Sum to infinity",
        latex: "S_\\infty = \\dfrac{a}{1-r}, \\quad |r| < 1",
        note: "Only valid when the series converges ($|r| < 1$)",
      },
    ],

    example: {
      question: "Find the sum to infinity of the geometric series: $8 + 4 + 2 + 1 + \\cdots$",
      steps: [
        { label: "Identify $a$ and $r$", math: "a = 8, \\quad r = \\frac{4}{8} = \\frac{1}{2}" },
        { label: "Check convergence", math: "|r| = \\frac{1}{2} < 1 \\quad \\checkmark \\text{ (converges)}" },
        { label: "Apply the formula", math: "S_\\infty = \\frac{8}{1 - \\tfrac{1}{2}} = \\frac{8}{\\tfrac{1}{2}}" },
        { label: "Final answer", math: "S_\\infty = \\mathbf{16}" },
      ],
    },

    practice: {
      question: "A geometric series has first term $a$ and common ratio $r$. The sum to infinity is 12 and the sum of the first 3 terms is 10.5. Find $a$ and $r$.",
      solution: [
        { step: "Write two equations:", math: "\\frac{a}{1-r} = 12 \\implies a = 12(1-r) \\quad \\cdots (1)" },
        { step: "", math: "S_3 = \\frac{a(1-r^3)}{1-r} = 10.5 \\quad \\cdots (2)" },
        { step: "Substitute $a/(1-r) = 12$ into (2):", math: "12(1 - r^3) = 10.5" },
        { step: "Solve for $r$:", math: "1 - r^3 = \\frac{10.5}{12} = \\frac{7}{8} \\implies r^3 = \\frac{1}{8} \\implies r = \\frac{1}{2}" },
        { step: "Find $a$ using (1):", math: "a = 12\\left(1 - \\frac{1}{2}\\right) = \\mathbf{6}" },
        { step: "Verify:", math: "S_\\infty = \\frac{6}{1 - \\tfrac{1}{2}} = 12 \\checkmark, \\quad S_3 = 6 + 3 + 1.5 = 10.5 \\checkmark" },
      ],
    },
  },

  {
    id: "sigma-notation",
    icon: "Σ",
    title: "Sigma Notation",
    subtitle: "Compact summation notation",
    color: "#ef4444",
    visualization: "sigma",
    desmosNote: "Graph individual terms $f(r)$ to see the pattern being summed.",
    desmosExpressions: [
      { id: "1", latex: "(r, 3r - 1) \\left\\{1 \\le r \\le 5\\right\\}", color: "#ef4444" },
    ],

    theory: `**Sigma notation** uses the Greek letter $\\Sigma$ (capital sigma) to compactly represent a sum. The general form is:
$$\\sum_{r=m}^{n} f(r) = f(m) + f(m+1) + \\cdots + f(n)$$

- $r$ is the **index** (dummy variable — the letter doesn't matter)
- $m$ is the **lower limit** (starting value)
- $n$ is the **upper limit** (ending value)
- $f(r)$ is the **general term**

**Useful standard results:**
$$\\sum_{r=1}^{n} r = \\frac{n(n+1)}{2}, \\quad \\sum_{r=1}^{n} 1 = n$$

**Key properties:**
$$\\sum_{r=1}^{n} (af(r) + bg(r)) = a\\sum_{r=1}^{n} f(r) + b\\sum_{r=1}^{n} g(r)$$`,

    formulas: [
      {
        label: "Sigma notation",
        latex: "\\sum_{r=m}^{n} f(r) = f(m) + f(m+1) + \\cdots + f(n)",
        note: "Read as: 'the sum of $f(r)$ for $r$ from $m$ to $n$'",
      },
      {
        label: "Sum of first n natural numbers",
        latex: "\\sum_{r=1}^{n} r = \\dfrac{n(n+1)}{2}",
        note: "Standard result — must know this for A-Level",
      },
    ],

    example: {
      question: "Evaluate $\\displaystyle\\sum_{r=1}^{5} (3r - 1)$. Then find $\\displaystyle\\sum_{r=1}^{n} (2r + 3)$ in terms of $n$.",
      steps: [
        { label: "Part 1 — Expand directly", math: "\\sum_{r=1}^{5}(3r-1) = 2 + 5 + 8 + 11 + 14" },
        { label: "", math: "= \\mathbf{40}" },
        { label: "Part 1 check (AP method: $a=2,d=3,n=5$)", math: "S_5 = \\tfrac{5}{2}(4 + 12) = 40 \\checkmark" },
        { label: "Part 2 — Split the sum", math: "\\sum_{r=1}^{n}(2r+3) = 2\\sum_{r=1}^{n} r + \\sum_{r=1}^{n} 3" },
        { label: "Apply standard results", math: "= 2 \\cdot \\frac{n(n+1)}{2} + 3n = n(n+1) + 3n" },
        { label: "Simplify", math: "= n^2 + n + 3n = \\mathbf{n^2 + 4n} = n(n+4)" },
      ],
    },

    practice: {
      question: "(a) Write the sum $5 + 8 + 11 + \\cdots + 44$ using sigma notation.\n(b) Find the value of $\\displaystyle\\sum_{r=1}^{10}(4r - 1)$.",
      solution: [
        { step: "(a) Find the general term:", math: "\\text{AP with } a = 5, d = 3 \\implies u_r = 5 + (r-1)(3) = 3r + 2" },
        { step: "Find the upper limit (when does $3r+2=44$?):", math: "3r + 2 = 44 \\implies r = 14" },
        { step: "Write in sigma notation:", math: "5 + 8 + \\cdots + 44 = \\sum_{r=1}^{14}(3r + 2)" },
        { step: "(b) Split the sum:", math: "\\sum_{r=1}^{10}(4r-1) = 4\\sum_{r=1}^{10} r - \\sum_{r=1}^{10} 1" },
        { step: "Apply standard results:", math: "= 4 \\cdot \\frac{10 \\times 11}{2} - 10 = 4(55) - 10 = 220 - 10" },
        { step: "Final answer:", math: "= \\mathbf{210}" },
      ],
    },
  },
];
