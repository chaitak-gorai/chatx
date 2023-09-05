// pages/api/exportChatMessages.js

import { fetchRedis } from '@/helpers/redis'
import { messageArrayValidator } from '@/lib/validations/message'
import { formattedExportMessage } from '@/helpers/exportChat'

export async function POST(req) {
  try {
    // Get the chatId from the query parameters.
    const body = await req.json()
    const { chatId } = body

    // Fetch chat messages from Redis using your existing function.
    const messages = await getChatMessages(chatId)

    // Export the chat messages to a file.
    const blob = await formattedExportMessage(messages, chatId)

    // Send the blob to the client.
    return new Response(blob, {
      headers: {
        'Content-Disposition': `attachment; filename="chat-${chatId}.txt"`,
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error(error)
    return new Response('Error', { status: 500 })
  }
}

// Function to fetch chat messages from Redis.
async function getChatMessages(chatId) {
  try {
    const results = await fetchRedis('zrange', `chat:${chatId}:messages`, 0, -1)
    const dbMessages = results.map((message) => JSON.parse(message))
    const reversedDbMessages = dbMessages.reverse()
    const messages = messageArrayValidator.parse(reversedDbMessages)
    return messages
  } catch (error) {
    throw error // You should propagate the error to handle it in the calling function.
  }
}
