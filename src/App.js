import React, { Component } from 'react';
import './App.css';

const cachios = require("cachios");

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
          <div id="text"><Poem type="city" index="1" /></div>
          <div id="audio">Audio component goes here</div>
          <div id="category-image">Category image component goes here</div>
          <div id="category-audio">Category audio component goes here</div>
          <div id="category-text">Category text component goes here</div>
        </div>
      </div>
    );
  }
}

class Poem extends Component {
  constructor(props) {
    super(props);
    this.type = "nature";
    if (props.type) {
      this.type = props.type;
    }
    this.index = "1";
    if (props.index) {
      this.index = props.index;
    }
    this.state = {
      isLoaded: false,
      data: null
    };
  }

  componentDidMount() {
    cachios.get(`text/${this.type}${this.index}.json`)
      .then(response => {
        this.setState({
          isLoaded: true,
          data: response.data[0]
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { isLoaded, data } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      console.log(data);
      return (
        <div id="poem">
          <h2>{data["title"]}</h2>
          <p>{data["author"]}</p>
          {data["poem"].map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      );
    }
  }
}

export default App;
