export interface Trade {
  id?: number;
  side: 'buy' | 'sell';
  type: 'market' | 'limit' | 'stop';
  amount: number;
  price: number;
  status?: 'open' | 'executed' | 'canceled';
  pair: string;
}
