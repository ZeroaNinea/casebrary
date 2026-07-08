import { useState } from 'react';
import { Check, ChevronDown, ChevronUpIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RippleButton from '../../buttons/ripple-button';
import { propertyTypes, PropertyType } from '@/types/entry.interface';

import NameInput from '@/entrypoints/components/inputs/input-field';
import TextareaInput from '@/entrypoints/components/inputs/input-field';
import NumberInput from '@/entrypoints/components/inputs/input-field';
import UrlInput from '@/entrypoints/components/inputs/input-field';
import DateInput from '@/entrypoints/components/inputs/input-field';

import SlideToggle from '@/entrypoints/components/slide-toggle';
import FilledButton from '@/entrypoints/components/buttons/filled-button';

import IconPicker from '@/entrypoints/components/icon-picker';
import { IconName } from '@/utils/icons';

import { Property } from '@/types/entry.interface';

export default function PropertyEditor({
  onSave,
}: {
  onSave: (property: Property) => void;
}) {
  const { t } = useTranslation();

  const [propertyType, setPropertyType] = useState<PropertyType>('text');
  const [propertyName, setPropertyName] = useState('');
  const [propertyText, setPropertyText] = useState('');
  const [propertyNumber, setPropertyNumber] = useState(0);
  const [propertyBoolean, setPropertyBoolean] = useState(false);
  const [propertyDate, setPropertyDate] = useState('');
  const [propertyUrl, setPropertyUrl] = useState('');

  const [icon, setIcon] = useState<IconName>('folder');
  const [iconMode, setIconMode] = useState<'lucide' | 'url' | 'upload'>(
    'lucide',
  );
  const [iconUrl, setIconUrl] = useState('');

  function getPropertyValue() {
    switch (propertyType) {
      case 'text':
        return propertyText;
      case 'number':
        return propertyNumber;
      case 'date':
        return propertyDate;
      case 'url':
        return propertyUrl;
      case 'boolean':
        return propertyBoolean;
      case 'image':
        console.log('image');
        if (iconMode === 'lucide') {
          return icon;
        }

        if (iconMode === 'url') {
          return iconUrl;
        }

        return '';
      default:
        return '';
    }
  }

  function getPropertyType() {
    if (iconMode === 'lucide' && propertyType === 'image') {
      return 'icon';
    }

    return propertyType;
  }

  return (
    <div className="py-3">
      <h2 className="font-bold text-primary-title text-lg m-2 mx-[8%]">
        {t('propertyTitle')}
      </h2>
      <div className="flex justify-center bg-surface-container/20 p-1.5 rounded-2xl border border-border/10 max-w-[92%] mx-auto shadow-xs">
        {propertyTypes.map((type, index) => (
          <RippleButton
            key={type}
            title="Entry"
            mode="dark"
            className={`
              flex items-center justify-center gap-1.5 py-1.5 px-3
              rounded-xl cursor-pointer font-semibold
              transition-all duration-200
              ${
                propertyType === type
                  ? 'bg-primary-container text-primary-on-container shadow-xs scale-[1.02]'
                  : 'hover:bg-surface-container/40 text-text/70'
              }
            `}
            isState={true}
            onClick={() => setPropertyType(type)}
          >
            <span
              className={`
                transition-all
                duration-200
                ${propertyType === type ? 'opacity-100 scale-100 w-3.5' : 'opacity-0 scale-0 w-0'}
              `}
            >
              <Check size={14} />
            </span>
            <span className="text-xs">{t(`property-${index}`)}</span>
          </RippleButton>
        ))}
      </div>
      <div className="p-3">
        <NameInput
          label={t('propertyNameLabel')}
          placeholder={t('enterPropertyName')}
          value={propertyName}
          icon="folder"
          onChange={setPropertyName}
        />
      </div>
      {propertyType === 'text' && (
        <div className="p-3 mt-1">
          <TextareaInput
            multiline={true}
            label={propertyName || t('propertyDescriptionLabelDefault')}
            icon="initial"
            placeholder={t('enterPropertyDescription') + propertyName}
            value={propertyText}
            onChange={setPropertyText}
          />
        </div>
      )}
      {propertyType === 'number' && (
        <div className="p-3">
          <NumberInput
            label={propertyName || t('propertyDescriptionLabelDefault')}
            placeholder={t('enterPropertyDescription') + propertyName}
            type="number"
            icon="hash"
            value={propertyNumber}
            onChange={setPropertyNumber}
          />
        </div>
      )}
      {propertyType === 'boolean' && (
        <div className="p-3">
          <SlideToggle
            label={propertyName || t('propertyDescriptionLabelDefault')}
            value={propertyBoolean}
            onChange={setPropertyBoolean}
          />
        </div>
      )}
      {propertyType === 'date' && (
        <div className="p-3">
          <DateInput
            label={propertyName || t('propertyDescriptionLabelDefault')}
            placeholder={t('enterPropertyDescription') + propertyName}
            type="date"
            icon="calendar"
            value={propertyDate}
            onChange={setPropertyDate}
          />
        </div>
      )}
      {propertyType === 'url' && (
        <div className="p-3">
          <UrlInput
            label={propertyName || t('propertyDescriptionLabelDefault')}
            placeholder={t('enterPropertyDescription') + propertyName}
            icon="link"
            value={propertyUrl}
            onChange={setPropertyUrl}
          />
        </div>
      )}
      {propertyType === 'image' && (
        <div className="p-3">
          <IconPicker
            icon={icon}
            setIcon={setIcon}
            iconUrl={iconUrl}
            setIconUrl={setIconUrl}
            iconMode={iconMode}
            setIconMode={setIconMode}
          />
        </div>
      )}
      <div className="flex justify-end px-6">
        <FilledButton
          title="Entry"
          isState={true}
          onClick={() => {
            onSave({
              id: crypto.randomUUID(),
              type: getPropertyType(),
              name: propertyName,
              value: getPropertyValue(),
            });
          }}
        >
          <ChevronDown size={16} color="var(--color-on-primary-container)" />
          <span className="text-on-primary-container text-sm">
            {t('addProperty')}
          </span>
        </FilledButton>
      </div>
    </div>
  );
}
