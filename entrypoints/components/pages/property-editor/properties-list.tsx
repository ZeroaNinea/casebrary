import { Property, PropertyType } from '@/types/entry.interface';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';
import ClassicIconButton from '@/entrypoints/components/buttons/classic-icon-button';

import { propertyIcons } from '@/utils/property';
import { EllipsisVertical } from 'lucide-react';

export default function ({ properties }: { properties: Property[] }) {
  function renderIcon(type: PropertyType) {
    const Icon = propertyIcons[type];
    return <Icon size={16} />;
  }

  function renderValue(property: Property) {
    switch (property.type) {
      case 'text':
        return (
          <p className="mt-2 whitespace-pre-wrap text-text">{property.value}</p>
        );

      case 'number':
        return (
          <div className="mt-2">
            <span
              className="
                rounded-md
                bg-surface-container
                px-2 py-1
                font-mono
                text-sm
              "
            >
              {property.value}
            </span>
          </div>
        );

      case 'boolean':
        return (
          <div className="mt-2">
            {property.value ? (
              <span className="rounded-full bg-green-100 px-2 py-1 text-green-700">
                ✓ Yes
              </span>
            ) : (
              <span className="rounded-full bg-red-100 px-2 py-1 text-red-700">
                ✕ No
              </span>
            )}
          </div>
        );

      case 'date':
        return (
          <div className="mt-2 font-mono text-sm">
            {new Date(property.value as string).toLocaleDateString()}
          </div>
        );

      case 'url':
        return (
          <a
            href={property.value as string}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-2
              block
              truncate
              text-accent
              underline
            "
          >
            {property.value}
          </a>
        );

      case 'image':
        return (
          <img
            src={property.value as string}
            alt={property.name}
            className="
              mt-2
              max-h-36
              rounded-md
              border
              border-border
            "
          />
        );
    }
  }

  return (
    <div className="flex flex-col gap-3.5 p-4.5">
      {properties.map((property) => (
        <div
          key={property.id}
          className="
            flex justify-between items-center
            bg-surface-container/20 p-4 rounded-2xl
            border border-border/10
            shadow-xs hover:shadow-sm hover:-translate-y-0.5
            transition-all duration-200 ease-out
          "
        >
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-primary-title">
                {renderIcon(property.type)}
                <h1 className="font-semibold text-text text-xs tracking-wide truncate max-w-[120px]">
                  {property.name}
                </h1>
              </div>
              <div
                className="
                  inline-block px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full
                  bg-primary-container text-primary-on-container border border-border/10
                "
              >
                {property.type}
              </div>
            </div>
            {renderValue(property)}
          </div>
          <div className="relative">
            <ClassicIconButton
              title="Options"
              isState={true}
            >
              <EllipsisVertical
                size={18}
                color="var(--color-primary-title)"
              />
            </ClassicIconButton>
          </div>
        </div>
      ))}
    </div>
  );
}
