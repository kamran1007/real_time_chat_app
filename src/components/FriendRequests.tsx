'use client'

import axios from 'axios'
import {  Check, UserPlus, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import router from 'next/router'
import { FC, useEffect, useState } from 'react'

interface FriendRequestsProps {
  incomingFriendRequests: IncommingFriendsRequest[]
  sessionId: string
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const Router = useRouter()
  const [friendRequests, setFriendRequests] = useState<IncommingFriendsRequest[]>(
    incomingFriendRequests
  )

//   useEffect(() => {
//     pusherClient.subscribe(
//       toPusherKey(`user:${sessionId}:incoming_friend_requests`)
//     )
//     console.log("listening to ", `user:${sessionId}:incoming_friend_requests`)

//     const friendRequestHandler = ({
//       senderId,
//       senderEmail,
//     }: IncomingFriendRequest) => {
//       console.log("function got called")
//       setFriendRequests((prev) => [...prev, { senderId, senderEmail }])
//     }

//     pusherClient.bind('incoming_friend_requests', friendRequestHandler)

//     return () => {
//       pusherClient.unsubscribe(
//         toPusherKey(`user:${sessionId}:incoming_friend_requests`)
//       )
//       pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
//     }
//   }, [sessionId])

  const acceptFriend = async (senderId: string) => {
    await axios.post('/api/friends/accept', { id: senderId })

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    )

    Router.refresh()
  }

  const denyFriend = async (senderId: string) => {
    await axios.post('/api/friends/deny', { id: senderId })

    setFriendRequests((prev) =>
      prev.filter((request) => request.senderId !== senderId)
    )

    Router.refresh()
  }

  return (
    <>
      {friendRequests.length === 0 ? (
        <p className='text-sm text-zinc-500'>Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className='flex gap-4 items-center'>
            <UserPlus className='text-black' />
            <p className='font-medium text-lg'>{request.senderEmail}</p>
            <button
              onClick={() => acceptFriend(request.senderId)}
              aria-label='accept friend'
              className='w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md'>
              <Check className='font-semibold text-white w-3/4 h-3/4' />
            </button>

            <button
              onClick={() => denyFriend(request.senderId)}
              aria-label='deny friend'
              className='w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md'>
              <X className='font-semibold text-white w-3/4 h-3/4' />
            </button>
          </div>
        ))
      )}
    </>
  )
}

export default FriendRequests