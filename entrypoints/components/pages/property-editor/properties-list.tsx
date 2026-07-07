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
    <div className="flex flex-col gap-2">
      {/* {JSON.stringify(properties)} */}
      {properties.map((property) => (
        <div
          key={property.id}
          className="flex justify-between items-center px-3 py-3"
        >
          <div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                {renderIcon(property.type)}
                <h1 className="text-primary-title">{property.name}</h1>
              </div>
            </div>
            <RippleButton
              mode="dark"
              className="
                px-2 py-1 text-sm rounded-md border border-border
                hover:bg-primary-container-hover transition-all duration-200
              "
            >
              <span className="text-primary-title">{property.type}</span>
            </RippleButton>
            {/* <div className="whitespace-pre-wrap my-2">{property.value}</div> */}
            {renderValue(property)}
          </div>
          <div className="relative">
            <ClassicIconButton
              title="Options"
              isState={true}
              // onClick={() => {
              //   if (isDropdownOpenId === entry.id) {
              //     setIsDropdownOpenId(null);
              //   } else {
              //     setIsDropdownOpenId(entry.id);
              //   }
              // }}
            >
              <EllipsisVertical
                size={18}
                // style={
                //   {
                //     '--primary-title': entry.color && palettes[entry.id]['900'],
                //   } as React.CSSProperties
                // }
                color="var(--color-primary-title)"
              />
            </ClassicIconButton>
            {/* {renderDropdown(entry)} */}
          </div>
        </div>
      ))}
    </div>
  );
}
