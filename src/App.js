import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      IP: undefined,
      data: undefined
    }
  }

  //when page loads, pull data from API to populate text field
  componentDidMount(){
    fetch("https://ip.nf/me.json")
      .then(res => res.json())
      .then(result => this.setState({
        IP: result.ip.ip
      }))
  }

  //when user wants to pull data about another API, this method fetches data based on user input
  getSpecificAPI = async (e) => {
    e.preventDefault();
    await fetch(`https://ip.nf/${this.state.IP}.json`)
      .then(res => res.json())
      .then(result => this.setState({
        data: result.ip
      }))
  }

  //update state based on user input in text field
  handleIPChange = e => {
    this.setState({ IP: e.target.value })
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.getSpecificAPI}>
          <input type="text" value={this.state.IP} onChange={this.handleIPChange}/>
          <input type="submit" value="Call API" />
        </form>
        {this.state.data && <div>{Object.keys(this.state.data).map( (data, i) => {return <p>{data}: {Object.values(this.state.data)[i]}</p>})}</div>}
      </div>
    );
  }
}

export default App;
