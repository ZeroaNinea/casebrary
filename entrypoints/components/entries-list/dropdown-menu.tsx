import { useTranslation } from 'react-i18next';

import RippleButton from '@/entrypoints/components/buttons/ripple-button';
import Entry from '@/types/entry.interface';

export default function DropdownMenu({
  entry,
  isDropdownOpenId,
  setIsDropdownOpenId,
  deleteEntry,
  updateEntry,
  onAddChild,
}: {
  entry: Entry;
  isDropdownOpenId: string | null;
  setIsDropdownOpenId: (id: string | null) => void;
  deleteEntry: (id: string) => void;
  updateEntry: (entry: Entry) => void;
  onAddChild: (id: string) => void;
}) {
  const { t } = useTranslation();

  const buttons = ['addChild', 'update', 'delete'];

  return (
    <div
      className={`
        absolute top-15 right-0 w-32
        rounded-2xl border border-border/10
        transition-all duration-200
        backdrop-blur-[2px] bg-surface-container/20
        shadow-xl overflow-hidden
        z-10
        ${isDropdownOpenId === entry.id ? 'h-24.5 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
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
            } else if (button === 'addChild') {
              onAddChild(entry.id);
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
