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

function Header() {
  const { t } = useTranslation();

  return (
    <header>
      <NavLink to="/" aria-label={t("Home")}>
        <img src="./logo.png" alt="logo" height={24} />
      </NavLink>
      <NavLink to="/about" aria-label={t("About")}>
        ?
      </NavLink>
    </header>
  );
}

function ActiveLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
      {children}
    </NavLink>
  );
}

function Nav() {
  const { t } = useTranslation();

  return (
    <nav>
      <ActiveLink to="/">{t("My QR")}</ActiveLink>
      <ActiveLink to="/contacts">{t("Contacts")}</ActiveLink>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Nav />
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
