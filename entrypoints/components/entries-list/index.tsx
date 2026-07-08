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
          rounded-xl border border-border/15
          transition-all duration-200
          backdrop-blur-md bg-surface-container/95
          shadow-lg overflow-hidden
          z-10
          ${isDropdownOpenId === entry.id ? 'h-[74px] opacity-100' : 'h-0 opacity-0 pointer-events-none'}
        `}
      >
        {buttons.map((button) => (
          <RippleButton
            mode="dark"
            key={button}
            className="w-full px-4 py-2 bg-transparent hover:bg-primary-container/20 text-left text-xs font-semibold text-text cursor-pointer transition-all duration-200"
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
    <ul className="flex flex-col gap-3.5 p-4.5">
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
          className="
            flex items-center justify-between
            bg-primary-container/70 hover:bg-primary-container
            p-4 rounded-2xl
            border border-border/10 hover:border-border/30
            shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
            transition-all duration-200 ease-out cursor-pointer
          "
        >
          <div className="flex items-center gap-3">
            <div className="text-primary-title">
              {renderIcon(entry)}
            </div>
            <h1 className="font-semibold text-text text-sm tracking-wide">{entry.title}</h1>
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
