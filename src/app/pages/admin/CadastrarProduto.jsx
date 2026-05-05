import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Footer } from "../../components/layout/Footer";
import { HeaderAdmin } from "../../components/layout/HeaderAdmin";
import { ArrowLeft, Package, Image as ImageIcon, Save } from "lucide-react";

export default function CadastrarProduto() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    discount: "0",
    stock: "",
    validity: "",
    description: "",
  });

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
      name: formData.name,
      image: formData.image,
      price: Number(formData.price),
      discount: Number(formData.discount),
      finalPrice,
      stock: Number(formData.stock),
      validity: formData.validity,
      description: formData.description,
    };

    console.log("Novo produto (base para backend):", payload);

    alert("Base do cadastro criada. Depois você liga esse formulário ao backend.");
    navigate("/admin/produtos");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <HeaderAdmin userName="Admin" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
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
              Cadastrar Produto
            </h1>
          </div>
          <p className="text-muted-foreground">
            Preencha os dados do novo produto antes de salvar no banco.
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={handleChange("description")}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                    placeholder="Descreva o produto"
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
                  Salvar produto
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
                      alt={formData.name || "Prévia do produto"}
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