import { useRef } from 'react';
import { HardDriveDownload, DatabaseArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import FilledButton from '@/entrypoints/components/buttons/filled-button';
import CancelButton from '@/entrypoints/components/buttons/cancel-button/inedx';

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
      <div className="flex gap-2 my-3">
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
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleImport}
        />

        <CancelButton title="Import" isState={true} onClick={openFilePicker}>
          <DatabaseArrowUp size={16} color="var(--color-on-surface)" />
          <span className="text-on-surface text-sm font-semibold">
            {t('uploadEntriesIndexedDB')}
          </span>
        </CancelButton>
      </div>
    </div>
  );
}
