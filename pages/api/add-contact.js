// pages/api/add-contact.js
import fs from "fs";
import contactsData from "../../contacts.json";
import applyCors from "../../middleware/cors";
export default function handler(req, res) {
  applyCors(req, res);

  if (req.method === "POST") {
    const newContact = req.body;

    // Generate a unique ID for the new contact (e.g., increment the last ID)
    newContact.id = contactsData.contacts.length + 1;
    // Define the desired order of properties
    const orderedProperties = [
      "id",
      "name",
      "phone",
      "email",
      "profilePicture",
    ];

    // Create a new object with properties in the desired order
    const orderedContact = {};
    for (const prop of orderedProperties) {
      orderedContact[prop] = newContact[prop];
    }
    // Add the new contact to the JSON data
    contactsData.contacts.push(orderedContact);

    // Write the updated data back to the JSON file
    fs.writeFileSync("contacts.json", JSON.stringify(contactsData, null, 2));

    res.status(201).json(orderedContact);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
