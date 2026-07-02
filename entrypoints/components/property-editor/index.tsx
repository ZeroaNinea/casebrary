import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import FilledButton from '../buttons/filled-button';

export default function PropertyEditor() {
  const { t } = useTranslation();

  return (
    <div className="p-3">
      <FilledButton
        title="Entry"
        // isState={true}
        // onClick={() => setCurrentPage('entry-editor')}
      >
        <Plus size={16} color="var(--color-on-primary-container)" />
        <span className="text-on-primary-container text-sm">
          {t('addProperty')}
        </span>
      </FilledButton>
    </div>
  );
}
