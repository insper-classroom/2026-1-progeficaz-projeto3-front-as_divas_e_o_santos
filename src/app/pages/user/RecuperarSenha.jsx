import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { ArrowLeft, Mail } from "lucide-react";
import logo from "../../../assets/logo-insper.png";
import logoTextLight from "../../../assets/loja-insper.png";

export default function RecuperarSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email,
    };

    console.log("Pedido de recuperação de senha:", payload);

    alert("Link de recuperação enviado. Depois isso será integrado ao backend.");
    navigate("/login");
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
            Recuperação de senha rápida e segura para sua conta
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[35%] flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o login
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary dark:bg-[#d10204] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />    
              </div>
                <img src={logoTextLight} alt="Loja Insper" className="hidden sm:inline h-12 w-auto object-contain dark:invert self-center"/>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              Esqueceu a senha?
            </h1>
            <p className="text-muted-foreground text-base">
              Informe seu email para receber instruções de redefinição.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" className="w-full mt-8 gap-2" size="lg">
              <Mail className="w-4 h-4" />
              Enviar instruções
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}