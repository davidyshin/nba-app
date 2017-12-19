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
    this.nbaTeams = teams
  }
  handleChange = e => {
    this.setState({

    })
  }

  render() {

    return (
      <div>
        {this.nbaTeams.map(val => (
          <div>
            <h3>{val.teamName}</h3>
            <p>
              <img src={val.logo} />
            </p>
          </div>
        )
        )}
      </div>
    )
  }
}


export default Teams
