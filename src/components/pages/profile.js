import React from 'react'
import { Link } from 'react-router-dom'
import nba from 'nba'
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
const Profile = (props) => {
    const players = getAllPlayers()
    const id = props.match.params.id
    let player = players.filter(n => n.playerId === id)

  return (
    <div className="profile" key={player.playerId}>
    <h1> {player.firstName} {player.lastName} </h1>
    <img src={player.url} alt="player-headshot"/>
    <Link to='/players'>Back</Link>
    </div>
  )
}
export default Profile