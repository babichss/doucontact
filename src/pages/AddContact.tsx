import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import QRScanner from "../components/QRScanner";
import PhotoView from "../components/PhotoView";
import type { Contact } from "../types";
import { saveContact } from "../utils/storage";
import ContactView from "../components/ContactView";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";

export default function AddContact() {
  const navigate = useNavigate();
  const [scannedContact, setScannedContact] = useState<Contact | null>(null);
  const videoRef = useRef<HTMLVideoElement>(
    null
  ) as React.RefObject<HTMLVideoElement>;
  const { t } = useTranslation();

  const handleScan = (contact: Contact) => {
    setScannedContact(contact);
  };

  const handleSnapButton = () => {
    if (!videoRef.current || !scannedContact) return;
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 120;
    const context = canvas.getContext("2d");
    if (!context) return;
    const minDim = Math.min(video.videoWidth, video.videoHeight);
    const sx = (video.videoWidth - minDim) / 2;
    const sy = (video.videoHeight - minDim) / 2;
    context.drawImage(video, sx, sy, minDim, minDim, 0, 0, 120, 120);
    const dataUrl = canvas.toDataURL("image/png");
    handleSnap(dataUrl);
  };

  const handleSnap = (dataUrl: string) => {
    if (scannedContact) {
      const contactToSave = {
        ...scannedContact,
        image: dataUrl || scannedContact.image,
      };
      saveContact(contactToSave);
      navigate("/contacts");
    }
  };

  return (
    <>
      <div className="content">
        <h2>{t("Add Contact")}</h2>
        {!scannedContact && (
          <>
            <QRScanner onScan={handleScan} />
            <p>
              <i>{t("Scan QR code")}</i>
            </p>
          </>
        )}
        {scannedContact && (
          <>
            <PhotoView
              videoRef={videoRef as React.RefObject<HTMLVideoElement>}
            />
            <ContactView contact={scannedContact} />
          </>
        )}
      </div>
      {scannedContact && (
        <Button onClick={handleSnapButton} size="large" fullWidth>
          {t("Take photo and save")}
        </Button>
      )}
    </>
  );
}
