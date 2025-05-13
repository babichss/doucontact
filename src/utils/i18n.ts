import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ua: {
    translation: {
      'Keep Contact!': 'Тримай контакт!',
      'My Profile': 'Мій QR',
      'Contacts': 'Контакти',
      'Saved Contacts': 'Збережені контакти',
      'No saved contacts yet': 'Поки що немає збережених контактів',
      'Add Contact': 'Додати контакт',
      'Edit Profile': 'Редагувати мої дані',
      'Name': "Ім'я",
      'Title': 'Посада',
      'Links (up to 3)': 'Посилання (до 3)',
      'Save Profile': 'Зберегти мої дані',
      'Create Profile': 'Заповнити мої дані',
      'Welcome!': 'Вітаємо!',
      "You haven't created your profile yet.": 'Ви ще не заповнили свої дані.',
      'Scan this QR code to add contact': 'Відскануйте цей QR код, щоб додати контакт',
      'Generating QR Code...': 'Генеруємо QR код...',
      'Delete Contact': 'Видалити контакт',
      'Are you sure you want to delete this contact?': 'Ви впевнені, що хочете видалити цей контакт?',
      'Scan QR code': 'Відскануйте QR код',
      'Take photo and save': 'Зробити фото та зберегти',
      'At least one link is required.': 'Необхідно вказати хоча б одне посилання.',
      'Yes': 'Так',
      'Cancel': 'Скасувати',
      'Invalid or corrupted contact QR code.': 'Недійсний або пошкоджений QR-код контакту.',
      'Missing contact information in the link.': 'Відсутня інформація про контакт у посиланню.',
      'Contact saved. Do you want to create your own profile?': 'Контакт збережено. Бажаєте заповнити свої дані?',
      'Go to Profile': 'Перейти до моїх даних',
      'About': 'Про застосунок',
      'This app helps you keep and share contact information easily using QR codes.': 'Цей застосунок допомагає легко зберігати та ділитися контактною інформацією за допомогою QR-кодів.',
      'Developed with ❤️ for quick networking.': 'Розроблено з ❤️ для швидкого нетворкінгу.',
    },
  },
  en: {
    translation: {
      'Keep Contact!': 'Keep Contact!',
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
      'Yes': 'Yes',
      'Cancel': 'Cancel',
      'Invalid or corrupted contact QR code.': 'Invalid or corrupted contact QR code.',
      'Missing contact information in the link.': 'Missing contact information in the link.',
      'Contact saved. Do you want to create your own profile?': 'Contact saved. Do you want to create your own profile?',
      'Go to Profile': 'Go to Profile',
      'About': 'About',
      'This app helps you keep and share contact information easily using QR codes.': 'This app helps you keep and share contact information easily using QR codes.',
      'Developed with ❤️ for quick networking.': 'Developed with ❤️ for quick networking.',
    },
  },
};

await i18n
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