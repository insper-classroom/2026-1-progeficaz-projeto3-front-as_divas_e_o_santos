import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, Package } from "lucide-react";
import { Footer } from "../../components/layout/Footer";
import { isAuthenticated } from "../../utils/auth";
import { UserCancellationModal } from "../../components/ui/UserCancellationModal";
import { currentUser as getCurrentUser } from "../../../data/user";
import {
  cancelReservation,
  getReservationsForUserUi,
} from "../../../data/reservas";

export default function Historico() {
  const currentUser = getCurrentUser();

  const initialReservations = currentUser
    ? getReservationsForUserUi(currentUser.id)
    : [];

  const navigate = useNavigate();
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const handleOpenCancelModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsCancelOpen(true);
  };

  const handleConfirmCancel = (reservationToCancel) => {
    cancelReservation(reservationToCancel.id);
    setReservations((current) =>
      current.filter((item) => item.id !== reservationToCancel.id)
    );
    setIsCancelOpen(false);
    setSelectedReservation(null);
  };

  const isLoggedIn = isAuthenticated();

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} userName={currentUser?.nome ?? ''} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate("/perfil")}
          className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-all duration-200 hover:translate-x-[-4px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao perfil
        </button>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Histórico de Reservas
            </h1>
          </div>
          <p className="text-muted-foreground">
            Todas as suas reservas e retiradas
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex flex-col gap-4 p-4 border border-border rounded-lg hover:shadow-md hover:bg-accent transition-all sm:flex-row sm:items-center"
              >
                <img
                  src={reservation.image}
                  alt={reservation.productName}
                  className="w-20 h-20 object-cover rounded border border-border"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {reservation.productName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Agendamento: {reservation.reservationDateLabel} às {reservation.reservationTimeLabel}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Retirada: {reservation.pickupDateLabel} às {reservation.pickupTimeLabel}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                      reservation.status === "ativa"
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : reservation.status === "retirada"
                          ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                          : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    {reservation.statusLabel}
                  </span>

                  {reservation.status === "ativa" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenCancelModal(reservation)}
                      className="gap-1.5 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {reservations.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Nenhuma reserva encontrada
              </p>
              <Button onClick={() => navigate("/")}>Ir para a loja</Button>
            </div>
          )}
        </Card>
      </main>

      <UserCancellationModal
        isOpen={isCancelOpen}
        onClose={() => {
          setIsCancelOpen(false);
          setSelectedReservation(null);
        }}
        reservation={selectedReservation}
        onConfirm={handleConfirmCancel}
      />

      <Footer />
    </div>
  );
}
