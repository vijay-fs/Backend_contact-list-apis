// pages/index.js
import React, { useState, useEffect } from "react";

function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("/api/contacts")
      .then((response) => response.json())
      .then((data) => setContacts(data));
  }, []);

  const addContact = async () => {
    const response = await fetch("/api/add-contact", {
      method: "POST",
      body: JSON.stringify({
        name: "New Contact",
        phone: "123-456-7890",
        email: "",
        profilePicture: "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newContact = await response.json();
    setContacts([...contacts, newContact]);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold underline mb-4">Contact List</h1>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300"
            >
              <img
                src={`data:image/jpeg;base64,${contact.profilePicture}`}
                alt={`Profile of ${contact.name}`}
                width={100}
                className="rounded-full mx-auto"
              />
              <p className="text-lg font-semibold mt-2">{contact.name}</p>
              <p className="text-gray-600 mt-1">Phone: {contact.phone}</p>
              <p className="text-gray-600">Email: {contact.email}</p>
            </li>
          ))}
        </ul>
        <button onClick={addContact}>Add Contact</button>
      </div>
    </>
  );
}

export default Home;
