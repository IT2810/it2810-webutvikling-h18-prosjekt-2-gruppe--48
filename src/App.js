import React, { Component } from 'react';
import './App.css';
import Tabs from './Tabs.js';
import CategoryBox from './Category.js'

const cachios = require("cachios");

var categories = ["animals", "city", "nature"];
var currentCategory = "animals";
var currentIndex = "1";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 'tab1' };
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
          <div id="title">The amazing content site</div>
          <Tabs active={this.state.active} onChange={active => this.setState({ active })}>
            <div id="tab1" className="tab" key="tab1">Tab component 1</div>
            <div id="tab2" className="tab" key="tab2">Tab component 2</div>
            <div id="tab3" className="tab" key="tab3">Tab component 3</div>
            <div id="tab4" className="tab" key="tab4">Tab component 4</div>
          </Tabs>
          <div id="image">{content[this.state.active]}</div>
          <div id="text">Text component goes here</div>
          <div id="audio">Audio component goes here</div>
          <div id="image"><SVGComponent index="2" /></div>
          <div id="text"><PoemComponent /></div>
          <div id="audio"><AudioComponent /></div>
          <div id="category-image"><CategoryBox boxName="images" categoryNames={categories} callback={this.callback}
          /></div>
           <div id="category-audio"><CategoryBox boxName="sounds" categoryNames={categories} callback={this.callback}
          /></div>
           <div id="category-text"><CategoryBox boxName="text" categoryNames={categories} callback={this.callback}
          /></div>
        </div>
      </div>
    );
  }
}

function getResource(component) {
  cachios.get(`${component.prefix}${currentCategory}${currentIndex}${component.suffix}`)
    .then(response => {
      component.setState({
        isLoaded: true,
        data: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

class AJAXComponent extends Component {
  constructor(props) {
    super(props);
    this.prefix = "";
    this.suffix = "";
    this.state = {
      isLoaded: false,
      data: null
    };
  }

  componentDidMount() {
    getResource(this);
  }
}

class SVGComponent extends AJAXComponent {
  constructor(props) {
    super(props);
    this.prefix = "images/";
    this.suffix = ".svg";
  }

  render() {
    const { isLoaded, data } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div dangerouslySetInnerHTML={{ __html: data }}>
        </div>
      );
    }
  }
}

class PoemComponent extends AJAXComponent {
  constructor(props) {
    super(props);
    this.prefix = "text/";
    this.suffix = ".json";
  }

  render() {
    const { isLoaded, data } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id="poem">
          <h2>{data[0]["title"]}</h2>
          <p>{data[0]["author"]}</p>
          {data[0]["poem"].map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      );
    }
  }
}

class AudioComponent extends Component {
  render() {
    return (
      <audio controls src={`sounds/${currentCategory}${currentIndex}.mp3`} type="audio/mpeg">
        Audio player not supported.
      </audio>
    );
  }
}

export default App;
