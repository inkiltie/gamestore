"use strict";

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { deleteCartItem, updateCart, getCart } from '../actions/cartActions';

class Cart extends Component {
  constructor() {
    super();

    this.state = { showModal: false }
  }

  componentDidMount() {
    this.props.getCart();
  }

  open() {
    this.setState({ showModal: true })
  }

  close() {
    this.setState({ showModal: false })
  }

  onDelete(_id) {
    // Create a copy of the current array of games
    const currentGameToDelete = this.props.cart;
    // Determine at which index in games array is the game to be deleted
    const indexToDelete = currentGameToDelete.findIndex(function(cart) {
      return cart._id === _id;
    });
    // Using slice to remove the game at the specified index
    let cartAfterDelete = [...currentGameToDelete.slice(0, indexToDelete), ...currentGameToDelete.slice(indexToDelete + 1)];

    this.props.deleteCartItem(cartAfterDelete);
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1, this.props.cart);
  }

  onDecrement(_id, quantity) {
    if(quantity > 1) {
      this.props.updateCart(_id, -1, this.props.cart);
    }
  }

  renderEmpty() {
    return(<div></div>)
  };

  renderCart() {
    const cartItemsList = this.props.cart.map(function(cartArr) {
      return(
        <Panel key={cartArr._id}>
        <Panel.Body key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>${cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>Amount: <Label bsStyle="success">{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup
                style={{minWidth:'300px'}}>
                <Button
                  onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}
                  bsStyle="default"
                  bsSize="small">
                  -
                </Button>
                <Button
                  onClick={this.onIncrement.bind(this, cartArr._id)}
                  bsStyle="default"
                  bsSize="small">
                  +
                </Button>
                <span>    </span>
                <Button
                  onClick={this.onDelete.bind(this, cartArr._id)}
                  bsStyle="danger"
                  bsSize="small">
                    Delete
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel.Body>
        </Panel>
      )
    }, this)

    return(
      <div className="container">
        <Panel bsStyle="info">
          <Panel.Heading>Cart</Panel.Heading>
          <Panel.Body>
            {cartItemsList}
            <Row>
              <Col xs={12}>
                <h6>Total amount: ${this.props.totalAmount}</h6>
                <Button
                  onClick={this.open.bind(this)}
                  bsStyle="success"
                  bsSize="small">
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
            <Modal
              show={this.state.showModal}
              onHide={this.close.bind(this)}>
              <Modal.Header closeButton>
                <Modal.Title>Thank you!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>Your order has been saved</h6>
                <p>You will receive an email confirmation</p>
              </Modal.Body>
              <Modal.Footer>
                <Col xs={6}>
                  <h6>Total: ${this.props.totalAmount}</h6>
                </Col>
                <Button
                  onClick={this.close.bind(this)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Panel.Body>
        </Panel>
      </div>
    )
  };

  render() {
    if(this.props.cart[0]){
      return this.renderCart();
    }
    else {
      return this.renderEmpty();
    }
  };
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  }
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    deleteCartItem: deleteCartItem,
    updateCart: updateCart,
    getCart: getCart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
