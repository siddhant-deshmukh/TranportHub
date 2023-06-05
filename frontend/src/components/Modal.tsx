import { useContext } from 'react'
import AppContext from '../AppContext'
import OrderForm from './order/OrderForm'
import OrderMsgs from './order/OrderMsgs'
import UpdateOrder from './order/UpdateOrder'

const Modal = () => {
  const { modalType, selectedOrder, setModalType, setSelectedOrder } = useContext(AppContext)

  if (modalType === 'new-order' || ((modalType === 'messages' || modalType === 'update-order') && selectedOrder)) {
    return (
      <div className={`fixed flex lg:hidden  items-center z-30 top-0 left-0 w-screen h-screen bg-black bg-opacity-50`}>

        <button
          className='p-3 bg-white absolute top-5 right-5 w-fit rounded-full'
          onClick={()=>{ setModalType(null); setSelectedOrder(null) }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className='mx-auto w-full h-full max-w-2xl'>
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
      </div>
    )
  } else {
    <div></div>
  }
}

export default Modal