import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Contact } from "../types";
import { getSavedContacts } from "../utils/storage";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Card from "../components/Card";

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
        <Card>
          <p>{t("No saved contacts yet")}</p>
          <Button as="a" href="/add-contact">
            {t("Add Contact")}
          </Button>
        </Card>
      ) : (
        <div className="contact-list">
          {contacts.map((contact) => (
            <Link
              to={`/contact/${contact.id}`}
              className="invisible-link"
              key={contact.id}
              aria-label={contact.name}
            >
              <div className="contact-card">
                <img src={contact.image} alt={contact.name} />
                <h3>{contact.name}</h3>
                <p>{contact.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
      <Button as="a" href="/add-contact" size="large" fullWidth>
        {t("Add Contact")}
      </Button>
    </>
  );
}
