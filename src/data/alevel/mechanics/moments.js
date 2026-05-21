export const CHAPTER_META = {
  id: "alevel-moments",
  title: "Moments",
  subtitle: "Turning effects of forces, equilibrium and tilting conditions",
  icon: "↻",
  color: "#f59e0b",
  year: "2",
  paper: "A-Level Applied",
  videoUrl: null,
};

export const CHAPTER_TOPICS = [
  {
    id: "moments-equilibrium",
    icon: "↻",
    title: "Moments & Equilibrium",
    subtitle: "Turning effect of a force, equilibrium conditions",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `The **moment** of a force about a point is a measure of its turning effect:
$$\\text{Moment} = F \\times d$$
where $d$ is the **perpendicular distance** from the pivot to the line of action of the force. Units: **Nm**.

By convention, anticlockwise moments are taken as positive and clockwise moments as negative (or you may label them explicitly).

**Conditions for equilibrium of a rigid body:**
1. The vector sum of all forces is zero: $\\sum \\mathbf{F} = \\mathbf{0}$ (resolve both horizontally and vertically).
2. The sum of all moments about **any** chosen point is zero: $\\sum M = 0$.

**Strategy for taking moments:** Choose a point through which one or more unknown forces act — those forces produce zero moment about that point and are eliminated from the equation, simplifying the algebra.

**Centre of mass:**
- A uniform rod has its centre of mass at its midpoint.
- A non-uniform rod has its centre of mass at an unknown position, which can be found using the moments equation.`,
    formulas: [
      "\\text{Moment} = F \\times d \\quad (\\text{perpendicular distance})",
      "\\sum F = 0 \\quad \\text{and} \\quad \\sum M = 0 \\quad (\\text{equilibrium})",
    ],
    example: {
      question:
        "A uniform rod $AB$ has length 4 m and mass 10 kg. It is supported at $A$ and $B$. A load of 20 N acts 1 m from $A$. Find the reactions at $A$ and $B$. (Take $g = 9.8$ m s$^{-2}$.)",
      solution: `Let $R_A$ and $R_B$ be the reactions at $A$ and $B$ respectively.

**Take moments about $A$** (eliminates $R_A$):
$$R_B \\times 4 = 20 \\times 1 + 10g \\times 2$$
$$4R_B = 20 + 196 = 216$$
$$R_B = 54 \\text{ N}$$

**Resolve vertically:**
$$R_A + R_B = 10g + 20 = 98 + 20 = 118 \\text{ N}$$
$$R_A = 118 - 54 = \\mathbf{64 \\text{ N}}$$`,
    },
    practice: {
      question:
        "A non-uniform plank $AB$ is 6 m long and has mass 30 kg. It is supported at $A$ and at point $C$, which is 4 m from $A$. The reaction at $A$ is 80 N. Find (a) the reaction at $C$, and (b) the distance of the centre of mass from $A$.",
      solution: `**(a) Resolve vertically:**
$$R_A + R_C = 30g = 294 \\text{ N}$$
$$R_C = 294 - 80 = \\mathbf{214 \\text{ N}}$$

**(b) Take moments about $A$** (let $d$ = distance of centre of mass from $A$):
$$R_C \\times 4 = 30g \\times d$$
$$214 \\times 4 = 294d$$
$$d = \\frac{856}{294} \\approx \\mathbf{2.91 \\text{ m from } A}$$`,
    },
  },
  {
    id: "tilting",
    icon: "↻",
    title: "Tilting & Non-Uniform Bodies",
    subtitle: "Finding centre of mass, point of tilting",
    color: "#f59e0b",
    visualization: null,
    videoUrl: null,
    desmosNote: "",
    desmosExpressions: [],
    theory: `**Tilting** occurs when an object is about to rotate about one of its supports. At the **point of tilting** about support $P$:
- The object is on the verge of leaving the other support $Q$.
- The reaction at $Q$ becomes zero: $R_Q = 0$.

**Method:**
1. Identify which support the object is tilting about (the pivot).
2. Set the reaction at the other support equal to zero.
3. Take moments about the pivot point — this gives the limiting condition.

**Non-uniform beams:** The weight $W = mg$ acts at the centre of mass, whose position is unknown. Two independent equations (resolving vertically and taking moments) are needed to find both the unknown reaction and the position of the centre of mass.

**Loaded beams:** Adding a load near one end reduces the reaction at the opposite support. The maximum load before tilting is found by setting that reaction to zero.`,
    formulas: [
      "\\text{On point of tilting about } P: \\quad R_Q = 0",
      "\\text{Take moments about } P \\text{ to find remaining unknowns}",
    ],
    example: {
      question:
        "A uniform plank $AB$ is 5 m long and has mass 20 kg. It rests on supports at $C$ (1 m from $A$) and $D$ (4 m from $A$). Find the maximum load $P$ (in newtons) that can be placed at $B$ without the plank tilting about $D$.",
      solution: `On the point of tilting about $D$, the reaction at $C$ becomes zero: $R_C = 0$.

The centre of mass of the uniform plank is at 2.5 m from $A$, which is $4 - 2.5 = 1.5$ m to the left of $D$.

$B$ is $5 - 4 = 1$ m to the right of $D$.

**Take moments about $D$** (anticlockwise positive):
$$20g \\times 1.5 = P \\times 1$$
$$P = 20 \\times 9.8 \\times 1.5 = \\mathbf{294 \\text{ N}}$$`,
    },
    practice: {
      question:
        "A uniform plank 5 m long, mass 20 kg, rests on two supports at 1 m and 4 m from one end $A$. Find the maximum load $P$ that can be placed at the far end $B$ (5 m from $A$) without the plank tilting.",
      solution: `On the point of tilting about the support at 4 m from $A$: the reaction at the support at 1 m from $A$ becomes zero.

Centre of mass of plank is at 2.5 m from $A$, which is $4 - 2.5 = 1.5$ m to the left of the 4 m support.

End $B$ is $5 - 4 = 1$ m to the right of the 4 m support.

**Take moments about the 4 m support:**
$$20g \\times 1.5 = P \\times 1$$
$$P = 294 \\text{ N}$$

The maximum load that can be placed at $B$ is $\\mathbf{294 \\text{ N}}$.`,
    },
  },
];
