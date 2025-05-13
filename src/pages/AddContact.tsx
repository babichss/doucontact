import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import ContactView from "../components/ContactView";
import PhotoView from "../components/PhotoView";
import QRScanner from "../components/QRScanner";
import type { Contact } from "../types";
import { saveContact, base64Decode, getMyProfile } from "../utils/storage";

export default function AddContact() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scannedContact, setScannedContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string>("");
  const [showProfileModal, setShowProfileModal] = useState(false);
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
        const decoded = JSON.parse(base64Decode(contactParam));
        const contact: Contact = {
          id: decoded.id,
          name: decoded.name,
          title: decoded.title,
          image: decoded.image,
          links: decoded.links,
        };
        saveContact(contact);
        setScannedContact(contact);
        // If user does not have a profile, show modal
        if (!getMyProfile()) {
          setShowProfileModal(true);
        } else {
          // If profile exists, redirect to contacts after a short delay
          setTimeout(() => navigate("/contacts"), 1000);
        }
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

  const handleGoToProfile = () => {
    setShowProfileModal(false);
    navigate("/edit");
  };

  return (
    <>
      <div className="content">
        <h2>{t("Add Contact")}</h2>
        {error && <div className="error-message">{error}</div>}
        {!scannedContact && !error && (
          <>
            <QRScanner onScan={handleScan} />
            <p>
              <i>{t("Scan QR code")}</i>
            </p>
          </>
        )}
        {scannedContact && !error && (
          <>
            <PhotoView
              videoRef={videoRef as React.RefObject<HTMLVideoElement>}
            />
            <ContactView contact={scannedContact} />
          </>
        )}
      </div>
      {scannedContact && !error && (
        <Button onClick={handleSnapButton} size="large" fullWidth>
          {t("Take photo and save")}
        </Button>
      )}
      {showProfileModal && (
        <dialog open className="confirm-dialog">
          <div className="column">
            <p>{t("Contact saved. Do you want to create your own profile?")}</p>
            <div className="actions">
              <Button onClick={handleGoToProfile} size="medium">
                {t("Go to Profile")}
              </Button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
