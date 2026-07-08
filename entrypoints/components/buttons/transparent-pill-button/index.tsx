import React from 'react';
import RippleButton from '../ripple-button';

export default function TransparentPillButton({
  children,
  onClick: handleClick,
  disabled,
  isState,
  title,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  isState?: boolean;
  title?: string;
}) {
  return (
    <RippleButton
      mode="dark"
      className={`
        flex items-center justify-center gap-1.5 px-4.5 py-2
        bg-primary-container/50 hover:bg-primary-container/80
        rounded-full cursor-pointer font-bold text-xs
        border border-border/20
        shadow-xs hover:shadow-sm hover:shadow-primary/5
        hover:scale-[1.03] active:scale-[0.97] hover:-translate-y-0.25 active:translate-y-0
        transition-all duration-200 ease-out
        ${className || ''}
      `}
      classnamesonclick={['bg-primary-container-hover']}
      title={title}
      onClick={handleClick}
      disabled={disabled}
      isState={isState}
      {...props}
    >
      {children}
    </RippleButton>
  );
}


