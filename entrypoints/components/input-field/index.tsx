import { useState } from 'react';
import { Search, Type, ImageUp, X } from 'lucide-react';

import IconButton from '@/entrypoints/components/buttons/icon-button';

import InputFieldProps from './types/search-field-props.interface';

export default function InputField({
  label = 'Search',
  placeholder = 'Search...',
  value,
  icon,
  onChange,
}: InputFieldProps) {
  const [internalValue, setInternalValue] = useState('');

  const currentValue = value ?? internalValue;

  function update(value: string) {
    if (onChange) {
      onChange(value);
    } else {
      setInternalValue(value);
    }
  }

  function renderIcon(icon: InputFieldProps['icon']) {
    switch (icon) {
      case 'search':
        return <Search size={16} className="text-text-muted shrink-0" />;
      case 'type':
        return <Type size={16} className="text-text-muted shrink-0" />;
      case 'image':
        return <ImageUp size={16} className="text-text-muted shrink-0" />;
    }
  }

  return (
    <div
      className="
        relative
        flex items-center gap-2
        border-b border-border
        focus-within:border-accent
        transition-colors duration-200
        h-10
        py-1
      "
    >
      {/* <Search size={16} className="text-text-muted shrink-0" /> */}
      {icon && renderIcon(icon)}

      <input
        className="
          flex-1
          bg-transparent
          outline-none
          placeholder:text-text-muted
          text-text
          peer
        "
        id="search"
        value={currentValue}
        placeholder={placeholder}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            update('');
          }
        }}
      />

      <span
        className="
          absolute top-2 left-6 w-80 h-5 bg-bg
          pointer-events-none
          peer-focus:hidden
        "
      ></span>

      {label && (
        <label
          htmlFor="search"
          className="
            absolute top-2 left-6
            bg-bg px-2 py-0
            transition-all duration-200
            peer-focus:-top-3
            peer-focus:left-2
            peer-focus:scale-80
            peer-focus:text-accent
          "
        >
          {label}
        </label>
      )}

      {currentValue && (
        <IconButton title="Clear" isState={true} onClick={() => update('')}>
          <X size={14} />
        </IconButton>
      )}
    </div>
  );
}
