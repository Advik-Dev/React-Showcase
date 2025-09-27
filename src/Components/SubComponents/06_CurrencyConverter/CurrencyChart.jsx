import React, { useState, useRef } from "react";
import { useColor } from "../../../context/ColorContext/ColorContext";
import useCurrencyRates from "../../../hooks/Currency/useCurrencyRates";

const CurrencyChart = ({ className, from, to, width, height }) => {
  const { palette } = useColor();

  const [selectedPeriod, setSelectedPeriod] = useState("1M");
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  // Fetch raw data
  const rawData = useCurrencyRates(from, to, selectedPeriod) || [];

  // Map data to { x, y, date }
  const data = rawData.map((item, index) => ({
    x: index,
    y: item.rate, // used for chart scaling
    date: item.date,
    rateOriginal: item.rate, // keep original for tooltip
  }));

  const periods = ["10D", "1M", "1Y"];

  // Chart dimensions
  const margin = { top: 10, bottom: 40, left: 10, right: 10 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Scale functions
  const xScale = (x) =>
    data.length > 1 ? (x / (data.length - 1)) * chartWidth : 0;
  const yMin = data.length ? Math.min(...data.map((d) => d.y)) * 0.98 : 0;
  const yMax = data.length ? Math.max(...data.map((d) => d.y)) * 1.02 : 1;
  const yScale = (y) =>
    chartHeight - ((y - yMin) / (yMax - yMin)) * chartHeight;

  // Generate path for the line
  const generatePath = () => {
    return data
      .map((point, index) => {
        const x = xScale(point.x);
        const y = yScale(point.y);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  // Generate area path for gradient fill
  const generateAreaPath = () => {
    const linePath = data
      .map((point) => {
        const x = xScale(point.x);
        const y = yScale(point.y);
        return `${x},${y}`;
      })
      .join(" L");

    return `M0,${chartHeight} L${linePath} L${chartWidth},${chartHeight} Z`;
  };

  // Handle mouse events
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - margin.left;

    if (x >= 0 && x <= chartWidth) {
      const dataIndex = Math.round((x / chartWidth) * (data.length - 1));
      if (dataIndex >= 0 && dataIndex < data.length) {
        setHoverData({
          ...data[dataIndex],
          x: xScale(dataIndex) + margin.left,
          y: yScale(data[dataIndex].y) + margin.top,
        });
      }
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div
      className={`rounded-lg font-mono ${className}`}
      style={{
        height: height + "px",
        width: width + "px",
        backgroundColor: palette.bgshade3,
        color: palette.shade0,
      }}
    >
      {/* Time period selector */}
      <div className="flex justify-center mb-2">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-3 py-1 text-sm rounded mr-2 ${
              selectedPeriod === period ? "text-white" : "hover:opacity-80"
            }`}
            style={{
              backgroundColor:
                selectedPeriod === period ? palette.shade2 : palette.bgshade2,
              color:
                selectedPeriod === period ? palette.bgshade0 : palette.shade1,
            }}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Chart container */}
      <div className="relative">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="overflow-visible"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={palette.shade1} />
              <stop offset="100%" stopColor={palette.shade2} />
            </linearGradient>

            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={palette.shade1} stopOpacity="0.3" />
              <stop
                offset="100%"
                stopColor={palette.shade1}
                stopOpacity="0.05"
              />
            </linearGradient>
          </defs>

          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {/* Grid lines */}
            {[0.01, 0.015, 0.02, 0.025].map((value) => (
              <line
                key={value}
                x1="0"
                y1={yScale(value)}
                x2={chartWidth}
                y2={yScale(value)}
                stroke={palette.bgshade1}
                strokeWidth="1"
                opacity="0.3"
              />
            ))}

            {/* Area fill */}
            <path d={generateAreaPath()} fill="url(#areaGradient)" />

            {/* Main line */}
            <path
              d={generatePath()}
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
            />

            {/* Hover indicator */}
            {hoverData && (
              <g>
                <line
                  x1={hoverData.x - margin.left}
                  y1="0"
                  x2={hoverData.x - margin.left}
                  y2={chartHeight}
                  stroke={palette.shade2}
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                <circle
                  cx={hoverData.x - margin.left}
                  cy={hoverData.y - margin.top}
                  r="4"
                  fill={palette.shade4}
                  stroke={palette.bgshade0}
                  strokeWidth="2"
                />
              </g>
            )}
          </g>
        </svg>

        {/* Hover tooltip */}
        {hoverData && (
          <div
            className="absolute border rounded px-2 py-1 text-sm pointer-events-none z-10"
            style={{
              backgroundColor: palette.bgshade0,
              borderColor: palette.bgshade1,
              color: palette.shade4,
              left: hoverData.x + 10,
              top: hoverData.y - 10,
              transform:
                hoverData.x > width - 100 ? "translateX(-100%)" : "none",
            }}
          >
            <div className="font-bold">{hoverData.rateOriginal.toFixed(2)}</div>
            <div className="text-xs" style={{ color: palette.shade3 }}>
              {hoverData.date}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyChart;
