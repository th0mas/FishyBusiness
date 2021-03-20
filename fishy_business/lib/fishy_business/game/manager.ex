defmodule FishyBusiness.Game.Manager do
  use GenServer

  require Logger

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
    state = opts |> Enum.into(%{})
    GenServer.start_link(__MODULE__, state, name: name)
  end

  def init(%{game: game, players: _players} = state) do
    broadcast!(game, "init_game", @initial_state)

    Logger.info("Game manager inited for" <> game)
    {:ok, state}
  end


end
