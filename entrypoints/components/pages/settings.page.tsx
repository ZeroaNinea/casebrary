import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TransparentPillButton from '@/entrypoints/components/buttons/transparent-pill-button';

export default function SettingsPage({
  show,
  close,
}: {
  show: boolean;
  close: () => void;
}) {
  const { t } = useTranslation();

  function handleClose() {
    close();
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
      <h1 className="text-2xl font-bold text-primary-title">Settisgs</h1>
    </div>
  );
}
