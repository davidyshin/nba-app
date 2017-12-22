import nba from "nba";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Link } from "react-router-dom";
import { getAllPlayers } from "./players.js";

//Reference for API (nba.stats.leagueGameLog (for players)), will be used in the future
//to update most recent game stats for player.

// TODO :
// 1. Styling
// 2. Player profile card displays ppg,apg,rpg, contains links to all other stats
// 3. Eventually, player profile card will display most recent games and stats for respective player
// 4. Team page
// 5. Specific Team profile pages, that displays ppg, apg, rpg, contains links to all other stats and players.
// 6. Team logo's working
// 7. Refactor code
//



// Home component renders season leaders for specific stats (point, rebound, assist, steal, block)
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
  //after component mounts, the script digs into the api and
  //gets data and assigns it to the state
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
    // ^ nba.stats.leagueGameLog will be used to fetch 
    // data for most recent games stats for specific player
    // currently line 74 is filtering games for player id 203083 (andre drummond)
    // ^ will add to players profile card (atleast 5 most recent games / stats)
  }


  
  // Code is pretty dry, could use refactoring
  // creates a div for each stat table and renders respectively
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
            <h1>{players.pts}</h1>
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
            <h1>{players.ast}</h1>
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
            <h1>{players.reb}</h1>
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
            <h1>{players.stl}</h1>
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
            <h1>{players.blk}</h1>
          </div>
        ))}
      </div>
    );
  }
}
export default Home;
