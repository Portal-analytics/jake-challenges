import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.quotes = [
      "Eat chicken",
      "Whine to Brent",
      "Struggle to remember basic math",
      "Don't wake up Paul",
      "Practice ancient Egyptian Jiu-Jitsu",
      "That doesn't exist",
      "Don't bother Googling"
    ];

    this.state = {
      index: 0
    };

    this.arrayLength = this.quotes.length;
  }

  onItemClick = index => {
    if (this.state.index < this.arrayLength - 1) {
      this.setState({
        index: this.state.index + 1
      });
    } else {
      this.setState({
        index: 0
      });
    }
  };

  render() {
    const titleStyle = {
      color: "blue",
      height: "100px"
    };
    const quoteStyle = {
      fontSize: "6em",
      color: "#2C85D1",
      fontFamily: "Roboto"
    };
    return (
      <div className="App">
        <h2 style={titleStyle}> THIS IS MY TITLE </h2>
        <div style={quoteStyle} onClick={this.onItemClick}>
          {this.quotes[this.state.index]}
        </div>
      </div>
    );
  }
}

export default App;
