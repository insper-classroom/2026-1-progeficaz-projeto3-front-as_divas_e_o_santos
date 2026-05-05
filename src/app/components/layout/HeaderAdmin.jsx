import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Package, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { ThemeToggle } from '../ui/ThemeToggle';
import logo from "../../../assets/logo-insper.png";
import logoTextLight from "../../../assets/loja-insper.png";

export const HeaderAdmin = ({ userName }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <Link to="/" className="flex items-center gap-5 group">
            <div className="w-10 h-10 bg-primary dark:bg-[#d10204] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md">
              <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
            </div>
            <img src={logoTextLight} alt="Loja Insper" className="hidden sm:inline h-10 w-auto object-contain dark:invert self-center"/>    
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/dashboard')}
              className="gap-1.5"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/agendamentos')}
              className="gap-1.5"
            >
              <CalendarDays className="w-4 h-4" />
              <span className="hidden md:inline">Reservas</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin/produtos')}
              className="gap-1.5"
            >
              <Package className="w-4 h-4" />
              <span className="hidden md:inline">Produtos</span>
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
          </nav>
        </div>
      </div>
    </header>
  );
};