"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import MobileCompany from './components/MobileCompany';

let companyName='Velcom';
let clientsArr=[
  {id:1, lastName: "Иванов", name: "Иван", middleName: "Иванович", balance:200},
  {id:2, lastName: "Сидоров", name: "Сергей", middleName: "Сергеевич", balance:250},
  {id:3, lastName: "Петров", name: "Пётр", middleName: "Петрович", balance:180},
  {id:4, lastName: "Григорьев", name: "Григорий", middleName: "Григорьевич", balance:-220},
];

function confirmF() {   
    return confirm('Do you really want to delete this position?');
}

ReactDOM.render(
  <MobileCompany name={companyName} clients={clientsArr} confirmFunc={confirmF}/>,
  document.getElementById('container')
);