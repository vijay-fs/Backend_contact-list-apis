import contactsData from "../../contacts.json";

export default function handler(req, res) {
  res.status(200).json(contactsData.contacts);
}
