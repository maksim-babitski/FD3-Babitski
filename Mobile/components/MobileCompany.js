import React from 'react';
import PropTypes from 'prop-types';

import MobileClient from './MobileClient';
import MobileForm from './MobileForm';

import './MobileCompany.css';

import {companyEvents} from './events';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        confirmFunc: PropTypes.func.isRequired,
        clients:PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                lastName:PropTypes.string.isRequired,
                name:PropTypes.string.isRequired,
                middleName:PropTypes.string.isRequired,
                balance: PropTypes.number.isRequired,
            })
        ),
    };

    state = {
        name: this.props.name, // company name
        clients: this.props.clients,
        currentId: null, // current (editable) clients id
        mode: 0, // 0-nothing, 1-edit, 2-add
        filterMode: 0, // 0-all, 1-activ, 2-blocked
        key: this.props.clients.length, //key for new client 
    };

    componentDidMount = () => {
        companyEvents.addListener('EeditClient',this.editClient);
        companyEvents.addListener('EdeleteClient',this.deleteClient);
        companyEvents.addListener('ECancel', this.cancel);
        companyEvents.addListener('EsaveClient', this.saveClient);
    };

    componentWillUnmount = () => {
        companyEvents.removeListener('EeditClient',this.editClient);
        companyEvents.removeListener('EdeleteClient',this.deleteClient);
        companyEvents.removeListener('ECancel', this.cancel);
        companyEvents.removeListener('EsaveClient', this.saveClient);
    };

    editClient = (id) => {
        this.setState({currentId: id, mode: 1});
    };

    deleteClient = (id) => {
        let isconfirmed = this.props.confirmFunc();
        if (isconfirmed) {
            var filteredClients = this.state.clients.filter(client => client.id !== id);
            this.setState({clients: filteredClients, mode: 0, currentId: null});
        }
    };

    saveClient = (newClient) => {
        let newClients = [...this.state.clients];
        if (this.state.mode==1) {
            newClients=this.state.clients.map((client)=>
                client.id==this.state.currentId? newClient:client
            );
        }

        if (this.state.mode==2) {
            newClients.push(newClient);
        }

        this.setState({clients: newClients, mode: 0});
    };

    cancel = () => {
        this.setState({mode: 0});
    };

    addClient = () => {
        this.setState({mode: 2, key: ++this.state.key});
    };

    setName1 = () => {
        this.setState({name:'МТС'});
    };

    setName2 = () => {
        this.setState({name:'Velcom'});
    };

    filterAll = () => {
        this.setState({filterMode: 0});
    };

    filterActive = () => {
        this.setState({filterMode: 1});
    };

    filterBlocked = () => {
        this.setState({filterMode: 2});
    };

    render() {

        console.log("MobileCompany render");

        let filteredClients = this.state.clients.filter((client) => {
            if (this.state.filterMode == 0) {
                return true;
            }
            if (this.state.filterMode == 1) {
                return client.balance > 0;
            }
            if (this.state.filterMode == 2) {
                return client.balance < 0;
            }
        });

        let clientsCode = filteredClients.map( client =>
            <MobileClient key={client.id} info={client} />
        );

        let client = this.state.clients.find(elem => elem.id == this.state.currentId);
        let addedClient = {id: this.state.key, lastName: '', name: '', middleName: '', balance: 0};

        return (
            <div className='MobileCompany'>
                <input type="button" value="МТС" onClick={this.setName1} />
                <input type="button" value="Velcom" onClick={this.setName2} />
                <div>Компания &laquo;{this.state.name}&raquo;</div>
                <div className="FilterBlock">
                    <input type="button" value="Все" onClick={this.filterAll}/>
                    <input type="button" value="Активные" onClick={this.filterActive}/>
                    <input type="button" value="Заблокированные" onClick={this.filterBlocked}/>
                </div>
                <table className='ClientsTable'>
                    <thead>
                    <tr className='header'>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Баланс</th>
                        <th>Статус</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                    </thead>
                    <tbody>{clientsCode}</tbody>
                </table>
                <input type="button" value="Добавь клиента" onClick={this.addClient} hidden={this.state.mode>0}/>
                {
                    (this.state.mode == 1 || this.state.mode == 2) &&
                    <MobileForm info={this.state.mode==1? client : addedClient} mode={this.state.mode}/>
                }
            </div>
        )
    }
}

export default MobileCompany;