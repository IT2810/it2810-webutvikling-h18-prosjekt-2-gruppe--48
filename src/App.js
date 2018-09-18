import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="container">
          <div id="title">Title Here</div>
          <div id="tab1">Tab component 1</div>
          <div id="tab2">Tab component 2</div>
          <div id="tab3">Tab component 3</div>
          <div id="tab4">Tab component 4</div>
          <div id="image">Image component goes here</div>
          <div id="text">Text component goes here</div>
          <div id="audio">Audio component goes here</div>
          <div id="category-image">Category image component goes here</div>
          <div id="category-audio">Category audio component goes here</div>
          <div id="category-text">Category text component goes here</div>
        </div>
      </div>
    );
  }
}

export default App;
