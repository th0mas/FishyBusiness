defmodule FishyBusiness.Game.Room do
  use Ecto.Schema
  import Ecto.Changeset

  require Logger

  schema "rooms" do
    field :name, :string
    field :password, :string
    field :slug, :string

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:name, :password])
    |> validate_required([:name])
  end

  def create_changeset(room, attrs) do
    room
    |> changeset(attrs)
    |> put_change(:slug, create_slug(10))
  end

  def create_slug(length) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64() |> binary_part(0, length)
  end



end
