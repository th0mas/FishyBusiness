function Region({ index, regionState }) {
  return (
    <div className="region m-2 p-2 border-2 rounded-md border-blue-400">
      <h1 className="font-semibold">Region: {index}</h1>
      <p>Stock: {regionState.stock}</p>
      {
        regionState.types.map((value, index) => <p key={index}>{value}</p>)
      }
    </ div>
  );
}

export default Region;