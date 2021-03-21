defmodule FishyBusiness.Game.Supervisor do
  alias FishyBusiness.Game.Manager
  use DynamicSupervisor

  require Logger

  def start_link(init_arg) do
    DynamicSupervisor.start_link(__MODULE__, init_arg, name: __MODULE__)
  end

  @impl true
  def init(_init_arg) do
    DynamicSupervisor.init(strategy: :one_for_one)
  end

  def start_child(args) do
    spec = {Manager, args}
    proc = DynamicSupervisor.start_child(__MODULE__, spec)

  end

  def get_name(room) do
    {:via, Registry, {FishyBusiness.Registry, room}}
  end
end
