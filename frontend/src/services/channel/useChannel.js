import { useContext, useReducer, useEffect, useState } from 'react'
import SocketContext from './socketContext'

const useChannel = (gameCode, reducer, initialState, token) => {
  const socket = useContext(SocketContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [channel, setChannel] = useState()

  useEffect(() => {
    setChannel(socket.channel(gameCode, { client: 'browser', token: token }))

    channel.onMessage = (event, payload) => {
      dispatch({ event, payload })
      return payload
    }

    channel.join()
      .receive("ok", ({ messages }) => console.log('successfully joined channel', messages || ''))
      .receive("error", ({ reason }) => console.error('failed to join channel', reason))

    return () => {
      channel.leave()
    }
  }, [gameCode, socket, token])

  const localDispatch = (event, payload) => {
    channel.push(event, payload)
    dispatch({event, payload})

  }

  return [state, localDispatch]
}


export default useChannel