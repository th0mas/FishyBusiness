defmodule FishyBusiness.Repo do
  use Ecto.Repo,
    otp_app: :fishy_business,
    adapter: Ecto.Adapters.Postgres
end
