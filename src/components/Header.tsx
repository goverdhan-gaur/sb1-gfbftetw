import React from 'react';
import { Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold text-gray-800">Forex Trading Journal</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Bell className="w-6 h-6 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </header>
  );
}