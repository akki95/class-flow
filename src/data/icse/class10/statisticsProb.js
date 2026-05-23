export const CHAPTER_META = {
  id: "icse-10-stats-prob",
  title: "Statistics & Probability",
  subtitle: "Mean (3 methods), median from ogive, histograms and classical probability",
  icon: "📊",
  color: "#14b8a6",
  tier: "Class 10",
  paper: "ICSE Mathematics",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "mean-grouped",
    icon: "📊",
    title: "Mean of Grouped Data",
    subtitle: "Direct, short-cut and step-deviation methods",
    color: "#14b8a6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Direct method:**
$$\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}$$
where $x_i$ = class mark (midpoint) and $f_i$ = frequency.

**Short-cut (Assumed Mean) method:**
Choose an assumed mean $A$ (usually the class mark of the middle class).

$$d_i = x_i - A$$
$$\\bar{x} = A + \\frac{\\sum f_i d_i}{\\sum f_i}$$

**Step-deviation method** (when class width $h$ is uniform):
$$u_i = \\frac{x_i - A}{h}$$
$$\\bar{x} = A + h \\times \\frac{\\sum f_i u_i}{\\sum f_i}$$

**When to use which method:**
- Direct: small data sets, small values
- Short-cut: large values of $x_i$
- Step-deviation: large values **and** equal class widths (most efficient)

**Class mark:** $x_i = \\frac{\\text{lower limit} + \\text{upper limit}}{2}$`,
    formulas: [
      {
        label: "Direct",
        latex: "\\bar{x} = \\frac{\\sum f_i x_i}{\\sum f_i}",
      },
      {
        label: "Short-cut",
        latex: "\\bar{x} = A + \\frac{\\sum f_i d_i}{\\sum f_i}",
      },
      {
        label: "Step-deviation",
        latex: "\\bar{x} = A + h \\cdot \\frac{\\sum f_i u_i}{\\sum f_i}",
      },
    ],
    example: {
      question: "Find the mean using the step-deviation method: 0–10 (7), 10–20 (10), 20–30 (15), 30–40 (8), 40–50 (10).",
      solution: `$h = 10$, assume $A = 25$ (class mark of 20–30).

| Class | $x_i$ | $f_i$ | $u_i = \\frac{x_i - 25}{10}$ | $f_i u_i$ |
|-------|--------|--------|------|----------|
| 0–10 | 5 | 7 | $-2$ | $-14$ |
| 10–20 | 15 | 10 | $-1$ | $-10$ |
| 20–30 | 25 | 15 | $0$ | $0$ |
| 30–40 | 35 | 8 | $1$ | $8$ |
| 40–50 | 45 | 10 | $2$ | $20$ |

$\\sum f_i = 50$, $\\sum f_i u_i = 4$

$$\\bar{x} = 25 + 10 \\times \\frac{4}{50} = 25 + 0.8 = \\mathbf{25.8}$$`,
    },
    practice: {
      question: "The mean of the following distribution is 27. Find $p$: 0–10 (8), 10–20 (p), 20–30 (12), 30–40 (13), 40–50 (10).",
      solution: `Using direct method:

$\\sum f_i x_i = 8(5) + p(15) + 12(25) + 13(35) + 10(45) = 40 + 15p + 300 + 455 + 450 = 1245 + 15p$

$\\sum f_i = 43 + p$

$$27 = \\frac{1245 + 15p}{43 + p}$$

