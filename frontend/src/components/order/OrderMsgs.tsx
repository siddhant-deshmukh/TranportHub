import { useContext, useEffect, useState } from "react"
import AppContext from "../../AppContext"
import { IMsg } from "../../types"
import axios from "axios"
import MsgList from "./MsgList"
import { Spinner } from "../others"


const OrderMsgs = () => {
  const { user, selectedOrder, setModalType, setSelectedOrder } = useContext(AppContext)
  const [msgs, setMsgs] = useState<IMsg[] | null>(null)
  const [newMsg, setNewMsg] = useState<string>('')

  const [listLoading, setListLoading] = useState<boolean>(false)
  const [newMsgLoading, setNewMsgLoading] = useState<boolean>(false)

  const uploadNewMsg = (newMsg: string) => {
    if (newMsg.length > 400 || newMsg.length < 1) return
    console.log("Sending!")

    setNewMsgLoading(true)
    axios.post(`${import.meta.env.VITE_API_URL}/msg/${selectedOrder?._id}`, { text: newMsg }, { withCredentials: true })
      .then(({ status, data }) => {
        console.log(status, data)
        if (data?.msg) {
          setMsgs(prev => {
            if (!prev) return [data.msg]
            return [...prev].concat([data.msg])
          })
          setNewMsg('')
        }
      }).catch((err) => {
        console.error('while uploading message', err)
      }).finally(() => {
        setNewMsgLoading(false)
      })
  }

  useEffect(() => {
    setListLoading(true)
    axios.get(`${import.meta.env.VITE_API_URL}/msg/${selectedOrder?._id}`, { withCredentials: true })
      .then(({ status, data }) => {
        console.log('msgs', status, selectedOrder?._id, data)
        if (Array.isArray(data?.msgs)) {
          console.log("Here!", data.msgs)
          setMsgs(data.msgs)
        }
      }).catch((err) => {
        console.error('while getting msgs', selectedOrder?._id, err)
      }).finally(() => {
        setListLoading(false)
      })
  }, [selectedOrder])

  return (
    <div className="w-full h-full max-h-full flex flex-col overflow-y-auto border relative pb-0 lg:pb-0 bg-green-50">
      {/* <div className="h-full">
        {orderMsgs?._id}
      </div> */}
      <div className="flex items-center w-full bg-green-600 text-white">
        <button
          className="p-3 hover:text-blue-100"
          onClick={() => { setModalType(null); setSelectedOrder(null) }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
        <div className="text-2xl w-full font-bold pl-5">
          {
            user?.user_type === 'manufacturer' &&
            <div className="">{selectedOrder?.from}</div>
          }
          {
            user?.user_type === 'transporter' &&
            <div className="">{selectedOrder?.to}</div>
          }
          <div className="text-sm">{selectedOrder?.order_id}</div>
          <span></span>
        </div>

      </div>

      <MsgList msgs={msgs} listLoading={listLoading} />

      <div
        className="flex h-fit items-center pr-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
        <textarea
          id="chat"
          rows={1}
          value={newMsg}
          onChange={(event) => { setNewMsg(event.target.value) }}
          minLength={1}
          maxLength={400}
          className="block mx-4 p-2.5 w-full text-base max-h-52 min-h-[46px] text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
        <button
          disabled={newMsgLoading}
          onClick={() => { uploadNewMsg(newMsg) }}
          className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
          {
            !newMsgLoading &&
            <>
              <svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              <span className="sr-only">Send message</span>
            </>
          }
          {
            newMsgLoading &&
            <Spinner />
          }
        </button>
      </div>
    </div>
  )
}

export default OrderMsgs