import React, { Component } from 'react';
import uniqid from 'uniqid';

export default class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const { socket } = this.props;

        socket.on('UPDATE_USERS_LIST', users => {
            this.setState({ users });
        });
    }

    render() {

        const users = this.state.users.map(user => {
            return <li className="users__user" key={uniqid()}>{user}</li>;
        });

        return (
            <div className="sidebar">
                <input id="users-online" type="checkbox" className="sidebar__checkbox" />
                <label className="sidebar__header" htmlFor="users-online">Users online</label>
                <div className="sidebar__users users">
                    <ul className="users__list">{users}</ul> 
                </div>
            </div>
        );
    }
};