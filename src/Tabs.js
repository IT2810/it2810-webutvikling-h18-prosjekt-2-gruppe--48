import React from 'react';

class Tabs extends React.Component {
    componentDidMount(){

    }
    render(){
        return(
            <div className="Tabs">
                {React.Children.map(this.props.children, (child, i) => {
                    return (
                        <div className="Tabs__Tab" onClick={() => {
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

export default Tabs;
