export const CHAPTER_META = {
  id: "icse-9-algebra",
  title: "Algebra",
  subtitle: "Expansions, factorisation, indices, logarithms and linear equations",
  icon: "📐",
  color: "#10b981",
  tier: "Class 9",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "expansions",
    icon: "📐",
    title: "Expansions",
    subtitle: "Identities for squares and cubes of binomials",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Standard algebraic identities:**

$$(a + b)^2 = a^2 + 2ab + b^2$$
$$(a - b)^2 = a^2 - 2ab + b^2$$
$$(a + b)(a - b) = a^2 - b^2$$

$$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3 = a^3 + b^3 + 3ab(a + b)$$
$$(a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3 = a^3 - b^3 - 3ab(a - b)$$

**Sum and difference of cubes:**
$$a^3 + b^3 = (a + b)(a^2 - ab + b^2)$$
$$a^3 - b^3 = (a - b)(a^2 + ab + b^2)$$

**Useful derived identities:**
$$(a + b)^2 + (a - b)^2 = 2(a^2 + b^2)$$
$$(a + b)^2 - (a - b)^2 = 4ab$$

These identities are used extensively in simplification, factorisation and proving algebraic results.`,
    formulas: [
      {
        label: "(a+b)²",
        latex: "(a+b)^2 = a^2 + 2ab + b^2",
      },
      {
        label: "(a-b)²",
        latex: "(a-b)^2 = a^2 - 2ab + b^2",
      },
      {
        label: "Difference of squares",
        latex: "(a+b)(a-b) = a^2 - b^2",
      },
      {
        label: "(a+b)³",
        latex: "(a+b)^3 = a^3 + b^3 + 3ab(a+b)",
      },
      {
        label: "Sum of cubes",
        latex: "a^3 + b^3 = (a+b)(a^2 - ab + b^2)",
      },
    ],
    example: {
      question: "If $x + \\frac{1}{x} = 5$, find $x^2 + \\frac{1}{x^2}$.",
      solution: `Square both sides of $x + \\frac{1}{x} = 5$:

$$\\left(x + \\frac{1}{x}\\right)^2 = 25$$

$$x^2 + 2 \\cdot x \\cdot \\frac{1}{x} + \\frac{1}{x^2} = 25$$

$$x^2 + 2 + \\frac{1}{x^2} = 25$$

$$x^2 + \\frac{1}{x^2} = 25 - 2 = \\mathbf{23}$$`,
    },
    practice: {
      question: "Expand and simplify: $(2x + 3)^3$",
      solution: `Using $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$ with $a = 2x, b = 3$:

$$(2x)^3 + 3(2x)^2(3) + 3(2x)(3)^2 + (3)^3$$

$$= 8x^3 + 3(4x^2)(3) + 3(2x)(9) + 27$$

$$= \\mathbf{8x^3 + 36x^2 + 54x + 27}$$`,
    },
  },
  {
    id: "factorisation",
    icon: "🔓",
    title: "Factorisation",
    subtitle: "Common factors, grouping, identities and splitting the middle term",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Factorisation** is the reverse of expansion — writing an expression as a product of factors.

**Method 1 — Common factor:**
$$6x^2 + 9x = 3x(2x + 3)$$

**Method 2 — Grouping:**
$$ax + ay + bx + by = a(x + y) + b(x + y) = (a + b)(x + y)$$

**Method 3 — Using identities:**
$$x^2 - 9 = (x + 3)(x - 3) \\quad \\text{(difference of squares)}$$
$$x^2 + 6x + 9 = (x + 3)^2 \\quad \\text{(perfect square)}$$

**Method 4 — Splitting the middle term** (for $ax^2 + bx + c$):
1. Find two numbers whose product $= ac$ and sum $= b$.
2. Split $bx$ into two terms using these numbers.
3. Factorise by grouping.

**Method 5 — Sum/difference of cubes:**
$$8x^3 + 27 = (2x)^3 + 3^3 = (2x + 3)(4x^2 - 6x + 9)$$`,
    formulas: [
      {
        label: "Difference of squares",
        latex: "a^2 - b^2 = (a+b)(a-b)",
      },
      {
        label: "Perfect square",
        latex: "a^2 \\pm 2ab + b^2 = (a \\pm b)^2",
      },
      {
        label: "Splitting middle term",
        latex: "ax^2 + bx + c: \\text{ find } m,n \\text{ where } mn = ac, \\; m+n = b",
      },
    ],
    example: {
      question: "Factorise: $6x^2 + 7x - 3$",
      solution: `$a \\times c = 6 \\times (-3) = -18$

Find two numbers with product $-18$ and sum $7$: **9 and $-2$**.

$$6x^2 + 9x - 2x - 3$$

$$= 3x(2x + 3) - 1(2x + 3)$$

$$= \\mathbf{(3x - 1)(2x + 3)}$$`,
    },
    practice: {
      question: "Factorise: $x^3 + 3x^2 - x - 3$",
      solution: `Group in pairs:

$$x^2(x + 3) - 1(x + 3)$$

$$= (x^2 - 1)(x + 3)$$

$$= \\mathbf{(x + 1)(x - 1)(x + 3)}$$`,
    },
  },
  {
    id: "indices",
    icon: "⚡",
    title: "Indices & Exponents",
    subtitle: "Laws of indices, negative and fractional exponents",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Index laws:**
$$a^m \\times a^n = a^{m+n}$$
$$a^m \\div a^n = a^{m-n}$$
$$(a^m)^n = a^{mn}$$
$$(ab)^n = a^n b^n$$
$$\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$$

**Special cases:**
$$a^0 = 1 \\quad (a \\neq 0)$$
$$a^{-n} = \\frac{1}{a^n}$$

**Fractional indices:**
$$a^{\\frac{1}{n}} = \\sqrt[n]{a}$$
$$a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^m = \\sqrt[n]{a^m}$$

**Solving equations with indices:**
If $a^x = a^y$ then $x = y$ (same base, equate powers).`,
    formulas: [
      {
        label: "Product",
        latex: "a^m \\times a^n = a^{m+n}",
      },
      {
        label: "Quotient",
        latex: "a^m \\div a^n = a^{m-n}",
      },
      {
        label: "Negative index",
        latex: "a^{-n} = \\frac{1}{a^n}",
      },
      {
        label: "Fractional index",
        latex: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m}",
      },
    ],
    example: {
      question: "Simplify: $\\frac{3^{n+1} \\times 9^{n-1}}{27^n}$",
      solution: `Write everything in base 3:

$$9 = 3^2, \\quad 27 = 3^3$$

$$\\frac{3^{n+1} \\times 3^{2(n-1)}}{3^{3n}} = \\frac{3^{n+1} \\times 3^{2n-2}}{3^{3n}}$$

$$= \\frac{3^{(n+1)+(2n-2)}}{3^{3n}} = \\frac{3^{3n-1}}{3^{3n}}$$

$$= 3^{3n-1-3n} = 3^{-1} = \\mathbf{\\frac{1}{3}}$$`,
    },
    practice: {
      question: "Evaluate: $\\left(\\frac{27}{8}\\right)^{-\\frac{2}{3}}$",
      solution: `$$\\left(\\frac{27}{8}\\right)^{-\\frac{2}{3}} = \\left(\\frac{8}{27}\\right)^{\\frac{2}{3}}$$

$$= \\left(\\frac{2^3}{3^3}\\right)^{\\frac{2}{3}} = \\frac{2^2}{3^2} = \\mathbf{\\frac{4}{9}}$$`,
    },
  },
  {
    id: "logarithms",
    icon: "📝",
    title: "Logarithms",
    subtitle: "Log rules, change of base, and solving log equations",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **logarithm** is the inverse of exponentiation:

$$\\text{If } a^x = b, \\text{ then } \\log_a b = x$$

**Key values:**
$$\\log_a 1 = 0, \\quad \\log_a a = 1$$

**Laws of logarithms:**
$$\\log_a(mn) = \\log_a m + \\log_a n$$
$$\\log_a\\left(\\frac{m}{n}\\right) = \\log_a m - \\log_a n$$
$$\\log_a(m^p) = p \\cdot \\log_a m$$

**Change of base formula:**
$$\\log_a b = \\frac{\\log_c b}{\\log_c a}$$

**Common logarithms** use base 10 (written as $\\log$):
$$\\log 10 = 1, \\quad \\log 100 = 2, \\quad \\log 1000 = 3$$

**Solving logarithmic equations:** Convert to exponential form or use log laws to combine/simplify.`,
    formulas: [
      {
        label: "Definition",
        latex: "a^x = b \\iff \\log_a b = x",
      },
      {
        label: "Product rule",
        latex: "\\log_a(mn) = \\log_a m + \\log_a n",
      },
      {
        label: "Quotient rule",
        latex: "\\log_a\\left(\\frac{m}{n}\\right) = \\log_a m - \\log_a n",
      },
      {
        label: "Power rule",
        latex: "\\log_a(m^p) = p \\cdot \\log_a m",
      },
    ],
    example: {
      question: "If $\\log 2 = 0.3010$ and $\\log 3 = 0.4771$, find $\\log 12$.",
      solution: `$$\\log 12 = \\log(4 \\times 3) = \\log 4 + \\log 3$$

$$= \\log 2^2 + \\log 3 = 2\\log 2 + \\log 3$$

$$= 2(0.3010) + 0.4771$$

$$= 0.6020 + 0.4771 = \\mathbf{1.0791}$$`,
    },
    practice: {
      question: "Solve: $\\log_2(x - 1) + \\log_2(x + 1) = 3$",
      solution: `Using the product rule:

$$\\log_2[(x-1)(x+1)] = 3$$

$$\\log_2(x^2 - 1) = 3$$

$$x^2 - 1 = 2^3 = 8$$

$$x^2 = 9$$

$$x = \\pm 3$$

Since $\\log$ requires positive arguments: $x - 1 > 0$ and $x + 1 > 0$, so $x > 1$.

$$x = \\mathbf{3}$$`,
    },
  },
  {
    id: "linear-equations",
    icon: "⚖️",
    title: "Simultaneous Linear Equations",
    subtitle: "Solving pairs of equations by elimination and substitution",
    color: "#10b981",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Simultaneous equations** are two (or more) equations with two unknowns that must be solved together.

**Method 1 — Elimination:**
1. Make the coefficients of one variable the same in both equations.
2. Add or subtract the equations to eliminate that variable.
3. Solve for the remaining variable, then substitute back.

**Method 2 — Substitution:**
1. Express one variable in terms of the other from one equation.
2. Substitute into the second equation.
3. Solve and back-substitute.

**Graphical interpretation:** Each linear equation represents a straight line. The solution is the point of intersection.

**Word problems:** Translate the given information into two equations, then solve simultaneously.`,
    formulas: [
      {
        label: "General form",
        latex: "a_1x + b_1y = c_1, \\quad a_2x + b_2y = c_2",
      },
    ],
    example: {
      question: "Solve: $3x + 2y = 12$ and $5x - 2y = 4$",
      solution: `**Add** the two equations (the $y$ terms cancel):

$$3x + 2y + 5x - 2y = 12 + 4$$

$$8x = 16 \\implies x = 2$$

Substitute $x = 2$ into equation 1:

$$3(2) + 2y = 12 \\implies 6 + 2y = 12 \\implies y = 3$$

$$\\mathbf{x = 2, \\; y = 3}$$`,
    },
    practice: {
      question: "The sum of two numbers is 15 and their difference is 3. Find the numbers.",
      solution: `Let the numbers be $x$ and $y$ where $x > y$.

$$x + y = 15 \\quad \\cdots (1)$$
$$x - y = 3 \\quad \\cdots (2)$$

Adding: $2x = 18 \\implies x = 9$

From (1): $y = 15 - 9 = 6$

The numbers are $\\mathbf{9}$ and $\\mathbf{6}$. ✓ ($9 + 6 = 15$, $9 - 6 = 3$)`,
    },
  },
];
