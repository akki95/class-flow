export const CHAPTER_META = {
  id: "gcse-number-89",
  title: "Number",
  subtitle: "Grade 8–9 Higher Number",
  icon: "🔢",
  color: "#f97316",
  grade: "8-9",
  paper: "GCSE Higher",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "surds-89",
    icon: "√",
    title: "Harder Surds",
    subtitle: "Complex simplification and rationalisation",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Extend Grade 6–7 surds to harder problems.

**Rationalise with conjugate denominators** when the denominator is of the form $a+b\\sqrt{n}$: multiply numerator and denominator by the conjugate $a-b\\sqrt{n}$.

Key identity: $(a+\\sqrt{b})(a-\\sqrt{b})=a^2-b$ — always gives a **rational** result.

**Square root of a fraction:** $\\sqrt{\\dfrac{a}{b}}=\\dfrac{\\sqrt{a}}{\\sqrt{b}}$

Simplify expressions involving multiple surds and prove identities by expanding and comparing.`,
    formulas: [
      {
        label: "Conjugate rationalisation",
        value:
          "$\\dfrac{p+q\\sqrt{n}}{a+b\\sqrt{n}} = \\dfrac{(p+q\\sqrt{n})(a-b\\sqrt{n})}{a^2-b^2 n}$",
      },
      {
        label: "Surd fraction",
        value: "$\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$",
      },
      {
        label: "Conjugate product",
        value: "$(a+\\sqrt{b})(a-\\sqrt{b})=a^2-b$",
      },
    ],
    example: {
      question:
        "Show that $\\dfrac{5+2\\sqrt{3}}{2+\\sqrt{3}} = 4-\\sqrt{3}$.",
      solution: `Multiply numerator and denominator by the conjugate $(2-\\sqrt{3})$:

$$\\frac{(5+2\\sqrt{3})(2-\\sqrt{3})}{(2+\\sqrt{3})(2-\\sqrt{3})} = \\frac{10-5\\sqrt{3}+4\\sqrt{3}-2\\times 3}{4-3} = \\frac{10-\\sqrt{3}-6}{1} = 4-\\sqrt{3} \\qquad ✓$$`,
    },
    practice: {
      question:
        "Simplify $(\\sqrt{5}+\\sqrt{3})^2-(\\sqrt{5}-\\sqrt{3})^2$.",
      solution: `$$(\\sqrt{5}+\\sqrt{3})^2 = 5+2\\sqrt{15}+3 = 8+2\\sqrt{15}$$
$$(\\sqrt{5}-\\sqrt{3})^2 = 5-2\\sqrt{15}+3 = 8-2\\sqrt{15}$$

$$(8+2\\sqrt{15})-(8-2\\sqrt{15}) = \\mathbf{4\\sqrt{15}}$$`,
    },
  },
  {
    id: "growth-decay",
    icon: "📈",
    title: "Growth & Decay",
    subtitle: "Compound interest, depreciation and exponential models",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Compound growth/decay** formula:

$$A = P\\left(1 \\pm \\frac{r}{100}\\right)^n$$

where $P$ = initial value, $r$ = percentage rate, $n$ = number of periods.

- **Compound interest (growth):** use $+$, multiplier $> 1$.
- **Depreciation (decay):** use $-$, multiplier $< 1$.

**Finding original value:** divide by the multiplier raised to the appropriate power.

**Finding when a threshold is crossed:** solve an inequality using logarithms (or trial and improvement at GCSE).

Exponential graphs $y = a^x$ pass through $(0,1)$ and are always positive.`,
    formulas: [
      {
        label: "Compound growth",
        value: "$A = P\\left(1 + \\dfrac{r}{100}\\right)^n$",
      },
      {
        label: "Depreciation / decay",
        value: "$A = P\\left(1 - \\dfrac{r}{100}\\right)^n$",
      },
    ],
    example: {
      question:
        "£5000 is invested at 3.5% compound interest per year. Find the value after 4 years.",
      solution: `$$A = 5000 \\times (1.035)^4 = 5000 \\times 1.14752\\ldots \\approx \\mathbf{\\£5737.50}$$`,
    },
    practice: {
      question:
        "A car is bought for £18,000 and depreciates by 15% per year. (a) Find its value after 3 years. (b) Find after how many complete years its value first drops below £10,000.",
      solution: `**(a)** $A = 18000 \\times (0.85)^3 = 18000 \\times 0.614125 \\approx \\mathbf{\\£11{,}054}$

**(b)** Solve $18000 \\times (0.85)^n < 10000$:

$$(0.85)^n < \\frac{10000}{18000} = \\frac{5}{9}$$

$$n\\log(0.85) < \\log\\!\\left(\\frac{5}{9}\\right) \\implies n > \\frac{\\log(5/9)}{\\log(0.85)} \\approx \\frac{-0.2553}{-0.0706} \\approx 3.62$$

After **4 complete years** the value first drops below £10,000.`,
    },
  },
  {
    id: "geometric-algebra",
    icon: "⬜",
    title: "Geometric Problems with Algebra",
    subtitle: "Setting up and solving equations from geometric contexts",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `Many Grade 8–9 problems require **setting up equations from geometric contexts** (area, perimeter, angles) and solving — often leading to a quadratic.

**Method:**
1. Express all lengths or angles in terms of $x$.
2. Form an equation from the geometric constraint.
3. Solve (usually by factorising or the quadratic formula).
4. **Reject invalid solutions** (e.g. negative lengths or angles).

**Common contexts:** rectangle with given area, triangle with angle sum 180°, similar triangles, Pythagoras' theorem.`,
    formulas: [
      {
        label: "Rectangle area",
        value: "$A = \\text{length} \\times \\text{width}$",
      },
      { label: "Triangle angle sum", value: "$180°$" },
      {
        label: "Pythagoras",
        value: "$a^2 + b^2 = c^2$ (right-angled triangle)",
      },
    ],
    example: {
      question:
        "A rectangle has width $x$ cm and length $(x+4)$ cm. Its area is 96 cm². Find $x$.",
      solution: `$$x(x+4) = 96 \\implies x^2+4x-96=0 \\implies (x+12)(x-8)=0$$

$x=8$ (reject $x=-12$ as length must be positive).

Width $= 8$ cm, Length $= 12$ cm. ✓`,
    },
    practice: {
      question:
        "A right-angled triangle has legs $x$ and $(x+1)$ and hypotenuse $(x+2)$. Find $x$ and the side lengths.",
      solution: `By Pythagoras:

$$x^2+(x+1)^2=(x+2)^2$$
$$x^2+x^2+2x+1=x^2+4x+4$$
$$x^2-2x-3=0$$
$$(x-3)(x+1)=0$$

$x=3$ (reject $x=-1$).

Sides: $\\mathbf{3, 4, 5}$. ✓`,
    },
  },
];
