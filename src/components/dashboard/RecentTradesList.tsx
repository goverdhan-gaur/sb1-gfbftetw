import React from 'react';
import { format } from 'date-fns';
import type { Trade } from '../../types/trade';

interface RecentTradesListProps {
  trades: Trade[];
}

export default function RecentTradesList({ trades }: RecentTradesListProps) {
  return (
    <div className="space-y-4">
      {trades.length > 0 ? (
        trades.map((trade) => (
          <div
            key={trade.id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">{trade.currencyPair}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  trade.type === 'BUY' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {trade.type}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {format(new Date(trade.entryDate), 'MMM d, yyyy HH:mm')}
              </p>
            </div>
            <span className={`font-medium ${
              trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              ${trade.profitLoss.toFixed(2)}
            </span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No recent trades</p>
      )}
    </div>
  );
}