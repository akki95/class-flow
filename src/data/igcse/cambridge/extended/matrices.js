export const CHAPTER_META = {
  id: "cambridge-ext-matrices",
  title: "Matrices",
  subtitle: "Matrix operations, determinants, inverses and transformations",
  icon: "⊞",
  color: "#f97316",
  tier: "Extended",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "matrix-operations",
    icon: "⊞",
    title: "Matrix Operations",
    subtitle: "Addition, subtraction and multiplication of matrices",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **matrix** is a rectangular array of numbers arranged in rows and columns.

**Order (size):** An $m \\times n$ matrix has $m$ rows and $n$ columns.

**Addition and subtraction:** Matrices must have the **same order**. Add or subtract corresponding elements:
$$(A \\pm B)_{ij} = A_{ij} \\pm B_{ij}$$

**Scalar multiplication:** Multiply every element by the scalar $k$:
$$(kA)_{ij} = k \\cdot A_{ij}$$

**Matrix multiplication:** To multiply $A \\times B$:
- $A$ must be $m \\times n$ and $B$ must be $n \\times p$ (inner dimensions match)
- The result $AB$ is $m \\times p$
- Element in row $i$, column $j$ of $AB$ = **dot product** of row $i$ of $A$ with column $j$ of $B$:
$$(AB)_{ij} = \\sum_k A_{ik} B_{kj}$$

**Important:** Matrix multiplication is **not commutative** — in general $AB \\neq BA$. You can only multiply if the number of **columns** of the first matrix equals the number of **rows** of the second.`,
    formulas: [
      "Addition: $(A+B)_{ij} = A_{ij} + B_{ij}$ (same order required)",
      "Scalar: $(kA)_{ij} = k A_{ij}$",
      "Multiplication: $(AB)_{ij} = \\sum_k A_{ik}B_{kj}$",
      "Condition: columns of $A$ = rows of $B$",
      "In general: $AB \\neq BA$",
    ],
    example: {
      question:
        "$A = \\begin{pmatrix}1 & 2 \\\\ 3 & 4\\end{pmatrix}$, $B = \\begin{pmatrix}5 & 6 \\\\ 7 & 8\\end{pmatrix}$. Find $AB$.",
      solution: `$$AB = \\begin{pmatrix}1 \\times 5 + 2 \\times 7 & 1 \\times 6 + 2 \\times 8 \\\\ 3 \\times 5 + 4 \\times 7 & 3 \\times 6 + 4 \\times 8\\end{pmatrix}$$

$$= \\begin{pmatrix}5 + 14 & 6 + 16 \\\\ 15 + 28 & 18 + 32\\end{pmatrix} = \\begin{pmatrix}19 & 22 \\\\ 43 & 50\\end{pmatrix}$$`,
    },
    practice: {
      question:
        "$M = \\begin{pmatrix}2 & 1 \\\\ 0 & 3\\end{pmatrix}$, $N = \\begin{pmatrix}1 & -1 \\\\ 2 & 4\\end{pmatrix}$. Find $MN$ and $NM$. Show that $MN \\neq NM$.",
      solution: `$$MN = \\begin{pmatrix}2\\times1+1\\times2 & 2\\times(-1)+1\\times4 \\\\ 0\\times1+3\\times2 & 0\\times(-1)+3\\times4\\end{pmatrix} = \\begin{pmatrix}4 & 2 \\\\ 6 & 12\\end{pmatrix}$$

$$NM = \\begin{pmatrix}1\\times2+(-1)\\times0 & 1\\times1+(-1)\\times3 \\\\ 2\\times2+4\\times0 & 2\\times1+4\\times3\\end{pmatrix} = \\begin{pmatrix}2 & -2 \\\\ 4 & 14\\end{pmatrix}$$

Since $\\begin{pmatrix}4 & 2 \\\\ 6 & 12\\end{pmatrix} \\neq \\begin{pmatrix}2 & -2 \\\\ 4 & 14\\end{pmatrix}$, we have $MN \\neq NM$ ✓

This confirms that matrix multiplication is **not commutative**.`,
    },
  },
  {
    id: "inverse-matrix",
    icon: "⁻¹",
    title: "Determinant & Inverse Matrix",
    subtitle: "Finding the inverse of a 2×2 matrix",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `For a $2 \\times 2$ matrix $A = \\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix}$:

