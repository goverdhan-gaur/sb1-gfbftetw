import React from 'react';
import { useSearchParams } from 'react-router-dom';
import TradeList from '../components/trades/TradeList';
import TradeFilters from '../components/trades/TradeFilters';
import TradeModal from '../components/trades/TradeModal';
import { useTrades } from '../hooks/useTrades';
import { useTradeFilters } from '../hooks/useTradeFilters';
import { PlusCircle } from 'lucide-react';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

export default function Trades() {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');

  const {
    trades,
    isModalOpen,
    editingTrade,
    addTrade,
    updateTrade,
    deleteTrade,
    openModal,
    closeModal
  } = useTrades();

  let filteredTrades = trades;

  // Filter trades by date if date parameter exists
  if (dateParam) {
    const start = startOfDay(parseISO(dateParam));
    const end = endOfDay(parseISO(dateParam));
    filteredTrades = trades.filter(trade => {
      const tradeDate = new Date(trade.entryDate);
      return tradeDate >= start && tradeDate <= end;
    });
  }

  const { filters, setFilters, filteredTrades: finalFilteredTrades } = useTradeFilters(filteredTrades);

  const handleSubmit = (data: any) => {
    if (editingTrade) {
      updateTrade(editingTrade.id, data);
    } else {
      addTrade(data);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {dateParam ? `Trades for ${new Date(dateParam).toLocaleDateString()}` : 'Trades'}
        </h1>
        <button 
          onClick={() => openModal()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          New Trade
        </button>
      </div>
      
      <TradeFilters 
        filters={filters}
        onFilterChange={setFilters}
      />
      
      <TradeList 
        trades={finalFilteredTrades}
        onEdit={(trade) => openModal(trade)}
        onDelete={deleteTrade}
      />

      <TradeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        trade={editingTrade || undefined}
      />
    </div>
  );
}