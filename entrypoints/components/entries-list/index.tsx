import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EllipsisVertical } from 'lucide-react';

import Entry from '@/types/entry.interface';
import { icons } from '@/utils/icons';

import ClassicIconButton from '../buttons/classic-icon-button';

import createPalette from '@/utils/theme/palette.util';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';

import { Palette } from '@/types/palette.alias';

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

  function geretatePalettes() {
    const palettes: Record<string, Palette> = {};
    for (const entry of entries) {
      palettes[entry.id] = createPalette(entry.color || '');
    }

    return palettes;
  }

  const palettes = geretatePalettes();

  function renderDropdown(entry: Entry) {
    const buttons = ['update', 'delete'];

    return (
      <div
        className={`
          absolute top-12 right-0 w-50
          rounded-md
          transition-all duration-200
          backdrop-blur-[2px]
          z-10
          ${isDropdownOpenId === entry.id ? 'h-20 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
        `}
      >
        {buttons.map((button) => (
          <RippleButton
            mode="dark"
            key={button}
            className="w-full p-2 bg-primary-container hover:bg-primary-container-hover text-left cursor-pointer first:rounded-t-md last:rounded-b-md transition-all duration-200"
            isState={true}
            onClick={() => {
              if (button === 'delete') {
                deleteEntry(entry.id);
              } else if (button === 'update') {
                updateEntry(entry);
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
              '--primary-container': entry.color && palettes[entry.id]['100'],
              '--primary-container-hover':
                entry.color && palettes[entry.id]['200'],
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
                    '--primary-title': entry.color && palettes[entry.id]['900'],
                  } as React.CSSProperties
                }
                color="var(--color-primary-title)"
              />
            </ClassicIconButton>
            {renderDropdown(entry)}
          </div>
        </li>
      ))}
    </ul>
  );
}
