import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { PromotionBadge } from "../../components/product/PromotionBadge";
import { ArrowLeft, Minus, Plus, Tag } from "lucide-react";
import { Footer } from "../../components/layout/Footer";
import { isAuthenticated } from "../../utils/auth";
import { currentUser as getCurrentUser } from "../../../data/user";
import {
  getBackendProductGroupById,
  getVariantSizes,
  getVariantColors,
  getClosestVariant,
} from "../../../data/products";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value || 0));

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isLoggedIn = isAuthenticated();
  const currentUser = getCurrentUser();

  const { selectedProduct, variants } = useMemo(
    () => getBackendProductGroupById(id),
    [id]
  );

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!variants.length) return;

    const firstVariant = variants[0];
    setSelectedSize(firstVariant.tamanho ?? "");
    setSelectedColor(firstVariant.cor ?? "");
    setQuantity(1);
  }, [variants]);

  const availableSizes = useMemo(() => getVariantSizes(variants), [variants]);
  const availableColors = useMemo(() => getVariantColors(variants), [variants]);

  const currentVariant = useMemo(() => {
    return getClosestVariant(variants, selectedSize, selectedColor);
  }, [variants, selectedSize, selectedColor]);

  useEffect(() => {
    if (!currentVariant) return;
    if (quantity > currentVariant.quantidade) {
      setQuantity(currentVariant.quantidade || 1);
    }
  }, [currentVariant, quantity]);

  const handleSelectSize = (size) => {
    const nextVariant =
      variants.find(
        (variant) => variant.tamanho === size && variant.cor === selectedColor
      ) || variants.find((variant) => variant.tamanho === size) || null;

    setSelectedSize(size);
    if (nextVariant?.cor) {
      setSelectedColor(nextVariant.cor);
    }
  };

  const handleSelectColor = (color) => {
    const nextVariant =
      variants.find(
        (variant) => variant.cor === color && variant.tamanho === selectedSize
      ) || variants.find((variant) => variant.cor === color) || null;

    setSelectedColor(color);
    if (nextVariant?.tamanho) {
      setSelectedSize(nextVariant.tamanho);
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity((current) => {
      const next = current + delta;
      if (!currentVariant) return 1;
      return Math.max(1, Math.min(next, currentVariant.quantidade || 1));
    });
  };

  const handleReserve = () => {
    if (!currentVariant) return;

    alert(
      `Produto reservado com sucesso!\n` +
        `Produto: ${currentVariant.nome}\n` +
        `Quantidade: ${quantity}\n` +
        `Tamanho: ${currentVariant.tamanho}\n` +
        `Cor: ${currentVariant.cor}`
    );

    navigate("/perfil");
  };

  if (!selectedProduct || !currentVariant) {
    return (
      <div className="min-h-screen bg-background">
        <Header isLoggedIn={isLoggedIn} userName={currentUser?.nome ?? ""} />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Produto não encontrado.
            </p>
            <Button onClick={() => navigate("/")}>Voltar para a home</Button>
          </Card>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <Header isLoggedIn={isLoggedIn} userName={currentUser?.nome ?? ""} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-all duration-200 hover:translate-x-[-4px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="overflow-hidden">
            <div className="aspect-square bg-muted">
              <img
                src={currentVariant.image_url}
                alt={currentVariant.nome}
                className="w-full h-full object-cover"
              />
            </div>
          </Card>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {currentVariant.desconto > 0 && (
                  <PromotionBadge discount={currentVariant.desconto} />
                )}
                <span className="text-sm text-muted-foreground">
                  SKU: {currentVariant.sku}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-foreground mb-3">
                {currentVariant.nome}
              </h1>

              <p className="text-muted-foreground leading-relaxed">
                {currentVariant.descricao}
              </p>
            </div>

            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(currentVariant.valor_final)}
              </span>
              {currentVariant.desconto > 0 && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatCurrency(currentVariant.valor)}
                </span>
              )}
            </div>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Tamanho
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSelectSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Cor</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleSelectColor(color)}
                    className={`px-4 py-2 rounded-lg border transition-colors capitalize ${
                      selectedColor === color
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:border-primary"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Quantidade
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>

                <Input
                  value={quantity}
                  readOnly
                  className="w-20 text-center"
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= (currentVariant.quantidade || 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>

                <span className="text-sm text-muted-foreground">
                  {currentVariant.quantidade} em estoque
                </span>
              </div>
            </Card>

            <Button className="w-full" size="lg" onClick={handleReserve}>
              Reservar produto
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}