import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Contact } from "../types";
import { getMyProfile, getSavedContacts } from "../utils/storage";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Card from "../components/Card";

export default function Contacts() {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setContacts(getSavedContacts());
  }, []);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");
    if (from === "add" && !getMyProfile()) {
      dialogRef.current?.showModal();
    }
  }, []);

  const handleGoToProfile = () => {
    dialogRef.current?.close();
    navigate("/edit");
  };

  const handleCloseDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <section className="content">
        <h2>{t("Saved Contacts")}</h2>

        {contacts.length === 0 ? (
          <Card>
            <p>{t("No saved contacts yet")}</p>
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
      </section>
      <dialog ref={dialogRef} className="confirm-dialog">
        <div className="column">
          <p>{t("Contact saved. Do you want to create your own profile?")}</p>
          <div className="actions">
            <Button onClick={handleCloseDialog} size="medium">
              {t("Cancel")}
            </Button>
            <Button onClick={handleGoToProfile} size="medium">
              {t("Go to Profile")}
            </Button>
          </div>
        </div>
      </dialog>
      <Button as="a" href="/add-contact" size="large" fullWidth>
        {t("Add Contact")}
      </Button>
    </>
  );
}
