import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const ContactForm = ({ onAddContact, onUpdateContact, contacts }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [contact, setContact] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    });

    useEffect(() => {
        if (isEditing && contacts) {
            const contactToEdit = contacts.find(e => e.id === parseInt(id));
            if (contactToEdit) {
                setContact(contactToEdit);
            }
        }
    }, [id, contacts, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onUpdateContact(contact);
        } else {
            onAddContact(contact);
        }
        navigate('/contacts');
    };

    return (
        <div>
            <div className="headerContainer">
                <Link to="/" className="backButtonLink">
                    <button className="backButton">Back</button>
                </Link>
                <h1 className="headerText">{isEditing ? 'Edit Contact' : 'Add Contact'}</h1>
            </div>
            <div className="contactForm">
                <form onSubmit={handleSubmit}>
                    <input name="name" value={contact.name} onChange={handleChange} placeholder="Name" required />
                    <input name="lastName" value={contact.lastName} onChange={handleChange} placeholder="Last Name" required />
                    <input name="email" value={contact.email} onChange={handleChange} placeholder="Email" />
                    <input name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required />
                    <input name="address" value={contact.address} onChange={handleChange} placeholder="Address" />
                    <input name="city" value={contact.city} onChange={handleChange} placeholder="City" />
                    <button type="submit">{isEditing ? 'Update Contact' : 'Add Contact'}</button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
