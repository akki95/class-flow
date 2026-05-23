export const CHAPTER_META = {
  id: "icse-9-commercial",
  title: "Commercial Mathematics",
  subtitle: "Compound interest, profit & loss, and growth & depreciation",
  icon: "💰",
  color: "#f59e0b",
  tier: "Class 9",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "compound-interest",
    icon: "🏦",
    title: "Compound Interest",
    subtitle: "CI formula, half-yearly/quarterly compounding, growth and depreciation",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Simple Interest** is calculated on the original principal only:
$$\\text{SI} = \\frac{P \\times R \\times T}{100}$$

**Compound Interest** is calculated on the principal **plus** accumulated interest:
$$A = P\\left(1 + \\frac{R}{100}\\right)^n$$
$$\\text{CI} = A - P$$

where $P$ = principal, $R$ = rate per annum, $n$ = number of years, $A$ = amount.

**Half-yearly compounding:** Rate is halved, time is doubled.
$$A = P\\left(1 + \\frac{R}{200}\\right)^{2n}$$

**Quarterly compounding:** Rate is quartered, time is multiplied by 4.
$$A = P\\left(1 + \\frac{R}{400}\\right)^{4n}$$

**Growth and Depreciation:**
- Population/value growth: $A = P\\left(1 + \\frac{R}{100}\\right)^n$
- Depreciation: $A = P\\left(1 - \\frac{R}{100}\\right)^n$

**When rates differ each year:**
$$A = P\\left(1 + \\frac{R_1}{100}\\right)\\left(1 + \\frac{R_2}{100}\\right)\\left(1 + \\frac{R_3}{100}\\right)$$`,
    formulas: [
      {
        label: "Amount (CI)",
        latex: "A = P\\left(1 + \\frac{R}{100}\\right)^n",
      },
      {
        label: "CI",
        latex: "\\text{CI} = A - P",
      },
      {
        label: "Half-yearly",
        latex: "A = P\\left(1 + \\frac{R}{200}\\right)^{2n}",
      },
      {
        label: "Depreciation",
        latex: "A = P\\left(1 - \\frac{R}{100}\\right)^n",
      },
    ],
    example: {
      question: "Find the compound interest on ₹12,000 at 10% p.a. for 2 years, compounded half-yearly.",
      solution: `$P = 12000$, $R = 10\\%$, $n = 2$ years.

Half-yearly: rate $= \\frac{10}{2} = 5\\%$, periods $= 2 \\times 2 = 4$.

$$A = 12000\\left(1 + \\frac{5}{100}\\right)^4 = 12000 \\times (1.05)^4$$

$$(1.05)^4 = 1.21550625$$

$$A = 12000 \\times 1.21550625 = ₹14586.08$$

$$\\text{CI} = 14586.08 - 12000 = \\mathbf{₹2586.08}$$`,
    },
    practice: {
      question: "A machine worth ₹50,000 depreciates at 8% per annum. Find its value after 3 years.",
      solution: `$$A = 50000\\left(1 - \\frac{8}{100}\\right)^3 = 50000 \\times (0.92)^3$$

$$(0.92)^3 = 0.778688$$

$$A = 50000 \\times 0.778688 = \\mathbf{₹38,934.40}$$

Depreciation $= 50000 - 38934.40 = ₹11,065.60$`,
    },
  },
  {
    id: "profit-loss",
    icon: "📊",
    title: "Profit, Loss & Discount",
    subtitle: "Cost price, selling price, marked price and successive discounts",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Key terms:**
- **Cost Price (CP):** Price at which an article is bought.
- **Selling Price (SP):** Price at which an article is sold.
- **Marked Price (MP):** Price listed on the article (list price).

**Profit and Loss:**
$$\\text{Profit} = \\text{SP} - \\text{CP} \\quad (\\text{when SP} > \\text{CP})$$
$$\\text{Loss} = \\text{CP} - \\text{SP} \\quad (\\text{when CP} > \\text{SP})$$
$$\\text{Profit}\\% = \\frac{\\text{Profit}}{\\text{CP}} \\times 100$$
$$\\text{Loss}\\% = \\frac{\\text{Loss}}{\\text{CP}} \\times 100$$

**Discount:**
$$\\text{Discount} = \\text{MP} - \\text{SP}$$
$$\\text{Discount}\\% = \\frac{\\text{Discount}}{\\text{MP}} \\times 100$$

**Successive discounts** of $d_1\\%$ and $d_2\\%$:
$$\\text{SP} = \\text{MP} \\times \\left(1 - \\frac{d_1}{100}\\right)\\left(1 - \\frac{d_2}{100}\\right)$$

**Single equivalent discount** for successive discounts $d_1\\%$ and $d_2\\%$:
$$d = d_1 + d_2 - \\frac{d_1 \\times d_2}{100}$$`,
    formulas: [
      {
        label: "Profit %",
        latex: "\\text{Profit}\\% = \\frac{\\text{SP} - \\text{CP}}{\\text{CP}} \\times 100",
      },
      {
        label: "Discount %",
        latex: "\\text{Discount}\\% = \\frac{\\text{MP} - \\text{SP}}{\\text{MP}} \\times 100",
      },
      {
        label: "Equivalent discount",
        latex: "d = d_1 + d_2 - \\frac{d_1 \\cdot d_2}{100}",
      },
    ],
    example: {
      question: "A shopkeeper marks an article 40% above cost price and offers a discount of 15%. Find his profit percentage.",
      solution: `Let CP $= ₹100$.

MP $= 100 + 40 = ₹140$

Discount $= 15\\%$ of $140 = ₹21$

SP $= 140 - 21 = ₹119$

Profit $= 119 - 100 = ₹19$

$$\\text{Profit}\\% = \\frac{19}{100} \\times 100 = \\mathbf{19\\%}$$`,
    },
    practice: {
      question: "An article is listed at ₹800. Two successive discounts of 20% and 10% are offered. Find the single equivalent discount.",
      solution: `$$d = 20 + 10 - \\frac{20 \\times 10}{100} = 30 - 2 = \\mathbf{28\\%}$$

**Verification:**
SP $= 800 \\times 0.80 \\times 0.90 = 800 \\times 0.72 = ₹576$

Discount $= 800 - 576 = ₹224$

$\\frac{224}{800} \\times 100 = 28\\%$ ✓`,
    },
  },
];
