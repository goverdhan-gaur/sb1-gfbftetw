import React from 'react';
import { LineChart, Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useTrades } from '../hooks/useTrades';
import ProfitLossChart from '../components/analytics/ProfitLossChart';
import RecentTradesList from '../components/dashboard/RecentTradesList';

export default function Dashboard() {
  const { trades } = useTrades();
  
  // Calculate statistics
  const totalTrades = trades.length;
  const winningTrades = trades.filter(trade => trade.profitLoss > 0).length;
  const winRate = totalTrades ? ((winningTrades / totalTrades) * 100).toFixed(1) : '0';
  const totalPnL = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const averageLoss = trades
    .filter(trade => trade.profitLoss < 0)
    .reduce((sum, trade) => sum + trade.profitLoss, 0) / trades.filter(trade => trade.profitLoss < 0).length || 0;

  const stats = [
    {
      name: 'Total Trades',
      value: totalTrades.toString(),
      icon: LineChart,
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      name: 'Win Rate',
      value: `${winRate}%`,
      icon: TrendingUp,
      change: '+4.2%',
      changeType: 'positive',
    },
    {
      name: 'Total P&L',
      value: `$${totalPnL.toFixed(2)}`,
      icon: Wallet,
      change: '+8.1%',
      changeType: totalPnL >= 0 ? 'positive' : 'negative',
    },
    {
      name: 'Average Loss',
      value: `$${Math.abs(averageLoss).toFixed(2)}`,
      icon: TrendingDown,
      change: '-2.3%',
      changeType: 'negative',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div
                className={`p-3 rounded-full ${
                  stat.changeType === 'positive'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="text-sm text-gray-600"> vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Trades</h3>
          <RecentTradesList trades={trades.slice(0, 5)} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Chart</h3>
          <ProfitLossChart trades={trades} />
        </div>
      </div>
    </div>
  );
}