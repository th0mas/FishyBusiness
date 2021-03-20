import { useContext, useReducer, useEffect } from 'react'
import SocketContext from './sockets/socketContext'

const useChannel = (channelTopic, reducer, initialState) => {
  const socket = useContext(SocketContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const channel = socket.channel(channelTopic, {client: 'browser'}) 
    
    channel.onMessage = (event, payload) => {
      dispatch({ event, payload })
      return payload
    }

    channel.join()
      .receive("ok", ({messages}) =>  console.log('successfully joined channel', messages || ''))
      .receive("error", ({reason}) => console.error('failed to join channel', reason))
    
    return () => {
      channel.leave()
    }
  }, [channelTopic])

  return state
}


export default useChannel