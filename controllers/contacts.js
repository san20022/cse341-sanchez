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

const createContact = async (req, res) => {
    try {
        const database = getDatabase();

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await database
            .collection('contacts')
            .insertOne(contact);

        res.status(201).json({
            insertedId: response.insertedId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while creating the contact.'
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const database = getDatabase();
        const contactId = req.params.id;

        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        await database
            .collection('contacts')
            .replaceOne(
                { _id: new ObjectId(contactId) },
                contact
            );

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while updating the contact.'
        });
    }
};

const deleteContact = async (req, res) => {
    try {
        const database = getDatabase();
        const contactId = req.params.id;

        await database
            .collection('contacts')
            .deleteOne({
                _id: new ObjectId(contactId)
            });

        res.status(200).json({
            message: 'Contact deleted successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'An error occurred while deleting the contact.'
        });
    }
};

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};