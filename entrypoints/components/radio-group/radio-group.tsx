import { ThemeMode } from '@/types/theme.interface';
import RadioGroupOptions from './types/radion-group-options.interface';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';

export default function RadioGroup({
  value,
  onChange,
  options,
  rippleMode,
}: {
  value: string;
  onChange: (value: ThemeMode) => void;
  options: RadioGroupOptions[];
  rippleMode: 'dark' | 'light';
}) {
  return (
    <div className="flex justify-center gap-4">
      {options.map((option) => (
        <RippleButton
          key={option.value}
          mode={rippleMode}
          isState={true}
          onClick={() => onChange(option.value)}
          role="radio"
          aria-checked={value === option.value}
          className={`
            px-4 py-2 rounded-xl
            border transition-all duration-200
            ${
              value === option.value
                ? 'bg-primary text-primary-title border-border shadow-md'
                : 'bg-surface-container/30 hover:bg-surface-container-hover/30 border-border/20 cursor-pointer'
            }
          `}
        >
          {option.label}
        </RippleButton>
      ))}
    </div>
  );
}
