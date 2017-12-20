import React from 'react'
import ReactDom from 'react-dom'
import nba from 'nba'

const teams = nba.teams

class Teams extends React.Component {
  constructor() {
    super()
    this.state = ({
      pHolder: ''
    })
  }

  handleChange = e => {
    this.setState({

    })
  }

  drawTeams() {
    return teams.map(team => (
      <div key={ team.teamName } >
        <h3>{ team.teamName }</h3>
        <p><img src={ team.logo } /></p>
      </div>
    ))
  }

  render() {
    return (
      <div>
        { this.drawTeams() }
      </div>
    )
  }
}

export default Teams
