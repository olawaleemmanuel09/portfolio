/** The scrub highlights this statement word by word; readable HTML remains without JS. */
const parts = [
  "A useful", "system", "doesn’t", "just", "reply.", "It", "preserves",
  "context,", "gives", "people", "control", "and", "keeps", "work", "moving."
];

export default function Manifesto() {
  return (
    <section className="cinematic-manifesto" aria-labelledby="cinematic-manifesto-title">
      <div className="studio-container cinematic-manifesto-inner">
        <div className="cinematic-manifesto-rail">
          <span>01 / THE PRINCIPLE</span>
          <span>FROM CONVERSATION TO OPERATIONS</span>
        </div>
        <h2 id="cinematic-manifesto-title" className="cinematic-manifesto-words">
          {parts.map((part, i) => (
            <span key={i} className="cinematic-word">{part}{" "}</span>
          ))}
        </h2>
        <div className="cinematic-manifesto-end">
          <span>THE TECHNOLOGY IS ONLY USEFUL WHEN THE BUSINESS CAN ACT ON IT.</span>
          <span aria-hidden="true">↘</span>
        </div>
      </div>
    </section>
  );
}
