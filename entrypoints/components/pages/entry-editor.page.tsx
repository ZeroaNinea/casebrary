import { ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TransparentPillButton from '@/entrypoints/components/buttons/transparent-pill-button';
import TitleField from '@/entrypoints/components/input-field';
import IconPicker from '@/entrypoints/components/icon-picker';

import CurrentPage from '@/types/current-page.alias';

import { icons, IconName } from '@/utils/icons';

export default function EntryEditorPage({
  show,
  close,
}: {
  show: boolean;
  type: CurrentPage;
  close: () => void;
}) {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState<IconName>('folder');
  const [color, setColor] = useState('#4FC3F7');

  const [iconMode, setIconMode] = useState<'lucide' | 'url' | 'upload'>(
    'lucide',
  );
  const [iconUrl, setIconUrl] = useState('');

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
      <div className="px-3 py-3">
        <TitleField
          label={t('titleLabel')}
          placeholder={t('titlePlaceholder')}
          icon="type"
          // onChange={(value) => {
          //   // TODO: set title
          // }}
        />
        {/* <div className="flex gap-2 my-3">
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
        )} */}
        <IconPicker
          icon={icon}
          setIcon={setIcon}
          iconUrl={iconUrl}
          setIconUrl={setIconUrl}
          iconMode={iconMode}
          setIconMode={setIconMode}
        />
      </div>
    </div>
  );
}
