defmodule FishyBusiness.Game.Manager do
  use GenServer

  require Logger

  import FishyBusinessWeb.Endpoint

  @initial_state %{
    playing: true,
    regions: [
      %{
        stock: 1000,
        types: ["haddock", "cod"],
        active: []
      },
      %{
        stock: 500,
        types: ["hake", "cod"],
        active: []
      },
      %{
        stock: 700,
        types: ["haddock", "salmon"],
        active: []
      },
    ]
  }

  @initial_player %{
    money: 100,
    bait: 10,
    items: []
  }

  # Initial State:
  # Players & details
  # Fish stocks

  def start_link(opts) do
    name = Keyword.get(opts, :name)
    state = opts |> Enum.into(%{})
    GenServer.start_link(__MODULE__, state, name: name)
  end

  def init(%{game: game, players: players} = state) do
    broadcast!(game, "init_game", gen_initial_state(players))
    send(self(), :timed_event)
    Logger.info("Game manager inited for" <> game)


    state = state |>
      Map.put(:current, @initial_state)
    {:ok, state}
  end

  def handle_info(:timed_event, %{game: game} = state) do
    broadcast!(game, "timed_event", %{})
    Process.send_after(self(), :timed_event, 1000 * 60 * 2)
    {:noreply, state}
  end

  def gen_initial_state(players) do
    Logger.info inspect(players)

    @initial_state
    |> Map.put(:players, Enum.map(players,
      fn {k, v} -> Map.merge(@initial_player, %{name: v |> Map.get(:metas) |> List.first |> Map.get(:name), id: k}) end)
    )
    |> Map.put(:me, @initial_player)
  end


end
