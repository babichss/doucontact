import QRCode from "qrcode";
import { useEffect, useState } from "react";
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
  return (
    <div className="stack-md centered">
      <h2>Тут поки нічого немає</h2>
      <p className="centered">
        Щоб створити свою картку, натисніть на кнопку нижче
      </p>
      <Button as="a" href="/edit">
        Створити мою Картку!
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
        <div className="stack-xs">
          <img
            src={encodedQrCodeString}
            alt="QR Code"
            className="qr-code"
            onClick={onQrClick}
            width="100%"
          />
          {message ? <p>{message}</p> : null}

          <NavLink to="/edit">Редагувати мою Картку</NavLink>
        </div>
      ) : null}

      <Button
        as="a"
        href="/add-contact"
        size="large"
        fullWidth
        className="scan-button"
      >
        <img src="/qr.svg" alt="QR Code" width={24} height={24} />
        Сканувати
      </Button>
    </div>
  );
}
