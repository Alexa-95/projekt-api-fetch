import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.number = React.createRef();
  }

  state = {
    text: "Type the year",
    error: ""
  }

  handleDateChange = () => {
    const value = this.number.current.value;
    
    console.log(value);
    fetch(`http://numbersapi.com/${value}/year?json`)
      .then(res => {
        if(res.ok){
          return res;
        }
        throw Error(res.statusText)
      })
      .then(res => res.json())
      .then(data => this.setState({
        text: data.text
      }))
      .catch(err => {
        this.setState({
          text: `Coś jest nie tak :( ${err}`
        })
      })
  }


  render(){
    return (
      <div className="App">
        <input onChange={this.handleDateChange} type="text" ref={this.number} />
        <p>{this.state.text}</p>
      </div>
    );
  }
}

export default App;
