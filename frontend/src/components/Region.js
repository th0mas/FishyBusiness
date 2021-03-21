import { useContext } from "react";
import dispatchContext from "../services/dispatchContext";
import DropdownMenu from "./DropdownMenu";

function Region({ index, regionState, gameState, me }) {

  let dispatch = useContext(dispatchContext);

  const handlefish = (item, region) => {
    let newItems = [...me.items]
    let currItem = newItems.find(i => i === item)
    
    let newRegions = [...gameState.regions]

    if (item.region === region) {
      currItem.region = null
      newRegions[index].active = newRegions[index].active.filter(player => player !== me.name)
      console.log(newRegions[index].active)
    } else {
      let oldRegion = currItem.region
      currItem.region = region
      newRegions[index].active.push(me.name)
      if (oldRegion != null) {
        newRegions[oldRegion].active = newRegions[oldRegion].active.filter(player => player != me.name)
      }
    }
    
    dispatch("items_update", newItems)
    dispatch("update_region_active", {regions: newRegions})
    
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
          <DropdownMenu gameState={gameState} handleClick={handlefish} region={index} />
          <button className="bg-gray-500 my-2 w-full text-white">oil spill</button>
        </div>
      </div>
    </ div>
  );
}

export default Region;