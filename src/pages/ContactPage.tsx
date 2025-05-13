import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import ContactView from "../components/ContactView";
import type { Contact } from "../types";
import { deleteContact, getSavedContacts } from "../utils/storage";

export default function ContactPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Contact | null>(null);
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    dialogRef.current?.showModal();
  };

  const handleDialogClose = () => {
    dialogRef.current?.close();
  };

  const handleDialogConfirm = () => {
    if (contact) {
      deleteContact(contact.id);
      navigate("/contacts");
    }
    dialogRef.current?.close();
  };

  useEffect(() => () => dialogRef.current?.close(), []);

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
      <dialog ref={dialogRef} className="confirm-dialog">
        <div className="content">
          <p>{t("Are you sure you want to delete this contact?")}</p>
          <div className="actions">
            <Button onClick={handleDialogConfirm} size="medium">
              {t("Yes")}
            </Button>
            <Button
              onClick={handleDialogClose}
              size="medium"
              className="secondary"
            >
              {t("Cancel")}
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
}
