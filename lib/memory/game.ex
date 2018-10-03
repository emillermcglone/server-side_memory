defmodule Memory.Game do
    def new do
      %{
        cards: initialCards("AABBCCDDEEFFGGHH"),
        disableClick: false,
        lastCard: -1,
        matches: 0,
        guesses: 0
      }
    end
     def client_view(game) do
      %{
        cards: game.cards,
        disableClick: game.disableClick,
        lastCard: game.lastCard,
        matches: game.matches,
        guesses: game.guesses
      }
    end
     def initialCards(letters) do
      letters
      |> String.split("")
      |> Enum.map(fn x -> %{value: x, matched: false, flipped: false} end)
      |> Enum.shuffle()
      |> Enum.filter(&(&1.value != ""))
    end
end