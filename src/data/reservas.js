import { getBackendProductById, mapBackendProductToUi } from "./products";

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

export const getBackendReservationsByUserId = (usuarioId) => {
  return backendReservations.filter(
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
    pickupDate: reservation.data_retirada,
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