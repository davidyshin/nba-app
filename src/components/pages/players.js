import nba from 'nba'
import React from 'react'

const getAllPlayers = () => {
    let players = nba.players;
    let first = players.firstName
    let last = players.lastName
    for (let i = 0; i < players.length; i++) {
        players[i].firstName = players[i].firstName.replace(" ", "_")
        players[i].lastName = players[i].lastName.replace(" ", "_")
        players[i].firstName = players[i].firstName.replace(".", "")
        players[i].lastName = players[i].lastName.replace(".", "")
    }

    for (let i = 0; i < players.length; i++) {
        players[i].url = `https://nba-players.herokuapp.com/players/${players[i].lastName}/${players[i].firstName}`
    }
    return players
};


class Players extends React.Component {
    constructor() {
        super();
        this.state = {
            filter: ""
        }
        this.players = getAllPlayers()
    }
    handleInput = () => {

    }

    render() {
        return (
            (this.players).map(player => (
                <div className='playerCard' data-id={player.playerId} key={player.fullName}>
                    <a href={player.playerId}>{player.firstName} {player.lastName}</a>
                    <img src={player.url}/>
                </div>
            )
            ))
    }

}


export default Players
console.log(getAllPlayers())