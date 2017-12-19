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

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      pointLeaders: "",
      reboundLeaders: "",
      assistLeaders: "",
      stealLeaders: "",
      blockLeaders: ""
    };
    this.id = window.location.pathname.slice(9);
  }

  componentDidMount() {
    nba.stats
      .playerInfo({
        PlayerID: this.id
      })
      .then(result => {
        return result;
      })
      .then(stats => {
        this.setState({
          stats: stats.playerHeadlineStats[0],
          commonInfo: stats.commonPlayerInfo[0]
        });
      });
    nba.stats
      .homepageV2({
        StatType: "Traditional",
        GameScope: "Season",
        PlayerScope: "All Players"
      })
      .then(result => {
        this.setState({
          pointLeaders: result.homePageStat1,
          reboundLeaders: result.homePageStat2,
          assistLeaders: result.homePageStat3,
          stealLeaders: result.homePageStat4,
          blockLeaders: result.homePageStat8
        });
      });
  }
  render() {
    let pointLeaders = [...this.state.pointLeaders];
    let assistLeaders = [...this.state.assistLeaders];
    let reboundLeaders = [...this.state.reboundLeaders];
    let stealLeaders = [...this.state.stealLeaders];
    let blockLeaders = [...this.state.blockLeaders];
    return (
      <div>
        <h1>Point Leaders</h1>
        {pointLeaders.map(players => (
          <div key={players.rank}>
            <h3>Rank {players.rank} </h3>
            <img
              src={
                getAllPlayers().filter(
                  n => parseInt(n.playerId) === parseInt(players.playerId)
                )[0].url
              }
              alt="player-headshot"
            />
            <a href={`./players/${players.playerId}`}>{players.player}</a>
            <p>{players.pts}</p>
          </div>
        ))}
        <h1> Assist Leaders </h1>
        {assistLeaders.map(players => (
          <div key={players.rank}>
            <h3>Rank {players.rank} </h3>
            <img
              src={
                getAllPlayers().filter(
                  n => parseInt(n.playerId) === parseInt(players.playerId)
                )[0].url
              }
              alt="player-headshot"
            />
            <a href={`./players/${players.playerId}`}>{players.player}</a>
            <p>{players.ast}</p>
          </div>
        ))}
        <h1> Rebound Leaders </h1>
        {reboundLeaders.map(players => (
          <div key={players.rank}>
            <h3>Rank {players.rank} </h3>
            <img
              src={
                getAllPlayers().filter(
                  n => parseInt(n.playerId) === parseInt(players.playerId)
                )[0].url
              }
              alt="player-headshot"
            />
            <a href={`./players/${players.playerId}`}>{players.player}</a>
            <p>{players.reb}</p>
          </div>
        ))}
        <h1> Steal Leaders </h1>
        {stealLeaders.map(players => (
          <div key={players.rank}>
            <h3>Rank {players.rank} </h3>
            <img
              src={
                getAllPlayers().filter(
                  n => parseInt(n.playerId) === parseInt(players.playerId)
                )[0].url
              }
              alt="player-headshot"
            />
            <a href={`./players/${players.playerId}`}>{players.player}</a>
            <p>{players.stl}</p>
          </div>
        ))}
        <h1> Block Leaders </h1>
        {blockLeaders.map(players => (
          <div key={players.rank}>
            <h3>Rank {players.rank} </h3>
            <img
              src={
                getAllPlayers().filter(
                  n => parseInt(n.playerId) === parseInt(players.playerId)
                )[0].url
              }
              alt="player-headshot"
            />
            <a href={`./players/${players.playerId}`}>{players.player}</a>
            <p>{players.blk}</p>
          </div>
        ))}
      </div>
    );
  }
}
export default Home;
