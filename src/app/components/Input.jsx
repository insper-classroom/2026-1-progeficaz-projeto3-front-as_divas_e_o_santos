import { forwardRef } from 'react';

export const Input = forwardRef(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 bg-input-background border-2 border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
            error
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
              : ''
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive mt-1">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';