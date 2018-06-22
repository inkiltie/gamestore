"use strict";

import React, { Component } from 'react';
import { MenuItem, InputGroup, DropdownButton, Image, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postGames, deleteGames, getGames, resetButton } from '../actions/gamesActions';
import axios from 'axios';

class GamesForm extends Component {
  constructor() {
    super();

    this.state = {
      images: [{}],
      img:''
    }
  };

  componentDidMount() {
    this.props.getGames();

    // Get images from API
    axios.get('/api/images').then(function(response) {
      this.setState({ images: response.data });
    }.bind(this)).catch(function(err) {
      this.setState({ images: 'Error loading image files from the server', img:'' })
    }.bind(this))
  };

  handleSubmit() {
    const game = [{
      title: findDOMNode(this.refs.title).value,
      description: findDOMNode(this.refs.description).value,
      images: findDOMNode(this.refs.image).value,
      price: findDOMNode(this.refs.price).value,
    }]

    this.props.postGames(game);
  };

  onDelete() {
    let gameId = findDOMNode(this.refs.delete).value;
    this.props.deleteGames(gameId);
  };

  handleSelect(img) {
    this.setState({
      img: '/images/' + img
    })
  };

  resetForm() {
    // Reset the button
    this.props.resetButton();

    findDOMNode(this.refs.title).value = '';
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.price).value = '';

    this.setState({img:''});
  };

  render() {
    const gamesList = this.props.games.map(function(gamesArr) {
      return (
        <option key={gamesArr._id}>{gamesArr._id}</option>
      )
    })

    const imgList =
    this.state.images.map(function(imgArr, i) {
      return(
        <MenuItem
          key={i}
          eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>
          {imgArr.name}
        </MenuItem>
      )
    }, this)

    return(
      <div className="container">
        <Well>
          <Row>
            <Col xs={12} sm={6}>
              <Panel>
                <Panel.Body>
                  <InputGroup>
                    <FormControl
                      type="text"
                      ref="image"
                      value={this.state.img}
                    />
                    <DropdownButton
                      componentClass={InputGroup.Button}
                      id="input-dropdown-addon"
                      title="Select an image"
                      bsStyle="primary">
                      {imgList}
                    </DropdownButton>
                  </InputGroup>
                  <Image
                    src={this.state.img}
                    responsive
                  />
                </Panel.Body>
              </Panel>
            </Col>
            <Col xs={12} sm={6}>
              <Panel>
                <Panel.Body>
                  <FormGroup
                    controlId="title"
                    validationState={this.props.validation}>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Title"
                      ref="title" />
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup
                    controlId="description"
                    validationState={this.props.validation}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Description"
                      ref="description" />
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup
                    controlId="price"
                    validationState={this.props.validation}>
                    <ControlLabel>Price</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Enter Price"
                      ref="price" />
                    <FormControl.Feedback />
                  </FormGroup>
                  <Button
                    onClick={(!this.props.msg) ? (this.handleSubmit.bind(this)) : (this.resetForm.bind(this))}
                    bsStyle={(!this.props.style) ? ("primary") : (this.props.style)}>
                    {(!this.props.msg) ? ("Save game") : (this.props.msg)}
                  </Button>
                </Panel.Body>
              </Panel>
              <Panel>
                <Panel.Body>
                  <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select a game id to delete</ControlLabel>
                    <FormControl
                      ref="delete"
                      componentClass="select"
                      placeholder="select">
                        <option value="select">select</option>
                        {gamesList}
                    </FormControl>
                  </FormGroup>
                  <Button
                    onClick={this.onDelete.bind(this)}
                    bsStyle="danger">
                    Delete game
                  </Button>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Well>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    games: state.games.games,
    msg: state.games.msg,
    style: state.games.style,
    validation: state.games.validation
  }
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postGames,
    deleteGames,
    getGames,
    resetButton
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesForm);
