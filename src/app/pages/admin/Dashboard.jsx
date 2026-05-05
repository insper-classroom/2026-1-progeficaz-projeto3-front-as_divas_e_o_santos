import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { ReservationModal } from '../../components/admin/ReservationModal';
import { Package, AlertTriangle, Calendar, LogOut, ShoppingBag, TrendingUp, Info } from 'lucide-react';
import { Footer } from '../../components/layout/Footer';
import { HeaderAdmin } from '../../components/layout/HeaderAdmin';
import { useMemo } from "react";
import { backendReservations, mapBackendReservationToUi } from "../../../data/reservas";
import { getBackendUserById } from "../../../data/user";
import { getBackendProductById } from "../../../data/products";
import { getCurrentUser } from "../../../data/user";


export default function Dashboard() {
  
  const currentUser = getCurrentUser();
  const todayReservations = useMemo(() => {
    return backendReservations.map((reservation) => {
      const user = getBackendUserById(reservation.usuario_id);
      const product = getBackendProductById(reservation.produto_id);

      return {
        id: reservation._id,
        client: user?.nome ?? "Usuário",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        items: [product?.nome ?? "Produto"],
        pickupTime: new Date(reservation.data_reserva).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        pickupDate: new Date(reservation.data_reserva).toLocaleDateString("pt-BR"),
      };
    });
  }, []);

  const navigate = useNavigate();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (reservation) => {
    setSelectedReservation(reservation);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <HeaderAdmin userName={currentUser?.nome ?? "Admin"} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Administrativo</h1>
          <p className="text-muted-foreground">
            Visão geral do sistema - {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

          <Card className="p-6 hover:shadow-lg transition-all duration-300 group" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-[#3ACC9F] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">
              {backendReservations.length}
            </p>
            <p className="text-sm text-muted-foreground">Produtos Vendidos Hoje</p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-[#3ACC9F]">
                +18% em relação a ontem
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 group border-[#d10204]" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-[#d10204] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">5</p>
            <p className="text-sm text-muted-foreground">Produtos com Estoque Baixo</p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-[#d10204]">
                Atenção: Requer reposição
              </p>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all duration-300 group border-[#FFE066]" hover>
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-[#FFE066] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">
              {todayReservations.length}
            </p>
            <p className="text-sm text-muted-foreground">Agendamentos de Hoje</p>
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-xs font-medium text-[#FFE066]">
                Próximo às {todayReservations[0]?.pickupTime}
              </p>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold text-foreground mb-1">Reservas de Hoje</h2>
            <p className="text-sm text-muted-foreground">
              Agendamentos programados para {new Date().toLocaleDateString('pt-BR')}
            </p>
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

      <Footer />
    </div>
  );
}