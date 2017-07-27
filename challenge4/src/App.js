import React, { Component } from "react";
import "./App.css";
import { Header, Input, Button, Table, Label } from "semantic-ui-react";
import firebase from "firebase/app";
import "firebase/database";

class App extends Component {
  constructor() {
    super();

    var config = {
      apiKey: "AIzaSyD49V6isTLcOBf_mOsUxcrp3TB3qQ6eQ4o",
      authDomain: "contract-tracker-e5b5d.firebaseapp.com",
      databaseURL: "https://contract-tracker-e5b5d.firebaseio.com",
      projectId: "contract-tracker-e5b5d",
      storageBucket: "",
      messagingSenderId: "279223235502"
    };

    this.firebase = firebase.initializeApp(config);
    this.database = this.firebase.database().ref().child("contracts");

    this.state = {
      contracts: [],
      contractName: "",
      contractDescription: "",
      contractPrice: ""
    };
  }

  // lifecyle method for realtime updates from database
  componentWillMount = () => {
    const previousContracts = this.state.contracts;

    this.database.on("value", snap => {
      const val = snap.val() || {};
      const contracts = Object.keys(val).map(k =>
        Object.assign({}, val[k], { id: k })
      );

      this.setState({
        contracts: contracts
      });
    });
  };

  // example of writing data with firebase
  writeContractData = contract => {
    firebase.database().ref(contract.id).set(contract);
  };

  // current editting input field
  handleEditingChange = (event, field) => {
    const updatedContracts = this.state.contracts.map(contract => {
      return this.state.editingContractID === contract.id
        ? {
            ...contract,
            [field]: event.target.value
          }
        : contract;
    });

    this.setState({ contracts: updatedContracts });
  };

  addContract() {
    const contractRef = this.database.push();

    contractRef.set({
      name: this.state.contractName,
      description: this.state.contractDescription,
      price: this.state.contractPrice
    });
  }

  onEdit = contractID => {
    this.setState({
      editingContractID: contractID
    });
  };

  onSave = contractID => {
    this.setState({
      editingContractID: null
    });
  };

  // Input functions
  onNameEntry = event => {
    this.setState({
      contractName: event.target.value
    });
  };

  onDescEntry = event => {
    this.setState({
      contractDescription: event.target.value
    });
  };

  onPriceEntry = event => {
    this.setState({
      contractPrice: event.target.value
    });
  };

  // Main render
  render() {
    const inputStyle = {
      padding: "10px"
    };

    return (
      <div className="App">
        <Header as="h4" size="huge" inverted color="teal" block>
          Cont(r)act Tracker
        </Header>
        <div className="flexcontainer">
          <div className="entrybox">
            <Input
              style={inputStyle}
              onChange={contractName => this.onNameEntry(contractName)}
              focus
              placeholder="Contract Name"
              value={this.state.contractName}
            />
            <br />
            <Input
              style={inputStyle}
              onChange={contractDescription =>
                this.onDescEntry(contractDescription)}
              focus
              placeholder="Contract Description"
              value={this.state.contractDescription}
            />
            <br />
            <Input
              style={inputStyle}
              onChange={contractPrice => this.onPriceEntry(contractPrice)}
              focus
              placeholder="Contract Price"
              value={this.state.contractPrice}
            />
            <br />
            <Button
              color="teal"
              style={inputStyle}
              onClick={() => this.addContract()}
              content="Submit"
            />
          </div>
          <div className="listbox">
            <Table celled fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={6}>Name</Table.HeaderCell>
                  <Table.HeaderCell width={6}>Description</Table.HeaderCell>
                  <Table.HeaderCell width={6}>Price ($)</Table.HeaderCell>
                  <Table.HeaderCell width={1} />
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.contracts.map(contract =>
                  <Table.Row>
                    <Table.Cell>
                      {this.state.editingContractID === contract.id
                        ? <Input
                            onChange={event =>
                              this.handleEditingChange(event, "name")}
                            focus
                            value={contract.name}
                          />
                        : contract.name}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.editingContractID === contract.id
                        ? <Input
                            onChange={event =>
                              this.handleEditingChange(event, "description")}
                            focus
                            value={contract.description}
                          />
                        : contract.description}
                    </Table.Cell>
                    <Table.Cell>
                      {this.state.editingContractID === contract.id
                        ? <Input
                            onChange={event =>
                              this.handleEditingChange(event, "price")}
                            focus
                            value={contract.price}
                          />
                        : contract.price}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        fluid
                        color="teal"
                        onClick={() => {
                          this.state.editingContractID !== contract.id
                            ? this.onEdit(contract.id)
                            : this.onSave(contract.id);
                        }}
                        content={
                          this.state.editingContractID === contract.id
                            ? "save"
                            : "edit"
                        }
                      />
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
