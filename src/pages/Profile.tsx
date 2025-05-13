import QRCode from "qrcode";
import { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
import type { Contact } from "../types";
import { useTranslation } from "react-i18next";
import { base64Encode } from "../utils/storage";
import Button from "../components/Button";

export default function Profile() {
  const { t } = useTranslation();
  const [profile] = useState<Contact | null>(() => {
    const p = localStorage.getItem("myProfile");
    return p ? JSON.parse(p) : null;
  });
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    if (profile) {
      const profileData = base64Encode(JSON.stringify(profile));

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
        <Button as="a" href="/edit">
          {t("Create Profile")}
        </Button>
      </>
    );
  }

  return (
    <>
      <section className="content">
        <div className="card">
          {qrCode ? (
            <>
              <img src={qrCode} alt="QR Code" className="qr-code" />
            </>
          ) : (
            <p>{t("Generating QR Code...")}</p>
          )}
        </div>
        <div className="card">
          {profile.image ? (
            <img src={profile.image} alt={profile.name} className="avatar" />
          ) : null}

          <h2>{profile.name}</h2>
          <p>{profile.title}</p>

          {profile.links.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </a>
          ))}
          <Button as="a" href="/edit">
            {t("Edit Profile")}
          </Button>
        </div>
      </section>
      <Button as="a" href="/add-contact" size="large" fullWidth>
        {t("Add Contact")}
      </Button>
    </>
  );
}
