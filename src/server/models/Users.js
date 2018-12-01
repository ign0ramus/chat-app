/*
 * Создает объект, хранящий всех онлайн пользователей
 */

class Users {
    constructor() {
        this._users = [];
    }

    addUser(user) {
        // возвращает добавленного пользователя
        this._users.push(user);
        return user;
    }

    removeUser(id) {
        // возвращает удаленный объект-пользователя или undefined, если его нет
        let user = this.getUser(id);

        if (user) {
            this._users = this._users.filter(user => user.id !== id);
        }
        return user;
    }

    getUser(id) {
        // возвращает объект пользователя по id
        return this._users.find(user => user.id === id);
    }
    
    getUsersList(room) {
        // возвращает массив строк-имен пользователей в комнате
        let filteredUsers = this._users.filter(user => user.room === room);
        let namesArray = filteredUsers.map(user => user.name);
        return namesArray;
    }
}

module.exports = { Users };