import { ThemeMode } from '@/types/theme.interface';
import RadioGroupOptions from './types/radion-group-options.interface';

export default function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: ThemeMode) => void;
  options: RadioGroupOptions[];
}) {
  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            value={option.value}
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}
