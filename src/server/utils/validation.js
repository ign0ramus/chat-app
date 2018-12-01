/**
 * Возвращает true только для непустых строк
 *
 * @param {string} str Строка для проверки.
 * @return {boolean} 
 */
const isRealString = (str) => {
    return typeof str === 'string' && str.trim();
};

module.exports = { isRealString };