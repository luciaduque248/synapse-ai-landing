export function NeuralBrain() {
  const nodes = [
    [88, 72], [132, 50], [180, 62], [220, 44], [260, 72], [300, 58], [344, 86],
    [70, 118], [116, 108], [160, 122], [205, 102], [252, 120], [296, 106], [356, 126],
    [82, 168], [128, 158], [176, 174], [224, 154], [270, 170], [318, 158], [350, 194],
    [112, 216], [158, 204], [204, 220], [250, 206], [294, 220], [324, 250],
  ];
  const links = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[0,7],[1,8],[2,9],[3,10],[4,11],[5,12],[6,13],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[7,14],[8,15],[9,16],[10,17],[11,18],[12,19],[13,20],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[14,21],[15,22],[16,23],[17,24],[18,25],[19,26],[21,22],[22,23],[23,24],[24,25],[25,26],[8,16],[10,18],[12,20],[16,22],[18,24]];

  return (
    <div className="brain-visual" aria-label="Representación conceptual de SYNAPSE conectando contexto con decisiones y acciones">
      <div className="brain-orbit brain-orbit-a" />
      <div className="brain-orbit brain-orbit-b" />
      <svg className="brain-svg" viewBox="0 0 430 320" role="img" aria-label="Red neuronal conceptual">
        <defs>
          <linearGradient id="brainStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#15c8ff" />
            <stop offset="55%" stopColor="#6e70ff" />
            <stop offset="100%" stopColor="#ef4cff" />
          </linearGradient>
          <radialGradient id="brainGlow">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#68d9ff" />
            <stop offset="100%" stopColor="#785dff" />
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3.5" result="blur" /><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path className="brain-outline" d="M82 118C72 78 103 45 143 47c17-25 58-29 80-6 25-19 67-4 72 25 39-1 69 34 57 72 28 17 35 57 12 83-12 14-28 22-45 23-8 35-42 55-75 43-20 24-59 28-83 8-28 12-61-3-70-33-35-3-58-38-42-69-18-29-4-65 33-75Z" />
        {links.map(([a,b], index) => (
          <line key={index} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="brain-link" />
        ))}
        {nodes.map(([x,y], index) => (
          <g key={index} filter={index % 4 === 0 ? "url(#glow)" : undefined}>
            <circle cx={x} cy={y} r={index % 5 === 0 ? 5 : 3.2} className="brain-node" />
          </g>
        ))}
      </svg>
      <div className="brain-tag brain-tag--meetings"><span>INPUT</span><strong>Meetings</strong></div>
      <div className="brain-tag brain-tag--chat"><span>INPUT</span><strong>Chat + notes</strong></div>
      <div className="brain-tag brain-tag--decision"><span>OUTPUT</span><strong>Decisions</strong></div>
      <div className="brain-tag brain-tag--actions"><span>OUTPUT</span><strong>Tasks + owners</strong></div>
      <div className="brain-core-label"><span>SYNAPSE CORE</span><strong>Context → execution</strong></div>
    </div>
  );
}
