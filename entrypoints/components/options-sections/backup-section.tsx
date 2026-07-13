import { useRef } from 'react';
import { ChevronLeft, HardDriveDownload, DatabaseArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import FilledButton from '@/entrypoints/components/buttons/filled-button';

import TransparentPillButton from '@/entrypoints/components/buttons/transparent-pill-button';

import Entry from '@/types/entry.interface';
import { importEntries } from '@/features/entries/entries.thunks';

import { useAppDispatch } from '@/utils/store';

export default function BackupSection({ entries }: { entries: Entry[] }) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    const text = await file.text();

    const entries = JSON.parse(text);

    dispatch(importEntries(entries));
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-title">
        {t('backupTitle')}
      </h2>
      <FilledButton
        title="Entry"
        className="w-full"
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
      <input
        type="file"
        className="
          w-full h-10 p-3
          bg-surface-container hover:bg-surface-container-hover
          rounded-xl cursor-pointer font-semibold text-sm
          border border-border/30
          shadow-sm hover:shadow-md hover:shadow-black/5
          hover:scale-[1.02] active:scale-[0.97] hover:-translate-y-0.5 active:translate-y-0
          transition-all duration-200 ease-out
        "
        accept=".json"
        ref={fileInputRef}
        onChange={handleImport}
      />
    </div>
  );
}
