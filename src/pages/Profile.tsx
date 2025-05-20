import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { useProfile } from "../hooks/useProfile";
import { base64Encode } from "../utils/storage";

function useProfileQRCode() {
  const [status, setStatus] = useState<"loading" | "error" | "success">(
    "loading"
  );
  const [encodedQrCodeString, setEncodedQrCodeString] = useState<string>("");
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile) return;
    const baseUrl = window.location.origin;
    const encodedProfile = base64Encode(JSON.stringify(profile));

    QRCode.toDataURL(`${baseUrl}/add-contact?contact=${encodedProfile}`, {
      margin: 4,
    })
      .then((url) => {
        setEncodedQrCodeString(url);
        setStatus("success");
      })
      .catch((err) => {
        console.error("Error generating QR code:", err);
        setStatus("error");
      });
  }, [profile]);

  return { encodedQrCodeString, status };
}

function EmptyProfile() {
  const { t } = useTranslation();
  return (
    <div className="stack-md centered">
      <h2>Тут поки нічого немає</h2>
      <p className="centered">
        Щоб створити свою картку, натисніть на кнопку нижче
      </p>
      <Button as="a" href="/edit">
        {t("Create Profile")}
      </Button>
    </div>
  );
}
export default function ProfilePage() {
  const { profile, error } = useProfile();

  const [message, setMessage] = useState<string>("");

  const { encodedQrCodeString, status } = useProfileQRCode();

  const hasError = error !== null || status === "error";

  if (!profile && !hasError) {
    return <EmptyProfile />;
  }

  const onQrClick = () => {
    void navigator.clipboard.writeText(encodedQrCodeString);
    setMessage("Посилання скопійовано!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="stack-md">
      {encodedQrCodeString ? (
        <>
          <img
            src={encodedQrCodeString}
            alt="QR Code"
            className="qr-code"
            onClick={onQrClick}
          />
          {message ? <p>{message}</p> : null}
        </>
      ) : null}
      <div className="stack-md centered">
        <NavLink to="/edit">Редагувати Картку</NavLink>
      </div>

      <Button as="a" href="/add-contact" size="large" fullWidth>
        Додати Картку
      </Button>
    </div>
  );
}
