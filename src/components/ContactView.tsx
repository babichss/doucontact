import type { Contact } from "../types";
import Card from "./Card";

export default function ContactView({ contact }: { contact: Contact }) {
  return (
    <Card className="stack-md centered">
      {contact.image ? (
        <img src={contact.image} alt={contact.name} className="avatar" />
      ) : null}

      <div className="stack-sm centered">
        <h4>{contact.name}</h4>

        {contact.title ? (
          <p className="contact-title" style={{ textAlign: "center" }}>
            {contact.title}
          </p>
        ) : null}
      </div>

      <div className="stack-sm centered">
        {contact.links.filter(Boolean).map((link, i) => (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            key={`${i}:$link}`}
          >
            {link}
          </a>
        ))}
      </div>
    </Card>
  );
}
