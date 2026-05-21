// FILE: src/data/mechanics/modelling.js

export const CHAPTER_META = {
  id: "modelling",
  title: "Modelling in Mechanics",
  subtitle: "Assumptions, units and force diagrams",
  icon: "⚙️",
  color: "#f59e0b",
  paper: "Mechanics",
};

export const CHAPTER_TOPICS = [
  {
    id: "models-assumptions",
    videoUrl: "https://www.youtube.com/watch?v=EoBMMVW96ag",
    icon: "≈",
    title: "Mathematical Models & Assumptions",
    subtitle: "Particles, rods, strings — what we assume",
    color: "#f59e0b",
    visualization: null,
    desmosNote: "No standard graph for this topic — focus on understanding assumptions and drawing force diagrams.",
    desmosExpressions: [],
    theory: `A **mathematical model** is a simplification of a real situation used to make calculations tractable. Common models and assumptions in AS Mechanics:

- **Particle**: the object has negligible dimensions; all its mass is concentrated at a single point; rotation is ignored.
- **Uniform rod**: mass is evenly distributed along the rod's length; the centre of mass acts at the midpoint.
- **Light string / light rod**: the object is massless; it transfers force without any change in magnitude.
- **Smooth surface**: no friction acts at the contact (frictionless surface).
- **Rough surface**: friction acts at the contact, opposing relative motion or tendency of motion.
- **Inextensible string**: the string does not stretch; objects connected by it share the same speed and acceleration magnitude.
- **Peg**: smooth and fixed to a surface; it can change the direction of a string's tension without friction.

Modelling assumptions **simplify real behaviour** and must be stated explicitly in solutions. After solving, you may comment on limitations — for example: *"In practice, air resistance would reduce the speed"* or *"The rod has mass in reality, so the actual tension would be higher."*

Whenever you list assumptions, explain their effect: what quantity or behaviour does each assumption simplify or eliminate?`,
    formulas: [
      {
        label: "Force Diagram Setup",
        latex: "\\text{Draw all forces as arrows: } W = mg \\text{ (down)}, R \\perp \\text{surface}, T \\text{ along string}, F \\text{ opposing motion}",
        note: "No single formula — force diagrams are the key tool for this topic"
      }
    ],
    example: {
      question: "A ball is thrown through the air. List the assumptions made when modelling it as a particle moving under gravity only.",
      steps: [
        { label: "Assumption 1 — Particle model", math: "\\text{The ball is treated as a particle: its size is negligible, so air resistance due to cross-section is ignored.}" },
        { label: "Assumption 2 — No air resistance", math: "\\text{Air resistance is ignored: the only force acting is gravity.}" },
        { label: "Assumption 3 — Constant } g", math: "g = 9.8 \\text{ m/s}^2 \\text{ is taken as constant throughout the motion.}" },
        { label: "Assumption 4 — Non-rotating Earth", math: "\\text{The Earth's rotation is ignored: the ground is treated as an inertial frame.}" }
      ]
    },
    practice: {
      question: "A box slides along a rough horizontal floor, attached to a wall by a horizontal string. Write down two modelling assumptions you would make and explain their effect on the model.",
      solution: [
        { step: "Assumption 1 — Particle model", math: "\\text{The box is modelled as a particle: rotation and finite dimensions are ignored, so forces are treated as acting at a single point.}" },
        { step: "Assumption 2 — Light, inextensible string", math: "\\text{The string is light (massless) and inextensible (does not stretch): tension is constant throughout the string and the box and wall move (or stay) together.}" }
      ]
    }
  },
  {
    id: "units-scalars-vectors",
    videoUrl: "https://www.youtube.com/watch?v=EDhZyRo2dVA",
    icon: "→",
    title: "SI Units, Scalars and Vectors",
    subtitle: "Fundamental units and vector/scalar classification",
    color: "#f59e0b",
    visualization: null,
    desmosNote: "No graph required — focus on unit conversions and vector/scalar classification.",
    desmosExpressions: [],
    theory: `The **SI (International System) units** used in mechanics are:

| Quantity | SI Unit | Symbol |
|---|---|---|
| Distance / Displacement | metre | m |
| Mass | kilogram | kg |
| Time | second | s |
| Force / Weight | newton | N |
| Speed / Velocity | metres per second | m/s |
| Acceleration | metres per second squared | m/s² |

A **scalar** quantity has **magnitude only** — no direction is associated with it. Examples: speed, mass, distance, time, temperature.

A **vector** quantity has both **magnitude and direction**. Examples: velocity, displacement, acceleration, force, weight, momentum.

Vectors are represented by arrows (length = magnitude, direction = arrow direction) or by bold letters (e.g. **F**, **v**) in print, or underlined letters ($\\underline{v}$) in handwriting.

**Weight** is a vector force: $W = mg$, acting vertically downward. **Mass** is a scalar.

$$W = mg$$

where $g = 9.8 \\text{ m/s}^2$ (use $g = 10 \\text{ m/s}^2$ only if the question explicitly states it).

Newton's Second Law $F = ma$ is a **vector equation**: the resultant force and the acceleration are in the **same direction**.`,
    formulas: [
      {
        label: "Weight",
        latex: "W = mg",
        note: "g = 9.8 m/s² (downward); W is a vector"
      },
      {
        label: "Newton's Second Law",
        latex: "F = ma",
        note: "Resultant force F (N), mass m (kg), acceleration a (m/s²)"
      }
    ],
    example: {
      question: "Classify each quantity as scalar or vector: (a) 15 N downward, (b) 60 kg, (c) 30 m/s, (d) 20 m/s² eastward.",
      steps: [
        { label: "Part (a) — 15 N downward", math: "\\text{Force with a stated direction} \\Rightarrow \\textbf{vector}" },
        { label: "Part (b) — 60 kg", math: "\\text{Mass has no direction} \\Rightarrow \\textbf{scalar}" },
        { label: "Part (c) — 30 m/s", math: "\\text{Speed (magnitude of velocity, no direction stated)} \\Rightarrow \\textbf{scalar}" },
        { label: "Part (d) — 20 m/s² eastward", math: "\\text{Acceleration with a stated direction} \\Rightarrow \\textbf{vector}" }
      ]
    },
    practice: {
      question: "A particle has mass 4 kg. Find its weight. A horizontal force of 12 N then acts on it on a smooth surface. Find its acceleration.",
      solution: [
        { step: "Find weight using W = mg", math: "W = 4 \\times 9.8 = 39.2 \\text{ N (vertically downward)}" },
        { step: "Apply Newton's 2nd Law horizontally", math: "F = ma \\Rightarrow 12 = 4a" },
        { step: "Solve for acceleration", math: "a = \\frac{12}{4} = 3 \\text{ m/s}^2 \\text{ (horizontal, in direction of force)}" }
      ]
    }
  },
  {
    id: "force-diagrams",
    videoUrl: "https://www.youtube.com/watch?v=_5al_NNGXyg",
    icon: "↑",
    title: "Force Diagrams",
    subtitle: "Drawing and resolving contact forces",
    color: "#f59e0b",
    visualization: null,
    desmosNote: "No graph required — practise drawing force diagrams on paper, then resolve forces into components.",
    desmosExpressions: [],
    theory: `A **force diagram** (also called a free-body diagram) shows **all forces** acting on a body as labelled arrows originating from (or acting on) the body. Each arrow points in the direction the force acts, and its length represents the relative magnitude.

**Standard forces to include:**

- **Weight** $W = mg$: acts vertically **downward** through the centre of mass.
- **Normal reaction** $R$ (or $N$): acts **perpendicular to the surface** the body is resting on; it is a contact force.
- **Tension** $T$: acts **along a string or rod**, pulling the body toward the attachment.
- **Friction** $F$: acts **parallel to the surface**, opposing motion or the tendency of motion.
- **Thrust** (compression): acts along a rod, **pushing** the body away from the attachment.

When a body is in **equilibrium** (stationary or moving at constant velocity), the resultant force in every direction is zero:

$$\\sum F_x = 0 \\quad \\text{and} \\quad \\sum F_y = 0$$

To **resolve** a force $F$ at angle $\\theta$ to the horizontal:

$$F_x = F\\cos\\theta \\quad (\\text{horizontal component})$$
$$F_y = F\\sin\\theta \\quad (\\text{vertical component})$$

Always choose a clear **positive direction** for each axis and be consistent throughout the problem.`,
    formulas: [
      {
        label: "Equilibrium condition",
        latex: "\\sum F_x = 0 \\quad \\text{and} \\quad \\sum F_y = 0",
        note: "Applies when resultant force is zero (rest or constant velocity)"
      },
      {
        label: "Horizontal component",
        latex: "F_x = F\\cos\\theta",
        note: "Angle θ measured from the horizontal"
      },
      {
        label: "Vertical component",
        latex: "F_y = F\\sin\\theta",
        note: "Angle θ measured from the horizontal"
      }
    ],
    example: {
      question: "A particle of mass 3 kg rests on a smooth horizontal surface. A horizontal force of 10 N acts on it. Find the normal reaction and the acceleration of the particle.",
      steps: [
        { label: "List all forces", math: "\\text{Weight: } W = 3 \\times 9.8 = 29.4 \\text{ N (downward)}" },
        { label: "Resolve vertically (equilibrium — no vertical motion)", math: "R - 29.4 = 0 \\Rightarrow R = 29.4 \\text{ N (upward)}" },
        { label: "Resolve horizontally — apply Newton's 2nd Law", math: "F = ma \\Rightarrow 10 = 3a" },
        { label: "Solve for acceleration", math: "a = \\frac{10}{3} \\approx 3.33 \\text{ m/s}^2 \\text{ (horizontal)}" }
      ]
    },
    practice: {
      question: "A particle of mass 5 kg rests on a smooth slope inclined at 30° to the horizontal. Find: (a) the normal reaction $R$, (b) the component of weight along the slope.",
      solution: [
        { step: "Resolve perpendicular to slope for R", math: "R = mg\\cos 30^\\circ = 5 \\times 9.8 \\times \\frac{\\sqrt{3}}{2} = 49 \\times 0.8660 \\approx 42.4 \\text{ N}" },
        { step: "Resolve parallel to slope (component of weight down the slope)", math: "W_{\\parallel} = mg\\sin 30^\\circ = 5 \\times 9.8 \\times 0.5 = 24.5 \\text{ N (down the slope)}" }
      ]
    }
  }
];
