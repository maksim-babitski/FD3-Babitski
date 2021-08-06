import React from 'react';
import PropTypes from 'prop-types';

class Br2jsx extends React.Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
    };

    render () {
        let words = this.props.text.split(/<br\s*\/?>/i)
        let codeArr = [];
        words.forEach((word, i) => {
            if(i) {
                codeArr.push(<br key={i}/>);
            }
            codeArr.push(word);
        });

        return (
            codeArr
        )
    }
}

export default Br2jsx;