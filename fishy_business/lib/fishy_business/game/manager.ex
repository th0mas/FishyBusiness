defmodule FishyBusiness.Game.Manager do
  use GenServer

  require Logger

  import FishyBusinessWeb.Endpoint

  @initial_state %{
    playing: true,
    regions: [
      %{
        stocks: 1000,
        types: ["haddock", "cod"],
        active: []
      },
      %{
        stocks: 500,
        types: ["hake", "cod"],
        active: []
      },
      %{
        stocks: 700,
        types: ["haddock", "salmon"],
        active: []
      },
    ],
    me: %{
      money: 100,
      bait: 10,
      items: []
    }
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
    send(self(), :timed_event)
    Logger.info("Game manager inited for" <> game)
    {:ok, state}
  end

  def handle_in(:timed_event, %{game: game} = state) do
    broadcast!(game, "timed_event", %{})
    Process.send_after(self(), :timed_event, 1000 * 60 * 2)
    {:ok, state}
  end


end
