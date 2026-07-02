import { useState } from 'react';
import { Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import RippleButton from '../buttons/ripple-button';
import { propertyTypes, PropertyType } from '@/types/entry.interface';

export default function PropertyEditor() {
  const { t } = useTranslation();

  const [propertyType, setPropertyType] = useState<PropertyType>('text');

  return (
    <div className="">
      <h2 className="font-bold text-primary-title text-lg m-2 mt-3">
        {t('propertyTitle')}
      </h2>
      <div className="flex justify-center">
        {propertyTypes.map((type, index) => (
          <RippleButton
            key={type}
            title="Entry"
            mode="dark"
            className={`
              border-border first:rounded-l-lg last:rounded-r-lg
              border flex items-center gap-1 py-1
              hover:bg-primary-container
              transition-all duration-200 cursor-pointer
              ${propertyType === type ? 'px-3' : 'px-1'}
            `}
            isState={true}
            onClick={() => setPropertyType(type)}
          >
            <span
              className={`
                transition-all
                duration-200
                ${propertyType === type ? 'opacity-100 scale-100 w-2 mr-1' : 'opacity-0 scale-0 w-0 mr-0'}
              `}
            >
              <Check size={14} />
            </span>
            <span className="text-text text-sm">{t(`property-${index}`)}</span>
          </RippleButton>
        ))}
      </div>
    </div>
  );
}
