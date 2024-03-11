import { create } from "zustand";

// store to manage the trade data of products

export const useTradeStore = create((set) => ({
    tradingProducts: [],
    setTradingProducts: (tradingProducts) => set({ tradingProducts }),
    updateTradingProducts: (tradingProducts) => set((state) => ({ tradingProducts: [...state.tradingProducts, tradingProducts] }))
}));

