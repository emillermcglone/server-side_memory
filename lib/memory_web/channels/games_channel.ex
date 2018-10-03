defmodule MemoryWeb.GamesChannel do
    use MemoryWeb, :channel

    def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Memory.Game.new()
       socket =
        socket
        |> assign(:game, game)
        |> assign(:name, name)
       {:ok, %{"join" => name, "game" => Memory.Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end
  
# Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end