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
        <p>
          Жодних реєстрацій, логінів чи паролів. Ти ділишся тільки тим, чим
          хочеш поділитися.
        </p>
        <p>Розроблено від щирого серця ;)</p>
      </Card>
      <div className="column  ">
        <div>
          <h4>Розробляв</h4>
          <p>Сергій Бабіч</p>
          <ul className="author-links">
            <li>
              <a href="https://t.me/babichdev">Telegram</a>
            </li>
            |
            <li>
              <a href="https://youtube.com/@babichweb">Youtube</a>
            </li>
            |
            <li>
              <a href="https://www.linkedin.com/in/babichss/">LinkedIn</a>
            </li>
          </ul>
        </div>

        <div>
          <h4>Тестували</h4>
          <p>Олексій Остапов</p>
          <ul className="author-links">
            <li>
              <a href="https://t.me/qamania">Telegram</a>
            </li>
            |
            <li>
              <a href="https://www.linkedin.com/in/ostapov/">LinkedIn</a>
            </li>
          </ul>
          <p>Артем Овчаренко</p>
          <ul className="author-links">
            <li>
              <a href="https://t.me/qamania">Telegram</a>
            </li>
            |
            <li>
              <a href="https://www.linkedin.com/in/ostapov/">LinkedIn</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
