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
    </>
  );
}
