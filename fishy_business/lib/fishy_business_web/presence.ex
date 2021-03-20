defmodule FishyBusinessWeb.Presence do
  use Phoenix.Presence,
    otp_app: :fishy_business,
    pubsub_server: FishyBusiness.PubSub
end
