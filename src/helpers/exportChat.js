import { format } from 'date-fns'
import { fetchRedis } from './redis'

export async function formattedExportMessage(messages, chatId) {
  const [userId1, userId2] = chatId.split('--')
  const user1 = await fetchRedis('get', `user:${userId1}`)
  const user2 = await fetchRedis('get', `user:${userId2}`)
  const user1Name = JSON.parse(user1).name
  const user2Name = JSON.parse(user2).name

  const chatTranscript = messages
    .map((message) => {
      const time = format(message.timestamp, 'HH:mm')
      if (message.senderId == userId1) {
        return `${user1Name} at ${time}: ${message.text}`
      } else {
        return `${user2Name} at ${time}: ${message.text}`
      }
    })
    .reverse()
    .join('\n')
  const blob = new Blob([chatTranscript], { type: 'text/plain' })
  return blob
}
