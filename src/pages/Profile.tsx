import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import Card from "../components/Card";
import type { Contact } from "../types";
import { base64Encode } from "../utils/storage";
import { NavLink } from "react-router-dom";
export default function Profile() {
  const { t } = useTranslation();
  const [profile] = useState<Contact | null>(() => {
    const p = localStorage.getItem("myProfile");
    return p ? (JSON.parse(p) as Contact) : null;
  });
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    if (profile) {
      const profileData = base64Encode(
        encodeURIComponent(JSON.stringify(profile))
      );
      const baseUrl =
        import.meta.env.VITE_PUBLIC_BASE_URL ||
        process.env.VITE_PUBLIC_BASE_URL;
      const qrUrl = `${baseUrl}/add-contact?contact=${profileData}`;

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

  return (
    <div className="stack-md">
      <Card className="stack-md centered">
        {qrCode ? (
          <>
            <img src={qrCode} alt="QR Code" className="qr-code" />
          </>
        ) : (
          <p>{t("Generating QR Code...")}</p>
        )}
        <NavLink to="/edit">{t("Edit Profile")}</NavLink>
      </Card>

      <Button as="a" href="/add-contact" size="large" fullWidth>
        {t("Scan QR")}
      </Button>
    </div>
  );
}
