import { useEffect, useState } from "react"
import { IOrder } from "../../types"
import axios, { AxiosResponse } from "axios"
import Order from "./Order"

const OrdersList = ({ ordersList, setOrdersList }: {
  ordersList: IOrder[],
  setOrdersList: React.Dispatch<React.SetStateAction<IOrder[]>>
}) => {

  return (
    <div className="overflow-y-auto h-full w-[55%]">
      <ul className="flex flex-col space-y-2 overflow-y-auto min-h-fit "> 
        {
          ordersList.map((order) => {
            return <Order key={order._id} order={order} />
          })
        }
      </ul>
    </div>
  )
}

export default OrdersList

