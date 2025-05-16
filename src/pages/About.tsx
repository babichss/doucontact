import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <section className="stack-md">
      <p>
        <i>
          Знайшли баг? Маєте побажання?{" "}
          <a href="https://t.me/babich_ss">Пишіть!</a>
        </i>
      </p>
      <h2>{t("About")}</h2>
      <p>
        {t(
          "This app helps you keep and share contact information easily using QR codes."
        )}
      </p>
      <p>
        Жодних реєстрацій, логінів чи паролів. Ти ділишся тільки тим, чим хочеш
        поділитися.
      </p>
      <p>Розроблено від щирого серця ;)</p>

      <div className="stack-md">
        <div className="stack-xs">
          <h4>Розробляв</h4>
          <p>Сергій Бабіч</p>
          <ul className="h-stack-xs">
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

        <div className="stack-sm">
          <div className="stack-xs">
            <h4>Тестували</h4>
            <p>Олексій Остапов</p>
            <ul className="h-stack-xs">
              <li>
                <a href="https://t.me/qamania">Telegram</a>
              </li>
              |
              <li>
                <a href="https://www.linkedin.com/in/ostapov/">LinkedIn</a>
              </li>
            </ul>
          </div>
          <div className="stack-xs">
            <p>Артем Овчаренко</p>
            <ul className="h-stack-xs">
              <li>
                <a href="https://t.me/Artem_Ov">Telegram</a>
              </li>
              |
              <li>
                <a href="https://www.linkedin.com/in/4rtem-ovcharenko/">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
