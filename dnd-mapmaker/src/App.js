import React, { Component } from "react";
import "./App.css";
import { Button, Grid, Input } from "semantic-ui-react";
import { GithubPicker } from "react-color";

const makeArray = (rowLength, columnLength) => {
  let rows = [];

  for (var x = 0; x < rowLength; x++) {
    let cells = [];
    for (var y = 0; y < columnLength; y++) {
      cells.push(0);
    }
    rows.push(cells);
  }
  return rows;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numberRows: null,
      rows: [],
      numberColumns: null,
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
      rows: makeArray(
        parseFloat(this.state.numberRows),
        parseFloat(this.state.numberColumns)
      )
    });
    console.log(this.state.rows);
  };

  onPaint = (rowIndex, cellIndex) => {
    const row = this.state.rows[rowIndex];
    const updatedRow = Object.assign([...row], {
      [cellIndex]: this.state.paintbrush
    });
    const updatedRows = Object.assign([...this.state.rows], {
      [rowIndex]: updatedRow
    });
    this.setState({ rows: updatedRows });
  };

  onMouseDown = (rowIndex, cellIndex) => {
    this.setState(
      {
        mouseDown: true
      },
      () => this.onPaint(rowIndex, cellIndex)
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
          placeholder="Width"
          value={this.state.numberRows}
        />
        <Input
          onChange={numberColumns => this.onColumnEntry(numberColumns)}
          focus
          placeholder="Length"
          value={this.state.numberColumns}
        />
        <Button onClick={event => this.onSubmit()} content="Submit" />
        <GithubPicker
          color={this.state.paintbrush}
          onChangeComplete={this.handleChangeComplete}
        />
        <div>
          {this.state.rows.map((row, rowIndex) =>
            <div key={rowIndex}>
              {row.map((cell, cellIndex) =>
                <div
                  key={cellIndex}
                  style={{
                    ...cellStyle,
                    left: rowIndex * 40,
                    top: 160 + cellIndex * 40,
                    backgroundColor: cell
                  }}
                  onMouseDown={() => this.onMouseDown(rowIndex, cellIndex)}
                  onMouseOver={() =>
                    this.state.mouseDown && this.onPaint(rowIndex, cellIndex)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
