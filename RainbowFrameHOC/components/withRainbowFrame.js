import React, { Component } from 'react';

const withRainbowFrame = colors => Component => props => {
    let code = <Component {...props}/>;
    colors.forEach( color => {
        code = <div style={{border:"solid 4px " +color,padding:"5px"}}>{code}</div>
    });

    return (
        code
    )
}

export { withRainbowFrame };