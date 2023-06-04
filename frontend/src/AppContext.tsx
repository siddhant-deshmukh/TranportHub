import React, { useEffect, useState } from "react";
import { IOrder, IUser } from "./types";
import axios from "axios";

export const AppContext = React.createContext<{
  user: IUser | null,
  authLoading: boolean
  orders: IOrder[],
  transporters: {_id: string, name: string }[],
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  setAuthLoading: (value: React.SetStateAction<boolean>) => void
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>,
}>({
  user: null,
  orders: [],
  authLoading: true,
  transporters: [],
  setUser: () => { },
  setOrders: () => { },
  setAuthLoading: () => { },
})

//@ts-ignore
export const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState<IUser | null>(null)
  const [orders, setOrders] = useState<IOrder[]>([])
  const [authLoading, setAuthLoading] = useState<boolean>(true)
  const [transporters, setTransporters] = useState<{_id:string,name:string}[]>([])

  useEffect(() => {
    setAuthLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/u`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user && data.user._id) {
          setUser(data.user)
          if(data.user.user_type === 'manufacturer'){
            axios.get(`${import.meta.env.VITE_API_URL}/u/transporters`,{withCredentials:true})
              .then(({status, data})=>{
                setTransporters(data.data)
                console.log(status, data.data)
              }).catch((err)=>{
                console.error("While get/transporters list", err)
              })
          }
        } else {
          setUser(null)
        }
      })
      .finally(() => {
        setAuthLoading(false)
      })
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, authLoading, setAuthLoading, orders, setOrders, transporters }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext