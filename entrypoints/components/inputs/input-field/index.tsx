import { useState } from 'react';
import {
  Search,
  Type,
  ImageUp,
  TextInitial,
  FolderPen,
  Link,
  Hash,
  X,
} from 'lucide-react';

import IconButton from '@/entrypoints/components/buttons/icon-button';

import InputFieldProps from './types/input-field-props.interface';

export default function InputField({
  label = 'Search',
  placeholder = 'Search...',
  value,
  icon,
  type,
  multiline = false,
  rows = 4,
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
      case 'initial':
        return <TextInitial size={16} className="text-text-muted shrink-0" />;
      case 'folder':
        return <FolderPen size={16} className="text-text-muted shrink-0" />;
      case 'link':
        return <Link size={16} className="text-text-muted shrink-0" />;
      case 'hash':
        return <Hash size={16} className="text-text-muted shrink-0" />;
    }
  }

  return (
    <div
      className={`
        relative
        flex items-center gap-2
        border-b border-border
        focus-within:border-accent
        transition-colors duration-200
        h-10
        py-1
        ${multiline ? 'items-start min-h-28' : 'items-center h-10'}
      `}
    >
      {/* <Search size={16} className="text-text-muted shrink-0" /> */}
      {icon && renderIcon(icon)}

      {multiline ? (
        <textarea
          id="search"
          rows={rows ?? 4}
          value={currentValue}
          placeholder={placeholder}
          onChange={(e) => update(e.target.value)}
          className="
            flex-1
            bg-transparent
            outline-none
            resize-none
            text-text
            placeholder:text-text-muted
            peer
            py-1
          "
        />
      ) : type === 'number' ? (
        <input
          id="search"
          type={type ?? 'text'}
          value={currentValue}
          placeholder={placeholder}
          onChange={(e) => update(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              update('');
            }
          }}
          className="
            flex-1
            bg-transparent
            outline-none
            text-text
            placeholder:text-text-muted
            peer
          "
        />
      ) : (
        <input
          id="search"
          type={type ?? 'text'}
          value={currentValue}
          placeholder={placeholder}
          onChange={(e) => update(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              update('');
            }
          }}
          className="
            flex-1
            bg-transparent
            outline-none
            text-text
            placeholder:text-text-muted
            peer
          "
        />
      )}

      {multiline ? (
        <span
          className={`
            absolute top-1 left-6 w-80 h-[calc(100%-0.4rem)] bg-bg
            pointer-events-none
            peer-focus:hidden
          `}
        ></span>
      ) : (
        <span
          className="
          absolute top-2 left-6 w-80 h-6 bg-bg
          pointer-events-none
          peer-focus:hidden
        "
        ></span>
      )}

      {label &&
        (multiline ? (
          <label
            htmlFor="search"
            className="
              absolute top-0 left-6
              bg-bg px-2 py-0
              transition-all duration-200
              peer-focus:-top-4
              peer-focus:left-4
              peer-focus:scale-80
              peer-focus:text-accent
              pointer-events-none
            "
          >
            {label}
          </label>
        ) : (
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
              pointer-events-none
            "
          >
            {label}
          </label>
        ))}

      {currentValue && (
        <IconButton title="Clear" isState={true} onClick={() => update('')}>
          <X size={14} />
        </IconButton>
      )}
    </div>
  );
}