$$27(43 + p) = 1245 + 15p$$
$$1161 + 27p = 1245 + 15p$$
$$12p = 84$$
$$p = \\mathbf{7}$$`,
    },
  },
  {
    id: "median-ogive",
    icon: "📈",
    title: "Median & Ogive",
    subtitle: "Median from grouped data and cumulative frequency curves",
    color: "#14b8a6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Median from grouped data:**
$$\\text{Median} = l + \\frac{\\frac{N}{2} - cf}{f} \\times h$$

where:
- $l$ = lower boundary of the median class
- $N$ = total frequency ($\\sum f_i$)
- $cf$ = cumulative frequency **before** the median class
- $f$ = frequency of the median class
- $h$ = class width

**Finding the median class:** The class whose cumulative frequency is just greater than or equal to $\\frac{N}{2}$.

**Ogive (Cumulative Frequency Curve):**
- **Less-than ogive:** Plot upper boundaries vs cumulative frequency.
- **More-than ogive:** Plot lower boundaries vs (N − cumulative frequency).
- The **intersection** of less-than and more-than ogives gives the **median**.

**From an ogive, find:**
- Median: at $\\frac{N}{2}$ on y-axis
- $Q_1$: at $\\frac{N}{4}$
- $Q_3$: at $\\frac{3N}{4}$
- IQR $= Q_3 - Q_1$
- Percentiles: at $\\frac{pN}{100}$`,
    formulas: [
      {
        label: "Median (grouped)",
        latex: "\\text{Med} = l + \\frac{\\frac{N}{2} - cf}{f} \\times h",
      },
      {
        label: "IQR",
        latex: "\\text{IQR} = Q_3 - Q_1",
      },
    ],
    example: {
      question: "Find the median from: 0–10 (5), 10–20 (8), 20–30 (12), 30–40 (14), 40–50 (11).",
      solution: `Cumulative frequencies: 5, 13, 25, 39, 50

$N = 50$, $\\frac{N}{2} = 25$

Median class: 20–30 (cf just ≥ 25 is 25)

$l = 20$, $cf = 13$, $f = 12$, $h = 10$

$$\\text{Median} = 20 + \\frac{25 - 13}{12} \\times 10 = 20 + \\frac{12}{12} \\times 10 = 20 + 10 = \\mathbf{30}$$`,
    },
    practice: {
      question: "From an ogive, the following readings are taken: at $y = 25$ → $x = 32$, at $y = 50$ → $x = 45$, at $y = 75$ → $x = 56$. If $N = 100$, find the median and IQR.",
      solution: `$\\frac{N}{2} = 50$ → Median $= \\mathbf{45}$

$\\frac{N}{4} = 25$ → $Q_1 = \\mathbf{32}$

$\\frac{3N}{4} = 75$ → $Q_3 = \\mathbf{56}$

$$\\text{IQR} = 56 - 32 = \\mathbf{24}$$`,
    },
  },
  {
    id: "probability-10",
    icon: "🎲",
    title: "Probability",
    subtitle: "Classical probability, sample space and complementary events",
    color: "#14b8a6",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Classical (Theoretical) Probability:**
$$P(E) = \\frac{\\text{Number of favourable outcomes}}{\\text{Total number of equally likely outcomes}}$$

**Properties:**
$$0 \\le P(E) \\le 1$$
$$P(\\text{certain event}) = 1, \\quad P(\\text{impossible event}) = 0$$
$$P(E) + P(\\overline{E}) = 1 \\quad (\\text{complementary events})$$

**Sample space ($S$):** The set of all possible outcomes.
- Coin: $S = \\{H, T\\}$, $n(S) = 2$
- Die: $S = \\{1,2,3,4,5,6\\}$, $n(S) = 6$
- Two dice: $n(S) = 36$
- Pack of cards: $n(S) = 52$

**Playing cards breakdown:**
- 4 suits: Spades (♠), Hearts (♥), Diamonds (♦), Clubs (♣)
- 13 cards per suit: A, 2–10, J, Q, K
- Red cards: 26 (Hearts + Diamonds)
- Black cards: 26 (Spades + Clubs)
- Face cards: 12 (J, Q, K × 4 suits)

**Combined events (without replacement):** Total outcomes reduce by 1 after each draw.`,
    formulas: [
      {
        label: "Probability",
        latex: "P(E) = \\frac{n(E)}{n(S)}",
      },
      {
        label: "Complement",
        latex: "P(\\overline{E}) = 1 - P(E)",
      },
    ],
    example: {
      question: "A bag has 5 red, 3 blue and 2 green balls. A ball is drawn at random. Find the probability that it is (a) red, (b) not green, (c) blue or green.",
      solution: `Total balls $= 5 + 3 + 2 = 10$

**(a)** $P(\\text{red}) = \\frac{5}{10} = \\mathbf{\\frac{1}{2}}$

**(b)** $P(\\text{not green}) = 1 - P(\\text{green}) = 1 - \\frac{2}{10} = \\mathbf{\\frac{4}{5}}$

**(c)** $P(\\text{blue or green}) = \\frac{3 + 2}{10} = \\mathbf{\\frac{1}{2}}$`,
    },
    practice: {
      question: "A card is drawn from a well-shuffled pack of 52 cards. Find the probability of getting (a) a king, (b) a red face card, (c) neither a heart nor a king.",
      solution: `**(a)** Kings $= 4$. $P = \\frac{4}{52} = \\mathbf{\\frac{1}{13}}$

**(b)** Red face cards $=$ J, Q, K of Hearts + J, Q, K of Diamonds $= 6$.
$P = \\frac{6}{52} = \\mathbf{\\frac{3}{26}}$

**(c)** Hearts $= 13$, Kings $= 4$, King of Hearts (counted in both) $= 1$.

Hearts or Kings $= 13 + 4 - 1 = 16$

Neither $= 52 - 16 = 36$

$P = \\frac{36}{52} = \\mathbf{\\frac{9}{13}}$`,
    },
  },
];
