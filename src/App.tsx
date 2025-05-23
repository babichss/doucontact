import { useTranslation } from "react-i18next";
import { NavLink, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import About from "./pages/About";
import AddContact from "./pages/AddContact";
import ContactPage from "./pages/ContactPage";
import Contacts from "./pages/Contacts";
import EditProfile from "./pages/EditProfile";
import ProfilePage from "./pages/Profile";

function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <NavLink to="/" aria-label={t("Home")} className="logo">
        <h1>Kartka</h1>
      </NavLink>
      <NavLink to="/about" aria-label={t("About")}>
        <img src="./question.svg" alt="logo" height={24} />
      </NavLink>
    </header>
  );
}

function App() {
  return (
    <AppLayout>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contact/:id" element={<ContactPage />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </AppLayout>
  );
}

export default App;
