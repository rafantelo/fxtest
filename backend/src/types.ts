export interface TradeOrder {
  id: string;
  side: string;
  type: string;
  amount: string;
  price: number;
  status: string;
  pair: string;
  created_at: Date;
  updated_at: Date;
}
