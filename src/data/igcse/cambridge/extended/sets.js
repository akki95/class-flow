export const CHAPTER_META = {
  id: "cambridge-ext-sets",
  title: "Sets",
  subtitle: "Set notation, Venn diagrams and set operations",
  icon: "∈",
  color: "#a78bfa",
  tier: "Extended",
  paper: "Cambridge IGCSE 0580",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "set-notation",
    icon: "∈",
    title: "Set Notation & Language",
    subtitle: "Elements, subsets, universal set and complement",
    color: "#a78bfa",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `A **set** is a collection of distinct objects called **elements**. Sets can be written by listing elements: $A = \\{1, 2, 3\\}$, or described in words.

**Key notation:**
- $n(A)$ = number of elements in set $A$
- $\\in$ means "is an element of" (e.g. $3 \\in A$)
- $\\notin$ means "is not an element of" (e.g. $5 \\notin A$)
- $\\emptyset$ or $\\{\\}$ is the **empty set** — a set with no elements, $n(\\emptyset) = 0$
- $\\xi$ (or $U$) is the **universal set** — the set of everything being considered
- $A'$ is the **complement** of $A$ — all elements in $\\xi$ that are NOT in $A$

**Subsets:**
- $A \\subseteq B$ means $A$ is a **subset** of $B$: every element of $A$ is also in $B$ (including $A = B$)
- $A \\subset B$ means $A$ is a **proper subset**: $A \\subseteq B$ and $A \\neq B$
- Every set is a subset of itself: $A \\subseteq A$
- The empty set is a subset of every set: $\\emptyset \\subseteq A$

The complement satisfies $n(A') = n(\\xi) - n(A)$.`,
    formulas: [
      "$n(A') = n(\\xi) - n(A)$",
      "$A \\subseteq B \\Rightarrow$ every element of $A$ is in $B$",
      "$n(\\emptyset) = 0$",
      "$\\emptyset \\subseteq A$ for any set $A$",
    ],
    example: {
      question:
        "$\\xi = \\{1, 2, 3, 4, 5, 6, 7, 8\\}$ and $A = \\{2, 4, 6, 8\\}$. Find $A'$ and $n(A')$.",
      solution: `$A' = \\{1, 3, 5, 7\\}$ (all elements of $\\xi$ not in $A$)

$n(A') = n(\\xi) - n(A) = 8 - 4 = 4$`,
    },
    practice: {
      question:
        "$\\xi = \\{\\text{integers from 1 to 12}\\}$. $P = \\{\\text{prime numbers}\\}$. $Q = \\{\\text{multiples of 3}\\}$. List $P$, $Q$, $P'$, and find $n(P \\cap Q)$.",
      solution: `$P = \\{2, 3, 5, 7, 11\\}$

$Q = \\{3, 6, 9, 12\\}$

$P' = \\{1, 4, 6, 8, 9, 10, 12\\}$ (integers 1–12 that are not prime)

$P \\cap Q = \\{3\\}$ (prime AND a multiple of 3)

$n(P \\cap Q) = 1$`,
    },
  },
  {
    id: "venn-sets",
    icon: "⊙",
    title: "Venn Diagrams & Set Operations",
    subtitle: "Union, intersection and shading regions",
    color: "#a78bfa",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Venn diagrams** represent sets as overlapping circles inside a rectangle that represents $\\xi$.

**Two-set operations:**
- $A \\cup B$ (**union**): all elements in $A$ OR $B$ or both — shade both circles
- $A \\cap B$ (**intersection**): elements in BOTH $A$ and $B$ — shade the overlap only
- $A \\cap B'$ (**A only / A but not B**): elements in $A$ but not in $B$ — shade the non-overlapping part of $A$
- $(A \\cup B)'$ (**neither**): elements outside both circles — shade only the region outside both circles

**Counting formula for two sets:**
$$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$$

**Three sets — eight regions** (inside/outside each of A, B, C):

$$n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(A \\cap C) - n(B \\cap C) + n(A \\cap B \\cap C)$$

Always verify by checking that all region counts sum to $n(\\xi)$.`,
    formulas: [
      "$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$",
      "$n(A \\cup B \\cup C) = n(A)+n(B)+n(C)-n(A\\cap B)-n(A\\cap C)-n(B\\cap C)+n(A\\cap B\\cap C)$",
      "$n((A \\cup B)') = n(\\xi) - n(A \\cup B)$",
    ],
    example: {
      question:
        "$n(\\xi) = 40$, $n(A) = 25$, $n(B) = 20$, $n(A \\cap B) = 10$. Find $n(A \\cup B)$ and $n((A \\cup B)')$.",
      solution: `$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = 25 + 20 - 10 = 35$

$n((A \\cup B)') = n(\\xi) - n(A \\cup B) = 40 - 35 = 5$`,
    },
    practice: {
      question:
        "60 students each study French ($F$), Spanish ($S$), or neither. $n(F) = 35$, $n(S) = 28$, $n(F \\cap S) = x$, and 5 study neither. Find $x$ and $P(\\text{studies French only})$.",
      solution: `Students who study at least one language: $60 - 5 = 55$

$$n(F \\cup S) = n(F) + n(S) - n(F \\cap S)$$
$$55 = 35 + 28 - x$$
$$x = 63 - 55 = 8$$

French only $= n(F) - n(F \\cap S) = 35 - 8 = 27$

$$P(\\text{French only}) = \\frac{27}{60} = \\frac{9}{20}$$`,
    },
  },
  {
    id: "set-problems",
    icon: "🔢",
    title: "Problem Solving with Sets",
    subtitle: "Using Venn diagrams to solve real-world problems",
    color: "#a78bfa",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `For problems involving **three overlapping sets**, work from the **inside outward**:

1. Start with the innermost region: $n(A \\cap B \\cap C)$
2. Use it to find each pairwise intersection region (e.g. $A \\cap B$ only, meaning $A \\cap B \\cap C'$)
3. Use those to find each individual-set-only region
4. Find the "none" region: $n(\\xi) - n(A \\cup B \\cup C)$
5. Check: all regions sum to $n(\\xi)$ ✓

**Setting up regions:**
Let $a$ = A only, $b$ = B only, $c$ = C only, $ab$ = A∩B only, $ac$ = A∩C only, $bc$ = B∩C only, $abc$ = A∩B∩C, $o$ = none.

Then $n(A) = a + ab + ac + abc$, etc. Solve simultaneous equations.

**Conditional probability with sets:**
$$P(A | B) = \\frac{n(A \\cap B)}{n(B)}$$`,
    formulas: [
      "Work inward to outward: start with $n(A \\cap B \\cap C)$, then pairwise intersections, then individual sets",
      "$P(A \\mid B) = \\dfrac{n(A \\cap B)}{n(B)}$",
      "Check: all regions sum to $n(\\xi)$",
    ],
    example: {
      question:
        "50 people: like tea ($T$), coffee ($C$), juice ($J$). $n(T \\cap C \\cap J) = 3$, $n(T \\cap C) = 8$, $n(T \\cap J) = 6$, $n(C \\cap J) = 5$. $n(T) = 20$, $n(C) = 18$, $n(J) = 15$. Find how many like none.",
      solution: `Using the three-set union formula:

$$n(T \\cup C \\cup J) = 20 + 18 + 15 - 8 - 6 - 5 + 3 = 37$$

Number who like none $= 50 - 37 = \\mathbf{13}$`,
    },
    practice: {
      question:
        "In a class of 40: $n(A \\cap B \\cap C) = 2$, $n(A \\cap B) = 7$, $n(A \\cap C) = 5$, $n(B \\cap C) = 4$. $n(A) = 18$, $n(B) = 15$, $n(C) = 12$. How many students are in none of the three sets?",
      solution: `$$n(A \\cup B \\cup C) = 18 + 15 + 12 - 7 - 5 - 4 + 2 = 31$$

Number in none $= 40 - 31 = \\mathbf{9}$

**Verification using regions:**
- $A \\cap B$ only $= 7 - 2 = 5$
- $A \\cap C$ only $= 5 - 2 = 3$
- $B \\cap C$ only $= 4 - 2 = 2$
- $A$ only $= 18 - 5 - 3 - 2 = 8$
- $B$ only $= 15 - 5 - 2 - 2 = 6$
- $C$ only $= 12 - 3 - 2 - 2 = 5$
- Sum $= 8 + 6 + 5 + 5 + 3 + 2 + 2 + 9 = 40$ ✓`,
    },
  },
];
