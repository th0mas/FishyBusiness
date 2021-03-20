defmodule FishyBusinessWeb.GameChannel do
  use FishyBusinessWeb, :channel

  alias FishyBusiness.Game
  alias FishyBusiness.Game.Room

  def join("game:" <> game_slug, %{"token" => token}, socket) do
    game = Game.find_room_by_slug(game_slug)
    case Phoenix.Token.verify(socket, "room", token) do
      {:ok, _} -> {:ok, assign(socket, :game_id, game.id)}
      {:error, _} -> :error
    end
  end


end