**Determinant:**
$$\\det(A) = ad - bc$$

**Singular vs Non-singular:**
- If $\\det(A) = 0$: the matrix is **singular** — no inverse exists
- If $\\det(A) \\neq 0$: the matrix is **non-singular** — the inverse exists

**Inverse matrix:**
$$A^{-1} = \\frac{1}{ad - bc}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}$$

The rule: **swap the diagonal elements**, **negate the off-diagonal elements**, then divide every element by $\\det(A)$.

**Key property:**
$$A A^{-1} = A^{-1} A = I = \\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix}$$

**Solving simultaneous equations:** Write the system $AX = B$, then:
$$X = A^{-1}B$$`,
    formulas: [
      "$\\det(A) = ad - bc$",
      "$A^{-1} = \\dfrac{1}{ad-bc}\\begin{pmatrix}d & -b \\\\ -c & a\\end{pmatrix}$",
      "$AA^{-1} = I = \\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix}$",
      "Solving $AX = B$: $X = A^{-1}B$",
    ],
    example: {
      question:
        "$A = \\begin{pmatrix}3 & 2 \\\\ 1 & 4\\end{pmatrix}$. Find $A^{-1}$ and verify $AA^{-1} = I$.",
      solution: `$\\det(A) = 3 \\times 4 - 2 \\times 1 = 12 - 2 = 10$

$$A^{-1} = \\frac{1}{10}\\begin{pmatrix}4 & -2 \\\\ -1 & 3\\end{pmatrix} = \\begin{pmatrix}0.4 & -0.2 \\\\ -0.1 & 0.3\\end{pmatrix}$$

**Verification:**
$$AA^{-1} = \\begin{pmatrix}3 & 2 \\\\ 1 & 4\\end{pmatrix}\\begin{pmatrix}0.4 & -0.2 \\\\ -0.1 & 0.3\\end{pmatrix}$$
$$= \\begin{pmatrix}3(0.4)+2(-0.1) & 3(-0.2)+2(0.3) \\\\ 1(0.4)+4(-0.1) & 1(-0.2)+4(0.3)\\end{pmatrix} = \\begin{pmatrix}1 & 0 \\\\ 0 & 1\\end{pmatrix} \\checkmark$$`,
    },
    practice: {
      question:
        "$M = \\begin{pmatrix}5 & 3 \\\\ 2 & 1\\end{pmatrix}$. Find $M^{-1}$ and use it to solve $5x + 3y = 11$ and $2x + y = 5$.",
      solution: `$\\det(M) = 5 \\times 1 - 3 \\times 2 = 5 - 6 = -1$

$$M^{-1} = \\frac{1}{-1}\\begin{pmatrix}1 & -3 \\\\ -2 & 5\\end{pmatrix} = \\begin{pmatrix}-1 & 3 \\\\ 2 & -5\\end{pmatrix}$$

The system $MX = B$ where $B = \\begin{pmatrix}11 \\\\ 5\\end{pmatrix}$:

$$X = M^{-1}B = \\begin{pmatrix}-1 & 3 \\\\ 2 & -5\\end{pmatrix}\\begin{pmatrix}11 \\\\ 5\\end{pmatrix} = \\begin{pmatrix}-11 + 15 \\\\ 22 - 25\\end{pmatrix} = \\begin{pmatrix}4 \\\\ -3\\end{pmatrix}$$

So $x = 4$, $y = -3$.

