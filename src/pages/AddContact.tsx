import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ContactView from "../components/ContactView";
import PhotoView from "../components/PhotoView";
import QRScanner from "../components/QRScanner";
import type { Contact } from "../types";
import { base64Decode, saveContact } from "../utils/storage";

export default function AddContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scannedContact, setScannedContact] = useState<Contact | null>(null);
  const [shouldAddPhoto, setShouldAddPhoto] = useState(false);
  const [error, setError] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(
    null
  ) as React.RefObject<HTMLVideoElement>;
  const { t } = useTranslation();

  // Handle inbound link (external QR open)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const contactParam = params.get("contact");
    if (contactParam) {
      try {
        const decoded = base64Decode(contactParam);
        const contact: Contact = JSON.parse(decoded) as Contact;

        setScannedContact(contact);
      } catch {
        setError(t("Invalid or corrupted contact QR code."));
      }
    } else if (location.search) {
      setError(t("Missing contact information in the link."));
    }
  }, [location, navigate, t]);

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
    void handleSnap(dataUrl);
  };

  const handleSnap = (dataUrl: string) => {
    if (scannedContact) {
      const contactToSave = {
        ...scannedContact,
        image: dataUrl || scannedContact.image,
      };
      saveContact(contactToSave);
      void navigate("/contacts?from=add");
    }
  };

  const handleContinueWithoutPhoto = () => {
    if (scannedContact) {
      saveContact(scannedContact);
      void navigate("/contacts?from=add");
    }
  };

  return (
    <div className="stack-md">
      <h2>{!scannedContact ? "Скануй QR" : "Новий контакт"}</h2>
      {error && <div className="error-message">{error}</div>}
      {!scannedContact && !error && (
        <>
          <QRScanner onScan={handleScan} />
          <p>
            <i>{t("Scan QR code")}</i>
          </p>
        </>
      )}
      {scannedContact && !error && !shouldAddPhoto && (
        <>
          <ContactView contact={scannedContact} />
          <Button
            onClick={() => setShouldAddPhoto(true)}
            size="large"
            fullWidth
          >
            {t("Take photo and save")}
          </Button>
          <div className="stack-sm centered">
            <a onClick={handleContinueWithoutPhoto}>Додати контакт без фото</a>
          </div>
        </>
      )}

      {scannedContact && shouldAddPhoto ? (
        <>
          <PhotoView videoRef={videoRef} />
          <Button onClick={handleSnapButton} size="large" fullWidth>
            {t("Take photo and save")}
          </Button>
        </>
      ) : null}
    </div>
  );
}
