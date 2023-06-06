import { useContext, useState } from 'react'
import { ErrorMsg } from '../others'
import AppContext from '../../AppContext'
import axios from 'axios'

const OrderForm = () => {
  const { user, transporters, setOrders, setModalType } = useContext(AppContext)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [transporterName, setTransporterName] = useState<string>('')
  const [ loading, setLoading ] = useState<boolean>(false)

  //@ts-ignore
  const onFormSubmit = (event) => {
    event.preventDefault()
    const order_id = event.target.elements?.order_id?.value
    // const title = event.target.elements?.title?.value
    const to = event.target.elements?.to?.value
    const from = event.target.elements?.from?.value
    const quantity = event.target.elements?.quantity?.value
    const unit = event.target.elements?.unit?.value
    const address = event.target.elements?.address?.value
    const transporter_value = event.target.elements?.transporter?.value
    const transporter_id = transporter_value.slice(0, transporter_value.indexOf('_'))

    if(loading) return
    console.log(order_id, to, from, quantity, unit, address, transporter_id)
    setLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/order`, {
      order_id,
      to,
      from,
      quantity,
      unit,
      address,
      transporter_id,
      // title
    }, { withCredentials: true })
      .then(({ status, data }) => {
        console.log(status, data)
        if (data?.order?._id) {
          setOrders((prev) => {
            const list = [data?.order].concat([...prev])
            console.log(list)
            return list
          })
        }
        setModalType(null)
      }).catch((err) => {
        console.error('While uploading order', err)

      }).finally(()=>{
        setLoading(false)
      })
  }


  return (
    <div className='w-full h-full flex items-center px-3'>

      {/* <button
        onClick={() => { setToggle(prev => !prev) }}
        className='w-full flex items-center place-content-center  space-x-3  p-2 rounded-md bg-blue-600 text-white font-bold'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>New Order</span>
      </button> */}

      {/* {
      !toggle && */}
      <form
        onSubmit={onFormSubmit}
        className={`order-form  w-full  bg-white flex flex-col space-y-3 p-7 border-2 border-blue-200 shadow-blue-100 shadow-xl rounded-b-xl`}>
        
        <h1 className='text-center text-xl font-semibold'>
          Create Order 
        </h1>
        
        {
          errorMsg.length > 0 && <ErrorMsg setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
        }
        <div
          className='grid grid-cols-2 gap-y-5'
          style={{ gridTemplateColumns: "27% auto " }}>

          <label htmlFor="order_id" className="text-lg">Order ID :</label>
          <input
            disabled={user?.user_type !== 'manufacturer'}
            required
            id="order_id"
            type="text"
            name='order_id'
            defaultValue={generateRandomId()}
            minLength={5}
            maxLength={5}
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
            defaultValue={user?.name}
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
            value={transporterName}
            onChange={(event) => { setTransporterName(event.target.value) }}
            minLength={1}
            maxLength={100}
            className="auth-input" />

          <label htmlFor="quantity" className="text-lg">Quantity:</label>
          <input
            disabled={user?.user_type !== 'manufacturer'}
            required
            id="quantity"
            type="number"
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
            className="auth-input" />

          <label htmlFor="transporter" className="text-lg">Transporter: </label>
          <select
            disabled={user?.user_type !== 'manufacturer'}
            required
            id="transporter"
            name="transporter"
            className="auth-select"
            onChange={(event) => {
              let val = event.target.value
              setTransporterName(val.slice(val.indexOf('_') + 1))
            }}>
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
            defaultValue={user?.address}
            maxLength={200}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>

          <div className='col-span-2 flex justify-between space-x-3 text-white font-bold'>
            <button
              type='button'
              onClick={() => { setModalType(null) }}
              className="bg-red-500 w-full p-2 text-center rounded-md">
              Cancel
            </button>
            <button
              type='submit'
              className="bg-blue-700 w-full p-2 text-center rounded-md">
              Create Order
            </button>
          </div>
        </div>
      </form>
      {/* } */}
    </div>
  )
}

function generateRandomId() {
  let final = "";
  let ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
  for (let i = 0; i < 2; i++) {
    final += ch[Math.floor(Math.random() * ch.length)];
  }
  final += Math.floor(Math.random() * 100000).toString().slice(-3)
  return final;
}

export default OrderForm