import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Footer } from "../../components/layout/Footer";
import { HeaderAdmin } from "../../components/layout/HeaderAdmin";
import { Package, Plus, Edit } from "lucide-react";
import { backendProducts } from "../../../data/products";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("pt-BR") : "—";

export default function Produtos() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <HeaderAdmin userName="Admin" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
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

          <Button className="gap-2" onClick={() => navigate("/admin/produtos/cadastrar")}>
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        </div>

        <Card className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-border bg-muted">
                <th className="text-left py-4 px-4 font-semibold text-foreground">Nome</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">SKU</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Cor</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Tamanho</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Valor</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">Desconto</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Valor Final</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">Quantidade</th>
                <th className="text-left py-4 px-4 font-semibold text-foreground">Criado em</th>
                <th className="text-center py-4 px-4 font-semibold text-foreground">Editar</th>
              </tr>
            </thead>

            <tbody>
              {backendProducts.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-border hover:bg-accent transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image_url || "/images/product-placeholder.jpg"}
                        alt={product.nome}
                        className="w-16 h-16 object-cover rounded-lg border-2 border-border shadow-sm"
                      />
                      <span className="font-semibold text-foreground">
                        {product.nome}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-muted-foreground">
                    {product.sku}
                  </td>

                  <td className="py-4 px-4 text-muted-foreground">
                    {product.cor}
                  </td>

                  <td className="py-4 px-4 text-muted-foreground">
                    {product.tamanho}
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={
                        product.desconto > 0
                          ? "text-muted-foreground line-through"
                          : "text-foreground font-semibold"
                      }
                    >
                      {formatCurrency(product.valor)}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    {product.desconto > 0 ? (
                      <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-bold inline-block shadow-sm">
                        {product.desconto}%
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-lg text-primary">
                      {formatCurrency(product.valor_final)}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold inline-block ${
                        product.quantidade < 10
                          ? "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                          : "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                      }`}
                    >
                      {product.quantidade} un.
                    </span>
                  </td>

                  <td className="py-4 px-4 text-muted-foreground">
                    {formatDate(product.created_at)}
                  </td>

                  <td className="py-4 px-4 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/produtos/editar/${product._id}`)}
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