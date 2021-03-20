defmodule FishyBusinessWeb.Router do
  use FishyBusinessWeb, :router

  pipeline :api do
    plug CORSPlug, origin: ["http://localhost:3000", "*"]
    plug :accepts, ["json"]
  end

  scope "/api", FishyBusinessWeb do
    pipe_through :api

    get "/rooms/:slug", RoomController, :index
    post "/rooms", RoomController, :create
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: FishyBusinessWeb.Telemetry
    end
  end
end
