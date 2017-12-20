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
      commonInfo: ""
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
        <img src={player.url} alt="player-headshot" />
        <br />
        <Link to="/players">Back</Link>
      </div>
    );
  }
}

export default Profile;
