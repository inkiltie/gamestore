"use strict";

import axios from 'axios';

// Get cart
export function getCart() {
  return function(dispatch) {
    axios.get('/api/cart')
      .then(function(response) {
        dispatch({ type: "GET_CART", payload: response.data })
      })
      .catch(function(err) {
        dispatch({ type: "GET_CART_REJECTED", msg: "Error when getting the cart from session" })
      })
  }
};

// Add to cart
export function addToCart(cart) {
  return function(dispatch) {
    axios.post("/api/cart", cart)
      .then(function(response) {
        dispatch({ type: "ADD_TO_CART", payload: response.data })
      })
      .catch(function(err) {
        dispatch({ type: "ADD_TO_CART_REJECTED", msg: 'Error when adding to the cart' })
      })
  }
};

// Update cart
export function updateCart(_id, unit, cart) {
  // Create a copy of the current array of games
  const currentGameToUpdate = cart;
  // Determine at which index in games array is the game to be deleted
  const indexToUpdate = currentGameToUpdate.findIndex(function(game) {
    return game._id === _id;
  });

  const newGameToUpdate = {
    ...currentGameToUpdate[indexToUpdate],
    quantity: currentGameToUpdate[indexToUpdate].quantity + unit
  };

  let cartUpdate = [...currentGameToUpdate.slice(0, indexToUpdate), newGameToUpdate, ...currentGameToUpdate.slice(indexToUpdate + 1)];

  return function(dispatch) {
    axios.post("/api/cart", cartUpdate)
      .then(function(response) {
        dispatch({ type: "UPDATE_CART", payload: response.data})
      })
      .catch(function(err) {
        dispatch({ type: "UPDATE_CART_REJECTED", msg: 'Error when adding to the cart' })
      })
  }
};

// Delete from cart
export function deleteCartItem(cart) {
  return function(dispatch) {
    axios.post("/api/cart", cart)
      .then(function(response) {
        dispatch({ type: "DELETE_CART_ITEM", payload: response.data })
      })
      .catch(function(err) {
        dispatch({ type: "DELETE_CART_ITEM_REJECTED", msg: 'Error when deleting an item from the cart' })
      })
  }
};
