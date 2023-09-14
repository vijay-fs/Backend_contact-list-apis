import applyCors from "../../middleware/cors";
import connectDB from "../../db";
import Contact from "../../models/Contact";

// Connect to MongoDB
connectDB();

export default async function handler(req, res) {
  applyCors(req, res);

  if (req.method === "POST") {
    try {
      const { name, phone, email, profilePicture } = req.body;

      const contact = new Contact({
        name,
        phone,
        email,
        profilePicture,
      });

      await contact.save();

      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ error: "Error creating contact" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
