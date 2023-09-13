// models/Contact.js

import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  profilePicture: String,
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
