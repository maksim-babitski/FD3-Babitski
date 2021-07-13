var GoodsItem = React.createClass({

    displayName: 'GoodsItem',
  
    propTypes: {
      code: React.PropTypes.number.isRequired,
      src: React.PropTypes.string.isRequired, //URL картинки товара
      equipText: React.PropTypes.string.isRequired, //название товара
      prise: React.PropTypes.string.isRequired, //цена товара
      quantity: React.PropTypes.number.isRequired, //количество товара
      selectedGoodsItemCode: React.PropTypes.number, //код выбранного товара
      cbSelected: React.PropTypes.func.isRequired,
      cbDeleted: React.PropTypes.func.isRequired,
    },

    goodsItemClicked: function() {
      this.props.cbSelected(this.props.code);
    },

    deleteGoodsItem: function() {
      this.props.cbDeleted(this.props.code);
    },
  
    render: function() {
  
      return React.DOM.tr({className:'GoodsItem', onClick: this.goodsItemClicked,
          style: {background: ((this.props.selectedGoodsItemCode == this.props.code) ? 'pink' : 'white')}},
        React.DOM.td({className:'Equipment'},
          React.DOM.img({className:'EquipPict', src:`${this.props.src}`}),
          React.DOM.span({className:'EquipText'}, this.props.equipText),
         ),
        React.DOM.td({className:'Prise'}, this.props.prise),
        React.DOM.td({className:'Quantity'}, this.props.quantity),
        React.DOM.td({className:'Quantity'},
          React.DOM.input( {type:'button',value:'Delete', onClick:this.deleteGoodsItem} ),
        ),
      );
    },
  
  });