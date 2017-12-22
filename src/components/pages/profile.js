import React from "react";
import { Link } from "react-router-dom";
import nba from "nba";
import { getAllPlayers } from "./players.js";

//Profile component for specific player profiles

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      stats: "",
      commonInfo: "",
      games: []
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
      .then(stats => {
        this.setState({
          stats: stats.playerHeadlineStats[0],
          commonInfo: stats.commonPlayerInfo[0]
        });
      });
// reaching into nba api to retrieve league game log for player("p") filtering
// by player.id 

// const reference =  { SEASON_ID: 0, PLAYER_ID: 1, PLAYER_NAME: 2, TEAM_ID: 3,
//   TEAM_ABBREVIATION: 4, TEAM_NAME: 5, GAME_ID: 6, GAME_DATE: 7,
//   MATCHUP: 8, WL: 9, MIN: 10, FGM: 11, FGA: 12, FG_PCT: 13,
//   FG3M: 14, FG3A: 15, FG3_PCT: 16, FTM: 17, FTA: 18, FT_PCT: 19,
//   OREB: 20, DREB: 21, REB: 22, AST: 23, STL: 24, BLK: 25, TOV: 26,
//   PF: 27, PTS: 28, PLUS_MINUS: 29, VIDEO_AVAILABLE: 30}
// reference for index of array returned

    nba.stats.leagueGameLog({ PlayerOrTeam: "P" }).then(data => {
      console.log(data.resultSets[0]);
      let filtered = data.resultSets[0].rowSet
        .filter(n => parseInt(n[1]) === parseInt(this.id))
        .sort().slice(-5);
      console.log(filtered)
      let last5Games = filtered.map(n => {
        return {
          date: `${n[7]}   ${n[8]}`,
          points: n[28],
          assists: n[23],
          rebounds: n[22]
        }
      })
      this.setState({
        games: last5Games
      });
    });
  }
  // Code is pretty dry, could use refactoring
  // creates a div for each player and renders respectively (playerid, teamid, position, jersey, ppg,rpg,apg, player image)
  render() {
    let commonInfo = this.state.commonInfo;
    let stats = this.state.stats;
    let player = getAllPlayers().filter(
      n => parseInt(n.playerId) === parseInt(this.id)
    )[0];
    return (
      <div className="profile" key="players">
        <h1>
          {commonInfo.firstName} {commonInfo.lastName}{" "}
        </h1>
        <img src={player.url} alt="player-headshot" />
        <p> Player ID : {commonInfo.personId} </p>
        <p>
          Team : {commonInfo.teamCity} {commonInfo.teamName}
        </p>
        <p> Team ID : {commonInfo.teamId} </p>
        <p> Position : {commonInfo.position}</p>
        <p> Jersey # : {commonInfo.jersey} </p>
        <p> Weight : {commonInfo.weight}lb</p>
        <p> PPG : {stats.pts}</p>
        <p> RPG : {stats.reb}</p>
        <p> APG : {stats.ast}</p>
        <br />
        <div>

          <h3> Most Recent Games</h3>
          {this.state.games.reverse().map(ele => (
            <div>
              <p>Date: {ele.date} </p>
              <p>Points: {ele.points}</p>
              <p>Assists: {ele.assists}</p>
              <p>Rebound: {ele.rebounds}</p>
            </div>
          ))}
        </div>
        <br />
        <Link to="/players">Back</Link>
      </div>
    );
  }
}


export default Profile;
