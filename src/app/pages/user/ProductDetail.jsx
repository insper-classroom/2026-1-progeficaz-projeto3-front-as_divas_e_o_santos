import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PromotionBadge } from '../../components/product/PromotionBadge';
import { ArrowLeft, Minus, Plus, Tag } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';
import { isAuthenticated } from "../../utils/auth";
import { currentUser } from "../../../data/user";
import { currentUser as getCurrentUser } from "../../../data/user";

const productDetails = {
  1: {
    name: 'Moletom Insper Premium',
    price: 151.92,
    originalPrice: 189.90,
    discount: 20,
    description: 'Moletom de alta qualidade com logo bordado do Insper. Tecido 80% algodão e 20% poliéster, ideal para o clima de São Paulo. Disponível em diversas cores.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Vermelho', 'Preto', 'Branco', 'Cinza']
  },
  2: {
    name: 'Camiseta Insper Básica',
    price: 71.91,
    originalPrice: 79.90,
    discount: 10,
    description: 'Camiseta básica 100% algodão com logo do Insper. Confortável e perfeita para o dia a dia.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Vermelho']
  },
  3: {
    name: 'Boné Insper',
    price: 59.90,
    description: 'Boné ajustável com logo bordado do Insper. Proteção UV e conforto garantido.',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop',
    sizes: ['Único'],
    colors: ['Vermelho', 'Preto', 'Branco']
  },
  4: {
    name: 'Mochila Insper',
    price: 212.42,
    originalPrice: 249.90,
    discount: 15,
    description: 'Mochila resistente com compartimento para notebook até 15 polegadas. Material impermeável e alças acolchoadas.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop',
    sizes: ['Único'],
    colors: ['Preto', 'Vermelho']
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Vermelho');

  const product = productDetails[Number(id)] || productDetails[1];
  const hasPromotion = product.discount && product.discount > 0;
  const currentUser = getCurrentUser();

  const handleReserve = () => {
    alert(`Produto reservado com sucesso!\nQuantidade: ${quantity}\nTamanho: ${selectedSize}\nCor: ${selectedColor}`);
    navigate('/perfil');
  };

  const isLoggedIn = isAuthenticated();

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} userName={currentUser?.nome ?? ''} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-all duration-200 hover:translate-x-[-4px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a loja
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="overflow-hidden p-0 relative group">
            {hasPromotion && (
              <div className="absolute top-4 right-4 z-10">
                <PromotionBadge discount={product.discount} size="lg" variant="icon" />
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Card>

          <div className="space-y-6">
            <div>
              {hasPromotion && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-3">
                  <Tag className="w-4 h-4" />
                  Promoção Especial
                </div>
              )}
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <div className="mb-4">
                {product.originalPrice && product.originalPrice > product.price ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl text-muted-foreground line-through">
                      De R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm text-primary font-semibold">Por apenas</span>
                      <span className="text-4xl font-bold text-primary">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                )}
                {hasPromotion && (
                  <p className="text-sm font-medium mt-2 text-green-600 dark:text-green-400">
                    Você economiza R$ {(product.originalPrice - product.price).toFixed(2)}
                  </p>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Card className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3">Tamanho</label>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded-lg transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Cor</label>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded-lg transition-all ${
                        selectedColor === color
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Quantidade</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center w-20"
                    min="1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleReserve}
              >
                Reservar Produto
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}