'use client'
import { pusherClient } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { useState } from 'react'

const { useEffect } = require('react')

export const Online = ({ userId }) => {
  const [online, setOnline] = useState(null)
  console.log(userId, 'userId')
  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`online:${userId}`))
    const onlineHandler = (userId) => {
      console.log(userId, 'userId')
      setOnline(userId)
    }
    pusherClient.bind(`user-online:${userId}`, onlineHandler)
    return () => {
      pusherClient.unsubscribe(toPusherKey(`online:${userId}`))
      pusherClient.unbind(`user-online:${userId}`, onlineHandler)
    }
  }, [userId])
  console.log(online, 'online')
  return (
    <>
      {online ? (
        <div className='flex items-center'>
          <div className='w-2 h-2 bg-green-400 rounded-full mr-2' />
          <span className='text-sm text-gray-600'>Online</span>
        </div>
      ) : (
        <div className='flex items-center'>
          <div className='w-2 h-2 bg-red-400 rounded-full mr-2' />
          <span className='text-sm text-gray-600'>Offline</span>
        </div>
      )}
    </>
  )
}
