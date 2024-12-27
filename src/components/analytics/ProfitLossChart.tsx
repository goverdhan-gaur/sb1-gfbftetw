import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { Trade } from '../../types/trade';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProfitLossChartProps {
  trades: Trade[];
}

export default function ProfitLossChart({ trades }: ProfitLossChartProps) {
  const sortedTrades = [...trades].sort((a, b) => 
    new Date(a.entryDate).getTime() - new Date(b.entryDate).getTime()
  );

  const data = {
    labels: sortedTrades.map(trade => 
      new Date(trade.entryDate).toLocaleDateString()
    ),
    datasets: [
      {
        label: 'Cumulative P/L',
        data: sortedTrades.reduce((acc: number[], trade, index) => {
          const previousValue = index > 0 ? acc[index - 1] : 0;
          acc.push(previousValue + trade.profitLoss);
          return acc;
        }, []),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cumulative Profit/Loss Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <Line options={options} data={data} />
    </div>
  );
}