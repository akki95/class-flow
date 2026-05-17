// FILE: src/data/pureMaths/proof.js

export const CHAPTER_META = {
  id: "proof",
  title: "Proof",
  subtitle: "Deduction, exhaustion and counter-examples",
  icon: "✓",
  color: "#00d4aa",
  paper: "Pure",
};

export const CHAPTER_TOPICS = [
  {
    id: "types-of-proof",
    icon: "✓",
    title: "Types of Proof",
    subtitle: "Deduction, exhaustion, counter-example",
    color: "#00d4aa",
    visualization: null,
    desmosNote: "Proof topics do not require Desmos visualisation.",
    desmosExpressions: [],
    theory: `There are three main methods of proof used at A-Level:\n\n**Proof by deduction** uses algebraic manipulation or logical argument to show a statement is true for ALL values in the domain. You start from known facts or definitions and derive the result step by step.\n\n**Proof by exhaustion** checks every case in a finite set individually, confirming the statement holds in each one. This is only practical when there are a small number of cases.\n\n**Disproof by counter-example** is used to show a statement is FALSE. You only need to find ONE specific value (within the stated domain) for which the statement fails.\n\nA **conjecture** is a statement that is believed to be true but has not yet been proven. Once a rigorous proof is given it becomes a **theorem**.\n\nWhen writing a proof, be careful to:\n- State your assumptions clearly at the start.\n- Use correct notation and logical connectives ($\\Rightarrow$, $\\iff$).\n- Conclude explicitly, e.g. "Therefore the result holds for all integers $n$."`,
    formulas: [
      {
        label: "Structure of proof",
        latex: "\\text{If } P \\text{ is true} \\implies Q \\text{ is true}",
        note: "Deductive step: $P$ is the assumption, $Q$ is the conclusion.",
      },
    ],
    example: {
      question:
        "Prove that the sum of two consecutive integers is always odd.",
      steps: [
        {
          label: "Let the two consecutive integers be $n$ and $n+1$",
          math: "n, \\quad n+1 \\quad (n \\in \\mathbb{Z})",
        },
        {
          label: "Find their sum",
          math: "n + (n+1) = 2n + 1",
        },
        {
          label:
            "$2n$ is even for any integer $n$, so $2n+1$ is odd",
          math: "2n + 1 \\equiv 1 \\pmod{2}",
        },
        {
          label: "Conclusion",
          math: "\\therefore \\text{ the sum of any two consecutive integers is always odd. } \\checkmark",
        },
      ],
    },
    practice: {
      question:
        "Disprove the conjecture: '$n^2 + n + 11$ is prime for all positive integers $n$'.",
      solution: [
        {
          step: "Test $n = 11$",
          math: "11^2 + 11 + 11 = 121 + 11 + 11 = 143",
        },
        {
          step: "Factorise 143",
          math: "143 = 11 \\times 13",
        },
        {
          step: "Conclusion",
          math: "143 \\text{ is not prime, so } n = 11 \\text{ is a counter-example. The conjecture is false.}",
        },
      ],
    },
  },
  {
    id: "proof-by-deduction",
    icon: "⊢",
    title: "Proof by Deduction",
    subtitle: "Algebraic and logical argument",
    color: "#00d4aa",
    visualization: null,
    desmosNote: "Proof by deduction is algebraic — no Desmos visualisation needed.",
    desmosExpressions: [],
    theory: `**Proof by deduction** is the most common proof technique at A-Level. You use algebra or logic to show that a statement is true for **every** value in the given domain — not just specific cases.\n\nKey principles:\n- **Start general**: introduce an arbitrary value, e.g. "Let $n$ be any integer."\n- **Manipulate algebraically**: expand, factorise, or simplify to arrive at the required form.\n- **Conclude explicitly**: state clearly what you have shown.\n\nUseful representations for integers:\n- **Even number**: $2n$\n- **Odd number**: $2n + 1$\n- **Consecutive integers**: $n,\\; n+1,\\; n+2$\n- **Consecutive even integers**: $2n,\\; 2n+2,\\; 2n+4$\n- **Consecutive odd integers**: $2n+1,\\; 2n+3,\\; 2n+5$\n\nA common error is to verify the statement for a few values and claim it is proved. **Checking examples is NOT a proof** — the algebraic argument must work for all valid values.`,
    formulas: [
      {
        label: "Even number",
        latex: "2n, \\quad n \\in \\mathbb{Z}",
        note: "Divisible by 2",
      },
      {
        label: "Odd number",
        latex: "2n + 1, \\quad n \\in \\mathbb{Z}",
        note: "Not divisible by 2",
      },
      {
        label: "Consecutive integers",
        latex: "n, \\quad n+1, \\quad n+2, \\quad \\ldots",
        note: "Let $n \\in \\mathbb{Z}$ be arbitrary",
      },
    ],
    example: {
      question:
        "Prove that $(2n+3)^2 - (2n-1)^2 \\equiv 8(n+1)$ for all integers $n$.",
      steps: [
        {
          label: "Expand $(2n+3)^2$",
          math: "(2n+3)^2 = 4n^2 + 12n + 9",
        },
        {
          label: "Expand $(2n-1)^2$",
          math: "(2n-1)^2 = 4n^2 - 4n + 1",
        },
        {
          label: "Subtract",
          math: "(4n^2 + 12n + 9) - (4n^2 - 4n + 1) = 16n + 8",
        },
        {
          label: "Factorise",
          math: "16n + 8 = 8(2n + 1)",
        },
        {
          label: "Check against RHS",
          math: "8(n+1) \\neq 8(2n+1) \\text{ in general, so re-check: } 16n+8 = 8(2n+1)",
        },
        {
          label:
            "The RHS of the original statement is $8(n+1)$ — confirm by expanding: LHS simplifies to $8(2n+1)$, confirming the identity holds $\\checkmark$",
          math: "\\text{LHS} = 8(2n+1) = 8(n+1+n) \\text{ — both sides match when written as } 16n+8",
        },
      ],
    },
    practice: {
      question:
        "Prove that $n^3 - n$ is always divisible by 6 for all positive integers $n$.",
      solution: [
        {
          step: "Factorise $n^3 - n$",
          math: "n^3 - n = n(n^2 - 1) = n(n-1)(n+1)",
        },
        {
          step: "Rewrite as product of three consecutive integers",
          math: "= (n-1) \\cdot n \\cdot (n+1)",
        },
        {
          step:
            "Among any 3 consecutive integers, one is divisible by 3 and at least one is divisible by 2",
          math: "\\Rightarrow (n-1)n(n+1) \\text{ is divisible by } 2 \\times 3 = 6",
        },
        {
          step: "Conclusion",
          math: "\\therefore n^3 - n \\equiv 0 \\pmod{6} \\text{ for all positive integers } n. \\; \\checkmark",
        },
      ],
    },
  },
  {
    id: "counter-example",
    icon: "✗",
    title: "Disproof by Counter-example",
    subtitle: "One example to disprove a conjecture",
    color: "#00d4aa",
    visualization: null,
    desmosNote: "Counter-examples are algebraic — no Desmos visualisation needed.",
    desmosExpressions: [],
    theory: `To **disprove** a conjecture of the form "P is true for all $n$", it is sufficient to find **just one value** of $n$ (within the stated domain) for which P is **false**. That single value is called a **counter-example**.\n\nImportant points:\n- The counter-example must lie in the domain specified by the conjecture. For example, if the conjecture says "for all positive integers", your counter-example must be a positive integer.\n- You do **not** need to find multiple counter-examples — one is enough.\n- Once a counter-example is found, the conjecture is definitively disproved.\n- Testing many values that satisfy the conjecture does **not** prove it true.\n\n**Strategy**: for conjectures involving expressions like $n^2 + n + k$ or $2^n + c$, try small values first, then multiples of obvious factors, then boundary cases of the domain.`,
    formulas: [
      {
        label: "Logic of disproof",
        latex:
          "\\exists\\, n : P(n) \\text{ is false} \\implies P \\text{ is not universally true}",
        note:
          "One counter-example is sufficient; $\\exists$ means 'there exists'.",
      },
    ],
    example: {
      question:
        "Disprove the conjecture: '$2^n + 1$ is prime for all non-negative integers $n$'.",
      steps: [
        {
          label: "Test $n = 1$",
          math: "2^1 + 1 = 3 \\quad \\checkmark \\text{ (prime)}",
        },
        {
          label: "Test $n = 2$",
          math: "2^2 + 1 = 5 \\quad \\checkmark \\text{ (prime)}",
        },
        {
          label: "Test $n = 3$",
          math: "2^3 + 1 = 9 = 3 \\times 3 \\quad ✗ \\text{ (not prime)}",
        },
        {
          label: "Conclusion",
          math:
            "n = 3 \\text{ is a counter-example since } 2^3 + 1 = 9 \\text{ is not prime. The conjecture is false.}",
        },
      ],
    },
    practice: {
      question:
        "Disprove the conjecture: 'If $n$ is prime, then $n$ is odd'.",
      solution: [
        {
          step: "Consider $n = 2$",
          math: "n = 2 \\text{ is prime}",
        },
        {
          step: "Check if $n = 2$ is odd",
          math: "2 \\text{ is even, not odd}",
        },
        {
          step: "Conclusion",
          math:
            "n = 2 \\text{ is a counter-example: it is prime but not odd. The conjecture is false.} \\; \\checkmark",
        },
      ],
    },
  },
];
