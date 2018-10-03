defmodule MemoryWeb.GamesChannel do
    use MemoryWeb, :channel

    def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Memory.GameBackup.load(name) || Memory.Game.new()
       socket =
        socket
        |> assign(:game, game)
        |> assign(:name, name)
       {:ok, %{"join" => name, "game" => Memory.Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

   # handle reset
   def handle_in("reset", payload, socket) do
    game = Memory.Game.reset()
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => Memory.Game.client_view(game)}}, socket}
  end
  
# Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end