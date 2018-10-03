defmodule MemoryWeb.GamesChannel do
    use MemoryWeb, :channel

  def join("games:" <> name, payload, socket) do
    if authorized?(payload) do
      game = Memory.GameBackup.load(name) || Game.new()
       socket =
        socket
        |> assign(:game, game)
        |> assign(:name, name)
       {:ok, %{"join" => name, "game" => game}, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # When reset, send to Game.ex to reset game
  def handle_in("reset", %{}, socket) do
    game = Game.new()
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{"game" => game}}, socket}
  end

  # When click, send to Game.ex to manage click
  def handle_in("click", %{"index" => index}, socket) do
    game = Game.click(socket.assigns[:game], index)
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => game }}, socket}
  end 

  # When match, send to Game.ex to check match
  def handle_in("match", %{}, socket) do
    game = Game.checkMatch(socket.assigns[:game])
    Memory.GameBackup.save(socket.assigns[:name], game)
    socket = assign(socket, :game, game)
    {:reply, {:ok, %{ "game" => game }}, socket}
  end
  
# Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end