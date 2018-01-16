import nba from "nba";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Link } from "react-router-dom";

// Function gets a list of all players (including but not limited to name, playerID, teamID)
// Also loops through this list (object) and adds a url to respective player's headshot according to
// first name and lastname (line 20-23)
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

// Shell container with search bar, passes search value as a prop to the "List" component and renders List
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
      <div className="players-main">
      <div className="players-header">
        <h1>All Players</h1>
        <p>
          List of all players will be here, going to draw component "Players"
          from players.js file
        </p>
        <input
          className="searchBar"
          onChange={this.handleInput}
          value={this.state.searchInput}
          name="searchInput"
          type="text"
          placeholder="Enter player name"
        />
      </div>
        <div className="players-container">
          <br />
          <List searchString={this.state.searchInput} />
        </div>
        </div>
    );
  }
}

//Full list of players, takes searchString as prop from "Players" component, filters out according to it.

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
    //Filtered list is mapped through then rendered for each including a link that routes to /players/:id

    return visiblePlayer.map(player => (
      <div>
        <div className="playerCard" key={player.playerId}>
          <div className="image-circle">
           <a href={`./players/${player.playerId}`}> <img className="proPic" src={player.url} alt="player-headshot" /> </a>
          </div>
        </div>
        <a href={`./players/${player.playerId}`}>{player.fullName}</a>
      </div>
    ));
  }
}

export { getAllPlayers };
export default Players;
