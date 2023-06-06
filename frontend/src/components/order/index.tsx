import { useContext, useEffect, useState } from 'react'
import { IOrder } from '../../types'
import axios, { AxiosResponse } from 'axios'
import AppContext from '../../AppContext'
import Order from './Order'
import SideBar from './SideBar'
import { Spinner } from '../others'

const OrderDashboard = () => {
  const { setOrders, orders, setModalType, user } = useContext(AppContext)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    getOrdersList(5, 0)
      .then((ordersList) => {
        setOrders(ordersList)
      }).catch((err) => {
        console.error("Something wrong in ordersList", err)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className='relative flex h-full max-h-full  w-full pb-20'>
      <div className=' w-full lg:w-[45%] overflow-y-auto h-full '>
        {
          !loading &&
          <ul className="flex flex-col space-y-2 overflow-y-auto min-h-fit ">
            {
              orders.map((order) => {
                return <Order key={order._id} order={order} />
              })
            }
          </ul>
        }{
          loading &&
          <div className='flex w-full h-full  space-y-2 overflow-y-auto min-h-fit place-content-center pt-5'>
            <Spinner />
          </div>
        }
      </div>

      <div className='hidden lg:block lg:w-[55%]  h-full '>
        <SideBar />
      </div>

      {
        user?.user_type === 'manufacturer' &&
        <div className='absolute z-20 left-2 bottom-32 rounded-full'>
          <button
            onClick={() => { setModalType('new-order') }}
            className='w-full flex items-center place-content-center  space-x-3  p-3  bg-blue-600 text-white rounded-full font-bold'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            <span className='text-sm'>New Order</span>
          </button>
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
