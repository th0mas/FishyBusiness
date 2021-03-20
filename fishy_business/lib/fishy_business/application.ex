defmodule FishyBusiness.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      FishyBusiness.Repo,
      # Start the Telemetry supervisor
      FishyBusinessWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: FishyBusiness.PubSub},
      # Start the Endpoint (http/https)
      FishyBusinessWeb.Endpoint
      # Start a worker by calling: FishyBusiness.Worker.start_link(arg)
      # {FishyBusiness.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: FishyBusiness.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    FishyBusinessWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end