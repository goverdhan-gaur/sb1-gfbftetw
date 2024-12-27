import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { TradeFilters } from '../../types/filters';

interface TradeFiltersProps {
  filters: TradeFilters;
  onFilterChange: (filters: TradeFilters) => void;
}

export default function TradeFilters({ filters, onFilterChange }: TradeFiltersProps) {
  const handleChange = (key: keyof TradeFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex-1 min-w-[200px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            placeholder="Search trades..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="flex gap-4">
        <select
          value={filters.pair}
          onChange={(e) => handleChange('pair', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Pairs</option>
          <option value="EUR/USD">EUR/USD</option>
          <option value="GBP/USD">GBP/USD</option>
          <option value="USD/JPY">USD/JPY</option>
        </select>
        
        <select
          value={filters.type}
          onChange={(e) => handleChange('type', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Types</option>
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
        
        <select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>
        
        <button 
          onClick={() => onFilterChange(defaultFilters)}
          className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <Filter className="w-5 h-5 mr-2" />
          Reset Filters
        </button>
      </div>
    </div>
  );
}