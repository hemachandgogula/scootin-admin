export interface GetReceivedOrdersResponse {
    addressDetailsId: number;
    amount: number;
    id: number;
    inventoryDetailsId: number;
    orderDate: Date;
    orderStatus: string;
    paymentDetailsId: number;
    quantity: number;
    rejectReason: string;
    totalAmount: number;
}