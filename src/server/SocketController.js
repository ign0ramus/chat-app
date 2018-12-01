const { io } = require('./server');

const { isRealString } = require('./utils/validation');
const { generateMessage } = require('./utils/generateMessage');
const { User } = require('./models/User');
const { Users } = require('./models/Users');

const usersOnline = new Users();

const SocketController = socket => {

    // проверяет никнейм пользователя и создает объект пользователя
    socket.on('VERIFY_USER', (params, callback) => {
        if (!isRealString(params.name)) {
            callback('Invalid nickname!');
        } else {
            const user = new User(params.name, socket.id, params.room);
            callback(null, user);
        }
    });

    // соединяет нового пользователя с комнатой чата
    socket.on('USER_CONNECTED', (user) => {
        socket.join(user.room);
        usersOnline.removeUser(user.id);
        usersOnline.addUser(user);

        io.to(user.room).emit('UPDATE_USERS_LIST', usersOnline.getUsersList(user.room));

        socket.emit('NEW_MESSAGE', generateMessage({text: 'Weclome to the chat!'}));

        socket.broadcast.to(user.room).emit('NEW_MESSAGE', generateMessage({
            text: `${user.name} has joined!`
        }));
    });

    // проверяет сообщение и создает объект сообщения
    socket.on('CREATE_MESSAGE', (text, callback) => {
        const user = usersOnline.getUser(socket.id);
        if (user && isRealString(text)) {
            const params = {name: user.name, text};
            io.to(user.room).emit('NEW_MESSAGE', generateMessage(params));
        }
        callback();
    });

    // обновляет список пользователей при их отключении
    socket.on('disconnect', () => {
        const user = usersOnline.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('UPDATE_USERS_LIST', usersOnline.getUsersList(user.room));
            io.to(user.room).emit('NEW_MESSAGE', generateMessage({text: `${user.name} has left.`}))
        }
    });
};  

module.exports = { SocketController };