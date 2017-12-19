import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Players from '../pages/players'
import Profile from '../pages/profile'

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
  <Switch>
    <Route exact path='/players' component={Players}/>
    <Route path='/players/:id' component={Profile} />
  </Switch>
)


export default Roster
