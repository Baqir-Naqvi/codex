import { create } from "zustand";

// store to manage the trade data of products

export const useCartStore = create((set) => ({
    cartProducts: [],
    setCartProducts: (cartProducts) => set({ cartProducts }),
    updateCartProducts: (cartProducts) => set((state) => ({ cartProducts: [...state.cartProducts, cartProducts] }))
}));

export const useMarketPlaceStore = create((set) => ({
    market_products: [],
    setMarketProducts: (market_products) => set({ market_products }),
    updateMarketProducts: (market_products) => set((state) => ({ market_products: [...state.market_products, market_products] }))
}));

