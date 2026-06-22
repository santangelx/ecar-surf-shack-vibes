import React from 'react';

// Numbered section eyebrow (01 / 02 …). The number encodes the home page's
// real top-to-bottom order, so it's a genuine sequence marker, not decoration.
const SectionEyebrow = ({
  number,
  label,
  labelColor = '#0E7C99',
}: {
  number: string;
  label: string;
  labelColor?: string;
}) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 'clamp(14px,2vw,22px)' }}>
    <span className="font-display" style={{ fontWeight: 700, color: '#E8623D', fontSize: 14, letterSpacing: '.2em' }}>
      {number}
    </span>
    <span className="font-display" style={{ fontWeight: 700, color: labelColor, fontSize: 14, letterSpacing: '.22em', textTransform: 'uppercase' }}>
      {label}
    </span>
  </div>
);

export default SectionEyebrow;
