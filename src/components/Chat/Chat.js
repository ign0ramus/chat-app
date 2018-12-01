import React from 'react';

import Sidebar from './Sidebar';
import Messages from './Messages/Messages';

const chat = (props) => {

    const submitHandler = (event) => {
        event.preventDefault();
        const input = event.target.querySelector('input');
        const text = input.value;
        const { socket } = props;

        socket.emit('CREATE_MESSAGE', text, () => {
            input.value = '';
        });
    };
    
        const { user, socket } = props;
        // меняет хэш на номер комнаты, чтобы было возможно пригласить пользователей в данную комнату
        window.location.hash = user.room;
    
        return (
            <div className="container">
                <Sidebar 
                        socket={socket}
                        user={user} />
                <div className="chat">
                    <Messages
                            socket={socket}/>
                    <div className="chat__footer">
                        <form className="chat__form" onSubmit={submitHandler}>
                            <input
                                className="chat__input"
                                type="text" 
                                placeholder="Message" 
                                autoFocus />
                            <button className="chat__button button">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        );
}

export default chat;
