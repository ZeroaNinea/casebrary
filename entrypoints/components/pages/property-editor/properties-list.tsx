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
            <div className="whitespace-pre-wrap my-2">{property.value}</div>
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
