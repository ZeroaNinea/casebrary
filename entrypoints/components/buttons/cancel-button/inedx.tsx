import React from 'react';
import RippleButton from '../ripple-button';

export default function CancelButton({
  children,
  onClick: handleClick,
  disabled,
  isState,
  title,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  isState?: boolean;
  title?: string;
}) {
  return (
    <RippleButton
      mode="dark"
      className="
        flex items-center gap-1 px-2 py-1
        bg-surface-container hover:bg-surface-container-hover
        rounded-full cursor-pointer
        transition-all duration-200
      "
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
