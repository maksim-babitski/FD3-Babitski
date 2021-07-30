import React from 'react';
import PropTypes from 'prop-types';

import './GoodsItem.css';

class GoodsItem extends React.Component { 

  static propTypes = {
    code: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired, //URL картинки товара
    equipName: PropTypes.string.isRequired, //название товара
    prise: PropTypes.string.isRequired, //цена товара
    quantity: PropTypes.number.isRequired, //количество товара
    selectedGoodsItemCode: PropTypes.number, //код выбранного товара
    cbSelected: PropTypes.func.isRequired,
    cbDeleted: PropTypes.func.isRequired,
    cbEdited: PropTypes.func.isRequired,
    addMode: PropTypes.bool.isRequired, //режим карточки редактирования
    isEditing: PropTypes.bool.isRequired, //элемнт в данный момент редактируется
    mode: PropTypes.number.isRequired,
  };

  goodsItemClicked = () => {
    this.props.cbSelected(this.props.code);
  }

  deleteGoodsItem = () => {
    this.props.cbDeleted(this.props.code);
  }

  editGoodsItem = (EO) => {
    EO.stopPropagation();
    this.props.cbEdited(this.props.code);
  }

  render() {

    return (
<tr className='GoodsItem' onClick={(this.props.isEditing || this.props.addMode) ? null : this.goodsItemClicked}
        style={{background: ((this.props.selectedGoodsItemCode == this.props.code) && !(this.props.addMode) && this.props.mode!==0) ? 'pink' : 'white'}}>
        <td className='Equipment'>
          <img className='EquipPict' src={this.props.src} />
          <span className='EquipName'>{this.props.equipName}</span>
        </td>
        <td className='Prise'>{this.props.prise}</td>
        <td className='Quantity'>{this.props.quantity}</td>
        <td className='Control'>
          <input type='button' value='Edit' onClick={this.editGoodsItem} disabled={this.props.isEditing || this.props.addMode} />
          <input type='button' value='Delete' onClick={this.deleteGoodsItem} disabled={this.props.mode==2} />
        </td>
      </tr>
    );
  }
}

export default GoodsItem;