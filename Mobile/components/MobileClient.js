import React from 'react';
import PropTypes from 'prop-types';

import './MobileClient.css';
import {companyEvents} from './events';

class MobileClient extends React.PureComponent {

    static propTypes = {
        info:PropTypes.shape({
            id: PropTypes.number.isRequired,
            lastName:PropTypes.string.isRequired,
            name:PropTypes.string.isRequired,
            middleName:PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
        }),
    };

    state = {
        info: this.props.info
    };

    editClient = () => {
        companyEvents.emit("EeditClient",this.props.info.id);
    };

    deleteClient = () => {
        companyEvents.emit("EdeleteClient",this.props.info.id);
    };

    render() {

        console.log("MobileClient id="+this.state.info.id+" render");

        return (
            <tr className='MobileClient'>
                <td>{this.props.info.lastName}</td>
                <td>{this.props.info.name}</td>
                <td>{this.props.info.middleName}</td>
                <td>{this.props.info.balance}</td>
                <td style={{background: this.props.info.balance>0?"green":"red"}}>{this.props.info.balance>0? "active":"blocked"}</td>
                <td>
                    <input type='button' value='Редактировать' onClick={this.editClient} />
                </td>
                <td>
                    <input type='button' value='Удалить' onClick={this.deleteClient} />
                </td>
            </tr>
        );

    }
}

export default MobileClient;