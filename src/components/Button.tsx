import React from "react";

interface ButtonBaseProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  className?: string;
}

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    as?: "button";
  };
type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export default function Button(props: ButtonProps) {
  const {
    children,
    size = "medium",
    fullWidth = false,
    className = "",
    ...rest
  } = props;

  const classes = [
    "button",
    size === "large" ? "big-button" : size === "small" ? "small-button" : "",
    fullWidth ? "full-width" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (props.as === "a") {
    const { href, ...anchorProps } = rest as ButtonAsAnchorProps;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(rest as ButtonAsButtonProps)}>
      {children}
    </button>
  );
}
