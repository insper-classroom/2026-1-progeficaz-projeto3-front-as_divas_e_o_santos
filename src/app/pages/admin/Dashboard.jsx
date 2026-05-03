import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { ThemeToggle } from '../../components/ThemeToggle';
import { ReservationModal } from '../../components/admin/ReservationModal';
import { Package, AlertTriangle, Calendar, LogOut, ShoppingBag, TrendingUp, Info } from 'lucide-react';

const todayReservations = [
  {
    id: 1,
    client: 'João Silva',
    email: 'joao.silva@insper.edu.br',
    phone: '(11) 98765-4321',
    items: ['Moletom Insper Premium', 'Camiseta Básica'],
    pickupTime: '09:00',
    pickupDate: '27/04/2026'
  },
  {
    id: 2,
    client: 'Maria Santos',
    email: 'maria.santos@insper.edu.br',
    phone: '(11) 97654-3210',
    items: ['Boné Insper'],
    pickupTime: '10:30',
    pickupDate: '27/04/2026'
  },
  {
    id: 3,
    client: 'Pedro Oliveira',
    email: 'pedro.oliveira@insper.edu.br',
    phone: '(11) 96543-2109',
    items: ['Mochila Insper', 'Garrafa Térmica', 'Caneca Insper'],
    pickupTime: '14:00',
    pickupDate: '27/04/2026'
  },
  {
    id: 4,
    client: 'Ana Costa',
    email: 'ana.costa@insper.edu.br',
    phone: '(11) 95432-1098',
    items: ['Kit Insper Completo'],
    pickupTime: '16:30',
    pickupDate: '27/04/2026'
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-primary hidden sm:inline">Admin Insper Store</span>
            </div>

            <nav className="flex items-center gap-2 sm:gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/dashboard')} className="text-primary">
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/agendamentos')}>
                Reservas
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin/produtos')}>
                Produtos
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="gap-1.5">
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">Visão geral do sistema - {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 hover:shadow-lg transition-all duration-300 group" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">32</p>
            <p className="text-sm text-muted-foreground">Produtos Vendidos Hoje</p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-green-600 dark:text-green-400">
                +18% em relação a ontem
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 group border-orange-200 dark:border-orange-800" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-orange-500 dark:bg-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">5</p>
            <p className="text-sm text-muted-foreground">Produtos com Estoque Baixo</p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
                Atenção: Requer reposição
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 group" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-blue-500 dark:bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">{todayReservations.length}</p>
            <p className="text-sm text-muted-foreground">Agendamentos de Hoje</p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Próximo às {todayReservations[0]?.pickupTime}
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-foreground mb-1">Reservas de Hoje</h2>
            <p className="text-sm text-muted-foreground">Agendamentos programados para {new Date().toLocaleDateString('pt-BR')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {todayReservations.map((reservation) => (
              <Card key={reservation.id} className="p-4 hover:shadow-md transition-all border-2" hover>
                <div className="mb-3">
                  <p className="font-bold text-foreground mb-1">{reservation.client}</p>
                  <p className="text-sm text-muted-foreground mb-2">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {reservation.pickupTime}
                  </p>
                  <div className="space-y-1">
                    {reservation.items.map((item, idx) => (
                      <p key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <Package className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{item}</span>
                      </p>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenDetails(reservation)}
                  className="w-full gap-1.5"
                >
                  <Info className="w-4 h-4" />
                  Saiba mais
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </main>

      <ReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reservation={selectedReservation}
      />
    </div>
  );
}