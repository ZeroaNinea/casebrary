import Entry from '@/types/entry.interface';
import { icons } from '@/utils/icons';

export default function EntryIcon({ entry }: { entry: Entry }) {
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
