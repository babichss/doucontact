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

function App() {
  return (
    <Router>
      <header>
        <h1>DOU Контакт</h1>

        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Мій профіль
          </NavLink>
          <NavLink
            to="/contacts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Контакти
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
        </Routes>
      </main>
    </Router>
  );
}

export default App;
