function Region({ index, regionState }) {

  const handlefish = () => {

  }

  return (
    <div className="region flex w-full flex-col justify-between m-2 p-2 border-2 rounded-md border-blue-400">
      <div className="flex-1">
        <h1 className="font-semibold">Region: {index + 1}</h1>
      </div>
      <div className="flex-1">
        <p>Stock: {regionState.stock}</p>
        {
          regionState.types.map((value, index) => <p key={index}>{value}</p>)
        }
      </div>
      <div className="flex-1">
        <button className="bg-green-500 w-full text-white my-2">fish</button>
        <button className="bg-gray-500 w-full text-white">oil spill</button>
      </div>
    </ div>
  );
}

export default Region;