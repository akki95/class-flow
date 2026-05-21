// FILE: src/data/mechanics/kinematics.js

export const CHAPTER_META = {
  id: "kinematics",
  title: "Kinematics",
  subtitle: "SUVAT equations, graphs and vertical motion",
  icon: "🚀",
  color: "#f97316",
  videoUrl: "https://www.youtube.com/watch?v=19Yc4i5QSfA",
  paper: "Mechanics",
};

export const CHAPTER_TOPICS = [
  {
    id: "motion-graphs",
    videoUrl: "https://www.youtube.com/watch?v=qjazCsnLpqU",
    icon: "📈",
    title: "Displacement-Time & Velocity-Time Graphs",
    subtitle: "Gradient and area rules for motion graphs",
    color: "#f97316",
    visualization: null,
    desmosNote: "Velocity-time: y = 2t (gradient = acceleration = 2 m/s²). Displacement-time: y = t² (gradient at any point = velocity = 2t). Compare the two curves.",
    desmosExpressions: [
      { id: "1", latex: "v(t) = 2t" },
      { id: "2", latex: "s(t) = t^{2}" }
    ],
    theory: `**Displacement-time (s-t) graphs**

The **gradient** of an s-t graph equals the **velocity** at that instant.

- A **straight line** (constant gradient) → constant velocity.
- A **curve** (changing gradient) → changing velocity, i.e. acceleration is present.
- A **horizontal line** (zero gradient) → the body is stationary.
- A **negative gradient** → the body is moving in the negative direction (back toward the origin).

**Velocity-time (v-t) graphs**

The **gradient** of a v-t graph equals the **acceleration** at that instant.

$$a = \\frac{\\Delta v}{\\Delta t}$$

The **area under a v-t graph** equals the **displacement** (signed):

$$s = \\text{area under v-t graph}$$

- Area **above the axis** (positive $v$) contributes positive displacement.
- Area **below the axis** (negative $v$) contributes negative displacement (motion in opposite direction).
- To find **total distance** (not displacement), add the magnitudes of each area separately.

For **uniform acceleration** (constant $a$), the v-t graph is a straight line, and the area under it is a **trapezium** (or triangle if starting from rest):

$$s = \\tfrac{1}{2}(u + v)t$$`,
    formulas: [
      {
        label: "Velocity from s-t graph",
        latex: "v = \\frac{\\Delta s}{\\Delta t}",
        note: "Gradient of displacement-time graph"
      },
      {
        label: "Acceleration from v-t graph",
        latex: "a = \\frac{\\Delta v}{\\Delta t}",
        note: "Gradient of velocity-time graph"
      },
      {
        label: "Displacement from v-t graph",
        latex: "s = \\text{area under v-t graph}",
        note: "Signed area; use trapezium/triangle formulae for straight-line segments"
      }
    ],
    example: {
      question: "A v-t graph shows velocity increasing uniformly from 0 to 20 m/s over the first 5 seconds, then remaining constant at 20 m/s for the next 3 seconds. Find: (a) the acceleration during the first 5 s, (b) the total displacement.",
      steps: [
        { label: "Part (a) — Acceleration = gradient of v-t graph", math: "a = \\frac{\\Delta v}{\\Delta t} = \\frac{20 - 0}{5 - 0} = 4 \\text{ m/s}^2" },
        { label: "Part (b) — Area under graph: triangle for first phase", math: "s_1 = \\tfrac{1}{2} \\times 5 \\times 20 = 50 \\text{ m}" },
        { label: "Rectangle for constant-velocity phase", math: "s_2 = 3 \\times 20 = 60 \\text{ m}" },
        { label: "Total displacement", math: "s = s_1 + s_2 = 50 + 60 = 110 \\text{ m}" }
      ]
    },
    practice: {
      question: "A car travels at a constant 15 m/s for 4 s, then decelerates uniformly to rest in 6 s. Sketch the v-t graph and find: (a) the deceleration, (b) the total distance travelled.",
      solution: [
        { step: "Sketch: horizontal line at v = 15 from t = 0 to t = 4, then straight line down to v = 0 at t = 10", math: "\\text{v-t graph: constant phase then linearly decreasing phase}" },
        { step: "Part (a) — Deceleration = magnitude of gradient in second phase", math: "a = \\frac{0 - 15}{6} = -2.5 \\text{ m/s}^2 \\quad (\\text{deceleration of } 2.5 \\text{ m/s}^2)" },
        { step: "Part (b) — Area under first phase (rectangle)", math: "s_1 = 4 \\times 15 = 60 \\text{ m}" },
        { step: "Area under second phase (triangle)", math: "s_2 = \\tfrac{1}{2} \\times 6 \\times 15 = 45 \\text{ m}" },
        { step: "Total distance", math: "s = 60 + 45 = 105 \\text{ m}" }
      ]
    }
  },
  {
    id: "suvat",
    videoUrl: "https://www.youtube.com/watch?v=TAJDierW87g",
    icon: "s",
    title: "SUVAT Equations",
    subtitle: "Five equations for constant acceleration",
    color: "#f97316",
    visualization: null,
    desmosNote: "Plot s = ut + 0.5*a*t² for chosen u and a values to see the parabolic displacement curve under constant acceleration.",
    desmosExpressions: [],
    theory: `The **SUVAT equations** apply whenever acceleration is **constant** (uniform acceleration). The five variables are:

| Symbol | Meaning | Unit |
|---|---|---|
| $s$ | displacement | m |
| $u$ | initial velocity | m/s |
| $v$ | final velocity | m/s |
| $a$ | acceleration (constant) | m/s² |
| $t$ | time | s |

Given any **three** of these five quantities, you can find the other two using the appropriate pair of equations.

**Strategy**: Identify which variable is **not involved** in the problem, then pick the equation that does not contain it.

$$v = u + at \\quad (\\text{no } s)$$
$$s = ut + \\tfrac{1}{2}at^2 \\quad (\\text{no } v)$$
$$v^2 = u^2 + 2as \\quad (\\text{no } t)$$
$$s = \\tfrac{1}{2}(u + v)t \\quad (\\text{no } a)$$
$$s = vt - \\tfrac{1}{2}at^2 \\quad (\\text{no } u)$$

Always **define a positive direction** at the start of the solution and apply it consistently to all vector quantities ($s$, $u$, $v$, $a$). A deceleration means $a$ is negative if motion is in the positive direction.`,
    formulas: [
      {
        label: "Equation 1 (no s)",
        latex: "v = u + at"
      },
      {
        label: "Equation 2 (no v)",
        latex: "s = ut + \\tfrac{1}{2}at^2"
      },
      {
        label: "Equation 3 (no t)",
        latex: "v^2 = u^2 + 2as"
      },
      {
        label: "Equation 4 (no a)",
        latex: "s = \\tfrac{1}{2}(u + v)t"
      },
      {
        label: "Equation 5 (no u)",
        latex: "s = vt - \\tfrac{1}{2}at^2"
      }
    ],
    example: {
      question: "A car accelerates from rest at 2.5 m/s² for 8 seconds. Find: (a) the final velocity, (b) the distance travelled.",
      steps: [
        { label: "State known values: u = 0, a = 2.5, t = 8", math: "u = 0 \\text{ m/s}, \\quad a = 2.5 \\text{ m/s}^2, \\quad t = 8 \\text{ s}" },
        { label: "Part (a) — Use v = u + at (no s needed)", math: "v = 0 + 2.5 \\times 8 = 20 \\text{ m/s}" },
        { label: "Part (b) — Use s = ut + ½at² (no v needed)", math: "s = 0 \\times 8 + \\tfrac{1}{2} \\times 2.5 \\times 8^2 = 0 + \\tfrac{1}{2} \\times 2.5 \\times 64 = 80 \\text{ m}" },
        { label: "Check using v² = u² + 2as", math: "v^2 = 0 + 2 \\times 2.5 \\times 80 = 400 = 20^2 \\checkmark" }
      ]
    },
    practice: {
      question: "A particle moving at 12 m/s decelerates uniformly at 3 m/s². Find: (a) velocity after 3 s, (b) distance travelled before stopping, (c) time to stop.",
      solution: [
        { step: "State known values: u = 12, a = −3 (deceleration)", math: "u = 12 \\text{ m/s}, \\quad a = -3 \\text{ m/s}^2" },
        { step: "Part (a) — Use v = u + at", math: "v = 12 + (-3)(3) = 12 - 9 = 3 \\text{ m/s}" },
        { step: "Part (b) — Use v² = u² + 2as with v = 0 (stopped)", math: "0 = 12^2 + 2(-3)s \\Rightarrow 0 = 144 - 6s \\Rightarrow s = \\frac{144}{6} = 24 \\text{ m}" },
        { step: "Part (c) — Use v = u + at with v = 0", math: "0 = 12 - 3t \\Rightarrow t = \\frac{12}{3} = 4 \\text{ s}" }
      ]
    }
  },
  {
    id: "vertical-motion",
    videoUrl: "https://www.youtube.com/watch?v=cYrmYMaewRc",
    icon: "g",
    title: "Vertical Motion Under Gravity",
    subtitle: "Projectiles with g = 9.8 m/s² downward",
    color: "#f97316",
    visualization: null,
    desmosNote: "Plot s(t) = u*t - 4.9*t² for various initial velocities u to see trajectories. The vertex gives maximum height; the positive root gives time of flight.",
    desmosExpressions: [],
    theory: `When a particle moves **vertically** (thrown up, dropped, or falling), the only acceleration is due to **gravity**:

$$g = 9.8 \\text{ m/s}^2 \\quad (\\text{vertically downward})$$

**Sign convention** (most common): take **upward as positive**.

Then $a = -9.8$ m/s² (since gravity acts downward, opposite to the positive direction).

Apply all five SUVAT equations with this convention. Key results:

- At **maximum height**: $v = 0$ (instantaneous rest before reversing).
- **Time to reach max height**: $t = \\frac{u}{g}$ (where $u$ is the upward launch speed).
- **Time of flight** (returning to same level): $t = \\frac{2u}{g}$ (double the ascent time by symmetry).
- **Speed on return** to launch height equals the launch speed (by symmetry of energy).

If taking **downward as positive** (e.g. for a falling stone), then $a = +9.8$ m/s² and initial velocity is positive for downward motion.

Always **state your sign convention** explicitly at the start of the solution and apply it consistently to $s$, $u$, $v$, and $a$.`,
    formulas: [
      {
        label: "Gravitational acceleration",
        latex: "a = -g = -9.8 \\text{ m/s}^2",
        note: "Taking upward as positive; negate if taking downward as positive"
      },
      {
        label: "Maximum height condition",
        latex: "v = 0 \\text{ at maximum height}",
        note: "Use v² = u² + 2as to find max height"
      },
      {
        label: "Time of flight (same level launch and landing)",
        latex: "t = \\frac{2u}{g}",
        note: "Valid only when particle returns to the same height it was launched from"
      }
    ],
    example: {
      question: "A ball is thrown vertically upward at 14 m/s. Taking $g = 9.8$ m/s² and upward as positive, find: (a) maximum height reached, (b) time to return to the starting point.",
      steps: [
        { label: "State convention and known values", math: "u = +14 \\text{ m/s}, \\quad a = -9.8 \\text{ m/s}^2, \\quad \\text{upward positive}" },
        { label: "Part (a) — At max height, v = 0. Use v² = u² + 2as", math: "0 = 14^2 + 2(-9.8)s \\Rightarrow 0 = 196 - 19.6s" },
        { label: "Solve for s", math: "s = \\frac{196}{19.6} = 10 \\text{ m}" },
        { label: "Part (b) — Particle returns to s = 0. Use s = ut + ½at²", math: "0 = 14t + \\tfrac{1}{2}(-9.8)t^2 = 14t - 4.9t^2 = t(14 - 4.9t)" },
        { label: "Solve — t = 0 is the launch; take the non-zero solution", math: "t = \\frac{14}{4.9} \\approx 2.86 \\text{ s}" }
      ]
    },
    practice: {
      question: "A stone is dropped from rest from the top of a cliff 44.1 m high. Taking downward as positive and $g = 9.8$ m/s², find: (a) the time to reach the ground, (b) the speed on impact.",
      solution: [
        { step: "State convention and known values", math: "u = 0 \\text{ m/s}, \\quad s = 44.1 \\text{ m}, \\quad a = +9.8 \\text{ m/s}^2 \\quad (\\text{downward positive})" },
        { step: "Part (a) — Use s = ut + ½at²", math: "44.1 = 0 \\cdot t + \\tfrac{1}{2} \\times 9.8 \\times t^2 = 4.9t^2" },
        { step: "Solve for t", math: "t^2 = \\frac{44.1}{4.9} = 9 \\Rightarrow t = 3 \\text{ s}" },
        { step: "Part (b) — Use v² = u² + 2as", math: "v^2 = 0 + 2 \\times 9.8 \\times 44.1 = 864.36" },
        { step: "Solve for v", math: "v = \\sqrt{864.36} = 29.4 \\text{ m/s}" }
      ]
    }
  }
];
