import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AddContact from "./pages/AddContact";
import ContactPage from "./pages/ContactPage";
import Contacts from "./pages/Contacts";
import EditProfile from "./pages/EditProfile";
import Profile from "./pages/Profile";
import About from "./pages/About";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <Router>
      <header>
        <div className="header-title">
          <h1>{t("Keep Contact!")}</h1>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
            aria-label={t("About")}
            style={{ marginLeft: "auto", fontSize: 24, lineHeight: 1 }}
          >
            <img src="/question.svg" alt="About" width={24} height={24} />
          </NavLink>
        </div>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("My Profile")}
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {t("Contacts")}
          </NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contact/:id" element={<ContactPage />} />
          <Route path="/add-contact" element={<AddContact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
