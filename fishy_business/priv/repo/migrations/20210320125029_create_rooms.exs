defmodule FishyBusiness.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :slug, :string
      add :name, :string
      add :password, :binary

      timestamps()
    end

  end
end
