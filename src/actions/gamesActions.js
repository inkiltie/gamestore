"use strict";

import axios from 'axios';

export function getGames() {
  return function(dispatch) {
    axios.get("/api/games")
    .then(function(response) {
      dispatch({ type: "GET_GAMES", payload: response.data })
    })
    .catch(function(err) {
      dispatch({ type: "GET_GAMES_REJECTED", payload: err })
    })
  }
};

export function postGames(game) {
  return function(dispatch) {
    axios.post("/api/games", game).then(function(response) {
      dispatch({ type: "POST_GAME", payload: response.data })
    }).catch(function(err) {
      dispatch({ type: "POST_GAME_REJECTED", payload: "There was an error while posting a new game" })
    })
  }
};

export function updateGames(game){
  return {
    type: "UPDATE_GAME",
    payload: game
  }
};

export function deleteGames(id) {
  return function(dispatch) {
    axios.delete("/api/games/" + id)
    .then(function(response) {
      dispatch({ type: "DELETE_GAME", payload: id })
    })
    .catch(function(err) {
      dispatch({ type: "DELETE_GAME_REJECTED", payload: err })
    })
  }
};

export function resetButton() {
  return {
    type: "RESET_BUTTON"
  }
}
