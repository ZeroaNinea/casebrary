import React from 'react';
import RippleButton from '../ripple-button';

export default function CancelButton({
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
        flex items-center justify-center gap-2 px-5 py-2.5
        bg-surface-container hover:bg-surface-container-hover
        rounded-xl cursor-pointer font-semibold text-sm
        border border-border/30
        shadow-sm hover:shadow-md hover:shadow-black/5
        hover:scale-[1.02] active:scale-[0.97] hover:-translate-y-0.5 active:translate-y-0
        transition-all duration-200 ease-out
        ${className || ''}
      `}
      classnamesonclick={['bg-surface-container-hover']}
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


