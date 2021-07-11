var Filter = React.createClass({

    displayName: 'Filter',
  
    propTypes: {
      strings: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    },

    getInitialState: function() {
      return { 
        stringList: this.props.strings,
        isChecked: false,
        textInputValue: "",
      };
    },

    filterTextChanged: function(EO) {
      this.setState({textInputValue: EO.target.value}, this.modifyStringList);
    },

    checkBoxChanged: function(EO) {
      this.setState({isChecked: EO.target.checked}, this.modifyStringList);
    },

    modifyStringList: function() {
      var stringListCopy = this.props.strings.slice();
      var stringListFilterCopy = stringListCopy.filter(elem => elem.includes(this.state.textInputValue));

      if (this.state.isChecked) {
        stringListFilterCopy.sort();
      }

      this.setState({stringList: stringListFilterCopy});
    },

    reset: function() {
      this.setState({textInputValue: "", stringList: this.props.strings, isChecked: false});
    },
  
    render: function() {
  
      var stringListCode = this.state.stringList.map( (elem, index) =>
          React.DOM.option({key:index}, elem)
        );
      return React.DOM.div( {className:'Filter'},
        React.DOM.div( {className:'filterControl'},
            React.DOM.input( {className:'checkBox', type:'checkbox', name:'sort', checked: this.state.isChecked, onClick: this.checkBoxChanged} ),
            React.DOM.input( {className:'textInput', type:'text', name:'textforfilter', value: this.state.textInputValue, onChange:this.filterTextChanged} ),
            React.DOM.input( {type:'button',value:'reset', onClick: this.reset} ),
        ),
        React.DOM.div( null,
            React.DOM.select( {className:'stringList', multiple:'multiple', size:'4'}, stringListCode ),
        ),
      );
    },
  });