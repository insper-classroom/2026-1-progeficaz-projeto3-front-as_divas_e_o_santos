import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import { LogOut, ShoppingBag, X, MessageSquare, Edit2, Save } from "lucide-react";
import { Footer } from '../../components/layout/Footer';
import { HeaderAdmin } from '../../components/layout/HeaderAdmin';
import { CancellationModal } from "../../components/admin/CancellationModal";
import { backendReservations } from "../../../data/reservas";
import { getBackendUserById } from "../../../data/user";
import { getBackendProductById } from "../../../data/products";


export default function Agendamentos() {

  const [reservationList, setReservationList] = useState(
    backendReservations.map((reservation) => {
      const user = getBackendUserById(reservation.usuario_id);
      const product = getBackendProductById(reservation.produto_id);

      return {
        id: reservation._id,
        userName: user?.nome ?? "Usuário",
        product: product?.nome ?? "Produto",
        pickupDate: new Date(reservation.data_reserva).toLocaleDateString("pt-BR"),
        pickupTime: new Date(reservation.data_reserva).toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        email: user?.email ?? "",
        phone: user?.phone ?? "",
      };
    })
  );

  const navigate = useNavigate();
  const [isEditingSchedule, setIsEditingSchedule] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

const handleOpenCancelModal = (reservation) => {
  setSelectedReservation(reservation);
  setIsCancelModalOpen(true);
};

const handleConfirmCancel = (reservation) => {
  setReservationList((currentList) =>
    currentList.filter((res) => res.id !== reservation.id)
  );
  setIsCancelModalOpen(false);
  setSelectedReservation(null);
};

  const [schedule, setSchedule] = useState([
    { day: "Domingo", open: "", close: "", isOpen: false },
    {
      day: "Segunda",
      open: "09:00",
      close: "14:00",
      isOpen: true,
      breakStart: "14:00",
      breakEnd: "15:00",
      reopenClose: "20:00",
    },
    {
      day: "Terça",
      open: "09:00",
      close: "14:00",
      isOpen: true,
      breakStart: "14:00",
      breakEnd: "15:00",
      reopenClose: "20:00",
    },
    {
      day: "Quarta",
      open: "09:00",
      close: "14:00",
      isOpen: true,
      breakStart: "14:00",
      breakEnd: "15:00",
      reopenClose: "20:00",
    },
    {
      day: "Quinta",
      open: "09:00",
      close: "14:00",
      isOpen: true,
      breakStart: "14:00",
      breakEnd: "15:00",
      reopenClose: "20:00",
    },
    {
      day: "Sexta",
      open: "09:00",
      close: "14:00",
      isOpen: true,
      breakStart: "14:00",
      breakEnd: "15:00",
      reopenClose: "20:00",
    },
    { day: "Sábado", open: "", close: "", isOpen: false },
  ]);

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setSchedule(newSchedule);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent">
      <HeaderAdmin userName="Admin" />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Gestão de Reservas
          </h1>
          <p className="text-muted-foreground">
            Gerencie os agendamentos e horários de funcionamento
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Lista de Reservas
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Usuário
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Produto
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">
                        Data e Horário
                      </th>
                      <th className="text-center py-3 px-4 font-semibold text-foreground">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationList.map((reservation) => (
                      <tr
                        key={reservation.id}
                        className="border-b border-border hover:bg-accent transition-colors"
                      >
                        <td className="py-4 px-4 text-foreground font-medium">
                          {reservation.userName}
                        </td>
                        <td className="py-4 px-4 text-foreground">
                          {reservation.product}
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">
                          {reservation.pickupDate} às {reservation.pickupTime}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenCancelModal(reservation)}
                            className="gap-1.5 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <X className="w-4 h-4" />
                            Cancelar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">
                  Horários de Funcionamento
                </h2>
                {isEditingSchedule ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingSchedule(false)}
                    className="gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    Salvar
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingSchedule(true)}
                    className="gap-1.5"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {schedule.map((item, index) => (
                  <div
                    key={item.day}
                    className="pb-3 border-b border-border last:border-0"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-foreground text-sm">
                        {item.day}
                      </p>
                      {isEditingSchedule && (
                        <input
                          type="checkbox"
                          checked={item.isOpen}
                          onChange={(e) =>
                            handleScheduleChange(
                              index,
                              "isOpen",
                              e.target.checked,
                            )
                          }
                          className="w-4 h-4 accent-primary cursor-pointer"
                        />
                      )}
                    </div>

                    {item.isOpen ? (
                      isEditingSchedule ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={item.open}
                              onChange={(e) =>
                                handleScheduleChange(
                                  index,
                                  "open",
                                  e.target.value,
                                )
                              }
                              className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background focus:outline-none focus:border-primary"
                            />
                            <span className="text-xs text-muted-foreground">
                              -
                            </span>
                            <input
                              type="time"
                              value={item.close}
                              onChange={(e) =>
                                handleScheduleChange(
                                  index,
                                  "close",
                                  e.target.value,
                                )
                              }
                              className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background focus:outline-none focus:border-primary"
                            />
                          </div>

                          {item.breakStart && (
                            <div className="flex items-center gap-2">
                              <input
                                type="time"
                                value={item.breakEnd}
                                onChange={(e) =>
                                  handleScheduleChange(
                                    index,
                                    "breakEnd",
                                    e.target.value,
                                  )
                                }
                                className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background focus:outline-none focus:border-primary"
                              />
                              <span className="text-xs text-muted-foreground">
                                -
                              </span>
                              <input
                                type="time"
                                value={item.reopenClose}
                                onChange={(e) =>
                                  handleScheduleChange(
                                    index,
                                    "reopenClose",
                                    e.target.value,
                                  )
                                }
                                className="flex-1 px-2 py-1 text-xs border border-border rounded bg-background focus:outline-none focus:border-primary"
                              />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {item.open} - {item.close}
                          </p>
                          {item.breakEnd && item.reopenClose && (
                            <p className="text-xs text-muted-foreground">
                              {item.breakEnd} - {item.reopenClose}
                            </p>
                          )}
                        </div>
                      )
                    ) : (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        Fechado
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    <CancellationModal
      isOpen={isCancelModalOpen}
      onClose={() => {
        setIsCancelModalOpen(false);
        setSelectedReservation(null);
      }}
      reservation={selectedReservation}
      onConfirm={handleConfirmCancel}
    />
      <Footer />
    </div>
  );
}