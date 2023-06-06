import React, { useEffect, useState } from "react";
import { IOrder, IUser } from "./types";
import axios from "axios";

export const AppContext = React.createContext<{
  orders: IOrder[],
  user: IUser | null,
  authLoading: boolean,
  selectedOrder: IOrder | null,
  transporters: { _id: string, name: string }[],
  modalType: null | 'new-order' | 'update-order' | 'messages',
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>,
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  setAuthLoading: (value: React.SetStateAction<boolean>) => void
  setSelectedOrder: React.Dispatch<React.SetStateAction<IOrder | null>>
  setModalType: React.Dispatch<React.SetStateAction<"new-order" | "update-order" | "messages" | null>>,
}>({
  user: null,
  orders: [],
  modalType: null,
  transporters: [],
  authLoading: true,
  selectedOrder: null,
  setUser: () => { },
  setOrders: () => { },
  setModalType: () => { },
  setAuthLoading: () => { },
  setSelectedOrder: () => { },
})

//@ts-ignore
export const AppContextProvider = ({ children }) => {

  const [orders, setOrders] = useState<IOrder[]>([])
  const [user, setUser] = useState<IUser | null>(null)
  const [authLoading, setAuthLoading] = useState<boolean>(true)
  const [selectedOrder, setSelectedOrder] = useState<null | IOrder>(null)
  const [transporters, setTransporters] = useState<{ _id: string, name: string }[]>([])
  const [modalType, setModalType] = useState<null | 'new-order' | 'update-order' | 'messages'>(null)

  useEffect(() => {
    setAuthLoading(true)
    fetch(`${import.meta.env.VITE_API_URL}/u`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user && data.user._id) {
          setUser(data.user)
          console.log('daata user', data.user.type)
        } else {
          setUser(null)
        }
      })
      .finally(() => {
        setAuthLoading(false)
      })
  }, [])

  useEffect(() => {
    if (user?.user_type === 'manufacturer') {
      axios.get(`${import.meta.env.VITE_API_URL}/u/transporters`, { withCredentials: true })
        .then(({ status, data }) => {
          setTransporters(data.data)
          console.log(status, data.data)
        }).catch((err) => {
          console.error("While get/transporters list", err)
        })
    }
  }, [user])
  return (
    <AppContext.Provider value={{
      transporters,
      user, setUser,
      orders, setOrders,
      modalType, setModalType,
      authLoading, setAuthLoading,
      selectedOrder, setSelectedOrder,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext