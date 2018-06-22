"use strict";

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';
import { getGames } from '../actions/gamesActions';
import GameItem from './gameItem';
import GamesForm from './gamesForm';
import Cart from './cart';

class GamesList extends Component{
  componentDidMount() {
    // Dispatch an action
    this.props.getGames();
  };

  render() {
    const gamesList = this.props.games.map(function(gamesArr) {
      return(
        <Col xs={12} sm={6} md={4} key={gamesArr._id}>
          <GameItem
            _id={gamesArr._id}
            title={gamesArr.title}
            description={gamesArr.description}
            images={gamesArr.images}
            price={gamesArr.price}
          />
        </Col>
      )
    });

    return(
      <Grid>
        <Row className="mb-30">
          <Col xs={12}>
          <Carousel>
            <Carousel.Item>
              <img
                width={1000}
                height={300}
                alt="1000x300"
                src="/images/cyberpunk-banner.jpg"
              />
              <Carousel.Caption>
                <h3 className="white">Cyberpunk 2077</h3>
                <p>The world is broken. MegaCorps manage every aspect of life from the top floors of their sky-scraping fortresses. Down below, the streets are run by drug pushing gangs, tech hustlers, and illegal braindance slingers.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                width={1000}
                height={300}
                alt="1000x300"
                src="/images/bf5-banner.jpg"
              />
              <Carousel.Caption>
                <h3 className="white">Battlefield V</h3>
                <p>Enter mankind’s greatest conflict with Battlefield V as the series goes back to its roots with a never-before-seen portrayal of World War 2. Lead your squad to victory with new ways to turn the battlefield to your advantage.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                width={1000}
                height={300}
                alt="1000x300"
                src="/images/metro-banner.jpg"
              />
              <Carousel.Caption>
                <h3 className="white">Metro Exodus</h3>
                <p>Metro Exodus is an epic, story-driven first person shooter from 4A Games that blends deadly combat and stealth with exploration and survival horror in one of the most immersive game worlds ever created.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          </Col>
        </Row>
        <Row>
          <Cart />
        </Row>
        <Row>
          {gamesList}
        </Row>
      </Grid>
    )
  };
};

function mapStateToProps(state) {
  return {
    games: state.games.games
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getGames: getGames
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);
