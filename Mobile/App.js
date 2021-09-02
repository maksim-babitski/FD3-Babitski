"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

import clientsArr from './clients.json';

let companyName='Velcom';

function confirmF() {   
    return confirm('Do you really want to delete this position?');
}

ReactDOM.render(
  <MobileCompany name={companyName} clients={clientsArr} confirmFunc={confirmF}/>,
  document.getElementById('container')
);