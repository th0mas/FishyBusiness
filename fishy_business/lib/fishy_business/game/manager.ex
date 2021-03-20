defmodule FishyBusiness.Game.Manager do
  use GenServer

  import FishyBusinessWeb.Endpoint

  @initial_state %{
    regions: [
      %{
        stocks: 1000,
        types: ["haddock", "cod"]
      },
      %{
        stocks: 500,
        types: ["hake", "cod"]
      },
      %{
        stocks: 700,
        types: ["haddock", "salmon"]
      },
    ]
  }

  # Initial State:
  # Players & details
  # Fish stocks

  def start_link(opts) do
    name = Keyword.get(opts, :name)
    GenServer.start_link(__MODULE__, opts, name: name)
  end

  def init(%{game: game, players: _players} = state) do
    send(self(), :init_game)
    broadcast!(game, "init_game", @initial_state)
    {:ok, state}
  end

end
