defmodule FishyBusinessWeb.RoomController do
  use FishyBusinessWeb, :controller

  alias FishyBusiness.Game
  alias FishyBusiness.Game.Room

  require Logger

  action_fallback FishyBusinessWeb.FallbackController

  # TODO: Refractor these
  def index(conn, %{"slug" => slug, "password" => password}) do
    room = Game.find_room_by_slug(slug)
    if Game.check_password(room, password) do
      r = room
        |> Map.from_struct()
        |> Map.put(:token, Phoenix.Token.sign(conn, "room", room.id))

      render(conn, "join.json", room: r)
    else
      {:error, :pass}
    end
  end

  def index(conn, %{"slug" => slug}) do
    room = Game.find_room_by_slug(slug)
    Logger.log(:info, "actual pass" <> room.password)
    if Game.check_password(room, "") do
      r = room
        |> Map.from_struct()
        |> Map.put(:token, Phoenix.Token.sign(conn, "room", room.id))

      render(conn, "join.json", room: r)
    else
      {:error, :pass}
    end
  end

  def create(conn, %{"room" => room_params}) do
    with {:ok, %Room{} = room} <- Game.create_room(room_params) do
      conn
      |> put_status(:created)
      |> render("show.json", room: room)
    end
  end

  def show(conn, %{"id" => id}) do
    room = Game.get_room!(id)
    render(conn, "show.json", room: room)
  end

  def update(conn, %{"id" => id, "room" => room_params}) do
    room = Game.get_room!(id)

    with {:ok, %Room{} = room} <- Game.update_room(room, room_params) do
      render(conn, "show.json", room: room)
    end
  end

  def delete(conn, %{"id" => id}) do
    room = Game.get_room!(id)

    with {:ok, %Room{}} <- Game.delete_room(room) do
      send_resp(conn, :no_content, "")
    end
  end
end
