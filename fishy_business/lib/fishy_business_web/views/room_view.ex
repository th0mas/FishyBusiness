defmodule FishyBusinessWeb.RoomView do
  use FishyBusinessWeb, :view
  alias FishyBusinessWeb.RoomView

  def render("index.json", %{rooms: rooms}) do
    %{data: render_many(rooms, RoomView, "room.json")}
  end

  def render("show.json", %{room: room}) do
    %{data: render_one(room, RoomView, "room.json")}
  end

  def render("room.json", %{room: room}) do
    %{id: room.id,
      slug: room.slug,
      name: room.name,
      password: room.password}
  end
end
