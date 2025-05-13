import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ua: {
    translation: {
      'DOU Contact': 'DOU Контакт',
      'My Profile': 'Мій профіль',
      'Contacts': 'Контакти',
      'Saved Contacts': 'Збережені контакти',
      'No saved contacts yet': 'Поки що немає збережених контактів',
      'Add Contact': 'Додати контакт',
      'Edit Profile': 'Редагувати профіль',
      'Name': "Ім'я",
      'Title': 'Посада',
      'Links (up to 3)': 'Посилання (до 3)',
      'Save Profile': 'Зберегти профіль',
      'Create Profile': 'Створити профіль',
      'Welcome!': 'Вітаємо!',
      "You haven't created your profile yet.": 'Ви ще не створили свій профіль.',
      'Scan this QR code to add contact': 'Відскануйте цей QR код, щоб додати контакт',
      'Generating QR Code...': 'Генеруємо QR код...',
      'Delete Contact': 'Видалити контакт',
      'Are you sure you want to delete this contact?': 'Ви впевнені, що хочете видалити цей контакт?',
      'Scan QR code': 'Відскануйте QR код',
      'Take photo and save': 'Зробити фото та зберегти',
      'At least one link is required.': 'Необхідно вказати хоча б одне посилання.',
    },
  },
  en: {
    translation: {
      'DOU Contact': 'DOU Contact',
      'My Profile': 'My Profile',
      'Contacts': 'Contacts',
      'Saved Contacts': 'Saved Contacts',
      'No saved contacts yet': 'No saved contacts yet',
      'Add Contact': 'Add Contact',
      'Edit Profile': 'Edit Profile',
      'Name': 'Name',
      'Title': 'Title',
      'Links (up to 3)': 'Links (up to 3)',
      'Save Profile': 'Save Profile',
      'Create Profile': 'Create Profile',
      'Welcome!': 'Welcome!',
      "You haven't created your profile yet.": "You haven't created your profile yet.",
      'Scan this QR code to add contact': 'Scan this QR code to add contact',
      'Generating QR Code...': 'Generating QR Code...',
      'Delete Contact': 'Delete Contact',
      'Are you sure you want to delete this contact?': 'Are you sure you want to delete this contact?',
      'Scan QR code': 'Scan QR code',
      'Take photo and save': 'Take photo and save',
      'At least one link is required.': 'At least one link is required.',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ua',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 