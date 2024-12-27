export interface TradeFilters {
  search: string;
  pair: string;
  type: string;
  status: string;
}

export const defaultFilters: TradeFilters = {
  search: '',
  pair: '',
  type: '',
  status: ''
};