import React from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component {

    static propTypes = {
        caption1: PropTypes.string.isRequired,
        caption2: PropTypes.string.isRequired,
        cbPressed: PropTypes.func.isRequired,
    }

    buttonClicked = (EO) => {
        this.props.cbPressed(EO.target.value);
    }

    render() {

        return (
            <div>
                <input type='button' value={this.props.caption1} onClick={this.buttonClicked}></input>
                <span>{this.props.children}</span>
                <input type='button' value={this.props.caption2} onClick={this.buttonClicked}></input>
            </div> 
        );
    }
}

export default DoubleButton;