export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      trades: {
        Row: {
          id: string
          user_id: string
          currency_pair: string
          entry_price: number
          exit_price: number | null
          size: number
          type: 'BUY' | 'SELL'
          entry_date: string
          exit_date: string | null
          profit_loss: number
          notes: string | null
          status: 'OPEN' | 'CLOSED'
          stop_loss: number | null
          take_profit: number | null
          tags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          currency_pair: string
          entry_price: number
          exit_price?: number | null
          size: number
          type: 'BUY' | 'SELL'
          entry_date: string
          exit_date?: string | null
          profit_loss?: number
          notes?: string | null
          status: 'OPEN' | 'CLOSED'
          stop_loss?: number | null
          take_profit?: number | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          currency_pair?: string
          entry_price?: number
          exit_price?: number | null
          size?: number
          type?: 'BUY' | 'SELL'
          entry_date?: string
          exit_date?: string | null
          profit_loss?: number
          notes?: string | null
          status?: 'OPEN' | 'CLOSED'
          stop_loss?: number | null
          take_profit?: number | null
          tags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}