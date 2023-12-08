import {create} from "zustand";
import useEffect from 'react'

function getUserInit(){
    useEffect(()=>{

    })
}

const useAuthStore=create((set)=>{
    isLoggedIn: !!document.cookie,
    user: null, // Additional property to store user context

    login: (userData) => set({ isLoggedIn: true, user: userData }),
    logout: () => set({ isLoggedIn: false, user: null }),
})
