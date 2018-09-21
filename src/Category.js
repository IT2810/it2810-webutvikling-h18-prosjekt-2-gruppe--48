import React, { Component } from 'react';
import './App.css';


/*
    Component for making a Box with multiple categories one can choose. Takes the props, 
    boxName for the title of the box, 
    categoryNames for the names of the categories,
    callback for the callback function, this function must take a map with the categories as keys and wether they're checked or not as values.
    See AppCategoryTest.js as an example of use.
*/
export default class CategoryBox extends Component {
    
    constructor(props) {
        super(props);
        
        
        this.catMap = new Map();
        
        for (var i = 0; i < props.categoryNames.length; i++) {
            this.catMap.set(props.categoryNames[i], false);
        }
        
        this.onChange = this.onChange.bind(this);
    }
    
    onChange(catName, value) {
        
        for (var [key] of this.catMap.entries()) {
            this.catMap.set(key, false);
        }
        
        this.catMap.set(catName, value);
        
        if (this.props.callback != null) {
            this.props.callback(this.catMap);
        }
    }
    
    renderOptions() {
        var categories = this.props.categoryNames;
        
        var callback = this.onChange;
        var catName = this.props.boxName;
        
        var cList = categories.map(function(cat){
            return <RadioBox checkName={cat} onChange={callback} key={cat} category={catName}/>;
        });
        
        return cList;
    }

    
    render() {
        return (
            <div>
                <div className="Category-Title">
                    {this.props.boxName}
                </div>
                <div className="Category-Checkboxes">
                    {this.renderOptions()}
                </div>
                
            </div>
        );
  }
}

/*
    A singular Radiobox.
*/
class RadioBox extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            checked : false,  
        };
        
        this.handleCheck = this.handleCheck.bind(this);
    }
    
    handleCheck() {
        this.props.onChange(this.props.checkName, !this.state.checked);
        
        this.setState({checked: !this.state.checked,});
    }
    
    render() {
        return (
            
            <div className="Category-Checkbox">
                <input type="radio" name={this.props.category} onChange={this.handleCheck} defaultChecked={this.state.checked} value={this.props.checkName}/>{this.props.checkName}
            </div>
        );
    }
}
