defmodule FishyBusiness.Game.Room do
  use Ecto.Schema
  import Ecto.Changeset

  schema "rooms" do
    field :name, :string
    field :password, :binary
    field :slug, :string

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:slug, :name, :password])
    |> validate_required([:slug, :name, :password])
  end
end
