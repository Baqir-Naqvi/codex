import { create } from 'zustand'
import { persist } from 'zustand/middleware'
export const useConversionStore = create(
    persist(
        (set, get) => ({
            currency: 'CZK',
            conversionRates :[],
            weight:1,
            weightLabel: 'g',
            setWeight: (weight) => set({ weight }),
            setWeightLabel: (weightLabel) => set({ weightLabel }),
            setConversionRates: (conversionRates) => set({ conversionRates }),
            setCurrency: (currency) => set({ currency }),
            rate: 1,
            flag: "/images/kz.png",
            setRate: (rate) => set({ rate }),
        })
        , {
            name: 'conversion-storage',
            getStorage: () => localStorage
        }
    )

)


