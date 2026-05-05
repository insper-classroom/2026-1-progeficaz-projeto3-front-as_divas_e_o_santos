import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import api from "../../utils/api";
import { signIn } from "../../utils/auth";
import logo from "../../../assets/logo-insper.png";
import logoTextLight from "../../../assets/loja-insper.png";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = new URLSearchParams();
      payload.append("email", formData.email.trim());
      payload.append("pwd", formData.password);

      const response = await api.post("/auth/login", payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        validateStatus: () => true,
      });

      if (typeof response.data === "string") {
        setError("Email ou senha inválidos.");
        return;
      }

      signIn({
        email: formData.email.trim().toLowerCase(),
        nome: "",
        isAdmin: false,
      });

      navigate("/", { replace: true });
    } catch {
      setError("Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex lg:w-[65%] relative">
        <img
          src="/fachada-lojinha.jpeg"
          alt="Loja Insper"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">Loja Insper</h2>
          <p className="text-lg text-white/90 max-w-md">
            Bem-vindo à loja oficial do Insper
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[35%] flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary dark:bg-[#d10204] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <img
                src={logoTextLight}
                alt="Loja Insper"
                className="hidden sm:inline h-12 w-auto object-contain dark:invert self-center"
              />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">Entrar</h1>
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

            <Button
              type="submit"
              className="w-full mt-4"
              size="lg"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
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