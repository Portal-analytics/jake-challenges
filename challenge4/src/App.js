import React, { Component } from "react";
import "./App.css";
import { Header, Input, Button, Table, Label } from "semantic-ui-react";

class App extends Component {
  constructor() {
    super();

    this.state = {
      contractName: "",
      contractDescription: "",
      contractPrice: "",
      contracts: []
    };
  }
  onNameEntry = event => {
    this.setState({
      contractName: event.target.value
    });
  };

  handleEditingChange = (event, field) => {
    /* Map over contracts, looking for a contract with contractID. 
    If contract.id === contractID, then modify contract.name and return contract. 
    Otherwise, return contract unmodified. */
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

  onSubmit = () => {
    const newContract = {
      name: this.state.contractName,
      description: this.state.contractDescription,
      price: this.state.contractPrice,
      id: Math.random()
    };

    this.setState({
      contracts: this.state.contracts.concat([newContract]),
      contractName: "",
      contractDescription: "",
      contractPrice: ""
    });
  };

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
              onClick={() => this.onSubmit()}
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
