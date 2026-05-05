import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Footer } from "../../components/layout/Footer";
import { HeaderAdmin } from "../../components/layout/HeaderAdmin";
import { LogOut, ShoppingBag, Package, Plus, Edit } from "lucide-react";
import { initialProducts } from "../../../data/products";

export default function Produtos() {
  const navigate = useNavigate();
  const products = initialProducts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <HeaderAdmin userName="Admin" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Gerenciamento de Produtos
              </h1>
            </div>
            <p className="text-muted-foreground">
              Gerencie o catálogo completo de produtos
            </p>
          </div>

          <Button
            className="gap-2"
            onClick={() => navigate("/admin/produtos/cadastrar")}
          >
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted">
                <th className="text-center py-4 px-4 font-semibold text-foreground">
                  Estoque
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">
                  Imagem
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Nome
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Valor
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">
                  Desconto
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Preço Final
                </th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">
                  Validade
                </th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">
                  Editar
                </th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-border hover:bg-accent transition-colors"
                >
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-block ${
                        product.stock < 10
                          ? "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                          : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
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
                    <span className="font-semibold text-foreground">
                      {product.name}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={
                        product.discount > 0
                          ? "text-muted-foreground line-through"
                          : "text-foreground font-semibold"
                      }
                    >
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
                    <span
                      className={`font-bold text-lg ${
                        product.discount > 0 ? "text-primary" : "text-foreground"
                      }`}
                    >
                      R$ {product.finalPrice.toFixed(2)}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="text-muted-foreground">
                      {product.validity}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigate(`/admin/produtos/editar/${product.id}`)
                      }
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

      <Footer />
    </div>
  );
}