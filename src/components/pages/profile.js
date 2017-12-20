import React from "react";
import { Link } from "react-router-dom";
import nba from "nba";
import {getAllPlayers} from './players.js'

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
    nba.stats
      .homepageV2({
        StatType: "Traditional",
        GameScope: "Season",
        PlayerScope: "All Players"
      })
      .then(result => {
        console.log(result);
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
    console.log(commonInfo);
    return (
      <div className="profile" key="players">
        <h1>
          {commonInfo.firstName} {commonInfo.lastName}{" "}
        </h1>
        <h3> Player ID : {commonInfo.personId} </h3>
        <h3> Team ID : {commonInfo.teamId} </h3>
        <h3> Position : {commonInfo.position}</h3>
        <h3> Jersey # : {commonInfo.jersey} </h3>
        <h2> PPG : {stats.pts}</h2>
        <h2> RPG : {stats.reb}</h2>
        <h2> APG : {stats.ast}</h2>
        <img src={player.url} alt="player-headshot" />
        <br />
        <Link to="/players">Back</Link>
      </div>
    );
  }
}

export default Profile;
