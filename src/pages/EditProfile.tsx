import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MyProfile } from "../types";
import { getMyProfile, saveMyProfile } from "../utils/storage";
import { slugifyName } from "../utils/storage";
import { useTranslation } from "react-i18next";

function useEditProfileState() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<MyProfile>({
    name: "",
    title: "",
    image: "",
    links: ["", "", ""],
  });

  useEffect(() => {
    const savedProfile = getMyProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = slugifyName(profile.name);
    saveMyProfile({ ...profile });
    localStorage.setItem("myProfile", JSON.stringify({ ...profile, id }));
    navigate("/");
  };

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...profile.links];
    newLinks[index] = value;
    setProfile((prev) => ({ ...prev, links: newLinks }));
  };

  return {
    profile,
    handleSubmit,
    handleLinkChange,
    setProfile,
  };
}

export default function EditProfile() {
  const { t } = useTranslation();
  const { profile, handleSubmit, handleLinkChange, setProfile } =
    useEditProfileState();

  return (
    <div className="container">
      <h1>{t("Edit Profile")}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">{t("Name")}</label>
          <input
            type="text"
            id="name"
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="title">{t("Title")}</label>
          <textarea
            id="title"
            value={profile.title}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, title: e.target.value }))
            }
            maxLength={400}
          />
        </div>

        <div className="form-field">
          <label>{t("Links (up to 3)")}</label>
          {profile.links.map((link, index) => (
            <input
              key={index}
              type="url"
              value={link}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              placeholder={`Link ${index + 1}`}
              style={{ marginBottom: "0.5rem" }}
            />
          ))}
        </div>

        <button type="submit" className="btn">
          {t("Save Profile")}
        </button>
      </form>
    </div>
  );
}
