import React, { useEffect, useState } from "react";
import { IOrder, IUser } from "./types";

export const AppContext = React.createContext<{
  user: IUser | null,
  authLoading: boolean
  orders: IOrder[],
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  setAuthLoading: (value: React.SetStateAction<boolean>) => void
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>,
}>({
  user: null,
  orders: [],
  authLoading: true,
  setUser: () => { },
  setOrders: () => { },
  setAuthLoading: () => { },
})

//@ts-ignore
export const AppContextProvider = ({ children }) => {

  const [user, setUser] = useState<IUser | null>(null)
  const [orders, setOrders] = useState<IOrder[]>([])
  const [authLoading, setAuthLoading] = useState<boolean>(true)


  useEffect(() => {
    setAuthLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/u`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user && data.user._id) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      })
      .finally(() => {
        setAuthLoading(false)
      })
  }, [])

  return (
    <AppContext.Provider value={{ user, setUser, authLoading, setAuthLoading, orders, setOrders }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext