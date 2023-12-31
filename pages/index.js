// pages/index.js
import React, { useState, useEffect } from "react";

function Home() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Contact List</h1>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact) => (
            <li
              key={contact._id} // Use `_id` as the unique key
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
      </div>
    </>
  );
}

export default Home;
