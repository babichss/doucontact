import type { Contact } from "../types";

export default function ContactView({ contact }: { contact: Contact }) {
  return (
    <div className="card">
      {contact.image ? (
        <img src={contact.image} alt={contact.name} className="avatar" />
      ) : null}
      <h2>{contact.name}</h2>
      <p>{contact.title}</p>

      <div className="contact-links">
        {contact.links.map((link) => (
          <a href={link} target="_blank" rel="noopener noreferrer" key={link}>
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
