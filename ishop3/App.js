"use strict";

import React from 'react';
import ReactDOM from 'react-dom';

import GoodsTable from './components/GoodsTable';

import colomnNameArr from './tablehead.json';
import goodsList from './goods.json';

var shopName = 'Moto Equip';

function confirmF() {   
    return confirm('Do you really want to delete this position?');
}

ReactDOM.render(
  <GoodsTable tableName={shopName} goods={goodsList} colomnName={colomnNameArr} confirmFunc={confirmF}/>,
  document.getElementById('container')
);