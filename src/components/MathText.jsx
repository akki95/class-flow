import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Fix common Gemini LaTeX output issues
function fixLatex(str) {
  if (!str) return str;
  return str
    // Fix missing backslashes on common commands
    .replace(/(?<!\\)\bfrac\b/g, '\\frac')
    .replace(/(?<!\\)\bsqrt\b/g, '\\sqrt')
    .replace(/(?<!\\)\bsum\b(?=\s*[_{^])/g, '\\sum')
    .replace(/(?<!\\)\bint\b(?=\s*[_{^])/g, '\\int')
    .replace(/(?<!\\)\blim\b/g, '\\lim')
    .replace(/(?<!\\)\bsin\b/g, '\\sin')
    .replace(/(?<!\\)\bcos\b/g, '\\cos')
    .replace(/(?<!\\)\btan\b/g, '\\tan')
    .replace(/(?<!\\)\btheta\b/g, '\\theta')
    .replace(/(?<!\\)\balpha\b/g, '\\alpha')
    .replace(/(?<!\\)\bbeta\b/g, '\\beta')
    .replace(/(?<!\\)\bpi\b(?![a-z])/g, '\\pi')
    .replace(/(?<!\\)\binfty\b/g, '\\infty')
    .replace(/(?<!\\)\bcdot\b/g, '\\cdot')
    .replace(/(?<!\\)\btimes\b/g, '\\times')
    .replace(/(?<!\\)\ble\b/g, '\\le')
    .replace(/(?<!\\)\bge\b/g, '\\ge')
    .replace(/(?<!\\)\bneq\b/g, '\\neq')
    .replace(/(?<!\\)\bpm\b/g, '\\pm')
    .replace(/(?<!\\)\bRightarrow\b/g, '\\Rightarrow')
    .replace(/(?<!\\)\brightarrow\b/g, '\\rightarrow')
    .replace(/(?<!\\)\bLeftarrow\b/g, '\\Leftarrow')
    .replace(/(?<!\\)\bleftarrow\b/g, '\\leftarrow')
    .replace(/(?<!\\)\bimplies\b/g, '\\implies')
    .replace(/(?<!\\)\biff\b/g, '\\iff')
    .replace(/(?<!\\)\bforall\b/g, '\\forall')
    .replace(/(?<!\\)\bexists\b/g, '\\exists')
    .replace(/(?<!\\)\bin\b(?=\s*[A-Z\\{])/g, '\\in')
    .replace(/(?<!\\)\bsubset\b/g, '\\subset')
    .replace(/(?<!\\)\bcup\b/g, '\\cup')
    .replace(/(?<!\\)\bcap\b/g, '\\cap')
    .replace(/(?<!\\)\bvec\b/g, '\\vec')
    .replace(/(?<!\\)\bhat\b/g, '\\hat')
    .replace(/(?<!\\)\bbar\b/g, '\\bar')
    .replace(/(?<!\\)\boverline\b/g, '\\overline')
    .replace(/(?<!\\)\bunderline\b/g, '\\underline')
    .replace(/(?<!\\)\btext\b/g, '\\text')
    .replace(/(?<!\\)\bmathrm\b/g, '\\mathrm')
    .replace(/(?<!\\)\bmathbf\b/g, '\\mathbf')
    .replace(/(?<!\\)\bbegin\b/g, '\\begin')
    .replace(/(?<!\\)\bend\b(?=\s*\{)/g, '\\end')
    .replace(/(?<!\\)\bleft\b(?=\s*[\[(|])/g, '\\left')
    .replace(/(?<!\\)\bright\b(?=\s*[\])|])/g, '\\right')
    .replace(/(?<!\\)\bdfrac\b/g, '\\dfrac')
    .replace(/(?<!\\)\btfrac\b/g, '\\tfrac')
    .replace(/(?<!\\)\bpartial\b/g, '\\partial')
    .replace(/(?<!\\)\bnabla\b/g, '\\nabla')
    .replace(/(?<!\\)\bdelta\b/g, '\\delta')
    .replace(/(?<!\\)\bDelta\b/g, '\\Delta')
    .replace(/(?<!\\)\blambda\b/g, '\\lambda')
    .replace(/(?<!\\)\bsigma\b/g, '\\sigma')
    .replace(/(?<!\\)\bmu\b/g, '\\mu')
    .replace(/(?<!\\)\bnu\b/g, '\\nu')
    .replace(/(?<!\\)\bgamma\b/g, '\\gamma')
    .replace(/(?<!\\)\bGamma\b/g, '\\Gamma')
    .replace(/(?<!\\)\bOmega\b/g, '\\Omega')
    .replace(/(?<!\\)\bomega\b/g, '\\omega')
    .replace(/(?<!\\)\bphi\b/g, '\\phi')
    .replace(/(?<!\\)\bPhi\b/g, '\\Phi')
    .replace(/(?<!\\)\bchi\b/g, '\\chi')
    .replace(/(?<!\\)\bpsi\b/g, '\\psi')
    .replace(/(?<!\\)\bPsi\b/g, '\\Psi')
    .replace(/(?<!\\)\bepsilon\b/g, '\\epsilon')
    .replace(/(?<!\\)\bzeta\b/g, '\\zeta')
    .replace(/(?<!\\)\beta\b/g, '\\eta')
    .replace(/(?<!\\)\biota\b/g, '\\iota')
    .replace(/(?<!\\)\bkappa\b/g, '\\kappa')
    .replace(/(?<!\\)\brho\b/g, '\\rho')
    .replace(/(?<!\\)\btau\b/g, '\\tau')
    .replace(/(?<!\\)\bxi\b/g, '\\xi')
    .replace(/(?<!\\)\bXi\b/g, '\\Xi')
    .replace(/(?<!\\)\bupsilon\b/g, '\\upsilon')
    .replace(/(?<!\\)\bLambda\b/g, '\\Lambda')
    .replace(/(?<!\\)\bSigma\b/g, '\\Sigma')
    .replace(/(?<!\\)\bTheta\b/g, '\\Theta')
    .replace(/(?<!\\)\bPi\b/g, '\\Pi');
}

function renderMath(math, display = false) {
  const fixed = fixLatex(math);
  try {
    return display
      ? <BlockMath math={fixed} />
      : <InlineMath math={fixed} />;
  } catch {
    return <span style={{ color: '#f87171', fontFamily: 'monospace', fontSize: 13 }}>{math}</span>;
  }
}

export default function MathText({ text, style = {} }) {
  if (!text) return null;

  // Split on $$...$$ (block math) first
  const blockParts = text.split(/(¿¿[\s\S]+?¿¿|\$\$[\s\S]+?\$\$)/g);

  return (
    <span style={style}>
      {blockParts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          return (
            <span key={i} style={{ display: 'block', margin: '12px 0', textAlign: 'center' }}>
              {renderMath(math, true)}
            </span>
          );
        }

        // Split on $...$ (inline math)
        const inlineParts = part.split(/(\$[^$\n]+?\$)/g);
        return (
          <span key={i}>
            {inlineParts.map((ip, j) => {
              if (ip.startsWith('$') && ip.endsWith('$') && ip.length > 2) {
                return <span key={j}>{renderMath(ip.slice(1, -1), false)}</span>;
              }
              // Plain text — preserve line breaks
              return ip.split('\n').map((line, k, arr) => (
                <span key={k}>
                  {line}
                  {k < arr.length - 1 && <br />}
                </span>
              ));
            })}
          </span>
        );
      })}
    </span>
  );
}