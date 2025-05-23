import type { Contact } from "../types";
import Card from "./Card";

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
    className: [className, "stack-md centered contact-view"].join(" "),
  };
}

export default function ContactView({ contact, className }: ContactViewProps) {
  const {
    name,
    title,
    image,
    links,
    className: cardClassName,
  } = useContactViewState({ contact, className });

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
    </Card>
  );
}
