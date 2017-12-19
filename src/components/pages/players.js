import nba from "nba";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Link } from "react-router-dom";


const getAllPlayers = () => {
  const players = nba.players;
  for (let i = 0; i < players.length; i++) {
    players[i].firstName = players[i].firstName.replace(" ", "_");
    players[i].lastName = players[i].lastName.replace(" ", "_");
    players[i].firstName = players[i].firstName.replace(".", "");
    players[i].lastName = players[i].lastName.replace(".", "");
  }
  for (let i = 0; i < players.length; i++) {
    players[i].url = `https://nba-players.herokuapp.com/players/${
      players[i].lastName
    }/${players[i].firstName}`;
  }
  return players;
};


class Players extends React.Component {
  constructor() {
    super();
    this.state = {
      filter: "",
      searchInput: ""
    };
    this.setState = this.setState.bind(this);
  }
  handleInput = e => {
    this.setState({
      searchInput: e.target.value
    });
  };

  render() {
    return (
      <div className="players-container">
        <h1>All Players</h1>
        <p>
          List of all players will be here, going to draw component "Players"
          from players.js file
        </p>
        <input
          onChange={this.handleInput}
          value={this.state.searchInput}
          name="searchInput"
          type="text"
        />
        <List searchString={this.state.searchInput} />
      </div>
    );
  }
}

class List extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.players = getAllPlayers();
  }

  render() {
    const searchString = this.props.searchString;
    const visiblePlayer = 
      searchString.length > 2
        ? this.players.filter(player =>
            player.downcaseName.includes(searchString.toLowerCase())
          )
        : this.players.filter(player =>
            player.downcaseName.startsWith(searchString.toLowerCase())
          );

    return visiblePlayer.map(player => (
      <div className="playerCard" key={player.playerId}>
        <Link to={`/players/${player.playerId}`}>
          {player.firstName} {player.lastName}
        </Link>
        <img src={player.url} alt="player-headshot" />
      </div>
    ));
  }
}


export default Players
console.log(getAllPlayers());
