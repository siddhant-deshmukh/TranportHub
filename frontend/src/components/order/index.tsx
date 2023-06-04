import React, { useEffect, useState } from 'react'
import { IOrder } from '../../types'
import axios, { AxiosResponse } from 'axios'
import OrdersList from './OrdersList'
import OrderForm from './OrderForm'

const OrderDashboard = () => {
  const [ordersList, setOrdersList] = useState<IOrder[]>([])
  useEffect(() => {
    getOrdersList(5, 0)
      .then((ordersList) => {
        setOrdersList(ordersList)
      }).catch((err) => {
        console.error("Something wrong in ordersList")
      })
  }, [])
  return (
    <div className='relative h-full w-full  pt-14 px-2 pb-20'>
      <OrdersList setOrdersList={setOrdersList} ordersList={ordersList} />
      <div className='absolute min-w-fit right-0 top-4'>
        <OrderForm setOrdersList={setOrdersList} />
      </div>
    </div>
  )
}

export default OrderDashboard

async function getOrdersList(limit: number, skip: number) {
  try {
    const res: void | AxiosResponse<any, any> = await axios.get(
      `${import.meta.env.VITE_API_URL}/order?skip=${skip}&limit=${limit}`,
      { withCredentials: true })
      .catch((err) => {
        // const { response } = err
        // const { status } = response
        console.error('While getting orderList', err)
      })
    if (!res) {
      console.error("Som error occured in getOrderList")
      return []
    }
    const { data } = res
    return data.orders as IOrder[]
  } catch (err) {
    console.error("Som error occured in getOrderList", err)
    return []
  }
}
