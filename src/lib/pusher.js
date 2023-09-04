import PusherServer from 'pusher'
import PusherClient from 'pusher-js'
console.log(process.env.NEXT_PUBLIC_PUSHER_APP_KEY)

var Pusher = require('pusher')

export var pusherServer = new Pusher({
  appId: '1664349',
  key: '3fab6959c418009c6572',
  secret: '6d11bae8dba3d0fb8b3c',
  cluster: 'ap2',
})

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  {
    cluster: 'ap2',
  }
)
