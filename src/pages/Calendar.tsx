import React, { useState } from 'react';
import { useTrades } from '../hooks/useTrades';
import TradeCalendar from '../components/calendar/TradeCalendar';
import { format } from 'date-fns';

export default function Calendar() {
  const { trades } = useTrades();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dailyTrades = selectedDate
    ? trades.filter(trade => 
        format(new Date(trade.entryDate), 'yyyy-MM-dd') === 
        format(selectedDate, 'yyyy-MM-dd')
      )
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
      
      <TradeCalendar 
        trades={trades}
        onDateClick={setSelectedDate}
      />

      {selectedDate && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-medium mb-4">
            Trades on {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          {dailyTrades.length > 0 ? (
            <div className="space-y-4">
              {dailyTrades.map(trade => (
                <div 
                  key={trade.id}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{trade.currencyPair}</p>
                      <p className="text-sm text-gray-600">
                        {format(new Date(trade.entryDate), 'HH:mm')}
                      </p>
                    </div>
                    <span className={`font-medium ${
                      trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${trade.profitLoss.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No trades on this date</p>
          )}
        </div>
      )}
    </div>
  );
}