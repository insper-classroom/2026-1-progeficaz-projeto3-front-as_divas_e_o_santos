import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ShoppingBag } from 'lucide-react';

export default function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [acceptPromotions, setAcceptPromotions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    alert('Cadastro realizado com sucesso!');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Image */}
      <div className="hidden lg:flex lg:w-[65%] relative">
        <img
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=1080&fit=crop"
          alt="Community"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">Junte-se à Insper Store</h2>
          <p className="text-lg text-white/90 max-w-md">
            Faça parte da comunidade e tenha acesso a produtos exclusivos com descontos especiais
          </p>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full lg:w-[35%] bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          {/* Logo and Title */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">Insper Store</span>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              Criar conta
            </h1>
            <p className="text-muted-foreground text-base">
              Junte-se à comunidade Insper
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <Input
              label="Código de Verificação (opcional)"
              type="text"
              placeholder="Digite o código se tiver recebido"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            <label className="flex items-start gap-2 cursor-pointer pt-2">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded border-border accent-primary cursor-pointer"
                checked={acceptPromotions}
                onChange={(e) => setAcceptPromotions(e.target.checked)}
              />
              <span className="text-sm text-foreground">
                Quero receber promoções e novidades por email
              </span>
            </label>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate('/login')}
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-full">
                Cadastrar
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
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