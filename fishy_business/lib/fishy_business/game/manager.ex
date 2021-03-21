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

    state = state |>
      Map.put(:current, @initial_state)

    {:ok, state}
  end

  def handle_info(:timed_event, %{game: game} = state) do
    broadcast!(game, "timed_event", %{})
    Process.send_after(self(), :timed_event, 1000 * 60 * 2)
    {:noreply, state}
  end

  def handle_info({:items_update, %{items: items, client: client}}, %{current: current} = state) do
    updated = put_in(current, [:players, client, :items], items)
    broadcast!(state.game, "update_state", updated)

    {:noreply, state |> Map.put(:current, updated)}
  end

  def handle_info({:money_update, %{money: money, client: client}}, %{current: current} = state) do
    updated = put_in(current, [:players, client, :money], money)
    broadcast!(state.game, "update_state", updated)

    {:noreply, state |> Map.put(:current, updated)}
  end

  def gen_initial_state(players) do
    i =
      @initial_state
      |> Map.put(:players, Enum.reduce(players, %{},
        fn ({k, v}, res) -> Map.put(res, k, Map.merge(@initial_player, %{name: v |> Map.get(:metas) |> List.first |> Map.get(:name)})) end)
      )
      |> Map.put(:me, @initial_player)

    Logger.warn(inspect i)
    i
  end


end
