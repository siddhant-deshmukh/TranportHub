import { useContext } from 'react'
import { IMsg } from '../../types'
import AppContext from '../../AppContext'

const Msg = ({ msg }: {
  msg: IMsg
}) => {
  const { user } = useContext(AppContext)
  let date = new Date(msg.time);
  let istDateString = date.toLocaleString(undefined, { timeZone: "Asia/Kolkata" });

  return (
    <div
      id={msg._id}
      className={`w-[80%] max-w-md ${(user?._id === msg.author_id) ? 'ml-auto bg-green-200' : 'mr-auto bg-gray-200'} p-3 my-2 rounded-lg`}>
      <div className=' whitespace-pre-wrap text-ellipsis'>
        {msg.text}
      </div>
      <div className='ml-auto w-fit text-sm font-semibold text-gray-600'>
        {istDateString}
      </div>
    </div>
  )
}

export default Msg