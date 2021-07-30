import React from 'react';
import PropTypes from 'prop-types';

import './CardEdit.css'

class CardEdit extends React.Component {

    static propTypes = {
        item: PropTypes.object.isRequired, //редактируемый элемент
        addMode: PropTypes.bool.isRequired, //режим карточки редактирования
        cbSaveItem: PropTypes.func.isRequired,
        cbCancel: PropTypes.func.isRequired,
        cbEditingNow: PropTypes.func.isRequired, //элемнт в данный момент редактируется
    }

    state = {
        equipName: this.props.item.equipName,
        equipPictUrl: this.props.item.equipPictUrl,
        prise: this.props.item.prise,
        quantity: this.props.item.quantity,
        equipNameError: this.props.addMode, //в режиме добавления нового элемнта
        equipPictUrlError: this.props.addMode, //сразу показываем сообщения об ошибках (рекомендации заполнения)
        priseError: this.props.addMode,
        quantityError: this.props.addMode,
    }

    equipNameChange = (event) => {
        this.props.cbEditingNow();
        this.setState( {equipName: event.target.value} );
    }

    equipPictUrlChange = (EO) => {
        this.props.cbEditingNow();
        this.setState( {equipPictUrl:EO.target.value} );
    }

    priseChange = (EO) => {
        this.props.cbEditingNow();
        this.setState( {prise:EO.target.value} );
    }

    quantityChange = (EO) => {
        this.props.cbEditingNow();
        this.setState( {quantity:EO.target.value} );
    }

    equipNameValid = (EO) => {
        if(EO.target.value=='') {
            this.setState( {equipNameError:true} ); 
        } else {
            this.setState( {equipNameError:false} ); 
        }
    }

    equipPictUrlValid = (EO) => {
        if(EO.target.value=='') {
            this.setState( {equipPictUrlError:true} ); 
        } else {
            this.setState( {equipPictUrlError:false} ); 
        }
    }

    priseValid = (EO) => {
        if(EO.target.value=='') {
            this.setState( {priseError:true} ); 
        } else {
            this.setState( {priseError:false} ); 
        }
    }

    quantityValid = (EO) => {
        var quantityValue = parseInt(EO.target.value.trim());
        if(!quantityValue || isNaN(quantityValue) || quantityValue < 0 || quantityValue % 1 !== 0) {
            this.setState( {quantityError:true} ); 
        } else {
            this.setState( {quantityError:false} ); 
        }
    }

    saveItem = () => {
        this.props.cbSaveItem({
            ...this.props.item,
            equipName: this.state.equipName,
            equipPictUrl: this.state.equipPictUrl,
            prise: this.state.prise,
            quantity: parseInt(this.state.quantity)
        });    
    }

    componentDidUpdate(prevProps) { //обновляем state при получении новых props
        if (this.props.item !== prevProps.item) {
            if (!this.props.addMode) {
                this.setState( {equipName:this.props.item.equipName} );
                this.setState( {equipPictUrl:this.props.item.equipPictUrl} );
                this.setState( {prise:this.props.item.prise} );
                this.setState( {quantity:this.props.item.quantity} );
            }      
        }
    }

    render() {

        return (
            <div className='CardEdit'>

                <h3>{this.props.addMode?"Add new product":"Edit Existing Product"}</h3>

                <span>ID: {this.props.item.code}</span>
                <label className='label'>
                    <span className="inputName">Name</span>
                    <input type="text" name="equipName" onChange={this.equipNameChange} onBlur={this.equipNameValid} value={this.state.equipName}/>
                    <span className='error' hidden={!this.state.equipNameError}>Please, fill the field.</span>
                </label>
                <label className='label'>
                    <span className="inputName">URL</span>
                    <input type="text" name="equipPictUrl" onChange={this.equipPictUrlChange} onBlur={this.equipPictUrlValid} value={this.state.equipPictUrl}/>
                    <span className='error' hidden={!this.state.equipPictUrlError}>Please, fill the field. Value must be a valid image URL.</span>
                </label>
                <label className='label'>
                    <span className="inputName">Price</span>
                    <input type="text" name="prise" onChange={this.priseChange} onBlur={this.priseValid} value={this.state.prise}/>
                    <span className='error' hidden={!this.state.priseError}>Please, fill the field.</span>
                </label>
                <label className='label'>
                    <span className="inputName">Quantity</span>
                    <input type="number" name="quantity" onChange={this.quantityChange} onBlur={this.quantityValid} value={this.state.quantity}/>
                    <span className='error' hidden={!this.state.quantityError}>Please, fill the field. Value must be a rational number greater than 0.</span>
                </label>

                <input type="button" value={this.props.addMode?"Add":"Save"} onClick={this.saveItem}
                       disabled={(this.state.equipNameError || this.state.equipPictUrlError || this.state.priseError || this.state.quantityError)}/>
                <input type="button" value="Cancel" onClick={this.props.cbCancel}/>
            </div>
        )
    }
}

export default CardEdit;