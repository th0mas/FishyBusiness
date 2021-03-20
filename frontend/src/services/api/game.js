const url = "http://localhost:4000/api/rooms/"

const headers = {'Accept': 'application/json',
'Content-Type': 'application/json'}

const requestGameToken = (gameName, setToken) => {
  fetch(url + gameName)
    .then(response => response.json())
    .then(data => setToken(data.token))
}

const createNewGame = (name, password) => {
  let body = JSON.stringify({ room: {
    name: name,
    password: password
  }})

  return fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  }).then(resp => resp.json())
  .then(body => body.data)
}

export {requestGameToken, createNewGame};