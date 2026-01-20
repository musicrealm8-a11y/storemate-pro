export type ConsignmentStatus = 'issued' | 'partially_settled' | 'sold' | 'returned' | 'closed';

export interface ConsignmentItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  soldQuantity: number;
  returnedQuantity: number;
}

export interface Consignment {
  id: string;
  clientId: string;
  clientName: string;
  items: ConsignmentItem[];
  advanceAmount: number;
  totalValue: number;
  status: ConsignmentStatus;
  issuedDate: string;
  settledDate?: string;
  notes?: string;
}

export interface ConsignmentSettlement {
  consignmentId: string;
  soldItems: { itemId: string; soldQuantity: number }[];
  returnedItems: { itemId: string; returnedQuantity: number }[];
  additionalPayment: number;
  refundAmount: number;
}
