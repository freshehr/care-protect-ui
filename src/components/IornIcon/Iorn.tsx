import React from 'react';
import TrendArrow from '../TrendArrow';

function SvgIorn({ stroke, value, trend }, props) {
  const dubleNumber = value > 9;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" {...props}>
      <defs>
        <style>
          {
            '.prefix__cls-1{fill:none;stroke:#005eb8;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px}'
          }
        </style>
      </defs>
      <title>{'06-UNIVERSAL-SYMBOLS-CONCEPTS-A-YELLO'}</title>
      <g id="prefix__Layer_2" data-name="Layer 2">
        <path
          className="prefix__cls-1"
          d="M69.12 52.09h91.5v171.62h-91.5zM95.92 33.1h37.88v18.99H95.92z"
        />
      </g>
    </svg>
  );
}

export default SvgIorn;
