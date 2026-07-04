import { useState } from 'react';
import { ChevronLeft, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import TransparentPillButton from '@/entrypoints/components/buttons/transparent-pill-button';
import FilledButton from '@/entrypoints/components/buttons/filled-button';
import CancelButton from '../buttons/cancel-button/inedx';

import TitleField from '@/entrypoints/components/inputs/input-field';
import IconPicker from '@/entrypoints/components/icon-picker';
import ColorInput from '@/entrypoints/components/inputs/color-input';
import PropertyEditor from '@/entrypoints/components/property-editor';

import { IconName } from '@/utils/icons';

import { Property } from '@/types/entry.interface';

import { useAppDispatch } from '@/utils/store';
import { createEntry } from '@/features/entries/entries.thunks';

export default function EntryEditorPage({
  show,
  parentId = null,
  close,
}: {
  show: boolean;
  parentId?: string | null;
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

  const [properties, setProperties] = useState<Property[]>([]);

  const dispatch = useAppDispatch();

  function handleSave(property: Property) {
    if (
      property.id === '' ||
      property.name === '' ||
      property.value === '' ||
      !property.value
    ) {
      return;
    }

    setProperties([...properties, property]);
  }

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
          value={title}
          onChange={(value) => setTitle(value)}
        />
        <IconPicker
          icon={icon}
          setIcon={setIcon}
          iconUrl={iconUrl}
          setIconUrl={setIconUrl}
          iconMode={iconMode}
          setIconMode={setIconMode}
        />
        <ColorInput
          label={t('colorLabel')}
          value={color}
          onChange={(value) => setColor(value)}
        />
      </div>
      <PropertyEditor onSave={(property) => handleSave(property)} />
      {properties.map((property) => (
        <div key={property.id} className="px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="text-primary-on-container">{property.name}</span>
            <span className="text-primary-on-container">{property.type}</span>
          </div>
        </div>
      ))}
      {JSON.stringify(properties)}
      <div className="flex justify-end px-6 gap-3">
        <CancelButton title="Cancel" onClick={close} isState={true}>
          <span className="text-on-surface text-sm">{t('cancel')}</span>
        </CancelButton>
        <FilledButton
          title="Save"
          isState={true}
          onClick={() => {
            dispatch(
              createEntry({
                parentId,
                title,
                icon,
                color,
                properties,
              }),
            );
          }}
        >
          <Save size={16} color="var(--color-on-primary-container)" />
          <span className="text-on-primary-container text-sm">{t('save')}</span>
        </FilledButton>
      </div>
    </div>
  );
}
