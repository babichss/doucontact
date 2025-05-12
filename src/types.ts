export type Contact = {
  id: string;
  name: string;
  title: string;
  image: string;
  links: string[];
}

export type MyProfile = Omit<Contact, 'id'>; 