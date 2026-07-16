import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TransparentPillButton from '@/entrypoints/components/buttons/transparent-pill-button';
import Entry, { Property, PropertyType } from '@/types/entry.interface';

import resolveThemeMode from '@/utils/theme/resolve-theme-mode.helper';
import { propertyIcons } from '@/utils/property';

export default function EntryReadingPage({
  readingEntry,
  show,
  handleClose,
}: {
  readingEntry: Entry | null;
  show: boolean;
  handleClose: () => void;
}) {
  const { t } = useTranslation();

  const saved = localStorage.getItem('theme');
  const mode = resolveThemeMode(saved ? JSON.parse(saved).mode : 'system');

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

  return (
    <div
      className={`
        absolute inset-0 z-50 overflow-y-auto
        bg-linear-to-br from-(--color-bg) via-(--color-primary-background) to-(--color-secondary-background)
        p-4.5
        transition-transform duration-300 ease-out
      `}
      style={{
        transform: show ? 'translateX(0)' : 'translateX(105%)',
      }}
    >
      <TransparentPillButton
        isState={true}
        mode={mode === 'dark' ? 'light' : 'dark'}
        onClick={handleClose}
      >
        <ChevronLeft size={18} color="var(--color-primary-on-container)" />
        <span className="text-primary-on-container">{t('back')}</span>
      </TransparentPillButton>

      <h1 className="flex aluign-center gap-2 text-2xl text-primary-title font-bold m-4">
        <div
          style={{
            backgroundColor: readingEntry?.color,
          }}
          className="w-9 h-9 rounded-lg border border-border/80"
        ></div>
        {readingEntry?.title}
      </h1>
      <div className="flex flex-col gap-3.5 p-4.5">
        {readingEntry?.properties.map((property) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}
