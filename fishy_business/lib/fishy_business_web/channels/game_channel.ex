defmodule FishyBusinessWeb.GameChannel do
  use FishyBusinessWeb, :channel

  require Logger

  alias FishyBusiness.Game
  alias FishyBusiness.Game.Room
  alias FishyBusinessWeb.Presence

  def join("game:" <> game_slug, %{"token" => token, "name"=>name}, socket) do
    Logger.info("Connected")
    game = Game.find_room_by_slug(game_slug)
    case Phoenix.Token.verify(socket, "room", token) do
      {:ok, _} ->
        send(self(), :after_join)
        s = socket
        |> assign(:game_id, game.id)
        |> assign(:client_id, game_slug <> "_" <> name)
        |> assign(:name, name)
        {:ok, s}
      {:error, _} -> :error
    end
  end

  def join("game:" <> _game_slug, _params, _socket) do
    Logger.info("No token")
    {:error, %{reason: "No Token/Name"}}
  end

  # Define special cases now

  def handle_in("start_game", _, socket) do
    Game.Supervisor.start_child(name: get_manager_name(socket),
      game: socket.topic,
      players: Presence.list(socket))

    {:noreply, socket}
  end

  def handle_in("items_update", payload, socket) do
    send(get_manager_pid(socket), {:items_update, %{items: payload, client: socket.assigns.client_id}})
    {:noreply, socket}
  end

  def handle_in("money_update", payload, socket) do
    send(get_manager_pid(socket), {:money_update, %{money: payload, client: socket.assigns.client_id}})
    {:noreply, socket}
  end


  # Default handler - if in doubt just push to clients
  def handle_in(event, payload, socket) do
    Logger.info(inspect(event) <> " : " <> inspect(payload))
    broadcast!(socket, event, payload)

    {:noreply, socket}
  end

  def handle_info(:after_join, socket) do
    {:ok, _} = Presence.track(socket, socket.assigns.client_id, %{
      joined: inspect(System.system_time(:second)),
      name: socket.assigns.name
    })

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end

  def get_manager_name(socket) do
    {:via, Registry, {FishyBusiness.Registry, socket.topic}}
  end

  def get_manager_pid(socket) do
    {pid, _ } = Registry.lookup(FishyBusiness.Registry, socket.topic) |> List.first

    pid
  end

end
