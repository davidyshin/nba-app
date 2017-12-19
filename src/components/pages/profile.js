import React from "react";
import { Link } from "react-router-dom";
import nba from "nba";
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

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
        stats: "",
      commonInfo: ""
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
  }

  render() {
    let commonInfo = this.state.commonInfo;
    let stats = this.state.stats
    let player = getAllPlayers().filter(n => parseInt(n.playerId) === parseInt(this.id))[0]
    console.log(commonInfo)
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
