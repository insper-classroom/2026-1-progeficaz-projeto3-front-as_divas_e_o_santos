import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import logo from "../../../assets/logo-insper.png";
import logoTextLight from "../../../assets/loja-insper.png";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[65%] relative">
        <img
          src="/public/fachada-lojinha.jpeg"
          alt="Store"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">Loja Insper</h2>
          <p className="text-lg text-white/90 max-w-md">
            Produtos exclusivos com qualidade premium para a comunidade Insper
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[35%] bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary dark:bg-[#d10204] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
                <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />    
              </div>
                <img src={logoTextLight} alt="Loja Insper" className="hidden sm:inline h-12 w-auto object-contain dark:invert self-center"/>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              Entrar na sua conta
            </h1>
            <p className="text-muted-foreground text-base">
              Bem-vindo de volta!
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <div className="flex items-center justify-between text-sm pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
                <span className="text-foreground">Lembrar-me</span>
              </label>
              <Link
                to="/recuperar"
                className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" className="w-full mt-8" size="lg">
              Entrar
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link
                to="/cadastro"
                className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}