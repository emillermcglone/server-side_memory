defmodule Memory.Game do
  
  # Start a new game
  def new do
    %{
      cards: initialCards(),
      disableClick: false,
      firstCard: -1,
      secondCard: -1,
      matches: 0,
      guesses: 0
    }
  end

  # Used to update the client's view of the game state 
  def client_view(game) do
    %{
      cards: game.cards,
      disableClick: false,
      firstCard: -1,
      secondCard: -1,
      matches: game.matches,
      guesses: game.guesses
    }
  end
    
  # Create the initial cards for the board 
  def initialCards() do
    letters = "AABBCCDDEEFFGGHH"
    letters = String.split(letters, "", trim: true)

    letters
    |> Enum.shuffle()
    |> Enum.with_index()
    |> Enum.map(fn x -> 
      %{
          index: elem(x, 1),
          value: elem(x, 0), 
          matched: false, 
          flipped: false
        }
    end)
  end

  # Manage a click
  def click(game, id) do
    # When 2 cards have been selected, don't allow player to click
    if game.disableClick == true do 
      game
    else
      cards = game.cards
      disableClick = game.disableClick
      firstCard = game.firstCard
      secondCard = game.secondCard
      matches = game.matches
      guesses = game.guesses
      # if it's the first card to be clicked, set firstCard to id, and the card to flipped
      if firstCard = -1 do 
        firstCard = id 
        # update & return the game state 
        %{
          cards: markFlipped(cards, firstCard),
          disableClick: disableClick,
          firstCard: firstCard,
          secondCard: secondCard,
          matches: game.matches,
          guesses: game.guesses 
        }

      # When the second card has been clicked, set disableClick to true, secondCard to id, and the card to flipped
      else
        disableClick = true 
        secondCard = id
        # update & return the game state  
        %{
          cards: markFlipped(cards, secondCard),
          disableClick: disableClick,
          firstCard: firstCard,
          secondCard: secondCard,
          matches: game.matches,
          guesses: game.guesses 
        }
      end
    end 
  end

  # Check if firstCard and secondCard are a match
  def checkMatch(game) do
    cards = game.cards
    disableClick = game.disableClick
    firstCard = game.firstCard
    secondCard = game.secondCard
    matches = game.matches
    guesses = game.guesses

    guesses = guesses + 1
    firstCardElems = elem(Enum.fetch(cards, firstCard), 1)
    secondCardElems = elem(Enum.fetch(cards, secondCard), 1)

    # If the cards match, set matched to true, and add 1 to matches
    if firstCardElems.value == secondCardElems.value do 
      matches = matches + 1
      # update & return the game state 
      %{
        cards: markMatched(cards, firstCard, secondCard),
        disableClick: disableClick,
        firstCard: -1,
        secondCard: -1,
        matches: matches,
        guesses: guesses 
      }
      
    # the cards do not match, set flip to false
    else
      # update & return the game state 
      %{
        cards: markUnflipped(cards, firstCard, secondCard),
        disableClick: disableClick,
        firstCard: -1,
        secondCard: -1,
        matches: matches,
        guesses: guesses 
      }
    end
  end

  # In cards, mark both clicked cards as matched
  def markMatched(cards, firstCard, secondCard) do
    cards 
    |> Enum.map(fn x -> 
      if x.index == firstCard || x.index == secondCard do 
        Map.put(x, :matched, true)
      else 
        x 
      end
    end)
  end

  # In cards, mark one clicked card as flipped
  def markFlipped(cards, clickedCard) do 
    cards
    |> Enum.map(fn x -> 
      if x.index == clickedCard do 
        Map.put(x, :flipped, true)
      else 
        x 
      end
    end) 
  end

  # In cards, mark both clicked cards as not flipped
  def markUnflipped(cards, firstCard, secondCard) do 
    cards
    |> Enum.map(fn x -> 
      if x.index == firstCard || x.index == secondCard do 
        Map.put(x, :flipped, true)
      else 
        x 
      end
    end) 
  end
end


