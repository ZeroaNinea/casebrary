import { useState } from 'react';
import { X, Check } from 'lucide-react';

import RippleButton from '../buttons/ripple-button';

export default function SlideToggle({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  // const [value, onChange] = useState(false);

  return (
    <div className="flex items-center gap-3.5 my-2 text-left">
      <RippleButton
        mode="dark"
        onClick={() => onChange(!value)}
        className={`
          relative
          w-11
          h-6.5
          rounded-full
          cursor-pointer
          transition-colors duration-200
          shadow-inner
          ${value ? 'bg-primary' : 'bg-surface-container/60 border border-border/10'}
        `}
      >
        <div
          className={`
            absolute
            top-[3px]
            left-[3px]
            w-4.5
            h-4.5
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-sm
            transition-transform duration-200
            ${value ? 'translate-x-[18px]' : ''}
          `}
        >
          {value ? (
            <Check size={10} className="text-primary" />
          ) : (
            <X size={10} className="text-text-muted" />
          )}
        </div>
      </RippleButton>
      {label && (
        <span
          onClick={() => onChange(!value)}
          className="text-sm font-semibold text-text cursor-pointer select-none px-1.5"
        >
          {label}
        </span>
      )}
    </div>
  );
}
