import { Property, PropertyType } from '@/types/entry.interface';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';

import { propertyIcons } from '@/utils/property';

export default function ({ properties }: { properties: Property[] }) {
  function renderIcon(type: PropertyType) {
    const Icon = propertyIcons[type];
    return <Icon size={16} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {/* {properties.map((property) => (
        <div key={property.id} className="px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="text-primary-on-container">{property.name}</span>
            <span className="text-primary-on-container">{property.type}</span>
            <span className="text-primary-on-container">{property.value}</span>
          </div>
        </div>
      ))} */}
      {properties.map((property) => (
        <div key={property.id} className="px-3 py-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {renderIcon(property.type)}
              <h1 className="text-primary-title">{property.name}</h1>
            </div>
            <RippleButton
              mode="dark"
              className="
                px-2 py-1 rounded-md border-berder
                hover:border-primary-container-hover transition-all duration-200
              "
            >
              <span className="text-primary-title">{property.type}</span>
            </RippleButton>
            <p>{property.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
