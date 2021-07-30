import React from 'react';
import PropTypes from 'prop-types';

import './CardView.css'

class CardView extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired //элемент, карточка которого будет показана
    }

    render () {
        return (
            <div className='CardView'>
                <div className='Name'>{this.props.item.equipText}</div>
                <div className='Price'>Price: {this.props.item.prise}</div>
                <div className='Quantity'>Quantity: {this.props.item.quantity}</div>
            </div>
        )
    };

}

export default CardView;