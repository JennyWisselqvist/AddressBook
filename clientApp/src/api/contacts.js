export const fetchContacts = async () => {
    const response = await fetch('/api/contacts');
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return response.json();
};

export const addContact = async (contact) => {
    const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    if (!response.ok) {
        throw new Error('Failed to add contact');
    }
    return response.json();
};

export const updateContact = async (id, contact) => {
    const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    if (!response.ok) {
        throw new Error('Failed to update contact');
    }
    return response.json();
};

export const deleteContact = async (id) => {
    const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
};
