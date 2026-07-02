import { useRef, useState } from 'react';
import ColorInputProps from './types/color-input-props.interface';
import './style.css';

export default function ColorInput({
  label = 'Color',
  value,
  onChange,
}: ColorInputProps) {
  const [internalValue, setInternalValue] = useState('#4FC3F7');
  const rippleRef = useRef<HTMLSpanElement>(null);

  const currentValue = value ?? internalValue;

  function update(value: string) {
    if (onChange) {
      onChange(value);
    } else {
      setInternalValue(value);
    }
  }

  function createRipple(event: React.MouseEvent<HTMLDivElement>) {
    const ripple = rippleRef.current;
    if (!ripple) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);

    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

    ripple.classList.remove('active');

    requestAnimationFrame(() => {
      ripple.classList.add('active');
    });
  }

  return (
    <div
      className="
        relative
        border-b border-border
        focus-within:border-accent
        transition-colors duration-200
      "
    >
      <span
        className="
          absolute
          left-2
          top-2
          h-5
          bg-bg
          transition-all
          duration-200
          pointer-events-none
          peer-focus:hidden
        "
      />

      <label
        className="
          absolute
          left-2
          top-2
          px-1
          bg-bg
          transition-all
          duration-200
          pointer-events-none
          peer-focus:-top-3
          peer-focus:left-1
          peer-focus:scale-80
          peer-focus:text-accent
        "
      >
        {label}
      </label>

      <div className="flex items-center gap-2 pt-5 pb-1">
        <input
          className="
            flex-1
            bg-transparent
            outline-none
            text-text
            peer
          "
          value={currentValue}
          onChange={(e) => update(e.target.value)}
        />

        <div
          className="
            relative
            w-8
            h-8
            rounded-lg
            overflow-hidden
            cursor-pointer
        "
          onClick={createRipple}
        >
          <input
            type="color"
            value={currentValue}
            onChange={(e) => update(e.target.value)}
            className="absolute inset-0 w-full h-full cursor-pointer"
          />

          <span ref={rippleRef} className="ripple" />

          <div
            className="
              absolute
              inset-0
              pointer-events-none
              opacity-0
              hover:opacity-100
              transition-opacity
            "
            style={{
              background: `color-mix(in oklab, ${currentValue} 85%, black 15%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
