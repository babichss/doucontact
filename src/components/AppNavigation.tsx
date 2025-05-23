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
      <ActiveLink to="/contacts">Збережені Картки</ActiveLink>
    </nav>
  );
}
