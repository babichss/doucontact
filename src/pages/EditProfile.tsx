import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import type { Contact } from "../types";
import { getMyProfile, hashName, saveMyProfile } from "../utils/storage";

function useEditProfileState() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Contact>({
    id: "",
    name: "",
    title: "",
    image: "",
    links: [],
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const savedProfile = getMyProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.links.some((link) => Boolean(link))) {
      setError(t("At least one link is required."));
      return;
    }
    setError("");
    const id = hashName(profile.name);
    saveMyProfile({ ...profile, id });
    localStorage.setItem("myProfile", JSON.stringify({ ...profile, id }));
    void navigate("/");
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...profile.links];
    newLinks[index] = value;
    setProfile((prev) => ({
      ...prev,
      links: newLinks.filter((link) => Boolean(link)),
    }));
  };

  return {
    profile,
    handleSubmit,
    handleLinkChange,
    setProfile,
    error,
  };
}

export default function EditProfile() {
  const { t } = useTranslation();
  const { profile, handleSubmit, handleLinkChange, setProfile, error } =
    useEditProfileState();

  return (
    <div className="stack-md">
      <h2>{t("My Profile")}</h2>
      <form id="edit-profile" className="stack-md" onSubmit={handleSubmit}>
        <div className="stack-xs">
          <label htmlFor="name">{t("Name")}</label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            maxLength={80}
          />
        </div>

        <div className="stack-xs">
          <label htmlFor="title">{t("Title")}</label>
          <input
            type="text"
            id="title"
            value={profile.title}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, title: e.target.value }))
            }
            maxLength={140}
          />
        </div>

        <div className="stack-md">
          <div className="stack-xs">
            <label htmlFor="links">{t("Contacts (up to 3)")}</label>
            <p>
              <small>
                Ти можеш додати будь-які свої контакти: LinkedIn, Telegram,
                Instagram, номер телефону тощо
              </small>
            </p>
          </div>
          <div className="stack-xs">
            {Array.from({ length: 3 }).map((_, index) => (
              <input
                key={index}
                value={profile.links[index] || ""}
                onChange={(e) => handleLinkChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>

        {error && <div className="error-message">{t(error)}</div>}
        <Button form="edit-profile" type="submit" size="large" fullWidth>
          {t("Save Profile")}
        </Button>
      </form>
    </div>
  );
}
