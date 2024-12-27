import React, { useState, useEffect } from 'react';
import { useTrades } from '../hooks/useTrades';
import { filterTradesByDate } from '../utils/filters';
import TradeMetrics from '../components/analytics/TradeMetrics';
import ProfitLossChart from '../components/analytics/ProfitLossChart';
import AnalyticsFilters from '../components/analytics/AnalyticsFilters';
import { useDateContext } from '../context/DateContext';
import { startOfDay, endOfDay, parseISO, format } from 'date-fns';

export default function Analytics() {
  const { trades } = useTrades();
  const [dateRange, setDateRange] = useState('1m');
  const [pairFilter, setPairFilter] = useState('');
  const { selectedDate, setSelectedDate } = useDateContext();

  // Reset dateRange when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      setDateRange('day');
    }
  }, [selectedDate]);

  const filteredTrades = trades
    .filter(trade => !pairFilter || trade.currencyPair === pairFilter)
    .filter(trade => {
      if (selectedDate) {
        const start = startOfDay(parseISO(selectedDate));
        const end = endOfDay(parseISO(selectedDate));
        const tradeDate = new Date(trade.entryDate);
        return tradeDate >= start && tradeDate <= end;
      }
      return filterTradesByDate(trade, dateRange);
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {selectedDate 
            ? `Analytics for ${format(parseISO(selectedDate), 'MMMM d, yyyy')}`
            : 'Analytics'}
        </h1>
        {selectedDate && (
          <button
            onClick={() => setSelectedDate(null)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            View All Time
          </button>
        )}
      </div>
      
      {!selectedDate && (
        <AnalyticsFilters
          dateRange={dateRange}
          pairFilter={pairFilter}
          onDateRangeChange={setDateRange}
          onPairFilterChange={setPairFilter}
        />
      )}
      
      <TradeMetrics trades={filteredTrades} />
      
      <div className="grid gap-6">
        <ProfitLossChart trades={filteredTrades} />
      </div>
    </div>
  );
}