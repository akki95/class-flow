export const CHAPTER_META = {
  id: "icse-10-matrices-ap",
  title: "Matrices & Arithmetic/Geometric Progressions",
  subtitle: "2×2 matrix operations, AP and GP — nth term and sum",
  icon: "🔢",
  color: "#8b5cf6",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "matrices",
    icon: "🔢",
    title: "Matrices (2×2)",
    subtitle: "Order, addition, subtraction, multiplication and solving matrix equations",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **matrix** is a rectangular array of numbers. A $2 \\times 2$ matrix has 2 rows and 2 columns:

$$A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$

**Types:**
- **Row matrix:** $1 \\times n$ (single row)
- **Column matrix:** $m \\times 1$ (single column)
- **Square matrix:** $m = n$
- **Zero matrix:** All elements are 0
- **Identity matrix:** $I = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$

**Addition/Subtraction:** Add/subtract corresponding elements (same order required).

**Scalar multiplication:** Multiply every element by the scalar.

**Matrix multiplication ($A \\times B$):** The element in row $i$, column $j$ of $AB$ is the dot product of row $i$ of $A$ and column $j$ of $B$.

$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}$$

**Note:** $AB \\neq BA$ in general (matrix multiplication is **not commutative**).`,
    formulas: [
      {
        label: "2×2 multiplication",
        latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}\\begin{pmatrix} e & f \\\\ g & h \\end{pmatrix} = \\begin{pmatrix} ae+bg & af+bh \\\\ ce+dg & cf+dh \\end{pmatrix}",
      },
      {
        label: "Identity",
        latex: "AI = IA = A",
      },
    ],
    example: {
      question: "If $A = \\begin{pmatrix} 2 & 1 \\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 1 & 0 \\\\ 2 & 5 \\end{pmatrix}$, find $AB$.",
      solution: `$$AB = \\begin{pmatrix} 2(1)+1(2) & 2(0)+1(5) \\\\ 3(1)+4(2) & 3(0)+4(5) \\end{pmatrix}$$

$$= \\begin{pmatrix} 2+2 & 0+5 \\\\ 3+8 & 0+20 \\end{pmatrix} = \\mathbf{\\begin{pmatrix} 4 & 5 \\\\ 11 & 20 \\end{pmatrix}}$$`,
    },
    practice: {
      question: "Find $x$ and $y$ if: $\\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix} \\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 13 \\end{pmatrix}$",
      solution: `$$\\begin{pmatrix} 2x + 0y \\\\ x + 3y \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 13 \\end{pmatrix}$$

From row 1: $2x = 4 \\implies x = 2$

From row 2: $2 + 3y = 13 \\implies 3y = 11 \\implies y = \\frac{11}{3}$

$$\\mathbf{x = 2, \\; y = \\frac{11}{3}}$$`,
    },
  },
  {
    id: "arithmetic-progression",
    icon: "📈",
    title: "Arithmetic Progression (AP)",
    subtitle: "nth term, sum of n terms and applications",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `An **Arithmetic Progression (AP)** is a sequence where each term differs from the previous by a constant called the **common difference** ($d$).

$$a, \\; a+d, \\; a+2d, \\; a+3d, \\; \\ldots$$

**$n$th term:**
$$a_n = a + (n-1)d$$

**Sum of first $n$ terms:**
$$S_n = \\frac{n}{2}[2a + (n-1)d]$$

or equivalently:
$$S_n = \\frac{n}{2}(a + l)$$
where $l = a_n$ is the last term.

**Useful results:**
- $d = a_n - a_{n-1}$
- $n$th term from the end $= l - (n-1)d$
- If $a, b, c$ are in AP, then $b = \\frac{a+c}{2}$ (arithmetic mean)
- Three terms in AP: $a - d, \\; a, \\; a + d$
- Four terms in AP: $a - 3d, \\; a - d, \\; a + d, \\; a + 3d$