**Check:** $5(4) + 3(-3) = 20 - 9 = 11$ ✓ and $2(4) + (-3) = 8 - 3 = 5$ ✓`,
    },
  },
  {
    id: "transformation-matrices",
    icon: "↻",
    title: "Transformation Matrices",
    subtitle: "Using matrices to represent geometric transformations",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Matrices can represent **geometric transformations** in the plane. To transform point $(x, y)$, multiply the transformation matrix by the column vector:

$$\\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix}\\begin{pmatrix}x \\\\ y\\end{pmatrix} = \\begin{pmatrix}ax + by \\\\ cx + dy\\end{pmatrix}$$

**Standard transformation matrices:**

| Transformation | Matrix |
|---|---|
| Reflection in $x$-axis | $\\begin{pmatrix}1 & 0 \\\\ 0 & -1\\end{pmatrix}$ |
| Reflection in $y$-axis | $\\begin{pmatrix}-1 & 0 \\\\ 0 & 1\\end{pmatrix}$ |
| Reflection in $y = x$ | $\\begin{pmatrix}0 & 1 \\\\ 1 & 0\\end{pmatrix}$ |
| Rotation 90° CW about origin | $\\begin{pmatrix}0 & 1 \\\\ -1 & 0\\end{pmatrix}$ |
| Rotation 90° CCW about origin | $\\begin{pmatrix}0 & -1 \\\\ 1 & 0\\end{pmatrix}$ |
| Rotation 180° about origin | $\\begin{pmatrix}-1 & 0 \\\\ 0 & -1\\end{pmatrix}$ |
| Enlargement, scale factor $k$, centre origin | $\\begin{pmatrix}k & 0 \\\\ 0 & k\\end{pmatrix}$ |

**Combined transformations:** Apply transformation $M_1$ followed by $M_2$ using the combined matrix $M_2 M_1$ (right-to-left order — the rightmost matrix applies first).`,
    formulas: [
      "Transform point: $\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}\\begin{pmatrix}x\\\\y\\end{pmatrix}=\\begin{pmatrix}ax+by\\\\cx+dy\\end{pmatrix}$",
      "Rotation 90° CW: $\\begin{pmatrix}0&1\\\\-1&0\\end{pmatrix}$",
      "Rotation 90° CCW: $\\begin{pmatrix}0&-1\\\\1&0\\end{pmatrix}$",
      "Rotation 180°: $\\begin{pmatrix}-1&0\\\\0&-1\\end{pmatrix}$",
      "Combined: apply $M_1$ then $M_2$ gives matrix $M_2 M_1$",
    ],
    example: {
      question:
        "Rotate point $(3, 1)$ by $90°$ anticlockwise (CCW) about the origin.",
      solution: `The rotation 90° CCW matrix is $\\begin{pmatrix}0 & -1 \\\\ 1 & 0\\end{pmatrix}$

$$\\begin{pmatrix}0 & -1 \\\\ 1 & 0\\end{pmatrix}\\begin{pmatrix}3 \\\\ 1\\end{pmatrix} = \\begin{pmatrix}0 \\times 3 + (-1) \\times 1 \\\\ 1 \\times 3 + 0 \\times 1\\end{pmatrix} = \\begin{pmatrix}-1 \\\\ 3\\end{pmatrix}$$

So $(3, 1)$ maps to $(-1, 3)$.`,
    },
    practice: {
      question:
        "$M = \\begin{pmatrix}0 & 1 \\\\ -1 & 0\\end{pmatrix}$ (rotation 90° CW). (a) Find the image of $(2, 5)$ under $M$. (b) Find $M^2$ and describe the combined transformation.",
      solution: `**(a)** Image of $(2, 5)$:
$$M\\begin{pmatrix}2 \\\\ 5\\end{pmatrix} = \\begin{pmatrix}0\\times2+1\\times5 \\\\ -1\\times2+0\\times5\\end{pmatrix} = \\begin{pmatrix}5 \\\\ -2\\end{pmatrix}$$

So $(2, 5)$ maps to $(5, -2)$.

**(b)** $M^2 = MM$:
$$M^2 = \\begin{pmatrix}0 & 1 \\\\ -1 & 0\\end{pmatrix}\\begin{pmatrix}0 & 1 \\\\ -1 & 0\\end{pmatrix}$$
$$= \\begin{pmatrix}0\\times0+1\\times(-1) & 0\\times1+1\\times0 \\\\ (-1)\\times0+0\\times(-1) & (-1)\\times1+0\\times0\\end{pmatrix} = \\begin{pmatrix}-1 & 0 \\\\ 0 & -1\\end{pmatrix}$$

This is the matrix for **rotation 180° about the origin** (two 90° CW rotations = one 180° rotation).`,
    },
  },
];
