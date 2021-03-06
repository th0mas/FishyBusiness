const DropdownMenu = ({ gameState, handleClick, region }) => {
  let fishingItems = gameState.me.items.filter(item => item.name !== "Oil Spill")

  return (
    <div className="flex">
    <div className="group inline-block self-center pr-2">
      <button
        className="outline-none cursor-auto focus:outline-none border px-3 py-1 hover:bg-green-500 bg-green-400 rounded-sm flex items-center min-w-32"
      >
        <span className="pr-1 font-semibold text-white flex-1">Fish</span>
        <span>
          <svg
            className="fill-current text-white h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>
      </button>
      <ul
        className="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
      >
        {
          fishingItems.length === 0 && <li className="rounded-sm px-3 py-1 text-gray bg-gray-100">purchase items</li>
        }
        {
          fishingItems.map((item, index) =>
            <li key={index} onClick={() => handleClick(item, region)} className="rounded-sm cursor-pointer px-3 py-1 hover:bg-gray-100">{item.name}</li>
          )
        }
      </ul>
    </div>
    </div>
  )
}

export default DropdownMenu