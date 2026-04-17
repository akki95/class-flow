const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
const db = admin.firestore();

// Correct topic names and order per chapter
const chapterFix = {
  algebra_and_functions: [
    'Indices & Surds',
    'Quadratics',
    'Simultaneous Equations',
    'Inequalities',
    'Polynomials',
    'Graphs of Functions',
    'Transformations of Functions',
    'Modelling with Functions'
  ],
  cordinate: [
    'Equation of a Straight Line',
    'Circles'
  ],
  proof: ['Proof'],
  trigonometry: [
    'Basic Trigonometry',
    'Trigonometric Functions & Graphs',
    'Trigonometric Equations'
  ],
  differentiation: [
    'Introduction to Differentiation',
    'Differentiating Powers of x',
    'Gradients, Tangents & Normals',
    'Increasing & Decreasing Functions',
    'Stationary Points & Turning Points',
    'Determining the Nature of Stationary Points',
    'Second Order Derivatives',
    'Sketching Gradient Functions',
    'Modelling with Differentiation',
    'Applications of Derivatives'
  ],
  integration: ['Introduction to Integration'],
  vectors: ['Vectors in 2D'],
  statistics: [
    'Statistical Sampling & Data Collection',
    'Data Presentation & Interpretation',
    'Large Data Set',
    'Probability Distributions',
    'Binomial Distribution',
    'Correlation & Regression',
    'Hypothesis Testing',
    'Hypothesis Testing for Binomial',
    'Working with Data'
  ],
  mechanics: [
    'Quantities, Units & Modelling',
    'Constant Acceleration in 1D',
    'Variable Acceleration in 1D',
    'Graphs in Kinematics',
    'Forces & Equilibrium',
    "Newton's Second Law",
    'Vectors in Mechanics'
  ],
  probability: ['Probability']
};

async function fixAndReorder() {
  for (const [chapterId, newNames] of Object.entries(chapterFix)) {
    const snap = await db.collection('curricula').doc('igcse')
      .collection('chapters').doc(chapterId).get();
    if (snap.exists === false) { console.log('Skip:', chapterId); continue; }

    const topics = snap.data().topics || [];

    // Rename topics in order — match by index since order is already set
    const fixed = topics.map((topic, i) => ({
      ...topic,
      topicName: newNames[i] || topic.topicName
    }));

    console.log('\n' + chapterId.toUpperCase() + ':');
    fixed.forEach((t, i) => console.log('  ' + (i+1) + '. ' + t.topicName));

    await db.collection('curricula').doc('igcse')
      .collection('chapters').doc(chapterId)
      .update({ topics: fixed, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
    console.log('  ✅ Fixed');
  }
  console.log('\nAll topic names fixed!');
  process.exit(0);
}

fixAndReorder().catch(console.error);