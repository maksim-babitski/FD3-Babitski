import React from 'react';

import DoubleButton from './DoubleButton'
import { withRainbowFrame } from './withRainbowFrame'
import './MyComponent.css';

class MyComponent extends React.Component {
    render () {
        let colors = ['red','blue', 'green','orange', 'yellow'];

        let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

        return (
            <div className='MyComponent'>
                <DoubleButton caption1="однажды" caption2="пору" cbPressed={num => alert(num)} >в студёную зимнюю</DoubleButton>
                <br />
                <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={num => alert(num)}>
                    вышел, был сильный
                </FramedDoubleButton>
            </div>    
        );
    }
}

export default MyComponent;