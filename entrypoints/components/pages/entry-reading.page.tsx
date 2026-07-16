import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TransparentPillButton from '@/entrypoints/components/buttons/transparent-pill-button';
import Entry from '@/types/entry.interface';

import resolveThemeMode from '@/utils/theme/resolve-theme-mode.helper';

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

      <h1 className="text-2xl text-primary-title font-bold">
        {readingEntry?.title}
      </h1>
    </div>
  );
}
