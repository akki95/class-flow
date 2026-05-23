export const CHAPTER_META = {
  id: "icse-10-commercial",
  title: "Commercial Mathematics",
  subtitle: "GST, banking (recurring deposits) and shares & dividends",
  icon: "💰",
  color: "#f59e0b",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "gst",
    icon: "🧾",
    title: "Goods & Services Tax (GST)",
    subtitle: "CGST, SGST, IGST calculations and input tax credit",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**GST** is an indirect tax levied on supply of goods and services in India. It replaced multiple taxes (VAT, service tax, excise).

**Types of GST:**
- **CGST** (Central GST) — goes to central government
- **SGST** (State GST) — goes to state government
- **IGST** (Integrated GST) — for inter-state transactions

For **intra-state** (within same state): GST is split equally as CGST + SGST.
$$\\text{If GST rate} = 18\\%, \\text{ then CGST} = 9\\%, \\; \\text{SGST} = 9\\%$$

For **inter-state**: Full rate charged as IGST.

**Input Tax Credit (ITC):**
Tax paid on purchases (input) can be set off against tax collected on sales (output).

$$\\text{Tax to pay} = \\text{Output tax} - \\text{Input tax credit}$$

**Computing GST in a supply chain:**
At each stage, GST is charged on the **selling price**. The dealer pays only the **difference** between output and input tax.`,
    formulas: [
      {
        label: "GST amount",
        latex: "\\text{GST} = \\text{Selling Price} \\times \\frac{\\text{Rate}}{100}",
      },
      {
        label: "Intra-state split",
        latex: "\\text{CGST} = \\text{SGST} = \\frac{\\text{GST}}{2}",
      },
      {
        label: "Tax payable",
        latex: "\\text{Tax payable} = \\text{Output tax} - \\text{Input tax credit}",
      },
    ],
    example: {
      question: "A manufacturer sells goods to a dealer for ₹20,000 (intra-state). The dealer sells to a consumer for ₹25,000. GST rate is 12%. Find the tax paid by the dealer to the government.",
      solution: `**Manufacturer → Dealer:**
GST = $12\\%$ of $₹20,000 = ₹2,400$
CGST = SGST = ₹1,200 each
Dealer pays ₹20,000 + ₹2,400 = ₹22,400

**Input tax credit for dealer = ₹2,400**

**Dealer → Consumer:**
GST = $12\\%$ of $₹25,000 = ₹3,000$
CGST = SGST = ₹1,500 each

**Tax payable by dealer:**
$$₹3,000 - ₹2,400 = \\mathbf{₹600}$$
(CGST payable = ₹1,500 − ₹1,200 = ₹300; SGST payable = ₹300)`,
    },
    practice: {
      question: "A shopkeeper buys goods worth ₹40,000 from another state and sells them locally for ₹55,000. GST rate is 18%. Find the net GST payable.",
      solution: `**Purchase (inter-state):**
IGST = $18\\%$ of $₹40,000 = ₹7,200$ (input tax credit)

**Sale (intra-state):**
GST = $18\\%$ of $₹55,000 = ₹9,900$
CGST = SGST = ₹4,950 each

**Net tax payable:**
$$₹9,900 - ₹7,200 = \\mathbf{₹2,700}$$

(IGST credit of ₹7,200 is first set off against CGST ₹4,950, then remaining ₹2,250 against SGST ₹4,950. SGST payable = ₹4,950 − ₹2,250 = ₹2,700.)`,
    },
  },
  {
    id: "banking",
    icon: "🏦",
    title: "Banking — Recurring Deposits",
    subtitle: "Monthly deposits, maturity value and interest calculation",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **Recurring Deposit (RD)** is a savings scheme where a fixed amount is deposited every month for a fixed period.

**Interest on RD** is calculated using simple interest on the equivalent principal:

$$\\text{Interest} = P \\times \\frac{n(n+1)}{2 \\times 12} \\times \\frac{r}{100}$$

where:
- $P$ = monthly instalment
- $n$ = number of months
- $r$ = rate of interest per annum

**Explanation:** The first instalment earns interest for $n$ months, the second for $n-1$ months, and so on. The total equivalent principal is:
$$P \\times \\frac{n(n+1)}{2}$$

**Maturity Value:**
$$\\text{MV} = Pn + \\text{Interest}$$
$$= Pn + P \\times \\frac{n(n+1)}{2 \\times 12} \\times \\frac{r}{100}$$`,
    formulas: [
      {
        label: "Interest (RD)",
        latex: "I = P \\times \\frac{n(n+1)}{24} \\times \\frac{r}{100}",
      },
      {
        label: "Maturity value",
        latex: "\\text{MV} = Pn + I",
      },
    ],
    example: {
      question: "Ravi deposits ₹500 per month for 2 years at 8% p.a. in a recurring deposit. Find the maturity value.",
      solution: `$P = ₹500$, $n = 24$ months, $r = 8\\%$

$$I = 500 \\times \\frac{24 \\times 25}{24} \\times \\frac{8}{100}$$

$$= 500 \\times 25 \\times 0.08 = 500 \\times 2 = ₹1,000$$

$$\\text{MV} = 500 \\times 24 + 1000 = 12000 + 1000 = \\mathbf{₹13,000}$$`,
    },
    practice: {
      question: "A person deposits ₹800 per month and receives ₹20,400 on maturity. If the rate is 6% p.a., find the number of months.",
      solution: `$P = ₹800$, $r = 6\\%$, MV $= ₹20,400$

$$20400 = 800n + 800 \\times \\frac{n(n+1)}{24} \\times \\frac{6}{100}$$

$$20400 = 800n + 800 \\times \\frac{n(n+1)}{24} \\times 0.06$$

$$20400 = 800n + 2n(n+1)$$

$$20400 = 800n + 2n^2 + 2n = 2n^2 + 802n$$

$$n^2 + 401n - 10200 = 0$$

Using the quadratic formula or trial: $n = \\mathbf{24}$ months (2 years).

Check: $800(24) + 2(24)(25) = 19200 + 1200 = 20400$ ✓`,
    },
  },
  {
    id: "shares-dividends",
    icon: "📈",
    title: "Shares & Dividends",
    subtitle: "Face value, market value, dividend yield and return on investment",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Shares** represent ownership in a company. When you buy shares, you invest money and receive dividends as returns.

**Key terms:**
- **Face Value (FV) / Nominal Value / Par Value:** The original value printed on the share (e.g., ₹10, ₹100).
- **Market Value (MV):** The price at which the share is traded.
  - At **premium**: MV > FV
  - At **discount**: MV < FV
  - At **par**: MV = FV

**Dividend** is always calculated on **face value**:
$$\\text{Dividend per share} = \\text{FV} \\times \\frac{\\text{dividend}\\%}{100}$$

$$\\text{Total dividend} = \\text{No. of shares} \\times \\text{dividend per share}$$

**Number of shares:**
$$\\text{No. of shares} = \\frac{\\text{Total investment}}{\\text{Market value per share}}$$

**Return on Investment (ROI):**
$$\\text{ROI}\\% = \\frac{\\text{Annual income (dividend)}}{\\text{Total investment}} \\times 100$$`,
    formulas: [
      {
        label: "Dividend per share",
        latex: "\\text{Div/share} = \\text{FV} \\times \\frac{d\\%}{100}",
      },
      {
        label: "Number of shares",
        latex: "n = \\frac{\\text{Investment}}{\\text{MV}}",
      },
      {
        label: "ROI",
        latex: "\\text{ROI}\\% = \\frac{\\text{Total dividend}}{\\text{Investment}} \\times 100",
      },
    ],
    example: {
      question: "A man invests ₹9,600 in ₹100 shares at ₹120. The company pays 8% dividend. Find: (a) number of shares, (b) annual dividend, (c) ROI.",
      solution: `**(a)** Number of shares $= \\frac{9600}{120} = \\mathbf{80}$

**(b)** Dividend per share $= 8\\%$ of $₹100 = ₹8$

Total dividend $= 80 \\times 8 = \\mathbf{₹640}$

**(c)** $\\text{ROI} = \\frac{640}{9600} \\times 100 = \\mathbf{6.\\overline{6}\\%}$`,
    },
    practice: {
      question: "Which is a better investment: 8% ₹100 shares at ₹120, or 10% ₹100 shares at ₹150?",
      solution: `**Option 1:** ROI $= \\frac{8}{120} \\times 100 = 6.\\overline{6}\\%$

**Option 2:** ROI $= \\frac{10}{150} \\times 100 = 6.\\overline{6}\\%$

Both investments give the **same return** of $6.\\overline{6}\\%$.

(In practice, other factors like growth potential and risk would determine the better choice.)`,
    },
  },
];
