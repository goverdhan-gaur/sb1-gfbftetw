import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Trade, TradeFormData } from '../types/trade';
import { calculateProfitLoss } from '../utils/trade';

export function useTrades() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrades();
  }, []);

  async function fetchTrades() {
    try {
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('entry_date', { ascending: false });

      if (error) throw error;
      
      // Transform database records to match our Trade interface
      const transformedTrades = data?.map(record => ({
        id: record.id,
        userId: record.user_id,
        currencyPair: record.currency_pair,
        entryPrice: record.entry_price,
        exitPrice: record.exit_price,
        size: record.size,
        type: record.type as 'BUY' | 'SELL',
        entryDate: record.entry_date,
        exitDate: record.exit_date,
        profitLoss: record.profit_loss,
        notes: record.notes || '',
        status: record.status as 'OPEN' | 'CLOSED',
        stopLoss: record.stop_loss,
        takeProfit: record.take_profit,
        tags: record.tags
      })) || [];

      setTrades(transformedTrades);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
    }
  }

  const addTrade = async (tradeData: TradeFormData) => {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;
      
      if (!userId) throw new Error('User not authenticated');

      const newTrade = {
        user_id: userId,
        currency_pair: tradeData.currencyPair,
        entry_price: tradeData.entryPrice,
        exit_price: tradeData.exitPrice || null,
        size: tradeData.size,
        type: tradeData.type,
        entry_date: new Date().toISOString(),
        exit_date: tradeData.exitPrice ? new Date().toISOString() : null,
        profit_loss: calculateProfitLoss(tradeData),
        notes: tradeData.notes,
        status: tradeData.exitPrice ? 'CLOSED' : 'OPEN',
        stop_loss: tradeData.stopLoss,
        take_profit: tradeData.takeProfit,
        tags: tradeData.tags
      };

      const { error } = await supabase
        .from('trades')
        .insert([newTrade]);

      if (error) throw error;
      await fetchTrades();
    } catch (error) {
      console.error('Error adding trade:', error);
    }
  };

  const updateTrade = async (id: string, tradeData: TradeFormData) => {
    try {
      const updates = {
        currency_pair: tradeData.currencyPair,
        entry_price: tradeData.entryPrice,
        exit_price: tradeData.exitPrice || null,
        size: tradeData.size,
        type: tradeData.type,
        exit_date: tradeData.exitPrice ? new Date().toISOString() : null,
        profit_loss: calculateProfitLoss(tradeData),
        notes: tradeData.notes,
        status: tradeData.exitPrice ? 'CLOSED' : 'OPEN',
        stop_loss: tradeData.stopLoss,
        take_profit: tradeData.takeProfit,
        tags: tradeData.tags
      };

      const { error } = await supabase
        .from('trades')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      await fetchTrades();
    } catch (error) {
      console.error('Error updating trade:', error);
    }
  };

  const deleteTrade = async (id: string) => {
    try {
      const { error } = await supabase
        .from('trades')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchTrades();
    } catch (error) {
      console.error('Error deleting trade:', error);
    }
  };

  const openModal = (trade?: Trade) => {
    setEditingTrade(trade || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingTrade(null);
    setIsModalOpen(false);
  };

  return {
    trades,
    loading,
    isModalOpen,
    editingTrade,
    addTrade,
    updateTrade,
    deleteTrade,
    openModal,
    closeModal
  };
}