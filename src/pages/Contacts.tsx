import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { Contact } from "../types";
import { getMyProfile, getSavedContacts } from "../utils/storage";

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
    void navigate("/edit");
  };

  const handleCloseDialog = () => {
    dialogRef.current?.close();
  };

  return (
    <div className="stack-lg">
      <h2>{t("Saved Contacts")}</h2>

      {contacts.length === 0 ? (
        <p>{t("No saved contacts yet")}</p>
      ) : (
        <div className="stack-md contacts-list">
          {contacts.map((contact, i) => (
            <Fragment key={contact.id}>
              {i > 0 && <hr />}
              <Link
                to={`/contact/${contact.id}`}
                className="invisible-link"
                aria-label={contact.name}
              >
                <div className="contact-card">
                  <img
                    src={contact.image || "/nouserpic.webp"}
                    className="avatar small"
                    alt={contact.name}
                  />
                  <h4>{contact.name}</h4>
                  {contact.title ? (
                    <p className="contact-title">{contact.title}</p>
                  ) : null}
                </div>
              </Link>
            </Fragment>
          ))}
        </div>
      )}

      <dialog ref={dialogRef} className="confirm-dialog">
        <div className="stack-md">
          <h3>Картку збережено!</h3>
          <p>
            Бажаєте створити власну картку? Ви можете зробити це зараз або
            пізніше.
          </p>
          <div className="stack-md">
            <Button onClick={handleGoToProfile} size="small">
              Створити власну картку
            </Button>
            <NavLink to="/" onClick={handleCloseDialog}>
              Відкласти на потім
            </NavLink>
          </div>
        </div>
      </dialog>
      <Button as="a" href="/add-contact" size="large" className="fab">
        {t("Add Contact")}
      </Button>
    </div>
  );
}
