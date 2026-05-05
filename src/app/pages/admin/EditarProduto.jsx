import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Footer } from "../../components/layout/Footer";
import { HeaderAdmin } from "../../components/layout/HeaderAdmin";
import { ArrowLeft, Package, Image as ImageIcon, Save } from "lucide-react";
import { getBackendProductById } from "../../../data/products";

export default function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useMemo(() => getBackendProductById(id), [id]);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    valor: "",
    desconto: "",
    quantidade: "",
    cor: "",
    tamanho: "",
    sku: "",
    image_url: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        nome: product.nome || "",
        descricao: product.descricao || "",
        valor: String(product.valor ?? ""),
        desconto: String(product.desconto ?? 0),
        quantidade: String(product.quantidade ?? ""),
        cor: product.cor || "",
        tamanho: product.tamanho || "",
        sku: product.sku || "",
        image_url: product.image_url || "",
      });
    }
  }, [product]);

  const valorFinal = useMemo(() => {
    const valor = Number(formData.valor) || 0;
    const desconto = Number(formData.desconto) || 0;
    return valor - valor * (desconto / 100);
  }, [formData.valor, formData.desconto]);

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      _id: id,
      nome: formData.nome,
      descricao: formData.descricao,
      valor: Number(formData.valor),
      desconto: Number(formData.desconto),
      valor_final: valorFinal,
      quantidade: Number(formData.quantidade),
      cor: formData.cor,
      tamanho: formData.tamanho,
      sku: formData.sku,
      image_url: formData.image_url,
    };

    console.log("Produto editado (base para backend):", payload);

    alert("Base salva com sucesso. Depois você liga esse submit ao backend.");
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
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={handleChange("nome")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={formData.descricao}
                    onChange={handleChange("descricao")}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">
                    URL da imagem
                  </label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={handleChange("image_url")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Valor
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.valor}
                    onChange={handleChange("valor")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                    value={formData.desconto}
                    onChange={handleChange("desconto")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantidade
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={formData.quantidade}
                    onChange={handleChange("quantidade")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cor
                  </label>
                  <input
                    type="text"
                    value={formData.cor}
                    onChange={handleChange("cor")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Tamanho
                  </label>
                  <input
                    type="text"
                    value={formData.tamanho}
                    onChange={handleChange("tamanho")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={handleChange("sku")}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/produtos")}
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
                  {formData.image_url ? (
                    <img
                      src={formData.image_url}
                      alt={formData.nome}
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
                    {formData.nome || "Nome do produto"}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {formData.descricao || "Descrição do produto"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Valor final</span>
                  <span className="text-lg font-bold text-primary">
                    R$ {valorFinal.toFixed(2)}
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