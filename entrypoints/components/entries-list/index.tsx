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

  const [isDropdownOpenIds, setIsDropdownOpenIds] = useState<string[]>([]);

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
              '--primary-container': `color-mix(in lch, ${entry.color && createPalette(entry.color)['800']} 60%, transparent)`,
              '--primary-container-hover':
                entry.color && createPalette(entry.color)['800'],
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
                if (isDropdownOpenIds.includes(entry.id)) {
                  setIsDropdownOpenIds(
                    isDropdownOpenIds.filter((id) => id !== entry.id),
                  );
                } else {
                  setIsDropdownOpenIds([...isDropdownOpenIds, entry.id]);
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
                ${isDropdownOpenIds.includes(entry.id) ? 'h-50 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
              `}
            >
              <RippleButton
                mode="dark"
                className="w-full p-2 bg-primary-container hover:bg-primary-container-hover text-left cursor-pointer rounded-md transition-all duration-200"
                isState={true}
                onClick={() => {
                  deleteEntry(entry.id);
                  setIsDropdownOpenIds(
                    isDropdownOpenIds.filter((id) => id !== entry.id),
                  );
                }}
              >
                Delete
              </RippleButton>
              <RippleButton
                mode="dark"
                className="w-full p-2 bg-primary-container hover:bg-primary-container-hover text-left cursor-pointer rounded-md transition-all duration-200"
                isState={true}
                onClick={() => {
                  updateEntry(entry);
                  setIsDropdownOpenIds(
                    isDropdownOpenIds.filter((id) => id !== entry.id),
                  );
                }}
              >
                Update
              </RippleButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
