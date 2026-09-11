/**
 * Splits a headline into lines that rise out from behind their own mask.
 * Line breaks are authored, not left to the browser, so the rhythm holds
 * at every width the design was checked at.
 */
export default function MaskLines({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <span className={className}>
      {lines.map((line) => (
        <span className="mask" key={line}>
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}
