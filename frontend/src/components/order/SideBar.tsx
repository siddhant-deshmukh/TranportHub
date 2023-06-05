import  { useContext } from 'react'
import AppContext from '../../AppContext'
import OrderForm from './OrderForm'
import OrderMsgs from './OrderMsgs'
import UpdateOrder from './UpdateOrder'

const SideBar = () => {
  const { modalType } = useContext(AppContext)
  return (
    <div className='w-full h-full'>
      {
        modalType === 'new-order' &&
        <OrderForm />
      }
      {
        modalType === 'messages' &&
        <OrderMsgs />
      }
      {
        modalType === 'update-order' &&
        <UpdateOrder />
      }
    </div>
  )
}

export default SideBar