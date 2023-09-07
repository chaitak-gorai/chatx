// pages/api/exportChatMessages.js

import { pusherServer } from '@/lib/pusher'
import { toPusherKey } from '@/lib/utils'
import { Network } from 'lucide-react'

export async function POST(req) {
  try {
    // Get the chatId from the query parameters.
    const body = await req.json()
    const { id, status } = body

    await pusherServer.trigger(
      toPusherKey(`online:${id}`),
      `user-online:${id}`,
      status
    )
    return new Response('OK')
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}
