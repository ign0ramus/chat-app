const uniqid = require('uniqid');

/**
 * Создает объект пользователя
 *
 * @param {string} name Имя пользователя
 * @param {number} id ID пользователя = socket.id
 * @param {string} room имя комнаты, если пользователь перешел по ссылке, то он получает * имя комнаты из ссылки, иначе получает свое уникальное имя комнаты
 */
class User {
    constructor(name = 'anonymous', id, room) {
        this.name = name;
        this.id = id;
        this.room = room || uniqid();
    }
};

module.exports = { User };