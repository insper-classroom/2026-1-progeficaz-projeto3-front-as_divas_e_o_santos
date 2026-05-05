import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import api from "../../utils/api";
import logo from "../../../assets/logo-insper.png";
import logoTextLight from "../../../assets/loja-insper.png";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      const payload = new URLSearchParams();
      payload.append("nome", nome.trim());
      payload.append("email", email.trim());
      payload.append("pwd", password);

      const response = await api.post("/auth/registro", payload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        validateStatus: () => true,
      });

      if (response.status >= 400) {
        setError(response.data?.erro || "Erro ao cadastrar usuário.");
        return;
      }

      navigate("/login", { replace: true });
    } catch {
      setError("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[65%] relative">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop"
          alt="Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">
            Junte-se à comunidade Insper
          </h2>
          <p className="text-lg text-white/90 max-w-md">
            Faça parte da comunidade e tenha acesso a produtos exclusivos com descontos especiais
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[35%] bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-primary dark:bg-[#d10204] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-8 h-8 object-contain"
                />
              </div>
              <img
                src={logoTextLight}
                alt="Loja Insper"
                className="hidden sm:inline h-12 w-auto object-contain dark:invert self-center"
              />
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              Criar conta
            </h1>
            <p className="text-muted-foreground text-base">
              Junte-se à comunidade Insper
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nome"
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {error && (
              <p className="text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/login")}
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
              >
                Entrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}