import React, { useEffect, useRef } from 'react'
import { IMsg } from '../../types'
import Msg from './Msg'

const MsgList = ({msgs}:{
  msgs: IMsg[] | null
}) => {
  const listEnd = useRef<HTMLDivElement | null>(null)
  useEffect(()=>{
    listEnd.current?.scrollIntoView({ behavior: "instant", block:"nearest", inline:"nearest" });
  },[msgs])
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