import React from 'react';

import Br2jsx from './Br2jsx';
import './MyComponent.css';

class MyComponent extends React.Component {
    render () {
        let text="первый<br>второй<br/>третий<br />последний";

        return (
            <div className='MyComponent'>
                <Br2jsx text={text}/>
            </div>           
        );
    }
}

export default MyComponent;