import { create } from 'zustand'

export const useLayoutStore = create((set) => ({

    sidebartoggle: true,
    setSidebarToggle: (sidebartoggle) => set({ sidebartoggle }),

    sidebar: false,
    setSidebar: (sidebar) => set({ sidebar }),

}))



