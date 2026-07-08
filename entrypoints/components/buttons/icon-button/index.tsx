import React from 'react';
import RippleButton from '../ripple-button';

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
      className="p-2.5 rounded-full cursor-pointer hover:bg-primary-container/60 hover:shadow-sm hover:scale-[1.06] active:scale-[0.92] transition-all duration-200 ease-out"
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


