import { IOrder } from "../../types"

const Order = ({ order }: {
  order: IOrder
}) => {
  return (
    <div className="order-container flex flex-col border-2 max-w-[700px] p-5 rounded-xl ">
      <div className="">
        <label htmlFor="order_id" className="mb-0.5 ml-1">Order Id</label>
        <input
          disabled={true}
          type="text"
          defaultValue={order.order_id}
          name='name'
          minLength={1}
          maxLength={30}
          className="form-input" />
      </div>
      <div className="flex space-x-4 mt-1 mb-10">
        <div>
          <label htmlFor="order_id" className="mb-0.5 ml-1">To</label>
          <input
            disabled={true}
            type="text"
            defaultValue={order.to}
            className="form-input" />
        </div>
        <div>
          <label htmlFor="order_id" className="mb-0.5 ml-1">From</label>
          <input
            disabled={true}
            type="text"
            defaultValue={order.from}
            className="form-input" />
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="">
          <label htmlFor="order_id" className="mb-0.5 ml-1">Quantity</label>
          <input
            disabled={true}
            type="text"
            defaultValue={order.quantity}
            className="form-input" />
        </div>
        <div className="">
          <label htmlFor="order_id" className="mb-0.5 ml-1">Unit</label>
          <input
            disabled={true}
            type="text"
            defaultValue={order.unit}
            className="form-input" />
        </div>
      </div>

      <div className="ml-auto mt-4">
        <label htmlFor="order_id" className="mb-0.5 ml-1">Price</label>
        <input
          disabled={true}
          type="text"
          defaultValue={(order.price)?order.price:'--'}
          className="form-input" />
      </div>
      <div className="ml-auto mt-2">
        <label htmlFor="order_id" className="mb-0.5 ml-1">Status</label>
        <input
          disabled={true}
          type="text"
          defaultValue={order.status}
          className="form-input" />
      </div>
      <button className="w-20 ml-auto mt-4 p-2 text-center rounded-xl bg-green-600 font-semibold text-white">
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