// FILE: src/data/mechanics/forcesNewton.js

export const CHAPTER_META = {
  id: "forces-newton",
  title: "Forces & Newton's Laws",
  subtitle: "Newton's laws, friction and connected particles",
  icon: "⚖️",
  color: "#f87171",
  paper: "Mechanics",
};

export const CHAPTER_TOPICS = [
  {
    id: "newtons-laws",
    icon: "N",
    title: "Newton's Laws of Motion",
    subtitle: "Three fundamental laws of motion",
    color: "#f87171",
    visualization: null,
    desmosNote: "No graph required — focus on drawing free-body diagrams and applying F = ma to each body separately.",
    desmosExpressions: [],
    theory: `**Newton's First Law (Law of Inertia)**

A body remains at rest, or continues to move in a straight line at constant velocity, unless acted upon by a resultant external force. This law defines **inertia** (resistance to change in motion) and gives the condition for **equilibrium**: if a body is not accelerating, the resultant force on it is zero.

$$\\sum \\mathbf{F} = \\mathbf{0} \\iff \\text{body is in equilibrium (constant velocity or at rest)}$$

**Newton's Second Law**

The resultant force acting on a body is equal to the product of its mass and acceleration. Both force and acceleration are vectors in the **same direction**:

$$\\mathbf{F} = m\\mathbf{a}$$

The unit of force, the **newton (N)**, is defined by this law: 1 N is the force needed to accelerate a mass of 1 kg at 1 m/s².

**Newton's Third Law**

If body A exerts a force $\\mathbf{F}$ on body B, then body B exerts a force $-\\mathbf{F}$ on body A — equal in magnitude, opposite in direction, and of the same type.

$$\\mathbf{F}_{A \\text{ on } B} = -\\mathbf{F}_{B \\text{ on } A}$$

**Critical point**: the two forces in a Newton's Third Law pair act on **different bodies**. They can never both appear on the same free-body diagram, and they never cancel each other out for the purposes of $\\mathbf{F} = m\\mathbf{a}$.`,
    formulas: [
      {
        label: "Newton's Second Law",
        latex: "\\mathbf{F} = m\\mathbf{a}",
        note: "Resultant force (N) = mass (kg) × acceleration (m/s²)"
      },
      {
        label: "Equilibrium condition",
        latex: "\\sum \\mathbf{F} = \\mathbf{0}",
        note: "Net force is zero; body at rest or moving at constant velocity"
      },
      {
        label: "Newton's Third Law",
        latex: "\\mathbf{F}_{AB} = -\\mathbf{F}_{BA}",
        note: "Equal magnitude, opposite direction; forces act on different bodies"
      }
    ],
    example: {
      question: "A net resultant force of 15 N acts on a particle of mass 3 kg. Find the acceleration. A separate 2 kg particle rests on a table — describe the Newton's Third Law pair of forces.",
      steps: [
        { label: "Apply Newton's 2nd Law: F = ma", math: "15 = 3 \\times a \\Rightarrow a = \\frac{15}{3} = 5 \\text{ m/s}^2" },
        { label: "For the 2 kg particle at rest on the table — vertically in equilibrium", math: "\\sum F_y = 0 \\Rightarrow N - mg = 0 \\Rightarrow N = 2 \\times 9.8 = 19.6 \\text{ N (upward from table on particle)}" },
        { label: "Newton's Third Law pair", math: "\\text{Table exerts 19.6 N upward on particle} \\iff \\text{Particle exerts 19.6 N downward on table}" }
      ]
    },
    practice: {
      question: "A particle of mass 4 kg accelerates from rest to 12 m/s in 3 seconds on a smooth horizontal surface. Find: (a) the acceleration, (b) the driving (horizontal) force.",
      solution: [
        { step: "Part (a) — Use v = u + at to find acceleration", math: "a = \\frac{v - u}{t} = \\frac{12 - 0}{3} = 4 \\text{ m/s}^2" },
        { step: "Part (b) — Apply Newton's 2nd Law horizontally (smooth surface, so no friction)", math: "F = ma = 4 \\times 4 = 16 \\text{ N}" }
      ]
    }
  },
  {
    id: "friction",
    icon: "μ",
    title: "Friction",
    subtitle: "Coefficient of friction, limiting equilibrium",
    color: "#f87171",
    visualization: null,
    desmosNote: "No graph required — practise resolving forces on inclined planes and applying F = μR at limiting equilibrium.",
    desmosExpressions: [],
    theory: `**Friction** is a contact force that acts **parallel to the surface**, opposing the motion of a body or its tendency to move.

For a body on a rough surface, the friction force $F$ satisfies:

$$F \\le \\mu R$$

where:
- $\\mu$ is the **coefficient of friction** (dimensionless, $\\mu \\ge 0$; depends on the two surfaces in contact)
- $R$ is the **normal reaction** (the contact force perpendicular to the surface)

**Three cases:**

1. **Body stationary, no tendency to move**: $F = 0$ (no friction needed).
2. **Body stationary, force applied but not enough to cause motion** (static friction): $0 < F < \\mu R$ (friction adjusts to maintain equilibrium).
3. **Limiting equilibrium** (on the point of moving): $F = \\mu R$ (maximum static friction). The body is in equilibrium but would move if the applied force increased at all.
4. **Body moving** (kinetic/dynamic friction): $F = \\mu R$ (constant kinetic friction, acting opposite to velocity).

**On a rough inclined plane at limiting equilibrium** (particle about to slide):

$$\\mu = \\tan\\theta$$

where $\\theta$ is the angle of the slope to the horizontal. This is a useful result to remember.`,
    formulas: [
      {
        label: "Friction inequality",
        latex: "F \\le \\mu R",
        note: "F is friction force, μ is coefficient of friction, R is normal reaction"
      },
      {
        label: "Limiting / kinetic friction",
        latex: "F = \\mu R",
        note: "Equality holds at limiting equilibrium or when the body is moving"
      },
      {
        label: "Angle of friction on incline",
        latex: "\\mu = \\tan\\theta",
        note: "At limiting equilibrium on a slope inclined at angle θ"
      }
    ],
    example: {
      question: "A box of mass 5 kg rests on a rough horizontal surface with $\\mu = 0.4$. Find: (a) the normal reaction, (b) the maximum friction force, (c) the minimum horizontal force needed to push the box.",
      steps: [
        { label: "Resolve vertically — box is in equilibrium vertically", math: "R = mg = 5 \\times 9.8 = 49 \\text{ N}" },
        { label: "Part (b) — Maximum friction at limiting equilibrium", math: "F_{\\max} = \\mu R = 0.4 \\times 49 = 19.6 \\text{ N}" },
        { label: "Part (c) — Minimum push force = maximum friction (horizontal equilibrium at point of motion)", math: "P_{\\min} = 19.6 \\text{ N}" }
      ]
    },
    practice: {
      question: "A particle of mass 8 kg is on a rough slope inclined at 25° to the horizontal. It is in limiting equilibrium (on the point of sliding down). Find the coefficient of friction $\\mu$.",
      solution: [
        { step: "Resolve perpendicular to slope for normal reaction", math: "R = mg\\cos 25^\\circ = 8 \\times 9.8 \\times \\cos 25^\\circ = 78.4 \\times 0.9063 \\approx 71.1 \\text{ N}" },
        { step: "Resolve parallel to slope — particle on point of sliding down, so friction acts up the slope", math: "F = mg\\sin 25^\\circ = 8 \\times 9.8 \\times \\sin 25^\\circ = 78.4 \\times 0.4226 \\approx 33.1 \\text{ N}" },
        { step: "At limiting equilibrium: F = μR", math: "\\mu = \\frac{F}{R} = \\frac{33.1}{71.1} \\approx 0.465" },
        { step: "Verify using angle formula", math: "\\mu = \\tan 25^\\circ \\approx 0.466 \\checkmark" }
      ]
    }
  },
  {
    id: "connected-particles",
    icon: "⟷",
    title: "Connected Particles",
    subtitle: "Strings, pulleys and Atwood machines",
    color: "#f87171",
    visualization: null,
    desmosNote: "No graph required — focus on applying F = ma separately to each particle and solving the resulting simultaneous equations.",
    desmosExpressions: [],
    theory: `**Connected particles** are two or more objects joined by a string (usually light and inextensible) that may pass over a smooth peg or pulley.

**Key principles:**

1. **Same acceleration**: if the string is inextensible, all connected particles have the **same magnitude** of acceleration (though potentially different directions).
2. **Same tension throughout**: for a light string over a smooth pulley, the tension $T$ is the same on both sides.
3. **Apply $F = ma$ to each particle separately**: draw a free-body diagram for each, define a consistent positive direction, and write one equation per particle.
4. **Solve simultaneously**: add or subtract the equations to eliminate $T$ and find $a$, then back-substitute to find $T$.

**Atwood machine**: two particles of masses $m_1 > m_2$ hang on either side of a smooth pulley. The heavier particle descends, the lighter ascends.

$$a = \\frac{(m_1 - m_2)g}{m_1 + m_2}, \\qquad T = \\frac{2m_1 m_2 g}{m_1 + m_2}$$

For particles on a surface: remember to include friction (if rough), normal reaction, and weight components along/perpendicular to the surface in addition to the tension.`,
    formulas: [
      {
        label: "Same acceleration (inextensible string)",
        latex: "a_1 = a_2 = a",
        note: "Magnitudes equal; directions depend on the geometry"
      },
      {
        label: "Same tension (light string, smooth pulley)",
        latex: "T_1 = T_2 = T",
        note: "Tension is uniform throughout a light string over a smooth pulley"
      },
      {
        label: "Atwood machine acceleration",
        latex: "a = \\frac{(m_1 - m_2)\\,g}{m_1 + m_2}",
        note: "m₁ > m₂; m₁ descends"
      },
      {
        label: "Atwood machine tension",
        latex: "T = \\frac{2m_1 m_2 g}{m_1 + m_2}",
        note: "Tension in the string connecting m₁ and m₂"
      }
    ],
    example: {
      question: "Particles A (mass 3 kg) and B (mass 5 kg) are connected by a light inextensible string over a smooth pulley. Both hang freely. Find: (a) the acceleration of the system, (b) the tension in the string.",
      steps: [
        { label: "Set up: B is heavier so B descends; take downward for B as positive", math: "\\text{For B (downward positive): } 5g - T = 5a" },
        { label: "For A (upward positive, i.e. A rises): upward is positive for A", math: "\\text{For A (upward positive): } T - 3g = 3a" },
        { label: "Add both equations to eliminate T", math: "5g - 3g = 5a + 3a \\Rightarrow 2g = 8a" },
        { label: "Solve for a", math: "a = \\frac{2g}{8} = \\frac{g}{4} = \\frac{9.8}{4} = 2.45 \\text{ m/s}^2" },
        { label: "Substitute back to find T", math: "T = 3g + 3a = 3(9.8 + 2.45) = 3 \\times 12.25 = 36.75 \\text{ N}" }
      ]
    },
    practice: {
      question: "Particle P (mass 2 kg) rests on a smooth horizontal table and is connected by a light inextensible string over the edge to particle Q (mass 3 kg) hanging freely. Find: (a) the acceleration of the system, (b) the tension in the string.",
      solution: [
        { step: "For P on the table (horizontal, taking direction of motion as positive)", math: "T = 2a \\quad \\cdots (1)" },
        { step: "For Q hanging (taking downward as positive)", math: "3g - T = 3a \\quad \\cdots (2)" },
        { step: "Add equations (1) and (2) to eliminate T", math: "3g = 5a \\Rightarrow a = \\frac{3 \\times 9.8}{5} = \\frac{29.4}{5} = 5.88 \\text{ m/s}^2" },
        { step: "Substitute into equation (1) to find T", math: "T = 2 \\times 5.88 = 11.76 \\text{ N}" }
      ]
    }
  }
];
