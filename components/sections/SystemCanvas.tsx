export default function SystemCanvas() {
  return (
    <figure aria-label="Illustrative AI systems architecture" className="system-canvas relative isolate overflow-hidden rounded-[1.35rem] border border-[#343046] bg-[#15131f] text-[#f4f1ff] shadow-[0_30px_80px_-45px_rgba(34,18,72,0.7)]">
      <div aria-hidden="true" className="system-canvas-grid absolute inset-0" />
      <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#71569d]" />
            <span className="h-2 w-2 rounded-full bg-[#5a527a]" />
            <span className="h-2 w-2 rounded-full bg-[#4a485e]" />
          </span>
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.19em] text-[#ddd5f5]">System architecture</span>
        </div>
        <span className="text-[0.6rem] uppercase tracking-[0.12em] text-[#aea4c7]">Concept / 01</span>
      </div>

      <div className="relative px-4 pb-2 pt-7 sm:px-7 sm:pt-9">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.17em] text-[#b8a8ec]">Intent to dependable action</p>
        <p className="mt-2 max-w-[24ch] text-xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-2xl">AI connected to the systems that matter.</p>

        <ol aria-label="Workflow from input to authorized action" className="system-canvas-mobile mt-6 grid grid-cols-2 gap-2.5 sm:hidden">
          <li className="rounded-lg border border-[#5d5576] bg-[#28233a] p-3.5">
            <span className="block text-[0.61rem] font-bold tracking-[0.12em] text-[#c4adef]">01 / INPUT</span>
            <strong className="mt-3 block text-sm font-semibold">User intent</strong>
            <span className="mt-1 block text-xs text-[#c4bcd3]">Request or event</span>
          </li>
          <li className="rounded-lg border border-[#8d72c8] bg-[#34264d] p-3.5">
            <span className="block text-[0.61rem] font-bold tracking-[0.12em] text-[#d5beff]">02 / AI</span>
            <strong className="mt-3 block text-sm font-semibold">Reasoning</strong>
            <span className="mt-1 block text-xs text-[#d4cbe3]">Interpretation</span>
          </li>
          <li className="rounded-lg border border-[#668c90] bg-[#242d35] p-3.5">
            <span className="block text-[0.61rem] font-bold tracking-[0.12em] text-[#b1d9d3]">03 / DATA</span>
            <strong className="mt-3 block text-sm font-semibold">Validation</strong>
            <span className="mt-1 block text-xs text-[#c6d6d6]">Rules &amp; records</span>
          </li>
          <li className="rounded-lg border border-[#a18bd2] bg-[#28233a] p-3.5">
            <span className="block text-[0.61rem] font-bold tracking-[0.12em] text-[#d5beff]">04 / ACTION</span>
            <strong className="mt-3 block text-sm font-semibold">Operations</strong>
            <span className="mt-1 block text-xs text-[#c4bcd3]">Controlled outcome</span>
          </li>
          <li className="col-span-2 mt-2 list-none text-center text-[0.64rem] uppercase tracking-[0.1em] text-[#b1a6c8]">Observe / Retry / Audit</li>
        </ol>
        <svg viewBox="0 0 540 362" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="systems-map-title systems-map-description" className="mt-4 hidden h-auto w-full sm:block">
          <title id="systems-map-title">Illustrative AI systems workflow</title>
          <desc id="systems-map-description">A customer or staff request enters a reasoning step, passes through validation and business data, then reaches an authorized business action. This is conceptual, not a screenshot or production metric.</desc>
          <defs>
            <linearGradient id="flow-line" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#7c6cd2" />
              <stop offset="1" stopColor="#b49af8" />
            </linearGradient>
            <linearGradient id="flow-node" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#28223d" />
              <stop offset="1" stopColor="#201d30" />
            </linearGradient>
          </defs>

          <g fill="none" stroke="url(#flow-line)" strokeWidth="2" strokeLinecap="round">
            <path d="M155 185 H180 Q193 185 193 171 V116 Q193 100 209 100 H219" />
            <path d="M155 185 H180 Q193 185 193 201 V264 Q193 280 209 280 H219" />
            <path d="M338 100 H351 Q366 100 366 116 V171 Q366 185 381 185 H388" />
            <path d="M338 280 H351 Q366 280 366 264 V201 Q366 185 381 185 H388" />
            <path d="M278 145 V235" strokeDasharray="4 8" stroke="#72648f" />
          </g>

          <g fill="#b8a0ff">
            <circle cx="193" cy="185" r="4.5" />
            <circle cx="366" cy="185" r="4.5" />
            <circle cx="278" cy="190" r="5.5" stroke="#28223d" strokeWidth="3" />
          </g>

          <g>
            <rect x="15" y="141" width="140" height="90" rx="13" fill="url(#flow-node)" stroke="#5d5576" />
            <text x="30" y="166" fontSize="10" letterSpacing="1.6" fontWeight="700" fill="#b29ce9">01 / INPUT</text>
            <text x="30" y="192" fontSize="16" fontWeight="600" fill="#ffffff">User intent</text>
            <text x="30" y="211" fontSize="11" fill="#beb5d2">Request or event</text>
          </g>
          <g>
            <rect x="219" y="54" width="119" height="91" rx="13" fill="#34264d" stroke="#8d72c8" />
            <text x="234" y="79" fontSize="10" letterSpacing="1.6" fontWeight="700" fill="#ceb2ff">02 / AI</text>
            <text x="234" y="106" fontSize="16" fontWeight="600" fill="#ffffff">Reasoning</text>
            <text x="234" y="125" fontSize="11" fill="#d2c8e3">Interpretation</text>
          </g>
          <g>
            <rect x="219" y="235" width="119" height="91" rx="13" fill="#242d35" stroke="#668c90" />
            <text x="234" y="260" fontSize="10" letterSpacing="1.6" fontWeight="700" fill="#a6d5cf">03 / DATA</text>
            <text x="234" y="287" fontSize="16" fontWeight="600" fill="#ffffff">Validation</text>
            <text x="234" y="306" fontSize="11" fill="#c0d0d2">Rules & records</text>
          </g>
          <g>
            <rect x="388" y="141" width="137" height="90" rx="13" fill="url(#flow-node)" stroke="#a18bd2" />
            <text x="403" y="166" fontSize="10" letterSpacing="1.6" fontWeight="700" fill="#ceb2ff">04 / ACTION</text>
            <text x="403" y="192" fontSize="16" fontWeight="600" fill="#ffffff">Operations</text>
            <text x="403" y="211" fontSize="11" fill="#beb5d2">Controlled outcome</text>
          </g>

          <g>
            <rect x="192" y="345" width="175" height="1" fill="#5b526d" />
            <text x="279" y="338" textAnchor="middle" fontSize="10" letterSpacing="1" fill="#aaa0c1">OBSERVE · RETRY · AUDIT</text>
          </g>
        </svg>
      </div>

      <div className="relative grid grid-cols-3 gap-px border-t border-white/10 bg-white/10">
        <div className="bg-[#191622] px-4 py-4 sm:px-6">
          <span className="block text-[0.6rem] font-semibold tracking-[0.15em] text-[#a99cc7]">CONNECT</span>
          <span className="mt-1.5 block text-sm font-semibold">APIs</span>
        </div>
        <div className="bg-[#191622] px-4 py-4 sm:px-6">
          <span className="block text-[0.6rem] font-semibold tracking-[0.15em] text-[#a99cc7]">PROTECT</span>
          <span className="mt-1.5 block text-sm font-semibold">Data</span>
        </div>
        <div className="bg-[#191622] px-4 py-4 sm:px-6">
          <span className="block text-[0.6rem] font-semibold tracking-[0.15em] text-[#a99cc7]">OPERATE</span>
          <span className="mt-1.5 block text-sm font-semibold">Reliability</span>
        </div>
      </div>
      <figcaption className="sr-only">Conceptual architecture illustration. It is not a real client dashboard or a claim of current system performance.</figcaption>
    </figure>
  );
}
