import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ThemeToggle } from '../../components/ThemeToggle';
import { LogOut, ShoppingBag, Package, Plus, Edit } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Moletom Insper Premium',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop',
    price: 189.90,
    discount: 20,
    finalPrice: 151.92,
    stock: 45,
    validity: '31/12/2027'
  },
  {
    id: 2,
    name: 'Camiseta Insper Básica',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
    price: 79.90,
    discount: 10,
    finalPrice: 71.91,
    stock: 120,
    validity: '31/12/2027'
  },
  {
    id: 3,
    name: 'Boné Insper',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=100&h=100&fit=crop',
    price: 59.90,
    discount: 0,
    finalPrice: 59.90,
    stock: 8,
    validity: '30/06/2027'
  },
  {
    id: 4,
    name: 'Mochila Insper',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
    price: 249.90,
    discount: 15,
    finalPrice: 212.42,
    stock: 30,
    validity: '31/12/2027'
  },
  {
    id: 5,
    name: 'Caneca Insper',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=100&h=100&fit=crop',
    price: 39.90,
    discount: 0,
    finalPrice: 39.90,
    stock: 5,
    validity: '31/12/2026'
  },
  {
    id: 6,
    name: 'Garrafa Térmica',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
    price: 89.90,
    discount: 20,
    finalPrice: 71.92,
    stock: 25,
    validity: '31/12/2027'
  }
];

export default function Produtos() {
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary hidden sm:inline">Admin Insper Store</span>
            </div>

            <nav className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')}>
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/agendamentos')}>
                Reservas
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/produtos')} className="text-primary">
                Produtos
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-1.5">
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Produtos</h1>
            </div>
            <p className="text-muted-foreground">Gerencie o catálogo completo de produtos</p>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted">
                <th className="text-center py-4 px-4 font-semibold text-foreground">Estoque</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">Imagem</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Nome</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Valor</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">Desconto</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Preço Final</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Validade</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">Editar</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-accent transition-colors">
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-block ${
                        product.stock < 10
                          ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800'
                          : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                      }`}
                    >
                      {product.stock} un.
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-border shadow-sm"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-foreground">{product.name}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={product.discount > 0 ? 'text-muted-foreground line-through' : 'text-foreground font-semibold'}>
                      R$ {product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {product.discount > 0 ? (
                      <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-bold inline-block shadow-sm">
                        {product.discount}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-bold text-lg ${product.discount > 0 ? 'text-primary' : 'text-foreground'}`}>
                      R$ {product.finalPrice.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-muted-foreground">{product.validity}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProduct(product.id)}
                      className="gap-1.5"
                    >
                      <Edit className="w-4 h-4" />
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </main>
    </div>
  );
}