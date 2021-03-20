const requestGameToken = (gameName, setToken) => {
  fetch(`https://localhost:4000/api/?token=${gameName}`)
    .then(response => response.json())
    .then(data => setToken(data.token))
}

export default requestGameToken;