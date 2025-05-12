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
          {Array.from({ length: 50 }).map((_, index) => (
            <div className="contact-card" key={index}>
              <img
                src={contacts[index % contacts.length].image}
                alt={contacts[index % contacts.length].name}
              />
              <Link to={`/contact/${contacts[index % contacts.length].id}`}>
                <h2>{contacts[index % contacts.length].name}</h2>
              </Link>
              <p>{contacts[index % contacts.length].title}</p>
            </div>
          ))}

          {contacts.map((contact) => (
            <div className="contact-card" key={contact.id}>
              <img src={contact.image} alt={contact.name} />

              <Link to={`/contact/${contact.id}`}>
                <h2>{contact.name}</h2>
              </Link>
              <p>{contact.title}</p>
            </div>
          ))}
        </div>
      )}
      <Link to="/add-contact" className="button fab">
        {t("Add Contact")}
      </Link>
    </>
  );
}
