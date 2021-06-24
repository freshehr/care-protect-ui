import React from 'react';
import TrendArrow from '../TrendArrow';

function SvgDenwis({ stroke, value, trend }, props) {
  const dubleNumber = value > 9;
  return (
    <div style={{ flexDirection: 'row' }}>
      <TrendArrow trend={trend || 'same'} />
      <svg
        width="32px"
        height="32px"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          stroke={stroke}
          strokeWidth={1}
          opacity="undefined"
          fill="#fff"
          d="M3 3h25v25H3z"
        />
        <text
          // fontFamily="sans-serif"
          fontSize={16}
          fontWeight="lighter"
          y={21}
          x={dubleNumber ? 6 : 10}
          opacity="undefined"
          fillOpacity="null"
          strokeOpacity="null"
          stroke={stroke}
        >
          {value}
        </text>
      </svg>
    </div>
  );
}

export default SvgDenwis;
