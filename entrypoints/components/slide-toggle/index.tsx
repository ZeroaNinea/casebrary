import { useState } from 'react';
import { X, Check } from 'lucide-react';

import RippleButton from '../buttons/ripple-button';

export default function SlideToggle({ label }: { label?: string }) {
  const [value, onChange] = useState(false);

  return (
    <div className="flex items-center">
      <RippleButton
        mode="dark"
        onClick={() => onChange(!value)}
        className={`
        relative
        w-11
        h-6
        rounded-full
        transition-colors
        ${value ? 'bg-accent' : 'bg-surface-container'}
      `}
      >
        <div
          className={`
          absolute
          top-0.5
          left-0.5
          w-5
          h-5
          flex
          items-center
          justify-center
          rounded-full
          bg-primary-50
          transition-transform
          ${value ? 'translate-x-5' : ''}
        `}
        >
          {value ? (
            <Check size={14} color="var(--color-primary-title)" />
          ) : (
            <X size={14} color="var(--color-primary-title)" />
          )}
        </div>
      </RippleButton>
      {label && (
        <RippleButton
          mode="dark"
          className="border border-border px-2 m-2 rounded-md"
        >
          <span className="text-text text-sm">{label}</span>
        </RippleButton>
      )}
    </div>
  );
}
