import React from 'react';
import RippleButton from '@/entrypoints/components/ripple-button';

export default function IconButton({
  children,
  onClick: handleClick,
  disabled,
  isState,
  title,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  // classnamesonclick?: string[];
  disabled?: boolean;
  isState?: boolean;
  title?: string;
}) {
  return (
    <RippleButton
      mode="dark"
      className="p-2 rounded-full cursor-pointer hover:bg-primary-container transition-all duration-200"
      classnamesonclick={['bg-primary-container']}
      onClick={handleClick}
      disabled={disabled}
      isState={isState}
      title={title}
      {...props}
    >
      {children}
    </RippleButton>
  );
}