**Relationship:** $a_n = S_n - S_{n-1}$ for $n \\ge 2$.`,
    formulas: [
      {
        label: "nth term",
        latex: "a_n = a + (n-1)d",
      },
      {
        label: "Sum",
        latex: "S_n = \\frac{n}{2}[2a + (n-1)d]",
      },
      {
        label: "Sum (with last term)",
        latex: "S_n = \\frac{n}{2}(a + l)",
      },
      {
        label: "Arithmetic mean",
        latex: "b = \\frac{a+c}{2}",
      },
    ],
    example: {
      question: "Find the sum of first 20 terms of the AP: 3, 7, 11, 15, …",
      solution: `$a = 3$, $d = 7 - 3 = 4$, $n = 20$

$$S_{20} = \\frac{20}{2}[2(3) + (20-1)(4)]$$

$$= 10[6 + 76] = 10 \\times 82 = \\mathbf{820}$$`,
    },
    practice: {
      question: "The 5th term of an AP is 17 and the 10th term is 32. Find the first term and common difference.",
      solution: `$a_5 = a + 4d = 17 \\quad \\cdots (1)$
$a_{10} = a + 9d = 32 \\quad \\cdots (2)$

Subtracting (1) from (2): $5d = 15 \\implies d = 3$

From (1): $a + 12 = 17 \\implies a = 5$

$$\\mathbf{a = 5, \\; d = 3}$$

The AP is: 5, 8, 11, 14, 17, …`,
    },
  },
  {
    id: "geometric-progression",
    icon: "📉",
    title: "Geometric Progression (GP)",
    subtitle: "nth term, sum of n terms and applications",
    color: "#8b5cf6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **Geometric Progression (GP)** is a sequence where each term is obtained by multiplying the previous by a constant called the **common ratio** ($r$).

$$a, \\; ar, \\; ar^2, \\; ar^3, \\; \\ldots$$

**$n$th term:**
$$a_n = ar^{n-1}$$

**Sum of first $n$ terms:**
$$S_n = \\frac{a(r^n - 1)}{r - 1} \\quad (r \\neq 1, \\; r > 1)$$
$$S_n = \\frac{a(1 - r^n)}{1 - r} \\quad (r < 1)$$

**Sum to infinity** (when $|r| < 1$):
$$S_\\infty = \\frac{a}{1 - r}$$

**Useful results:**
- $r = \\frac{a_{n+1}}{a_n}$
- If $a, b, c$ are in GP, then $b^2 = ac$ (geometric mean)
- Three terms in GP: $\\frac{a}{r}, \\; a, \\; ar$`,
    formulas: [
      {
        label: "nth term",
        latex: "a_n = ar^{n-1}",
      },
      {
        label: "Sum of n terms",
        latex: "S_n = \\frac{a(r^n - 1)}{r - 1}",
      },
      {
        label: "Sum to infinity",
        latex: "S_\\infty = \\frac{a}{1 - r} \\quad (|r| < 1)",
      },
      {
        label: "Geometric mean",
        latex: "b = \\sqrt{ac}",
      },
    ],
    example: {
      question: "Find the sum of the GP: $2, 6, 18, \\ldots$ up to 8 terms.",
      solution: `$a = 2$, $r = \\frac{6}{2} = 3$, $n = 8$

$$S_8 = \\frac{2(3^8 - 1)}{3 - 1} = \\frac{2(6561 - 1)}{2} = 6560$$

$$= \\mathbf{6560}$$`,
    },
    practice: {
      question: "The first term of a GP is 3 and the sum to infinity is 12. Find the common ratio.",
      solution: `$$S_\\infty = \\frac{a}{1 - r}$$

$$12 = \\frac{3}{1 - r}$$

$$1 - r = \\frac{3}{12} = \\frac{1}{4}$$

$$r = 1 - \\frac{1}{4} = \\mathbf{\\frac{3}{4}}$$

Check: $|r| = \\frac{3}{4} < 1$ ✓ (convergent)`,
    },
  },
];
