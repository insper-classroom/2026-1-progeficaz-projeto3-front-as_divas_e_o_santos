import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Settings, MessageSquarePlus, Shield } from 'lucide-react';
import { Button } from './Button';
import { ThemeToggle } from './ThemeToggle';

export const Header = ({ isLoggedIn = false, userName, isAdmin = false }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary hidden sm:inline">Insper Store</span>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin/dashboard')}
                className="gap-1.5 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Administrador</span>
              </Button>
            )}

            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/sugestao')}
                  className="gap-1.5"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span className="hidden md:inline">Enviar sugestão</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/configuracoes')}
                  className="gap-1.5"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden lg:inline">Configurações</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/perfil')}
                  className="gap-1.5"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{userName || 'Perfil'}</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="gap-1.5"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sair</span>
                </Button>
              </>
            ) : (
              <Button size="sm" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};