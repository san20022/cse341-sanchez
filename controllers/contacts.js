const { ObjectId } = require('mongodb');
const { getDatabase } = require('../database');

const getAllContacts = async (req, res) => {
    try {
        const database = getDatabase();
        const contacts = await database
            .collection('contacts')
            .find()
            .toArray();

        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving contacts.' });
    }
};

const getSingleContact = async (req, res) => {
    try {
        const database = getDatabase();
        const contactId = req.query.id;

        const contact = await database
            .collection('contacts')
            .findOne({ _id: new ObjectId(contactId) });

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found.' });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving the contact.' });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact
};