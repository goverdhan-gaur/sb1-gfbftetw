import { subDays, subMonths, subYears, isAfter } from 'date-fns';
import type { Trade } from '../types/trade';

export function filterTradesByDate(trade: Trade, dateRange: string): boolean {
  const tradeDate = new Date(trade.entryDate);
  const now = new Date();
  
  switch (dateRange) {
    case '7d':
      return isAfter(tradeDate, subDays(now, 7));
    case '1m':
      return isAfter(tradeDate, subMonths(now, 1));
    case '3m':
      return isAfter(tradeDate, subMonths(now, 3));
    case '6m':
      return isAfter(tradeDate, subMonths(now, 6));
    case '1y':
      return isAfter(tradeDate, subYears(now, 1));
    default:
      return true;
  }
}