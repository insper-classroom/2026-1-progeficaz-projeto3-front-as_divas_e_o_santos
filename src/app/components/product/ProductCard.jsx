import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { ShoppingCart } from 'lucide-react';
import { PromotionBadge } from './PromotionBadge';

export const ProductCard = ({ id, name, price, originalPrice, discount, image }) => {
  const navigate = useNavigate();
  const hasPromotion = discount && discount > 0;

  return (
    <Card
      hover
      className={`overflow-hidden cursor-pointer group relative transition-all duration-300 ${
        hasPromotion ? 'ring-2 ring-primary/20 hover:ring-primary/40' : ''
      }`}
      onClick={() => navigate(`/produto/${id}`)}
    >
      {hasPromotion && (
        <div className="absolute top-3 right-3 z-10 animate-in fade-in slide-in-from-top-2 duration-500">
          <PromotionBadge discount={discount} />
        </div>
      )}

      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors duration-200">
          {name}
        </h3>

        <div className="flex flex-col gap-2 mb-3">
          {originalPrice && originalPrice > price ? (
            <>
              <span className="text-sm text-muted-foreground line-through">
                R$ {originalPrice.toFixed(2)}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-primary">
                  R$ {price.toFixed(2)}
                </span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  Economize R$ {(originalPrice - price).toFixed(2)}
                </span>
              </div>
            </>
          ) : (
            <span className="text-2xl font-bold text-primary">
              R$ {price.toFixed(2)}
            </span>
          )}
        </div>

        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/produto/${id}`);
          }}
          className="w-full gap-1.5 group-hover:shadow-lg"
        >
          <ShoppingCart className="w-4 h-4" />
          Ver Produto
        </Button>
      </div>
    </Card>
  );
};