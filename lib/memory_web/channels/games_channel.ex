defmodule MemoryWeb.GamesChannel do
    use MemoryWeb, :channel

    alias Memory.Game

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Game.new() || Memory.GameBackup.load(name) 
       socket =
        socket
        |> assign(:game, game)
        |> assign(:name, name)
       {:ok, %{"join" => name, "game" => Game.client_view(game)}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # When reset, send to Game.ex to reset game
  def handle_in("reset", %{}, socket) do
    game = Game.new()
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game) }}, socket}
  end

  # When click, send to Game.ex to manage click
  def handle_in("click", %{"index" => index}, socket) do
    game = Game.click(socket.assigns[:game], index)
    socket = assign(socket, :game, game)
    Memory.GameBackup.save(socket.assigns[:name], socket.assigns[:game])
    {:reply, {:ok, %{ "game" => Game.client_view(game) }}, socket}
  end
  # When match, send to Game.ex to check match
  def handle_in("match", %{}, socket) do
    game = Game.checkMatch(socket.assigns[:game])
    Memory.GameBackup.save(socket.assigns[:name], socket.assigns[:game])
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => Game.client_view(game) }}, socket}
  end
  
# Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end