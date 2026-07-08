import React from 'react';
import RippleButton from '../ripple-button';

export default function FilledButton({
  children,
  onClick: handleClick,
  disabled = false,
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
      mode="light"
      className={`
        flex items-center justify-center gap-2 px-5 py-2.5
        ${disabled ? 'bg-surface-container hover:bg-surface-container-hover' : 'bg-primary-container-filled hover:bg-primary-container-filled-hover'}
        rounded-xl cursor-pointer font-semibold text-sm
        border border-primary-container-filled/20
        shadow-md shadow-primary-shadow/10 hover:shadow-lg hover:shadow-primary-shadow/20
        hover:scale-[1.02] active:scale-[0.97] hover:-translate-y-0.5 active:translate-y-0
        transition-all duration-200 ease-out
        ${className || ''}
      `}
      classnamesonclick={[
        `${disabled ? 'bg-surface-container-hover' : 'bg-primary-container-filled-hover'}`,
      ]}
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
