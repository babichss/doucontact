import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

type ActiveLinkProps = {
  to: string;
  children: React.ReactNode;
};

const ActiveLink = ({ to, children }: ActiveLinkProps) => {
  return (
    <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
      {children}
    </NavLink>
  );
};

export default function AppNavigation() {
  const { t } = useTranslation();

  return (
    <nav>
      <ActiveLink to="/">{t("My QR")}</ActiveLink>
      <NavLink to="/add-contact" aria-label={t("Add Contact")}>
        <img src="./add.svg" alt="add" height={24} />
      </NavLink>
      <ActiveLink to="/contacts">{t("Contacts")}</ActiveLink>
    </nav>
  );
}
