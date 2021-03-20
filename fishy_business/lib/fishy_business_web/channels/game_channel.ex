defmodule FishyBusinessWeb.GameChannel do
  use FishyBusinessWeb, :channel

  require Logger

  alias FishyBusiness.Game
  alias FishyBusiness.Game.Room
  alias FishyBusinessWeb.Presence

  def join("game:" <> game_slug, %{"token" => token}, socket) do
    Logger.info("Connected")
    game = Game.find_room_by_slug(game_slug)
    case Phoenix.Token.verify(socket, "room", token) do
      {:ok, _} ->
        send(self(), :after_join)
        {:ok, assign(socket, :game_id, game.id)}
      {:error, _} -> :error
    end
  end

  def join("game:" <> _game_slug, _params, _socket) do
    Logger.info("No token")
    {:error, %{reason: "No Token"}}
  end

  # Define special cases now

  def handle_in("start_game", _, socket) do
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
      joined: inspect(System.system_time(:second))
    })

    push(socket, "presence_state", Presence.list(socket))
    {:noreply, socket}
  end


end
