const requestGameToken = (gameName, setToken) => {
  fetch(`http://localhost:4000/api/rooms/${gameName}`)
    .then(response => response.json())
    .then(data => setToken(data.token))
}

export default requestGameToken;