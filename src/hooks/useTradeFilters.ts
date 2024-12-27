import { useState, useCallback } from 'react';
import type { Trade } from '../types/trade';
import type { TradeFilters } from '../types/filters';
import { defaultFilters } from '../types/filters';

export function useTradeFilters(trades: Trade[]) {
  const [filters, setFilters] = useState<TradeFilters>(defaultFilters);

  const filterTrades = useCallback((trades: Trade[]) => {
    return trades.filter(trade => {
      // Search filter
      if (filters.search && !trade.currencyPair.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Pair filter
      if (filters.pair && trade.currencyPair !== filters.pair) {
        return false;
      }

      // Type filter
      if (filters.type && trade.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status && trade.status !== filters.status) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const filteredTrades = filterTrades(trades);

  return {
    filters,
    setFilters,
    filteredTrades
  };
}