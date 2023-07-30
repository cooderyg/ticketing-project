export interface IOrdersServiceCreate {
  concertId: string;
  userId: string;
  amount: number;
  seatIds: string[];
}
export interface IOrdersServiceOrderCancel {
  orderId: string;
  userId: string;
}

export interface IOrdersServiceFindByUserId {
  userId: string;
  page: number;
}
