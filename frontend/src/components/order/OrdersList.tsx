// import { useEffect, useState } from "react"
import { IOrder } from "../../types"
// import axios, { AxiosResponse } from "axios"
import Order from "./Order"

const OrdersList = ({ ordersList,  setEditOrder, setOrderMsgs }: {
  ordersList: IOrder[],
  setOrdersList: React.Dispatch<React.SetStateAction<IOrder[]>>,
  setEditOrder: React.Dispatch<React.SetStateAction<IOrder | null>>,
  setOrderMsgs: React.Dispatch<React.SetStateAction<IOrder | null>>
}) => {

  return (

    <ul className="flex flex-col space-y-2 overflow-y-auto min-h-fit ">
      {
        ordersList.map((order) => {
          return <Order key={order._id} order={order} setEditOrder={setEditOrder} setOrderMsgs={setOrderMsgs}/>
        })
      }
    </ul>

  )
}

export default OrdersList

