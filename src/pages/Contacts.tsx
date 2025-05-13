import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Contact } from "../types";
import { getSavedContacts } from "../utils/storage";
import { useTranslation } from "react-i18next";

export default function Contacts() {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    setContacts(getSavedContacts());
  }, []);

  return (
    <>
      <h2>{t("Saved Contacts")}</h2>

      {contacts.length === 0 ? (
        <div className="card">
          <p>{t("No saved contacts yet")}</p>
          <Link to="/add-contact">{t("Add Contact")}</Link>
        </div>
      ) : (
        <div className="contact-list">
          {contacts.map((contact) => (
            <Link to={`/contact/${contact.id}`} className="invisible-link">
              <div className="contact-card" key={contact.id}>
                <img src={contact.image} alt={contact.name} />

                <h3>{contact.name}</h3>
                <p>{contact.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Link to="/add-contact" className="button big-button full-width">
        {t("Add Contact")}
      </Link>
    </>
  );
}
