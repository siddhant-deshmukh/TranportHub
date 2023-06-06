import { useEffect, useRef } from 'react'
import { IMsg } from '../../types'
import Msg from './Msg'
import { Spinner } from '../others'

const MsgList = ({ msgs, listLoading }: {
  msgs: IMsg[] | null,
  listLoading: boolean
}) => {
  const listEnd = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    listEnd.current?.scrollIntoView({ behavior: "instant", block: "nearest", inline: "nearest" });
  }, [msgs])
  if(listLoading){
    return <div className='w-full h-full pt-5 flex place-content-center'>
      <Spinner />
    </div>
  }
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {
        msgs?.map((msg) => {
          return <Msg key={msg._id} msg={msg} />
        })
      }
      <div id="listend" ref={listEnd}></div>
    </div>
  )
}

export default MsgList