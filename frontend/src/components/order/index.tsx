import { useEffect, useState } from 'react'
import { IOrder } from '../../types'
import axios, { AxiosResponse } from 'axios'
import OrdersList from './OrdersList'
import UpdateOrder from './UpdateOrder'
import OrderMsgs from './OrderMsgs'

const OrderDashboard = () => {
  const [ordersList, setOrdersList] = useState<IOrder[]>([])
  const [editOrder, setEditOrder] = useState<IOrder | null>(null)
  const [orderMsgs, setOrderMsgs] = useState<IOrder | null>(null)

  useEffect(() => {
    getOrdersList(5, 0)
      .then((ordersList) => {
        setOrdersList(ordersList)
      }).catch((err) => {
        console.error("Something wrong in ordersList",err)
      })
  }, [])

  return (
    <div className='relative flex max-h-full  w-full pb-20'>
      <div className='w-full lg:w-[45%] overflow-y-auto h-full '>
        <OrdersList
          setOrdersList={setOrdersList}
          ordersList={ordersList}
          setEditOrder={setEditOrder}
          setOrderMsgs={setOrderMsgs} />
      </div>

      {/* <div className='absolute w-full max-h-full z-20 inset-x-0 top-4'>
        <OrderForm setOrdersList={setOrdersList} />
      </div> */}

      {
        (editOrder || orderMsgs) &&
        <div className=' absolute w-full lg:relative lg:w-[55%] overflow-y-auto h-full'>

          {
            editOrder &&
            <UpdateOrder order={editOrder} setOrdersList={setOrdersList} setEditOrder={setEditOrder} />
          }
          {
            !editOrder && orderMsgs &&
            <OrderMsgs orderMsgs={orderMsgs} setOrderMsgs={setOrderMsgs} />
          }
        </div>
      }
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
