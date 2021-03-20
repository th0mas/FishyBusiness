# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :fishy_business,
  ecto_repos: [FishyBusiness.Repo]

# Configures the endpoint
config :fishy_business, FishyBusinessWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "y2Y5wt8FhqyNd3Cep1eTMQ9A7cd29dpG2heVEKktOpvpPTMyxz5YuIHwx9wityLx",
  render_errors: [view: FishyBusinessWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: FishyBusiness.PubSub,
  live_view: [signing_salt: "wKhndCIG"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
