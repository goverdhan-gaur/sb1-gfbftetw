import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface AnalyticsFiltersProps {
  dateRange: string;
  pairFilter: string;
  onDateRangeChange: (range: string) => void;
  onPairFilterChange: (pair: string) => void;
}

export default function AnalyticsFilters({
  dateRange,
  pairFilter,
  onDateRangeChange,
  onPairFilterChange
}: AnalyticsFiltersProps) {
  return (
    <div className="flex gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <select
        value={dateRange}
        onChange={(e) => onDateRangeChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="7d">Last 7 Days</option>
        <option value="1m">Last Month</option>
        <option value="3m">Last 3 Months</option>
        <option value="6m">Last 6 Months</option>
        <option value="1y">Last Year</option>
        <option value="all">All Time</option>
      </select>

      <select
        value={pairFilter}
        onChange={(e) => onPairFilterChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Pairs</option>
        <option value="EUR/USD">EUR/USD</option>
        <option value="GBP/USD">GBP/USD</option>
        <option value="USD/JPY">USD/JPY</option>
      </select>
    </div>
  );
}