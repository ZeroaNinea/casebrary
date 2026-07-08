import { useTranslation } from 'react-i18next';

import TransparentPillButton from '../buttons/transparent-pill-button';
import IconButton from '../buttons/icon-button';
import TitleField from '../inputs/input-field';

import IconPickerSetup from './types/icon-picker-setup.interface';
import { icons, IconName } from '@/utils/icons';

export default function IconPicker({
  icon,
  setIcon,
  iconMode,
  setIconMode,
  iconUrl,
  setIconUrl,
}: IconPickerSetup) {
  const { t } = useTranslation();

  function renderCurrentIcon() {
    if (iconMode === 'lucide') {
      const Icon = icons[icon as IconName];
      return <Icon size={100} color="var(--color-text-muted)" />;
    }
  }

  function renderCurrentImage() {
    if (iconMode === 'url') {
      return <img src={iconUrl} width={100} alt={iconUrl} />;
    }
  }

  return (
    <>
      <div className="flex gap-2 my-3">
        <TransparentPillButton
          isState={iconMode === 'lucide'}
          onClick={() => setIconMode('lucide')}
        >
          {t('icons')}
        </TransparentPillButton>

        <TransparentPillButton
          isState={iconMode === 'url'}
          onClick={() => setIconMode('url')}
        >
          {t('imageUrl')}
        </TransparentPillButton>

        <TransparentPillButton
          isState={iconMode === 'upload'}
          onClick={() => setIconMode('upload')}
        >
          {t('upload')}
        </TransparentPillButton>
      </div>
      {iconMode === 'lucide' && (
        <div className="flex flex-wrap justify-center gap-2">
          {Object.entries(icons).map(([name, Icon]) => (
            <IconButton
              key={name}
              isState={icon === name}
              onClick={() => setIcon(name as IconName)}
            >
              <Icon size={18} />
            </IconButton>
          ))}
        </div>
      )}
      {iconMode === 'url' && (
        <TitleField
          label={t('imageUrl')}
          placeholder="https://example.com/icon.png"
          value={iconUrl}
          onChange={setIconUrl}
          icon="image"
        />
      )}
      {iconMode === 'upload' && (
        <div
          className="
            rounded-lg
            border border-border
            p-4
            text-center
            text-text-muted
          "
        >
          <p className="font-medium">{t('imageUploading')}</p>
          <p className="mt-2 text-sm">{t('imageUploadingDescription')}</p>
        </div>
      )}
      {((iconMode === 'lucide' && icon) || (iconMode === 'url' && iconUrl)) && (
        <div
          className="
          flex items-center justify-center py-6 my-3
          bg-surface-container/30 hover:bg-surface-container/50
          rounded-xl cursor-pointer font-semibold text-sm
          border border-border/30
          shadow-sm hover:shadow-md hover:shadow-black/5
          hover:scale-[1.02] hover:-translate-y-0.5
          transition-all duration-200 ease-out
        "
        >
          {renderCurrentIcon()}
          {renderCurrentImage()}
        </div>
      )}
    </>
  );
}
