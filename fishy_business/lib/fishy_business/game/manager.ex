defmodule FishyBusiness.Game.Manager do
  use GenServer

  require Logger

  import FishyBusinessWeb.Endpoint

  @tick_interval 1000

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
    items: [],
    regions_fished: [],
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
    current = gen_initial_state(players)
    broadcast!(game, "init_game", current)
    send(self(), :timed_event)
    send(self(), :tick)

    state = state |>
      Map.put(:current, current)

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

  def handle_info(:tick, %{current: current} = state) do
    current = calculate_tick(current)
    broadcast!(state.game, "update_state", current)
    Process.send_after(self(), :tick, @tick_interval)

    {:noreply, state |> Map.put(:current, current)}
  end

  def handle_info({:set_regions, regions}, state ) do
    state = put_in(state, [:current, :regions], regions)

    {:noreply, state}
  end

  def gen_initial_state(players) do
    i =
      @initial_state
      |> Map.put(:players, Enum.reduce(players, %{},
        fn ({k, v}, res) -> Map.put(res, k, Map.merge(@initial_player, %{name: v |> Map.get(:metas) |> List.first |> Map.get(:name)})) end)
      )
      |> Map.put(:me, @initial_player)

    i
  end


  def calculate_tick(current_state) do
    users = current_state.players |> Map.keys()
    calculate_tick_user(current_state, users)
  end

  def calculate_tick_user(current_state, [user | users]) do
    # Run region calc
    current_state = calculate_tick_items(current_state, user, get_in(current_state, [:players, user, :items]))
    calculate_tick_user(current_state, users)
  end

  def calculate_tick_user(current_state, []) do
    current_state
  end

  def calculate_tick_items(current_state, user, [item | items]) do
    current_state =
      unless item["region"] == nil do
        a =
        current_state
        |> put_in([:regions], List.replace_at(current_state.regions, item["region"],
            current_state.regions
            |> Enum.at(item["region"])
            |> Map.update!("stock", fn val -> val - item["rate"] end)
          ))
        |> put_in([:players, user, :money], get_in(current_state, [:players, user, :money]) + item["rate"])
        a
      else
        current_state
      end
    calculate_tick_items(current_state, user, items)
  end

  def calculate_tick_items(current_state, _user, []) do
    current_state
  end


end
