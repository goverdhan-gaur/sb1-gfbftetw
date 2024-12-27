import type { TradeFormData } from '../types/trade';

export const calculateProfitLoss = (trade: TradeFormData): number => {
  if (!trade.exitPrice) return 0;
  const direction = trade.type === 'BUY' ? 1 : -1;
  return direction * (trade.exitPrice - trade.entryPrice) * trade.size;
};