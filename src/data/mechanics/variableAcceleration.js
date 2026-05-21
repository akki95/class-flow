// FILE: src/data/mechanics/variableAcceleration.js

export const CHAPTER_META = {
  id: "variable-acceleration",
  title: "Variable Acceleration",
  subtitle: "Calculus methods in kinematics",
  icon: "∫",
  color: "#c084fc",
  videoUrl: "https://www.youtube.com/watch?v=rpR8XiGEx1w",
  paper: "Mechanics",
};

export const CHAPTER_TOPICS = [
  {
    id: "diff-kinematics",
    videoUrl: "https://www.youtube.com/watch?v=EV6BGpFQY3Q",
    icon: "d/dt",
    title: "Differentiation in Kinematics",
    subtitle: "Velocity and acceleration from displacement",
    color: "#c084fc",
    visualization: null,
    desmosNote: "Explore s(t) = t³ − 6t² + 9t, v(t) = 3t² − 12t + 9, and a(t) = 6t − 12 for the same particle. When does v = 0? What is the sign of a at those times?",
    desmosExpressions: [
      { id: "1", latex: "s(t) = t^{3} - 6t^{2} + 9t" },
      { id: "2", latex: "v(t) = 3t^{2} - 12t + 9" },
      { id: "3", latex: "a(t) = 6t - 12" }
    ],
    theory: `When the **displacement** $s$ of a particle is given as a function of time $t$, the velocity and acceleration are found by **differentiation**:

$$v = \\frac{ds}{dt} \\qquad \\text{and} \\qquad a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}$$

This is because velocity is the instantaneous rate of change of displacement, and acceleration is the instantaneous rate of change of velocity. These relations hold even when the acceleration is **not constant** (variable acceleration) — the SUVAT equations would not apply in that case, but differentiation always does.

**Key applications:**

- **Velocity at a specific instant**: differentiate $s(t)$ to get $v(t)$, then substitute the value of $t$.
- **Acceleration at a specific instant**: differentiate $v(t)$ to get $a(t)$, then substitute.
- **Particle instantaneously at rest**: solve $v(t) = 0$ for $t$. There may be more than one solution.
- **Particle changing direction**: the particle changes direction when $v = 0$ and the sign of $v$ changes.
- **Maximum/minimum displacement**: occurs when $v = \\frac{ds}{dt} = 0$; confirm using the second derivative or by inspection of signs.

Always check that the value of $t$ you find is **non-negative** and within the valid domain stated in the problem.`,
    formulas: [
      {
        label: "Velocity from displacement",
        latex: "v = \\frac{ds}{dt}",
        note: "Differentiate s(t) with respect to t"
      },
      {
        label: "Acceleration from velocity",
        latex: "a = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}",
        note: "Differentiate v(t), or differentiate s(t) twice"
      }
    ],
    example: {
      question: "A particle has displacement $s = t^3 - 6t^2 + 9t$ metres at time $t$ seconds. Find: (a) the velocity at $t = 2$, (b) the acceleration at $t = 2$, (c) the times when the particle is instantaneously at rest.",
      steps: [
        { label: "Differentiate s(t) to get v(t)", math: "v = \\frac{ds}{dt} = 3t^2 - 12t + 9" },
        { label: "Part (a) — Substitute t = 2 into v(t)", math: "v(2) = 3(4) - 12(2) + 9 = 12 - 24 + 9 = -3 \\text{ m/s}" },
        { label: "Differentiate v(t) to get a(t)", math: "a = \\frac{dv}{dt} = 6t - 12" },
        { label: "Part (b) — Substitute t = 2 into a(t)", math: "a(2) = 6(2) - 12 = 12 - 12 = 0 \\text{ m/s}^2" },
        { label: "Part (c) — Set v = 0 and solve", math: "3t^2 - 12t + 9 = 0 \\Rightarrow t^2 - 4t + 3 = 0 \\Rightarrow (t-1)(t-3) = 0" },
        { label: "Solutions", math: "t = 1 \\text{ s} \\quad \\text{and} \\quad t = 3 \\text{ s}" }
      ]
    },
    practice: {
      question: "A particle moves so that its displacement is $s = 4t^3 - 3t^2 + 2t$ metres at time $t$ seconds. Find: (a) the velocity when $t = 1$, (b) the acceleration when $t = 2$, (c) the time(s) when the acceleration is zero.",
      solution: [
        { step: "Differentiate s(t) to get v(t)", math: "v = \\frac{ds}{dt} = 12t^2 - 6t + 2" },
        { step: "Part (a) — Substitute t = 1", math: "v(1) = 12(1)^2 - 6(1) + 2 = 12 - 6 + 2 = 8 \\text{ m/s}" },
        { step: "Differentiate v(t) to get a(t)", math: "a = \\frac{dv}{dt} = 24t - 6" },
        { step: "Part (b) — Substitute t = 2", math: "a(2) = 24(2) - 6 = 48 - 6 = 42 \\text{ m/s}^2" },
        { step: "Part (c) — Set a = 0 and solve", math: "24t - 6 = 0 \\Rightarrow t = \\frac{6}{24} = 0.25 \\text{ s}" }
      ]
    }
  },
  {
    id: "int-kinematics",
    videoUrl: "https://www.youtube.com/watch?v=Ot93kS8xQvY",
    icon: "∫dt",
    title: "Integration in Kinematics",
    subtitle: "Finding displacement and velocity by integration",
    color: "#c084fc",
    visualization: null,
    desmosNote: "No graph required — practise the integration technique and applying initial conditions to evaluate constants of integration.",
    desmosExpressions: [],
    theory: `**Integration** is the reverse of differentiation. If acceleration is known as a function of time, we integrate to recover velocity; integrate again to recover displacement:

$$v = \\int a \\, dt + c_1 \\qquad \\text{and} \\qquad s = \\int v \\, dt + c_2$$

The **constants of integration** $c_1$ and $c_2$ are found by applying **initial conditions** (boundary conditions) — values of $v$ and $s$ at a known time, typically $t = 0$:

- At $t = 0$: if $v = v_0$, substitute into the integrated expression to find $c_1$.
- At $t = 0$: if $s = s_0$, substitute into the expression for $s$ to find $c_2$.

**Change in displacement over an interval** (definite integral — no constant needed):

$$\\Delta s = \\int_{t_1}^{t_2} v \\, dt$$

Note: this gives the **net displacement** (signed), not the total distance. If $v$ changes sign in the interval, you must split the integral at the zero and sum the absolute values to get total distance.

Always state the initial conditions you are using, and verify that your answers are dimensionally consistent (units check: integrating m/s² with respect to s gives m/s; integrating m/s gives m).`,
    formulas: [
      {
        label: "Velocity by integration of acceleration",
        latex: "v = \\int a \\, dt + c",
        note: "c is found from the initial velocity condition"
      },
      {
        label: "Displacement by integration of velocity",
        latex: "s = \\int v \\, dt + c",
        note: "c is found from the initial displacement condition"
      },
      {
        label: "Change in displacement (definite integral)",
        latex: "\\Delta s = \\int_{t_1}^{t_2} v \\, dt",
        note: "Gives net (signed) displacement over the interval [t₁, t₂]"
      }
    ],
    example: {
      question: "A particle has acceleration $a = 6t - 4$ m/s² and an initial velocity of 2 m/s. Find $v$ as a function of $t$.",
      steps: [
        { label: "Integrate a(t) with respect to t", math: "v = \\int (6t - 4) \\, dt = 3t^2 - 4t + c" },
        { label: "Apply initial condition: v = 2 when t = 0", math: "2 = 3(0)^2 - 4(0) + c \\Rightarrow c = 2" },
        { label: "Write final expression for v", math: "v = 3t^2 - 4t + 2 \\text{ m/s}" }
      ]
    },
    practice: {
      question: "A particle starts from rest at the origin with acceleration $a = 10 - 2t$ m/s². Find: (a) $v$ as a function of $t$, (b) $s$ as a function of $t$, (c) the displacement when $t = 5$.",
      solution: [
        { step: "Part (a) — Integrate a(t); initial condition v = 0 at t = 0", math: "v = \\int (10 - 2t) \\, dt = 10t - t^2 + c" },
        { step: "Apply v = 0 at t = 0", math: "0 = 0 - 0 + c \\Rightarrow c = 0 \\quad \\Rightarrow \\quad v = 10t - t^2" },
        { step: "Part (b) — Integrate v(t); initial condition s = 0 at t = 0", math: "s = \\int (10t - t^2) \\, dt = 5t^2 - \\frac{t^3}{3} + c" },
        { step: "Apply s = 0 at t = 0", math: "0 = 0 - 0 + c \\Rightarrow c = 0 \\quad \\Rightarrow \\quad s = 5t^2 - \\frac{t^3}{3}" },
        { step: "Part (c) — Substitute t = 5 into s(t)", math: "s(5) = 5(25) - \\frac{125}{3} = 125 - 41.\\overline{6} \\approx 83.3 \\text{ m}" }
      ]
    }
  },
  {
    id: "max-min-kinematics",
    videoUrl: "https://www.youtube.com/watch?v=cXFxRCJKjbY",
    icon: "⊔",
    title: "Maximum and Minimum Values in Kinematics",
    subtitle: "Finding extreme values of displacement and velocity",
    color: "#c084fc",
    visualization: null,
    desmosNote: "Plot v(t) = 12t - 3t² and find where dv/dt = 0 to locate maximum velocity. Compare with the values at the boundary times.",
    desmosExpressions: [],
    theory: `**Finding maximum displacement:**

Set $v = \\frac{ds}{dt} = 0$ and solve for $t$. This gives the time(s) at which the particle is momentarily stationary and (potentially) at a turning point. Substitute the value of $t$ back into $s(t)$ to get the displacement.

Confirm it is a **maximum** using the second derivative test:

$$\\frac{d^2s}{dt^2} < 0 \\quad \\Rightarrow \\quad \\text{local maximum of } s$$
$$\\frac{d^2s}{dt^2} > 0 \\quad \\Rightarrow \\quad \\text{local minimum of } s$$

Or confirm by checking the sign of $v$ on either side of the critical point (if $v$ goes from positive to negative, $s$ has a maximum).

**Finding maximum velocity:**

Set $a = \\frac{dv}{dt} = 0$ and solve for $t$. Substitute back into $v(t)$.

Confirm it is a maximum: $\\frac{d^2v}{dt^2} < 0$ (equivalently, $\\frac{da}{dt} < 0$ at that point).

**Also check boundary values**: for problems with a restricted domain $t \\in [t_a, t_b]$, always evaluate $s$ (or $v$) at the endpoints too — the global maximum or minimum may be at a boundary rather than at a stationary point.

**Maximum speed** is $\\max |v(t)|$ — remember to check both positive and negative extrema of $v$.`,
    formulas: [
      {
        label: "Condition for max/min displacement",
        latex: "\\frac{ds}{dt} = 0",
        note: "Set v = 0 and solve for t; then substitute into s(t)"
      },
      {
        label: "Condition for max/min velocity",
        latex: "\\frac{dv}{dt} = 0",
        note: "Set a = 0 and solve for t; then substitute into v(t)"
      },
      {
        label: "Second derivative test for maximum",
        latex: "\\frac{d^2s}{dt^2} < 0 \\Rightarrow \\text{maximum of } s",
        note: "Negative second derivative confirms a local maximum"
      }
    ],
    example: {
      question: "A particle has velocity $v = 12t - 3t^2$ m/s for $0 \\le t \\le 4$. Find the maximum velocity and state when it occurs.",
      steps: [
        { label: "Differentiate v(t) to get a(t), then set a = 0", math: "a = \\frac{dv}{dt} = 12 - 6t = 0 \\Rightarrow t = 2 \\text{ s}" },
        { label: "Substitute t = 2 into v(t)", math: "v(2) = 12(2) - 3(4) = 24 - 12 = 12 \\text{ m/s}" },
        { label: "Confirm maximum: second derivative", math: "\\frac{d^2v}{dt^2} = -6 < 0 \\quad \\Rightarrow \\quad \\text{maximum confirmed}" },
        { label: "Check boundary values", math: "v(0) = 0 \\text{ m/s}, \\quad v(4) = 48 - 48 = 0 \\text{ m/s}" },
        { label: "Conclusion", math: "\\text{Maximum velocity} = 12 \\text{ m/s, occurring at } t = 2 \\text{ s}" }
      ]
    },
    practice: {
      question: "A particle's displacement is $s = 3t^2 - t^3$ metres for $0 \\le t \\le 3$. Find: (a) the maximum displacement, (b) the times when the particle is at the origin.",
      solution: [
        { step: "Differentiate s(t) to get v(t), then set v = 0", math: "v = \\frac{ds}{dt} = 6t - 3t^2 = 3t(2 - t) = 0 \\Rightarrow t = 0 \\text{ or } t = 2" },
        { step: "Part (a) — Evaluate s at t = 0 and t = 2", math: "s(0) = 0 \\text{ m}, \\quad s(2) = 3(4) - (8) = 12 - 8 = 4 \\text{ m}" },
        { step: "Confirm t = 2 gives a maximum (second derivative)", math: "\\frac{d^2s}{dt^2} = 6 - 6t; \\text{ at } t = 2: \\; 6 - 12 = -6 < 0 \\quad \\Rightarrow \\quad \\text{maximum}" },
        { step: "Maximum displacement = 4 m at t = 2 s", math: "s_{\\max} = 4 \\text{ m}" },
        { step: "Part (b) — Set s = 0 and solve", math: "3t^2 - t^3 = t^2(3 - t) = 0 \\Rightarrow t = 0 \\text{ or } t = 3" },
        { step: "Particle is at the origin at t = 0 s and t = 3 s", math: "t = 0 \\text{ s (initial position)} \\quad \\text{and} \\quad t = 3 \\text{ s (returns to origin)}" }
      ]
    }
  }
];
