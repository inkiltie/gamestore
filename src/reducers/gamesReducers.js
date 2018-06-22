"use strict";

export function gamesReducers(state={
  games: []
}, action) {
  switch(action.type) {
    case "GET_GAMES":
      return { ...state, games: [...action.payload] }
      break;
    case "POST_GAME":
      return { ...state, games: [...state.games, ...action.payload], msg: 'Saved! Click to continue', style: 'success', validation: 'success' }
      break;
    case "POST_GAME_REJECTED":
      return { ...state, msg: 'Please, try again', style: 'danger', validation: 'error' }
      break;
    case "RESET_BUTTON":
      return { ...state, msg: null, style: 'primary', validation: null }
      break;
    case "UPDATE_GAME":
      // Create a copy of the current array of games
      const currentGameToUpdate = [...state.games];
      // Determine at which index in games array is the game to be deleted
      const indexToUpdate = currentGameToUpdate.findIndex(function(game) {
        return game._id === action.payload._id;
      });
      // Create a new game object with the new values and with the same array index of the item we want to replace.
      // To achieve this we will use ...spread but we could use concat methos too.
      const newGameToUpdate = {
        ...currentGameToUpdate[indexToUpdate],
        title: action.payload.title
      };
      // Log to show how newGameToUpdate looks like
      console.log("What is it newGameToUpdate", newGameToUpdate);
      // Using slice to remove the game at the specified index, replace with the new object and concatenate with the rest of items in the array
      return { games:
        [
          ...currentGameToUpdate.slice(0, indexToUpdate), newGameToUpdate,
          ...currentGameToUpdate.slice(indexToUpdate + 1)
        ]
      };
      break;
    case "DELETE_GAME":
      // Create a copy of the current array of games
      const currentGameToDelete = [...state.games];
      // Determine at which index in games array is the game to be deleted
      const indexToDelete = currentGameToDelete.findIndex(function(game) {
        return game._id == action.payload;
      });
      // Use slice to remove the game at the specified index
      return { games: [...currentGameToDelete.slice(0, indexToDelete), ...currentGameToDelete.slice(indexToDelete + 1)]};
      break;
  }

  return state;
}
