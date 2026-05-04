import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactSlick from "react-slick";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { PromotionBadge } from './PromotionBadge';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slider = ReactSlick.default ?? ReactSlick;

const carouselThemes = [
  { bg: '#3ACC9F', fg: '#0E171D' },
  { bg: '#FFE066', fg: '#0E171D' },
  { bg: '#0E171D', fg: '#FFFFFF' },
];

const getSlideTheme = (index) => carouselThemes[index % carouselThemes.length];

export const ProductCarousel = ({ products }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    appendDots: (dots) => (
      <div className="absolute bottom-6">
        <ul className="flex gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 bg-white/40 rounded-full hover:bg-white/60 transition-all duration-300 cursor-pointer" />
    ),
  };

  return (
    <div className="relative group">
      <Slider ref={sliderRef} {...settings}>
        {products.map((product, index) => {
          const theme = getSlideTheme(index);
          const descriptionColor = theme.bg === '#0E171D' ? '#FFFFFF' : '#0E171D';

          return (
            <div key={product.id}>
              <Card
                className="overflow-hidden relative transition-colors duration-300"
                style={{
                  backgroundColor: theme.bg,
                  color: theme.fg,
                  '--foreground': theme.fg,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
                <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 relative z-10">
                  <div className="flex flex-col justify-center order-2 md:order-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-primary font-semibold text-sm md:text-base">DESTAQUE</span>
                      {product.discount && product.discount > 0 && (
                        <PromotionBadge discount={product.discount} size="md" />
                      )}
                    </div>

                    <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">
                      {product.name}
                    </h1>

                    <p
                      className="text-sm md:text-base mb-4 md:mb-6"
                      style={{ color: descriptionColor }}
                    >
                      {product.description}
                    </p>

                    <div className="flex items-baseline gap-2 md:gap-3 mb-4 md:mb-6">
                      {product.originalPrice && product.originalPrice > product.price ? (
                        <>
                          <span className="text-base md:text-lg text-muted-foreground line-through">
                            R$ {product.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-3xl md:text-4xl font-bold text-primary">
                            R$ {product.price.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-3xl md:text-4xl font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Button
                      className="w-full md:w-fit"
                      onClick={() => navigate(`/produto/${product.id}`)}
                    >
                      Ver Produto
                    </Button>
                  </div>

                  <div className="rounded-lg overflow-hidden relative group/image order-1 md:order-2 h-64 md:h-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      </Slider>

      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card/95 hover:bg-card rounded-full shadow-lg hover:shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 border border-border"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-card/95 hover:bg-card rounded-full shadow-lg hover:shadow-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 border border-border"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>
    </div>
  );
};