import React, { Component } from "react";
import "./App.css";
import { Button, Grid, Input } from "semantic-ui-react";
import { GithubPicker } from "react-color";

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
      paintbrush: "#3A574B",
      background: "#8D6D28",
      mouseDown: false
    };
  }

  handleChangeComplete = color => {
    this.setState({ paintbrush: color.hex });
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

  onSubmit = () => {
    this.setState({
      columns: makeArray(parseFloat(this.state.numberColumns)),
      rows: makeArray(parseFloat(this.state.numberRows))
    });
  };

  onPaint = index => {
    if (this.state.mouseDown === true) {
      const updatedRows = Object.assign([...this.state.rows], {
        [index]: this.state.paintbrush
      });
      this.setState({ rows: updatedRows });
    }
  };

  onMouseDown = index => {
    this.setState(
      {
        mouseDown: true
      },
      () => this.onPaint(index)
    );
  };

  onMouseUp = () => {
    this.setState({
      mouseDown: false
    });
  };

  render() {
    const cellStyle = {
      borderColor: "black",
      borderStyle: "solid",
      position: "absolute",
      height: "40px",
      width: "40px"
    };
    const appStyle = {
      height: "100%",
      width: "100%",
      position: "absolute"
    };
    return (
      <div className="App" style={appStyle} onMouseUp={() => this.onMouseUp()}>
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
        <Button onClick={event => this.onSubmit()} content="Submit" />
        <GithubPicker
          color={this.state.paintbrush}
          onChangeComplete={this.handleChangeComplete}
        />
        <div>
          {this.state.rows.map((r, index) =>
            <div
              style={{
                ...cellStyle,
                left: index * 40,
                backgroundColor: this.state.rows[index]
              }}
              onMouseDown={() => this.onMouseDown(index)}
              onMouseOver={() => this.onPaint(index)}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
