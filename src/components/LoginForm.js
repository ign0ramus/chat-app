import React from 'react';

const LoginForm = (props) => {

    const setUser = (error, user) => {
        if (error) {
            alert(error);
        } else {
            props.setUser(user);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = event.target.querySelector('input').value;
        /* Если room не пустая, значит пользователь должен присоединиться к комнате указанной в ссылке, иначе к новому чату */
        const room = window.location.hash.slice(1);
        const params = {name, room}

        const { socket } = props;
        socket.emit('VERIFY_USER', params, setUser);
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <div className="form__field">
                    <h3 className="heading-3">Join Chat</h3>
                </div>
            <div className="form__field">
                <label className="form__label" htmlFor="nickname">Nickname</label>
                <input
                    className="form__input"
                    type="text" 
                    id="nickname" 
                    placeholder="Enter your nickname"
                    required
                    autoFocus />
            </div>
            <div className="form__field">
                <button className="form__button button">Join</button>
            </div>
            </form>
        </div>
    );
}

export default LoginForm;
