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
  const [showPicker, setShowPicker] = useState(false);

  const presets = [
    '#4FC3F7',
    '#2196F3',
    '#086CBC',
    '#4CAF50',
    '#8BC34A',
    '#FFC107',
    '#FF9800',
    '#F44336',
    '#9C27B0',
    '#795548',
    '#607D8B',
    '#929CA6',
  ];

  function update(value: string) {
    if (onChange) {
      onChange(value);
    } else {
      setInternalValue(value);
    }
  }

  return (
    <>
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
            left-0
            top-6
            h-5
            w-full
            bg-bg
            pointer-events-none
            group-focus-within:hidden
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
            className="w-8 h-8 rounded-lg overflow-hidden"
            onClick={() => setShowPicker((v) => !v)}
          >
            <div
              className="w-full h-full rounded-lg border border-border"
              style={{ backgroundColor: currentValue }}
            />
          </RippleButton>
        </div>
      </div>

      {showPicker && (
        <div className="mt-3 flex">
          <div>
            <HexColorPicker color={currentValue} onChange={update} />
          </div>
          <div className="flex flex-wrap gap-3 items-center pl-3 h-24">
            {presets.map((color) => (
              <RippleButton
                key={color}
                onClick={() => update(color)}
                className="
                  w-7
                  h-7
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    w-5
                    h-5
                    rounded-full
                    border
                    border-border
                  "
                  style={{
                    backgroundColor: color,
                  }}
                />
              </RippleButton>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
