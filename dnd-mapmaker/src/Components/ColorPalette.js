import React, { Component } from "react";
import { GithubPicker } from "react-color";

class ColorPalette extends React.Component {
  render() {
    return (
      <GithubPicker
        onChangeComplete={background =>
          this.props.handleChangeComplete(background)}
      />
    );
  }
}

export default ColorPalette;
