const ContainerFs = require('../containers/containerFs');
const { normalizeMessages } = require('../utils/normalize');

const messagesContainer = new ContainerFs('./data/messages.json');

const getMessages = async () => {
    const messages = await messagesContainer.getAll();
    return normalizeMessages({id: 'mensajes', messages});
};

const saveMessages = async (message) => {
    const savedMessages = await messagesContainer.save(message);
    return savedMessages;
};

module.exports = {
    getMessages,
    saveMessages
}