import type { Contact, MyProfile } from '../types';

const MY_PROFILE_KEY = 'myProfile';
const SAVED_CONTACTS_KEY = 'savedContacts';

export const getMyProfile = (): MyProfile | null => {
  const profile = localStorage.getItem(MY_PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
};

export const saveMyProfile = (profile: MyProfile): void => {
  localStorage.setItem(MY_PROFILE_KEY, JSON.stringify(profile));
};

export const getSavedContacts = (): Contact[] => {
  const contacts = localStorage.getItem(SAVED_CONTACTS_KEY);
  return contacts ? JSON.parse(contacts) : [];
};

export const saveContact = (contact: Contact): void => {
  const contacts = getSavedContacts();
  const existingIndex = contacts.findIndex((c) => c.id === contact.id);

  if (existingIndex >= 0) {
    contacts[existingIndex] = contact;
  } else {
    contacts.push(contact);
  }

  localStorage.setItem(SAVED_CONTACTS_KEY, JSON.stringify(contacts));
};

export const deleteContact = (id: string): void => {
  const contacts = getSavedContacts();
  const filteredContacts = contacts.filter((contact) => contact.id !== id);
  localStorage.setItem(SAVED_CONTACTS_KEY, JSON.stringify(filteredContacts));
};

// Slugify a string to create a stable, URL-safe id
export function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
} 