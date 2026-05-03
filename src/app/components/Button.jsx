import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Button = forwardRef(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const baseStyles =
      'rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-primary text-primary-foreground hover:opacity-90 shadow-sm hover:shadow-md',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-muted',
      outline: 'border-2 border-border hover:bg-accent hover:border-primary/50',
      ghost: 'hover:bg-accent text-foreground'
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5',
      lg: 'px-6 py-3 text-lg'
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';