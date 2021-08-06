import React from 'react';

import RainbowFrame from './RainbowFrame';
import './MyComponent.css';

class MyComponent extends React.Component {
    render () {
        let colors = ['red','blue', 'green','orange', 'yellow'];

        return (
            <div className='MyComponent'>
                <RainbowFrame colors={colors}>
                  Hello!
                </RainbowFrame>
            </div>    
        );
    }
}

export default MyComponent;