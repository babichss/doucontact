import React from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormField({
  label,
  htmlFor,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={["form-field", className].filter(Boolean).join(" ")}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
