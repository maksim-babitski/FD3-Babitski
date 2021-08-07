import React from 'react';
import PropTypes from 'prop-types';

import './GoodsTable.css';

import GoodsItem from './GoodsItem';
import CardView from './CardView';
import CardEdit from './CardEdit';

class GoodsTable extends React.Component {

  static defaultProps = {
    tableName: "name of shop",
  };

  static propTypes = {
    tableName: PropTypes.string.isRequired, //название таблицы (магазина)
    confirmFunc: PropTypes.func.isRequired,
    
    colomnName:PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired, //названия колонок в таблице
      })
    ),

    goods: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.number.isRequired,
          equipPictUrl: PropTypes.string.isRequired, //URL картинки товара
          equipName: PropTypes.string.isRequired, //название товара
          prise: PropTypes.string.isRequired, //цена товара
          quantity: PropTypes.number.isRequired, //количество товара
        })
    ),
  };

  state = {
    selectedGoodsItemCode: null,
    goodsList: this.props.goods,
    mode: 0, // 0-nothing, 1-view, 2-edit
    addMode: false, // false-edit item, true-add new item
    isEditing: false, //true-is edited, but isn't saved; false-isn't edited or is edited and saved
    key: this.props.goods.length, //key for new item

  }

  goodsItemSelected = (code) => {
    this.setState( {selectedGoodsItemCode:code, mode:1} );
  }

  goodsItemDeleted = (code) => {
    var isconfirmed = this.props.confirmFunc();
    if (isconfirmed) {
        var filteredGoodsList = this.state.goodsList.filter(item => item.code !== code);
        this.setState({goodsList: filteredGoodsList, mode: 0, selectedGoodsItemCode:null});
    }
  }

  goodsItemEdited = (code) => {
    this.setState( {selectedGoodsItemCode:code, mode:2});
  }

  saveItem = (newItem) => {
    var items;
    if(this.state.addMode) {
        items=this.state.goodsList.slice();
        items.push(newItem);
    }else {
        items = this.state.goodsList.map(item => item.code==newItem.code ? newItem : item);
    }
    this.setState({goodsList: items, mode: 0, addMode: false, isEditing: false});
  }

  cancel = () => {
    this.setState({mode: 0, addMode: false, isEditing: false});
  }

  addItem = () => {
    this.setState({mode: 2, addMode: true, key: ++this.state.key});
  }

  editingNow = () => {
    this.setState({isEditing: true});
  }

  render() {

    var colomnNamesCode = this.props.colomnName.map((item) =>
      <th key={item.code} className='ColomnName'>
        {item.name}
      </th>
    );

    var goodsCode = this.state.goodsList.map((item) => 
      <GoodsItem key={item.code} src={item.equipPictUrl}
        equipName={item.equipName} prise={item.prise} quantity={item.quantity} code={item.code}
        cbSelected={this.goodsItemSelected} selectedGoodsItemCode={this.state.selectedGoodsItemCode}
        cbDeleted={this.goodsItemDeleted} cbEdited={this.goodsItemEdited} addMode={this.state.addMode}
        isEditing={this.state.isEditing} mode={this.state.mode} 
      />
    );

    var item = this.state.goodsList.find((item) => item.code == this.state.selectedGoodsItemCode); //выбранный элемент
    
    var addedItem = {code: this.state.key, equipName: '', equipPictUrl: '', prise: '', quantity: ''}; //новый (добавляемый) элемент
    
    return (
      <div>
      <table className='GoodsTable'>
        <caption className='TableName'>{this.props.tableName}</caption>
        <thead>
          <tr>{colomnNamesCode}</tr>
        </thead>
        <tbody>{goodsCode}</tbody>
      </table>
      <input type='button' value='New Product' onClick={this.addItem} hidden={this.state.mode==2}/>
      {(this.state.mode == 1) && <CardView item={item}/>}
      {(this.state.mode == 2) && <CardEdit item={this.state.addMode?addedItem:item} addMode={this.state.addMode}
                                           cbSaveItem={this.saveItem} cbCancel={this.cancel} cbEditingNow={this.editingNow}/>}
      </div>
    );
  }
}

export default GoodsTable;