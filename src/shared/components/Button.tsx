import classNames from "classnames";
import React from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  type?: "primary" | "secondary" | "danger" | "outline";
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  disabled?: boolean;
  fitContent?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  type = "primary",
  size = "medium",
  icon,
  disabled = false,
  fitContent = false,
  ...props
}) => {
  // Dynamic styles for the button based on type and size
  const buttonStyles = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300",
    secondary:
      "bg-green-500 text-white hover:bg-green-600 focus:ring-4 focus:ring-green-300",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300",
    outline:
      "bg-transparent outline-2 outline-gray-500 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      {...props}
      className={classNames(
        "inline-flex items-center justify-center rounded-md transition duration-200 focus:outline-none disabled:opacity-50",
        buttonStyles[type],
        sizeStyles[size],
        { "!w-fit !h-fit": fitContent }
      )}
    >
      {icon && <span className="mr-2">{icon}</span>} {/* Icon if provided */}
      {title}
    </button>
  );
};

export default Button;
