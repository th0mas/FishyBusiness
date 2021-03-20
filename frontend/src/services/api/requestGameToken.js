const requestGameToken = (gameName, setToken) => {
  fetch(`http://localhost:4000/api/rooms?token=${gameName}`)
    .then(response => response.json())
    .then(data => setToken(data.token))
}

export default requestGameToken;