function Region({ index, regionState }) {
  return (
    <div className="region">
      <p>Region: {index}</p>
      <p>Stock: {regionState.stock}</p>
      {
        regionState.types.map((value, index) => <p key={index}>{value}</p>)
      }
    </ div>
  );
}

export default Region;