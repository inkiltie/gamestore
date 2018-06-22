"use strict";

import React, { Component } from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart, updateCart } from '../actions/cartActions';

class GameItem extends Component {
  constructor() {
    super();

    this.state = {
      isClicked: false
    };
  }

  onReadMore() {
    this.setState({isClicked:true});
  }

  handleCart(){
    const game = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      images: this.props.images,
      price: this.props.price,
      quantity: 1
    }];
    // Check if cart is empty
    if(this.props.cart.length > 0) {
      // Cart is not empty
      let _id = this.props._id;
      let cartIndex = this.props.cart.findIndex(function(cart){
        return cart._id === _id;
      })
      // There are no items with the same ID
      if (cartIndex === -1) {
        this.props.addToCart(game);
      }
      else {
        // Update quantity
        this.props.updateCart(_id, 1, this.props.cart);
      }
    }
    else {
      // Cart is empty
      this.props.addToCart(game);
    }
  }

  render() {
    return(
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image
              src={this.props.images}
              responsive
            />
          </Col>
          <Col xs={6} sm={8}>
            <p className="blue">{this.props.title}</p>
            {/* <h6>{this.props.description}</h6> */}
            <h6>{(this.props.description.length > 70 && this.state.isClicked === false) ? (this.props.description.substring(0, 70)) : (this.props.description)}
              <button
                className='link'
                onClick={this.onReadMore.bind(this)}>
                {(this.state.isClicked === false && this.props.description !== null && this.props.description.length > 70) ? ('...read more') : ('')}
              </button>
            </h6>
            <h4>${this.props.price}</h4>
            <Button
              onClick={this.handleCart.bind(this)}
              bsStyle='primary'>
              Buy now
            </Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToCart: addToCart,
    updateCart: updateCart

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameItem);
