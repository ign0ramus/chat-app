const moment = require('moment');

/**
 * Возвращает объект со свойствами аргумента и свойством - меткой времени
 *
 * @param {object} params Объект с произвольным количеством свойств
 * @return {object} 
 */
const generateMessage = (params) => {
    return {
        ...params,
        time: moment().valueOf()
    };
}

module.exports = { generateMessage };