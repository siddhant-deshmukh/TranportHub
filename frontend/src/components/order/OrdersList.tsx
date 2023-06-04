import { useEffect, useState } from "react"
import { IOrder } from "../../types"
import axios, { AxiosResponse } from "axios"

const OrdersList = ({ordersList, setOrdersList}:{
  ordersList: IOrder[],
  setOrdersList: React.Dispatch<React.SetStateAction<IOrder[]>>
}) => {
  
  return (
    <div>
      {
        JSON.stringify(ordersList)
      }
    </div>
  )
}

export default OrdersList

