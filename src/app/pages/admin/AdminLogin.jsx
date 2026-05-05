import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Shield } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[65%] relative">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop"
          alt="Admin"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4">Painel Administrativo</h2>
          <p className="text-lg text-white/90 max-w-md">
            Gerencie produtos, estoque, reservas e usuários da Loja Insper
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[35%] bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-[400px]">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-primary">Admin Insper Store</span>
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-3">
              Área Administrativa
            </h1>
            <p className="text-muted-foreground text-base">
              Acesso restrito a administradores
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Email Administrativo"
              type="email"
              placeholder="admin@insper.edu.br"
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

            <Button type="submit" className="w-full mt-8" size="lg">
              Entrar como Administrador
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <a
                href="/"
                className="text-primary font-semibold hover:text-primary/80 hover:underline transition-colors"
              >
                ← Voltar para a loja
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}