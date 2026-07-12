import { useTranslation } from 'react-i18next';
import i18n from '@/utils/i18n';
import RippleButton from '@/entrypoints/components/buttons/ripple-button';

export default function LanguageDropdown({
  isDropdownOpen,
  setIsDropdownOpen,
}: {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}) {
  const { t } = useTranslation();

  const buttons = ['English', 'Русский'];

  return (
    <div
      className={`
        absolute top-15 right-0 w-32
        rounded-2xl border border-border/10
        transition-all duration-200
        backdrop-blur-xl bg-surface-container
        shadow-xl overflow-hidden
        z-10
        ${isDropdownOpen ? 'h-16.5 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
      `}
    >
      {buttons.map((button) => (
        <RippleButton
          mode="dark"
          key={button}
          className="w-full px-4 py-2 bg-transparent hover:bg-primary-container/20 text-left text-xs font-semibold text-text cursor-pointer transition-all duration-200"
          isState={true}
          onClick={() => {
            switch (button) {
              case 'English':
                document.documentElement.lang = 'en';
                i18n.changeLanguage('en');
                break;
              case 'Русский':
                document.documentElement.lang = 'ru';
                i18n.changeLanguage('ru');
                break;
            }

            setIsDropdownOpen(false);
          }}
        >
          {t(button)}
        </RippleButton>
      ))}
    </div>
  );
}
