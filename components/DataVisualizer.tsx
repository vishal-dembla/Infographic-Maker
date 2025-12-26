
import React from 'react';
import { IconStyle, VisualizationType } from '../types';
import IsotypeGrid from './IsotypeGrid';

interface DataVisualizerProps {
  type: VisualizationType;
  value: number;
  secondaryValue: number;
  color: string;
  iconStyle: IconStyle;
}

const DataVisualizer: React.FC<DataVisualizerProps> = ({ type, value, secondaryValue, color, iconStyle }) => {
  if (type === VisualizationType.ISOTYPE) {
    return <IsotypeGrid count={value} style={iconStyle} color={color} />;
  }

  if (type === VisualizationType.BAR) {
    return (
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Primary Metric</span>
            <span>{value}%</span>
          </div>
          <div className="h-12 w-full bg-slate-100 relative overflow-hidden">
            <div 
              className="h-full transition-all duration-1000 ease-out" 
              style={{ width: `${value}%`, backgroundColor: color }} 
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span>Comparison Segment</span>
            <span>{secondaryValue}%</span>
          </div>
          <div className="h-6 w-full bg-slate-100 relative overflow-hidden opacity-50">
            <div 
              className="h-full transition-all duration-1000 ease-out" 
              style={{ width: `${secondaryValue}%`, backgroundColor: color }} 
            />
          </div>
        </div>
      </div>
    );
  }

  if (type === VisualizationType.LINE) {
    // Generate a simple stylized path based on values
    const points = [20, 45, value - 10, value + 5, value];
    const pathData = points.map((p, i) => `${i * 25},${100 - p}`).join(' L ');
    
    return (
      <div className="w-full h-48 bg-slate-50 border border-slate-100 p-4 relative overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <path
            d={`M 0,100 L ${pathData} L 100,100`}
            fill={`${color}15`}
            className="transition-all duration-1000"
          />
          <path
            d={`M 0,100 L ${pathData}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            className="transition-all duration-1000"
          />
          {points.map((p, i) => (
            <circle 
              key={i} 
              cx={i * 25} 
              cy={100 - p} 
              r="2" 
              fill={color} 
              className="transition-all duration-1000"
            />
          ))}
        </svg>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[8px] font-bold text-slate-300 uppercase tracking-tighter">
          <span>T-Minus 12mo</span>
          <span>Present</span>
        </div>
      </div>
    );
  }

  if (type === VisualizationType.PIE) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="flex items-center justify-center py-4">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke="#f1f5f9"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={color}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="butt"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black text-slate-900 leading-none">{value}%</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Saturation</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default DataVisualizer;
