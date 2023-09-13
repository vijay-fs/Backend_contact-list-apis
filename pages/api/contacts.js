import connectDB from "../../db";
import Contact from "../../models/Contact";

connectDB(); // Connect to MongoDB

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const contacts = await Contact.find({}); // Fetch all contacts from MongoDB

      return res.status(200).json(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
