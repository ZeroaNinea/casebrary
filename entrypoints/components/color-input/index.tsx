import { useState } from 'react';
import ColorInputProps from './types/color-input-props.interface';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';
import { HexColorPicker } from 'react-colorful';

export default function ColorInput({
  label = 'Color',
  value,
  onChange,
}: ColorInputProps) {
  const [internalValue, setInternalValue] = useState('#4FC3F7');
  const currentValue = value ?? internalValue;

  function update(value: string) {
    if (onChange) {
      onChange(value);
    } else {
      setInternalValue(value);
    }
  }

  return (
    <>
      <HexColorPicker color={currentValue} onChange={update} />
      <div
        className="
        group
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
          left-0
          top-6
          px-1
          bg-bg
          transition-all
          duration-200
          pointer-events-none
          group-focus-within:top-1
          group-focus-within:left-1
          group-focus-within:scale-80
          group-focus-within:text-accent
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
            type="text"
            value={currentValue}
            onChange={(e) => update(e.target.value)}
          />

          <RippleButton
            className="
            relative
            w-8
            h-8
            rounded-lg
            overflow-hidden
            cursor-pointer
          "
          >
            <input
              type="color"
              value={currentValue}
              onChange={(e) => update(e.target.value)}
              className="absolute inset-0 w-full h-full cursor-pointer"
            />

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
          </RippleButton>
        </div>
      </div>
    </>
  );
}
