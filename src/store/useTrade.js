import { create } from "zustand";

// store to manage the trade data of products

export const useTradeStore = create((set) => ({
    tradingProducts: [],
    eshopProducts: [],
    setTradingProducts: (tradingProducts) => set({ tradingProducts }),
    setEshopProducts: (eshopProducts) => set({ eshopProducts }),
    updateTradingProducts: (tradingProducts) => set((state) => ({ tradingProducts: [...state.tradingProducts, tradingProducts] }))
}));

