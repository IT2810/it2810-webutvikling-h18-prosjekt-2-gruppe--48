import React, { Component } from 'react';
import './App.css';
import CategoryBox from './Category.js'

class App extends Component {
    
    constructor(props) {
        super(props);
        
        this.callback = this.callback.bind(this);
    }
    
    callback(categories) {
        
        //Makes the contents of the categories map into a string
        var str = "";
        for (var [key, value] of categories.entries()) {
            str += key + ' = ' + value + "   ";
        }
        
        //Shows the contents of the categories map.
        alert(str);
    }
    
  render() {
      
    var categories = ["Dyr", "By", "Natur"];  
    return (
      <CategoryBox boxName="Bilder" categoryNames={categories} callback={this.callback}
        />
    );
  }
}

export default App;
