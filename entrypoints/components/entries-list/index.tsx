import React from 'react';
import { EllipsisVertical } from 'lucide-react';

import Entry from '@/types/entry.interface';
import { icons } from '@/utils/icons';

import ClassicIconButton from '../buttons/classic-icon-button';

import createPalette from '@/utils/theme/palette.util';

export default function EntriesList({ entries }: { entries: Entry[] }) {
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
                entry.color && createPalette(entry.color)['800'],
              '--primary-container-hover':
                entry.color && createPalette(entry.color)['900'],
            } as React.CSSProperties
          }
          className="flex items-center justify-between bg-primary-container hover:primary-container-hover p-3"
        >
          <div className="flex items-center gap-2">
            {renderIcon(entry)}
            <h1>{entry.title}</h1>
          </div>
          <div>
            <ClassicIconButton title="Options">
              <EllipsisVertical size={18} color="var(--color-primary-title)" />
            </ClassicIconButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
