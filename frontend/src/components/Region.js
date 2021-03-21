import { useContext } from "react";
import dispatchContext from "../services/dispatchContext";

function Region({ index, regionState, gameState }) {

  let dispatch = useContext(dispatchContext);

  const handlefish = () => {
    console.log(gameState.me);
    //console.log(gameState.me.regions_fished);
    //dispatch('fish_region', { regions: new Set(gameState.me.regions_fished.push(index)) });
  }

  return (
    <div className="region w-full m-2 p-2 border-2 rounded-md border-blue-400">
      <div className="flex flex-col justify-items-stretch">
        <div className="flex-1">
          <h1 className="font-semibold">Region: {index + 1}</h1>
          <p>Players here: </p>
          {
            regionState.active.map((value, index) => <p key={index}>{value}</p>)
          }
          <br />
          <p>Stock: {regionState.stock}</p>
          {
            regionState.types.map((value, index) => <p key={index}>{value}</p>)
          }
        </div>
        <div className="flex-1">
          <button className="bg-green-500 w-full text-white my-2" onClick={handlefish}>fish</button>
          <button className="bg-gray-500 w-full text-white">oil spill</button>
        </div>
      </div>
    </ div>
  );
}

export default Region;