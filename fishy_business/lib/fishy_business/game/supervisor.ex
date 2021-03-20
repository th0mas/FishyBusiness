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
    Logger.info("Starting process...")
    proc = DynamicSupervisor.start_child(__MODULE__, spec)

    Logger.info(inspect proc)
  end

  def get_name(room) do
    {:via, Registry, {FishyBusiness.Registry, room}}
  end
end
