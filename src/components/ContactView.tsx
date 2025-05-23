import { useEffect, useState } from "react";
import type { Contact } from "../types";
import Card from "./Card";
import { saveContact } from "../utils/storage";

type ContactViewProps = {
  contact: Contact;
  className?: string;
};

function useContactViewState({ contact, className }: ContactViewProps) {
  return {
    name: contact.name,
    title: contact.title,
    image: contact.image,
    links: contact.links.filter(Boolean),
    note: contact.note ?? "",
    className: [className, "stack-md centered contact-view"].join(" "),
  };
}

export default function ContactView({ contact, className }: ContactViewProps) {
  const {
    name,
    title,
    image,
    links,
    note,
    className: cardClassName,
  } = useContactViewState({ contact, className });

  const [editedNote, setEditedNote] = useState(note);

  // Auto-save note changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (editedNote !== note) {
        const updatedContact = {
          ...contact,
          note: editedNote,
        };
        saveContact(updatedContact);
      }
    }, 200); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [editedNote, contact, note]);

  return (
    <Card className={cardClassName}>
      {image ? <img src={image} alt={name} className="avatar" /> : null}

      <h4 className="text-lg">{name}</h4>
      <hr />

      {title ? <p className="contact-title">{title}</p> : null}

      <hr />

      {links.length > 0 ? (
        <div className="stack-sm centered">
          {links.map((link, i) => (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              key={`${i}:$link`}
              className="truncate"
            >
              {link}
            </a>
          ))}
        </div>
      ) : null}

      <hr />

      <div className="stack-xs">
        <label>Примітка</label>
        <textarea
          value={editedNote}
          onChange={(e) => setEditedNote(e.target.value)}
          placeholder="Додайте примітку..."
          className="note-input"
          rows={3}
        />
      </div>
    </Card>
  );
}
