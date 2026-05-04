import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '../../components/layout/Header';
import { ProductCarousel } from '../../components/product/ProductCarousel';
import { ProductCard } from '../../components/product/ProductCard';
import { Footer } from '../../components/layout/Footer';

const featuredProducts = [
  {
    id: 7,
    name: 'Moletom Insper Edição Limitada',
    price: 199.90,
    originalPrice: 249.90,
    discount: 20,
    description: 'Moletom premium em edição limitada com bordado exclusivo',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&h=500&fit=crop'
  },
  {
    id: 8,
    name: 'Kit Insper Completo',
    price: 349.90,
    originalPrice: 449.90,
    discount: 22,
    description: 'Kit completo com moletom, camiseta e boné',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=500&fit=crop'
  },
  {
    id: 9,
    name: 'Jaqueta Insper Premium',
    price: 299.90,
    description: 'Jaqueta premium com forro interno e logo bordado',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=500&fit=crop'
  }
];

const products = [
  {
    id: 1,
    name: 'Moletom Insper Premium',
    description: 'Moletom premium em edição limitada com bordado exclusivo',
    price: 151.92,
    originalPrice: 189.90,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Camiseta Insper Básica',
    description: 'Camiseta confortável para o dia a dia.',
    price: 71.91,
    originalPrice: 79.90,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Boné Insper',
    description: 'Boné leve com ajuste regulável.',
    price: 59.90,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Mochila Insper',
    description: 'Design moderno com compartimentos funcionais, garantindo organização e praticidade para sua rotina.',
    price: 212.42,
    originalPrice: 249.90,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Caneca Insper',
    description: 'Caneca resistente e elegante, perfeita para seu café do dia a dia.',
    price: 39.90,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Garrafa Térmica',
    description: 'Garrafa térmica que mantém sua bebida na temperatura ideal por horas.',
    price: 71.92,
    originalPrice: 89.90,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop'
  },
];

export default function Home() {
  const [isLoggedIn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <Header isLoggedIn={isLoggedIn} userName="João Silva" isAdmin={true} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">Ofertas Especiais</h2>
            <p className="text-muted-foreground">Aproveite nossos produtos em destaque com descontos exclusivos</p>
          </div>
          <ProductCarousel products={featuredProducts} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">Todos os Produtos</h2>
              <p className="text-sm text-muted-foreground">{products.length} produtos disponíveis</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">Ordenar por:</span>
              <select className="px-4 py-2 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer hover:border-primary/50 w-full sm:w-auto">
                <option>Relevância</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
                <option>Mais vendidos</option>
                <option>Novidades</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
