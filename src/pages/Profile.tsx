import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import type { Contact } from "../types";
import { base64Encode } from "../utils/storage";

export default function Profile() {
  const { t } = useTranslation();
  const [profile] = useState<Contact | null>(() => {
    const p = localStorage.getItem("myProfile");
    return p ? (JSON.parse(p) as Contact) : null;
  });
  const [qrCode, setQrCode] = useState<string>("");
  const [qrUrl, setQrUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (profile) {
      const profileData = base64Encode(JSON.stringify(profile));
      const baseUrl = window.location.origin;
      const qrUrl = `${baseUrl}/add-contact?contact=${profileData}`;
      setQrUrl(qrUrl);
      QRCode.toDataURL(qrUrl, {
        margin: 0,
      })
        .then((url) => {
          setQrCode(url);
        })
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [profile]);

  if (!profile) {
    return (
      <div className="stack-md centered">
        <h2>{t("Welcome!")}</h2>
        <p>{t("You haven't created your profile yet.")}</p>
        <Button as="a" href="/edit">
          {t("Create Profile")}
        </Button>
      </div>
    );
  }

  const onQrClick = () => {
    void navigator.clipboard.writeText(qrUrl);
    setMessage("Посилання скопійовано!");
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div className="stack-md">
      <Card className="stack-md centered">
        {qrCode ? (
          <>
            <img
              src={qrCode}
              alt="QR Code"
              className="qr-code"
              onClick={onQrClick}
            />
            {message ? <p>{message}</p> : null}
          </>
        ) : (
          <p>{t("Generating QR Code...")}</p>
        )}
        <div className="stack-md centered">
          <NavLink to="/edit">{t("Edit Profile")}</NavLink>
        </div>
      </Card>

      <Button as="a" href="/add-contact" size="large" fullWidth>
        {t("Scan QR")}
      </Button>
    </div>
  );
}
