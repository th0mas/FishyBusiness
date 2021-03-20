import { useContext, useReducer, useEffect } from 'react'
import SocketContext from './socketContext'

const useChannel = (gameCode, reducer, initialState, token) => {
  const socket = useContext(SocketContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const channel = socket.channel(gameCode, { client: 'browser', token: token })

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

  return state
}


export default useChannel