import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Socket } from 'phoenix'

import SocketContext from './socketContext'

const SocketProvider = ({ wsUrl, options, children }) => {
  const [socket, setSocket] = useState()
  useEffect(() => {
    const socket = new Socket((process.env['NODE_ENV'] === 'production' ? 'wss://fb.tomhaines.uk' : 'ws://localhost:4000') + '/socket');
    socket.connect();
    setSocket(socket);
  }, [])

  if (!socket) return null;

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

SocketProvider.defaultProps = {
  options: {}
}

SocketProvider.propTypes = {
  wsUrl: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
}

export default SocketProvider