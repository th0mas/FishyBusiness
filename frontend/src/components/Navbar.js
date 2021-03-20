import logo from "../images/fish.png";

const Navbar = ({ me, setShowShop, setShowItems }) => {

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7x1 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src={logo} alt="fish" />
              </div>
              <div className="md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <p className="text-gray-300 px-3 py-2 text-sm font-medium">£ {me.money}</p>
                  <p className="text-gray-300 px-3 py-2 text-sm font-medium">bait: {me.bait}</p>
                </div>
              </div>
            </div>
            <div className="md:block">
              <div className="flex items-center md:ml-6">
                <button onClick={() => setShowItems(true)} className="text-gray-300 px-3 py-2 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Items</button>
                <button onClick={() => setShowShop(true)} className="text-gray-300 px-3 py-2 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Shop</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar