const Container = require('../../Container');
const { optionsSQLite2 } = require('./dataBasesConfig');

const messagesContainer = new Container(optionsSQLite2, 'messages');

const getMessages = async () => {
    const messages = await messagesContainer.getAll();
    return messages;
};

const saveMessages = async (message) => {
    const idSavedMessages = await messagesContainer.save(message);
    return idSavedMessages;
};

module.exports = {
    getMessages,
    saveMessages
}