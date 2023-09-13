import fs from "fs";
import path from "path";

// Define the absolute file path to contacts.json
const contactsFilePath = path.join(process.cwd(), "contacts.json"); // Updated file path

// Function to read contacts from the JSON file
function readContactsFromFile() {
  try {
    const data = fs.readFileSync(contactsFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading contacts from file:", err);
    return { contacts: [] }; // Initialize an empty array if the file doesn't exist
  }
}

// Function to write contacts to the JSON file
function writeContactsToFile(contacts) {
  try {
    fs.writeFileSync(
      contactsFilePath,
      JSON.stringify(contacts, null, 2),
      "utf8"
    );
  } catch (err) {
    console.error("Error writing contacts to file:", err);
  }
}

export default function handler(req, res) {
  const { id } = req.query;
  const contactsData = readContactsFromFile(); // Read contacts from file

  const contactIndex = contactsData.contacts.findIndex(
    (c) => c.id === Number(id)
  );

  if (contactIndex === -1) {
    res.status(404).json({ message: "Contact not found" });
    return;
  }

  if (req.method === "PUT" || req.method === "PATCH") {
    const { name, phone, email, profilePicture } = req.body;
    contactsData.contacts[contactIndex] = {
      ...contactsData.contacts[contactIndex],
      name,
      phone,
      email,
      profilePicture, // Store the Base64 encoded image
    };

    // Write the updated contact list to the file
    writeContactsToFile(contactsData);

    res.status(200).json(contactsData.contacts[contactIndex]);
    return;
  }

  if (req.method === "DELETE") {
    contactsData.contacts.splice(contactIndex, 1);
    res.status(200).json({ message: "Contact deleted successfully" });
    return;
  }

  if (req.method === "GET") {
    const { id } = req.query;

    if (id) {
      // Get a specific contact by ID
      const contact = contactsData.contacts.find((c) => c.id === Number(id));

      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json(contact);
    } else {
      // Get all contacts
      return res.status(200).json(contactsData.contacts);
    }
  }

  res.status(405).end(); // Method Not Allowed
}
