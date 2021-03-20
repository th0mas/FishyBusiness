const requestGameToken = async (gameName) => {
  const res = await fetch(`http://localhost:4000/api/rooms/${gameName}`);
  if (res.ok) {
    return res.json().token;
  } else {
    throw Error();
  }
}

export default requestGameToken;