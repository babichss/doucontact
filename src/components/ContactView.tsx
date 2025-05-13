import type { Contact } from "../types";
import Card from "./Card";

export default function ContactView({ contact }: { contact: Contact }) {
  return (
    <Card>
      {contact.image ? (
        <img src={contact.image} alt={contact.name} className="avatar" />
      ) : null}

      <h2>{contact.name}</h2>

      {contact.title ? <p>{contact.title}</p> : null}

      <div className="column">
        {contact.links.filter(Boolean).map((link) => (
          <a href={link} target="_blank" rel="noopener noreferrer" key={link}>
            {link}
          </a>
        ))}
      </div>
    </Card>
  );
}
