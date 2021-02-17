import React from 'react';
import './PillGraph.css';

interface PillGraphProps {
  bullish: number;
  bearish: number;
}

export const PillGraph = ({ bullish, bearish }: PillGraphProps) => {
  return (
    <div id="pill-graph-wrapper">
      <div id ="pill-graph-left-outer">
        bearish
        <div id="pill-graph-left" style={{ width: `${bearish * 100}%` }}></div>
      </div>
      <div id="pill-graph-right-outer">
        <div id="pill-graph-right" style={{ width: `${bullish * 100}%` }}></div>
        bullish
      </div>
    </div>
  )
}