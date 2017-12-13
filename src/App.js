import React from 'react';
import logo from './logo.svg';
import Home from './components/pages/home'
import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      page: "home"
    };
  }
  render() {
    return (
      <div className="App">
        <header className="NBA PROJECT">
          <h1 className="title">Project</h1>
          <Home />
        </header>
      </div>
    );
  }
}

export default App;
