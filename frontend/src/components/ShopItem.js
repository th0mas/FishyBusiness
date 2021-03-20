import Rod from '../images/Rod.png';
import Net from '../images/Net.png'

const ShopItem = ({ item }) => {
  const imgs = {"Rod": Rod, "Net": Net}

  return (
    <div className="max-w-md w-full mb-2 lg:flex">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title={item.name}>
        <img src={imgs[item.img]} />
      </div>
      <div className="w-full border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-black font-bold text-xl mb-2">{ item.name }</div>
          <p className="text-grey-darker text-base">{ item.description }</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <p>£{ item.price }</p>
          </div>
          <div className="flex items-center justify-end">
            <button onClick={() => alert("sold!")} className="right-0 bg-green-500 text-white px-3 py-2 hover:bg-green-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Buy</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopItem