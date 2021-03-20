import Rod from '../images/Rod.png';
import Net from '../images/Net.png'
import { useContext, useState } from 'react';
import dispatchContext from '../services/dispatchContext';

const addItem = (me, item, dispatch) => {
  if (me.money >= item.price) {
    let newItems = [...me.items]
    newItems.push(item)
    
    dispatch("money-update", me.money - item.price)
    dispatch("items-update", newItems)
  } else {
    alert("You do not have enough money!")
  }

}

const SlideItem = ({ item, me, shop}) => {
  const imgs = {"Rod": Rod, "Net": Net}
  let dispatch = useContext(dispatchContext)
  const [error, setError] = useState(false);

  return (
    <div className="max-w-md w-full mb-2 lg:flex rounded border-r border-b border-l border-grey-light lg:border-t lg:border-grey-light">
      <div className="h-40 lg:h-auto lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title={item.name}>
        <img src={imgs[item.img]} />
      </div>
      <div className="w-full bg-white p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-black font-bold text-xl mb-2">{ item.name }</div>
          <p className="text-grey-darker text-base">{ item.description }</p>
        </div>
        { shop &&
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>£{ item.price }</p>
          </div>
          <div className="flex items-center justify-end">
            <button onClick={() => addItem(me, item, dispatch)} className="right-0 bg-green-500 text-white px-3 py-2 hover:bg-green-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Buy</button>
          </div>
        </div>
        }
      </div>
    </div>
  )
}

export default SlideItem