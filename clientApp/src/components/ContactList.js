import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactList = ({ contacts, onDeleteContact }) => {
    const [openContactId, setOpenContactId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleDetails = (id) => {
        setOpenContactId(openContactId === id ? null : id);
    };

    const handleSearchInput = (e) => {
        setSearchTerm(e.target.value);
    };

    const sortedContacts = contacts.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    const filteredContacts = sortedContacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="headerContainer">
                <Link to="/" className="backButtonLink">
                    <button className="backButton">Back</button>
                </Link>
                <h1 className="headerText">Contact List</h1>
            </div>
            <div className="searchBarContainer">
                <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={handleSearchInput}
                    className="searchBar"
                />
            </div>
            <ul className="contact-list">
                {filteredContacts.map(contact => (
                    <li key={contact.id} className={`contact-item ${openContactId === contact.id ? 'open' : ''}`}>
                        <div className="contact-header" onClick={() => toggleDetails(contact.id)}>
                            <span className="contact-name">{contact.name} {contact.lastName}</span>
                            <div className="contact-actions">
                                <Link to={`/edit-contact/${contact.id}`} className="UpdateBtn">
                                    <i className="bi bi-pencil"></i>
                                </Link>
                                <button className="DeleteBtn" onClick={() => {onDeleteContact(contact.id); }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div id={`contact-details-${contact.id}`} className="contact-details">
                            <p>Email: {contact.email}</p>
                            <p>Phone: {contact.phone}</p>
                            <p>Address: {contact.address}</p>
                            <p>City: {contact.city}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ContactList;
