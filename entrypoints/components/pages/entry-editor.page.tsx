import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TransparentPillButton from '../buttons/transparent-pill-button';

export default function EntryEditorPage({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  const { t } = useTranslation();

  return (
    <div
      className={`
        absolute inset-0
        bg-bg p-2
        transition-transform duration-200
      `}
      style={{
        transform: show ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      <TransparentPillButton isState={true} onClick={close}>
        <ChevronLeft size={18} color="var(--color-primary-on-container)" />
        <span className="text-primary-on-container">{t('back')}</span>
      </TransparentPillButton>
      Entry Editor
    </div>
  );
}
