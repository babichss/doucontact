import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import FormField from "../components/FormField";
import type { MyProfile } from "../types";
import { getMyProfile, hashName, saveMyProfile } from "../utils/storage";

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
    console.log(profile);
    const id = hashName(profile.name);
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
      <h2>{t("Edit Profile")}</h2>
      <form id="edit-profile" onSubmit={handleSubmit}>
        <FormField label={t("Name")} htmlFor="name">
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
        </FormField>

        <FormField label={t("Title")} htmlFor="title">
          <textarea
            id="title"
            value={profile.title}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, title: e.target.value }))
            }
            maxLength={200}
          />
        </FormField>

        <FormField label={t("Links (up to 3)")}>
          {Array.from({ length: 3 }).map((_, index) => (
            <input
              key={index}
              type="url"
              value={profile.links[index] || ""}
              onChange={(e) => handleLinkChange(index, e.target.value)}
              placeholder={`${t("Link")} ${index + 1}`}
            />
          ))}
        </FormField>

        {error && <div className="error-message">{t(error)}</div>}
      </form>
      <Button form="edit-profile" type="submit" size="large" fullWidth>
        {t("Save Profile")}
      </Button>
    </>
  );
}
