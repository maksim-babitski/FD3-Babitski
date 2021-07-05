var GoodsTable = React.createClass({

    displayName: 'GoodsTable',
  
    getDefaultProps: function() {
      return {tableName: "name of shop"}
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
      this.props.goods.forEach((item)=> {
          var goodsUnitCode =        
             React.DOM.tr({key:item.code},
               React.DOM.td({className:'Equipment'},
                 React.DOM.img({className:'EquipPict', src:`${item.equipPictUrl}`}),
                 React.DOM.span({className:'EquipText'}, item.equipText),
                ),
               React.DOM.td({className:'Prise'}, item.prise),
               React.DOM.td({className:'Quantity'}, item.quantity),
            );
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