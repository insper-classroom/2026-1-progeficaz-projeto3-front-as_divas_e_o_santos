import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ShoppingBag } from "lucide-react";
import { getBackendUserByEmail } from "../../../data/user";
import { signIn } from "../../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = getBackendUserByEmail(formData.email);

    if (!user) {
      setError("Usuário não encontrado.");
      return;
    }

    signIn(user._id);

    if (user.isAdmin) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-[65%] relative">
        <img
          src="/fachada-lojinha.jpeg"
          alt="Insper Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">Insper Store</h2>
          <p className="text-lg text-white/90 max-w-md">
            Bem-vindo à loja oficial do Insper
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[35%] flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">
                Insper Store
              </span>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              Entrar
            </h1>
            <p className="text-muted-foreground text-base">
              Acesse sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange("email")}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange("password")}
              required
            />

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/recuperar-senha"
                className="text-primary hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" className="w-full mt-4" size="lg">
              Entrar
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link to="/cadastro" className="text-primary hover:underline">
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}