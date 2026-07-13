import i18n from '@/utils/i18n';
import RippleButton from '@/entrypoints/components/buttons/ripple-button';

export default function LanguageDropdown({
  isDropdownOpen,
  setIsDropdownOpen,
}: {
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
}) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'ru', label: 'Русский' },
  ];

  return (
    <div
      style={
        {
          background:
            'color-mix(in lch, var(--surface-container) 80%, transparent)',
          backdropFilter: 'blur(10px)',
        } as React.CSSProperties
      }
      className={`
        absolute top-15 right-0 w-32
        rounded-2xl border border-border/10
        transition-all duration-200
        shadow-xl overflow-hidden
        z-10
        ${isDropdownOpen ? 'h-16.5 opacity-100' : 'h-0 opacity-0 pointer-events-none'}
      `}
    >
      {languages.map((language) => (
        <RippleButton
          mode="dark"
          key={language.code}
          className="w-full px-4 py-2 bg-transparent hover:bg-primary-container-hover hover:text-text text-left text-xs font-semibold text-on-surface cursor-pointer transition-all duration-200"
          isState={true}
          onClick={() => {
            document.documentElement.lang = language.code;
            i18n.changeLanguage(language.code);
            localStorage.setItem('language', language.code);

            setIsDropdownOpen(false);
          }}
        >
          {language.label}
        </RippleButton>
      ))}
    </div>
  );
}
