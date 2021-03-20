const url = "http://localhost:4000/api/rooms/"

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

const requestGameToken = async (gameName) => {
  const res = await fetch(url + gameName);
  const response = await res.json()
  if (res.ok) {
    return response.token;
  } else {
    throw Error();
  }
}

const createNewGame = async (name, password) => {
  let body = JSON.stringify({
    room: {
      name: name,
      password: password
    }
  })

  const res = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body
  });
  const response = await res.json();
  return response.data();
}

export { requestGameToken, createNewGame };