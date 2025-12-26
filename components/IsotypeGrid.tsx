
import React from 'react';
import { IconStyle } from '../types';

interface IsotypeGridProps {
  count: number;
  style: IconStyle;
  color: string;
}

const EMOJI_MAP: Record<string, string> = {
  [IconStyle.SMILEY]: '😊',
  [IconStyle.THUMBSUP]: '👍',
  [IconStyle.MAN]: '👨',
  [IconStyle.WOMAN]: '👩',
  [IconStyle.PERSON]: '👤',
  [IconStyle.HEART]: '❤️',
  [IconStyle.STAR]: '⭐',
  [IconStyle.BOLT]: '⚡',
  [IconStyle.BUILDING]: '🏢',
  [IconStyle.IDEA]: '💡',
};

const IsotypeGrid: React.FC<IsotypeGridProps> = ({ count, style, color }) => {
  const items = Array.from({ length: Math.min(count, 100) }, (_, i) => i);
  const isEmoji = !!EMOJI_MAP[style];

  const getClipPath = (s: IconStyle) => {
    switch (s) {
      case IconStyle.DIAMOND: return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      case IconStyle.HEXAGON: return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      case IconStyle.TRIANGLE: return 'polygon(50% 0%, 0% 100%, 100% 100%)';
      default: return 'none';
    }
  };

  return (
    <div className="flex flex-wrap gap-x-1.5 gap-y-3 justify-center md:justify-start">
      {/* Visual grouping of 10s for better readability in data visualization */}
      {Array.from({ length: 10 }).map((_, groupIdx) => {
        const groupItems = items.slice(groupIdx * 10, (groupIdx + 1) * 10);
        if (groupItems.length === 0) return null;
        
        return (
          <div key={groupIdx} className="flex gap-1.5 bg-slate-50/50 p-2 rounded-sm border border-slate-100/50 items-center justify-center min-h-[32px]">
            {groupItems.map((i) => (
              isEmoji ? (
                <span
                  key={i}
                  className="text-base md:text-lg select-none leading-none"
                  style={{
                    animation: `markerFadeIn 0.3s ease-out forwards`,
                    animationDelay: `${i * 10}ms`,
                    opacity: 0,
                  }}
                >
                  {EMOJI_MAP[style]}
                </span>
              ) : (
                <div
                  key={i}
                  className="w-3 h-3 md:w-4 md:h-4 transition-all shrink-0"
                  style={{ 
                    backgroundColor: color,
                    borderRadius: style === IconStyle.CIRCLE ? '50%' : style === IconStyle.SQUARE ? '1px' : '0',
                    clipPath: getClipPath(style),
                    animation: `markerFadeIn 0.3s ease-out forwards`,
                    animationDelay: `${i * 10}ms`,
                    opacity: 0
                  }}
                />
              )
            ))}
          </div>
        );
      })}
      <style>{`
        @keyframes markerFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default IsotypeGrid;
