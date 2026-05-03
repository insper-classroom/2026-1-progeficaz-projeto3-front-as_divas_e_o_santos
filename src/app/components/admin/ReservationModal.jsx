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
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-300 dark:border-yellow-700 rounded-lg shadow-2xl p-6 mx-4 transform rotate-1">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-yellow-900 dark:text-yellow-200">
                  Detalhes da Reserva
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
                >
                  <X className="w-5 h-5 text-yellow-900 dark:text-yellow-200" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-yellow-700 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                      Cliente
                    </p>
                    <p className="text-yellow-800 dark:text-yellow-300">
                      {reservation.client}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      {reservation.email}
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      {reservation.phone}
                    </p>
                  </div>
                </div>

                <div className="border-t-2 border-yellow-300 dark:border-yellow-700 my-3" />

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-yellow-700 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                      Itens Reservados
                    </p>
                    <ul className="space-y-1">
                      {reservation.items.map((item, index) => (
                        <li
                          key={index}
                          className="text-yellow-800 dark:text-yellow-300 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t-2 border-yellow-300 dark:border-yellow-700 my-3" />

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-yellow-700 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                      Data de Retirada
                    </p>
                    <p className="text-yellow-800 dark:text-yellow-300">
                      {reservation.pickupDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-yellow-700 dark:text-yellow-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">
                      Horário
                    </p>
                    <p className="text-yellow-800 dark:text-yellow-300">
                      {reservation.pickupTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};