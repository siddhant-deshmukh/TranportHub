import { useContext, useState } from 'react'
import AppContext from '../../AppContext'
import { ErrorMsg } from '../others'
import { IOrder } from '../../types'
import axios from 'axios'

const UpdateOrder = () => {

  const [errorMsg, setErrorMsg] = useState<string>('')
  
  const { 
    user, 
    transporters, 
    selectedOrder, setOrders, 
    setModalType, setSelectedOrder 
  } = useContext(AppContext)

  // const [transporterName, setTransporterName] = useState<string>('')

  //@ts-ignore
  const onFormSubmit = (event) => {
    if (!selectedOrder) return

    event.preventDefault()
    const to = event.target.elements?.to?.value
    const from = event.target.elements?.from?.value
    const quantity = event.target.elements?.quantity?.value
    const unit = event.target.elements?.unit?.value
    const address = event.target.elements?.address?.value
    const price = event.target.elements?.price?.value

    console.log(to, from, quantity, unit, address)
    let updateData = {}
    if (user?.user_type === 'manufacturer') {
      updateData = { to, from, quantity, unit, address }
    } else {
      updateData = { price }
    }
    axios.put(`${import.meta.env.VITE_API_URL}/order/${selectedOrder?._id}`, updateData, { withCredentials: true })
      .then(({ status, data }) => {
        console.log(status, data)
        if (status === 200) {

          setOrders((prev) => {
            const index = prev.findIndex((_order) => _order._id === selectedOrder?._id)
            let new_order: IOrder = { ...selectedOrder }

            if (user?.user_type === 'manufacturer') {
              new_order = { ...selectedOrder, to, from, quantity, unit, address }
            } else {
              new_order = { ...selectedOrder, price }
            }

            if (index === -1) return [...prev]

            return prev.slice(0, index).concat([new_order].concat(prev.slice(index + 1)))
          })
          setModalType(null)
          setSelectedOrder(null)
        }
      }).catch((err) => {
        console.error('While uploading order', err)

      })
  }
  const onCancel = () => {
    setModalType(null)
    setSelectedOrder(null)
  }

  return (
    <form
      onSubmit={onFormSubmit}
      className={`order-form  ${false ? 'hidden' : ''} max-w-full mx-3 mt-5 bg-white flex flex-col space-y-3 p-7 border-4 shadow-xl rounded-xl`}>
      {
        errorMsg.length > 0 && <ErrorMsg setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
      }
      <h1 className='text-center text-xl font-semibold'>
        Update Order
      </h1>
      <div
        className='grid grid-cols-2 gap-y-5'
        style={{ gridTemplateColumns: "27% auto " }}>

        <label htmlFor="order_id" className="text-lg">Order ID :</label>
        <input
          disabled={true}
          key={selectedOrder?.order_id}
          defaultValue={selectedOrder?.order_id}
          className="auth-input" />

        {/* <label htmlFor="title" className="text-lg">Title :</label>
            <input
              required
              id="title" 
              type="text"
              name='title'
              minLength={0}
              maxLength={20}
              placeholder='Some short description of order'
              className="auth-input" /> */}

        <label htmlFor="to" className="text-lg">To :</label>
        <input
          disabled={user?.user_type !== 'manufacturer'}
          required
          id="to"
          type="text"
          name='to'
          key={selectedOrder?.to}
          defaultValue={selectedOrder?.to}
          minLength={1}
          maxLength={100}
          className="auth-input" />

        <label htmlFor="from" className="text-lg">From:</label>
        <input
          disabled={user?.user_type !== 'manufacturer'}
          required
          id="from"
          type="from"
          name="from"
          key={selectedOrder?.from}
          defaultValue={selectedOrder?.from}
          minLength={1}
          maxLength={100}
          className="auth-input" />

        <label htmlFor="quantity" className="text-lg">Quantity:</label>
        <input
          disabled={user?.user_type !== 'manufacturer'}
          required
          id="quantity"
          type="number"
          key={selectedOrder?.quantity}
          defaultValue={selectedOrder?.quantity}
          min={1}
          name="quantity"
          className="auth-input" />

        <label htmlFor="unit" className="text-lg">Unit: </label>
        <select
          disabled={user?.user_type !== 'manufacturer'}
          required
          id="unit"
          name="unit"
          className="auth-select"
          key={selectedOrder?.unit}
          defaultValue={'ton'}>
          <option className='' value={'ton'}>ton</option>
          <option className='' value="ton">kg</option>
        </select>

        <label htmlFor="price" className="text-lg">Price:</label>
        <input
          disabled={user?.user_type !== 'transporter'}
          required
          id="price"
          type="number"
          min={1}
          name="price"
          key={selectedOrder?.price}
          defaultValue={(selectedOrder?.price)}
          className="auth-input" />

        <label htmlFor="transporter" className="text-lg">Transporter: </label>
        <select
          disabled={true}
          required
          id="transporter"
          name="transporter"
          className="auth-select"
          value={selectedOrder?.transporter_id}>
          {
            transporters.map(({ _id, name }) => {
              return <option key={_id} className='' value={_id + '_' + name}>{name}</option>
            })
          }
        </select>

        <label htmlFor="address" className="text-lg">Address: </label>
        <textarea
          disabled={user?.user_type !== 'manufacturer'}
          required
          rows={4}
          id="address"
          name="address"
          minLength={5}
          key={selectedOrder?.address}
          defaultValue={selectedOrder?.address}
          maxLength={200}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

        <div className='col-span-2 flex justify-between space-x-3 text-white font-bold'>
          <button
            onClick={onCancel}
            type='button'
            className="bg-red-500 w-full p-2 text-center rounded-md">
            Cancel
          </button>
          <button
            type='submit'
            className="bg-blue-700 w-full p-2 text-center rounded-md">
            Update Order
          </button>
        </div>
      </div>
    </form>
  )

}

export default UpdateOrder