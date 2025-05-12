import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Contact } from "../types";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  const [profile] = useState<Contact | null>(() => {
    const p = localStorage.getItem("myProfile");
    return p ? JSON.parse(p) : null;
  });
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    if (profile) {
      const profileData = btoa(JSON.stringify(profile));

      QRCode.toDataURL(profileData)
        .then((url) => {
          setQrCode(url);
        })
        .catch((err) => console.error("Error generating QR code:", err));
    }
  }, [profile]);

  if (!profile) {
    return (
      <>
        <h1>{t("Welcome!")}</h1>
        <p>{t("You haven't created your profile yet.")}</p>
        <Link to="/edit" className="btn">
          {t("Create Profile")}
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="card">
        {profile.image ? (
          <img src={profile.image} alt={profile.name} className="avatar" />
        ) : null}

        <h2>{profile.name}</h2>
        <p>{profile.title}</p>

        {profile.links.map((link, index) => (
          <a key={index} href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
        ))}

        {qrCode ? (
          <>
            <img src={qrCode} alt="QR Code" className="qr-code" />
            <p>{t("Scan this QR code to add contact")}</p>
          </>
        ) : (
          <p>{t("Generating QR Code...")}</p>
        )}
      </div>
      <Link to="/add-contact" className="button fab">
        {t("Add Contact")}
      </Link>
    </>
  );
}
