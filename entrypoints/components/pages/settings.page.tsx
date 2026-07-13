import { ChevronLeft, HardDriveDownload, DatabaseArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import FilledButton from '@/entrypoints/components/buttons/filled-button';

import TransparentPillButton from '@/entrypoints/components/buttons/transparent-pill-button';

import Entry from '@/types/entry.interface';

export default function SettingsPage({
  entries,
  show,
  close,
}: {
  entries: Entry[];
  show: boolean;
  close: () => void;
}) {
  const { t } = useTranslation();

  function handleClose() {
    close();
  }

  function exportEntries(entries: Entry[]) {
    const json = JSON.stringify(entries, null, 2);

    const blob = new Blob([json], {
      type: 'application/json',
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'casebrary-backup.json';
    a.click();

    URL.revokeObjectURL(url);
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
      <TransparentPillButton isState={true} onClick={handleClose}>
        <ChevronLeft size={18} color="var(--color-primary-on-container)" />
        <span className="text-primary-on-container">{t('back')}</span>
      </TransparentPillButton>
      <h1 className="text-2xl font-bold text-primary-title">
        {t('settingsTitle')}
      </h1>
      <FilledButton
        title="Entry"
        isState={true}
        onClick={() => exportEntries(entries)}
      >
        <HardDriveDownload
          size={16}
          color="var(--color-on-primary-container)"
        />
        <span className="text-on-primary-container text-sm font-semibold">
          {t('downloadEntries')}
        </span>
      </FilledButton>
      <FilledButton title="Entry" isState={true} onClick={() => {}}>
        <DatabaseArrowUp size={16} color="var(--color-on-primary-container)" />
        <span className="text-on-primary-container text-sm font-semibold">
          {t('uploadEntriesIndexedDB')}
        </span>
      </FilledButton>
    </div>
  );
}
