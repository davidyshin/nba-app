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

    nba.stats.leagueGameLog({ PlayerOrTeam: "P" }).then(data => {
      console.log(data.resultSets[0]);
      let filtered = data.resultSets[0].rowSet
        .filter(n => parseInt(n[1]) === parseInt(this.id))
        .sort().slice(-5);

      let last5Games = filtered.map(n => {
        return {
          date: n[7],
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

          <h1> Most Recent Games</h1>
          {this.state.games.reverse().map(ele => (
            <div>
              <h1>Date: {ele.date} </h1>
              <h1>Points: {ele.points}</h1>
              <h1>Assists: {ele.assists}</h1>
              <h1>Rebound: {ele.rebounds}</h1>
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
