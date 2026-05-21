export const CHAPTER_META = {
  id: "alevel-projectiles",
  title: "Projectiles",
  subtitle: "Two-dimensional motion under gravity with horizontal and vertical components",
  icon: "🚀",
  color: "#f97316",
  year: "2",
  paper: "A-Level Applied",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "projectile-motion",
    icon: "🚀",
    title: "Projectile Motion",
    subtitle: "Horizontal and vertical components, trajectory",
    color: "#f97316",
    visualization: null,
    videoUrl: null,
    desmosNote:
      "Projectile trajectory. Change θ (radians) and u to see how range and max height change.",
    desmosExpressions: [
      { id: "1", latex: "y=x\\tan(\\theta)-\\frac{9.8x^2}{2\\cdot u^2\\cdot\\cos^2(\\theta)}" },
      { id: "2", latex: "\\theta=0.785" },
      { id: "3", latex: "u=20" },
    ],
    theory: `A **projectile** is launched with speed $u$ at angle $\\theta$ above the horizontal. The key principle is that **horizontal and vertical motions are independent**.

**Horizontal motion** (no acceleration):
$$x = u\\cos\\theta \\cdot t$$

**Vertical motion** (acceleration $g$ downward):
$$y = u\\sin\\theta \\cdot t - \\tfrac{1}{2}gt^2$$

**Velocity components at time $t$:**
- Horizontal: $v_x = u\\cos\\theta$ (constant throughout)
- Vertical: $v_y = u\\sin\\theta - gt$

**Maximum height:** Occurs when $v_y = 0$, i.e. $t = \\dfrac{u\\sin\\theta}{g}$.

**Time of flight:** Set $y = 0$ (returns to launch height): $t_{\\text{flight}} = \\dfrac{2u\\sin\\theta}{g}$.

**Range:** $R = u\\cos\\theta \\times t_{\\text{flight}} = \\dfrac{u^2 \\sin 2\\theta}{g}$.

**Maximum range** is achieved at $\\theta = 45°$.

**Equation of trajectory** (eliminating $t$):
$$y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}$$

This is a **parabola**. For a particle projected horizontally ($\\theta = 0$), use $x = ut$ and $y = \\tfrac{1}{2}gt^2$ (taking downward as positive).`,
    formulas: [
      "x = u\\cos\\theta \\cdot t",
      "y = u\\sin\\theta \\cdot t - \\tfrac{1}{2}gt^2",
      "v_y = u\\sin\\theta - gt",
      "y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}",
    ],
    example: {
      question:
        "A ball is projected at 20 m s$^{-1}$ at 30° to the horizontal. Find (a) the maximum height and (b) the range. (Use $g = 9.8$ m s$^{-2}$.)",
      solution: `**Initial components:** $u_x = 20\\cos 30° = 17.32$ m s$^{-1}$, $u_y = 20\\sin 30° = 10$ m s$^{-1}$.

**(a) Maximum height:** $v_y = 0$
$$t = \\frac{10}{9.8} \\approx 1.020 \\text{ s}$$
$$y_{\\max} = 10(1.020) - 4.9(1.020)^2 \\approx 10.20 - 5.10 = \\mathbf{5.10 \\text{ m}}$$

**(b) Range:** Time of flight $= 2 \\times 1.020 = 2.040$ s.
$$R = 20\\cos 30° \\times 2.040 = 17.32 \\times 2.040 \\approx \\mathbf{35.3 \\text{ m}}$$`,
    },
    practice: {
      question:
        "A particle is projected **horizontally** at 15 m s$^{-1}$ from the top of a cliff 45 m high. Find: (a) the time to hit the ground, (b) the horizontal distance from the base of the cliff, (c) the speed on impact.",
      solution: `**(a) Vertical motion** (taking downward as positive, $u_y = 0$):
$$45 = \\tfrac{1}{2} \\times 9.8 \\times t^2 \\implies t^2 = \\frac{45}{4.9} \\implies t \\approx \\mathbf{3.03 \\text{ s}}$$

**(b) Horizontal distance:**
$$x = 15 \\times 3.03 \\approx \\mathbf{45.4 \\text{ m}}$$

**(c) Speed on impact:**
- $v_x = 15$ m s$^{-1}$
- $v_y = 9.8 \\times 3.03 \\approx 29.7$ m s$^{-1}$

$$\\text{Speed} = \\sqrt{15^2 + 29.7^2} = \\sqrt{225 + 882} = \\sqrt{1107} \\approx \\mathbf{33.3 \\text{ m s}^{-1}}$$`,
    },
  },
];
