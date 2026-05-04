import { motion, AnimatePresence } from "framer-motion";
import { X, User, Package, Calendar, Clock } from "lucide-react";

export const ReservationModal = ({ isOpen, onClose, reservation }) => {
  if (!reservation) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-lg rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
              <div className="flex items-start justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Detalhes da Reserva
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Informações completas do agendamento
                  </p>
                </div>

                <button
                  onClick={onClose}
                  aria-label="Fechar modal"
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-5 px-6 py-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <User className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Cliente</p>
                    <p className="text-sm text-foreground">{reservation.client}</p>
                    <p className="text-sm text-muted-foreground">{reservation.email}</p>
                    <p className="text-sm text-muted-foreground">{reservation.phone}</p>
                  </div>
                </div>

                <div className="border-t border-border" />

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                    <Package className="h-4 w-4" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Itens reservados</p>
                    <ul className="space-y-2">
                      {reservation.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-border" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Data de retirada</p>
                      <p className="text-sm text-muted-foreground">{reservation.pickupDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Horário</p>
                      <p className="text-sm text-muted-foreground">{reservation.pickupTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end border-t border-border bg-muted/30 px-6 py-4">
                <button
                  onClick={onClose}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};