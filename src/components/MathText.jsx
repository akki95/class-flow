import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Parses text and renders $...$ as inline math, $$...$$ as block math
export default function MathText({ text, style = {} }) {
  if (!text) return null;

  // Split on $$...$$ first (block), then $...$ (inline)
  const blockParts = text.split(/(¿¿[\s\S]+?¿¿|\$\$[\s\S]+?\$\$)/g);

  return (
    <span style={style}>
      {blockParts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          return (
            <span key={i} style={{ display: 'block', margin: '12px 0', textAlign: 'center' }}>
              <BlockMath math={math} />
            </span>
          );
        }

        // Now handle inline math $...$
        const inlineParts = part.split(/(\$[^$]+?\$)/g);
        return (
          <span key={i}>
            {inlineParts.map((ip, j) => {
              if (ip.startsWith('$') && ip.endsWith('$') && ip.length > 2) {
                const math = ip.slice(1, -1);
                try {
                  return <InlineMath key={j} math={math} />;
                } catch {
                  return <span key={j}>{ip}</span>;
                }
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