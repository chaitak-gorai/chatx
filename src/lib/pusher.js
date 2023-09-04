import PusherServer from 'pusher'
import PusherClient from 'pusher-js'
console.log(process.env.NEXT_PUBLIC_PUSHER_APP_KEY)

var Pusher = require('pusher')

export var pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: 'ap2',
})

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
  {
    cluster: 'ap2',
  }
)
