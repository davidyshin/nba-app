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
    let pointLeaders = [...this.state.pointLeaders]
    let assistLeaders = [...this.state.assistLeaders]
    let reboundLeaders = [...this.state.reboundLeaders]
      return (
        <div>
        <h1>Point Leaders</h1>
        {pointLeaders.map(players => 
        <div key={players.rank}>
        <h4>Rank {players.rank} </h4>
        <img src={getAllPlayers().filter(n => parseInt(n.playerId) === parseInt(players.playerId))[0].url} alt="player-headshot" />
        <h4>{players.player}</h4>
        <h4>{players.pts}</h4>
        </div>)}
        <h1> Assist Leaders </h1>
        {assistLeaders.map(players => 
          <div key={players.rank}>
          <h4>Rank {players.rank} </h4>
          <img src={getAllPlayers().filter(n => parseInt(n.playerId) === parseInt(players.playerId))[0].url} alt="player-headshot" />
          <h4>{players.player}</h4>
          <h4>{players.ast}</h4>
          </div>)}
          <h1> Rebound Leaders </h1>
          {reboundLeaders.map(players => 
            <div key={players.rank}>
            <h4>Rank {players.rank} </h4>
            <img src={getAllPlayers().filter(n => parseInt(n.playerId) === parseInt(players.playerId))[0].url} alt="player-headshot" />
            <h4>{players.player}</h4>
            <h4>{players.reb}</h4>
            </div>)}
        </div>
      )
  }
}
export default Home;
