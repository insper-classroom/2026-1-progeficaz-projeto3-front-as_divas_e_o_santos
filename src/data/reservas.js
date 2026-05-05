import { getBackendProductById, mapBackendProductToUi } from "./products";

const RESERVATIONS_STORAGE_KEY = "insper_reservas";

export const backendReservations = [
  {
    _id: "000000000000000000000101",
    usuario_id: "000000000000000000000001",
    produto_id: "000000000000000000000001",
    quantidade: 1,
    data_reserva: "2026-04-28T18:00:00.000Z",
    data_retirada: "2026-04-30T18:00:00.000Z",
    status: "ativa",
    notificado: false,
  },
  {
    _id: "000000000000000000000102",
    usuario_id: "000000000000000000000002",
    produto_id: "000000000000000000000002",
    quantidade: 2,
    data_reserva: "2026-04-27T14:30:00.000Z",
    data_retirada: "2026-05-02T18:00:00.000Z",
    status: "ativa",
    notificado: true,
  },
  {
    _id: "000000000000000000000103",
    usuario_id: "000000000000000000000002",
    produto_id: "000000000000000000000003",
    quantidade: 1,
    data_reserva: "2026-04-10T11:00:00.000Z",
    data_retirada: "2026-04-12T18:00:00.000Z",
    status: "retirada",
    notificado: true,
  },
];

const cloneReservations = (reservations) =>
  reservations.map((reservation) => ({ ...reservation }));

const getStorage = () => {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  return window.localStorage;
};

const getInitialReservations = () => cloneReservations(backendReservations);

const readReservationsFromStorage = () => {
  const storage = getStorage();

  if (!storage) {
    return getInitialReservations();
  }

  const raw = storage.getItem(RESERVATIONS_STORAGE_KEY);

  if (!raw) {
    const initialReservations = getInitialReservations();
    storage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(initialReservations));
    return initialReservations;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : getInitialReservations();
  } catch {
    const initialReservations = getInitialReservations();
    storage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(initialReservations));
    return initialReservations;
  }
};

const writeReservationsToStorage = (reservations) => {
  const storage = getStorage();
  if (!storage) return;

  storage.setItem(RESERVATIONS_STORAGE_KEY, JSON.stringify(reservations));
};

export const getAllReservations = () => readReservationsFromStorage();

export const saveReservation = (reservation) => {
  const currentReservations = readReservationsFromStorage();
  const nextReservations = [...currentReservations, reservation];

  writeReservationsToStorage(nextReservations);
  return reservation;
};

export const cancelReservation = (reservationId) => {
  const currentReservations = readReservationsFromStorage();
  const nextReservations = currentReservations.filter(
    (reservation) => reservation._id !== reservationId
  );

  writeReservationsToStorage(nextReservations);
  return nextReservations;
};

const formatDateLabel = (value) => {
  if (!value) return "";

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("pt-BR");
};

const formatTimeLabel = (value) => {
  if (!value) return "";

  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      });
};

export const getBackendReservationsByUserId = (usuarioId) => {
  return getAllReservations().filter(
    (reservation) => reservation.usuario_id === usuarioId
  );
};

export const getBackendActiveReservationsByUserId = (usuarioId) => {
  return getBackendReservationsByUserId(usuarioId).filter(
    (reservation) => reservation.status === "ativa"
  );
};

export const mapBackendReservationToUi = (reservation) => {
  const backendProduct = getBackendProductById(reservation.produto_id);
  const uiProduct = backendProduct ? mapBackendProductToUi(backendProduct) : null;

  return {
    id: reservation._id,
    userId: reservation.usuario_id,
    productId: reservation.produto_id,
    quantity: reservation.quantidade,
    reservationDate: reservation.data_reserva,
    reservationDateLabel: formatDateLabel(reservation.data_reserva),
    reservationTimeLabel: formatTimeLabel(reservation.data_reserva),
    pickupDate: reservation.data_retirada,
    pickupDateLabel: formatDateLabel(reservation.data_retirada),
    pickupTimeLabel: formatTimeLabel(reservation.data_retirada),
    status: reservation.status,
    notified: reservation.notificado,
    statusLabel:
      reservation.status === "ativa"
        ? "Agendado"
        : reservation.status === "retirada"
          ? "Retirado"
          : "Cancelado",
    productName: uiProduct?.name ?? "Produto",
    image: uiProduct?.image ?? "/images/product-placeholder.jpg",
  };
};

export const getReservationsForUserUi = (usuarioId) => {
  return getBackendReservationsByUserId(usuarioId).map(mapBackendReservationToUi);
};

export const getActiveReservationsForUserUi = (usuarioId) => {
  return getBackendActiveReservationsByUserId(usuarioId).map(
    mapBackendReservationToUi
  );
};

export const createReservation = ({ userId, productId, quantity, scheduledAt }) => {
  const reservation = {
    _id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    usuario_id: userId,
    produto_id: productId,
    quantidade: quantity,
    data_reserva: scheduledAt,
    data_retirada: scheduledAt,
    status: "ativa",
    notificado: false,
  };

  saveReservation(reservation);
  return reservation;
};
