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

export function hashName(name: string): string {
  const str = `${name.trim().toLowerCase()}-${Date.now()}`;
  let hash = 2166136261;

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }

  // Convert to unsigned 32-bit hex string
  return ('0000000' + (hash >>> 0).toString(16)).slice(-8);
}
// Unicode-safe base64 encode/decode
export function base64Encode(str: string): string {
  // Encode string to UTF-8 bytes
  const bytes = new TextEncoder().encode(str);
  // Convert bytes to binary string
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  // Encode binary string to base64
  return btoa(binary);
}

export function base64Decode(str: string): string {
  // Decode base64 to bytes
  const binary = atob(str);
  // Convert bytes to a Uint8Array
  const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
  // Decode bytes to UTF-8 string
  return new TextDecoder().decode(bytes);
} 