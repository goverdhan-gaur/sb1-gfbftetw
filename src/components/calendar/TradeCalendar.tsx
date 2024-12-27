import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useNavigate } from 'react-router-dom';
import { useDateContext } from '../../context/DateContext';
import type { Trade } from '../../types/trade';

interface TradeCalendarProps {
  trades: Trade[];
}

export default function TradeCalendar({ trades }: TradeCalendarProps) {
  const navigate = useNavigate();
  const { setSelectedDate } = useDateContext();

  const events = trades.reduce((acc: any[], trade) => {
    const date = new Date(trade.entryDate).toISOString().split('T')[0];
    const existingEvent = acc.find(event => event.date === date);
    
    if (existingEvent) {
      existingEvent.totalPnL += trade.profitLoss;
    } else {
      acc.push({
        date,
        totalPnL: trade.profitLoss,
        backgroundColor: trade.profitLoss >= 0 ? '#22c55e' : '#ef4444',
        display: 'background'
      });
    }
    return acc;
  }, []);

  const handleDateClick = (info: any) => {
    const date = info.dateStr;
    setSelectedDate(date);
    navigate('/analytics');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events.map(event => ({
          ...event,
          title: `$${event.totalPnL.toFixed(2)}`,
          className: event.totalPnL >= 0 ? 'bg-green-100' : 'bg-red-100'
        }))}
        dateClick={handleDateClick}
        height="auto"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth'
        }}
        eventContent={(eventInfo) => {
          const pnl = eventInfo.event.extendedProps.totalPnL;
          return (
            <div className={`p-1 text-sm font-medium ${pnl >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              ${pnl.toFixed(2)}
            </div>
          );
        }}
      />
    </div>
  );
}