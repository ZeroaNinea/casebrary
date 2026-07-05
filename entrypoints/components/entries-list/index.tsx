import { EllipsisVertical } from 'lucide-react';

import Entry from '@/types/entry.interface';
import { icons } from '@/utils/icons';

import IconButton from '../buttons/icon-button';

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
          className="flex items-center justify-between bg-primary-container hover:primary-container-hover p-3"
        >
          <div className="flex items-center gap-2">
            {renderIcon(entry)}
            <h1>{entry.title}</h1>
          </div>
          <div>
            <IconButton title="Options">
              <EllipsisVertical size={18} color="var(--color-primary-title)" />
            </IconButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
