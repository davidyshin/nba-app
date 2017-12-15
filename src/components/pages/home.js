import React from 'react'
import ReactDOM from 'react-dom';
import Players from './players'
import Teams from './teams'

const TABS = [
  'home', 'players', 'teams'
]

class Home extends React.Component {
  constructor(props, history) {
    super(props)
    this.state = {
      tab: TABS.JOIN,
      searchInput: ""
    }
    this.setState = this.setState.bind(this)
  }

  handleInput = (e) => {
    this.setState({
      searchInput: e.target.value
    })
  }
  getHome() {
    return (
      <div className="home-container">
        <h1>Welcome to my project built on react</h1>
        <p>Hello World?</p>
      </div>
    )
  }

  getPlayers() {
    return (
      <div className="players-container">
        <h1>All Players</h1>
        <p>List of all players will be here, going to draw component "Players" from players.js file</p>
        <input onChange={this.handleInput} value={this.state.searchInput} name='searchInput' type='text'/>
      <Players searchString={this.state.searchInput}/>
      </div>
    )
  }

  getTeam() {
    return (
      <div className="team-container">
        <h1>Team</h1>
        <p>List of all teams will be here, going to draw component "Teams" from teams.js file</p>
        <Teams />
      </div>
    )
  }

  setTab(tab) {
    return () => this.setState({ tab })
  }


  getToggleHeader() {
    let tabs = TABS.map((tab) => (
      <input className={`${tab}-tab-button`}
        onClick={this.setTab(tab)}
        type='submit'
        value={tab}
      />
    ))
    return (
      <div className='toggle-header'>
        {tabs}
      </div>
    )
  }

  getToggle() {
    switch (this.state.tab) {
      case TABS[TABS.indexOf('home')]:
        return this.getHome()
      case TABS[TABS.indexOf('players')]:
        return this.getPlayers()
      case TABS[TABS.indexOf('teams')]:
        return this.getTeam()
    }
  }

  render() {
    const toggleHeader = this.getToggleHeader()
    const toggle = this.getToggle()    
    return (
      <div className='home-container'>
        {toggleHeader}
        {toggle}
      </div>
    )
  }
}

export default Home
// ReactDOM.render(<Home />, document.getElementById('root'));
