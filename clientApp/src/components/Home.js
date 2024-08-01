import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Welcome to the Address Book</h1>
        <nav>
            <ul>
                <li><Link to="/contacts">View Contacts</Link></li>
                <li><Link to="/add-contact">Add New Contact</Link></li>
            </ul>
        </nav>
    </div>
);

export default Home;
