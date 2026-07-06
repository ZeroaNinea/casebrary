import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EllipsisVertical } from 'lucide-react';

import Entry from '@/types/entry.interface';
import { icons } from '@/utils/icons';

import ClassicIconButton from '../buttons/classic-icon-button';

import createPalette from '@/utils/theme/palette.util';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';

export default function EntriesList({
  entries,
  deleteEntry,
  updateEntry,
}: {
  entries: Entry[];
  deleteEntry: (id: string) => void;
  updateEntry: (updates: Entry) => void;
}) {
  const { t } = useTranslation();

  const [isDropdownOpenId, setIsDropdownOpenId] = useState<string | null>(null);

  function renderIcon(entry: Entry) {
    if (!entry.icon) {
      return null;
    } else if (entry.icon.type === 'lucide') {
      const Icon = icons[entry.icon.value];
      return <Icon size={18} />;
    } else {
      return (
        <img src={entry.icon.value} width={18} height={18} alt={entry.title} />
      );
    }
  }

  return (
    <ul className="flex flex-col gap-2 p-3">
      {entries.map((entry) => (
        <li
          key={entry.id}
          style={
            {
              '--primary-container':
                entry.color && createPalette(entry.color)['100'],
              '--primary-container-hover':
                entry.color && createPalette(entry.color)['200'],
            } as React.CSSProperties
          }
          className="flex items-center justify-between bg-primary-container hover:bg-primary-container-hover p-3 rounded-md transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            {renderIcon(entry)}
            <h1>{entry.title}</h1>
          </div>
          <div className="relative">
            <ClassicIconButton
              title="Options"
              isState={true}
              onClick={() => {
                if (isDropdownOpenId === entry.id) {
                  setIsDropdownOpenId(null);
                } else {
                  setIsDropdownOpenId(entry.id);
                }
              }}
            >
              <EllipsisVertical
                size={18}
                style={
                  {
                    '--primary-title':
                      entry.color && createPalette(entry.color)['900'],
                  } as React.CSSProperties
                }
                color="var(--color-primary-title)"
              />
            </ClassicIconButton>
            <div
              className={`
                absolute top-12 right-0 w-50
                rounded-md
                transition-all duration-200
                ${isDropdownOpenId === entry.id ? 'h-50 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
              `}
            >
              <RippleButton
                mode="dark"
                className="w-full p-2 bg-primary-container hover:bg-primary-container-hover text-left cursor-pointer rounded-t-md transition-all duration-200"
                isState={true}
                onClick={() => {
                  deleteEntry(entry.id);
                  setIsDropdownOpenId(null);
                }}
              >
                {t('delete')}
              </RippleButton>
              <RippleButton
                mode="dark"
                className="w-full p-2 bg-primary-container hover:bg-primary-container-hover text-left cursor-pointer rounded-b-md transition-all duration-200"
                isState={true}
                onClick={() => {
                  updateEntry(entry);
                  setIsDropdownOpenId(null);
                }}
              >
                {t('update')}
              </RippleButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
