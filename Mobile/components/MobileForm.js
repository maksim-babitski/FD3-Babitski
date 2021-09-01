import React from 'react';
import PropTypes from 'prop-types';

import './MobileForm.css';
import {companyEvents} from './events';

class MobileForm extends React.PureComponent {

    static propTypes = {
        info:PropTypes.shape({
            id: PropTypes.number.isRequired,
            lastName:PropTypes.string.isRequired,
            name:PropTypes.string.isRequired,
            middleName:PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
        mode: PropTypes.number.isRequired
    };

    state = {
        info: this.props.info,
    };

    newLastNameRef = null;
    newNameRef =null;
    newMiddleNameRef= null;
    newBalanceRef = null;

    setNewLastNameRef = (ref) => {
        this.newLastNameRef=ref;
    };

    setNewNameRef = (ref) => {
        this.newNameRef=ref;
    };

    setNewMiddleNameRef = (ref) => {
        this.newMiddleNameRef=ref;
    };

    setNewBalanceRef = (ref) => {
        this.newBalanceRef=ref;
    };

    saveClient = () => {
        if ( this.newLastNameRef && this.newNameRef && this.newMiddleNameRef && this.newBalanceRef) {
            let newLastName=this.newLastNameRef.value;
            let newName=this.newNameRef.value;
            let newMiddleName=this.newMiddleNameRef.value;
            let newBalance=parseFloat(this.newBalanceRef.value);

            let newClient = {id: this.props.info.id, lastName: newLastName, name: newName, middleName: newMiddleName, balance: newBalance};
            companyEvents.emit('EsaveClient', newClient);
        }
    };

    cancel = () => {
        companyEvents.emit('ECancel');
    };

    render() {

        console.log('MobileForm render');

        return (
            <div key={this.props.info.id} className='MobileForm' hidden={this.props.mode==0}>

                <h3>{this.props.mode==2?"Добавить нового клиента":"Редактировать клиента"}</h3>
                <span>ID: {this.props.info.id}</span>

                <label className='label'>
                    <span className="inputName">Фамилия</span>
                    <input type="text" name="lastName" ref={this.setNewLastNameRef} defaultValue={this.props.info.lastName}/>
                </label>

                <label className='label'>
                    <span className="inputName">Имя</span>
                    <input type="text" name="name" ref={this.setNewNameRef} defaultValue={this.props.info.name}/>
                </label>

                <label className='label'>
                    <span className="inputName">Отчество</span>
                    <input type="text" name="middle_name" ref={this.setNewMiddleNameRef} defaultValue={this.props.info.middleName}/>
                </label>

                <label className='label'>
                    <span className="inputName">Баланс</span>
                    <input type="text" name="balance" ref={this.setNewBalanceRef} defaultValue={this.props.info.balance}/>
                </label>

                <input type="button" value={this.props.mode==2?"Добвить":"Сохранить"} onClick={this.saveClient}/>
                <input type="button" value="Отменить" onClick={this.cancel}/>

            </div>
        )
    }
}

export default MobileForm;