import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, Package, Calendar, Clock, AlarmClock } from "lucide-react";

export const UserCancellationModal = ({ isOpen, onClose, reservation, onConfirm }) => {
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
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
              <div className="flex items-start justify-between border-b border-border px-6 py-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    Cancelar Reserva
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Essa ação não tem volta!
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
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-4 dark:border-red-900/40 dark:bg-red-950/20">
                  <div className="mt-0.5 rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-900/40 dark:text-red-300">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">
                      Tem certeza que deseja cancelar esta reserva?
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Ao confirmar, a reserva será removida e não poderá ser recuperada.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Produto
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.productName}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Data de retirada
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(reservation.pickupDate).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Status
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.status}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-lg bg-primary/10 p-2 text-primary">
                      <AlarmClock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Horário
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.pickupTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  onClick={onClose}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Voltar
                </button>

                <button
                  onClick={() => onConfirm?.(reservation)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Sim, cancelar
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};