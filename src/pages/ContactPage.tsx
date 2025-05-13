import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Contact } from "../types";
import { deleteContact, getSavedContacts } from "../utils/storage";
import ContactView from "../components/ContactView";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";

export default function ContactPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const { t } = useTranslation();

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
      window.confirm(t("Are you sure you want to delete this contact?"))
    ) {
      deleteContact(contact.id);
      navigate("/contacts");
    }
  };

  if (!contact) {
    return null;
  }

  return (
    <>
      <section className="content">
        <ContactView contact={contact} />
        <footer>
          <Button onClick={handleDelete} size="large" fullWidth>
            {t("Delete Contact")}
          </Button>
        </footer>
      </section>
    </>
  );
}
