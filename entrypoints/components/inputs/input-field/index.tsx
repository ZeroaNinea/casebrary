import { useState } from 'react';
import {
  Search,
  Type,
  ImageUp,
  TextInitial,
  FolderPen,
  Link,
  Hash,
  Calendar,
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
  required = false,
  errorMessage,
  onChange,
}: InputFieldProps) {
  const [internalValue, setInternalValue] = useState(
    type === 'number' ? 0 : '',
  );
  const currentValue = value ?? internalValue;

  const [touched, setTouched] = useState(false);

  const hasError = required && touched && String(currentValue).trim() === '';

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
      case 'calendar':
        return <Calendar size={16} className="text-text-muted shrink-0" />;
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col gap-1.5 w-full my-2 text-left">
      {label && (
        <label
          className={`text-xs font-semibold ${hasError ? 'text-error-border' : 'text-text-muted'} px-1.5`}
        >
          {label}
        </label>
      )}
      <div
        className={`
          relative
          flex items-center gap-2.5
          ${
            hasError
              ? `
                bg-error-container/15
                border-error-container
                hover:bg-error-container/30
                focus-within:border-error-border
                focus-within:ring-2
                focus-within:ring-error-border/20
              `
              : `
                bg-surface-container/30
                hover:bg-surface-container/50
                border-border/20
                focus-within:border-accent/80
                focus-within:ring-2
                focus-within:ring-accent/15
              `
          }
          px-3.5 py-2.5
          rounded-2xl
          shadow-xs focus-within:shadow-sm
          transition-all duration-200 ease-out
          ${multiline ? 'items-start min-h-28' : 'items-center h-12'}
        `}
      >
        {icon && renderIcon(icon)}

        {multiline ? (
          <textarea
            id="search"
            rows={rows ?? 4}
            value={currentValue}
            placeholder={placeholder}
            onBlur={() => setTouched(true)}
            onChange={(e) => update(e.target.value)}
            className="
              flex-1
              bg-transparent
              outline-none
              resize-none
              text-text text-sm
              placeholder:text-text-muted
              peer
              py-0.5
            "
          />
        ) : (
          <input
            id="search"
            type={type ?? 'text'}
            value={currentValue}
            placeholder={placeholder}
            onBlur={() => setTouched(true)}
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
              text-text text-sm
              placeholder:text-text-muted
              peer
            "
          />
        )}

        {currentValue && (
          <IconButton title="Clear" isState={true} onClick={() => update('')}>
            <X size={14} />
          </IconButton>
        )}
      </div>
      {hasError && (
        <span className="px-1.5 text-xs text-error-border">
          {errorMessage ?? 'This field is required.'}
        </span>
      )}
    </div>
  );
}
