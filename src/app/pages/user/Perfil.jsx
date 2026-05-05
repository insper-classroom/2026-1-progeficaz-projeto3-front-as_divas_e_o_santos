import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/layout/Header";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { User, Calendar, History } from "lucide-react";
import { Footer } from "../../components/layout/Footer";
import { isAuthenticated } from "../../utils/auth";
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

export default function Perfil() {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const [profile, setProfile] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/user/perfil", {
          withCredentials: true,
        });

        const { profile: loadedProfile, reservations: loadedReservations } =
          normalizeProfileResponse(response.data);

        setProfile(loadedProfile);

        const mappedReservations = loadedReservations.map(mapReservationToUi);
        setReservations(mappedReservations);
      } catch (err) {
        if (err?.response?.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        setError("Não foi possível carregar seu perfil.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const upcomingReservations = useMemo(
    () =>
      reservations
        .filter((reservation) => reservation.rawStatus === "ativa")
        .slice(0, 2),
    [reservations]
  );

  const displayName = profile?.nome ?? "";
  const displayEmail = profile?.email ?? "";

  return (
    <div className="min-h-screen bg-background">
      <Header isLoggedIn={isLoggedIn} userName={displayName} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Olá, {displayName}!
              </h1>
              <p className="text-muted-foreground">
                Gerencie seu perfil e reservas
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <Card className="p-6">
            <p className="text-muted-foreground">Carregando perfil...</p>
          </Card>
        ) : error ? (
          <Card className="p-6">
            <p className="text-muted-foreground">{error}</p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  Informações Pessoais
                </h2>
              </div>

              <div className="space-y-4">
                <Input
                  label="Nome"
                  type="text"
                  value={displayName}
                  disabled
                />

                <Input
                  label="Email"
                  type="email"
                  value={displayEmail}
                  disabled
                />

                <Input
                  label="Senha"
                  type="password"
                  value="********"
                  disabled
                />

                <p className="text-sm text-muted-foreground">
                  A atualização de email e senha ainda não está disponível na
                  API atual.
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Próximas Retiradas
                </h2>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate("/historico")}
                  className="gap-1.5"
                >
                  <History className="w-4 h-4" />
                  Ver histórico
                </Button>
              </div>

              <div className="space-y-4">
                {upcomingReservations.length > 0 ? (
                  upcomingReservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex items-center gap-4 p-3 bg-muted hover:bg-accent rounded-lg transition-colors"
                    >
                      <img
                        src={reservation.image}
                        alt={reservation.productName}
                        className="w-16 h-16 object-cover rounded border border-border"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          {reservation.productName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Retirada:{" "}
                          {reservation.pickupDate
                            ? new Date(reservation.pickupDate).toLocaleDateString(
                                "pt-BR"
                              )
                            : "Sem data"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhuma reserva agendada
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}