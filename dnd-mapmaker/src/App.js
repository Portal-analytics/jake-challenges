import React, { Component } from "react";
import "./App.css";
import { Button, Grid, Input } from "semantic-ui-react";
import ColorPalette from "./Components/ColorPalette";

const makeArray = length => {
  let arr = [];
  for (var x = 0; x < length; x++) {
    arr.push(0);
  }
  return arr;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberRows: 0,
      rows: [],
      numberColumns: 0,
      columns: [],
      background: "#fff"
    };
  }

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  onRowEntry = event => {
    this.setState({
      numberRows: event.target.value
    });
  };

  onColumnEntry = event => {
    this.setState({
      numberColumns: event.target.value
    });
  };

  onSubmit = event => {
    this.setState({
      columns: makeArray(parseFloat(this.state.numberColumns)),
      rows: makeArray(parseFloat(this.state.numberRows))
    });
  };

  render() {
    const cellStyle = {
      backgroundColor: this.state.background,
      borderColor: "black",
      borderStyle: "solid",
      position: "absolute",
      height: "20px",
      width: "20px"
    };

    return (
      <div className="App">
        <Input
          onChange={numberRows => this.onRowEntry(numberRows)}
          focus
          placeholder="Number of rows"
          value={this.state.numberRows}
        />
        <Input
          onChange={numberColumns => this.onColumnEntry(numberColumns)}
          focus
          placeholder="Number of columns"
          value={this.state.numberColumns}
        />
        <Button onClick={event => this.onSubmit(event)} content="Submit" />
        <ColorPalette
          background={this.state.background}
          onChangeComplete={this.handleChangeComplete}
        />
        <div>
          {this.state.rows.map((r, index) =>
            <div style={{ ...cellStyle, left: index * 20 }} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
