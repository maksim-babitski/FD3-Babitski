import React from 'react';
import PropTypes from 'prop-types';

class RainbowFrame extends React.Component {

    static propTypes = {
        colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    };

    render () {

        if (this.props.colors.length == 0) {
            return (this.props.children)
        } else {
            return (
                <div style={{border:"solid 4px "+this.props.colors[0],padding:"5px"}}>
                    <RainbowFrame colors={this.props.colors.slice(1)}>
                        {this.props.children}
                    </RainbowFrame>
                </div>
            )
        }
    }
}

export default RainbowFrame;