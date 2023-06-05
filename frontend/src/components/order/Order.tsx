// import { useContext, useState } from "react"
import { useContext } from "react"
import { IOrder } from "../../types"
import AppContext from "../../AppContext"
// import AppContext from "../../AppContext"

const Order = ({ order }: {
  order: IOrder,
}) => {

  const { setModalType, setSelectedOrder } = useContext(AppContext)

  return (
    <div
      onClick={(event) => {
        //@ts-ignore
        if (event.target.name === 'btn') return
        setModalType('messages')
        setSelectedOrder(order)
        console.log("ONclick div")
      }}
      className="order-container group hover:cursor-pointer hover:bg-gray-50 flex flex-col border-2 max-w-[700px] p-5 rounded-xl ">

      <div className="text-center  border-2 shadow-lg group-hover:bg-white shadow-blue-100 w-fit mx-auto rounded-full px-10 py-3  flex items-center place-content-center space-x-2 text-lg ">
        <span className="text-base">Order Id &nbsp;: </span>
        <h1 className="font-semibold text-xl">
          {order.order_id}
        </h1>
      </div>

      <div className="flex my-2 flex-col lg:flex-row">
        <div className="w-fit mr-auto">
          <div className="text-center flex items-center place-content-start space-x-2 text-lg ">
            <span className="text-base">To &nbsp; &nbsp; &nbsp; : </span>
            <h1 className=" text-xl">
              {order.to}
            </h1>
          </div>
          <div className="text-center flex items-center place-content-start space-x-2 text-lg ">
            <span className="text-base">From &nbsp;: </span>
            <h1 className=" text-xl">
              {order.from}
            </h1>
          </div>
        </div>

        <div className="w-fit ml-auto">
          <div className="text-left flex items-center place-content-start space-x-2 text-lg ">
            <span className="text-base">Quantity &nbsp;: </span>
            <h1 className=" text-xl">
              {order.quantity + ' ' + order.unit}
            </h1>
          </div>
          <div className="text-left flex items-center place-content-start space-x-2 text-lg ">
            <span className="text-base">Price &nbsp; &nbsp; &nbsp; : </span>
            <h1 className=" text-xl">
              {(order.price) ? (order.price) : ' -- '}
            </h1>
          </div>
        </div>
      </div>
      {/* <h1 className="text-left">To &nbsp; &nbsp; &nbsp;: {order.to}</h1>
      <h1 className="text-left">From : {order.from}</h1>
      <h1 className="text-right">Quantity: {order.quantity + ' ' + order.unit}</h1>
      <h1 className="text-right">Price: {(order.price) ? (order.price) : ' -- '}</h1> */}

      <button
        onClick={() => { setModalType('update-order'); setSelectedOrder(order) }}
        name="btn"
        className="w-fit  ml-auto mt-4 py-2 px-24 mx-auto hover:bg-green-600 text-center rounded-xl bg-green-500 font-semibold text-white">
        Edit
      </button>

    </div>
  )
  // return (
  //   <div className="order-container">
  //     <div className="place-content-center text-center text-3xl">
  //       <span className="font-medium">Order ID : </span>
  //       <h1 className="font-bold">{order.order_id}</h1>
  //     </div>
  //     <div className="text-2xl mt-4">
  //       <span className="font-medium">To : </span>
  //       <h1 className="font-bold">{order.to}</h1>
  //     </div>
  //     <div className="text-2xl">
  //       <span className="font-medium">From : </span>
  //       <h1 className="font-bold">{order.from}</h1>
  //     </div>

  //     <div className="text-2xl text-right">
  //       <span className="font-medium">Quantity : </span>
  //       <h1 className="font-bold">{order.quantity} {order.unit}</h1>
  //     </div>
  //   </div>
  // )
}

export default Order