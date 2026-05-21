// FILE: src/data/pureMaths/vectors.js

export const CHAPTER_META = {
  id: "vectors",
  title: "Vectors",
  subtitle: "2D vectors, magnitude and position vectors",
  icon: "→",
  color: "#86efac",
  videoUrl: "https://www.youtube.com/watch?v=EJ3dwJfmzpI",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "vector-basics",
    icon: "→",
    title: "Introduction to Vectors",
    subtitle: "Notation, addition and scalar multiplication",
    color: "#86efac",
    visualization: null,
    desmosNote: "Vector addition: tail-to-tip rule. Change $\\vec{u}$ and $\\vec{v}$ to see the resultant.",
    desmosExpressions: [
      { id: "1", latex: "\\vec{u}=\\left(3,2\\right)" },
      { id: "2", latex: "\\vec{v}=\\left(1,4\\right)" },
      { id: "3", latex: "\\vec{u}+\\vec{v}" },
    ],
    theory: `A **vector** has both **magnitude** (size) and **direction**. Contrast this with a scalar, which has magnitude only.\n\n**Notation:**\n- Column form: $\\begin{pmatrix}a_1\\\\a_2\\end{pmatrix}$\n- $\\mathbf{i}$-$\\mathbf{j}$ form: $a_1\\mathbf{i} + a_2\\mathbf{j}$, where $\\mathbf{i} = \\begin{pmatrix}1\\\\0\\end{pmatrix}$ and $\\mathbf{j} = \\begin{pmatrix}0\\\\1\\end{pmatrix}$\n- Bold letter: $\\mathbf{a}$ (in print) or underlined $\\underline{a}$ (handwritten)\n\n**Key facts:**\n- The **zero vector** $\\mathbf{0}$ has zero magnitude and no defined direction.\n- Vectors are **added tip-to-tail** (triangle law) or by component.\n- **Scalar multiplication**: $k\\mathbf{a}$ stretches $\\mathbf{a}$ by factor $|k|$; if $k<0$ the direction reverses.\n- Two vectors are **equal** if and only if they have the same magnitude and direction (position in space is irrelevant).\n- The **negative** of $\\mathbf{a}$ is $-\\mathbf{a}$: same magnitude, opposite direction.`,
    formulas: [
      {
        label: "Column vector",
        latex: "\\mathbf{a} = \\begin{pmatrix} a_1 \\\\ a_2 \\end{pmatrix}",
      },
      {
        label: "i-j form",
        latex: "\\mathbf{a} = a_1\\mathbf{i} + a_2\\mathbf{j}",
      },
      {
        label: "Vector addition",
        latex: "\\mathbf{a}+\\mathbf{b} = \\begin{pmatrix} a_1+b_1 \\\\ a_2+b_2 \\end{pmatrix}",
      },
      {
        label: "Scalar multiple",
        latex: "k\\mathbf{a} = \\begin{pmatrix} ka_1 \\\\ ka_2 \\end{pmatrix}",
      },
    ],
    example: {
      question: "Given $\\mathbf{a} = \\begin{pmatrix}3\\\\-1\\end{pmatrix}$ and $\\mathbf{b} = \\begin{pmatrix}-2\\\\4\\end{pmatrix}$, find (a) $\\mathbf{a}+\\mathbf{b}$, (b) $2\\mathbf{a}-\\mathbf{b}$.",
      steps: [
        {
          label: "(a) Add componentwise",
          math: "\\mathbf{a}+\\mathbf{b} = \\begin{pmatrix}3+(-2)\\\\-1+4\\end{pmatrix} = \\begin{pmatrix}1\\\\3\\end{pmatrix}",
        },
        {
          label: "(b) Compute $2\\mathbf{a}$ then subtract $\\mathbf{b}$",
          math: "2\\mathbf{a} = \\begin{pmatrix}6\\\\-2\\end{pmatrix}, \\quad 2\\mathbf{a}-\\mathbf{b} = \\begin{pmatrix}6-(-2)\\\\-2-4\\end{pmatrix} = \\begin{pmatrix}8\\\\-6\\end{pmatrix}",
        },
      ],
    },
    practice: {
      question: "Given $\\mathbf{p} = 2\\mathbf{i}-3\\mathbf{j}$ and $\\mathbf{q} = -\\mathbf{i}+5\\mathbf{j}$, find $|\\mathbf{p}+\\mathbf{q}|$ and $3\\mathbf{p}-2\\mathbf{q}$.",
      solution: [
        {
          step: "Find $\\mathbf{p}+\\mathbf{q}$",
          math: "\\mathbf{p}+\\mathbf{q} = (2-1)\\mathbf{i}+(-3+5)\\mathbf{j} = \\mathbf{i}+2\\mathbf{j}",
        },
        {
          step: "Find $|\\mathbf{p}+\\mathbf{q}|$",
          math: "|\\mathbf{p}+\\mathbf{q}| = \\sqrt{1^2+2^2} = \\sqrt{5}",
        },
        {
          step: "Find $3\\mathbf{p}-2\\mathbf{q}$",
          math: "3\\mathbf{p} = 6\\mathbf{i}-9\\mathbf{j}, \\quad 2\\mathbf{q} = -2\\mathbf{i}+10\\mathbf{j}",
        },
        {
          step: "Subtract",
          math: "3\\mathbf{p}-2\\mathbf{q} = (6-(-2))\\mathbf{i}+(-9-10)\\mathbf{j} = 8\\mathbf{i}-19\\mathbf{j}",
        },
      ],
    },
  },
  {
    id: "magnitude-unit",
    icon: "|v|",
    title: "Magnitude & Unit Vectors",
    subtitle: "Length of a vector, direction",
    color: "#86efac",
    visualization: null,
    desmosNote: "Plot $\\vec{a}=(5,-12)$ and its unit vector to see that both point the same way but the unit vector has length 1.",
    desmosExpressions: [],
    theory: `The **magnitude** (or length) of vector $\\mathbf{a} = \\begin{pmatrix}a_1\\\\a_2\\end{pmatrix}$ is:\n$$|\\mathbf{a}| = \\sqrt{a_1^2 + a_2^2}$$\n(By Pythagoras' theorem on the right triangle formed by the components.)\n\nA **unit vector** has magnitude exactly $1$. To find the unit vector in the direction of $\\mathbf{a}$:\n$$\\hat{\\mathbf{a}} = \\frac{\\mathbf{a}}{|\\mathbf{a}|}$$\n\n**Parallel vectors:** $\\mathbf{a}$ and $\\mathbf{b}$ are parallel if and only if $\\mathbf{a} = k\\mathbf{b}$ for some scalar $k$. Note:\n- $k > 0$: same direction.\n- $k < 0$: opposite directions.\n\n**Direction angle:** The angle $\\theta$ that $\\mathbf{a}$ makes with the positive $x$-axis satisfies $\\tan\\theta = \\dfrac{a_2}{a_1}$ (adjust to the correct quadrant).`,
    formulas: [
      {
        label: "Magnitude",
        latex: "|\\mathbf{a}| = \\sqrt{a_1^2+a_2^2}",
      },
      {
        label: "Unit vector",
        latex: "\\hat{\\mathbf{a}} = \\frac{\\mathbf{a}}{|\\mathbf{a}|}",
      },
      {
        label: "Parallel condition",
        latex: "\\mathbf{a} \\parallel \\mathbf{b} \\iff \\mathbf{a} = k\\mathbf{b}",
      },
    ],
    example: {
      question: "Find the unit vector in the direction of $\\mathbf{a} = \\begin{pmatrix}5\\\\-12\\end{pmatrix}$.",
      steps: [
        {
          label: "Find $|\\mathbf{a}|$",
          math: "|\\mathbf{a}| = \\sqrt{5^2+(-12)^2} = \\sqrt{25+144} = \\sqrt{169} = 13",
        },
        {
          label: "Divide by the magnitude",
          math: "\\hat{\\mathbf{a}} = \\frac{1}{13}\\begin{pmatrix}5\\\\-12\\end{pmatrix} = \\frac{5\\mathbf{i}-12\\mathbf{j}}{13}",
        },
      ],
    },
    practice: {
      question: "Given $\\mathbf{a} = 3\\mathbf{i}+4\\mathbf{j}$ and $\\mathbf{b} = 6\\mathbf{i}+8\\mathbf{j}$, show that $\\mathbf{a}$ and $\\mathbf{b}$ are parallel and find $|\\mathbf{a}|$ and $|\\mathbf{b}|$.",
      solution: [
        {
          step: "Show $\\mathbf{b} = k\\mathbf{a}$ for some scalar $k$",
          math: "\\mathbf{b} = 6\\mathbf{i}+8\\mathbf{j} = 2(3\\mathbf{i}+4\\mathbf{j}) = 2\\mathbf{a} \\implies \\mathbf{a} \\parallel \\mathbf{b}",
        },
        {
          step: "Find $|\\mathbf{a}|$",
          math: "|\\mathbf{a}| = \\sqrt{3^2+4^2} = \\sqrt{9+16} = 5",
        },
        {
          step: "Find $|\\mathbf{b}|$",
          math: "|\\mathbf{b}| = \\sqrt{6^2+8^2} = \\sqrt{36+64} = 10 = 2|\\mathbf{a}|",
        },
      ],
    },
  },
  {
    id: "position-vectors",
    icon: "OA",
    title: "Position Vectors & Applications",
    subtitle: "Point positions, displacement and geometry",
    color: "#86efac",
    visualization: null,
    desmosNote: "Plot points $A(1,2)$ and $B(5,4)$, draw the position vectors $\\overrightarrow{OA}$ and $\\overrightarrow{OB}$, and verify $\\overrightarrow{AB} = \\mathbf{b}-\\mathbf{a}$.",
    desmosExpressions: [],
    theory: `The **position vector** of a point $P$ is $\\overrightarrow{OP}$ — the vector from the origin $O$ to $P$. If $P$ has coordinates $(p_1, p_2)$, then $\\overrightarrow{OP} = \\begin{pmatrix}p_1\\\\p_2\\end{pmatrix}$.\n\n**Displacement vector** between two points:\n$$\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$$\nwhere $\\mathbf{a}$ and $\\mathbf{b}$ are the position vectors of $A$ and $B$ respectively.\n\n**Midpoint** of $AB$:\n$$\\mathbf{m} = \\frac{\\mathbf{a}+\\mathbf{b}}{2}$$\n\n**Collinearity:** Points $A$, $B$, $C$ are **collinear** (lie on the same straight line) if and only if $\\overrightarrow{AB} = k\\,\\overrightarrow{AC}$ for some scalar $k$. Equivalently, $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$ are parallel and share the common point $A$.`,
    formulas: [
      {
        label: "Displacement vector",
        latex: "\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}",
      },
      {
        label: "Midpoint",
        latex: "\\mathbf{m} = \\frac{\\mathbf{a}+\\mathbf{b}}{2}",
      },
      {
        label: "Collinearity",
        latex: "\\overrightarrow{AB} = k\\overrightarrow{AC} \\text{ for scalar } k",
      },
    ],
    example: {
      question: "Point $A$ has position vector $\\begin{pmatrix}1\\\\2\\end{pmatrix}$ and $B$ has position vector $\\begin{pmatrix}5\\\\4\\end{pmatrix}$. Find: (a) $\\overrightarrow{AB}$, (b) the midpoint $M$ of $AB$, (c) the point $P$ such that $\\overrightarrow{AP} = 2\\overrightarrow{AB}$.",
      steps: [
        {
          label: "(a) Displacement $\\overrightarrow{AB} = \\mathbf{b}-\\mathbf{a}$",
          math: "\\overrightarrow{AB} = \\begin{pmatrix}5\\\\4\\end{pmatrix} - \\begin{pmatrix}1\\\\2\\end{pmatrix} = \\begin{pmatrix}4\\\\2\\end{pmatrix}",
        },
        {
          label: "(b) Midpoint $M$",
          math: "M = \\frac{1}{2}\\left(\\begin{pmatrix}1\\\\2\\end{pmatrix}+\\begin{pmatrix}5\\\\4\\end{pmatrix}\\right) = \\begin{pmatrix}3\\\\3\\end{pmatrix}",
        },
        {
          label: "(c) Position vector of $P = \\mathbf{a} + 2\\overrightarrow{AB}$",
          math: "\\overrightarrow{OP} = \\begin{pmatrix}1\\\\2\\end{pmatrix} + 2\\begin{pmatrix}4\\\\2\\end{pmatrix} = \\begin{pmatrix}9\\\\6\\end{pmatrix}",
        },
      ],
    },
    practice: {
      question: "Points $A(2,-1)$, $B(6,3)$ and $C(14,11)$ are given. Show that $A$, $B$ and $C$ are collinear.",
      solution: [
        {
          step: "Find $\\overrightarrow{AB}$",
          math: "\\overrightarrow{AB} = \\begin{pmatrix}6-2\\\\3-(-1)\\end{pmatrix} = \\begin{pmatrix}4\\\\4\\end{pmatrix}",
        },
        {
          step: "Find $\\overrightarrow{AC}$",
          math: "\\overrightarrow{AC} = \\begin{pmatrix}14-2\\\\11-(-1)\\end{pmatrix} = \\begin{pmatrix}12\\\\12\\end{pmatrix}",
        },
        {
          step: "Express as a scalar multiple",
          math: "\\overrightarrow{AC} = 3\\overrightarrow{AB}",
        },
        {
          step: "Conclusion",
          math: "\\overrightarrow{AC} = 3\\overrightarrow{AB} \\implies A,\\,B,\\,C \\text{ are collinear (shared point }A\\text{, parallel directions)}",
        },
      ],
    },
  },
];
