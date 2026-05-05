import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, Package } from "lucide-react";
import { Footer } from "../../components/layout/Footer";
import { isAuthenticated } from "../../utils/auth";
import { UserCancellationModal } from "../../components/ui/UserCancellationModal";
import api from "../../utils/api";

const normalizeProfileResponse = (data) => {
  const profile = data?.user ?? data?.perfil ?? data?.profile ?? data ?? null;

  const rawReservations =
    data?.reservas ??
    data?.reservations ??
    profile?.reservas ??
    profile?.reservations ??
    [];

  return {
    profile,
    reservations: Array.isArray(rawReservations) ? rawReservations : [],
  };
};

const mapReservationToUi = (reservation) => {
  const rawStatus = reservation?.status ?? "ativa";

  return {
    id: reservation?._id ?? reservation?.id ?? reservation?.reserva_id ?? "",
    productName:
      reservation?.productName ??
      reservation?.nome_produto ??
      reservation?.produto_nome ??
      reservation?.produto?.nome ??
      "Produto",
    image:
      reservation?.image ??
      reservation?.image_url ??
      reservation?.produto?.image_url ??
      "/images/product-placeholder.jpg",
    pickupDate:
      reservation?.pickupDate ??
      reservation?.data_retirada ??
      reservation?.dataRetirada ??
      reservation?.data ??
      "",
    status:
      rawStatus === "ativa"
        ? "Agendado"
        : rawStatus === "retirada"
          ? "Retirado"
          : rawStatus === "cancelada"
            ? "Cancelado"
            : String(rawStatus),
    rawStatus,
  };
};

export default function Historico() {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/user/perfil", {
        withCredentials: true,
      });

      const { profile: loadedProfile, reservations: loadedReservations } =
        normalizeProfileResponse(response.data);

      setProfile(loadedProfile);
      setReservations(loadedReservations.map(mapReservationToUi));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }

      setError("Não foi possível carregar o histórico.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleOpenCancelModal = (reservation) => {
    setSelectedReservation(reservation);
    setIsCancelOpen(true);
  };

  const handleConfirmCancel = async (reservationToCancel) => {
    try {
      await api.post(
        `/user/reserva/${reservationToCancel.id}/cancelar`,
        {},
        { withCredentials: true }
      );

      setReservations((current) =>
        current.filter((item) => item.id !== reservationToCancel.id)
      );
      setIsCancelOpen(false);
      setSelectedReservation(null);
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login", { replace: true });
        return;
      }

      setError("Não foi possível cancelar a reserva.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} userName={profile?.nome ?? ""} />

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

        {loading ? (
          <Card className="p-6">
            <p className="text-muted-foreground">Carregando histórico...</p>
          </Card>
        ) : error ? (
          <Card className="p-6">
            <p className="text-muted-foreground">{error}</p>
          </Card>
        ) : (
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
                      Data de retirada:{" "}
                      {reservation.pickupDate
                        ? new Date(reservation.pickupDate).toLocaleDateString(
                            "pt-BR"
                          )
                        : "Sem data"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        reservation.status === "Agendado"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : reservation.status === "Retirado"
                            ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800"
                            : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {reservation.status}
                    </span>

                    {reservation.rawStatus === "ativa" && (
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
        )}
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