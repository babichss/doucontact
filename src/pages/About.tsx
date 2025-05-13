import React from "react";
import Card from "../components/Card";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="content">
      <Card>
        <h2>{t("About")}</h2>
        <p>
          {t(
            "This app helps you keep and share contact information easily using QR codes."
          )}
        </p>
        <p>{t("Developed with ❤️ for quick networking.")}</p>
      </Card>
    </section>
  );
}
