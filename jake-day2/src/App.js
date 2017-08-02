import React, { Component } from "react";
import "./App.css";
import { Header, Button } from "semantic-ui-react";

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
      index: 0,
      count: 0
    };
  }

  nextQuote = index => {
    this.setState({
      index: (this.state.index + 1) % this.quotes.length,
      count: this.state.count + 1
    });
  };

  randomQuote = index => {
    this.setState({
      index: Math.floor(Math.random() * this.quotes.length),
      count: this.state.count + 1
    });
  };

  render() {
    const titleStyle = {
      color: "blue",
      height: "100px"
    };
    const quoteStyle = {
      fontSize: "6em",
      color: "#2C85D1",
      fontFamily: "Roboto",
      userSelect: "none",
      padding: "100px"
    };
    const footerStyle = {
      width: "100%",
      backgroundColor: "#2C85D1",
      color: "black",
      padding: "9px"
    };
    const counterStyle = {
      textAlign: "right",
      padding: "100px",
      fontSize: "30px",
      color: "#2C85D1",
      fontFamily: "Roboto"
    };
    return (
      <div className="App">
        <Header as="h3" block size="huge" color="blue">
          The World's Greatest Advice!
        </Header>

        <div style={quoteStyle}>
          {this.quotes[this.state.index]}
        </div>
        <Button animated="fade" onClick={this.nextQuote}>
          <Button.Content visible>Next Quote!</Button.Content>
          <Button.Content hidden>You're a square.</Button.Content>
        </Button>
        <Button animated="fade" onClick={this.randomQuote}>
          <Button.Content visible>Random Quote.</Button.Content>
          <Button.Content hidden>Adventurous eh?</Button.Content>
        </Button>
        <div className="footer" style={footerStyle}>
          “Made by Jake, the maloney, Malony” or something like that
        </div>
        <div className="counter" style={counterStyle}>
          Number of shitty lines delivered = {this.state.count}
        </div>
      </div>
    );
  }
}

export default App;
