import React, { Component } from 'react';
import Tabs from './Tabs.js';
import './App.css';
import CategoryBox from './Category.js'

const cachios = require("cachios");
var categories = ["Dyr", "By", "Natur"];  

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
          <div id="title">The amazing content site</div>
          <Tabs active={this.state.active} onChange={active=>this.setState({active})}>
            <div id="tab1" class="tab" key="tab1">Tab component 1</div>
            <div id="tab2" class="tab" key="tab2">Tab component 2</div>
            <div id="tab3" class="tab" key="tab3">Tab component 3</div>
            <div id="tab4" class="tab" key="tab4">Tab component 4</div>
          </Tabs>
          <div id="image">{content[this.state.active]}</div>
          <div id="text">Text component goes here</div>
          <div id="audio">Audio component goes here</div>
          <div id="image"><SVGimage index="2"/></div>
          <div id="text"><Poem/></div>
          <div id="audio"><AudioComponent/></div>
          <div id="category-image"><CategoryBox boxName="Bilder" categoryNames={categories} callback={this.callback}
        /></div>
          <div id="category-audio">Category audio component goes here</div>
          <div id="category-text">Category text component goes here</div>
        </div>
      </div>
    );
  }
}

function getResource(component) {
  cachios.get(`${component.prefix}${component.type}${component.index}${component.suffix}`)
    .then(response => {
      console.log(response);
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
    getResource(this);
  }
}

class SVGimage extends AJAXComponent {
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
        <div dangerouslySetInnerHTML={{__html: data}}>
        </div>
      );
    }
  }
}

class AudioComponent extends AJAXComponent {
  constructor(props) {
    super(props);
    this.prefix = "audio/";
    this.suffix = ".mp3";
  }

  render() {
    const { isLoaded, data } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <audio controls loop src={data}>
          Audio player not supported.
        </audio>
      );
    }
  }
}

class Poem extends AJAXComponent {
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

export default App;
