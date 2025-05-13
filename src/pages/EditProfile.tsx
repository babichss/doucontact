import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MyProfile } from "../types";
import { getMyProfile, saveMyProfile } from "../utils/storage";
import { slugifyName } from "../utils/storage";
import { useTranslation } from "react-i18next";

function useEditProfileState() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<MyProfile>({
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
    const id = slugifyName(profile.name);
    saveMyProfile({ ...profile });
    localStorage.setItem("myProfile", JSON.stringify({ ...profile, id }));
    navigate("/");
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
    <>
      <h1>{t("Edit Profile")}</h1>
      <form id="edit-profile" onSubmit={handleSubmit}>
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
            maxLength={100}
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
            maxLength={200}
          />
        </div>

        <div className="form-field">
          <label>{t("Links (up to 3)")}</label>
          {Array.from({ length: 3 }).map((_, index) => (
            <input
              key={index}
              type="url"
              value={profile.links[index] || ""}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              placeholder={`${t("Link")} ${index + 1}`}
            />
          ))}
        </div>

        {error && <div className="error-message">{t(error)}</div>}
      </form>
      <button
        form="edit-profile"
        type="submit"
        className="button big-button full-width"
      >
        {t("Save Profile")}
      </button>
    </>
  );
}
