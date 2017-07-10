import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    var numbercell;



    this.state = {
      numbercell: 10,
      cells: [new Uint8Array(numbercell)]
    };
  }

  render() {

    return (
      <div className="App">
        <ul>
          {this.state.cells.map(cells =>
            <li>
            </li>
          )}
        </ul>

      </div>
    );
  }
}

export default App;
