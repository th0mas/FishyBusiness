import { useContext, useReducer, useEffect, useState } from 'react'
import SocketContext from './socketContext'

const useChannel = (name, gameCode, reducer, initialState, token) => {
  const socket = useContext(SocketContext)
  const [state, dispatch] = useReducer(reducer, initialState)
  const [channel, setChannel] = useState()

  useEffect(() => {
    const c = socket.channel(`game:${gameCode}`, { name: name, client: 'browser', token: token })
    setChannel(c)

    c.onMessage = (event, payload) => {
      dispatch({ event, payload })
      return payload
    }

    console.log('here')
    c.join()
      .receive("ok", ({ messages }) => console.log('successfully joined channel', messages || ''))
      .receive("error", ({ reason }) => console.error('failed to join channel', reason))
      .receive("timeout", () => console.log("Networking issue. Still waiting..."))

    return () => {
      c.leave()
    }
  }, [gameCode, name, socket, token]);

  const localDispatch = (event, payload) => {
    channel.push(event, payload);
    dispatch({ event, payload });
  }

  return [state, localDispatch]
}


export default useChannel