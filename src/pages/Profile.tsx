import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Contact } from "../types";

export default function Profile() {
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
        <h1>Welcome!</h1>
        <p>You haven't created your profile yet.</p>
        <Link to="/edit" className="btn">
          Create Profile
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
            <p>Відскануйте цей QR код, щоб додати контакт</p>
          </>
        ) : (
          <p>Generating QR Code...</p>
        )}
      </div>
      <Link to="/add-contact" className="button fab">
        Додати контакт
      </Link>
    </>
  );
}
