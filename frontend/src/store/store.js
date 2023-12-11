import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'


export const useAuthStore = create(persist((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser }),
}),
    {
        name: 'food-storage', // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
));