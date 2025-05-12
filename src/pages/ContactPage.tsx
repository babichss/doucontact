import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Contact } from "../types";
import { deleteContact, getSavedContacts } from "../utils/storage";
import ContactView from "../components/ContactView";

export default function ContactPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const contacts = getSavedContacts();
    const foundContact = contacts.find((c) => c.id === id);
    if (foundContact) {
      setContact(foundContact);
    } else {
      navigate("/contacts");
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (
      contact &&
      window.confirm("Are you sure you want to delete this contact?")
    ) {
      deleteContact(contact.id);
      navigate("/contacts");
    }
  };

  if (!contact) {
    return null;
  }

  return (
    <div className="container">
      <ContactView contact={contact} />
      <footer>
        <button onClick={handleDelete}>Delete Contact</button>
      </footer>
    </div>
  );
}
