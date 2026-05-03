import { Tag } from 'lucide-react';

export const PromotionBadge = ({ discount, size = 'md', variant = 'default' }) => {
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  if (variant === 'icon') {
    return (
      <div
        className={`bg-primary text-primary-foreground rounded-full font-bold shadow-lg flex items-center gap-1.5 ${sizes[size]}`}
      >
        <Tag className={iconSizes[size]} />
        -{discount}%
      </div>
    );
  }

  return (
    <div
      className={`bg-primary text-primary-foreground rounded-full font-bold shadow-sm ${sizes[size]}`}
    >
      -{discount}%
    </div>
  );
};