import React from 'react';
import type { Trade } from '../../types/trade';

interface TradeMetricsProps {
  trades: Trade[];
}

export default function TradeMetrics({ trades }: TradeMetricsProps) {
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.profitLoss > 0).length;
  const losingTrades = trades.filter(trade => trade.profitLoss < 0).length;
  const winRate = totalTrades ? (winningTrades / totalTrades) * 100 : 0;
  const totalProfit = trades.reduce((sum, trade) => sum + (trade.profitLoss > 0 ? trade.profitLoss : 0), 0);
  const totalLoss = Math.abs(trades.reduce((sum, trade) => sum + (trade.profitLoss < 0 ? trade.profitLoss : 0), 0));
  const avgWin = winningTrades ? totalProfit / winningTrades : 0;
  const avgLoss = losingTrades ? totalLoss / losingTrades : 0;

  const metrics = [
    { label: 'Total Trades', value: totalTrades },
    { label: 'Win Rate', value: `${winRate.toFixed(1)}%` },
    { label: 'Average Win', value: `$${avgWin.toFixed(2)}` },
    { label: 'Average Loss', value: `$${avgLoss.toFixed(2)}` },
    { label: 'Total Profit', value: `$${totalProfit.toFixed(2)}` },
    { label: 'Total Loss', value: `$${totalLoss.toFixed(2)}` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metrics.map(metric => (
        <div key={metric.label} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">{metric.label}</p>
          <p className="text-xl font-semibold mt-1">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}