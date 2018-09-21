import React, { Component } from 'react';
import Tabs from './Tabs.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {active: 'tab1'};
  }
  render() {
    const content = {
      tab1: 'Tab 1',
      tab2: 'Tab 2',
      tab3: 'Tab 3',
      tab4: 'Tab 4'
    };
    return (
      <div className="App">
        <div id="container">
          <div id="title">Title Here</div>
          <Tabs active={this.state.active} onChange={active=>this.setState({active})}>
            <div id="tab1" key="tab1">Tab component 1</div>
            <div id="tab2" key="tab2">Tab component 2</div>
            <div id="tab3" key="tab3">Tab component 3</div>
            <div id="tab4" key="tab4">Tab component 4</div>
          </Tabs>
          <div id="image">{content[this.state.active]}</div>
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
