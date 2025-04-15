import React from 'react';

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`
        flex h-10 w-full rounded-lg px-3 py-2 text-sm
        bg-base-200/50 border border-base-300
        focus:outline-none focus:ring-2 focus:ring-primary/20
        disabled:cursor-not-allowed disabled:opacity-50
        transition-colors duration-200
        ${className || ''}
      `}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input }; 