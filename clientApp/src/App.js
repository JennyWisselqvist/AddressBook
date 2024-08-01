import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import Home from './components/Home';
import { fetchContacts, addContact, updateContact, deleteContact } from './api/contacts';

function App() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            try {
                const data = await fetchContacts();
                setContacts(data);
            } catch (error) {
                console.error('Error fetching contacts:', error);
            }
        };

        getContacts();
    }, []);

    const handleAddContact = async (newContact) => {
        try {
            const addedContact = await addContact(newContact);
            setContacts(prevContacts => [...prevContacts, addedContact]);
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    const handleUpdateContact = async (updatedContact) => {
        try {
            await updateContact(updatedContact.id, updatedContact);
            setContacts(prevContacts =>
                prevContacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact)
            );
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    const handleDeleteContact = async (id) => {
        try {
            await deleteContact(id);
            setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contacts" element={<ContactList contacts={contacts} onDeleteContact={handleDeleteContact} />} />
                        <Route path="/add-contact" element={<ContactForm onAddContact={handleAddContact} />} />
                        <Route path="/edit-contact/:id" element={<ContactForm onUpdateContact={handleUpdateContact} contacts={contacts} />} />
                    </Routes>
                </header>
            </div>
        </Router>
    );
}

export default App;
