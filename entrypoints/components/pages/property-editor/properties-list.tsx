import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EllipsisVertical } from 'lucide-react';

import { Property, PropertyType } from '@/types/entry.interface';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';
import ClassicIconButton from '@/entrypoints/components/buttons/classic-icon-button';

import { propertyIcons } from '@/utils/property';

export default function ({
  properties,
  onDelete,
  onUpdate,
}: {
  properties: Property[];
  onDelete: (id: string) => void;
  onUpdate: (property: Property) => void;
}) {
  const { t } = useTranslation();

  const [isDropdownOpenId, setIsDropdownOpenId] = useState<string | null>(null);

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

      case 'icon':
        const Icon = icons[`${property.value}` as IconName];
        return (
          <div className="mt-2 pl-5">
            <Icon size={24} />
          </div>
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

  function renderDropdown(property: Property) {
    const buttons = ['update', 'delete'];

    return (
      <div
        className={`
        absolute top-12 right-0 w-32
        rounded-2xl border border-border/10
        transition-all duration-200
        backdrop-blur-xl bg-surface-container/20
        shadow-xl overflow-hidden
        z-10
        ${
          isDropdownOpenId === property.id
            ? 'h-16.5 opacity-100'
            : 'h-0 opacity-0 pointer-events-none'
        }
      `}
      >
        {buttons.map((button) => (
          <RippleButton
            key={button}
            mode="dark"
            className="
            w-full px-4 py-2
            bg-transparent hover:bg-primary-container/20
            text-left text-xs font-semibold
            transition-all duration-200
            cursor-pointer
          "
            isState={true}
            onClick={() => {
              if (button === 'delete') {
                onDelete(property.id);
              } else {
                onUpdate(property);
              }

              setIsDropdownOpenId(null);
            }}
          >
            {t(button)}
          </RippleButton>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 p-4.5">
      {/* {JSON.stringify(properties)} */}
      {properties.map((property) => (
        <div
          key={property.id}
          className="
            flex justify-between items-center
            bg-surface-container/20 p-4 rounded-2xl
            border border-border/10
            shadow-xs hover:shadow-sm hover:-translate-y-0.5
            transition-all duration-200 ease-out
            z-50
          "
        >
          <div className="flex-1 min-w-0 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-primary-title">
                {renderIcon(property.type)}
                <h1 className="font-semibold text-text text-xs tracking-wide truncate max-w-30">
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
              onClick={() =>
                setIsDropdownOpenId(
                  isDropdownOpenId === property.id ? null : property.id,
                )
              }
            >
              <EllipsisVertical size={18} color="var(--color-primary-title)" />
            </ClassicIconButton>
            {renderDropdown(property)}
          </div>
        </div>
      ))}
    </div>
  );
}
