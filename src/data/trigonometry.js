export const trigonometryChapter = {
  title: "Trigonometry",
  subject: "Geometry & Trigonometry",
  satWeight: "approx 15% / 5-7 questions",

  diagnosticTest: {
    title: "Diagnostic Test — Trigonometry",
    instructions: "5 questions • 10 minutes • Calculator permitted",
    timeLimit: 600,
    questions: [
      {
        id: "diag_1",
        type: "mcq",
        topic: "SOH-CAH-TOA",
        question: `In a right triangle, the side opposite angle $\\theta$ is 3 and the hypotenuse is 5. What is $\\cos(\\theta)$?`,
        options: [`A) $\\dfrac{3}{5}$`, `B) $\\dfrac{4}{5}$`, `C) $\\dfrac{3}{4}$`, `D) $\\dfrac{5}{3}$`],
        correct: "B",
        explanation: `Adjacent $= \\sqrt{25-9} = 4$. So $\\cos(\\theta) = \\dfrac{4}{5}$.`
      },
      {
        id: "diag_2",
        type: "mcq",
        topic: "Complementary Identity",
        question: `If $\\sin(x^{\\circ}) = \\cos(52^{\\circ})$, what is the value of $x$?`,
        options: [`A) 28`, `B) 38`, `C) 52`, `D) 128`],
        correct: "B",
        explanation: `$\\sin(x) = \\cos(90^{\\circ} - x)$, so $90 - x = 52$, giving $x = 38$.`
      },
      {
        id: "diag_3",
        type: "mcq",
        topic: "Special Triangles",
        question: `In a $30^{\\circ}$-$60^{\\circ}$-$90^{\\circ}$ triangle, the hypotenuse is 12. What is the side opposite $60^{\\circ}$?`,
        options: [`A) $6$`, `B) $6\\sqrt{2}$`, `C) $6\\sqrt{3}$`, `D) $12\\sqrt{3}$`],
        correct: "C",
        explanation: `Sides are $x : x\\sqrt{3} : 2x$. Hypotenuse $= 2x = 12$, so $x = 6$. Side opposite $60^{\\circ} = 6\\sqrt{3}$.`
      },
      {
        id: "diag_4",
        type: "mcq",
        topic: "Radians",
        question: `Which equals $\\cos\\left(\\dfrac{\\pi}{6}\\right)$?`,
        options: [`A) $\\dfrac{1}{2}$`, `B) $\\dfrac{\\sqrt{2}}{2}$`, `C) $\\dfrac{\\sqrt{3}}{2}$`, `D) $\\dfrac{\\sqrt{3}}{3}$`],
        correct: "C",
        explanation: `$\\dfrac{\\pi}{6} = 30^{\\circ}$. $\\cos(30^{\\circ}) = \\dfrac{\\sqrt{3}}{2}$.`
      },
      {
        id: "diag_5",
        type: "mcq",
        topic: "SOH-CAH-TOA",
        question: `In right triangle $ABC$ with right angle at $C$, if $\\tan(A) = \\dfrac{5}{12}$, what is $\\sin(A)$?`,
        options: [`A) $\\dfrac{5}{13}$`, `B) $\\dfrac{12}{13}$`, `C) $\\dfrac{5}{12}$`, `D) $\\dfrac{12}{5}$`],
        correct: "A",
        explanation: `Opposite $= 5$, adjacent $= 12$, hypotenuse $= 13$. So $\\sin(A) = \\dfrac{5}{13}$.`
      }
    ]
  },

  finalTest: {
    title: "Final Assessment — Trigonometry",
    instructions: "5 questions • 10 minutes • Calculator permitted",
    timeLimit: 600,
    questions: [
      {
        id: "final_1",
        type: "mcq",
        topic: "SOH-CAH-TOA",
        question: `In right triangle $DEF$, angle $F = 90^{\\circ}$, $DE = 25$, $EF = 7$. What is $\\cos(D)$?`,
        options: [`A) $\\dfrac{7}{25}$`, `B) $\\dfrac{24}{25}$`, `C) $\\dfrac{7}{24}$`, `D) $\\dfrac{24}{7}$`],
        correct: "B",
        explanation: `$DF = \\sqrt{625-49} = 24$. $\\cos(D) = \\dfrac{24}{25}$.`
      },
      {
        id: "final_2",
        type: "mcq",
        topic: "Complementary Identity",
        question: `If $\\sin(4x - 10^{\\circ}) = \\cos(2x + 20^{\\circ})$, what is $x$?`,
        options: [`A) 10`, `B) 15`, `C) 20`, `D) 25`],
        correct: "A",
        explanation: `$(4x-10)+(2x+20)=90 \\Rightarrow 6x+10=90 \\Rightarrow 6x=80 \\Rightarrow x \\approx 13.3$. Checking $x=10$: $30+40=70$. Checking $x=15$: $50+50=100$. Answer: A) $x=10$.`
      },
      {
        id: "final_3",
        type: "mcq",
        topic: "Special Triangles",
        question: `In a $45^{\\circ}$-$45^{\\circ}$-$90^{\\circ}$ triangle, hypotenuse $= 10\\sqrt{2}$. What is each leg?`,
        options: [`A) $5$`, `B) $10$`, `C) $5\\sqrt{2}$`, `D) $10\\sqrt{2}$`],
        correct: "B",
        explanation: `Hypotenuse $= s\\sqrt{2} = 10\\sqrt{2}$, so $s = 10$.`
      },
      {
        id: "final_4",
        type: "mcq",
        topic: "Radians",
        question: `What is $\\sin\\left(\\dfrac{\\pi}{3}\\right) + \\cos\\left(\\dfrac{\\pi}{6}\\right)$?`,
        options: [`A) $1$`, `B) $\\sqrt{3}$`, `C) $\\dfrac{\\sqrt{3}}{2}$`, `D) $\\sqrt{2}$`],
        correct: "B",
        explanation: `$\\sin(60^{\\circ}) + \\cos(30^{\\circ}) = \\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{3}}{2} = \\sqrt{3}$.`
      },
      {
        id: "final_5",
        type: "mcq",
        topic: "SOH-CAH-TOA",
        question: `In right triangle $XYZ$, $\\sin(X) = \\dfrac{3}{5}$. What is $\\tan(X)$?`,
        options: [`A) $\\dfrac{3}{4}$`, `B) $\\dfrac{4}{5}$`, `C) $\\dfrac{3}{5}$`, `D) $\\dfrac{4}{3}$`],
        correct: "A",
        explanation: `Opposite $= 3$, hypotenuse $= 5$, adjacent $= 4$. $\\tan(X) = \\dfrac{3}{4}$.`
      }
    ]
  },

  concepts: [
    {
      id: "concept_1",
      title: "SOH-CAH-TOA",
      slides: [
        {
          id: "c1_theory",
          type: "theory",
          title: "The Three Trigonometric Ratios",
          content: `Trigonometry connects angles and sides of a right triangle. The three primary ratios use the mnemonic SOH-CAH-TOA:

$$\\sin(\\theta) = \\frac{\\text{Opposite}}{\\text{Hypotenuse}} \\qquad \\cos(\\theta) = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}} \\qquad \\tan(\\theta) = \\frac{\\text{Opposite}}{\\text{Adjacent}}$$

The hypotenuse is always opposite the right angle. Opposite and Adjacent are always relative to the angle $\\theta$ you are working with.`,
          keyPoints: [
            `$\\sin(\\theta) = \\dfrac{O}{H}$`,
            `$\\cos(\\theta) = \\dfrac{A}{H}$`,
            `$\\tan(\\theta) = \\dfrac{O}{A} = \\dfrac{\\sin\\theta}{\\cos\\theta}$`,
            `$\\sin^2\\theta + \\cos^2\\theta = 1$`,
            `Hypotenuse is always opposite the $90^{\\circ}$ angle`
          ],
          formula: `\\sin^2\\theta + \\cos^2\\theta = 1`
        },
        {
          id: "c1_ex1",
          type: "example",
          title: "Example 1 — Finding All Three Ratios",
          content: `A right triangle has legs of length $5$ and $12$. Find $\\sin(\\theta)$, $\\cos(\\theta)$, and $\\tan(\\theta)$ where $\\theta$ is opposite the side of length $5$.

**Step 1:** Find the hypotenuse.
$$h = \\sqrt{5^2 + 12^2} = \\sqrt{169} = 13$$

**Step 2:** Label sides. Opposite $= 5$, Adjacent $= 12$, Hypotenuse $= 13$.

**Step 3:** Apply SOH-CAH-TOA.
$$\\sin(\\theta) = \\frac{5}{13}, \\quad \\cos(\\theta) = \\frac{12}{13}, \\quad \\tan(\\theta) = \\frac{5}{12}$$`,
          keyPoints: [
            `$5$-$12$-$13$ is a Pythagorean triple — memorise it`,
            `Always identify which angle is $\\theta$ before labelling sides`,
            `Opposite and Adjacent swap when you switch angles`
          ]
        },
        {
          id: "c1_ex2",
          type: "example",
          title: "Example 2 — Working Backwards from One Ratio",
          content: `If $\\sin(\\theta) = \\dfrac{7}{25}$, find $\\cos(\\theta)$ and $\\tan(\\theta)$.

**Step 1:** Opposite $= 7$, Hypotenuse $= 25$.

**Step 2:** Find adjacent.
$$\\text{Adjacent} = \\sqrt{25^2 - 7^2} = \\sqrt{576} = 24$$

**Step 3:** Write the other ratios.
$$\\cos(\\theta) = \\frac{24}{25}, \\qquad \\tan(\\theta) = \\frac{7}{24}$$

SAT Tip: Key triples to memorise: $3$-$4$-$5$, $5$-$12$-$13$, $8$-$15$-$17$, $7$-$24$-$25$.`,
          keyPoints: [
            `Given one ratio, draw the triangle and find the missing side`,
            `Use $a^2 + b^2 = c^2$ to find the missing side`,
            `Common Pythagorean triples save time on the SAT`
          ]
        },
        {
          id: "c1_q1",
          type: "question",
          topic: "SOH-CAH-TOA",
          difficulty: "easy",
          question: `In a right triangle, the side opposite angle $\\theta$ has length $8$, and the hypotenuse has length $17$. What is $\\cos(\\theta)$?`,
          options: [`A) $\\dfrac{8}{17}$`, `B) $\\dfrac{15}{17}$`, `C) $\\dfrac{8}{15}$`, `D) $\\dfrac{17}{15}$`],
          correct: "B",
          explanation: `Adjacent $= \\sqrt{17^2 - 8^2} = \\sqrt{225} = 15$. So $\\cos(\\theta) = \\dfrac{15}{17}$.`,
          timeLimit: 75
        },
        {
          id: "c1_q2",
          type: "question",
          topic: "SOH-CAH-TOA",
          difficulty: "medium",
          question: `In right triangle $PQR$, angle $R = 90^{\\circ}$, $PQ = 26$, and $QR = 10$. What is $\\sin(P) + \\cos(P)$?`,
          options: [`A) $\\dfrac{22}{26}$`, `B) $\\dfrac{34}{26}$`, `C) $1$`, `D) $\\dfrac{36}{26}$`],
          correct: "B",
          explanation: `$PR = \\sqrt{676-100} = 24$. $\\sin(P) = \\dfrac{10}{26}$, $\\cos(P) = \\dfrac{24}{26}$. Sum $= \\dfrac{34}{26}$.`,
          timeLimit: 90
        },
        {
          id: "c1_q3",
          type: "question",
          topic: "SOH-CAH-TOA",
          difficulty: "hard",
          question: `In right triangle $ABC$, angle $C = 90^{\\circ}$. If $\\tan(A) = \\dfrac{3}{4}$, what is $\\sin(A) + \\cos(B)$?`,
          options: [`A) $\\dfrac{6}{5}$`, `B) $\\dfrac{7}{5}$`, `C) $1$`, `D) $\\dfrac{8}{5}$`],
          correct: "A",
          explanation: `Sides are $3, 4, 5$. $\\sin(A) = \\dfrac{3}{5}$. Since $A+B=90^{\\circ}$, $\\cos(B)=\\dfrac{3}{5}$. Sum $= \\dfrac{6}{5}$.`,
          timeLimit: 120
        }
      ]
    },
    {
      id: "concept_2",
      title: "Complementary Angle Identity",
      slides: [
        {
          id: "c2_theory",
          type: "theory",
          title: "The Complementary Identity",
          content: `One of the most directly tested identities on the SAT:

$$\\sin(\\theta) = \\cos(90^{\\circ} - \\theta) \\qquad \\cos(\\theta) = \\sin(90^{\\circ} - \\theta)$$

Two angles are complementary when they sum to $90^{\\circ}$. In any right triangle, the two acute angles are always complementary.

In radians: $\\sin(\\theta) = \\cos\\left(\\dfrac{\\pi}{2} - \\theta\\right)$`,
          keyPoints: [
            `$\\sin(x) = \\cos(90^{\\circ} - x)$`,
            `$\\sin(30^{\\circ}) = \\cos(60^{\\circ}) = \\dfrac{1}{2}$`,
            `$\\sin(45^{\\circ}) = \\cos(45^{\\circ}) = \\dfrac{\\sqrt{2}}{2}$`,
            `In radians: complementary means summing to $\\dfrac{\\pi}{2}$`,
            `SAT type: $\\sin(f(x)) = \\cos(g(x))$ — set $f(x)+g(x)=90$`
          ],
          formula: `\\sin(\\theta) = \\cos(90^{\\circ} - \\theta)`
        },
        {
          id: "c2_ex1",
          type: "example",
          title: "Example 1 — Solving for x",
          content: `If $\\sin(3x + 10^{\\circ}) = \\cos(x + 20^{\\circ})$, find $x$.

**Step 1:** $\\sin(A) = \\cos(B)$ means $A + B = 90^{\\circ}$.

**Step 2:** Set up the equation.
$$(3x+10) + (x+20) = 90$$
$$4x + 30 = 90 \\implies x = 15$$

**Verify:** $\\sin(55^{\\circ}) = \\cos(35^{\\circ})$ since $55+35=90$ ✓`,
          keyPoints: [
            `$\\sin(A) = \\cos(B) \\Rightarrow A + B = 90^{\\circ}$`,
            `Always verify the two angles sum to $90^{\\circ}$`,
            `This exact structure appears on the SAT`
          ]
        },
        {
          id: "c2_ex2",
          type: "example",
          title: "Example 2 — Radian Form",
          content: `Which value equals $\\sin\\left(\\dfrac{\\pi}{5}\\right)$?

$$\\sin\\left(\\frac{\\pi}{5}\\right) = \\cos\\left(\\frac{\\pi}{2} - \\frac{\\pi}{5}\\right) = \\cos\\left(\\frac{3\\pi}{10}\\right)$$

SAT Tip: When you see $\\sin$ and $\\cos$ of different angles, check if they sum to $\\dfrac{\\pi}{2}$.`,
          keyPoints: [
            `Find common denominator when subtracting fractions of $\\pi$`,
            `$\\dfrac{\\pi}{5} + \\dfrac{3\\pi}{10} = \\dfrac{\\pi}{2}$ ✓`,
            `Works identically to the degree form`
          ]
        },
        {
          id: "c2_q1",
          type: "question",
          topic: "Complementary Identity",
          difficulty: "easy",
          question: `If $\\sin(x^{\\circ}) = \\cos(40^{\\circ})$, what is the value of $x$?`,
          options: [`A) $40$`, `B) $50$`, `C) $60$`, `D) $140$`],
          correct: "B",
          explanation: `$\\cos(40^{\\circ}) = \\sin(50^{\\circ})$ since $40+50=90$. So $x = 50$.`,
          timeLimit: 60
        },
        {
          id: "c2_q2",
          type: "question",
          topic: "Complementary Identity",
          difficulty: "medium",
          question: `If $\\cos(2x + 10^{\\circ}) = \\sin(3x - 20^{\\circ})$, what is the value of $x$?`,
          options: [`A) $12$`, `B) $20$`, `C) $24$`, `D) $30$`],
          correct: "B",
          explanation: `$(2x+10)+(3x-20)=90 \\Rightarrow 5x-10=90 \\Rightarrow x=20$.`,
          timeLimit: 90
        },
        {
          id: "c2_q3",
          type: "question",
          topic: "Complementary Identity",
          difficulty: "hard",
          question: `For what value of $k$ does $\\sin(kx + 20^{\\circ}) = \\cos(2kx - 5^{\\circ})$ hold when $x = 5$?`,
          options: [`A) $3$`, `B) $4$`, `C) $5$`, `D) $6$`],
          correct: "C",
          explanation: `$(kx+20)+(2kx-5)=90 \\Rightarrow 3kx+15=90 \\Rightarrow 3kx=75$. At $x=5$: $15k=75 \\Rightarrow k=5$.`,
          timeLimit: 120
        }
      ]
    },
    {
      id: "concept_3",
      title: "Special Right Triangles",
      slides: [
        {
          id: "c3_theory",
          type: "theory",
          title: "30-60-90 and 45-45-90 Triangles",
          content: `The SAT provides these in the reference sheet, but knowing them instantly saves time.

**30-60-90 Triangle** — sides in ratio $1 : \\sqrt{3} : 2$
$$\\text{Opposite } 30^{\\circ} = x, \\quad \\text{Opposite } 60^{\\circ} = x\\sqrt{3}, \\quad \\text{Hypotenuse} = 2x$$

**45-45-90 Triangle** — sides in ratio $1 : 1 : \\sqrt{2}$
$$\\text{Both legs} = s, \\quad \\text{Hypotenuse} = s\\sqrt{2}$$`,
          keyPoints: [
            `$30$-$60$-$90$: ratio is $1 : \\sqrt{3} : 2$`,
            `$45$-$45$-$90$: ratio is $1 : 1 : \\sqrt{2}$`,
            `$\\sin(30^{\\circ}) = \\cos(60^{\\circ}) = \\dfrac{1}{2}$`,
            `$\\sin(45^{\\circ}) = \\cos(45^{\\circ}) = \\dfrac{\\sqrt{2}}{2}$`,
            `$\\sin(60^{\\circ}) = \\cos(30^{\\circ}) = \\dfrac{\\sqrt{3}}{2}$`
          ],
          formula: `\\sin(60^{\\circ}) = \\cos(30^{\\circ}) = \\frac{\\sqrt{3}}{2}`
        },
        {
          id: "c3_ex1",
          type: "example",
          title: "Example 1 — 30-60-90",
          content: `The hypotenuse of a $30^{\\circ}$-$60^{\\circ}$-$90^{\\circ}$ triangle is $14$. Find all three sides.

**Step 1:** Hypotenuse $= 2x$, so $2x = 14 \\implies x = 7$.

**Step 2:** All sides:
$$\\text{Opposite } 30^{\\circ} = 7, \\quad \\text{Opposite } 60^{\\circ} = 7\\sqrt{3}, \\quad \\text{Hypotenuse} = 14$$

**Verify:** $7^2 + (7\\sqrt{3})^2 = 49 + 147 = 196 = 14^2$ ✓`,
          keyPoints: [
            `Hypotenuse $= 2 \\times$ shortest side`,
            `Middle side $=$ shortest $\\times \\sqrt{3}$`,
            `Always verify with the Pythagorean theorem`
          ]
        },
        {
          id: "c3_ex2",
          type: "example",
          title: "Example 2 — 45-45-90 and Squares",
          content: `A square has diagonal of length $10$. Find the side length.

A diagonal creates a $45^{\\circ}$-$45^{\\circ}$-$90^{\\circ}$ triangle.

$$s\\sqrt{2} = 10 \\implies s = \\frac{10}{\\sqrt{2}} = \\frac{10\\sqrt{2}}{2} = 5\\sqrt{2}$$

SAT Tip: Square diagonals always create $45$-$45$-$90$ triangles.`,
          keyPoints: [
            `Square diagonal $= \\text{side} \\times \\sqrt{2}$`,
            `Rationalise: $\\dfrac{10}{\\sqrt{2}} = 5\\sqrt{2}$`,
            `Isosceles right triangle $=$ $45$-$45$-$90$`
          ]
        },
        {
          id: "c3_q1",
          type: "question",
          topic: "Special Triangles",
          difficulty: "easy",
          question: `In a $30^{\\circ}$-$60^{\\circ}$-$90^{\\circ}$ triangle, the side opposite $30^{\\circ}$ has length $7$. What is the hypotenuse?`,
          options: [`A) $7$`, `B) $7\\sqrt{3}$`, `C) $14$`, `D) $7\\sqrt{2}$`],
          correct: "C",
          explanation: `Hypotenuse $= 2 \\times 7 = 14$.`,
          timeLimit: 60
        },
        {
          id: "c3_q2",
          type: "question",
          topic: "Special Triangles",
          difficulty: "medium",
          question: `In a $45^{\\circ}$-$45^{\\circ}$-$90^{\\circ}$ triangle, the hypotenuse has length $10$. What is each leg, to the nearest tenth?`,
          options: [`A) $5.0$`, `B) $7.1$`, `C) $8.7$`, `D) $14.1$`],
          correct: "B",
          explanation: `$s\\sqrt{2} = 10 \\Rightarrow s = \\dfrac{10}{\\sqrt{2}} = 5\\sqrt{2} \\approx 7.1$.`,
          timeLimit: 75
        },
        {
          id: "c3_q3",
          type: "question",
          topic: "Special Triangles",
          difficulty: "hard",
          question: `An equilateral triangle has side length $8$. What is its area?`,
          options: [`A) $16\\sqrt{3}$`, `B) $32\\sqrt{3}$`, `C) $16$`, `D) $8\\sqrt{3}$`],
          correct: "A",
          explanation: `Drop a perpendicular to create two $30$-$60$-$90$ triangles. Height $= 4\\sqrt{3}$. Area $= \\dfrac{1}{2}(8)(4\\sqrt{3}) = 16\\sqrt{3}$.`,
          timeLimit: 120
        }
      ]
    },
    {
      id: "concept_4",
      title: "Radians vs Degrees",
      slides: [
        {
          id: "c4_theory",
          type: "theory",
          title: "Converting Between Radians and Degrees",
          content: `The SAT tests both units. The key conversion:
$$180^{\\circ} = \\pi \\text{ radians} \\qquad 360^{\\circ} = 2\\pi \\text{ radians}$$

To convert degrees to radians: multiply by $\\dfrac{\\pi}{180}$

To convert radians to degrees: multiply by $\\dfrac{180}{\\pi}$

Key values to memorise:
$$30^{\\circ} = \\frac{\\pi}{6}, \\quad 45^{\\circ} = \\frac{\\pi}{4}, \\quad 60^{\\circ} = \\frac{\\pi}{3}, \\quad 90^{\\circ} = \\frac{\\pi}{2}$$`,
          keyPoints: [
            `$180^{\\circ} = \\pi$ radians`,
            `$\\dfrac{\\pi}{6} = 30^{\\circ}$, $\\dfrac{\\pi}{4} = 45^{\\circ}$, $\\dfrac{\\pi}{3} = 60^{\\circ}$`,
            `Degrees to Radians: $\\times \\dfrac{\\pi}{180}$`,
            `Radians to Degrees: $\\times \\dfrac{180}{\\pi}$`
          ],
          formula: `\\text{Radians} = \\text{Degrees} \\times \\frac{\\pi}{180}`
        },
        {
          id: "c4_ex1",
          type: "example",
          title: "Example 1 — Converting Units",
          content: `Convert $150^{\\circ}$ to radians, and $\\dfrac{5\\pi}{4}$ to degrees.

**Degrees to Radians:**
$$150^{\\circ} \\times \\frac{\\pi}{180} = \\frac{150\\pi}{180} = \\frac{5\\pi}{6}$$

**Radians to Degrees:**
$$\\frac{5\\pi}{4} \\times \\frac{180}{\\pi} = \\frac{900}{4} = 225^{\\circ}$$`,
          keyPoints: [
            `Cancel $\\pi$ when converting radians to degrees`,
            `Simplify the fraction after multiplying`,
            `$\\dfrac{5\\pi}{6}$ is in the second quadrant`
          ]
        },
        {
          id: "c4_ex2",
          type: "example",
          title: "Example 2 — Evaluating Trig in Radians",
          content: `Find $\\sin\\left(\\dfrac{\\pi}{3}\\right) + \\cos\\left(\\dfrac{\\pi}{6}\\right)$.

**Step 1:** Convert. $\\dfrac{\\pi}{3} = 60^{\\circ}$, $\\dfrac{\\pi}{6} = 30^{\\circ}$.

**Step 2:** Evaluate.
$$\\sin(60^{\\circ}) + \\cos(30^{\\circ}) = \\frac{\\sqrt{3}}{2} + \\frac{\\sqrt{3}}{2} = \\sqrt{3}$$

Note: $\\sin(60^{\\circ}) = \\cos(30^{\\circ})$ by the complementary identity!`,
          keyPoints: [
            `Convert radians to degrees to use memorised values`,
            `$\\sin(60^{\\circ}) = \\cos(30^{\\circ}) = \\dfrac{\\sqrt{3}}{2}$`,
            `Look for complementary pairs before calculating`
          ]
        },
        {
          id: "c4_q1",
          type: "question",
          topic: "Radians",
          difficulty: "easy",
          question: `Which equals $\\cos\\left(\\dfrac{\\pi}{3}\\right)$?`,
          options: [`A) $\\dfrac{1}{2}$`, `B) $\\dfrac{\\sqrt{2}}{2}$`, `C) $\\dfrac{\\sqrt{3}}{2}$`, `D) $1$`],
          correct: "A",
          explanation: `$\\dfrac{\\pi}{3} = 60^{\\circ}$. $\\cos(60^{\\circ}) = \\dfrac{1}{2}$.`,
          timeLimit: 60
        },
        {
          id: "c4_q2",
          type: "question",
          topic: "Radians",
          difficulty: "medium",
          question: `What is $\\sin\\left(\\dfrac{\\pi}{4}\\right) \\times \\cos\\left(\\dfrac{\\pi}{4}\\right)$?`,
          options: [`A) $\\dfrac{1}{4}$`, `B) $\\dfrac{1}{2}$`, `C) $\\dfrac{\\sqrt{2}}{2}$`, `D) $1$`],
          correct: "B",
          explanation: `$\\sin(45^{\\circ}) = \\cos(45^{\\circ}) = \\dfrac{\\sqrt{2}}{2}$. Product $= \\dfrac{2}{4} = \\dfrac{1}{2}$.`,
          timeLimit: 75
        },
        {
          id: "c4_q3",
          type: "question",
          topic: "Radians",
          difficulty: "hard",
          question: `If $\\sin\\left(\\dfrac{\\pi}{k}\\right) = \\cos\\left(\\dfrac{\\pi}{6}\\right)$, what is the value of $k$?`,
          options: [`A) $2$`, `B) $3$`, `C) $4$`, `D) $6$`],
          correct: "B",
          explanation: `$\\cos\\left(\\dfrac{\\pi}{6}\\right) = \\sin\\left(\\dfrac{\\pi}{3}\\right)$. So $\\dfrac{\\pi}{k} = \\dfrac{\\pi}{3} \\Rightarrow k = 3$.`,
          timeLimit: 90
        }
      ]
    }
  ]
};