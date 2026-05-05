import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "../../components/layout/Header";
import { ProductCarousel } from "../../components/product/ProductCarousel";
import { ProductCard } from "../../components/product/ProductCard";
import { Footer } from "../../components/layout/Footer";
import api from "../../utils/api";
import { mapBackendProductToUi } from "../../../data/products";
import { isAuthenticated } from "../../utils/auth";
import { currentUser as getCurrentUser } from "../../../data/user";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/");

        const backendProducts = Array.isArray(response.data)
          ? response.data
          : [];

        const formattedProducts = backendProducts.map(mapBackendProductToUi);

        setProducts(formattedProducts);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Não foi possível carregar os produtos.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = useMemo(
    () => products.filter((product) => Number(product.discount) > 0),
    [products]
  );

  const isLoggedIn = isAuthenticated();
  const currentUser = getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <Header isLoggedIn={isLoggedIn} userName={currentUser?.nome ?? ""} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-foreground mb-2">
              Ofertas Especiais
            </h2>
            <p className="text-muted-foreground">
              Aproveite nossos produtos em destaque com descontos exclusivos
            </p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-border bg-background/60 p-6 text-muted-foreground">
              Carregando produtos...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-border bg-background/60 p-6 text-muted-foreground">
              {error}
            </div>
          ) : featuredProducts.length > 0 ? (
            <ProductCarousel products={featuredProducts} />
          ) : (
            <div className="rounded-2xl border border-border bg-background/60 p-6 text-muted-foreground">
              Nenhuma oferta em destaque no momento.
            </div>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">
                Todos os Produtos
              </h2>
              <p className="text-sm text-muted-foreground">
                {loading ? "Carregando..." : `${products.length} produtos disponíveis`}
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">
                Ordenar por:
              </span>
              <select className="px-4 py-2 border-2 border-border rounded-lg bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer hover:border-primary/50 w-full sm:w-auto">
                <option>Relevância</option>
                <option>Menor preço</option>
                <option>Maior preço</option>
                <option>Mais vendidos</option>
                <option>Novidades</option>
              </select>
            </div>
          </div>

          {!loading && !error && products.length === 0 ? (
            <div className="rounded-2xl border border-border bg-background/60 p-6 text-muted-foreground">
              Nenhum produto encontrado.
            </div>
          ) : (
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
          )}
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}