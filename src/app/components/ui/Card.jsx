export const Card = ({ children, hover = false, className = '', ...props }) => {
  return (
    <div
      className={`bg-card text-card-foreground border border-border rounded-lg shadow-sm ${
        hover
          ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};