import nba from "nba";
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Link } from "react-router-dom";



// Function gets a list of all players (including but not limited to name, playerID, teamID)
// Also loops through this list (object) and adds a url to respective player's headshot according to
// first name and lastname (line 20-23) 

// WILL EXPORT AND IMPORT THIS FUNCTION FROM ONE FILES.

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


//Reference for API (nba.stats.leagueGameLog (for players)), will be used in the future 
//to update most recent game stats for player.

const REFERENCE =  { SEASON_ID: 0, PLAYER_ID: 1, PLAYER_NAME: 2, TEAM_ID: 3,
  TEAM_ABBREVIATION: 4, TEAM_NAME: 5, GAME_ID: 6, GAME_DATE: 7,
  MATCHUP: 8, WL: 9, MIN: 10, FGM: 11, FGA: 12, FG_PCT: 13,
  FG3M: 14, FG3A: 15, FG3_PCT: 16, FTM: 17, FTA: 18, FT_PCT: 19,
  OREB: 20, DREB: 21, REB: 22, AST: 23, STL: 24, BLK: 25, TOV: 26,
  PF: 27, PTS: 28, PLUS_MINUS: 29, VIDEO_AVAILABLE: 30}


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
      nba.stats.leagueGameLog({PlayerOrTeam: "P"})
      .then(result=> {
        console.log(result.resultSets[0])
      console.log(result.resultSets[0].rowSet.filter(n=> parseInt(n[1]) === 203083))});
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
