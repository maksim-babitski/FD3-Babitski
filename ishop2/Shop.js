var GoodsTable = React.createClass({

    displayName: 'GoodsTable',
  
    getDefaultProps: function() {
      return {tableName: "name of shop"}
    },

    propTypes: {
        tableName: React.PropTypes.string.isRequired, //название таблицы (магазина)
        confirmFunc: React.PropTypes.func.isRequired,
        
        colomnName:React.PropTypes.arrayOf(
          React.PropTypes.shape({
            code: React.PropTypes.number.isRequired,
            name: React.PropTypes.string.isRequired, //названия колонок в таблице
          })
        ),

        goods:React.PropTypes.arrayOf(
            React.PropTypes.shape({
              code: React.PropTypes.number.isRequired,
              equipPictUrl: React.PropTypes.string.isRequired, //URL картинки товара
              equipText: React.PropTypes.string.isRequired, //название товара
              prise: React.PropTypes.string.isRequired, //цена товара
              quantity: React.PropTypes.number.isRequired, //количество товара
            })
        ),
    },

    getInitialState: function() {
        return { 
          selectedGoodsItemCode: null,
          goodsList: this.props.goods,
        };
    },

    goodsItemSelected: function(code) {
        this.setState( {selectedGoodsItemCode:code} );
    },

    goodsItemDeleted: function(code) {
        this.setState( {selectedGoodsItemCode:code}, this.deleteItem);
    },

    deleteItem: function(code) {
        var isconfirmed = this.props.confirmFunc();
        if (isconfirmed) {
            var filteredGoodsList = this.state.goodsList.filter(item => item.code !== this.state.selectedGoodsItemCode);
            this.setState({goodsList: filteredGoodsList});
        }
    },
  
    render: function() {

      var colomnNamesCode = [];
      this.props.colomnName.forEach((item)=> {
          var colomnNameCode =        
             React.DOM.th({key:item.code, className:'ColomnName'}, item.name,
            );
            colomnNamesCode.push(colomnNameCode);
        }); 

      var goodsCode = [];
      this.state.goodsList.forEach((item)=> {
          var goodsUnitCode = 
             React.createElement(GoodsItem, {key:item.code, src:`${item.equipPictUrl}`,
             equipText: item.equipText, prise: item.prise, quantity: item.quantity, code:item.code,
             cbSelected:this.goodsItemSelected, selectedGoodsItemCode: this.state.selectedGoodsItemCode,
             cbDeleted:this.goodsItemDeleted,
            });
            goodsCode.push(goodsUnitCode);
        });

      return React.DOM.table( {className:'GoodsTable'},
        React.DOM.caption( {className:'TableName'}, this.props.tableName ),
        React.DOM.thead( null,
          React.DOM.tr( null, colomnNamesCode,),
        ), 
        React.DOM.tbody( null, goodsCode ),
      );
    },
  });