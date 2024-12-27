export interface Trade {
  id: string;
  userId: string;
  currencyPair: string;
  entryPrice: number;
  exitPrice: number;
  size: number;
  type: 'BUY' | 'SELL';
  entryDate: Date;
  exitDate: Date;
  profitLoss: number;
  notes: string;
  status: 'OPEN' | 'CLOSED';
  stopLoss?: number;
  takeProfit?: number;
  tags?: string[];
}

export interface TradeFormData {
  currencyPair: string;
  entryPrice: number;
  exitPrice?: number;
  size: number;
  type: 'BUY' | 'SELL';
  entryDate: Date;
  exitDate?: Date;
  notes: string;
  stopLoss?: number;
  takeProfit?: number;
  tags?: string[];
}