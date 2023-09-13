import connectDB from "../../../db";
import Contact from "../../../models/Contact";

connectDB(); // Connect to MongoDB
// Define the absolute file path to contacts.json

export default async function handler(req, res) {
  console.log("API route started"); // Debug statement

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const contact = await Contact.findById(id);

      if (!contact) {
        console.log("Contact not found"); // Debug statement
        return res.status(404).json({ message: "Contact not found" });
      }

      console.log("Contact found:", contact); // Debug statement
      return res.status(200).json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "PUT" || req.method === "PATCH") {
    const { name, phone, email, profilePicture } = req.body;

    try {
      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        {
          name,
          phone,
          email,
          profilePicture,
        },
        { new: true } // Return the updated document
      );

      if (!updatedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json(updatedContact);
    } catch (error) {
      console.error("Error updating contact:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedContact = await Contact.findByIdAndRemove(id);

      if (!deletedContact) {
        return res.status(404).json({ message: "Contact not found" });
      }

      return res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
