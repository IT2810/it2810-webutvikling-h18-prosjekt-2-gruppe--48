import React, { Component } from 'react';
import './App.css';
import CategoryBox from './Category.js'

const cachios = require("cachios");

var updateMap = {};
var categories = ["animals", "city", "nature"];
var currentCategory = { "text": "animals", 
                        "audio": "animals", 
                        "images": "animals"};
var currentIndex = 1;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { active: 'tab1' };
    this.callback = this.callback.bind(this);
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
          <div id="image"><SVGComponent /></div>
          <div id="text"><PoemComponent /></div>
          <div id="audio"><AudioComponent /></div>
          <div id="category-image"><CategoryBox boxName="images" categoryNames={categories} callback={this.callback}
          /></div>
          <div id="category-audio"><CategoryBox boxName="audio" categoryNames={categories} callback={this.callback}
          /></div>
          <div id="category-text"><CategoryBox boxName="text" categoryNames={categories} callback={this.callback}
          /></div>
        </div>
      </div>
    );
  }
  callback(categories, boxName) {
    for (var [key, value] of categories.entries()) {
      if (value) {
        currentCategory[boxName] = key;
      }
      console.log(boxName, key, value);
    }
    switch (boxName) {
      case "audio": updateMap["audio"].setSource(currentCategory["audio"], currentIndex); break;
      case "text": getResource(updateMap["text"]); break;
      case "images": getResource(updateMap["images"]); break;
    }
  }
}

function getResource(component) {
  cachios.get(`${component.prefix}/${currentCategory[component.prefix]}${currentIndex}${component.suffix}`)
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
    this.prefix = "images";
    this.suffix = ".svg";
    updateMap["images"] = this;
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
    this.prefix = "text";
    this.suffix = ".json";    
    updateMap["text"] = this;
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
  constructor(props) {
    super(props);
    this.setSource = this.setSource.bind(this);
    this.source = `audio/${currentCategory["audio"]}${currentIndex}.mp3`;
    updateMap["audio"] = this;
  }
  setSource(category, index) {
    console.log(category, index);
    this.source = `audio/${category}${index}.mp3`;
    this.forceUpdate();
  }
  render() {
    return (
      <audio id="audio-player" controls src={this.source} type="audio/mpeg">
        Audio player not supported.
      </audio>
    );
  }
}

class Tabs extends Component {
  render() {
    return (
      <div className="Tabs">
        {React.Children.map(this.props.children, (child, i) => {
          return (
            <div className="Tabs__Tab" onClick={() => {
              currentIndex = i + 1;
              getResource(updateMap["images"]);
              getResource(updateMap["text"]);
              updateMap["audio"].setSource(currentCategory["audio"], currentIndex);
              this.props.onChange(child.key);
            }}>
              {child}
            </div>
          );
        })}
      </div>

    );
  }
}

export default App;
