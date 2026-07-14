import { useState } from 'react';
import chroma from 'chroma-js';

import ColorInputProps from './types/color-input-props.interface';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';
import { HexColorPicker } from 'react-colorful';

export default function ColorInput({
  isOptionsPage = false,
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

  function getRippleMode() {
    return chroma.contrast(value || '', '#fff') > 4.5 ? 'light' : 'dark';
  }

  return (
    <div className="flex flex-col gap-1.5 w-full my-2 text-left">
      {label && (
        <label className="text-xs font-semibold text-text-muted px-1.5">
          {label}
        </label>
      )}
      <div
        className="
          flex items-center gap-2.5
          bg-surface-container/30 hover:bg-surface-container/50
          border border-border/20 focus-within:border-accent/80
          focus-within:ring-2 focus-within:ring-accent/15
          px-3.5 py-2
          rounded-2xl
          shadow-xs focus-within:shadow-sm
          transition-all duration-200 ease-out
          h-12
        "
      >
        <input
          className="
            flex-1
            bg-transparent
            outline-none
            text-text text-sm
            peer
          "
          type="text"
          value={currentValue}
          onChange={(e) => update(e.target.value)}
        />
        <RippleButton
          className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer"
          mode={getRippleMode()}
          onClick={() => setShowPicker((v) => !v)}
        >
          <div
            className="w-full h-full rounded-lg border border-border/30 hover:scale-105 active:scale-95 transition-transform"
            style={{ backgroundColor: currentValue }}
          />
        </RippleButton>
      </div>

      {showPicker && (
        <div className="mt-3.5 flex p-3.5 bg-surface-container/20 border border-border/10 rounded-2xl shadow-md">
          <div className="rounded-xl overflow-hidden shadow-xs border border-border/10">
            <HexColorPicker color={currentValue} onChange={update} />
          </div>
          <div
            className={`flex flex-wrap gap-2.5 items-center h-24 ${isOptionsPage ? 'pl-2 w-18' : 'pl-3.5 w-30'}`}
          >
            {presets.map((color) => (
              <RippleButton
                key={color}
                onClick={() => update(color)}
                className="
                  w-6
                  h-6
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:scale-110 active:scale-95
                  transition-transform
                "
              >
                <div
                  className="
                    w-4.5
                    h-4.5
                    rounded-full
                    border
                    border-border/30
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
    </div>
  );
}
