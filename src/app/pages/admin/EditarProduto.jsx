import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Footer } from "../../components/layout/Footer";
import { HeaderAdmin } from "../../components/layout/HeaderAdmin";
import { ArrowLeft, Package, Image as ImageIcon, Save, Trash2 } from "lucide-react";
import { getProductById } from "../../../data/products";

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useMemo(() => getProductById(id), [id]);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    discount: "",
    stock: "",
    validity: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        image: product.image || "",
        price: String(product.price ?? ""),
        discount: String(product.discount ?? 0),
        stock: String(product.stock ?? ""),
        validity: product.validity || "",
      });
    }
  }, [product]);

  const finalPrice = useMemo(() => {
    const price = Number(formData.price) || 0;
    const discount = Number(formData.discount) || 0;
    return price - price * (discount / 100);
  }, [formData.price, formData.discount]);

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      id: Number(id),
      name: formData.name,
      image: formData.image,
      price: Number(formData.price),
      discount: Number(formData.discount),
      finalPrice,
      stock: Number(formData.stock),
      validity: formData.validity,
    };

    console.log("Produto editado (base para backend):", payload);

    alert("Alteração salva com sucesso.");
    navigate("/admin/produtos");
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <HeaderAdmin userName="Admin" />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Produto não encontrado
            </h1>
            <p className="text-muted-foreground mb-6">
              Não foi possível localizar o produto para edição.
            </p>
            <Button onClick={() => navigate("/admin/produtos")}>
              Voltar para produtos
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <HeaderAdmin userName="Admin" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/admin/produtos")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-all duration-200 hover:translate-x-[-4px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para produtos
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Editar Produto
            </h1>
          </div>
          <p className="text-muted-foreground">
            Atualize as informações do produto antes de salvar no banco.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nome do produto
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange("name")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Ex: Moletom Insper Premium"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URL da imagem
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={handleChange("image")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preço original
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={handleChange("price")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Desconto (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={formData.discount}
                    onChange={handleChange("discount")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Estoque
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange("stock")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Validade
                  </label>
                  <input
                    type="text"
                    value={formData.validity}
                    onChange={handleChange("validity")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="31/12/2027"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/produtos")}
                  className="gap-2"
                >
                  Cancelar
                </Button>

                <Button type="submit" className="gap-2">
                  <Save className="w-4 h-4" />
                  Salvar alterações
                </Button>
              </div>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Prévia do produto
              </h2>

              <div className="space-y-4">
                <div className="aspect-square rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <ImageIcon className="w-10 h-10 mx-auto mb-2" />
                      <span className="text-sm">Sem imagem</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {formData.name || "Nome do produto"}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Validade: {formData.validity || "—"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Preço final</span>
                  <span className="text-lg font-bold text-primary">
                    R$ {finalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estoque</span>
                  <span className="font-semibold text-foreground">
                    {formData.stock || "0"} un.
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}