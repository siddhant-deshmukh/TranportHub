import React, { useState } from 'react'
import { IOrder } from '../../types'
import { ErrorMsg } from '../others'

const OrderForm = ({ setOrdersList }: {
  setOrdersList: React.Dispatch<React.SetStateAction<IOrder[]>>
}) => {

  const [errorMsg, setErrorMsg] = useState<string>('')

  const onFormSubmit = () => {

  }

  return (
    <form onSubmit={onFormSubmit} className='w-full flex flex-col space-y-3 max-w-lg p-7 border-2 shadow-xl rounded-xl'>
      {
        errorMsg.length > 0 && <ErrorMsg setErrorMsg={setErrorMsg} errorMsg={errorMsg} />
      }
      <div className="flex space-x-2 items-center">
        <label htmlFor="name" className="min-w-fit text-lg">OrderId :</label>
        <input
          required
          id="name"
          type="text"
          name='name'
          minLength={1}
          maxLength={30}
          className="auth-input" />
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="to" className="min-w-fit text-lg">To :</label>
        <input
          required
          id="to"
          type="text"
          name='to'
          minLength={1}
          maxLength={50}
          className="auth-input" />
      </div>
      <div className="flex space-x-2 items-center">
        <label htmlFor="from" className="min-w-fit text-lg">From:</label>
        <input
          required
          id="from"
          type="from"
          name="from"
          minLength={5}
          maxLength={20}
          className="auth-input" />
      </div>
      <div className="">
        <label htmlFor="user_type" className="">Choose user type</label>
        <select
          id="user_type"
          name="user_type"
          className="auth-select">
          <option className='w-full p-2' value={'manufacturer'} selected>Manufacturer</option>
          <option className='' value="transporter">Transporter</option>
        </select>
      </div>
      <div className='flex'>
        <button
          type='submit'
          className="bg-red-600 form-button">
          Cancel
        </button>
        <button
          type='submit'
          className="form-button ">
          Register
        </button>
      </div>
    </form>
  )
}

export default OrderForm