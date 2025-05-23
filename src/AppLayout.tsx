import AppNavigation from "./components/AppNavigation";
import { BrowserRouter as Router } from "react-router-dom";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      {children}
      <AppNavigation />
    </Router>
  );
}
